const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    docModel :{
        type:String,
        required:true,
        enum:['Tweet','Comment']
    },
    doc:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        refPath:'docModel'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ],
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Like'
    }]
},{timestamps:true});

const Comment = mongoose.model('Comment',commentSchema);
module.exports = Comment;