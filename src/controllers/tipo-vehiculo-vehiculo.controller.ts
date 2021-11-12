import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  TipoVehiculo,
  Vehiculo,
} from '../models';
import {TipoVehiculoRepository} from '../repositories';

export class TipoVehiculoVehiculoController {
  constructor(
    @repository(TipoVehiculoRepository)
    public tipoVehiculoRepository: TipoVehiculoRepository,
  ) { }

  @get('/tipo-vehiculos/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Vehiculo belonging to TipoVehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async getVehiculo(
    @param.path.string('id') id: typeof TipoVehiculo.prototype.Id,
  ): Promise<Vehiculo> {
    return this.tipoVehiculoRepository.vehiculo(id);
  }
}
