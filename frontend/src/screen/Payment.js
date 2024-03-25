import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";
import CheckoutStep from "../components/CheckoutStep";

function Payment() {
  const { state, dispatch: ctxDistpach } = useContext(Store);
  const {
    cart: { shoppingAddress, paymentMethod },
  } = state;
  const navigation = useNavigate();
  const [paymentMethodName, setPaymentMethodName] = useState(
    paymentMethod || "Paypal"
  );

  useEffect(() => {
    if (!shoppingAddress) {
      navigation("/signin?redirect=/payment");
    }
  }, [shoppingAddress, navigation]);

  const handlePayment = (e) => {
    e.preventDefault();
    ctxDistpach({ type: "ADD_PAYMENT", payload: paymentMethodName });
    localStorage.setItem("paymentMethod", JSON.stringify(paymentMethodName));
    navigation("/order");
  };
  return (
    <div>
      <CheckoutStep step1 step2 step3 />
      <Container
        className="mt-5"
        style={{
          maxWidth: "600px",
        }}
      >
        <h1>Odeme Yontemi</h1>
        <Form>
          <Form.Check
            type="radio"
            id="Paypal"
            label="Paypal"
            value="Paypal"
            checked={paymentMethodName === "Paypal"}
            onChange={(e) => setPaymentMethodName(e.target.value)}
          />
          <Form.Check
            type="radio"
            id="Strapi"
            label="Strapi"
            value="Strapi"
            checked={paymentMethodName === "Strapi"}
            onChange={(e) => setPaymentMethodName(e.target.value)}
          />
        </Form>
        <div className=" d-grid mt-3">
          <Button className="bg-warning" onClick={handlePayment}>
            Kaydet
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default Payment;
