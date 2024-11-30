import { Module } from '@nestjs/common';
import { WifiAccessPointsService } from './wifi-access-points.service';
import { WifiAccessPointsController } from './wifi-access-points.controller';

@Module({
  controllers: [WifiAccessPointsController],
  providers: [WifiAccessPointsService],
})
export class WifiAccessPointsModule {}
