if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
};
const Express = require('express');
const Helmet = require('helmet');
const servestatic = require('serve-static');
const app = Express();

const { db, User, Post } = require('./models');

app.use(Helmet());
app.use(servestatic('public'));
app.get('/user/', (req, res, next) => {
    console.log('middleware');
    next(); // important
});

app.get('/', function (req, res) {
    console.log('hello');
    res.send('hello world');
});
app.get('/home/*', (req, res) => {
    res.send('hello home');
});
app.get('/user/:id',async (req, res) => {
   const user=await User.findById(req.params.id);
    res.send('user id: ' + req.params.id);
})
app.get('/create/user', (req, res) => {
    User.create({
        id:'1',
        email: '123@ccu.com',
        password: '12123',
        nickname: 'lanbo',
        gender: '1'
    }).then(user => {
        res.send(user);
    });
});
app.get('/create/post',async (req,res)=>{
    const post =await Post.create({
        title:'Hello',
        content:'hello world',
        authorId:'1'
    });
    res.send(post);
})


db.sync().then(() => {
    app.listen(process.env.PORT, function () {
        console.log('start listen http://localhost:3000');
    });
})
