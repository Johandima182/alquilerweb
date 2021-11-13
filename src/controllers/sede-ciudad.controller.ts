import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Ciudad, Sede
} from '../models';
import {SedeRepository} from '../repositories';

export class SedeCiudadController {
  constructor(
    @repository(SedeRepository)
    public sedeRepository: SedeRepository,
  ) { }

  @get('/sedes/{id}/ciudad', {
    responses: {
      '200': {
        description: 'Ciudad belonging to Sede',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ciudad)},
          },
        },
      },
    },
  })
  async getCiudad(
    @param.path.string('id') id: typeof Sede.prototype.Id,
  ): Promise<Ciudad> {
    return this.sedeRepository.ciudad(id);
  }
}
