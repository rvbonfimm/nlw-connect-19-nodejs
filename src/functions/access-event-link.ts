import { redis } from '../redis/client'

interface AccessEventLinkParams {
  subscriberId: string
}
export async function accessEventLink({ subscriberId }: AccessEventLinkParams) {
  await redis.hincrby('referral:access-count', subscriberId, 1)
}
