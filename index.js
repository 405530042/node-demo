const Xray=require('x-ray');
var x=Xray();
x('https://kiki.ccu.edu.tw/~ccmisp06/Course/5304.html','table > tr',[{
    No:'td:nth-child(2)',
    courseName:'td:nth-child(4)',
    teacher:'td:nth-child(5)'
},
]).write('./course.json');