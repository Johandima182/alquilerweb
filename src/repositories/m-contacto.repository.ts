import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {MContacto, MContactoRelations, Administrador} from '../models';
import {AdministradorRepository} from './administrador.repository';

export class MContactoRepository extends DefaultCrudRepository<
  MContacto,
  typeof MContacto.prototype.Id,
  MContactoRelations
> {

  public readonly administrador: BelongsToAccessor<Administrador, typeof MContacto.prototype.Id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>,
  ) {
    super(MContacto, dataSource);
    this.administrador = this.createBelongsToAccessorFor('administrador', administradorRepositoryGetter,);
    this.registerInclusionResolver('administrador', this.administrador.inclusionResolver);
  }
}
