/**
 * 从数据库中拿出信息
 */
const fs = require('fs');
const path = require('path');
const examinfo = require('./ExamInfoModel.js');
// examinfo.find({}, (err, res) => {
//     let str = '[';
//     for (let i = 0; i < res.length; i++) {
//         if (i !== res.length - 1) {
//             str = str + JSON.stringify(res[i]) + ',';
//         }
//         else{
//             str = str + JSON.stringify(res[i]);
//         }
//     }
//     str = str + ']'
//     fs.writeFileSync(path.join(__dirname, './examinfo.json'), str);
// })
const zzz = require('./examInfo.json');
console.log(zzz.length);