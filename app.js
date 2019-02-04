const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", socket => {
	console.log("New Client connected"), setInterval(
	() => getTime(socket), 
	1
	);
	socket.on("disconnect", () => console.log("Client disconnected"));
});

const getTime = async socket => {
	try {
		const date = new Date();
		
		socket.emit("TIME", date.getDate() + " del mes " + date.getMonth()+1 + " de " + date.getFullYear() +
		" La hora es: " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ":" + date.getMilliseconds());
	}catch (error) {
	console.error(`Error: ${error.code}`);
	}
};

server.listen(port, () => console.log(`Listening on port ${port}`));

