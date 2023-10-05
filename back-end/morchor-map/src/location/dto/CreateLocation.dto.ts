import { IsNotEmpty } from 'class-validator';

export class CreateLocationDTO {
  @IsNotEmpty()
  locationName: string[];

  @IsNotEmpty()
  categoryName: string;

  img: string;

  houseNumber: number;

  villageNumber: number;

  alley: string;

  subDistrict: string;

  district: string;

  postalCode: string;

  @IsNotEmpty()
  latitude: string;

  @IsNotEmpty()
  longtitude: string;
}
