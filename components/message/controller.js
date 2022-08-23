const store = require("./store");
const socket =require('../../socket').socket
function addMessage(chat,user, message,file) {
  return new Promise((resolve, reject) => {
    if (!user || !message) {
      console.error("[MessageController] No hay usuario o Mensaje");
      return reject("Los datos son incorrectos");
    }
    let fileUrl = ''
    if(file){
      fileUrl = '()/app/files/'+file.filename
    }
    const fullMessage = {
      chat:chat,
      user: user,
      message: message,
      date: new Date(),
      file: fileUrl
    };
    store.add(fullMessage);
    socket.io.emit('message',fullMessage)
    resolve(fullMessage);
  });
}
function getMessages(filterUser) {
  return new Promise((resolve, reject) => {
    resolve(store.list(filterUser));
  });
}

function updateMessage(id, message) {
  return new Promise(async (resolve, reject) => {
    if (!id || !message) {
      reject("Invalid Data");
      return false;
    }
    const res = await store.updateText(id, message);
    resolve(res);
  });
}
function deleteMessage(id) {
  return new Promise((resolve, reject) => {
    if (!id) {
      reject("id invalido");
      return false;
    }
    store
      .remove(id)
      .then(() => {
        resolve();
      })
      .catch((e) => {
        reject(e);
      });
  });
}
module.exports = {
  addMessage,
  getMessages,
  updateMessage,
  deleteMessage,
};
