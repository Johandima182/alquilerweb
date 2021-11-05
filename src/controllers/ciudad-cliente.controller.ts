import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  Ciudad,
  Cliente
} from '../models';
import {CiudadRepository} from '../repositories';

export class CiudadClienteController {
  constructor(
    @repository(CiudadRepository) protected ciudadRepository: CiudadRepository,
  ) { }

  @get('/ciudads/{id}/cliente', {
    responses: {
      '200': {
        description: 'Ciudad has one Cliente',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cliente),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Cliente>,
  ): Promise<Cliente> {
    return this.ciudadRepository.cliente(id).get(filter);
  }

  @post('/ciudads/{id}/cliente', {
    responses: {
      '200': {
        description: 'Ciudad model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Ciudad.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewClienteInCiudad',
            exclude: ['Id'],
            optional: ['id_Ciudad']
          }),
        },
      },
    }) cliente: Omit<Cliente, 'Id'>,
  ): Promise<Cliente> {
    return this.ciudadRepository.cliente(id).create(cliente);
  }

  @patch('/ciudads/{id}/cliente', {
    responses: {
      '200': {
        description: 'Ciudad.Cliente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Partial<Cliente>,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.ciudadRepository.cliente(id).patch(cliente, where);
  }

  @del('/ciudads/{id}/cliente', {
    responses: {
      '200': {
        description: 'Ciudad.Cliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.ciudadRepository.cliente(id).delete(where);
  }
}
