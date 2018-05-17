if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
};
const Express = require('express');
const Helmet = require('helmet');
const servestatic = require('serve-static');
const bodyPoster = require('body-parser');
const app = Express();

const { db, User, Post } = require('./models');

app.use(Helmet());
app.use(servestatic('public'));
app.use(bodyPoster.json());
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
app.get('/user/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.send('user id: ' + req.params.id);
})
app.get('/create/user', (req, res) => {
    User.create({
        id: '1',
        email: '123@ccu.com',
        password: '12123',
        nickname: 'lanbo',
        gender: '1'
    }).then(user => {
        res.send(user);
    });
});
app.get('/create/post', async (req, res) => {
    const post = await Post.create({
        title: 'Hello',
        content: 'hello world',
        authorId: '1'
    });
    res.send(post);
})

app.get('/posts', async (req, res) => {
    const limit = req.query.limit || 5;
    const page = req.query.page || 1;
    const posts = await Post.findAndCountAll({
        limit: limit,
        offest: limit * (page - 1)
    });
    res.send(Object.assign(posts,
         { page: page,
             totalPage: Math.ceil(posts.count / limit), })
            );
});
app.get('/posts/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post) {
        res.send(post);
    }
    else {
        res.status(404).end();
    }
})
app.post('/posts', async (req, res) => {
    const post = await Post.create(req.body);
    res.status(201).send(post);
});
app.delete('/posts/:id', async (req, res) => {
    await Post.destroy({
        where: { id: req.params.id }
    });
    res.status(204).end();
});
db.sync().then(() => {
    app.listen(process.env.PORT, function () {
        console.log('start listen http://localhost:3000');
    });
})
