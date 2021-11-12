import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Persona, PersonaRelations, Ciudad, Administrador, Asesor} from '../models';
import {CiudadRepository} from './ciudad.repository';
import {AdministradorRepository} from './administrador.repository';
import {AsesorRepository} from './asesor.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.Id,
  PersonaRelations
> {

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Persona.prototype.Id>;

  public readonly administradors: HasManyRepositoryFactory<Administrador, typeof Persona.prototype.Id>;

  public readonly asesors: HasManyRepositoryFactory<Asesor, typeof Persona.prototype.Id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>,
  ) {
    super(Persona, dataSource);
    this.asesors = this.createHasManyRepositoryFactoryFor('asesors', asesorRepositoryGetter,);
    this.registerInclusionResolver('asesors', this.asesors.inclusionResolver);
    this.administradors = this.createHasManyRepositoryFactoryFor('administradors', administradorRepositoryGetter,);
    this.registerInclusionResolver('administradors', this.administradors.inclusionResolver);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
  }
}
