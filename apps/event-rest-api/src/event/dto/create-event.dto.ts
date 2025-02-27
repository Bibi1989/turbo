import { IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  title: string;
  description?: string;
  location?: string;
  venueId?: string;
  participant: string[];
  cateringId?: string;
  technicalId?: string;
  userId: string;
  startDate?: string;
  endDate?: string;
  isCancelled?: boolean;
  isFullDay?: boolean;
  isRecurring?: boolean;
  recurrence?: string;
  coverImage?: string;
  coverVideo?: string;
  coverAudio?: string;
  images?: string;
}
