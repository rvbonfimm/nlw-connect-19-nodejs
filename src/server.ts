import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { validatorCompiler, serializerCompiler, ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'

import { subscribeRoute } from './routes/subscribe-routes'


/** Fastify init */
const app = fastify().withTypeProvider<ZodTypeProvider>()

/** Validator/Serializer compiler */
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

/** CORS init */
app.register(fastifyCors, {
    origin: true // only for development mode
})

/** Swagger/Swagger UI init */
app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'NLW Connect - NodeJS',
            version: '0.0.1'
        }
    },
    transform: jsonSchemaTransform
})
app.register(fastifySwaggerUi, {
    routePrefix: '/docs'
})

app.register(subscribeRoute)

app.listen({ port: 3333 }).then(() => {
    console.log('HTTP server running!')
})
