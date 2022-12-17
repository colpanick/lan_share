import {useEffect, useState} from 'react'
import React from 'react';
import {Button, Card, Form} from "react-bootstrap";



const Configuration = ({settings, sendConfigUpdate}) => {
    const [ogAPI, setOgAPI] = useState([])

    let allSettings = {}


    useEffect(() => {
        const getAllSettings = async () => {
            allSettings = await settings()
        }
        const populateConfigForm = async () => {
            await getAllSettings()
            setOgAPI(allSettings[0].value)
        }
        populateConfigForm()
    },[])

    const updateConfig = async (e) => {
        e.preventDefault()
        let newOgApiKey = {
            "id": 1,
            "value": ogAPI
        }

        let res = await sendConfigUpdate(newOgApiKey.id,newOgApiKey)
    }

    return (
        <Card className="p-2 m-2 text-light bg-dark" >
            <Form onSubmit={updateConfig}>
                <Form.Group className="mb-3">
                    <h5>Opengraph API</h5>
                    <Form.Control
                        type="text"
                        placeholder="App ID"
                        value={ogAPI}
                        onChange={(e) => setOgAPI(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Button type="submit" className="btn-secondary">Update</Button>
                </Form.Group>
            </Form>
        </Card>
    )
}

export default Configuration