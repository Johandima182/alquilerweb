import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Administrador, AdministradorRelations, Asesor, TipoVehiculo, MContacto, Persona} from '../models';
import {AsesorRepository} from './asesor.repository';
import {TipoVehiculoRepository} from './tipo-vehiculo.repository';
import {MContactoRepository} from './m-contacto.repository';
import {PersonaRepository} from './persona.repository';

export class AdministradorRepository extends DefaultCrudRepository<
  Administrador,
  typeof Administrador.prototype.Id,
  AdministradorRelations
> {

  public readonly asesors: HasManyRepositoryFactory<Asesor, typeof Administrador.prototype.Id>;

  public readonly tipoVehiculos: HasManyRepositoryFactory<TipoVehiculo, typeof Administrador.prototype.Id>;

  public readonly mContactos: HasManyRepositoryFactory<MContacto, typeof Administrador.prototype.Id>;

  public readonly persona: BelongsToAccessor<Persona, typeof Administrador.prototype.Id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>, @repository.getter('TipoVehiculoRepository') protected tipoVehiculoRepositoryGetter: Getter<TipoVehiculoRepository>, @repository.getter('MContactoRepository') protected mContactoRepositoryGetter: Getter<MContactoRepository>, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>,
  ) {
    super(Administrador, dataSource);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
    this.mContactos = this.createHasManyRepositoryFactoryFor('mContactos', mContactoRepositoryGetter,);
    this.registerInclusionResolver('mContactos', this.mContactos.inclusionResolver);
    this.tipoVehiculos = this.createHasManyRepositoryFactoryFor('tipoVehiculos', tipoVehiculoRepositoryGetter,);
    this.registerInclusionResolver('tipoVehiculos', this.tipoVehiculos.inclusionResolver);
    this.asesors = this.createHasManyRepositoryFactoryFor('asesors', asesorRepositoryGetter,);
    this.registerInclusionResolver('asesors', this.asesors.inclusionResolver);
  }
}
