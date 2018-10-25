import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";

class Login extends Component {
    state = {
        location: ""
    };

    render() {
    return (
        <Container fluid>
            <Jumbotron>
                <h1>86D</h1>
            </Jumbotron>
        </Container>
    )
    }
}

export default Login;