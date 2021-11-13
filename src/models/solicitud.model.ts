import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Vehiculo} from './vehiculo.model';
import {Asesor} from './asesor.model';

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
  Estado: string;

  @property({
    type: 'date',
    required: true,
  })
  Fecha_Solicitud: string;

  @property({
    type: 'date',
    required: true,
  })
  Fecha_Recogida: string;

  @property({
    type: 'date',
    required: true,
  })
  Fecha_Entrega: string;

  @property({
    type: 'date',
    required: true,
  })
  Hora_Recogida: string;

  @property({
    type: 'date',
    required: true,
  })
  Hora_Entrega: string;

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

  @belongsTo(() => Cliente, {name: 'cliente'})
  id_Cliente: string;

  @belongsTo(() => Vehiculo, {name: 'vehiculo'})
  id_Vehiculo: string;

  @belongsTo(() => Asesor, {name: 'asesor'})
  id_Asesor: string;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
