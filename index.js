'use strict';

const fs = require('fs');
const request = require('request');
const fetch = require('node-fetch');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
});

rl.on('line', async (line) => {
  line = line.trim();
  await igPic(line);
}).on('close', () => process.exit(0));

rl.prompt();

const download = (url, path, callback) => {
  request.head(url, () => {
    request(url).pipe(fs.createWriteStream(path)).on('close', callback);
  });
};

const igPic = async (nickname) => {
  const url = `https://www.instagram.com/${nickname}/?__a=1`;
  const path = `./pics/${nickname}.png`;
  const json = await fetch(url).then((res) => res.json());
  const picUrl = json.graphql.user.profile_pic_url_hd;

  download(picUrl, path, () => {
    console.log('Done!');
    rl.close();
  });
};
