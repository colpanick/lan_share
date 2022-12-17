import {useState} from 'react'
import React from 'react';
import Modal from 'react-bootstrap/Modal'
import {FaWrench} from "react-icons/fa";
import {Button, Container} from "react-bootstrap";
import Configuration from "./Configuration";

const ConfigurationModal = ({settings, sendConfigUpdate}) => {

    const [showConfig, setShowConfig] = useState(false)


    return (
        <Container className="p-0 m-0">
            <Button variant="secondary" className="ms-auto py-0 px-1 icon" id="settings-button" onClick={() => setShowConfig(true)}>
                            <FaWrench className="text-dark" />
            </Button>
            <Modal show={showConfig} onHide={() => setShowConfig(false)} variant="dark" className="shadow ">
                <Modal.Header>
                    <Modal.Title>LAN Share Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Configuration settings={settings} sendConfigUpdate={sendConfigUpdate}/>
                </Modal.Body>
            </Modal>
        </Container>
    )
    }

export default ConfigurationModal