import { Controller, Get, Param, Query } from '@nestjs/common';
import { WifiAccessPointsService } from './wifi-access-points.service';

@Controller('wifi-access-points')
export class WifiAccessPointsController {

  constructor(private readonly wifiAccessPointsService: WifiAccessPointsService) {}

  @Get()
  async getAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.wifiAccessPointsService.findAll(page, limit);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.wifiAccessPointsService.findById(id);
  }

  @Get('colonia')
  async getByColonia(
    @Query('colonia') colonia: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.wifiAccessPointsService.findByColonia(colonia, page, limit);
  }

  @Get('nearby')
  async getNearby(
    @Query('lat') lat: number,
    @Query('long') long: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.wifiAccessPointsService.findNearby(lat, long, page, limit);
  }
  
}
