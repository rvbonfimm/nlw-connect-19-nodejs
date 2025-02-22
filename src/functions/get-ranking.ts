import { inArray } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { subscription } from '../drizzle/schema/subscription'
import { redis } from '../redis/client'

export async function getRanking() {
  const ranking = await redis.zrevrange('referral:ranking', 0, 2, 'WITHSCORES')

  const subscriberIdAndScore: Record<string, number> = {}

  /** For iterating two by two positions (only the even positions)*/
  for (let i = 0; i < ranking.length - 1; i += 2) {
    subscriberIdAndScore[ranking[i]] = Number.parseInt(ranking[i + 1])
  }

  const subscribers = await db
    .select()
    .from(subscription)
    .where(inArray(subscription.id, Object.keys(subscriberIdAndScore)))

  const rankingWithScores = subscribers
    .map(subscriber => {
      return {
        id: subscriber.id,
        name: subscriber.name,
        score: subscriberIdAndScore[subscriber.id],
      }
    })
    .sort((sub1, sub2) => {
      return sub2.score - sub1.score
    })

  return { ranking: rankingWithScores }
}
