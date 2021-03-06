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
  Cliente,
} from '../models';
import {CiudadRepository} from '../repositories';

export class CiudadClienteController {
  constructor(
    @repository(CiudadRepository) protected ciudadRepository: CiudadRepository,
  ) { }

  @get('/ciudads/{id}/clientes', {
    responses: {
      '200': {
        description: 'Array of Ciudad has many Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.ciudadRepository.clientes(id).find(filter);
  }

  @post('/ciudads/{id}/clientes', {
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
    return this.ciudadRepository.clientes(id).create(cliente);
  }

  @patch('/ciudads/{id}/clientes', {
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
    return this.ciudadRepository.clientes(id).patch(cliente, where);
  }

  @del('/ciudads/{id}/clientes', {
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
    return this.ciudadRepository.clientes(id).delete(where);
  }
}
