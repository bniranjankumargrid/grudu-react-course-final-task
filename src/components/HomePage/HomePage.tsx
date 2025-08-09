import { useEffect, useState } from "react";
import { Header } from "../Header/Header";
import { TweetInput } from "../TweetInput/TweetInput";
import { Tweets } from "../../types";
import { Tweet } from "../Tweet/Tweet";
import { getUserFullName } from "../../service/userService";
import { getInitials } from "../../Utils/utils";

export function HomePage() {
  const [tweets, setTweets] = useState<Tweets[]>([]);
  const fetchTweets = async () => {
    try {
      const response = await fetch("http://localhost:3000/tweets");
      const res: Tweets[] = await response.json();

      const processedTweets: Tweets[] = res.map((tweet) => ({
        id: tweet.id,
        author_id: getUserFullName(tweet.author_id) as string,
        text: tweet.text,
      })).reverse();

      setTweets(processedTweets);
    } catch (error) {
      console.error("Error fetching tweets:", error);
    }
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <>
      <Header />
      <TweetInput onTweetAdded={fetchTweets} />
      {tweets.map((t) => (
        <Tweet
          key={t.id}
          name={t.author_id}
          description={t.text}
          icon={getInitials(t.author_id) as string}
        />
      ))}
    </>
  );
}
