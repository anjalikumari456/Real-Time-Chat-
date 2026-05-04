import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(async () => {
    setUserName(
      await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)).username
    );
  }, []);

  return (
    <Container>
      <div className="icon-wrap">
        <img src={Robot} alt="" />
      </div>
      <h1>Welcome back, <span>{userName}!</span></h1>
      <p>Select a conversation from the sidebar to start chatting.</p>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  background: #f9f9f9;

  .icon-wrap {
    width: 100px;
    height: 100px;
    background: #f0f0f0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;
    img { height: 5rem; }
  }

  h1 {
    font-size: 1.4rem;
    font-weight: 700;
    color: #1a1a1a;
    span { color: #555; }
  }

  p {
    font-size: 0.85rem;
    color: #aaa;
    font-weight: 400;
  }
`;
