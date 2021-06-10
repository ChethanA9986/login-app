import React, { useState } from "react";
import { Button, Form, Col, Row, Spinner, Nav, Card } from 'react-bootstrap';
import { useHistory } from "react-router";

const Login = (props) => {
    let history = useHistory();
    const [phoneNo, setPhoneNo] = useState("");
    const [password, setPassword] = useState("");
    const [isValidPhoneNo, setIsValidPhoneNo] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [disbleFlag, setDisbleFlag] = useState(true);
    const [errorFlag, setErrorFlag] = useState(false);
    const [errormsg, setErrorMsg] = useState();

    const handlePhoneNo = (event) => {
        setPhoneNo(event.target.value)
        if (event.target.value.length === 10 && password.length >= 5) {
            setDisbleFlag(false)
        }
        else {
            setDisbleFlag(true)
        }
        if (event.target.value.length != 10) {
            setIsValidPhoneNo(false)
        }
        else {
            setIsValidPhoneNo(true);
        }
    };

    const handlePassword = (event) => {
        setPassword(event.target.value)
        if (event.target.value.length >= 5 && phoneNo.length === 10) {
            setDisbleFlag(false)
        }
        else {
            setDisbleFlag(true)
        }
        if (event.target.value.length < 5) {
            setIsValidPassword(false)
        }
        else {
            setIsValidPassword(true);
        }
    };

    const handleSubmitClick = () => {
        const userList = JSON.parse(localStorage.getItem("userList"));
        if (!userList) {
            setErrorFlag(true)
            setErrorMsg("User Does not exist")
        }
        else if (!(userList.find(o => o.phoneNo === phoneNo))) {
            setErrorFlag(true)
            setErrorMsg("User Does not exist")
        }
        else {
            const user = userList.find(o => o.phoneNo === phoneNo)
            if (user.password != password) {
                setErrorFlag(true)
                setErrorMsg("Wrong paswword")
            }
            else {
                setErrorFlag(false)
                console.log(generateToken())
                alert("Login sucesss")
            }
        }
    }

    const generateToken = () => {
        const rand = () => Math.random(0).toString(36).substr(2);
        return (rand() + rand() + rand() + rand()).substr(0, 50)
    }

    return (
        <div class="page-content contact-page-content-area padding-120">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-6">
                        <div class="right-content-area">
                            <div class="contact-page-form-wrap login-page">
                                <h2 class="title">Login</h2>
                                <form method="post" className="contact-page-form"
                                    noValidate="novalidate" encType="multipart/form-data">
                                    <Form.Group as={Row} className="required">
                                        <Form.Label className="control-label" as="legend" column sm={3}>
                                            PhoneNo</Form.Label>
                                        <Col >
                                            <Form.Control type="number" placeholder="Phone No" value={phoneNo}
                                                class="form-control"
                                                onChange={handlePhoneNo}
                                            />
                                            {!isValidPhoneNo && (<Form.Text className="text-muted">
                                                Phone number should be 10 digits.</Form.Text>)}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="required">
                                        <Form.Label className="control-label" as="legend" column sm={3}>
                                            Password</Form.Label>
                                        <Col >
                                            <Form.Control type="text" placeholder="Password" value={password}
                                                class="form-control"
                                                onChange={handlePassword}
                                            />
                                            {!isValidPassword && (<Form.Text className="text-muted">
                                                Password must contain atlest 5 letters.</Form.Text>)}
                                        </Col>
                                    </Form.Group>

                                    <div className="form-group">
                                        <Button className="submit-btn register-as-donor"
                                            onClick={handleSubmitClick}
                                            disabled={disbleFlag}>Login
                                        </Button>
                                        {errorFlag && <Form.Text className="text-muted">
                                            {errormsg}</Form.Text>}
                                    </div>
                                    <div className="extra-links form-group">
                                        <Nav.Link onClick={() => { history.push("/forgotPassword") }}>Forgot Password ?</Nav.Link>
                                        <Nav.Link onClick={() => { history.push("/register") }}>Don&#039;t Have Account ?</Nav.Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
