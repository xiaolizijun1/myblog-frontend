import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

function NewPost() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [coverImage, setCoverImage] = useState(null)
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        if (!title || !content) {
            setError('标题和内容不能为空')
            return
        }

        const formData = new FormData()
        formData.append('title', title)
        formData.append('content', content)
        if (coverImage) {
            formData.append('cover_image', coverImage)
        }

        try {
            const res = await api.post('/posts/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            navigate(`/posts/${res.data.id}`)
        } catch (err) {
            console.error('创建文章失败', err)
            setError('提交失败，请重试')
        }
    }

    return (
        <div className="max-w-2xl mx-auto mt-6">
            <h2 className="text-xl font-bold mb-4">✍️ 写新文章</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="文章标题"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                />
                <textarea
                    placeholder="文章内容"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    rows={8}
                    className="w-full p-2 border rounded mb-2"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={e => setCoverImage(e.target.files[0])}
                    className="mb-4"
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    发布文章
                </button>
            </form>
        </div>
    )
}

export default NewPost
