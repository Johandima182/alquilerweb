import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  Administrador,
  MContacto
} from '../models';
import {AdministradorRepository} from '../repositories';

export class AdministradorMContactoController {
  constructor(
    @repository(AdministradorRepository) protected administradorRepository: AdministradorRepository,
  ) { }

  @get('/administradors/{id}/m-contactos', {
    responses: {
      '200': {
        description: 'Array of Administrador has many MContacto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MContacto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<MContacto>,
  ): Promise<MContacto[]> {
    return this.administradorRepository.mContactos(id).find(filter);
  }

  @post('/administradors/{id}/m-contactos', {
    responses: {
      '200': {
        description: 'Administrador model instance',
        content: {'application/json': {schema: getModelSchemaRef(MContacto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Administrador.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MContacto, {
            title: 'NewMContactoInAdministrador',
            exclude: ['Id'],
            optional: ['id_Administrador']
          }),
        },
      },
    }) mContacto: Omit<MContacto, 'Id'>,
  ): Promise<MContacto> {
    return this.administradorRepository.mContactos(id).create(mContacto);
  }

  @patch('/administradors/{id}/m-contactos', {
    responses: {
      '200': {
        description: 'Administrador.MContacto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MContacto, {partial: true}),
        },
      },
    })
    mContacto: Partial<MContacto>,
    @param.query.object('where', getWhereSchemaFor(MContacto)) where?: Where<MContacto>,
  ): Promise<Count> {
    return this.administradorRepository.mContactos(id).patch(mContacto, where);
  }

  @del('/administradors/{id}/m-contactos', {
    responses: {
      '200': {
        description: 'Administrador.MContacto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(MContacto)) where?: Where<MContacto>,
  ): Promise<Count> {
    return this.administradorRepository.mContactos(id).delete(where);
  }
}
