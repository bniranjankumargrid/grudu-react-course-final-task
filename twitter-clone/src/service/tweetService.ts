

export async function getTweetsFromDb(){
  
}


export async function addTweet(data: any):Promise<Response|undefined> {
          try {
            const req = await fetch("http://localhost:3000/tweets", {
              method: "POST",
              body: JSON.stringify(data),
            });
            return req
          } catch (e) {
            console.error(e);
            return undefined;
          }
        }