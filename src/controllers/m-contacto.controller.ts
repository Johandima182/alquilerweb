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
import {MContacto} from '../models';
import {MContactoRepository} from '../repositories';

export class MContactoController {
  constructor(
    @repository(MContactoRepository)
    public mContactoRepository : MContactoRepository,
  ) {}

  @post('/m-contactos')
  @response(200, {
    description: 'MContacto model instance',
    content: {'application/json': {schema: getModelSchemaRef(MContacto)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MContacto, {
            title: 'NewMContacto',
            exclude: ['Id'],
          }),
        },
      },
    })
    mContacto: Omit<MContacto, 'Id'>,
  ): Promise<MContacto> {
    return this.mContactoRepository.create(mContacto);
  }

  @get('/m-contactos/count')
  @response(200, {
    description: 'MContacto model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MContacto) where?: Where<MContacto>,
  ): Promise<Count> {
    return this.mContactoRepository.count(where);
  }

  @get('/m-contactos')
  @response(200, {
    description: 'Array of MContacto model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MContacto, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MContacto) filter?: Filter<MContacto>,
  ): Promise<MContacto[]> {
    return this.mContactoRepository.find(filter);
  }

  @patch('/m-contactos')
  @response(200, {
    description: 'MContacto PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MContacto, {partial: true}),
        },
      },
    })
    mContacto: MContacto,
    @param.where(MContacto) where?: Where<MContacto>,
  ): Promise<Count> {
    return this.mContactoRepository.updateAll(mContacto, where);
  }

  @get('/m-contactos/{id}')
  @response(200, {
    description: 'MContacto model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MContacto, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(MContacto, {exclude: 'where'}) filter?: FilterExcludingWhere<MContacto>
  ): Promise<MContacto> {
    return this.mContactoRepository.findById(id, filter);
  }

  @patch('/m-contactos/{id}')
  @response(204, {
    description: 'MContacto PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MContacto, {partial: true}),
        },
      },
    })
    mContacto: MContacto,
  ): Promise<void> {
    await this.mContactoRepository.updateById(id, mContacto);
  }

  @put('/m-contactos/{id}')
  @response(204, {
    description: 'MContacto PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() mContacto: MContacto,
  ): Promise<void> {
    await this.mContactoRepository.replaceById(id, mContacto);
  }

  @del('/m-contactos/{id}')
  @response(204, {
    description: 'MContacto DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.mContactoRepository.deleteById(id);
  }
}
