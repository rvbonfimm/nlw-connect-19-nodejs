import { Redis } from 'ioredis'
import { env } from '../env-validation'

export const redis = new Redis(env.REDIS_URL)
