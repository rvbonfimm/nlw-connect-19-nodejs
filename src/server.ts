import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import { env } from './env-validation'
import { subscribeToEventRoute } from './routes/subscribe-to-event-routes'

/** Fastify init */
const app = fastify().withTypeProvider<ZodTypeProvider>()

/** Validator/Serializer compiler */
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

/** CORS init */
app.register(fastifyCors, {
  origin: true, // only for development mode
})

/** Swagger/Swagger UI init */
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'NLW Connect - NodeJS',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
})
app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(subscribeToEventRoute)

app.listen({ port: env.PORT }).then(() => {
  console.log(`HTTP server running on port ${env.PORT}`)
})
