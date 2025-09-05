import { type SchemaTypeDefinition } from 'sanity'
import post from './post'
import project from './project'
import { career } from './career'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, project, career],
}
