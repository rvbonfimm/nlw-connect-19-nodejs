import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { env } from '../env-validation'
import { subscription } from './schema/subscription'

export const pg = postgres(env.POSTGRES_URL)
export const db = drizzle(pg, {
  schema: { subscription },
})
