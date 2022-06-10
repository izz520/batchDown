/*
 * @Author: YaShu
 * @Date: 2022-06-07 18:31:53
 * @LastEditors: YaShu
 * @LastEditTime: 2022-06-07 19:09:02
 * @FilePath: \batchDonload\index.js
 * @Description: 
 * 
 * Copyright (c) 2022 by YaShu, All Rights Reserved. 
 */
// const request = require('request');
const http = require("request");
const axios = require("axios")
const fs = require('fs');
const path = require('path');
//下载
function getfileByUrl(url, fileName, dir) {
    console.log('------------------------------------------------')
    console.log(fileName)
    console.log(dir)
    let stream = fs.createWriteStream(path.join(dir, fileName));

    http(url)

    axios({
        method: 'GET',
        url: url
    }).then(res=>{
        res.pipe(stream);
        console.log("文件" + fileName + "下载完毕");
    }).catch(err=>{
        console.log("文件" + fileName + "下载失败");
        fs.appendFile("./log.txt",fileName)
    })
}

//开始
function start(){
    const total = 2222;
    for(let i = 0;i<total;i++){
        const name = `${i}.json`;
        const url = `https://bafybeib6r3ecnga5pq42iyyofdnfhjsf4gljkjxaoa67tpqpfzjbhcbl5a.ipfs.nftstorage.link/${i}.json`;
        const path = "./json"
        getfileByUrl(url,name,path)
    }
}

start();

