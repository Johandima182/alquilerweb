import {Entity, hasOne, model, property, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Asesor} from './asesor.model';
import {Vehiculo} from './vehiculo.model';
import {Administrador} from './administrador.model';
import {Ciudad} from './ciudad.model';

@model()
export class Departamento extends Entity {
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
  id_Ciudad: string;

  @hasOne(() => Cliente, {keyTo: 'id_Departamento'})
  cliente: Cliente;

  @hasOne(() => Asesor, {keyTo: 'id_Departamento'})
  asesor: Asesor;

  @hasOne(() => Vehiculo, {keyTo: 'id_Departamento'})
  vehiculo: Vehiculo;

  @hasOne(() => Administrador, {keyTo: 'id_Departamento'})
  administrador: Administrador;

  @hasMany(() => Ciudad, {keyTo: 'id_Departamento'})
  ciudads: Ciudad[];

  constructor(data?: Partial<Departamento>) {
    super(data);
  }
}

export interface DepartamentoRelations {
  // describe navigational properties here
}

export type DepartamentoWithRelations = Departamento & DepartamentoRelations;
