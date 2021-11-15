import {Entity, model, property, hasOne, belongsTo} from '@loopback/repository';
import {TiposInmuebles} from './tipos-inmuebles.model';
import {Asesor} from './asesor.model';

@model()
export class Inmueble extends Entity {
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
  departamento: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  valor: string;

  @property({
    type: 'string',
    required: true,
  })
  oferta: string;

  @property({
    type: 'string',
    required: true,
  })
  contacto: string;

  @property({
    type: 'string',
    required: true,
  })
  fotos: string;

  @property({
    type: 'string',
  })
  video?: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
  })
  solicitudId?: string;

  @hasOne(() => TiposInmuebles)
  tiposInmuebles: TiposInmuebles;

  @belongsTo(() => Asesor)
  asesorId: string;

  constructor(data?: Partial<Inmueble>) {
    super(data);
  }
}

export interface InmuebleRelations {
  // describe navigational properties here
}

export type InmuebleWithRelations = Inmueble & InmuebleRelations;
