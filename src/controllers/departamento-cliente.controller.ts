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
  Departamento,
  Cliente,
} from '../models';
import {DepartamentoRepository} from '../repositories';

export class DepartamentoClienteController {
  constructor(
    @repository(DepartamentoRepository) protected departamentoRepository: DepartamentoRepository,
  ) { }

  @get('/departamentos/{id}/cliente', {
    responses: {
      '200': {
        description: 'Departamento has one Cliente',
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
    return this.departamentoRepository.cliente(id).get(filter);
  }

  @post('/departamentos/{id}/cliente', {
    responses: {
      '200': {
        description: 'Departamento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Departamento.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewClienteInDepartamento',
            exclude: ['Id'],
            optional: ['id_Departamento']
          }),
        },
      },
    }) cliente: Omit<Cliente, 'Id'>,
  ): Promise<Cliente> {
    return this.departamentoRepository.cliente(id).create(cliente);
  }

  @patch('/departamentos/{id}/cliente', {
    responses: {
      '200': {
        description: 'Departamento.Cliente PATCH success count',
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
    return this.departamentoRepository.cliente(id).patch(cliente, where);
  }

  @del('/departamentos/{id}/cliente', {
    responses: {
      '200': {
        description: 'Departamento.Cliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.departamentoRepository.cliente(id).delete(where);
  }
}
