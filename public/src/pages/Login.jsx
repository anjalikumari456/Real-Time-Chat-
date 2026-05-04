import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );

        navigate("/");
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>snappy</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/register">Create One.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f4f6ff;

  .brand {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    img {
      height: 3rem;
    }

    h1 {
      color: #4a5cf7;
      font-size: 1.8rem;
      font-weight: 600;
      letter-spacing: 1px;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background-color: #ffffff;
    border-radius: 1rem;
    padding: 3rem 2.5rem;
    width: 350px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  input {
    background-color: transparent;
    padding: 0.8rem;
    border: none;
    border-bottom: 1px solid #ccc;
    color: #333;
    width: 100%;
    font-size: 0.95rem;
    transition: 0.3s;

    &::placeholder {
      color: #aaa;
    }

    &:focus {
      border-bottom: 1px solid #4a5cf7;
      outline: none;
    }
  }

  button {
    background: linear-gradient(135deg, #4a5cf7, #6a7cff);
    color: white;
    padding: 0.9rem;
    border: none;
    font-weight: 600;
    cursor: pointer;
    border-radius: 0.5rem;
    font-size: 0.95rem;
    transition: 0.3s;

    &:hover {
      transform: translateY(-2px);
      opacity: 0.9;
    }
  }

  span {
    text-align: center;
    color: #555;
    font-size: 0.85rem;

    a {
      color: #4a5cf7;
      text-decoration: none;
      font-weight: 600;
    }
  }
`;