import React, { useContext, useEffect, useState } from "react";
import CheckoutStep from "../components/CheckoutStep";
import { Button, Container, Form } from "react-bootstrap";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";

function Shopping() {
  const { state, dispatch: ctxDistpach } = useContext(Store);
  const {
    userInfo,
    cart: { shoppingAddress },
  } = state;
  const navigation = useNavigate();
  const [fullname, setFullname] = useState(shoppingAddress.fullname || "");
  const [address, setAddress] = useState(shoppingAddress.address || "");
  const [country, setCountry] = useState(shoppingAddress.country || "");
  const [postalCode, setPostalCode] = useState(
    shoppingAddress.postalCode || ""
  );
  const [city, setCity] = useState(shoppingAddress.city || "");
  useEffect(() => {
    if (!userInfo) {
      navigation("/signin?redirect=/shopping");
    }
  }, [userInfo, navigation]);

  const handleAddres = (e) => {
    e.preventDefault();
    const adress = { fullname, address, country, postalCode, city };
    ctxDistpach({ type: "SAVE_ADD_ADDRESS", payload: adress });
    localStorage.setItem("shoppingAddress", JSON.stringify(adress));
    navigation("/payment");
  };

  return (
    <div>
      <CheckoutStep step1 step2 />
      <Container
        className="mt-2"
        style={{
          maxWidth: "600px",
        }}
      >
        <h1>Adres</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Adres Baslıgı</Form.Label>
            <Form.Control
              value={fullname}
              type="text"
              placeholder="Adres Baslıgı giriniz"
              onChange={(e) => setFullname(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Adres</Form.Label>
            <Form.Control
              value={address}
              type="text"
              placeholder="Adres giriniz"
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Ulke</Form.Label>
            <Form.Control
              value={country}
              type="text"
              placeholder="Ulke giriniz"
              onChange={(e) => setCountry(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Sehir</Form.Label>
            <Form.Control
              value={city}
              type="text"
              placeholder="Sehir giriniz"
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Posta Kodu</Form.Label>
            <Form.Control
              value={postalCode}
              type="text"
              placeholder="Posta Kodu giriniz"
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <div className=" d-grid">
              <Button className="bg-warning" onClick={handleAddres}>
                Kaydet
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
}

export default Shopping;
