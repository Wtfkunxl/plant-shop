// server/data/users.js
// Simple in-memory user store
const users = []; // { username, passwordHash }

function addUser({ username, passwordHash }) {
  users.push({ username, passwordHash });
}

function getUser(username) {
  return users.find(u => u.username === username);
}

module.exports = { addUser, getUser };
