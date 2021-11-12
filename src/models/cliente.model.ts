import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Persona} from './persona.model';
import {Solicitud} from './solicitud.model';

@model()
export class Cliente extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;




  @hasMany(() => Solicitud, {keyTo: 'id_Cliente'})
  solicitud: Solicitud[];

  @belongsTo(() => Persona, {name: 'persona'})
  id_Persona: string;

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
