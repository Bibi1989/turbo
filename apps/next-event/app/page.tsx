import { getUserEvents } from "@/services/event";
import EventsContainer from "@/containers/events.container";
import SearchContainer from "../containers/search-filter.container";

const Home = async () => {
  const events = await getUserEvents();

  return (
    <div>
      <section className="mt-4">
        <SearchContainer />
      </section>
      <section className="mt-8">
        <h1 className="text-3xl font-bold mb-4">Events</h1>
        <EventsContainer events={events} />
      </section>
    </div>
  );
};

export default Home;
