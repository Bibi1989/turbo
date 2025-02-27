import { IsInt, IsString } from 'class-validator';

export class CreateVenueDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  addressId: string;

  @IsString()
  streetName: string;

  @IsString()
  houseNumber: string;

  @IsString()
  city: string;

  @IsString()
  zipCode: string;

  region?: string;

  @IsString()
  country: string;
}
