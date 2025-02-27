"use client";

import React, { useEffect } from "react";

import { TEvent } from "@/types/event.type";
import EventCard from "../components/event-card.component";

type Props = {
  events: TEvent[];
};

const EventsContainer: React.FC<Props> = ({ events }) => {
  const [name, setName] = React.useState("");

  useEffect(() => {
    setName("Event");
  }, [name]);

  console.log(name);

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {events.map((event: TEvent) => {
        return <EventCard key={event.id} event={event} />;
      })}
    </div>
  );
};

export default EventsContainer;
