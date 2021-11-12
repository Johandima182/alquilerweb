import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Ciudad, Departamento, DepartamentoRelations} from '../models';
import {AdministradorRepository} from './administrador.repository';
import {AsesorRepository} from './asesor.repository';
import {CiudadRepository} from './ciudad.repository';
import {ClienteRepository} from './cliente.repository';
import {VehiculoRepository} from './vehiculo.repository';

export class DepartamentoRepository extends DefaultCrudRepository<
  Departamento,
  typeof Departamento.prototype.Id,
  DepartamentoRelations
> {



  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Departamento.prototype.Id>;

  public readonly ciudads: HasManyRepositoryFactory<Ciudad, typeof Departamento.prototype.Id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>,
  ) {
    super(Departamento, dataSource);
    this.ciudads = this.createHasManyRepositoryFactoryFor('ciudads', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudads', this.ciudads.inclusionResolver);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
  }
}
