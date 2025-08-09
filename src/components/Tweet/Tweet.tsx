import { TweetProps } from "../../types";
import "./Tweet.css";

export function Tweet({ name, description, icon }: TweetProps) {
  return (
    <div className="tweet">
      <div className="tweet_container">
        <div className="tweet_icon">{icon}</div>
        <div className="tweet_detail">
          <p className="tweet_name">{name}</p>
          <p
            className="tweet_description"
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
        </div>
      </div>
    </div>
  );
}
