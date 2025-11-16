import { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import "./ChatRoom.css";
import { toast } from "react-toastify";

const formatDateHeader = (date) => {
  const today = new Date();
  const msgDate = new Date(date);

  const diff = today.setHours(0, 0, 0, 0) - msgDate.setHours(0, 0, 0, 0);

  const oneDay = 24 * 60 * 60 * 1000;

  if (diff === 0) return "Today";
  if (diff === oneDay) return "Yesterday";

  return msgDate.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

const groupMessagesByDate = (messages) => {
  const groups = {};

  messages.forEach((msg) => {
    const header = formatDateHeader(msg.createdAt);
    if (!groups[header]) groups[header] = [];
    groups[header].push(msg);
  });

  return groups;
};

export default function ChatRoom() {
  const navigate = useNavigate();
  const { id: roomId } = useParams();

  const [socketID, setSocketID] = useState("");
  const [roomDetails, setRoomDetails] = useState({
    name: "UnKnown",
    description: "UnKnown",
    activeMembers: null,
  });
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  const currentUserEmail = JSON.parse(localStorage.getItem("user")).email;
  // console.log(currentUserEmail);

  // -------------------------------------
  // Create socket ONCE (never recreated)
  // -------------------------------------
  const socket = useMemo(
    () =>
      io("http://localhost:3000", {
        withCredentials: true,
      }),
    []
  );

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  // -------------------------------------
  // Setup room + listeners
  // -------------------------------------
  useEffect(() => {
    socket.on("connect", () => {
      setSocketID(socket.id);
      // console.log("Connected:", socket.id);

      socket.emit("join-room", roomId);
    });

    // Receive full message list from backend
    socket.on("messages", (data) => {
      // console.log("Received Messages:", data);

      // ❗ THIS FIXES YOUR MAIN BUG
      setMessages(data);
    });

    return () => {
      socket.off("connect");
      socket.off("messages");
      socket.emit("leave-room");
      socket.disconnect();
    };
  }, [roomId, socket]);

  // Auto-scroll when messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchRoomById = async (roomId) => {
      let url = `${import.meta.env.VITE_API_URL}/room/getRoomByID/${roomId}`;
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();

      // console.log(result);

      if (result.success) {
        setRoomDetails(result.room);
      } else {
        toast.error("Error in loading the Chat Rooms.");
      }
    };

    fetchRoomById(roomId);
  }, [roomId]);

  // -------------------------------------
  // Send message via REST
  // (backend will emit updated list)
  // -------------------------------------
  // const handleSubmit = async () => {
  //   if (!newMsg.trim()) return;

  //   try {
  //     const url = `${import.meta.env.VITE_API_URL}/messages/sendMessage`;

  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       credentials: "include",
  //       body: JSON.stringify({ newMsg, roomId }),
  //     });

  //     const result = await response.json();

  //     if (result.success) {
  //       setNewMsg("");
  //     } else {
  //       toast.error("Failed to send message");
  //     }
  //   } catch (err) {
  //     toast.error("Server error");
  //   }
  // };
  const handleSubmit = () => {
    if (!newMsg.trim()) return;

    socket.emit("send-message", {
      msg: newMsg,
      roomId,
    });

    setNewMsg("");
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="chat-container">
      {/* HEADER */}
      <div className="chat-header">
        <button className="back-btn" onClick={() => navigate("/home")}>
          ⬅ Back
        </button>

        <div>
          <h2 className="room-title">{roomDetails.name}</h2>
          <p className="room-desc">{roomDetails.description}</p>
        </div>
      </div>

      {/* MESSAGES */}
      <div className="messages-box">
        {messages.length === 0 ? (
          <div className="empty-messages">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          Object.keys(groupedMessages).map((dateLabel,i) => (
            <div key={i}>
              <div className="date-header">{dateLabel}</div>

              {groupedMessages[dateLabel].map((msg) => {
                // console.log(msg)
                const mine = msg.sender?.email === currentUserEmail;

                return (
                  <div
                    key={msg._id}
                    className={`message fade-in ${mine ? "mine" : "theirs"}`}
                  >
                    <div className="sender-name">
                      {mine ? "You" : msg.sender?.name}
                    </div>

                    <div className="bubble">{msg.msg}</div>

                    <div className="time">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? handleSubmit() : null)}
        />
        <button onClick={handleSubmit}>Send</button>
      </div>
    </div>
  );
}
