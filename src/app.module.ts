import { Module } from '@nestjs/common';
import { WifiAccessPointsModule } from './wifi-access-points/wifi-access-points.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/nestdb'),
    WifiAccessPointsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
