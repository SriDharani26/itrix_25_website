"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { eventsData as allEventsData } from "@/app/events/eventsData";
import { Star } from "lucide-react";

type EventMode = "Online" | "Offline" | "Hybrid";
type EventCategory = "tech" | "non-tech" | "workshops";
type DifficultyLevel = "Beginner" | "Intermediate" | "Advanced";
type DetailTab = "DETAILS" | "SCHEDULE";
type UserRating = 4 | 5;

export interface Event {
  id: string;
  title: string;
  organizer: string;
  shortDescription: string;
  fullDescription: string;
  eventDate: string;
  duration: string;
  mode: EventMode;
  category: EventCategory;
  rating: number;
  reviewCount: number;
  registrations: number;
  tags: string[];
  thumbnailImage: string;
  bannerImage: string;
  version: string;
  lastUpdated: string;
  capacity: number;
  seatsRemaining: number;
  difficultyLevel: DifficultyLevel;
  certificateProvided: boolean;
  price: string;
  sponsors: string[];
  location: string;
  trendingScore: number;
  featured: boolean;
}

const accentColor = "#00FF9F";
const theme = {
  one: "#1A1B26",
  two: "#24283B",
  three: "#414868",
  four: "#C0CAF5",
  five: "#7AA2F7",
  six: "#8A2BE2",
  seven: "#7DCFFF",
  eight: "#9ECE6A",
  nine: "#E0AF68",
  ten: "#F7768E",
  eleven: "#FF9E64",
  twelve: "#00FF9F",
};
const detailTabs: DetailTab[] = ["DETAILS", "SCHEDULE"];

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const getEventStatus = (eventDate: string): "Upcoming" | "Live" | "Completed" => {
  const now = new Date();
  const date = new Date(eventDate);
  const diffHours = (date.getTime() - now.getTime()) / (1000 * 60 * 60);
  if (diffHours < -3) return "Completed";
  if (Math.abs(diffHours) <= 3) return "Live";
  return "Upcoming";
};

const fixedFiveStars = "*****";
const USER_ID_STORAGE_KEY = "itrix-event-user-id-session";
const USER_RATINGS_STORAGE_KEY = "itrix-event-ratings-session";

const isAllowedRating = (value: number): value is UserRating => value === 4 || value === 5;

const getOrCreateUserId = () => {
  const existing = window.sessionStorage.getItem(USER_ID_STORAGE_KEY);
  if (existing) return existing;

  const generated =
    globalThis.crypto?.randomUUID?.() ?? `user-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  window.sessionStorage.setItem(USER_ID_STORAGE_KEY, generated);
  return generated;
};

const sanitizeRatings = (value: unknown): Record<string, UserRating> => {
  if (!value || typeof value !== "object") return {};
  return Object.entries(value).reduce<Record<string, UserRating>>((acc, [eventId, rating]) => {
    if (rating === 4 || rating === 5) {
      acc[eventId] = rating;
    }
    return acc;
  }, {});
};

const SectionHeader = ({ label }: { label: string }) => (
  <div className="px-4 py-2 text-[11px] font-semibold tracking-wider uppercase" style={{ color: theme.seven }}>
    {label}
  </div>
);

const SidebarEventItem = ({
  event,
  isSelected,
  onSelect,
}: {
  event: Event;
  isSelected: boolean;
  onSelect: (event: Event) => void;
}) => (
  <button
    type="button"
    onClick={() => onSelect(event)}
    className={`w-full border-l-2 px-3 py-3 text-left transition-all duration-200 ${
      isSelected ? "border-l-[rgba(6,130,165,1)] bg-[#2a2d2e]" : "border-l-transparent hover:bg-[#2a2d2e]"
    }`}
    style={{ borderLeftColor: isSelected ? theme.twelve : "transparent" }}
  >
    <div className="flex gap-3">
      <img src="/itrix'26-logo.png" alt={event.title} className="h-10 w-10 rounded-sm p-1 bg-one" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold" style={{ color: theme.five }}>{event.title}</p>
        <p className="truncate text-xs" style={{ color: theme.four }}>{event.organizer}</p>
        <p className="truncate text-xs" style={{ color: theme.three }}>{event.shortDescription}</p>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px]" style={{ color: theme.four }}>
          <span style={{ color: theme.twelve }}>{fixedFiveStars}</span>
          <span>{formatDate(event.eventDate)}</span>
          <span style={{ color: theme.eleven }}>trend {event.trendingScore}</span>
        </div>
        <div className="mt-1 flex flex-wrap gap-1">
          {event.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-sm px-1.5 py-0.5 text-[10px]" style={{ backgroundColor: theme.three, color: theme.four }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </button>
);

const SidebarSection = ({
  title,
  items,
  selectedId,
  onSelect,
  showDivider = true,
}: {
  title: string;
  items: Event[];
  selectedId: string;
  onSelect: (event: Event) => void;
  showDivider?: boolean;
}) => (
  <>
    <SectionHeader label={title} />
    {items.map((event) => (
      <SidebarEventItem key={event.id} event={event} isSelected={selectedId === event.id} onSelect={onSelect} />
    ))}
    {showDivider ? <div className="mx-3 my-2 border-b border-gray-700" /> : null}
  </>
);

const DetailsTabs = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: DetailTab;
  setActiveTab: (tab: DetailTab) => void;
}) => (
    <div className="border-b border-gray-700 px-6">
      <div className="flex flex-wrap gap-6">
        {detailTabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => setActiveTab(tab)}
          className={`border-b-2 py-3 text-sm font-medium transition-colors duration-200 ${
            activeTab === tab ? "border-b-[rgba(6,130,165,1)] text-[rgba(6,130,165,1)]" : "border-b-transparent"
          }`}
          style={{
            borderBottomColor: activeTab === tab ? theme.twelve : "transparent",
            color: activeTab === tab ? theme.twelve : theme.four,
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  </div>
);

const UserStars = ({
  value,
  onRate,
}: {
  value: number;
  onRate: (value: number) => void;
}) => {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const effectiveValue = hoveredStar ?? (isHovering ? Math.max(value, 4) : value);

  return (
    <div
      className="flex items-center gap-1"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setHoveredStar(null);
      }}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= effectiveValue;

        return (
          <button
            key={star}
            type="button"
            onMouseEnter={() => {
              setHoveredStar(Math.max(star, 4));
            }}
            onFocus={() => {
              setHoveredStar(Math.max(star, 4));
            }}
            onBlur={() => setHoveredStar(null)}
            onClick={() => {
              onRate(Math.max(star, 4));
            }}
            className="rounded-sm border p-1 transition-colors duration-150 cursor-pointer"
            style={{
              borderColor: isFilled ? theme.twelve : theme.three,
              color: isFilled ? theme.twelve : theme.four,
              backgroundColor: isFilled ? "rgba(0,255,159,0.1)" : "transparent",
            }}
            aria-label={`${star} star${star > 1 ? "s" : ""}`}
            title={`${Math.max(star, 4)} stars`}
          >
            <Star
              size={14}
              className={isFilled ? "fill-current" : ""}
            />
          </button>
        );
      })}
    </div>
  );
};

const DetailsPanel = ({ event, activeTab }: { event: Event; activeTab: DetailTab }) => (
  <div className="px-6 py-5">
    {activeTab === "DETAILS" ? (
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_280px]">
        <div className="space-y-4">
          <p className="text-sm leading-7" style={{ color: theme.four }}>{event.fullDescription}</p>
          <div>
            <p className="mb-2 text-sm font-semibold" style={{ color: theme.four }}>Location</p>
            <p className="text-sm break-words" style={{ color: theme.four }}>{event.location}</p>
          </div>
        </div>

        <aside className="h-fit rounded-sm border p-4 bg-two" style={{ borderColor: theme.three }}>
          <h3 className="mb-3 text-sm font-semibold" style={{ color: theme.seven }}>
            EVENT METADATA
          </h3>
          <div className="space-y-2 text-sm" style={{ color: theme.four }}>
            <p>Category: {event.category}</p>
            <p>Mode: {event.mode}</p>
            <p>Duration: {event.duration}</p>
            <p>Price: {event.price}</p>
            {event.category === "workshops" ? <p>Seats Remaining: {event.seatsRemaining}</p> : null}
            <p>Certificate Provided: {event.certificateProvided ? "Yes" : "No"}</p>
            <p>Last Updated: {formatDate(event.lastUpdated)}</p>
            <p>Event Version: {event.version}</p>
            <p>Status: {getEventStatus(event.eventDate)}</p>
          </div>
        </aside>
      </div>
    ) : (
      <div className="rounded-sm border p-5 text-sm" style={{ borderColor: theme.three, color: theme.four }}>
        {activeTab} content placeholder.
      </div>
    )}
  </div>
);

interface EventsTabProps {
  eventsData?: Event[];
  setShowExplorer?: React.Dispatch<React.SetStateAction<boolean>>;
}

const EventsTab = ({ eventsData = allEventsData, setShowExplorer }: EventsTabProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const selectedEventId = searchParams.get("event");

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollTopRef = useRef(0);

  const filteredEvents = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return eventsData;
    return eventsData.filter((event) => {
      const inTitle = event.title.toLowerCase().includes(normalized);
      const inOrganizer = event.organizer.toLowerCase().includes(normalized);
      const inTags = event.tags.some((tag) => tag.toLowerCase().includes(normalized));
      return inTitle || inOrganizer || inTags;
    });
  }, [eventsData, query]);

  const grouped = useMemo(
    () => ({
      tech: filteredEvents.filter((event) => event.category === "tech"),
      nonTech: filteredEvents.filter((event) => event.category === "non-tech"),
      workshops: filteredEvents.filter((event) => event.category === "workshops"),
    }),
    [filteredEvents]
  );

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollTopRef.current;
    }
  }, [filteredEvents, selectedEventId]);

  const handleSelect = (event: Event) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("event", event.id);
    router.push(`/events?${params.toString()}`);
    if (setShowExplorer) {
      setShowExplorer(false);
    }
  };

  return (
    <div className="-m-2 h-[calc(100%+1rem)] min-h-0 w-[calc(100%+1rem)] bg-one flex flex-col" style={{ color: theme.four }}>
      <div className="border-b p-3" style={{ borderColor: theme.three }}>
        <input
          type="text"
          placeholder="Search events"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-sm border px-3 py-2 text-sm outline-none transition-colors duration-200 placeholder:text-gray-400 focus:border-[rgba(6,130,165,1)] bg-two"
          style={{ borderColor: theme.three, color: theme.four }}
        />
      </div>
      <div
        ref={scrollContainerRef}
        onScroll={(e) => {
          scrollTopRef.current = e.currentTarget.scrollTop;
        }}
        className="flex-1 min-h-0 overflow-y-auto no-scrollbar bg-one"
      >
        <SidebarSection title="TECH" items={grouped.tech} selectedId={selectedEventId ?? ""} onSelect={handleSelect} />
        <SidebarSection title="NON-TECH" items={grouped.nonTech} selectedId={selectedEventId ?? ""} onSelect={handleSelect} />
        <SidebarSection
          title="WORKSHOPS"
          items={grouped.workshops}
          selectedId={selectedEventId ?? ""}
          onSelect={handleSelect}
          showDivider={false}
        />
      </div>
    </div>
  );
};

export const EventsDetailsView = ({ event }: { event: Event }) => {
  const [activeTab, setActiveTab] = useState<DetailTab>("DETAILS");
  const [shareStatus, setShareStatus] = useState("");
  const [ratingStatus, setRatingStatus] = useState("");
  const [globalStatsByEvent, setGlobalStatsByEvent] = useState<
    Record<string, { averageRating: number; reviewCount: number }>
  >({});
  const [userRatings, setUserRatings] = useState<Record<string, UserRating>>(() => {
    if (typeof window === "undefined") return {};
    const cachedRatings = window.sessionStorage.getItem(USER_RATINGS_STORAGE_KEY);
    if (!cachedRatings) return {};
    try {
      const parsed = JSON.parse(cachedRatings) as unknown;
      return sanitizeRatings(parsed);
    } catch {
      window.sessionStorage.removeItem(USER_RATINGS_STORAGE_KEY);
      return {};
    }
  });
  const [registered, setRegistered] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const resolvedUserId = getOrCreateUserId();

    const hydrateFromApi = async () => {
      try {
        const response = await fetch(`/api/event?userId=${encodeURIComponent(resolvedUserId)}`, {
          method: "GET",
          cache: "no-store",
        });
        if (!response.ok) return;
        const payload = (await response.json()) as { ratings?: unknown };
        const apiRatings = sanitizeRatings(payload.ratings);
        setUserRatings((prev) => {
          const merged = { ...prev, ...apiRatings };
          window.sessionStorage.setItem(USER_RATINGS_STORAGE_KEY, JSON.stringify(merged));
          return merged;
        });
      } catch {
        // Keep local cache as fallback when API sync fails.
      }
    };

    void hydrateFromApi();
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem(USER_RATINGS_STORAGE_KEY, JSON.stringify(userRatings));
  }, [userRatings]);

  useEffect(() => {
    const hydrateGlobalStats = async () => {
      try {
        const response = await fetch(`/api/event?eventId=${encodeURIComponent(event.id)}`, {
          method: "GET",
          cache: "no-store",
        });
        if (!response.ok) return;
        const payload = (await response.json()) as {
          averageRating?: number | null;
          reviewCount?: number;
        };
        if (typeof payload.reviewCount !== "number" || typeof payload.averageRating !== "number") return;
        setGlobalStatsByEvent((prev) => ({
          ...prev,
          [event.id]: {
            reviewCount: payload.reviewCount,
            averageRating: payload.averageRating,
          },
        }));
      } catch {
        // Keep initial event values if stats fetch fails.
      }
    };

    void hydrateGlobalStats();
  }, [event.id]);

  const handleRegister = (selectedEvent: Event) => {
    if (registered[selectedEvent.id]) return;
    setRegistered((prev) => ({ ...prev, [selectedEvent.id]: true }));
    setGlobalStatsByEvent((prev) => {
      const current = prev[selectedEvent.id] ?? {
        averageRating: selectedEvent.rating,
        reviewCount: selectedEvent.reviewCount,
      };
      return {
        ...prev,
        [selectedEvent.id]: {
          ...current,
          reviewCount: current.reviewCount + 1,
        },
      };
    });
  };

  const handleShare = async (selectedEvent: Event) => {
    const sharePayload = {
      title: selectedEvent.title,
      text: `${selectedEvent.title} by ${selectedEvent.organizer}`,
      url: typeof window !== "undefined" ? window.location.href : "",
    };

    try {
      if (navigator.share) {
        await navigator.share(sharePayload);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${sharePayload.title} - ${sharePayload.text} - ${sharePayload.url}`);
      }
      setShareStatus("Shared");
      setTimeout(() => setShareStatus(""), 1200);
    } catch {
      setShareStatus("Share failed");
      setTimeout(() => setShareStatus(""), 1200);
    }
  };

  const userRating = userRatings[event.id] ?? 0;
  const globalStats = globalStatsByEvent[event.id];
  const displayedAverageRating = globalStats?.averageRating ?? event.rating;
  const displayedReviewCount = globalStats?.reviewCount ?? event.reviewCount;
  const displayedRegistrations = displayedReviewCount;

  const handleRate = async (selectedEvent: Event, value: number) => {
    if (!isAllowedRating(value)) {
      setRatingStatus("Only 4 or 5 stars are allowed");
      window.setTimeout(() => setRatingStatus(""), 1200);
      return;
    }

    setUserRatings((prev) => ({ ...prev, [selectedEvent.id]: value }));
    setRatingStatus("Saved");
    window.setTimeout(() => setRatingStatus(""), 1200);

    const resolvedUserId = getOrCreateUserId();

    try {
      await fetch("/api/event", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: resolvedUserId,
          eventId: selectedEvent.id,
          rating: value,
        }),
      }).then(async (response) => {
        if (!response.ok) return null;
        return (await response.json()) as {
          averageRating?: number | null;
          reviewCount?: number;
        };
      }).then((payload) => {
        if (!payload) return;
        if (typeof payload.reviewCount !== "number" || typeof payload.averageRating !== "number") return;
        setGlobalStatsByEvent((prev) => ({
          ...prev,
          [selectedEvent.id]: {
            reviewCount: payload.reviewCount,
            averageRating: payload.averageRating,
          },
        }));
      });
    } catch {
      setRatingStatus("Saved locally");
      window.setTimeout(() => setRatingStatus(""), 1200);
    }
  };

  return (
    <div className="h-full min-h-[calc(100vh-4rem)] w-full" style={{  color: theme.four }}>
      <div className="h-full overflow-y-auto no-scrollbar">
        <div className="border-b" style={{ borderColor: theme.three }}>
          <div className="h-48 w-full p-6 bg-two">
            <img
              src="/itrix'26-logo.png"  
              alt={`${event.title} banner`}
              className="h-full w-full rounded-sm object-cover bg-one"
              style={{ backgroundColor: theme.one }}
            />
          </div>
          <div className="px-6 py-4">
            <h1 className="text-2xl font-semibold" style={{ color: theme.five }}>{event.title}</h1>
            <p className="mt-1 text-sm" style={{ color: theme.four }}>{event.organizer}</p>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm" style={{ color: theme.four }}>
              <span style={{ color: theme.twelve }}>{fixedFiveStars}</span>
              <span>{displayedAverageRating.toFixed(1)}</span>
              <span>({displayedReviewCount} reviews)</span>
              <span style={{ color: theme.three }}>|</span>
              <span>{displayedRegistrations} Registrations</span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs" style={{ color: theme.four }}>Your Rating:</span>
              <UserStars value={userRating} onRate={(value) => void handleRate(event, value)} />
              <span className="text-[11px]" style={{ color: theme.three }}>Only 4 or 5 stars</span>
              {ratingStatus ? <span className="text-[11px]" style={{ color: theme.twelve }}>{ratingStatus}</span> : null}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleRegister(event)}
                className="rounded-sm px-4 py-2 text-sm font-medium text-white transition-colors duration-200"
                style={{ backgroundColor: "#F7768E" }}
              >
                {registered[event.id] ? "Registered" : "Register"}
              </button>
              <button
                type="button"
                onClick={() => void handleShare(event)}
                className="rounded-sm border px-4 py-2 text-sm transition-colors duration-200 hover:border-[rgba(6,130,165,1)] hover:text-[rgba(6,130,165,1)]"
                style={{ borderColor: theme.three, color: theme.four }}
              >
                {shareStatus || "Share"}
              </button>
            </div>
          </div>
        </div>
        <DetailsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <DetailsPanel event={event} activeTab={activeTab} />
      </div>
    </div>
  );
};

export default EventsTab;
