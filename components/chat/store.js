const Model = require('./model')

const addChat=(chat)=>{
    const myChat= new Model(chat)
    return myChat.save()

}
const listChats=(userId)=>{

    return new Promise((resolve,reject)=>{
        let filter ={};
        if (userId !== null){
            filter ={users:userId}
        };

        Model.find({})
        .populate('users')
        .exec((err,populated)=>{
            if(err){
                reject(err)
                return false
            }
            resolve(populated)
        })
    })
}

module.exports ={
    add: addChat,
    list: listChats
}