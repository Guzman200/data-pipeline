import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection : 'wifi_access_points'})
export class WifiAccessPoint {

    @Prop({ required: true })
    id: string;

    @Prop({ required: true })
    programa: string;

    @Prop({ required: true })
    fecha_instalacion: Date;

    @Prop({ required: true, type: Number })
    latitud: number;

    @Prop({ required: true, type: Number })
    longitud: number;

    @Prop({ required: true })
    colonia: string;

    @Prop({ required: true })
    alcaldia: string;

    /*

    @Prop({ type: { type: String, default: 'Point' }})
    type: string;

    @Prop({})
    coordinates: [number];
    */
}



export const WifiAccessPointSchema = SchemaFactory.createForClass(WifiAccessPoint);

WifiAccessPointSchema.index({ location: '2dsphere' });