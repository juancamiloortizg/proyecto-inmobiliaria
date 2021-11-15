import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Inmueble,
  TiposInmuebles,
} from '../models';
import {InmuebleRepository} from '../repositories';

export class InmuebleTiposInmueblesController {
  constructor(
    @repository(InmuebleRepository) protected inmuebleRepository: InmuebleRepository,
  ) { }

  @get('/inmuebles/{id}/tipos-inmuebles', {
    responses: {
      '200': {
        description: 'Inmueble has one TiposInmuebles',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TiposInmuebles),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<TiposInmuebles>,
  ): Promise<TiposInmuebles> {
    return this.inmuebleRepository.tiposInmuebles(id).get(filter);
  }

  @post('/inmuebles/{id}/tipos-inmuebles', {
    responses: {
      '200': {
        description: 'Inmueble model instance',
        content: {'application/json': {schema: getModelSchemaRef(TiposInmuebles)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Inmueble.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TiposInmuebles, {
            title: 'NewTiposInmueblesInInmueble',
            exclude: ['id'],
            optional: ['inmuebleId']
          }),
        },
      },
    }) tiposInmuebles: Omit<TiposInmuebles, 'id'>,
  ): Promise<TiposInmuebles> {
    return this.inmuebleRepository.tiposInmuebles(id).create(tiposInmuebles);
  }

  @patch('/inmuebles/{id}/tipos-inmuebles', {
    responses: {
      '200': {
        description: 'Inmueble.TiposInmuebles PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TiposInmuebles, {partial: true}),
        },
      },
    })
    tiposInmuebles: Partial<TiposInmuebles>,
    @param.query.object('where', getWhereSchemaFor(TiposInmuebles)) where?: Where<TiposInmuebles>,
  ): Promise<Count> {
    return this.inmuebleRepository.tiposInmuebles(id).patch(tiposInmuebles, where);
  }

  @del('/inmuebles/{id}/tipos-inmuebles', {
    responses: {
      '200': {
        description: 'Inmueble.TiposInmuebles DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(TiposInmuebles)) where?: Where<TiposInmuebles>,
  ): Promise<Count> {
    return this.inmuebleRepository.tiposInmuebles(id).delete(where);
  }
}
