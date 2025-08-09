import { z } from "zod";

export const tweetSchema = z.object({
          text: z.string()
            .min(1, "Tweet cannot be empty")
            .max(140, "Tweet cannot exceed 140 characters")
            .refine((val) => {
              // Custom validation for HTML tags
              const allowedTags = ["strong", "em", "br"];
              const tagRegex = /<\/?([a-zA-Z0-9]+)(\s[^>]*)?>/g;
              let isValid = true;
              
              val.replace(tagRegex, (match, tagName) => {
                if (!allowedTags.includes(tagName.toLowerCase())) {
                  isValid = false;
                }
                return match;
              });
              
              return isValid;
            }, "Only <strong>, <em>, and <br> tags are allowed")
        });
        
export type TweetInput = z.infer<typeof tweetSchema>;