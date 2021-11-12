import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Vehiculo,
  TipoVehiculo,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoTipoVehiculoController {
  constructor(
    @repository(VehiculoRepository) protected vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/tipo-vehiculos', {
    responses: {
      '200': {
        description: 'Array of Vehiculo has many TipoVehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TipoVehiculo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<TipoVehiculo>,
  ): Promise<TipoVehiculo[]> {
    return this.vehiculoRepository.tipoVehiculos(id).find(filter);
  }

  @post('/vehiculos/{id}/tipo-vehiculos', {
    responses: {
      '200': {
        description: 'Vehiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(TipoVehiculo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehiculo.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoVehiculo, {
            title: 'NewTipoVehiculoInVehiculo',
            exclude: ['Id'],
            optional: ['id_Vehiculo']
          }),
        },
      },
    }) tipoVehiculo: Omit<TipoVehiculo, 'Id'>,
  ): Promise<TipoVehiculo> {
    return this.vehiculoRepository.tipoVehiculos(id).create(tipoVehiculo);
  }

  @patch('/vehiculos/{id}/tipo-vehiculos', {
    responses: {
      '200': {
        description: 'Vehiculo.TipoVehiculo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoVehiculo, {partial: true}),
        },
      },
    })
    tipoVehiculo: Partial<TipoVehiculo>,
    @param.query.object('where', getWhereSchemaFor(TipoVehiculo)) where?: Where<TipoVehiculo>,
  ): Promise<Count> {
    return this.vehiculoRepository.tipoVehiculos(id).patch(tipoVehiculo, where);
  }

  @del('/vehiculos/{id}/tipo-vehiculos', {
    responses: {
      '200': {
        description: 'Vehiculo.TipoVehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(TipoVehiculo)) where?: Where<TipoVehiculo>,
  ): Promise<Count> {
    return this.vehiculoRepository.tipoVehiculos(id).delete(where);
  }
}
