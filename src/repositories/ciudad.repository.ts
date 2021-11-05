import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Ciudad, CiudadRelations, Cliente, Departamento, Asesor, Vehiculo, Administrador} from '../models';
import {ClienteRepository} from './cliente.repository';
import {DepartamentoRepository} from './departamento.repository';
import {AsesorRepository} from './asesor.repository';
import {VehiculoRepository} from './vehiculo.repository';
import {AdministradorRepository} from './administrador.repository';

export class CiudadRepository extends DefaultCrudRepository<
  Ciudad,
  typeof Ciudad.prototype.Id,
  CiudadRelations
> {

  public readonly cliente: HasOneRepositoryFactory<Cliente, typeof Ciudad.prototype.Id>;

  public readonly departamentos: HasManyRepositoryFactory<Departamento, typeof Ciudad.prototype.Id>;

  public readonly asesor: HasOneRepositoryFactory<Asesor, typeof Ciudad.prototype.Id>;

  public readonly vehiculo: HasOneRepositoryFactory<Vehiculo, typeof Ciudad.prototype.Id>;

  public readonly administrador: HasOneRepositoryFactory<Administrador, typeof Ciudad.prototype.Id>;

  public readonly departamento: BelongsToAccessor<Departamento, typeof Ciudad.prototype.Id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>,
  ) {
    super(Ciudad, dataSource);
    this.departamento = this.createBelongsToAccessorFor('departamento', departamentoRepositoryGetter,);
    this.registerInclusionResolver('departamento', this.departamento.inclusionResolver);
    this.administrador = this.createHasOneRepositoryFactoryFor('administrador', administradorRepositoryGetter);
    this.registerInclusionResolver('administrador', this.administrador.inclusionResolver);
    this.vehiculo = this.createHasOneRepositoryFactoryFor('vehiculo', vehiculoRepositoryGetter);
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
    this.asesor = this.createHasOneRepositoryFactoryFor('asesor', asesorRepositoryGetter);
    this.registerInclusionResolver('asesor', this.asesor.inclusionResolver);
    this.departamentos = this.createHasManyRepositoryFactoryFor('departamentos', departamentoRepositoryGetter,);
    this.registerInclusionResolver('departamentos', this.departamentos.inclusionResolver);
    this.cliente = this.createHasOneRepositoryFactoryFor('cliente', clienteRepositoryGetter);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);


  }
}
