import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Ciudad} from './ciudad.model';
import {Vehiculo} from './vehiculo.model';

@model()
export class Sede extends Entity {
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

  @belongsTo(() => Ciudad, {name: 'ciudad'})
  id_Ciudad: string;

  @hasMany(() => Vehiculo, {keyTo: 'id_Sede'})
  vehiculos: Vehiculo[];

  constructor(data?: Partial<Sede>) {
    super(data);
  }
}

export interface SedeRelations {
  // describe navigational properties here
}

export type SedeWithRelations = Sede & SedeRelations;
