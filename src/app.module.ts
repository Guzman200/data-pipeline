import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WifiAccessPointsModule } from './wifi-access-points/wifi-access-points.module';

@Module({
  imports: [WifiAccessPointsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
