const response = require('../../network/response');
const express = require('express');
const router = express.Router();
const controller=require('./controller');
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/files/");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });

const upload = multer({storage:storage
})

router.get('/', (req,res)=>{
    const filterMessages= req.query.chat || null
    controller.getMessages(filterMessages)
    .then((messagesList)=>{
        response.success(req,res,messagesList,200)
    })
    .catch(e=>{
        response.error(req,res,'Unexpected Error',500,e)
    })
})
router.post('/',upload.single('file'), function(req,res){ 
    console.log(req.file)
    controller.addMessage(req.body.chat,req.body.user,req.body.message,req.file)
    .then((fullMessage)=>{
        response.success(req,res,fullMessage,201)
    })
    .catch(e=>{
        response.error(req,res,'Error inesperado',500,e)
    })
})

router.patch('/:id',(req,res)=>{
    controller.updateMessage(req.params.id,req.body.message)
    .then((data)=>{
        response.success(req,res,data,200)
    })
    .catch(e=>{
        response.error(req,res,'Error interno',500,e)
    })
})
router.delete('/:id',(req,res)=>{
    controller.deleteMessage(req.params.id)
    .then(()=>{
        response.success(req,res,`Usuario ${req.params.id} eliminado`,200)

    })
    .catch(e=>{
        response.error(req,res,'Error interno',500,e)
    })
})
module.exports = router