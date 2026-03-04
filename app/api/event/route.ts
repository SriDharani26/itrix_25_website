import { NextResponse } from "next/server";
import { eventsData } from "@/app/events/eventsData";

type RatingValue = 4 | 5;

const ratingsByUser = new Map<string, Map<string, RatingValue>>();
const totalsByEvent = new Map<string, { total: number; count: number }>();

const getSeededCount = (eventId: string) => {
  let hash = 0;
  for (let i = 0; i < eventId.length; i += 1) {
    hash = (hash * 31 + eventId.charCodeAt(i)) >>> 0;
  }
  return 2000 + (hash % 1001);
};

for (const event of eventsData) {
  const seededCount = getSeededCount(event.id);
  totalsByEvent.set(event.id, {
    count: seededCount,
    total: Math.round(event.rating * seededCount),
  });
}

const isAllowedRating = (value: unknown): value is RatingValue => value === 4 || value === 5;

const toPlainObject = (ratings: Map<string, RatingValue>) =>
  Object.fromEntries(ratings.entries()) as Record<string, RatingValue>;

const getEventStats = (eventId: string) => {
  const stats = totalsByEvent.get(eventId);
  if (!stats || stats.count === 0) {
    return { averageRating: null as number | null, reviewCount: 0 };
  }
  return {
    averageRating: Number((stats.total / stats.count).toFixed(1)),
    reviewCount: stats.count,
  };
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId")?.trim();
  const eventId = searchParams.get("eventId")?.trim();

  if (eventId && userId) {
    const userRatings = ratingsByUser.get(userId) ?? new Map<string, RatingValue>();
    const stats = getEventStats(eventId);
    return NextResponse.json({
      userId,
      eventId,
      rating: userRatings.get(eventId) ?? null,
      ...stats,
    });
  }

  if (eventId) {
    return NextResponse.json({
      eventId,
      ...getEventStats(eventId),
    });
  }

  if (!userId) {
    return NextResponse.json({ error: "Missing required query param: userId" }, { status: 400 });
  }

  const userRatings = ratingsByUser.get(userId) ?? new Map<string, RatingValue>();
  return NextResponse.json({ userId, ratings: toPlainObject(userRatings) });
}

export async function PUT(request: Request) {
  const body = await request.json().catch(() => null);
  const userId = body?.userId?.trim?.();
  const eventId = body?.eventId?.trim?.();
  const rating = body?.rating;

  if (!userId || !eventId) {
    return NextResponse.json({ error: "userId and eventId are required" }, { status: 400 });
  }

  if (!isAllowedRating(rating)) {
    return NextResponse.json({ error: "rating must be 4 or 5" }, { status: 400 });
  }

  const userRatings = ratingsByUser.get(userId) ?? new Map<string, RatingValue>();
  const previousRating = userRatings.get(eventId) ?? null;
  userRatings.set(eventId, rating);
  ratingsByUser.set(userId, userRatings);

  const currentStats = totalsByEvent.get(eventId) ?? { total: 0, count: 0 };
  if (previousRating === null) {
    currentStats.total += rating;
    currentStats.count += 1;
  } else {
    currentStats.total += rating - previousRating;
  }
  totalsByEvent.set(eventId, currentStats);

  const eventStats = getEventStats(eventId);

  return NextResponse.json({
    success: true,
    userId,
    eventId,
    rating,
    ratings: toPlainObject(userRatings),
    ...eventStats,
  });
}
