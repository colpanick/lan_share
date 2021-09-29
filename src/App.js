import {useEffect, useState} from 'react'
import './App.css';
import AddPost from "./components/AddPost";
import Posts from "./components/Posts";
import {Container} from "react-bootstrap";

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

    const onAdd = async (post) => {
        const res = await fetch(`${JSON_SERVER}/posts`,
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(post)
            })

        const data = await (res.json())

        setPosts([data, ...posts])
    }

    const deleteTask = async (id) => {
        await fetch(`${JSON_SERVER}/posts/${id}`, {method: "DELETE"})
        setPosts(posts.filter((post) => post.id !== id))
    }

    const toggleShowAddNew = () => {
        setShowAdd(!showAdd)
    }

    return (
    <Container fluid className="p-0">
        <Container fluid className="p-4 text-light bg-dark">
            <h1>LAN Share</h1>
        </Container>
        <Container>
            <AddPost onAdd={onAdd} showAdd={showAdd} toggleShow={toggleShowAddNew}/>
            <Posts posts={posts} onDelete={deleteTask}/>
        </Container>

    </Container>
  );
}

export default App;
