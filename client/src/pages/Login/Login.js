import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import LoginJumbo from "../../components/LoginJumbo";
import "./Login.css";

class Login extends Component {
    state = {
        location: ""
    };

    render() {
    return (
        <Container fluid>
            <LoginJumbo>
                <h1>86D</h1>
                <h2>Take Inventory Faster</h2>
                <Link to="/">Olde Bar</Link>
                <br></br>
                <Link to="/">Amada</Link>
            </LoginJumbo>
            
        </Container>
    )
    }
}

export default Login;