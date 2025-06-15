import { TwitterApi } from "twitter-api-v2";

if (
  !process.env.TWITTER_API_KEY ||
  !process.env.TWITTER_API_SECRET ||
  !process.env.TWITTER_ACCESS_TOKEN ||
  !process.env.TWITTER_ACCESS_TOKEN_SECRET
) {
  console.error("Twitter API credentials are missing. Please check your environment variables.");
  throw new Error("Twitter API credentials are not set.");
}

export const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

export const postTweet = async (text: string) => {
  if (!text) {
    console.error("Tweet text cannot be empty");
    throw new Error("Empty tweet text");
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/twitter/post`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const data = await response.json();
      if (response.status === 429) {
        const { limit, reset } = data.rateLimit || {};
        console.error(
          `Rate limit reached. Limit: ${limit || "unknown"} requests. Resets at: ${
            reset ? new Date(Number(reset) * 1000).toISOString() : "unknown"
          }`
        );
        throw new Error("Rate limit reached");
      }
      console.error(
        `Failed to post tweet: HTTP ${response.status} - ${data.error || "Unknown error"}`
      );
      throw new Error(data.error || `Failed to post tweet: HTTP ${response.status}`);
    }

    const data = await response.json();
    if (data.success) {
      console.log("Tweet posted successfully");
      return data.tweet;
    } else {
      console.error("Tweet error:", data.error || "Unknown error");
      throw new Error(data.error || "Unknown API error");
    }
  } catch (error) {
    console.error("Tweet post error:", error);
    throw error;
  }
};

export const postThread = async (texts: string[]) => {
  if (!texts || texts.length === 0 || texts.some((text) => !text)) {
    console.error("Invalid thread texts: Must be non-empty array with non-empty strings");
    throw new Error("Invalid thread texts");
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/twitter/thread`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ texts }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        const limit = response.headers.get("x-rate-limit-limit");
        const reset = response.headers.get("x-rate-limit-reset");
        console.error(
          `Rate limit reached. Limit: ${limit || "unknown"} requests. Resets at: ${
            reset ? new Date(Number(reset) * 1000).toISOString() : "unknown"
          }`
        );
        throw new Error("Rate limit reached");
      }
      const errorText = await response.text();
      console.error(`Failed to post thread: HTTP ${response.status} - ${errorText}`);
      throw new Error(`Failed to post thread: HTTP ${response.status}`);
    }

    const data = await response.json();
    if (data.success) {
      console.log("Thread posted:", data.thread);
    } else {
      console.error("Error:", data.error);
    }
  } catch (error) {
    console.error("Request failed:", error);
  }
};
