import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Asesor, Solicitud
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudAsesorController {
  constructor(
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/asesor', {
    responses: {
      '200': {
        description: 'Asesor belonging to Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Asesor)},
          },
        },
      },
    },
  })
  async getAsesor(
    @param.path.string('id') id: typeof Solicitud.prototype.Id,
  ): Promise<Asesor> {
    return this.solicitudRepository.asesor(id);
  }
}
