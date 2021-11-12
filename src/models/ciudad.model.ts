import {Entity, model, property, hasMany} from '@loopback/repository';
import {Sede} from './sede.model';

@model()
export class Ciudad extends Entity {
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
  Nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  id_Departamento: string;

  @hasMany(() => Sede, {keyTo: 'id_Ciudad'})
  sedes: Sede[];

  constructor(data?: Partial<Ciudad>) {
    super(data);
  }
}

export interface CiudadRelations {
  // describe navigational properties here
}

export type CiudadWithRelations = Ciudad & CiudadRelations;
