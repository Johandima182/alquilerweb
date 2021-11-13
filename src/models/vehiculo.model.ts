import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Asesor} from './asesor.model';
import {Sede} from './sede.model';
import {TipoVehiculo} from './tipo-vehiculo.model';
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
  Valor_Renta: number;
  @property({
    type: 'string',
    required: true,
  })
  Imagen: string;

  @property({
    type: 'number',
    required: true,
  })
  Descripcion: string;

  @belongsTo(() => Asesor, {name: 'asesor'})
  id_Asesor: string;

  @belongsTo(() => Sede, {name: 'sede'})
  id_Sede: string;

  @belongsTo(() => TipoVehiculo, {name: 'tipovehiculo'})
  id_TipoVehiculo: string;

  @hasMany(() => Solicitud, {keyTo: 'id_Vehiculo'})
  solicituds: Solicitud[];

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
