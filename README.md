# Challenge Bot

This bot presents new users with a base64 challenge string, they must decode it and paste the answer.
If it's correct, they receive the member role and can chat elsewhere.
On close and correct answers, the bot will delete the answer to avoid spoilers.

I suggest disallowing members to chat in the challege channel, so once it's solved there can't be any futher spam.

This was uploaded for a friend to use, but there's some quick instruction below for anyone else who wants to try it. 

1. `git clone https://github.com/packet-fun/base64-challenge-discordbot`
2. `npm install discord.js btoa`
3. Get a token from [discord](https://discord.com/developers/applications). (make sure it has the right permissions.. add roles, delete messages, etc)
4. edit config.json and put in the channelID and bot token
5. run the bot with `pm2 start b64.js` or your preferred method
