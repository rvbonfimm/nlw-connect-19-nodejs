import { db } from '../drizzle/client'
import { subscription } from '../drizzle/schema/subscription'

interface SubscribeToEventParams {
  name: string
  email: string
}
export async function subscribeToEvent({
  name,
  email,
}: SubscribeToEventParams) {
  const result = await db
    .insert(subscription)
    .values({
      name,
      email,
    })
    .returning()
  const subscriber = result[0]
  return {
    subscriberId: subscriber.id,
  }
}
