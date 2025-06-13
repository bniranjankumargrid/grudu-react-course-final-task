import { useEffect, useState } from "react";
import { Header } from "../Header/Header";
import { TweetInput } from "../TweetInput/TweetInput";
import { Tweets } from "../../types";
import { Tweet } from "../Tweet/Tweet";
import { getUserFullName } from "../../service/userService";
import { getInitials } from "../../Utils/utils";

export function HomePage() {
  const [tweets, setTweets] = useState<Tweets[]>([]);

  const fetchTweets = () => {
    fetch("http://localhost:3000/tweets")
      .then((res) => res.json())
      .then((res: Tweets[]) => {
        const tweets: Tweets[] = res.map((tweet) => ({
          id: tweet.id,
          author_id: getUserFullName(tweet.author_id) as string,
          text: tweet.text,
        })).reverse();
        setTweets(tweets);
      });
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
