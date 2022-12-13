import React, {useState} from 'react';
import {Button, Card, Form, Stack} from "react-bootstrap";
import {FaCaretDown, FaCaretUp, FaArrowCircleDown} from "react-icons/fa";



const AddPost = ({onAdd, showAdd, toggleShow, getOGData}) => {
    const [title, setTitle] = useState("")
    const [url, setUrl] = useState("")
    const [body, setBody] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()

        if (title === "" && url === "" && body === "") {
            alert("At least one field required.")
            return
        }

        onAdd({title, url, body})

        setTitle("")
        setUrl("")
        setBody("")

    }

    const autoFillClicked = async () => {
        let og_data = await getOGData(url)
        setTitle(og_data.title)
        setBody(og_data.body)

    }

    return (
        <Card className="p-2 m-2 text-light bg-dark" >
            <h6 className="card-header" onClick={toggleShow}>
                Add New
                {showAdd ? <FaCaretDown/> : <FaCaretUp/>}
            </h6>

            { showAdd &&
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3">
                        <Stack direction="horizontal" gap={3}>
                            <Form.Control
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="URL"
                            />
                            <FaArrowCircleDown
                                onClick={() => autoFillClicked()}
                                placeholder="Autofill"
                                size="2em"
                            />

                        </Stack>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            as="textarea"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            cols="100"
                            rows="5"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <div><Button type="submit" className="btn-secondary">Submit</Button></div>
                    </Form.Group>
                </Form>
            }
        </Card>
    );
};

export default AddPost;
