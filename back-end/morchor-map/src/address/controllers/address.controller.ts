import { Controller, Get } from '@nestjs/common';
import { AddressService } from 'src/address/services/address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('/test')
  getAddressTest(): string {
    return this.addressService.getAddressTest();
  }
}
