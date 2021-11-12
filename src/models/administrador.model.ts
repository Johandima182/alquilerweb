import {Entity, hasMany, model, property} from '@loopback/repository';
import {Asesor} from './asesor.model';
import {MContacto} from './m-contacto.model';
import {TipoVehiculo} from './tipo-vehiculo.model';

@model()
export class Administrador extends Entity {
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
  id_Persona: string;

  @hasMany(() => Asesor, {keyTo: 'id_Administador'})
  asesors: Asesor[];

  @hasMany(() => TipoVehiculo, {keyTo: 'id_Administrador'})
  tipoVehiculos: TipoVehiculo[];

  @hasMany(() => MContacto, {keyTo: 'id_Administrador'})
  mContactos: MContacto[];

  constructor(data?: Partial<Administrador>) {
    super(data);
  }
}

export interface AdministradorRelations {
  // describe navigational properties here
}

export type AdministradorWithRelations = Administrador & AdministradorRelations;
