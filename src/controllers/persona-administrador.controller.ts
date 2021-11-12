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
  Persona,
  Administrador,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaAdministradorController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/administradors', {
    responses: {
      '200': {
        description: 'Array of Persona has many Administrador',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Administrador)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Administrador>,
  ): Promise<Administrador[]> {
    return this.personaRepository.administradors(id).find(filter);
  }

  @post('/personas/{id}/administradors', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Administrador)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Persona.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Administrador, {
            title: 'NewAdministradorInPersona',
            exclude: ['Id'],
            optional: ['id_Persona']
          }),
        },
      },
    }) administrador: Omit<Administrador, 'Id'>,
  ): Promise<Administrador> {
    return this.personaRepository.administradors(id).create(administrador);
  }

  @patch('/personas/{id}/administradors', {
    responses: {
      '200': {
        description: 'Persona.Administrador PATCH success count',
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
    return this.personaRepository.administradors(id).patch(administrador, where);
  }

  @del('/personas/{id}/administradors', {
    responses: {
      '200': {
        description: 'Persona.Administrador DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Administrador)) where?: Where<Administrador>,
  ): Promise<Count> {
    return this.personaRepository.administradors(id).delete(where);
  }
}
