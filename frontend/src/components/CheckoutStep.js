import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function CheckoutStep(props) {
  const steps = [
    { name: "Uye Giris", active: props.step1 },
    { name: "Sepet", active: props.step2 },
    { name: "Odeme", active: props.step3 },
    { name: "Siparis Ver", active: props.step4 },
  ];

  return (
    <Container>
      <Row className="text-center">
        {steps.map((step, index) => (
          <Col
            key={index}
            className={`border-bottom border-4 fw-bolder ${
              step.active ? "border-warning text-warning" : ""
            }`}
          >
            {step.name}
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CheckoutStep;
