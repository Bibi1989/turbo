import { Event } from '@prisma/client';

export class Venue {
  id: string;
  name: string;
  address: string;
  addressId: string;
  Events: Event[];
  createdAt: Date;
  updatedAt: Date;
}
