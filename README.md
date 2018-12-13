# combat
First file (basicStart.html) was a working of the game almost as described. All the script is on the main page and there are global variables.

With index.html I skinned the game, separated my code, cleaned up some of the global variables and made some improvements to function calls. Still there is a lot going on in some functions. EX attack button, fires the attack, then sees if counter attack is available then does the counter, plays sounds, etc. I feel the functions are well defined but they still rely on some global variables. I normally do not do object or classes in js since they are usually shorter smaller running scripts. The review session showing the calc object and having the values already set inside did show me a better way.

game.html reworks my working version of index.html into an object. I have broken up the functions into smaller pieces. There was an issue I was having trouble with in the setFightImage function in combatObj.js file.

I was trying to set the name of the image in should swap out to. The easiest scenario might have been to rename my images to match ID's but I was going to make it work regardless of the mismatch.

I kept trying to get the opponents and my fighter id value inside the "execute after fade out function" but at that point there was no this.opponent, there was no this.myfighter. Initially cheated by calling the "theGame" object. It worked but I knew I couldn't use that in a real world situation since I may not be able to know the objects ID, let alone if there are 1000's of objs in a list. After many different approaches I put the values before the fade and then the fade could pick them up. 

The other part I was not sure on was the Attack power, counter power and hp situation. My thought was everything had to have some range of flexibility where the  game had to determine the attack power and counter power based on the hp of the champion. It could be programmed to hold static values but if any of the hp changed, the attack and counter would need to change as well. I have the attack and counter powers generated through a calculations and while it will not work for all scenarios, it does allow for some changes in the HP ranges, the ranges just can't deviate form each other drastically.
