import type { Config } from 'drizzle-kit'
import { env } from './src/env-validation'

export default {
  schema: './src/drizzle/schema/*',
  dialect: 'postgresql',
  out: './src/drizzle/migrations',
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
} satisfies Config
