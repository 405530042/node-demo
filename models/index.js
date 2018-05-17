const db=require('./_db');
const User= require('./User.js');
const Post=require('./Post');
//建立關聯
User.hasMany(Post,{
    foreignKey:'authorId'
});
Post.belongsTo(User,{
    foreignKey:'authorId'
});
module.exports={
    db,
    User,
    Post
}