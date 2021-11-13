import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Solicitud,
  Vehiculo
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudVehiculoController {
  constructor(
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Vehiculo belonging to Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async getVehiculo(
    @param.path.string('id') id: typeof Solicitud.prototype.Id,
  ): Promise<Vehiculo> {
    return this.solicitudRepository.vehiculo(id);
  }
}
