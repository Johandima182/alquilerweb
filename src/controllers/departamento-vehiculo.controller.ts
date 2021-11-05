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
  Vehiculo,
} from '../models';
import {DepartamentoRepository} from '../repositories';

export class DepartamentoVehiculoController {
  constructor(
    @repository(DepartamentoRepository) protected departamentoRepository: DepartamentoRepository,
  ) { }

  @get('/departamentos/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Departamento has one Vehiculo',
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
    return this.departamentoRepository.vehiculo(id).get(filter);
  }

  @post('/departamentos/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Departamento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Departamento.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {
            title: 'NewVehiculoInDepartamento',
            exclude: ['Id'],
            optional: ['id_Departamento']
          }),
        },
      },
    }) vehiculo: Omit<Vehiculo, 'Id'>,
  ): Promise<Vehiculo> {
    return this.departamentoRepository.vehiculo(id).create(vehiculo);
  }

  @patch('/departamentos/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Departamento.Vehiculo PATCH success count',
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
    return this.departamentoRepository.vehiculo(id).patch(vehiculo, where);
  }

  @del('/departamentos/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Departamento.Vehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.departamentoRepository.vehiculo(id).delete(where);
  }
}
