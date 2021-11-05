import {Entity, hasOne, model, property} from '@loopback/repository';
import {Administrador} from './administrador.model';
import {Asesor} from './asesor.model';
import {Cliente} from './cliente.model';
import {Vehiculo} from './vehiculo.model';

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

  @hasOne(() => Cliente, {keyTo: 'id_Ciudad'})
  cliente: Cliente;


  @hasOne(() => Asesor, {keyTo: 'id_Ciudad'})
  asesor: Asesor;

  @hasOne(() => Vehiculo, {keyTo: 'id_Ciudad'})
  vehiculo: Vehiculo;

  @hasOne(() => Administrador, {keyTo: 'id_Ciudad'})
  administrador: Administrador;

  constructor(data?: Partial<Ciudad>) {
    super(data);
  }
}

export interface CiudadRelations {
  // describe navigational properties here
}

export type CiudadWithRelations = Ciudad & CiudadRelations;
