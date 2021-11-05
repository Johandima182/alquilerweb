import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Asesor} from './asesor.model';
import {Solicitud} from './solicitud.model';

@model()
export class Vehiculo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Marca: string;

  @property({
    type: 'string',
    required: true,
  })
  Modelo: string;

  @property({
    type: 'string',
    required: true,
  })
  TipoVehiculo: string;

  @property({
    type: 'string',
    required: true,
  })
  Placa: string;

  @property({
    type: 'string',
    required: true,
  })
  Estado: string;

  @property({
    type: 'number',
    required: true,
  })
  PrecioAlquiler: number;

  @property({
    type: 'string',
    required: true,
  })
  id_Departamento: string;

  @property({
    type: 'string',
    required: true,
  })
  id_Ciudad: string;
  @property({
    type: 'string',
    required: true,
  })
  Imagen: string;

  @belongsTo(() => Asesor, {name: 'asesor'})
  id_Asesor: string;

  @hasMany(() => Solicitud, {keyTo: 'id_Vehiculo'})
  solicitud: Solicitud[];

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
