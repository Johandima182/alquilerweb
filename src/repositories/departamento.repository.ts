import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Departamento, DepartamentoRelations, Cliente, Ciudad, Asesor, Vehiculo, Administrador} from '../models';
import {ClienteRepository} from './cliente.repository';
import {CiudadRepository} from './ciudad.repository';
import {AsesorRepository} from './asesor.repository';
import {VehiculoRepository} from './vehiculo.repository';
import {AdministradorRepository} from './administrador.repository';

export class DepartamentoRepository extends DefaultCrudRepository<
  Departamento,
  typeof Departamento.prototype.Id,
  DepartamentoRelations
> {

  public readonly cliente: HasOneRepositoryFactory<Cliente, typeof Departamento.prototype.Id>;

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Departamento.prototype.Id>;

  public readonly asesor: HasOneRepositoryFactory<Asesor, typeof Departamento.prototype.Id>;

  public readonly vehiculo: HasOneRepositoryFactory<Vehiculo, typeof Departamento.prototype.Id>;

  public readonly administrador: HasOneRepositoryFactory<Administrador, typeof Departamento.prototype.Id>;

  public readonly ciudads: HasManyRepositoryFactory<Ciudad, typeof Departamento.prototype.Id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>,
  ) {
    super(Departamento, dataSource);
    this.ciudads = this.createHasManyRepositoryFactoryFor('ciudads', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudads', this.ciudads.inclusionResolver);
    this.administrador = this.createHasOneRepositoryFactoryFor('administrador', administradorRepositoryGetter);
    this.registerInclusionResolver('administrador', this.administrador.inclusionResolver);
    this.vehiculo = this.createHasOneRepositoryFactoryFor('vehiculo', vehiculoRepositoryGetter);
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
    this.asesor = this.createHasOneRepositoryFactoryFor('asesor', asesorRepositoryGetter);
    this.registerInclusionResolver('asesor', this.asesor.inclusionResolver);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
    this.cliente = this.createHasOneRepositoryFactoryFor('cliente', clienteRepositoryGetter);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
