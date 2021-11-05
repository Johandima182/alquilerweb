import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Asesor, Solicitud} from '../models';
import {AsesorRepository} from './asesor.repository';
import {SolicitudRepository} from './solicitud.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.Id,
  VehiculoRelations
> {

  public readonly asesor: BelongsToAccessor<Asesor, typeof Vehiculo.prototype.Id>;

  public readonly solicitud: HasManyRepositoryFactory<Solicitud, typeof Vehiculo.prototype.Id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.solicitud = this.createHasManyRepositoryFactoryFor('solicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitud', this.solicitud.inclusionResolver);
    this.asesor = this.createBelongsToAccessorFor('asesor', asesorRepositoryGetter,);
    this.registerInclusionResolver('asesor', this.asesor.inclusionResolver);
  }
}
