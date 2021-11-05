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
  Asesor,
} from '../models';
import {CiudadRepository} from '../repositories';

export class CiudadAsesorController {
  constructor(
    @repository(CiudadRepository) protected ciudadRepository: CiudadRepository,
  ) { }

  @get('/ciudads/{id}/asesor', {
    responses: {
      '200': {
        description: 'Ciudad has one Asesor',
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
    return this.ciudadRepository.asesor(id).get(filter);
  }

  @post('/ciudads/{id}/asesor', {
    responses: {
      '200': {
        description: 'Ciudad model instance',
        content: {'application/json': {schema: getModelSchemaRef(Asesor)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Ciudad.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asesor, {
            title: 'NewAsesorInCiudad',
            exclude: ['Id'],
            optional: ['id_Ciudad']
          }),
        },
      },
    }) asesor: Omit<Asesor, 'Id'>,
  ): Promise<Asesor> {
    return this.ciudadRepository.asesor(id).create(asesor);
  }

  @patch('/ciudads/{id}/asesor', {
    responses: {
      '200': {
        description: 'Ciudad.Asesor PATCH success count',
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
    return this.ciudadRepository.asesor(id).patch(asesor, where);
  }

  @del('/ciudads/{id}/asesor', {
    responses: {
      '200': {
        description: 'Ciudad.Asesor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Asesor)) where?: Where<Asesor>,
  ): Promise<Count> {
    return this.ciudadRepository.asesor(id).delete(where);
  }
}
