import React, { useState } from "react";
import { Button, Form, Col, Row, Spinner, Nav, Card } from 'react-bootstrap';
import { useHistory } from "react-router";

const Register = (props) => {
    let history = useHistory();
    const [phoneNo, setPhoneNo] = useState("");
    const [password, setPassword] = useState("");
    const [isValidPhoneNo, setIsValidPhoneNo] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [disbleFlag, setDisbleFlag] = useState(true);
    const [errorFlag, setErrorFlag] = useState(false);


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
        if (userList != undefined) {
            if (userList.find(o => o.phoneNo === phoneNo)) {
                setErrorFlag(true)
            }
            else {
                userList.push({ "phoneNo": phoneNo, "password": password, "token": "" })
                console.log(userList)
                localStorage.setItem("userList", JSON.stringify(userList));
                setErrorFlag(false)
                alert("User registered")
            }
        }
        else {
            localStorage.setItem("userList", JSON.stringify([{ "phoneNo": phoneNo, "password": password, "token": "" }]))
            alert("User registered")
        }

    }

    return (
        <div class="page-content contact-page-content-area padding-120">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="righti-content-area">
                            <div class="contact-page-form-wrap login-page">
                                <h2 class="title">Register</h2>
                                <form class="contact-page-form" novalidate="novalidate" enctype="multipart/form-data">
                                    <div class="row justify-content-center">
                                        <div class="col-lg-8">

                                            <Form.Group as={Row} className="required">
                                                <Form.Label className="control-label" as="legend" column sm={3}>
                                                    PhoneNo</Form.Label>
                                                <Col >
                                                    <Form.Control type="number" placeholder="Phone NO" value={phoneNo}
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
                                                    disabled={disbleFlag}>Register
                                            </Button>
                                                {errorFlag && <Form.Text className="text-muted">
                                                    Phone number alread exist</Form.Text>}
                                            </div>
                                            <div className="extra-links form-group">
                                                <Nav.Link onClick={() => { history.push("/forgotPassword") }}>Forgot Password ?</Nav.Link>
                                            </div>

                                        </div>
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
export default Register;
