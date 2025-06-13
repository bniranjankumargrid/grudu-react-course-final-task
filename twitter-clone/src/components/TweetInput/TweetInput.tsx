import { useState } from 'react';
import './TweetInput.css';
import { addTweet } from '../../service/tweetService';
import { Errors, Tweets } from '../../types';
import { useAuth } from '../../context/AuthContext';


export function TweetInput({onTweetAdded}:any) {
  const [newTweet, setNewTweet] = useState('');
  const [isLoading,setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const {loggedInUser} = useAuth();
  const handleTweet = (e:any) => {
    setNewTweet(e.target.value);
  };

  function sanitizeHtml(input: string): string {
    const allowedTags = ['strong', 'em', 'br'];
    const tagRegex = /<\/?([a-zA-Z0-9]+)(\s[^>]*)?>/g;
  
    return input.replace(tagRegex, (match, tagName) => {
      if (allowedTags.includes(tagName.toLowerCase())) {
        return match; 
      }
      return ''; 
    });
  }

  const handleSubmit = () => {
    let newErrors: Errors = {};
    const sanitizedTweet = sanitizeHtml(newTweet);
    if(sanitizedTweet.length < 1 || sanitizedTweet.length > 140){
      newErrors.textInputLimit = 'Tweet should be of length 1 to 140';
      setErrors(newErrors);
      return;
    }
    setIsLoading(true);
    if(newTweet){
      const data: Tweets = {id:crypto.randomUUID() ,author_id:loggedInUser?.id as string,text:sanitizedTweet}
      addTweet(data).then(() => onTweetAdded());
      setNewTweet('');
      setIsLoading(false);
    }
  }
  return (
    <div className="tweet_section" >
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
        <button disabled={isLoading} className="tweet_section_button" onClick={handleSubmit}>Tweet</button>
      </div>
    </div>
  );
}
