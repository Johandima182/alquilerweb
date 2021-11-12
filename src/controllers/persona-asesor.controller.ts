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
  Asesor,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaAsesorController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/asesors', {
    responses: {
      '200': {
        description: 'Array of Persona has many Asesor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Asesor)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Asesor>,
  ): Promise<Asesor[]> {
    return this.personaRepository.asesors(id).find(filter);
  }

  @post('/personas/{id}/asesors', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Asesor)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Persona.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asesor, {
            title: 'NewAsesorInPersona',
            exclude: ['Id'],
            optional: ['id_Persona']
          }),
        },
      },
    }) asesor: Omit<Asesor, 'Id'>,
  ): Promise<Asesor> {
    return this.personaRepository.asesors(id).create(asesor);
  }

  @patch('/personas/{id}/asesors', {
    responses: {
      '200': {
        description: 'Persona.Asesor PATCH success count',
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
    return this.personaRepository.asesors(id).patch(asesor, where);
  }

  @del('/personas/{id}/asesors', {
    responses: {
      '200': {
        description: 'Persona.Asesor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Asesor)) where?: Where<Asesor>,
  ): Promise<Count> {
    return this.personaRepository.asesors(id).delete(where);
  }
}
