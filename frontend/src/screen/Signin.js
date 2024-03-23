import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export const Signin = () => {
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/";
  return (
    <Container
      className="mt-5"
      style={{
        maxWidth: "600px",
      }}
    >
      <h1>Uye Giris</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Button>Uye Girisi</Button>
        </Form.Group>
        <div>
          Uye Olmak icin <Link to={`/signup?redirect=${redirect}`}>Uye ol</Link>
        </div>
      </Form>
    </Container>
  );
};
