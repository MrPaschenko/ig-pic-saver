'use strict';

const fs = require('fs');
const request = require('request');
const fetch = require('node-fetch');
const { Telegraf } = require('telegraf');
const config = require('config');
const bot = new Telegraf(config.get('token'));

const download = (url, path, callback) => {
  request.head(url, () => {
    request(url)
      .pipe(fs.createWriteStream(path))
      .on('close', callback);
  });
};

bot.start(ctx => ctx.reply('Enter instagram nickname'));
bot.on('message', ctx => {
  let nickname = ctx.update.message.text;
  if (nickname.includes('@')) {
    nickname = nickname.split('').splice(1).join('');
  }
  const url = `https://www.instagram.com/${nickname}/?__a=1`;
  const path = `./pics/${nickname}.png`;
  ctx.reply('Processing...');
  ctx.reply(`General information is located here: ${url}`);
  // fetch(url)
  //   .then(res => res.json())
  //   .then(json => console.log(json));
  // fetch(url)
  //   .then(res => res.json())
  //   .then(json => {
  //     const picUrl = json.graphql.user.profile_pic_url_hd;
  //     try {
  //       download(picUrl, path, () => {});
  //       ctx.replyWithDocument({ source: `./pics/${nickname}.png` });
  //     } catch (error) { ctx.reply('There is no such user'); }
  //   });
});

bot.launch();
