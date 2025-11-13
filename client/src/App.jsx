import { Button, Container, Stack, TextField, Box, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";

const App = () => {
  const socket = useMemo(() => io("http://localhost:3000", {withCredentials:true}), []);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName]=useState("")
  console.log(messages);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    setMessage("");
    setRoom("");
  };

  const joinRoomHandler=(e)=>{
    e.preventDefault()
    socket.emit("join-room", roomName)
    setRoomName("")
  }

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected", socket.id);
      setSocketId(socket.id);
    });

    socket.on("received-message", (data) => {
      console.log(data);
      setMessages((messages) => [...messages, data]);
    });
    socket.on("Welcome", (s) => {
      console.log(s);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <Container maxWidth="sm">
      <Box sx={{height:50}}>


      </Box>
      {/* <Typography variant="h2" component="div" gutterBottom>
        Welcome to Socket.io
      </Typography> */}
      <Typography variant="h6" component="div" gutterBottom>
        {socketId}
      </Typography>




      <form onSubmit={joinRoomHandler}>

        <h5>Join Room</h5>

         <TextField
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="outlined-basic"
          label="RoomName"
          variant="outlined"
        ></TextField>

        <Button type="submit" variant="contained" color="primary">
          Join
        </Button>

      </form>

      <form onSubmit={handleSubmit}>
        <TextField
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="outlined-basic"
          label="Room"
          variant="outlined"
        ></TextField>

        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id=""
          className="outlined-basic"
          label="Message"
          variant="outlined"
        ></TextField>
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>

      <Stack>
        {messages.map((m) => {
          return <Typography variant="h6" component="div" gutterBottom>
            {m.message}
          </Typography>;
        })}
      </Stack>
    </Container>
  );
};

export default App;
