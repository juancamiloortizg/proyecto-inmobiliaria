import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {TiposInmuebles, TiposInmueblesRelations} from '../models';

export class TiposInmueblesRepository extends DefaultCrudRepository<
  TiposInmuebles,
  typeof TiposInmuebles.prototype.id,
  TiposInmueblesRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(TiposInmuebles, dataSource);
  }
}
