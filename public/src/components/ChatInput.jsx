import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickerhideShow = () => setShowEmojiPicker(!showEmojiPicker);

  const handleEmojiClick = (event, emojiObject) => {
    setMsg((prev) => prev + emojiObject.emoji);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="emoji-wrap">
        <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
        {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
      </div>
      <form className="input-container" onSubmit={sendChat}>
        <input
          type="text"
          placeholder="Type a message..."
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit" disabled={msg.length === 0}>
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0 1.2rem;
  background: #ffffff;
  border-top: 1px solid #efefef;

  .emoji-wrap {
    position: relative;
    flex-shrink: 0;
    color: #bbb;
    cursor: pointer;
    transition: color 0.15s;
    display: flex;
    align-items: center;
    &:hover { color: #888; }
    svg { font-size: 1.25rem; }

    .emoji-picker-react {
      position: absolute;
      bottom: 42px;
      left: 0;
      background-color: #fff;
      box-shadow: 0 4px 24px rgba(0,0,0,0.12);
      border-color: #efefef;
      border-radius: 12px;
      .emoji-scroll-wrapper::-webkit-scrollbar { background-color: #fff; width: 4px; }
      .emoji-scroll-wrapper::-webkit-scrollbar-thumb { background-color: #e0e0e0; }
      .emoji-categories button { filter: grayscale(1) opacity(0.6); }
      .emoji-search { background-color: #f5f5f5; border-color: #e8e8e8; border-radius: 8px; }
      .emoji-group:before { background-color: #fff; }
    }
  }

  .input-container {
    flex: 1;
    display: flex;
    align-items: center;
    background: #f5f5f5;
    border-radius: 24px;
    border: 1.5px solid #ebebeb;
    padding: 0 0.4rem 0 1.1rem;
    transition: border-color 0.15s;
    &:focus-within { border-color: #ccc; }

    input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      font-size: 0.9rem;
      color: #1a1a1a;
      padding: 0.6rem 0;
      font-family: inherit;
      &::placeholder { color: #bbb; }
    }

    button {
      flex-shrink: 0;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #2e2e2e;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s, opacity 0.15s;
      &:disabled { background: #d0d0d0; cursor: default; }
      &:not(:disabled):hover { background: #111; }
      svg { font-size: 1rem; color: white; }
    }
  }
`;
