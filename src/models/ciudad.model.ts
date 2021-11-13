import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Departamento} from './departamento.model';
import {Sede} from './sede.model';
import {Cliente} from './cliente.model';
import {Administrador} from './administrador.model';
import {Asesor} from './asesor.model';

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

  @belongsTo(() => Departamento, {name: 'departamento'})
  id_Departamento: string;

  @hasMany(() => Sede, {keyTo: 'id_Ciudad'})
  sedes: Sede[];

  @hasMany(() => Cliente, {keyTo: 'id_Ciudad'})
  clientes: Cliente[];

  @hasMany(() => Administrador, {keyTo: 'id_Ciudad'})
  administradors: Administrador[];

  @hasMany(() => Asesor, {keyTo: 'id_Ciudad'})
  asesors: Asesor[];

  constructor(data?: Partial<Ciudad>) {
    super(data);
  }
}

export interface CiudadRelations {
  // describe navigational properties here
}

export type CiudadWithRelations = Ciudad & CiudadRelations;
