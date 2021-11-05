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
  Asesor,
} from '../models';
import {DepartamentoRepository} from '../repositories';

export class DepartamentoAsesorController {
  constructor(
    @repository(DepartamentoRepository) protected departamentoRepository: DepartamentoRepository,
  ) { }

  @get('/departamentos/{id}/asesor', {
    responses: {
      '200': {
        description: 'Departamento has one Asesor',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Asesor),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Asesor>,
  ): Promise<Asesor> {
    return this.departamentoRepository.asesor(id).get(filter);
  }

  @post('/departamentos/{id}/asesor', {
    responses: {
      '200': {
        description: 'Departamento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Asesor)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Departamento.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asesor, {
            title: 'NewAsesorInDepartamento',
            exclude: ['Id'],
            optional: ['id_Departamento']
          }),
        },
      },
    }) asesor: Omit<Asesor, 'Id'>,
  ): Promise<Asesor> {
    return this.departamentoRepository.asesor(id).create(asesor);
  }

  @patch('/departamentos/{id}/asesor', {
    responses: {
      '200': {
        description: 'Departamento.Asesor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asesor, {partial: true}),
        },
      },
    })
    asesor: Partial<Asesor>,
    @param.query.object('where', getWhereSchemaFor(Asesor)) where?: Where<Asesor>,
  ): Promise<Count> {
    return this.departamentoRepository.asesor(id).patch(asesor, where);
  }

  @del('/departamentos/{id}/asesor', {
    responses: {
      '200': {
        description: 'Departamento.Asesor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Asesor)) where?: Where<Asesor>,
  ): Promise<Count> {
    return this.departamentoRepository.asesor(id).delete(where);
  }
}
