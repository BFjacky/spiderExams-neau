/*
    程序运行时状况的表格
*/
const db = require('./db.js');
Schema = db.Schema;
const examSchema = new Schema(
    {
        stuId: String, //学号
        stuName: String, //姓名
        courseName: String,//课程名
        time: String,
        location: String,
        courseNumber: String
    }, {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);
module.exports = db.model('examNew', examSchema);
