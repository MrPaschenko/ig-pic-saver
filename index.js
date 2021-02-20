'use strict';

const fs = require('fs');
const request = require('request');
const fetch = require('node-fetch');

const download = (url, path, callback) => {
  request.head(url, () => {
    request(url)
      .pipe(fs.createWriteStream(path))
      .on('close', callback);
  });
};

async function igPic(nickname) {
  const url = `https://www.instagram.com/${nickname}/?__a=1`;
  const path = `./pics/${nickname}.png`;
  const json = await fetch(url).then(res => res.json());
  const picUrl = json.graphql.user.profile_pic_url_hd;
  
  download(picUrl, path, () => {
    console.log('Done!');
  });
}

igPic('mrpaschenko');
