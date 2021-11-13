import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Administrador, Asesor
} from '../models';
import {AsesorRepository} from '../repositories';

export class AsesorAdministradorController {
  constructor(
    @repository(AsesorRepository)
    public asesorRepository: AsesorRepository,
  ) { }

  @get('/asesors/{id}/administrador', {
    responses: {
      '200': {
        description: 'Administrador belonging to Asesor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Administrador)},
          },
        },
      },
    },
  })
  async getAdministrador(
    @param.path.string('id') id: typeof Asesor.prototype.Id,
  ): Promise<Administrador> {
    return this.asesorRepository.administrador(id);
  }
}
