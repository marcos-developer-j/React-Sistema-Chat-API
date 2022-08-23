const response = require('../../network/response');
const express = require('express');
const router = express.Router();
const controller=require('./controller');

router.get('/',(req,res)=>{
    controller.listChats()
    .then(users=>{
        response.success(req,res,users,200)
    })
    .catch(e=>{
        response.error(req,res,'Internal Error Network Chats get',500,e)
    })

})

router.get('/:userId',(req,res)=>{
    controller.listChats(req.params.userId)
    .then(users=>{
        response.success(req,res,users,200)
    })
    .catch(e=>{
        response.error(req,res,'Internal Error Network Chats get',500,e)
    })

})
router.post('/',(req,res)=>{
    controller.addChat(req.body.users)
    .then(data=>{
        response.success(req,res,data,200)
    })
    .catch(e=>{
        response.error(req,res,'Internal Error Network Chats Post',500,e)
    })
    
})

module.exports = router;