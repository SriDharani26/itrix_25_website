import { EventsDetailsView } from "@/components/EventsTab";
// import ArcadePanel from "@/components/ArcadePanel";
import { eventsData } from "./eventsData";
import SnakeGameDev from "@/components/ArcadePanel";

type EventsPageProps = {
  searchParams: Promise<{
    event?: string;
  }>;
};

const EventsPage = async ({ searchParams }: EventsPageProps) => {
  const params = await searchParams;
  const selectedEvent = eventsData.find((event) => event.id === params.event);

  if (!selectedEvent) {
    return <SnakeGameDev />;
  }

  return <EventsDetailsView event={selectedEvent} />;
};

export default EventsPage;
