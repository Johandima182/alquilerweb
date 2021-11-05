import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Cliente, ClienteRelations, Solicitud} from '../models';
import {CiudadRepository} from './ciudad.repository';
import {SolicitudRepository} from './solicitud.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.Id,
  ClienteRelations
> {

  public readonly solicitud: HasManyRepositoryFactory<Solicitud, typeof Cliente.prototype.Id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>,
  ) {
    super(Cliente, dataSource);
    this.solicitud = this.createHasManyRepositoryFactoryFor('solicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitud', this.solicitud.inclusionResolver);



  }
}
