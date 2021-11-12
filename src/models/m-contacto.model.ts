import {Entity, model, property} from '@loopback/repository';

@model()
export class MContacto extends Entity {
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
  CorreoRem: string;

  @property({
    type: 'string',
    required: true,
  })
  CorreoDes: string;

  @property({
    type: 'string',
    required: true,
  })
  Mensaje: string;

  @property({
    type: 'string',
    required: true,
  })
  Asunto: string;

  @property({
    type: 'string',
    required: true,
  })
  id_Administrador: string;


  constructor(data?: Partial<MContacto>) {
    super(data);
  }
}

export interface MContactoRelations {
  // describe navigational properties here
}

export type MContactoWithRelations = MContacto & MContactoRelations;
