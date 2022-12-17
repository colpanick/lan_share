import {useEffect, useState} from 'react'
import './App.css';
import AddPost from "./components/AddPost";
import Posts from "./components/Posts";
import ConfigurationModal from "./components/ConfigurationModal";
import {Container, Navbar} from "react-bootstrap";
import LANshareImage from "./LANshare.png"



function App() {
    const JSON_SERVER = process.env.REACT_APP_API_URL || `${window.location.origin}/api`
    const [posts, setPosts] = useState([])
    const [showAdd, setShowAdd] = useState(true)



    // Populate with Posts pulled from API
    useEffect(() => {
        const getPosts = async () => {
            const PostsFromServer = await fetchPosts()
            setPosts(PostsFromServer)
        }
        getPosts()
    }, [])

    // Pull all Posts from API
    const fetchPosts = async () => {
        const res = await fetch(`${JSON_SERVER}/posts?_sort=id&_order=desc`)
        return await res.json()

    }

    const addPost = async (post) => {
        const res = await fetch(`${JSON_SERVER}/posts`,
            {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(post)
            })

        const data = await (res.json())

        setPosts([data, ...posts])
    }

    const deletePost = async (id) => {
        await fetch(`${JSON_SERVER}/posts/${id}`, {method: "DELETE"})
        setPosts(posts.filter((post) => post.id !== id))
    }

    const toggleShowAddNew = () => {
        setShowAdd(!showAdd)
    }


    const getSetting = async (id) => {
        let setting_request = await fetch(`${JSON_SERVER}/configuration/${id}`)
        return await setting_request.json()
    }

    const getAllSettings = async () => {
        let setting_request = await fetch(`${JSON_SERVER}/configuration`)
        return await setting_request.json()
    }

    const getOGDataFromOpengraphIo = async (url) => {
        let enc_url = encodeURIComponent(url)
        let app_id = await getSetting(1, "App ID")
        let og_request = await fetch("https://opengraph.io/api/1.1/site/" + enc_url + "?app_id=" + app_id.value)
        let og_data = await og_request.json()
        return {
            "title": og_data.hybridGraph.title,
            "body": og_data.hybridGraph.description
        }
    }

    const updateConfigValue = async (id, data) => {
        const url = `${JSON_SERVER}/configuration/${id}`
        const values = JSON.stringify(data)
        return await fetch(url, {
            method: 'PATCH',
            headers: {'Content-type': 'application/json'},
            body: values
        })
    }

    return (
    <Container fluid className="p-0 mb-4">

        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand><img src={LANshareImage}/></Navbar.Brand>
                <Navbar.Text>
                    <ConfigurationModal settings={getAllSettings} sendConfigUpdate={updateConfigValue}/>
                </Navbar.Text>

            </Container>
        </Navbar>
        <Container>
            <AddPost onAdd={addPost} showAdd={showAdd} toggleShow={toggleShowAddNew} getOGData={getOGDataFromOpengraphIo}/>
            <Posts posts={posts} onDelete={deletePost}/>
        </Container>

    </Container>
  );
}

export default App;
