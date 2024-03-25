import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { getError } from "../utlis";

export const Signup = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/";
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch: ctxDistpach } = useContext(Store);

  const { userInfo } = state;

  const handleRegister = async (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      toast.error("Sifreleriniz Uyusmuyor");
    } else {
      try {
        const { data } = await axios.post("/api/users/signup", {
          name,
          email,
          password,
        });
        ctxDistpach({ type: "USER_LOGIN", payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate(redirect || "/");
      } catch (err) {
        toast.error(getError(err));
      }
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  return (
    <Container
      className="mt-5"
      style={{
        maxWidth: "600px",
      }}
    >
      <h1>Kayıt Ol</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Ad</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ad"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Sifre</Form.Label>
          <Form.Control
            type="password"
            placeholder="Sifre"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Sifre Tekrar</Form.Label>
          <Form.Control
            type="password"
            placeholder="Sifre Tekrar"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Button onClick={handleRegister}>Uye Girisi</Button>
        </Form.Group>
        <div>
          Uye olduysanız
          <Link to={`/signin?redirect=${redirect}`}>Kayıt Ol</Link>
        </div>
      </Form>
    </Container>
  );
};
