import React, { useState } from 'react'
import loginImage from '/assets/image.jpg'
import bookHubLogo from '/assets/Group7731.png'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import './LoginPage.css'

function LoginPage() {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleUserName = (event) => {
    setUserName(event.target.value)
    setMessage('')
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
    setMessage('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userDetails = { username, password }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()

      if (response.ok) {
        Cookies.set('jwt_token', data.jwt_token, { expires: 7 })
        setMessage('Login successful!')
        navigate('/home')
      } else {
        setMessage(data.error_msg || 'Invalid username or password.')
      }
    } catch (error) {
      setMessage('Network error. Could not connect to the server.')
      console.error('Fetch error:', error)
    }
  }

  return (
    <div className="flex justify-between items-center h-screen m-0 image-container">
      <div className="flex justify-center">
        <img
          src={loginImage}
          alt="Login"
          className="h-screen w-[700px] object-cover"
        />
      </div>

      <div className="m-[100px] p-[50px] shadow-lg rounded-2xl bg-white ml-[200px] w-[500px]">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <div className="flex justify-center items-center">
            <img src={bookHubLogo} alt="BookHub" className="w-32" />
          </div>

          <div>
            <label className="text-[15px] text-lg font-semibold">USERNAME</label>
            <input
              placeholder="Enter the Username"
              value={username}
              type="text"
              onChange={handleUserName}
              className="w-full border rounded-md px-3 py-2 mt-2"
            />
          </div>

          <div>
            <label className="text-[15px] text-lg font-semibold">PASSWORD</label>
            <input
              placeholder="Enter Your Password"
              type="password"
              value={password}
              onChange={handlePassword}
              className="w-full border rounded-md px-3 py-2 mt-2"
            />
          </div>

          <p className="text-red-500">{message}</p>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
