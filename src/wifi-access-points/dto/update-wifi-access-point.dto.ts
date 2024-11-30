import { PartialType } from '@nestjs/mapped-types';
import { CreateWifiAccessPointDto } from './create-wifi-access-point.dto';

export class UpdateWifiAccessPointDto extends PartialType(CreateWifiAccessPointDto) {}
