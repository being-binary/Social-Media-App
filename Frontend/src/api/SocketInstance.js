import { io } from "socket.io-client";
import url from "../../select_url";

// let url = "http://localhost:8082";

const socket = io(url, {
    transports: ["websocket"],
    reconnection:true,
    reconnectionAttempts:5,
    autoConnect:false
 });
 
 export default socket;