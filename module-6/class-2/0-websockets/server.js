import { nanoid } from "nanoid";
import { WebSocketServer } from "ws";

const server = new WebSocketServer({ port: 1337 });

const clients = new Map();

server.on("connection", (socket) => {
  const clientId = nanoid();
  console.log(`Connected - ${clientId}`);
  socket.send(`Hello ${clientId}`);

  clients.set(clientId, socket);


  [...clients.values()].forEach(client => client.send(`${clientId} connected!`));

  socket.on("message", (message) => {
    const msg = message.toString();
    const payload = `[${clientId}]: ${msg}`;

    console.log("Received:", payload);

    [...clients.values()].forEach(client => client.send(payload));
  });
});