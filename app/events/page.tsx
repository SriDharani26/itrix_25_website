import EventsTab from "@/components/EventsTab";
import { eventsData } from "./eventsData";

const EventsPage = () => {
  return <EventsTab eventsData={eventsData} />;
};

export default EventsPage;
