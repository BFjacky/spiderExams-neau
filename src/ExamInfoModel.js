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
        time: String, //时间
        location: String, //地点
        courseNumber: String //课程号
    }, {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);
module.exports = db.model('examNew', examSchema);
