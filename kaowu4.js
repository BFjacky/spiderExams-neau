
/**
 * 撞库考务信息
 */
const examInfo = require('./ExamInfoModel.js')
const getExamInfo = require('./getExamInfo.js')
/**
 * 学号生成器
 * @param {年级*} grade 
 * @param {学院范围起始*} range
 * 如 17 ['01','02','03','04','05'] (就是A0117 ———— A0517的同学们)
 */
function prodStuID(grade, range) {
    //将1 转换为 0001
    let change = function (number) {
        if (number < 10) {
            return '000' + number;
        } else if (number < 100) {
            return '00' + number;
        } else if (number < 1000) {
            return '0' + number;
        } else {
            return '' + number;
        }
    }

    //一个学院最多的学生数量
    const maxStudents = 1300;
    //装学号的数组
    let stuIds = [];
    //数组下标
    let index = 0;

    for (let i = 0; i < range.length; i++) {
        for (let j = 0; j <= maxStudents; j++) {
            stuIds[index] = 'A' + range[i] + grade + change(j);
            index++;
        }
    }

    return stuIds;
}



//获取一个学生考场信息并且插入在数据库中
async function getAndSave(stuId) {
    return new Promise(async (resolve, reject) => {
        try {
            let results = await getExamInfo(stuId);
            if (results.length === 0) {
                resolve(0);
            }
            for (let i = 0; i < results.length; i++) {
                if (results[i].time !== '时间') {
                    examInfo.update({ courseName: results[i].courseName, stuId: results[i].stuId, stuName: results[i].stuName },
                        { time: results[i].time, location: results[i].location, courseNumber: results[i].courseNumber },
                        { mutil: true, upsert: true }, (err, res) => {
                            if (err) {

                                reject(err)
                            } else {
                                resolve(results.length);
                            }
                        })
                }
            }
        } catch (err) {
            reject(err);
            resolve(-1);
        }
    })
}


//找到数据库中，该年级最后一名信息
async function getLast(grade) {
    let maxNumber = 0;
    const stus = await examInfo.find({});
    const stuIds = [];
    for (const stu of stus) {
        if (stu.stuId[3] + stu.stuId[4] === grade) {
            stuIds.push(stu.stuId);
        }
    }
    for (const stuId of stuIds) {
        const smartNumber = stuId[1] + stuId[2] + stuId[5] + stuId[6] + stuId[7] + stuId[8];
        if (parseInt(smartNumber) > maxNumber) {
            maxNumber = parseInt(smartNumber);
        }
    }
    return maxNumber;
}
//['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21','22'])

//
async function wait(time) {
    console.log(`稍等一会儿重试!`)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('ok')
        }, time);
    })
}
function dodo() {
    return new Promise(async (resolve, reject) => {
        const grade = ['17'];
        //连续失败次数
        let failed = 0;
        const xueyuan = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];
        const maxSmartNumber = await getLast(grade[0]);
        let change = function (number) {
            if (number < 10) {
                return '000' + number;
            } else if (number < 100) {
                return '00' + number;
            } else if (number < 1000) {
                return '0' + number;
            } else {
                return '' + number;
            }
        }
        for (let m = 0; m < grade.length; m++) {
            for (let i = 0; i < xueyuan.length; i++) {
                failed = 0;
                for (let j = 0; j <= 1500; j++) {
                    let stuId = 'A' + xueyuan[i] + grade[m] + change(j);

                    //判断改stuId是否已经爬取过了
                    const smartNumber = parseInt(stuId[1] + stuId[2] + stuId[5] + stuId[6] + stuId[7] + stuId[8]);

                    if (maxSmartNumber > smartNumber) {
                        console.log(`${stuId}已经获取过了`);
                        continue;
                    }
                    let res;
                    try {
                        res = await getAndSave(stuId)
                    } catch (err) {
                        j--;
                        console.log(`${stuId}出错了`);
                        await wait(5000);
                        continue;
                    }
                    console.log(stuId + " : " + res + ", failed : " + failed);
                    if (res === 0) {
                        failed++;
                    } else if (res === -1) {

                    } else {
                        failed = 0;
                    }
                    if (res === -1) {
                        j--;
                    }
                    if (failed >= 100) {
                        break;
                    }
                }
            }
        }
    })
}

dodo();



