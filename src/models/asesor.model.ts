import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Administrador} from './administrador.model';
import {Solicitud} from './solicitud.model';
import {Vehiculo} from './vehiculo.model';
import {Persona} from './persona.model';

@model()
export class Asesor extends Entity {
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
  Aseptacion: string;
  @belongsTo(() => Administrador, {name: 'administrador'})
  id_Administrador: string;

  @property({
    type: 'string',
  })
  id_Administador?: string;

  @hasMany(() => Vehiculo, {keyTo: 'id_Asesor'})
  vehiculos: Vehiculo[];

  @hasMany(() => Solicitud, {keyTo: 'id_Asesor'})
  solicituds: Solicitud[];

  @belongsTo(() => Persona, {name: 'persona'})
  id_Persona: string;

  constructor(data?: Partial<Asesor>) {
    super(data);
  }
}

export interface AsesorRelations {
  // describe navigational properties here
}

export type AsesorWithRelations = Asesor & AsesorRelations;
