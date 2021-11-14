import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {TiposInmuebles} from '../models';
import {TiposInmueblesRepository} from '../repositories';

export class TiposInmueblesController {
  constructor(
    @repository(TiposInmueblesRepository)
    public tiposInmueblesRepository : TiposInmueblesRepository,
  ) {}

  @post('/tipos-inmuebles')
  @response(200, {
    description: 'TiposInmuebles model instance',
    content: {'application/json': {schema: getModelSchemaRef(TiposInmuebles)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TiposInmuebles, {
            title: 'NewTiposInmuebles',
            exclude: ['id'],
          }),
        },
      },
    })
    tiposInmuebles: Omit<TiposInmuebles, 'id'>,
  ): Promise<TiposInmuebles> {
    return this.tiposInmueblesRepository.create(tiposInmuebles);
  }

  @get('/tipos-inmuebles/count')
  @response(200, {
    description: 'TiposInmuebles model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TiposInmuebles) where?: Where<TiposInmuebles>,
  ): Promise<Count> {
    return this.tiposInmueblesRepository.count(where);
  }

  @get('/tipos-inmuebles')
  @response(200, {
    description: 'Array of TiposInmuebles model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TiposInmuebles, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TiposInmuebles) filter?: Filter<TiposInmuebles>,
  ): Promise<TiposInmuebles[]> {
    return this.tiposInmueblesRepository.find(filter);
  }

  @patch('/tipos-inmuebles')
  @response(200, {
    description: 'TiposInmuebles PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TiposInmuebles, {partial: true}),
        },
      },
    })
    tiposInmuebles: TiposInmuebles,
    @param.where(TiposInmuebles) where?: Where<TiposInmuebles>,
  ): Promise<Count> {
    return this.tiposInmueblesRepository.updateAll(tiposInmuebles, where);
  }

  @get('/tipos-inmuebles/{id}')
  @response(200, {
    description: 'TiposInmuebles model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TiposInmuebles, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TiposInmuebles, {exclude: 'where'}) filter?: FilterExcludingWhere<TiposInmuebles>
  ): Promise<TiposInmuebles> {
    return this.tiposInmueblesRepository.findById(id, filter);
  }

  @patch('/tipos-inmuebles/{id}')
  @response(204, {
    description: 'TiposInmuebles PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TiposInmuebles, {partial: true}),
        },
      },
    })
    tiposInmuebles: TiposInmuebles,
  ): Promise<void> {
    await this.tiposInmueblesRepository.updateById(id, tiposInmuebles);
  }

  @put('/tipos-inmuebles/{id}')
  @response(204, {
    description: 'TiposInmuebles PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tiposInmuebles: TiposInmuebles,
  ): Promise<void> {
    await this.tiposInmueblesRepository.replaceById(id, tiposInmuebles);
  }

  @del('/tipos-inmuebles/{id}')
  @response(204, {
    description: 'TiposInmuebles DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tiposInmueblesRepository.deleteById(id);
  }
}
