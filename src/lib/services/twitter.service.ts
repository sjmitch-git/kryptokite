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
    console.error("Invalid tweet text: Must be non-empty");
    throw new Error("Invalid tweet text");
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/twitter/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Request failed: ${response.status} - ${errorText}`);
      throw new Error(`Failed to post tweet: ${response.status}`);
    }

    const data = await response.json();
    if (data.success) {
      console.log("Tweet posted:", data.tweet);
    } else {
      console.error("Error:", data.error);
    }
  } catch (error) {
    console.error("Request failed:", error);
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
      const errorText = await response.text();
      console.error(`Request failed: ${response.status} - ${errorText}`);
      throw new Error(`Failed to post thread: ${response.status}`);
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
