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
  Ciudad,
  Vehiculo,
} from '../models';
import {CiudadRepository} from '../repositories';

export class CiudadVehiculoController {
  constructor(
    @repository(CiudadRepository) protected ciudadRepository: CiudadRepository,
  ) { }

  @get('/ciudads/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Ciudad has one Vehiculo',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Vehiculo),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Vehiculo>,
  ): Promise<Vehiculo> {
    return this.ciudadRepository.vehiculo(id).get(filter);
  }

  @post('/ciudads/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Ciudad model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Ciudad.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {
            title: 'NewVehiculoInCiudad',
            exclude: ['Id'],
            optional: ['id_Ciudad']
          }),
        },
      },
    }) vehiculo: Omit<Vehiculo, 'Id'>,
  ): Promise<Vehiculo> {
    return this.ciudadRepository.vehiculo(id).create(vehiculo);
  }

  @patch('/ciudads/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Ciudad.Vehiculo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {partial: true}),
        },
      },
    })
    vehiculo: Partial<Vehiculo>,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.ciudadRepository.vehiculo(id).patch(vehiculo, where);
  }

  @del('/ciudads/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Ciudad.Vehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.ciudadRepository.vehiculo(id).delete(where);
  }
}
