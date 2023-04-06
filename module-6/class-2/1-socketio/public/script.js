const socket = io();

socket.on("connect", () => console.log("Connected"));

const chatElement = document.querySelector("ul#chat");

const createChatMessage = (msg) => {
  const li = document.createElement("li");
  // li.textContent = msg;
  li.innerHTML = msg; // Security vulnerability
  return li;
};

fetch("/messages?last=20")
  .then(res => res.json())
  .then(({ messages }) => {
    const msgElements = messages.map(msg => createChatMessage(msg));
    const fragment = document.createDocumentFragment();
    fragment.append(...msgElements);
    chatElement.appendChild(fragment);
  })
  .catch(console.error);

socket.on("message", (message) => {
  // console.log(message);
  const messageElement = createChatMessage(message);
  chatElement.appendChild(messageElement);
  // Scroll to bottom
  chatElement.scrollTop = chatElement.scrollHeight;
});

socket.on("online", (online) => {
  document.querySelector("span#online").textContent = online;
});

socket.on("name", (name) => {
  // console.log(`Your name: ${name}`);
  document.querySelector("span#name-display").textContent = name;
});

document.querySelector("form#name-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const newName = document.querySelector("input#name").value.trim();
  if (!newName) return;

  socket.emit("name", newName);
});

const msgInput = document.querySelector("input#msg");
document.querySelector("form#chat-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const msg = msgInput.value.trim();
  if (!msg) return;

  // socket.send({ name: name, message: msg, sent: Date.now() });
  socket.send(msg);

  msgInput.value = "";
});