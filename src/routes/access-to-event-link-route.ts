import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { env } from '../env-validation'
import { accessEventLink } from '../functions/access-event-link'

export const accessToEventLinkRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/invites/:subscriberId',
    {
      schema: {
        summary: 'Subscribes someone to the event',
        description:
          'A better description about the subscription functionality',
        tags: ['Subscription'],
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          302: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params

      await accessEventLink({ subscriberId })

      const redirectUrl = new URL(env.WEB_URL)
      redirectUrl.searchParams.set('referral', subscriberId)

      const redirectTemporarilyCode = 302
      return reply.redirect(redirectUrl.toString(), redirectTemporarilyCode)
    }
  )
}
