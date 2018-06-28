const urllib = require('urllib');
const iconv = require('iconv-lite');
const path = require('path');
const fs = require('fs');
const cheerio = require('cheerio');
const axios = require('axios');
module.exports = async function (stuid) {
    const gbkTransform = data => iconv.decode(data, 'gbk');

    const url = 'http://202.118.167.76/ksap/all.asp';
    const query = {
        url,
        method: 'POST',
        data: `keyword=${stuid}&ok=%B2%E9%D5%D2`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        responseType: 'arraybuffer',
        transformResponse: gbkTransform,
        proxy: {
            host: 'neauproxy.feit.me',
            port: 6000,
        }
    };

    let result;

    result = await axios.request(query);


    const $ = cheerio.load(result.data);
    let header;
    const exams = [];
    $('tr').each((i, e) => {
        const result = $(e).find('td').toArray().map(e => $(e).text());
        if (result && result[0] && result[0] === '时间') {
            header = result;
            return;
        }

        exams.push({
            courseName: result[3], location: result[1], time: result[0], stuId: result[4], stuName: result[5],
        });
    });

    return exams;
}
