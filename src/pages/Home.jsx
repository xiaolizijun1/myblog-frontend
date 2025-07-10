import { useEffect, useState } from 'react'
import api from '../api/axios'
import PostCard from '../components/PostCard'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        api.get('/posts/')
            .then(res => setPosts(res.data))
            .catch(err => console.error('Error fetching posts:', err))
    }, [])

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">📝 最新博客文章</h1>
            {posts.length === 0 ? (
                <p>暂无文章</p>
            ) : (
                posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))
            )}
        </div>
    )
}

export default Home
