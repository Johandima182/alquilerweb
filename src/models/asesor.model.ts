import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Administrador} from './administrador.model';
import {Vehiculo} from './vehiculo.model';
import {Solicitud} from './solicitud.model';

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
  Clave: string;

  @property({
    type: 'string',
    required: true,
  })
  Estado: string;
  @property({
    type: 'string',
    required: true,
  })
  id_Departamento: string;

  @property({
    type: 'string',
    required: true,
  })
  id_Ciudad: string;

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

  constructor(data?: Partial<Asesor>) {
    super(data);
  }
}

export interface AsesorRelations {
  // describe navigational properties here
}

export type AsesorWithRelations = Asesor & AsesorRelations;
