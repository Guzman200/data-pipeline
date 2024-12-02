import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';
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

  @Get('colonia')
  async getByColonia(
    @Query('colonia') colonia: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {

    return await this.wifiAccessPointsService.findByColonia(colonia, page, limit);
  }

  @Get('nearby')
  async getNearby(
    @Query('lat') lat: string,
    @Query('long') long: string,
    @Query('max_distance') max_distance: string = "500",
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return await this.wifiAccessPointsService.findNearby(lat, long, page, limit, max_distance);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const result = await this.wifiAccessPointsService.findById(id);

    if (!result) {
      throw new NotFoundException(`Wifi Access Point con id ${id} no encontrado`);
    }
  
    return result;
  }
  
}
