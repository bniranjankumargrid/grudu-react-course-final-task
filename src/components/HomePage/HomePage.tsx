import { useEffect, useState } from "react";
import { Header } from "../Header/Header";
import { TweetInput } from "../TweetInput/TweetInput";
import { Tweets } from "../../types";
import { Tweet } from "../Tweet/Tweet";
import { getUserFullName } from "../../service/userService";
import { getInitials } from "../../Utils/utils";

export function HomePage() {
  const [tweets, setTweets] = useState<Tweets[]>([]);
  useEffect(() => {
    let isMounted = true;
  
    fetch("http://localhost:3000/tweets")
      .then((res) => res.json())
      .then((res: Tweets[]) => {
        if (!isMounted) return;
  
        const tweets: Tweets[] = res.map((tweet) => ({
          id: tweet.id,
          author_id: getUserFullName(tweet.author_id) as string,
          text: tweet.text,
        })).reverse();
  
        setTweets(tweets);
      });
  
    return () => {
      isMounted = false;
    };
  }, [tweets]);

  return (
    <>
      <Header />
      <TweetInput tweetsState={setTweets} />
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
