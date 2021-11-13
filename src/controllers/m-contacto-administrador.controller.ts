import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Administrador, MContacto
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
