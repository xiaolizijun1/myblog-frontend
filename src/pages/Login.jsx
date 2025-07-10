import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        try {
            const res = await axios.post('http://127.0.0.1:8000/api/login/', {
                username,
                password
            })

            localStorage.setItem('token', res.data.token)
            navigate('/')
        } catch (err) {
            console.error('登录失败', err)
            setError('用户名或密码错误')
        }
    }

    return (
        <div className="max-w-sm mx-auto mt-10">
            <h2 className="text-xl font-bold mb-4">🔐 登录</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="用户名"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                />
                <input
                    type="password"
                    placeholder="密码"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">登录</button>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>
        </div>
    )
}

export default Login
