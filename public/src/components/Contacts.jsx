import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            <div className="brand-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Live Chat</h3>
          </div>
          <div className="search-bar">
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="#aaa" strokeWidth="2"/>
              <path d="M21 21L16.65 16.65" stroke="#aaa" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input type="text" placeholder="Search contacts..." />
          </div>
          <div className="contacts-label">Recent Chats</div>
          <div className="contacts">
            {contacts.map((contact, index) => (
              <div
                key={contact._id}
                className={`contact ${index === currentSelected ? "selected" : ""}`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar-wrap">
                  <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="" />
                  <span className="status-dot"></span>
                </div>
                <div className="contact-info">
                  <h3>{contact.username}</h3>
                  <p>Tap to start chatting</p>
                </div>
              </div>
            ))}
          </div>
          <div className="current-user">
            <div className="avatar-wrap">
              <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
            </div>
            <div className="user-info">
              <h4>{currentUserName}</h4>
              <span className="online-badge">● Online</span>
            </div>
            <div className="settings-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" stroke="#aaa" strokeWidth="2"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#aaa" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 72px 54px 28px 1fr 70px;
  overflow: hidden;
  background-color: #ffffff;
  border-right: 1px solid #e8e8e8;

  .brand {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0 1.4rem;
    border-bottom: 1px solid #f0f0f0;
    .brand-icon {
      width: 36px;
      height: 36px;
      background: #f4f4f4;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      svg { width: 18px; height: 18px; }
    }
    h3 {
      color: #222;
      font-weight: 700;
      font-size: 1.1rem;
      letter-spacing: -0.02em;
    }
  }

  .search-bar {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0 1rem;
    padding: 0 0.8rem;
    background: #f6f6f6;
    border-radius: 10px;
    border: 1px solid #ececec;
    align-self: center;
    svg { width: 15px; height: 15px; flex-shrink: 0; }
    input {
      background: transparent;
      border: none;
      outline: none;
      font-size: 0.85rem;
      color: #444;
      width: 100%;
      padding: 0.45rem 0;
      font-family: inherit;
      &::placeholder { color: #bbb; }
    }
  }

  .contacts-label {
    padding: 0 1.4rem;
    font-size: 0.7rem;
    font-weight: 700;
    color: #aaa;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    align-self: end;
    padding-bottom: 4px;
  }

  .contacts {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding: 0.3rem 0.7rem;
    gap: 0.15rem;
    &::-webkit-scrollbar { width: 3px; }
    &::-webkit-scrollbar-thumb { background-color: #e0e0e0; border-radius: 2px; }

    .contact {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      padding: 0.65rem 0.75rem;
      border-radius: 12px;
      cursor: pointer;
      transition: background 0.18s ease;
      &:hover { background: #f5f5f5; }

      .avatar-wrap {
        position: relative;
        flex-shrink: 0;
        img {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid #efefef;
          display: block;
        }
        .status-dot {
          position: absolute;
          bottom: 1px; right: 1px;
          width: 10px; height: 10px;
          background: #4caf76;
          border-radius: 50%;
          border: 2px solid #fff;
        }
      }

      .contact-info {
        flex: 1;
        min-width: 0;
        h3 {
          font-size: 0.9rem;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        p {
          font-size: 0.75rem;
          color: #b0b0b0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

    .selected {
      background: #f0f0f0 !important;
      .contact-info h3 { color: #111; }
    }
  }

  .current-user {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0 1rem;
    background: #fafafa;
    border-top: 1px solid #efefef;

    .avatar-wrap img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #e5e5e5;
      display: block;
    }

    .user-info {
      flex: 1;
      h4 { font-size: 0.85rem; font-weight: 600; color: #1a1a1a; margin-bottom: 1px; }
      .online-badge { font-size: 0.7rem; color: #4caf76; font-weight: 500; }
    }

    .settings-icon {
      cursor: pointer;
      padding: 4px;
      border-radius: 6px;
      transition: background 0.15s;
      &:hover { background: #efefef; }
      svg { width: 16px; height: 16px; display: block; }
    }
  }
`;
