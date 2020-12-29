'use strict'

const fs = require('fs');
const request = require('request');
const fetch = require('node-fetch');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const download = (url, path, callback) => {
    request.head(url, (err, res, body) => {
        request(url)
            .pipe(fs.createWriteStream(path))
            .on('close', callback);
    });
};

rl.question('Please enter instagram nickname: ', (nickname) => {
    const url = `https://www.instagram.com/${nickname}/?__a=1`;
    console.log("General information is located here:", url);

    const path = `./pics/${nickname}.png`;

    fetch(url)
        .then(res => res.json())
        .then((json) => {
            const picUrl = json.graphql.user.profile_pic_url_hd;

            download(picUrl, path, () => {
                console.log('Done!');
            });
        });
    rl.close();
});
