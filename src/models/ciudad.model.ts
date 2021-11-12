import {Entity, model, property, hasMany} from '@loopback/repository';
import {Sede} from './sede.model';
import {Persona} from './persona.model';

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

  @hasMany(() => Persona, {keyTo: 'id_Ciudad'})
  personas: Persona[];

  constructor(data?: Partial<Ciudad>) {
    super(data);
  }
}

export interface CiudadRelations {
  // describe navigational properties here
}

export type CiudadWithRelations = Ciudad & CiudadRelations;
