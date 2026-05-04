import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(async () => {
    const data = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
    const response = await axios.post(recieveMessageRoute, { from: data._id, to: currentChat._id });
    setMessages(response.data);
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
    socket.current.emit("send-msg", { to: currentChat._id, from: data._id, msg });
    await axios.post(sendMessageRoute, { from: data._id, to: currentChat._id, message: msg });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar-wrap">
            <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="" />
            <span className="status-dot"></span>
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
            <span className="status-text">Active now</span>
          </div>
        </div>
        <div className="header-actions">
          <button className="action-btn">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.95 10.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012.86 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="action-btn">
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="1" fill="#888"/><circle cx="19" cy="12" r="1" fill="#888"/><circle cx="5" cy="12" r="1" fill="#888"/>
            </svg>
          </button>
          <Logout />
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div ref={scrollRef} key={uuidv4()}>
            <div className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
              <div className="content">
                <p>{message.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 70px 1fr 70px;
  overflow: hidden;
  background: #f9f9f9;

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 70px 1fr 70px;
  }

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.5rem;
    background: #ffffff;
    border-bottom: 1px solid #efefef;

    .user-details {
      display: flex;
      align-items: center;
      gap: 0.85rem;

      .avatar-wrap {
        position: relative;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid #efefef;
          display: block;
        }
        .status-dot {
          position: absolute;
          bottom: 1px; right: 1px;
          width: 9px; height: 9px;
          background: #4caf76;
          border-radius: 50%;
          border: 2px solid #fff;
        }
      }

      .username {
        h3 {
          font-size: 0.95rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 1px;
        }
        .status-text {
          font-size: 0.72rem;
          color: #4caf76;
          font-weight: 500;
        }
      }
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.3rem;

      .action-btn {
        background: none;
        border: none;
        cursor: pointer;
        padding: 7px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.15s;
        &:hover { background: #f3f3f3; }
        svg { width: 18px; height: 18px; display: block; }
      }
    }
  }

  .chat-messages {
    padding: 1.2rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    overflow-y: auto;
    background: #f9f9f9;

    &::-webkit-scrollbar { width: 3px; }
    &::-webkit-scrollbar-thumb { background: #ddd; border-radius: 2px; }

    .message {
      display: flex;
      align-items: flex-end;

      .content {
        max-width: 60%;
        overflow-wrap: break-word;
        padding: 0.75rem 1rem;
        font-size: 0.9rem;
        line-height: 1.4;
        border-radius: 18px;
        @media screen and (min-width: 720px) and (max-width: 1080px) { max-width: 75%; }
      }
    }

    .sended {
      justify-content: flex-end;
      .content {
        background: #2e2e2e;
        color: #ffffff;
        border-bottom-right-radius: 4px;
      }
    }

    .recieved {
      justify-content: flex-start;
      .content {
        background: #ffffff;
        color: #1a1a1a;
        border: 1px solid #ebebeb;
        border-bottom-left-radius: 4px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.04);
      }
    }
  }
`;
