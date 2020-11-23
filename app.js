let app = require('./config/server');

let server = app.listen(3000, function () {
    console.log('Servidor online - localhost:3000');
})

let io = require('socket.io').listen(server);

// definição de uma váriavel
app.set('io', io);

// criar a conexão por webSocket
// ouvir - EVENTO pre-definido -- conexão
io.on('connection', function (socket) {
    console.log('Usuário conectou!');

    socket.on('disconnect', function () {
        console.log('Usuário desconectou!');
    })

    socket.on('msgParaServidor', function (data) {
        // enviar para si proprio
        socket.emit(
            'msgParaCliente',
            { apelido: data.apelido, mensagem: data.mensagem }
        )
        // enviar para todos conectados
        socket.broadcast.emit(
            'msgParaCliente',
            { apelido: data.apelido, mensagem: data.mensagem }
        )

        if (parseInt(data.apelido_atualizado_nos_clientes) == 0) {
            socket.emit(
                'participantesParaCliente',
                { apelido: data.apelido }
            )

            socket.broadcast.emit(
                'participantesParaCliente',
                { apelido: data.apelido }
            )
        }
        



    })
})