import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import { auth } from "../firebase";
import { updateProfile } from "firebase/auth";
import { addDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "../firebase";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState('');
  const { signUp } = useUserAuth('');
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password)
      await updateProfile(auth.currentUser, { displayName: name, photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLtmFaY8pDzDK1fcftPqQlxTlSco0ZhAEN-Q&usqp=CAU'})
      await addDoc(collection(db, "users"), {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
        movies: []
      });
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register">
      <div className="p-4 box">
        <h2 className="mb-3">Blockbuster Signup</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Control
              type="text"
              placeholder="User Name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Sign up
            </Button>
          </div>
        </Form>
        <div className="p-4 mt-3 text-center">
          Already have an account? <Link to="/">Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
