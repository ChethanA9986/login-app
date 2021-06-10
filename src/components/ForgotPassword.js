import React, { useState } from "react";
import { Button, Form, Col, Row } from 'react-bootstrap';
import './../App.css';

function ForgotPassword(props) {
    const [phoneNo, setPhoneNo] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [disbleFlag, setDisbleFlag] = useState(true);
    const [isValidPhoneNo, setIsValidPhoneNo] = useState(true);
    const [isValidNewPassword, setIsValidNewPassword] = useState(true);
    const [errorFlag, setErrorFlag] = useState(false);
    const [errormsg, setErrorMsg] = useState();

    const handlePhoneNo = (event) => {
        setPhoneNo(event.target.value)
        if (event.target.value.length === 10 && newPassword.length >= 5) {
            setDisbleFlag(false);
            setIsValidPhoneNo(true)
        }
        else {
            setDisbleFlag(true);
            setIsValidPhoneNo(false)
        }
        if (event.target.value.length != 10) {
            setIsValidPhoneNo(false)
        }
        else {
            setIsValidPhoneNo(true);
        }
    };
    const handleNewPassword = (event) => {
        setNewPassword(event.target.value)
        if (event.target.value.length >= 5 && phoneNo.length === 10) {
            setDisbleFlag(false);
            setIsValidNewPassword(true)
        }
        else {
            setDisbleFlag(true);
            setIsValidNewPassword(false)
        }
        if (event.target.value.length < 5) {
            setIsValidNewPassword(false)
        }
        else {
            setIsValidNewPassword(true);
        }
    }
    const handleSubmitClick = async (event) => {
        // event.preventDefault();
        console.log("est")
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
            const index = userList.findIndex(o => o.phoneNo === phoneNo)
            const indexedItem = { ...userList[index] };
            indexedItem.password = newPassword;
            userList.splice(index, 1, indexedItem);
            localStorage.setItem("userList", JSON.stringify(userList));
            alert("Password updated")
        }


    }
    return (
        <div class="page-content contact-page-content-area padding-120">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="righti-content-area">
                            <div class="contact-page-form-wrap login-page">
                                <h2 class="title">Forgot Password</h2>
                                <form class="contact-page-form" novalidate="novalidate" enctype="multipart/form-data">
                                    <div class="row justify-content-center">
                                        <div class="col-lg-8">

                                            <Form.Group as={Row}>
                                                <Form.Label className="control-label" as="legend" column sm={3}>
                                                    Phone Number</Form.Label>
                                                <Col >
                                                    <input type="number"
                                                        placeholder="Phone NO" className="form-control" required="" autoComplete="off"
                                                        aria-required="true"
                                                        value={phoneNo}
                                                        onChange={handlePhoneNo}
                                                    />
                                                    {!isValidPhoneNo && (<Form.Text className="text-muted">
                                                        Mobile Number must contain minimum 10 numbers .</Form.Text>)}
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="required">
                                                <Form.Label className="control-label" as="legend" column sm={3}>
                                                    New Password</Form.Label>
                                                <Col >
                                                    <input type="Password" name="Password" placeholder="Your New Password"
                                                        class="form-control" required="" autoComplete="off"
                                                        aria-required="true"
                                                        value={newPassword}
                                                        onChange={handleNewPassword}
                                                    />
                                                    {!isValidNewPassword && (<Form.Text className="text-muted">
                                                        Password must contain minimum 5 characters .</Form.Text>)}
                                                </Col>
                                            </Form.Group>

                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <Button className="submit-btn register-as-donor"
                                            onClick={handleSubmitClick}
                                            disabled={disbleFlag}>Update
                                </Button>
                                        {errorFlag && <Form.Text className="text-muted">
                                            {errormsg}</Form.Text>}
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
export default ForgotPassword;
