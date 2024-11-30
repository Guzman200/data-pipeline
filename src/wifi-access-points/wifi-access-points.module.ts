import { Module } from '@nestjs/common';
import { WifiAccessPointsService } from './wifi-access-points.service';
import { WifiAccessPointsController } from './wifi-access-points.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WifiAccessPoint, WifiAccessPointSchema } from './entities/wifi-access-point.entity';

@Module({
  imports : [
    MongooseModule.forFeature([{ name: WifiAccessPoint.name, schema: WifiAccessPointSchema }]),
  ],
  controllers: [WifiAccessPointsController],
  providers: [WifiAccessPointsService],
})
export class WifiAccessPointsModule {}
