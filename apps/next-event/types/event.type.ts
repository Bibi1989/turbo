import { TUser } from "./user.type";

export type TEvent = {
  id: string;
  title: string;
  description: string;
  location?: string;
  venueId?: string;
  participant?: string;
  cateringId: string;
  technicalId: string;
  startDate: Date;
  endDate: Date;
  isCancelled: boolean;
  isFullDay: boolean;
  isRecurring: boolean;
  recurrence: string;
  coverImage: string;
  coverVideo: string;
  coverAudio: string;
  images: string;
  updatedAt: Date;
  createdAt: Date;
  userId: string;
  User: TUser;
  Catering: any;
  Technical: any;
  Venue: any;
};
