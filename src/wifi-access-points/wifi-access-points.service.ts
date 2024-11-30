import { Injectable } from '@nestjs/common';
import { CreateWifiAccessPointDto } from './dto/create-wifi-access-point.dto';
import { UpdateWifiAccessPointDto } from './dto/update-wifi-access-point.dto';

@Injectable()
export class WifiAccessPointsService {
  create(createWifiAccessPointDto: CreateWifiAccessPointDto) {
    return 'This action adds a new wifiAccessPoint';
  }

  findAll() {
    return `This action returns all wifiAccessPoints`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wifiAccessPoint`;
  }

  update(id: number, updateWifiAccessPointDto: UpdateWifiAccessPointDto) {
    return `This action updates a #${id} wifiAccessPoint`;
  }

  remove(id: number) {
    return `This action removes a #${id} wifiAccessPoint`;
  }
}
