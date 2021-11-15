import {Entity, model, property} from '@loopback/repository';

@model()
export class TiposInmuebles extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'number',
    required: true,
  })
  porcentajeParticipacionAlquiler: number;

  @property({
    type: 'number',
    required: true,
  })
  porcentajeParticipacionCompra: number;

  @property({
    type: 'string',
  })
  inmuebleId?: string;

  constructor(data?: Partial<TiposInmuebles>) {
    super(data);
  }
}

export interface TiposInmueblesRelations {
  // describe navigational properties here
}

export type TiposInmueblesWithRelations = TiposInmuebles & TiposInmueblesRelations;
