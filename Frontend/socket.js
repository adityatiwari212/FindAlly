// socket.js
import io from "socket.io-client";

let socket;

export const getSocket = () => {
  if (!socket) {
    socket = io("http://localhost:4000", {
        reconnectionAttempts: 5, // Number of reconnection attempts
        reconnectionDelay: 1000, // Delay between reconnection attempts (in ms)
      });
  }
  return socket;
};
