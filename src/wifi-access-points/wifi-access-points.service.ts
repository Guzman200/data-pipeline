import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WifiAccessPoint } from './entities/wifi-access-point.entity';
import { Model } from 'mongoose';

@Injectable()
export class WifiAccessPointsService {

  constructor(
    @InjectModel(WifiAccessPoint.name) private readonly wifiAccessPointModel: Model<WifiAccessPoint>
  ) {
    //
  }

  async findAll(page: number, limit: number) {

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.wifiAccessPointModel.find()
				.skip(skip).limit(limit).exec(),
      this.wifiAccessPointModel.countDocuments().exec()
    ]);

    return { data, total, page, limit };
  }

  async findById(id: string) {
    return this.wifiAccessPointModel.findOne({
      id : id
    }).exec();
  }

  async findByColonia(colonia: string, page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.wifiAccessPointModel.find({
        colonia: { $regex: colonia, $options: 'i' }
      })
				.skip(skip).limit(limit).exec(),
      this.wifiAccessPointModel.find({
        colonia: { $regex: colonia, $options: 'i' }
      }).countDocuments().exec()
    ]);

    return { data, total, page, limit };
  }

  async findNearby(lat: number, long: number, page: number, limit: number) {
    const skip = (page - 1) * limit;
    return this.wifiAccessPointModel
      .find({
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [long, lat],
            },
            $maxDistance: 5000, // Opcional: Máxima distancia en metros
          },
        },
      })
      .skip(skip)
      .limit(limit);
  }
}
