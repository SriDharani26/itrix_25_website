"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type EventMode = "Online" | "Offline" | "Hybrid";
type EventCategory = "tech" | "non-tech" | "workshops";
type DifficultyLevel = "Beginner" | "Intermediate" | "Advanced";
type DetailTab = "DETAILS" | "SCHEDULE";

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

const accentColor = "rgba(6,130,165,1)";
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

const SectionHeader = ({ label }: { label: string }) => (
  <div className="px-4 py-2 text-[11px] font-semibold tracking-wider uppercase" style={{ color: accentColor }}>
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
  >
    <div className="flex gap-3">
      <img src={event.thumbnailImage} alt={event.title} className="h-10 w-10 rounded-sm bg-[#313234] p-1" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{event.title}</p>
        <p className="truncate text-xs text-gray-300">{event.organizer}</p>
        <p className="truncate text-xs text-gray-400">{event.shortDescription}</p>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-gray-300">
          <span className="text-[rgba(6,130,165,1)]">{fixedFiveStars}</span>
          <span>{formatDate(event.eventDate)}</span>
          <span className="text-orange-300">trend {event.trendingScore}</span>
        </div>
        <div className="mt-1 flex flex-wrap gap-1">
          {event.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-sm bg-[#313234] px-1.5 py-0.5 text-[10px] text-gray-200">
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
            activeTab === tab
              ? "border-b-[rgba(6,130,165,1)] text-[rgba(6,130,165,1)]"
              : "border-b-transparent text-gray-300 hover:text-gray-100"
          }`}
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
}) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => onRate(star)}
        className={`rounded-sm border px-2 py-1 text-xs transition-colors duration-150 ${
          star <= value
            ? "border-[rgba(6,130,165,1)] text-[rgba(6,130,165,1)]"
            : "border-gray-600 text-gray-300 hover:border-[rgba(6,130,165,1)]"
        }`}
      >
        *
      </button>
    ))}
  </div>
);

const DetailsPanel = ({ event, activeTab }: { event: Event; activeTab: DetailTab }) => (
  <div className="px-6 py-5">
    {activeTab === "DETAILS" ? (
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_280px]">
        <div className="space-y-4">
          <p className="text-sm leading-7 text-gray-200">{event.fullDescription}</p>
          <div>
            <p className="mb-2 text-sm font-semibold text-gray-100">Location</p>
            <p className="text-sm text-gray-300 break-words">{event.location}</p>
          </div>
        </div>

        <aside className="h-fit rounded-sm border border-gray-700 bg-[#252526] p-4">
          <h3 className="mb-3 text-sm font-semibold" style={{ color: accentColor }}>
            EVENT METADATA
          </h3>
          <div className="space-y-2 text-sm text-gray-200">
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
      <div className="rounded-sm border border-gray-700 bg-[#252526] p-5 text-sm text-gray-300">
        {activeTab} content placeholder.
      </div>
    )}
  </div>
);

interface EventsTabProps {
  eventsData?: Event[];
}

const EventsTab = ({ eventsData = [] }: EventsTabProps) => {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(eventsData[0]?.id ?? null);
  const [activeTab, setActiveTab] = useState<DetailTab>("DETAILS");
  const [mobileExplorerOpen, setMobileExplorerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktopLayout, setIsDesktopLayout] = useState(false);
  const [shareStatus, setShareStatus] = useState("");
  const [userRatings, setUserRatings] = useState<Record<string, number>>({});
  const [registrations, setRegistrations] = useState<Record<string, number>>({});
  const [registered, setRegistered] = useState<Record<string, boolean>>({});

  const rootRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollTopRef = useRef(0);
  const hideInsideMobileExplorer = pathname === "/events" && eventsData.length === 0;

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 1024);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const update = () => setIsDesktopLayout(window.innerWidth >= 800);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!selectedEventId && eventsData[0]) {
      setSelectedEventId(eventsData[0].id);
    }
  }, [eventsData, selectedEventId]);

  useEffect(() => {
    const parent = rootRef.current?.parentElement;
    if (!parent) return;
    if (hideInsideMobileExplorer) {
      parent.style.display = "none";
    } else {
      parent.style.display = "";
    }
    return () => {
      parent.style.display = "";
    };
  }, [hideInsideMobileExplorer]);

  useEffect(() => {
    if (pathname !== "/events" || !isDesktopLayout) return;

    const contentPane = rootRef.current?.parentElement;
    const layoutRoot = contentPane?.parentElement;
    const leftPane = layoutRoot?.firstElementChild as HTMLElement | null;
    const navbarAside = leftPane?.querySelector("aside");
    const navbarContent = navbarAside?.children?.[1] as HTMLElement | undefined;

    if (!contentPane || !leftPane) return;

    const prevLeftWidth = leftPane.style.width;
    const prevLeftMinWidth = leftPane.style.minWidth;
    const prevLeftMaxWidth = leftPane.style.maxWidth;
    const prevContentWidth = contentPane.style.width;
    const prevContentFlex = contentPane.style.flex;
    const prevContentMaxWidth = contentPane.style.maxWidth;
    const prevNavbarContentDisplay = navbarContent?.style.display ?? "";
    const prevNavbarContentPadding = navbarContent?.style.padding ?? "";

    leftPane.style.width = "64px";
    leftPane.style.minWidth = "64px";
    leftPane.style.maxWidth = "64px";
    contentPane.style.width = "";
    contentPane.style.maxWidth = "";
    contentPane.style.flex = "1 1 auto";
    if (navbarContent) {
      navbarContent.style.display = "none";
      navbarContent.style.padding = "0";
    }

    return () => {
      leftPane.style.width = prevLeftWidth;
      leftPane.style.minWidth = prevLeftMinWidth;
      leftPane.style.maxWidth = prevLeftMaxWidth;
      contentPane.style.width = prevContentWidth;
      contentPane.style.maxWidth = prevContentMaxWidth;
      contentPane.style.flex = prevContentFlex;
      if (navbarContent) {
        navbarContent.style.display = prevNavbarContentDisplay;
        navbarContent.style.padding = prevNavbarContentPadding;
      }
    };
  }, [pathname, isDesktopLayout]);

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

  const displayedEvent = filteredEvents.find((event) => event.id === selectedEventId) ?? filteredEvents[0];

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollTopRef.current;
    }
  }, [filteredEvents, displayedEvent?.id]);

  const handleSelect = (event: Event) => {
    setSelectedEventId(event.id);
    if (isMobile) {
      setMobileExplorerOpen(false);
    }
  };

  const handleRegister = (event: Event) => {
    if (registered[event.id]) return;
    setRegistered((prev) => ({ ...prev, [event.id]: true }));
    setRegistrations((prev) => ({
      ...prev,
      [event.id]: (prev[event.id] ?? event.registrations) + 1,
    }));
  };

  const handleShare = async (event: Event) => {
    const sharePayload = {
      title: event.title,
      text: `${event.title} by ${event.organizer}`,
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

  if (hideInsideMobileExplorer) {
    return null;
  }

  if (!displayedEvent) {
    return (
      <div ref={rootRef} className="rounded-sm border border-gray-700 bg-[#1e1e1e] p-4 text-sm text-gray-300">
        No events loaded here. Open the `/events` page to view all events.
      </div>
    );
  }

  const displayedRegistrations = registrations[displayedEvent.id] ?? displayedEvent.registrations;
  const userRating = userRatings[displayedEvent.id] ?? 0;

  return (
    <div ref={rootRef} className="h-full min-h-[calc(100vh-4rem)] w-full bg-[#1e1e1e] text-gray-100">
      <div className="flex h-full w-full flex-col lg:flex-row">
        <aside className="hidden w-[320px] border-r border-gray-700 lg:block">
          <div className="border-b border-gray-700 p-3">
            <input
              type="text"
              placeholder="Search events"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-sm border border-gray-600 bg-[#252526] px-3 py-2 text-sm text-gray-100 outline-none transition-colors duration-200 placeholder:text-gray-400 focus:border-[rgba(6,130,165,1)]"
            />
          </div>
          <div
            ref={scrollContainerRef}
            onScroll={(e) => {
              scrollTopRef.current = e.currentTarget.scrollTop;
            }}
            className="max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <SidebarSection title="TECH" items={grouped.tech} selectedId={displayedEvent.id} onSelect={handleSelect} />
            <SidebarSection title="NON-TECH" items={grouped.nonTech} selectedId={displayedEvent.id} onSelect={handleSelect} />
            <SidebarSection
              title="WORKSHOPS"
              items={grouped.workshops}
              selectedId={displayedEvent.id}
              onSelect={handleSelect}
              showDivider={false}
            />
          </div>
        </aside>

        <main className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto">
            <div className="border-b border-gray-700">
              <div className="h-48 w-full bg-[#252526] p-6">
                <img
                  src={displayedEvent.bannerImage}
                  alt={`${displayedEvent.title} banner`}
                  className="h-full w-full rounded-sm bg-[#313234] object-contain p-4"
                />
              </div>
              <div className="px-6 py-4">
                <h1 className="text-2xl font-semibold">{displayedEvent.title}</h1>
                <p className="mt-1 text-sm text-gray-300">{displayedEvent.organizer}</p>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-300">
                  <span className="text-[rgba(6,130,165,1)]">{fixedFiveStars}</span>
                  <span>{displayedEvent.rating.toFixed(1)}</span>
                  <span>({displayedEvent.reviewCount} reviews)</span>
                  <span className="text-gray-500">|</span>
                  <span>{displayedRegistrations} Registrations</span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs text-gray-300">Your Rating:</span>
                  <UserStars
                    value={userRating}
                    onRate={(value) => setUserRatings((prev) => ({ ...prev, [displayedEvent.id]: value }))}
                  />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleRegister(displayedEvent)}
                    className="rounded-sm px-4 py-2 text-sm font-medium text-white transition-colors duration-200"
                    style={{ backgroundColor: accentColor }}
                  >
                    {registered[displayedEvent.id] ? "Registered" : "Register"}
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleShare(displayedEvent)}
                    className="rounded-sm border border-gray-600 px-4 py-2 text-sm text-gray-200 transition-colors duration-200 hover:border-[rgba(6,130,165,1)] hover:text-[rgba(6,130,165,1)]"
                  >
                    {shareStatus || "Share"}
                  </button>
                </div>
              </div>
            </div>
            <DetailsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <DetailsPanel event={displayedEvent} activeTab={activeTab} />
          </div>
        </main>
      </div>

      <div className="pointer-events-none fixed bottom-14 left-0 right-0 z-40 lg:hidden">
        <div className="pointer-events-auto w-full border-t border-gray-700 bg-[#1f1f1f]">
          <button
            type="button"
            onClick={() => setMobileExplorerOpen((prev) => !prev)}
            className={`w-full border-b border-gray-700 text-left transition-all duration-200 ${
              mobileExplorerOpen ? "px-3 py-2 text-sm text-gray-200" : "h-[20px] px-3 text-[11px] text-gray-300"
            }`}
          >
            Event Explorer
          </button>
          <div
            className={`overflow-hidden transition-[max-height] duration-200 ${
              mobileExplorerOpen ? "max-h-[62vh]" : "max-h-0"
            }`}
          >
            <div className="border-b border-gray-700 p-3">
              <input
                type="text"
                placeholder="Search events"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-sm border border-gray-600 bg-[#252526] px-3 py-2 text-sm text-gray-100 outline-none transition-colors duration-200 placeholder:text-gray-400 focus:border-[rgba(6,130,165,1)]"
              />
            </div>
            <div className="max-h-[52vh] overflow-y-auto">
              <SidebarSection title="TECH" items={grouped.tech} selectedId={displayedEvent.id} onSelect={handleSelect} />
              <SidebarSection title="NON-TECH" items={grouped.nonTech} selectedId={displayedEvent.id} onSelect={handleSelect} />
              <SidebarSection
                title="WORKSHOPS"
                items={grouped.workshops}
                selectedId={displayedEvent.id}
                onSelect={handleSelect}
                showDivider={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsTab;
