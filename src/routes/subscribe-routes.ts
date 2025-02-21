import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from 'zod'


export const subscribeRoute: FastifyPluginAsyncZod = async (app) => {
    app.post('/subscriptions', {
        schema: {
            summary: 'Subscribes someone to the event',
            description: 'A better description about the subscription functionality',
            tags: ["Subscription"],
            body: z.object({
                name: z.string(),
                email: z.string().email()
            }),
            response: {
                201: {
                    name: z.string(),
                    email: z.string()
                }
            }
        }
    }, async (request, reply) => {
        const { name, email } = request.body

        return reply.status(201).send({
            name, email
        })
    })
} 