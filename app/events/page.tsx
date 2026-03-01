import { EventsDetailsView } from "@/components/EventsTab";
import { eventsData } from "./eventsData";

type EventsPageProps = {
  searchParams: Promise<{
    event?: string;
  }>;
};

const EventsPage = async ({ searchParams }: EventsPageProps) => {
  const params = await searchParams;
  const selectedEvent = eventsData.find((event) => event.id === params.event);

  if (!selectedEvent) {
    return (
      <div className="h-full min-h-[calc(100vh-4rem)] w-full bg-[#1e1e1e] text-gray-300 flex items-center justify-center">
        Event
      </div>
    );
  }

  return <EventsDetailsView event={selectedEvent} />;
};

export default EventsPage;
