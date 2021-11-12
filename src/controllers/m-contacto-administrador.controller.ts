import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  MContacto,
  Administrador,
} from '../models';
import {MContactoRepository} from '../repositories';

export class MContactoAdministradorController {
  constructor(
    @repository(MContactoRepository)
    public mContactoRepository: MContactoRepository,
  ) { }

  @get('/m-contactos/{id}/administrador', {
    responses: {
      '200': {
        description: 'Administrador belonging to MContacto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Administrador)},
          },
        },
      },
    },
  })
  async getAdministrador(
    @param.path.string('id') id: typeof MContacto.prototype.Id,
  ): Promise<Administrador> {
    return this.mContactoRepository.administrador(id);
  }
}
