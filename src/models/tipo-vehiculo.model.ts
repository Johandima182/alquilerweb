import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Administrador} from './administrador.model';
import {Vehiculo} from './vehiculo.model';

@model()
export class TipoVehiculo extends Entity {
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
  Descripcion: string;

  @belongsTo(() => Administrador, {name: 'administrador'})
  id_Administrador: string;

  @belongsTo(() => Vehiculo, {name: 'vehiculo'})
  id_Vehiculo: string;

  constructor(data?: Partial<TipoVehiculo>) {
    super(data);
  }
}

export interface TipoVehiculoRelations {
  // describe navigational properties here
}

export type TipoVehiculoWithRelations = TipoVehiculo & TipoVehiculoRelations;
