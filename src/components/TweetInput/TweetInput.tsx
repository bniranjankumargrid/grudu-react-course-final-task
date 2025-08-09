import { useState } from "react";
import "./TweetInput.css";
import { addTweet } from "../../service/tweetService";
import { Errors, Tweets } from "../../types";
import { useAuth } from "../../context/AuthContext";
import { tweetSchema } from "../../schema/tweet.schema";

export function TweetInput({ onTweetAdded }: any) {
  const [newTweet, setNewTweet] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const { loggedInUser } = useAuth();
  const handleTweet = (e: any) => {
    setNewTweet(e.target.value);
  };


  const handleSubmit = async () => {
    try {
      const result = tweetSchema.safeParse({ text: newTweet });
      
      if (!result.success) {
        const newErrors: { text?: string } = {};
        result.error.issues.forEach(issue => {
          newErrors.text = issue.message;
        });
        setErrors(newErrors);
        return;
      }

      setIsLoading(true);
      
      const data: Tweets = {
        id: crypto.randomUUID(),
        author_id: loggedInUser?.id as string,
        text: newTweet,
      };
      
      await addTweet(data);
      onTweetAdded()
      setNewTweet("");
      setErrors({});
    } catch (error) {
      console.error("Error submitting tweet:", error);

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="tweet_section">
      <textarea
        className="tweet_section_textarea"
        placeholder={"What's happening?"}
        onChange={handleTweet}
        value={newTweet}
      ></textarea>
      {errors.textInputLimit && (
        <p className="error-text">{errors.textInputLimit}</p>
      )}
      <div className="tweet_button_wrapper">
        <button
          disabled={isLoading}
          className="tweet_section_button"
          onClick={handleSubmit}
        >
          Tweet
        </button>
      </div>
    </div>
  );
}
