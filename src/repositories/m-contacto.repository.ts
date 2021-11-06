import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {MContacto, MContactoRelations} from '../models';

export class MContactoRepository extends DefaultCrudRepository<
  MContacto,
  typeof MContacto.prototype.Id,
  MContactoRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(MContacto, dataSource);
  }
}
