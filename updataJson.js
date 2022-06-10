/*
 * @Author: YaShu
 * @Date: 2022-06-07 21:20:37
 * @LastEditors: YaShu
 * @LastEditTime: 2022-06-08 13:20:39
 * @FilePath: \batchDonload\updataJson.js
 * @Description: 
 * 
 * Copyright (c) 2022 by YaShu, All Rights Reserved. 
 */
const https = require('https');
const fs = require('fs');
const path = require('path');
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
            file.on('finish', () => {
                file.close(resolve);
            }).on('error', (err) => {
                fs.unlink(dest);
                reject(1);
            })
            res.pipe(file);
        });
    });
}
function readJson(id, file, newName, newDescription) {
    return new Promise((resolve) => {
        //读取文件名下的内容
        const jsonStr = fs.readFileSync(`./Json/${file}`, { encoding: 'utf-8' });
        const jsonData = JSON.parse(jsonStr);
        let obj = {
            name: `${newName} #${id}`,
            description: newDescription,
            image: jsonData.image,
            edition: id,
            attributes: jsonData.attributes,
            compiler: "HashLips Art Engine"
        }
        //格式化json
        let Json = JSON.stringify(obj, "", "\t");
        fs.writeFileSync(`./newJson/${id}`, Json);
        console.log(`修改文件${file}成功`);
        resolve(true);
    })

}

async function start() {
    // NFT名字
    const newName = "NotTrippykidz";
    //NFT描述
    const newDescription = "NotTrippyKidz is an exclusive collection of 2222 NFTs tripping on the Ethereum Blockchain.";
    //准备让原来的NFT进行倒序存储
    let startId = 2221;
    const total = 2222;
    for (let i = 0; i < total; i++) {
        const file = `${i}.json`
        const res =  await readJson(startId,file,newName,newDescription);
        startId = startId-1
    }
}

start()