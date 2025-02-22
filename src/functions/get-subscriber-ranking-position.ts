import { redis } from '../redis/client'

interface GetSubscriberRankingPositionParams {
  subscriberId: string
}
export async function getSubscriberRankingPosition({
  subscriberId,
}: GetSubscriberRankingPositionParams) {
  const subscriberPosition = await redis.zrevrank(
    'referral:ranking',
    subscriberId
  )
  if (!subscriberPosition) {
    return { position: null }
  }
  return { position: subscriberPosition + 1 }
}
