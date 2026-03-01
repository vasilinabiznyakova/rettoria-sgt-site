import type {SchemaTypeDefinition} from 'sanity'

import {siteSettings} from './siteSettings'
import {localeString} from './localeString'
import {localeBlockContent} from './localeBlockContent'
import {project} from './project'

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  localeString,
  localeBlockContent,
  project,
]