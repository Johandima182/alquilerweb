import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {TipoVehiculo, TipoVehiculoRelations, Administrador, Vehiculo} from '../models';
import {AdministradorRepository} from './administrador.repository';
import {VehiculoRepository} from './vehiculo.repository';

export class TipoVehiculoRepository extends DefaultCrudRepository<
  TipoVehiculo,
  typeof TipoVehiculo.prototype.Id,
  TipoVehiculoRelations
> {

  public readonly administrador: BelongsToAccessor<Administrador, typeof TipoVehiculo.prototype.Id>;

  public readonly vehiculo: BelongsToAccessor<Vehiculo, typeof TipoVehiculo.prototype.Id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(TipoVehiculo, dataSource);
    this.vehiculo = this.createBelongsToAccessorFor('vehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
    this.administrador = this.createBelongsToAccessorFor('administrador', administradorRepositoryGetter,);
    this.registerInclusionResolver('administrador', this.administrador.inclusionResolver);
  }
}
