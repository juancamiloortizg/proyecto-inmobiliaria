import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Inmueble,
  Asesor,
} from '../models';
import {InmuebleRepository} from '../repositories';

export class InmuebleAsesorController {
  constructor(
    @repository(InmuebleRepository)
    public inmuebleRepository: InmuebleRepository,
  ) { }

  @get('/inmuebles/{id}/asesor', {
    responses: {
      '200': {
        description: 'Asesor belonging to Inmueble',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Asesor)},
          },
        },
      },
    },
  })
  async getAsesor(
    @param.path.string('id') id: typeof Inmueble.prototype.id,
  ): Promise<Asesor> {
    return this.inmuebleRepository.asesor(id);
  }
}
