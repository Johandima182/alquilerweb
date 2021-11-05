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
  Administrador,
} from '../models';
import {DepartamentoRepository} from '../repositories';

export class DepartamentoAdministradorController {
  constructor(
    @repository(DepartamentoRepository) protected departamentoRepository: DepartamentoRepository,
  ) { }

  @get('/departamentos/{id}/administrador', {
    responses: {
      '200': {
        description: 'Departamento has one Administrador',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Administrador),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Administrador>,
  ): Promise<Administrador> {
    return this.departamentoRepository.administrador(id).get(filter);
  }

  @post('/departamentos/{id}/administrador', {
    responses: {
      '200': {
        description: 'Departamento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Administrador)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Departamento.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Administrador, {
            title: 'NewAdministradorInDepartamento',
            exclude: ['Id'],
            optional: ['id_Departamento']
          }),
        },
      },
    }) administrador: Omit<Administrador, 'Id'>,
  ): Promise<Administrador> {
    return this.departamentoRepository.administrador(id).create(administrador);
  }

  @patch('/departamentos/{id}/administrador', {
    responses: {
      '200': {
        description: 'Departamento.Administrador PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Administrador, {partial: true}),
        },
      },
    })
    administrador: Partial<Administrador>,
    @param.query.object('where', getWhereSchemaFor(Administrador)) where?: Where<Administrador>,
  ): Promise<Count> {
    return this.departamentoRepository.administrador(id).patch(administrador, where);
  }

  @del('/departamentos/{id}/administrador', {
    responses: {
      '200': {
        description: 'Departamento.Administrador DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Administrador)) where?: Where<Administrador>,
  ): Promise<Count> {
    return this.departamentoRepository.administrador(id).delete(where);
  }
}
