let socket=io()
let user=''
let chatBox=document.getElementById('chatbox')
Swal.fire({
    title: 'Authentication',
    input: 'text',
    text: 'Set username for the Cristian\'s chat',
    inputValidator: value => {
        return !value.trim() && 'porva escribime!'
    },
    allowOutsideClick: false
}).then( result => {
    user = result.value
    document.getElementById('username').innerHTML = user
    socket = io()
})
chatBox.addEventListener('keyup',event=>{
    if (event.key==='Enter') {
        if (chatBox.value.trim().length>0) {
            socket.emit ('message',{
                user,
                message:chatBox.value
            })
            chatBox.value=''
        }
    }
})
//resivir mensajes
socket.on('logs',data=>{
    const divlog=document.getElementById('messageLogs')
    let messages=''
    data.reverse().forEach(message => {
        messages+=`<p><i>${message.user}</i>:${message.message}</p>`
    });
    divlog.innerHTML=messages
})