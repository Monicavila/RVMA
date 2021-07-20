require('dotenv').config();
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

const users = {};
const usersName = [];
const rooms = {};

const socketToRoom = {};

io.on('connection', socket => {
    /**
     * Manage roomID and conect to socket meeting, manage how many participants allow the meeting room
     */
    socket.on("join room", roomID => {
        if (users[roomID]) {
            const length = users[roomID].length;
            if (length === 4) {
                socket.emit("room full");
                return;
            }
            users[roomID].push(socket.id);
        } else {
            users[roomID] = [socket.id];
        }
        socketToRoom[socket.id] = roomID;
        const usersInThisRoom = users[roomID].filter(id => id !== socket.id);
        socket.emit("all users", usersInThisRoom);
    });
    /**
     * Get and display room name
     */
    socket.on("get room name", roomId => {
        console.log("ROOMS DETAILED", roomId, rooms[roomId])
        socket.emit("room name", rooms[roomId] || 'New Room')
    })
    /**
     * Update room name if the user change it
     */
    socket.on("set room name", (roomDetails) => {
        const {roomID, roomName} = roomDetails;
        console.log(roomDetails);
        rooms[roomID] = roomName
        // socket.emit("room name", roomName || 'New Room')
        console.log(roomName, "THIS IS ROOM NAME", "SOMETHING WEIRD")
        socket.broadcast.emit("room name", roomName || 'New Roomssssss')
    })
    /**
     * Set participant name
     */
    socket.on("join name", userName => {
        usersName.push(userName)
        console.log(usersName)
        socket.emit("get names", usersName)
        socket.emit("get names", usersName)
    })
    /**
     * Send signal to the peer
     */
    socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
        // socket.broadcast.emit("user joined", { signal: payload.signal, callerID: payload.callerID })
    });
    /**
     * Return signal from the peer
     */
    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });
    /**
     * Finished the meeting
     */
    socket.on('disconnect', () => {
        const roomID = socketToRoom[socket.id];
        let room = users[roomID];
        if (room) {
            room = room.filter(id => id !== socket.id);
            users[roomID] = room;
        }
    });

});

server.listen(process.env.PORT || 8000, () => console.log('server is running on port 8000'));
    