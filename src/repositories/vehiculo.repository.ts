import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Asesor, Solicitud, Sede, TipoVehiculo} from '../models';
import {AsesorRepository} from './asesor.repository';
import {SolicitudRepository} from './solicitud.repository';
import {SedeRepository} from './sede.repository';
import {TipoVehiculoRepository} from './tipo-vehiculo.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.Id,
  VehiculoRelations
> {

  public readonly asesor: BelongsToAccessor<Asesor, typeof Vehiculo.prototype.Id>;

  public readonly solicitud: HasManyRepositoryFactory<Solicitud, typeof Vehiculo.prototype.Id>;

  public readonly sede: BelongsToAccessor<Sede, typeof Vehiculo.prototype.Id>;

  public readonly tipoVehiculos: HasManyRepositoryFactory<TipoVehiculo, typeof Vehiculo.prototype.Id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('SedeRepository') protected sedeRepositoryGetter: Getter<SedeRepository>, @repository.getter('TipoVehiculoRepository') protected tipoVehiculoRepositoryGetter: Getter<TipoVehiculoRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.tipoVehiculos = this.createHasManyRepositoryFactoryFor('tipoVehiculos', tipoVehiculoRepositoryGetter,);
    this.registerInclusionResolver('tipoVehiculos', this.tipoVehiculos.inclusionResolver);
    this.sede = this.createBelongsToAccessorFor('sede', sedeRepositoryGetter,);
    this.registerInclusionResolver('sede', this.sede.inclusionResolver);
    this.solicitud = this.createHasManyRepositoryFactoryFor('solicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitud', this.solicitud.inclusionResolver);
    this.asesor = this.createBelongsToAccessorFor('asesor', asesorRepositoryGetter,);
    this.registerInclusionResolver('asesor', this.asesor.inclusionResolver);
  }
}
