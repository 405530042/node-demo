/*const Xray=require('x-ray');
var x=Xray();
x('https://kiki.ccu.edu.tw/~ccmisp06/Course/5304.html','table > tr',[{
    No:'td:nth-child(2)',
    courseName:'td:nth-child(4)',
    teacher:'td:nth-child(5)'
},
]).write('./course.json');*/
const Express = require('express');
const Helmet = require('helmet');
const servestatic=require('serve-static');
const app =Express();

app.use(Helmet());
app.use(servestatic('public'));
app.get('/user/', (req, res, next) => {
    console.log('middleware');
    next(); // important
   }); 
   
app.get('/',function (req,res) {
    console.log('hello');
    res.send('hello world');
});
app.get('/home/*',(req,res)=>{
    res.send('hello home');
});
app.get('/user/:id',(req,res)=>{
    console.log(req.params.id);
    res.send('user id: ' + req.params.id);
})
app.listen(process.env.PORT||3000,function () {
    console.log('start listen http://localhost:3000');    
});
