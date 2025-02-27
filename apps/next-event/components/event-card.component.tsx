"use client";

import * as React from "react";
import Image from "next/image";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TEvent } from "@/types/event.type";
import Link from "next/link";

type Props = {
  event: TEvent;
};

const EventCard: React.FC<Props> = ({ event }) => {
  return (
    <Link href={`/event/${event.id}`}>
      <Card className="rounded-xs shadow-sm">
        <CardContent className="p-0">
          <Image
            src={JSON.parse(event.coverImage)}
            alt={event.title}
            width={2000}
            height={400}
          />
        </CardContent>
        <CardHeader className="pt-1">
          <h2 className="text-lg font-bold">{event.title}</h2>
          <p>Description: {event.description}</p>
          <p>Recurrence: {event.recurrence}</p>
          <div className="flex items-center justify-between">
            <p className="text-sm">
              {new Date(event.startDate).toDateString()}
            </p>
            <span className="mx-4">-</span>
            <p className="text-sm">{new Date(event.endDate).toDateString()}</p>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default EventCard;
