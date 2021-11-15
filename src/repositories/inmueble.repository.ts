import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Inmueble, InmuebleRelations, TiposInmuebles, Asesor} from '../models';
import {TiposInmueblesRepository} from './tipos-inmuebles.repository';
import {AsesorRepository} from './asesor.repository';

export class InmuebleRepository extends DefaultCrudRepository<
  Inmueble,
  typeof Inmueble.prototype.id,
  InmuebleRelations
> {

  public readonly tiposInmuebles: HasOneRepositoryFactory<TiposInmuebles, typeof Inmueble.prototype.id>;

  public readonly asesor: BelongsToAccessor<Asesor, typeof Inmueble.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('TiposInmueblesRepository') protected tiposInmueblesRepositoryGetter: Getter<TiposInmueblesRepository>, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>,
  ) {
    super(Inmueble, dataSource);
    this.asesor = this.createBelongsToAccessorFor('asesor', asesorRepositoryGetter,);
    this.registerInclusionResolver('asesor', this.asesor.inclusionResolver);
    this.tiposInmuebles = this.createHasOneRepositoryFactoryFor('tiposInmuebles', tiposInmueblesRepositoryGetter);
    this.registerInclusionResolver('tiposInmuebles', this.tiposInmuebles.inclusionResolver);
  }
}
