import {Server} from 'socket.io'

class SocketManager {
    constructor(server) {
        this.io = new Server(server);
        this.live_users = new Map(); // Now it's part of the class
    }

    initSocketEvents() {
        this.io.on('connection', (socket) => {
            console.log(`Connection established ${socket.id}`);

            socket.on('newuser', (id) => {
                this.live_users.set(id, socket.id);
                console.log(`User ${id} connected`);
            });
            socket.on('message', (ans) => {
                console.log(this.live_users)
                console.log(ans);
                if (this.live_users.has(ans.receiver)) {
                    const receiver = this.live_users.get(ans.receiver);
                    if (receiver) {
                        socket.to(receiver).emit('reply', ans);
                    }
                } else {
                    console.log('Receiver does not exist');
                    socket.emit('error', { msg: 'Receiver is not connected' });
                }
            });

            socket.on('disconnect', () => {
                console.log(`User disconnected: ${socket.id}`);
                for (let [userId, socketId] of this.live_users.entries()) {
                    if (socketId === socket.id) {
                        this.live_users.delete(userId);
                        break;
                    }
                }
            });

            socket.emit('msg', { msg: 'hello from backend' });
        });
    }
}

export default SocketManager;
