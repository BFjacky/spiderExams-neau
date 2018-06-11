const urllib = require('urllib');
const iconv = require('iconv-lite');
const cheerio = require('cheerio');
const axios = require('axios');
const url = 'http://www.w3school.com.cn/html/index.asp';
const gbkTransform = data => iconv.decode(data, 'gbk');
const query = {
    url,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    responseType: 'arraybuffer',
    transformResponse: gbkTransform,
};

let result;

async function getW3s(){
    result = await axios.request(query);
    console.log(result)
}
getW3s();