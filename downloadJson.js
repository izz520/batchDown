/*
 * @Author: YaShu
 * @Date: 2022-06-07 19:10:52
 * @LastEditors: YaShu
 * @LastEditTime: 2022-06-08 13:17:59
 * @FilePath: \batchDonload\downloadJson.js
 * @Description: 
 * 
 * Copyright (c) 2022 by YaShu, All Rights Reserved. 
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

async function start() {
    const total = 2222;
    for (let i = 2189; i < total; i++) {
        const name = `${i}.json`;
        const url = `https://bafybeib6r3ecnga5pq42iyyofdnfhjsf4gljkjxaoa67tpqpfzjbhcbl5a.ipfs.nftstorage.link/${i}.json`;
        const path = "./json"
        try {
            const res = await downloadFileAsync(url, name, path)
        } catch (err) {
            console.log("报错了");
        }
    }
}

async function startOne(i) {
    const name = `${i}.json`;
    const url = `https://bafybeib6r3ecnga5pq42iyyofdnfhjsf4gljkjxaoa67tpqpfzjbhcbl5a.ipfs.nftstorage.link/${i}.json`;
    const path = "./json"
    try {
        const res = await downloadFileAsync(url, name, path)
    } catch (err) {
        console.log("报错了");
    }
}

function downloadFileAsync(uri, fileName, dest) {
    return new Promise((resolve, reject) => {
        // 确保dest路径存在
        // const file = fs.createWriteStream(dest);
        const file = fs.createWriteStream(path.join(dest, fileName));

        https.get(uri, (res) => {
            if (res.statusCode !== 200) {
                console.log("错误了");
                reject(response.statusCode);
                return;
            }

            res.on('end', () => {
                console.log(`下载完成,${fileName}`);
            });

            // 进度、超时等

            file.on('finish', () => {
                // console.log('finish write file')
                file.close(resolve);
            }).on('error', (err) => {
                fs.unlink(dest);
                reject(1);
            })

            res.pipe(file);
        });
    });
}

start();
// startOne(2119);
