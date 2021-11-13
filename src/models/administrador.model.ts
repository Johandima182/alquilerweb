import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Ciudad} from './ciudad.model';
import {Asesor} from './asesor.model';
import {TipoVehiculo} from './tipo-vehiculo.model';
import {MContacto} from './m-contacto.model';

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
  Nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  Apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  TipoDoc: string;

  @property({
    type: 'string',
    required: true,
  })
  NumDoc: string;

  @property({
    type: 'string',
    required: true,
  })
  Telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  Celular: string;

  @property({
    type: 'string',
    required: true,
  })
  Direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  Correo: string;

  @property({
    type: 'string',
    required: true,
  })
  Genero: string;

  @property({
    type: 'string',
    required: true,
  })
  Clave: string;

  @belongsTo(() => Ciudad, {name: 'ciudad'})
  id_Ciudad: string;

  @hasMany(() => Asesor, {keyTo: 'id_Administrador'})
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
