import {Entity, model, property} from '@loopback/repository';

@model()
export class Solicitud extends Entity {
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
  id_Cliente: string;

  @property({
    type: 'string',
    required: true,
  })
  id_Vehiculo: string;

  @property({
    type: 'string',
    required: true,
  })
  id_Asesor: string;

  @property({
    type: 'string',
    required: true,
  })
  Estado: string;

  @property({
    type: 'date',
    required: true,
  })
  Fecha: string;

  @property({
    type: 'number',
    required: true,
  })
  NumDias: number;

  @property({
    type: 'number',
    required: true,
  })
  ValorDia: number;

  @property({
    type: 'number',
    required: true,
  })
  ValorTotal: number;


  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
