import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WifiAccessPointsService } from './wifi-access-points.service';
import { CreateWifiAccessPointDto } from './dto/create-wifi-access-point.dto';
import { UpdateWifiAccessPointDto } from './dto/update-wifi-access-point.dto';

@Controller('wifi-access-points')
export class WifiAccessPointsController {
  constructor(private readonly wifiAccessPointsService: WifiAccessPointsService) {}

  @Post()
  create(@Body() createWifiAccessPointDto: CreateWifiAccessPointDto) {
    return this.wifiAccessPointsService.create(createWifiAccessPointDto);
  }

  @Get()
  findAll() {
    return this.wifiAccessPointsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wifiAccessPointsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWifiAccessPointDto: UpdateWifiAccessPointDto) {
    return this.wifiAccessPointsService.update(+id, updateWifiAccessPointDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wifiAccessPointsService.remove(+id);
  }
}
