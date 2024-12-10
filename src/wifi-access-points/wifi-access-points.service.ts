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
      id : { $regex: `^${id}$`, $options : 'i'}
    }).exec();
  }

  async findByColonia(colonia: string, page: number, limit: number) {

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.wifiAccessPointModel.find({
        colonia: { $regex: `^${colonia}$`, $options: 'i' }
      })
				.skip(skip).limit(limit).exec(),
      this.wifiAccessPointModel.find({
        colonia: { $regex: `^${colonia}$`, $options: 'i' }
      }).countDocuments().exec()
    ]);

    return { data, total, page, limit };
  }

  async findNearby(latitud: string, longitud: string, page: number, limit: number, max_distance : string) {

    const skip = (page - 1) * limit;

    const long = parseFloat(longitud);
    const lat = parseFloat(latitud);
    const maxDistance = parseInt(max_distance)

    const data = await this.wifiAccessPointModel.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [long, lat] }, // Coordenadas de referencia
          distanceField: 'distance', // El campo donde se almacenará la distancia calculada
          spherical: true, // Usamos coordenadas esféricas para calcular la distancia
          maxDistance: maxDistance, // Filtro para la distancia máxima en metros
        },
      },
      { $skip: skip },
      { $limit: limit }, 
    ]);
    
    // Contar los resultados
    const total = await this.wifiAccessPointModel.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [long, lat] }, // Coordenadas de referencia
          distanceField: 'distance', // El campo donde se almacenará la distancia calculada
          spherical: true, // Usamos coordenadas esféricas para calcular la distancia
          maxDistance: maxDistance, // Filtro para la distancia máxima en metros
        },
      },
      { $count: 'total' } 
    ]);
    
    return { data, total: total[0]?.total || 0, limit, page}
  }
}
