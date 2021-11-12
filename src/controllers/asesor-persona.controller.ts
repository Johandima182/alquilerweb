import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Asesor,
  Persona,
} from '../models';
import {AsesorRepository} from '../repositories';

export class AsesorPersonaController {
  constructor(
    @repository(AsesorRepository)
    public asesorRepository: AsesorRepository,
  ) { }

  @get('/asesors/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to Asesor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.string('id') id: typeof Asesor.prototype.Id,
  ): Promise<Persona> {
    return this.asesorRepository.persona(id);
  }
}
