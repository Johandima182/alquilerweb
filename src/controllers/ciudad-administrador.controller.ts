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
  Administrador,
} from '../models';
import {CiudadRepository} from '../repositories';

export class CiudadAdministradorController {
  constructor(
    @repository(CiudadRepository) protected ciudadRepository: CiudadRepository,
  ) { }

  @get('/ciudads/{id}/administrador', {
    responses: {
      '200': {
        description: 'Ciudad has one Administrador',
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
    return this.ciudadRepository.administrador(id).get(filter);
  }

  @post('/ciudads/{id}/administrador', {
    responses: {
      '200': {
        description: 'Ciudad model instance',
        content: {'application/json': {schema: getModelSchemaRef(Administrador)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Ciudad.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Administrador, {
            title: 'NewAdministradorInCiudad',
            exclude: ['Id'],
            optional: ['id_Ciudad']
          }),
        },
      },
    }) administrador: Omit<Administrador, 'Id'>,
  ): Promise<Administrador> {
    return this.ciudadRepository.administrador(id).create(administrador);
  }

  @patch('/ciudads/{id}/administrador', {
    responses: {
      '200': {
        description: 'Ciudad.Administrador PATCH success count',
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
    return this.ciudadRepository.administrador(id).patch(administrador, where);
  }

  @del('/ciudads/{id}/administrador', {
    responses: {
      '200': {
        description: 'Ciudad.Administrador DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Administrador)) where?: Where<Administrador>,
  ): Promise<Count> {
    return this.ciudadRepository.administrador(id).delete(where);
  }
}
