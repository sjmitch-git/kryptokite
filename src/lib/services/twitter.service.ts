import { TwitterApi, ApiResponseError } from "twitter-api-v2";
import { truncateText } from "@/lib/utils";

export const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY!,
  appSecret: process.env.TWITTER_API_SECRET!,
  accessToken: process.env.TWITTER_ACCESS_TOKEN!,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
});

export async function postTweet(text: string): Promise<{ id: string; text: string }> {
  try {
    const tweet = await twitterClient.v2.tweet(truncateText(text, 280));
    return { id: tweet.data.id, text: tweet.data.text };
  } catch (error: unknown) {
    if (error instanceof ApiResponseError) {
      const errorData = error.data as unknown;
      if (typeof errorData === "string" && errorData.includes("<!DOCTYPE")) {
        throw new Error(
          `Invalid API response: HTML received, likely rate limit exceeded (code ${
            error.code || 429
          })`
        );
      }
      if (error.rateLimitError && error.rateLimit) {
        throw new Error(
          `Rate limit exceeded: limit=${error.rateLimit.limit}, remaining=${error.rateLimit.remaining}, reset=${error.rateLimit.reset}`
        );
      }
      throw new Error(`Failed to post tweet: ${error.message} (code ${error.code || 400})`);
    }
    throw error instanceof Error ? error : new Error("Unknown tweet error");
  }
}

export async function postThread(texts: string[]): Promise<{ id: string; text: string }[]> {
  if (!texts || !Array.isArray(texts) || texts.length === 0 || texts.some((text) => !text)) {
    throw new Error("Texts must be a non-empty array of non-empty strings");
  }
  try {
    const thread = await twitterClient.v2.tweetThread(texts.map((text) => truncateText(text, 280)));
    return thread.map((tweet) => ({ id: tweet.data.id, text: tweet.data.text }));
  } catch (error: unknown) {
    if (error instanceof ApiResponseError) {
      const errorData = error.data as unknown;
      if (typeof errorData === "string" && errorData.includes("<!DOCTYPE")) {
        throw new Error(
          `Invalid API response: HTML received, likely rate limit exceeded (code ${
            error.code || 429
          })`
        );
      }
      if (error.rateLimitError && error.rateLimit) {
        throw new Error(
          `Rate limit exceeded: limit=${error.rateLimit.limit}, remaining=${error.rateLimit.remaining}, reset=${error.rateLimit.reset}`
        );
      }
      throw new Error(`Failed to post thread: ${error.message} (code ${error.code || 400})`);
    }
    throw error instanceof Error ? error : new Error("Unknown thread error");
  }
}
