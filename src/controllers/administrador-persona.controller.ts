import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Administrador,
  Persona,
} from '../models';
import {AdministradorRepository} from '../repositories';

export class AdministradorPersonaController {
  constructor(
    @repository(AdministradorRepository)
    public administradorRepository: AdministradorRepository,
  ) { }

  @get('/administradors/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to Administrador',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.string('id') id: typeof Administrador.prototype.Id,
  ): Promise<Persona> {
    return this.administradorRepository.persona(id);
  }
}
