import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export const Register = () => {

const [name,setName]=useState("")
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

const navigate=useNavigate()
const handleRegister=async(e)=>{
    e.preventDefault();
    const res=await axios.post("http://localhost:5000/api/auth/register",
    {name,email,password}
    );

    navigate("/");
}


    return (
    <>
    <div className='min-h-screen flex items-center justify-center'>
    <form className='bg-gray-800 p-6 rounded w-80' onSubmit={handleRegister}>
    <h2 className='text-xl mb-4 text-center'>Register</h2>
        <input 
            className='w-full p-2 mb-3 bg-gray-700 rounded'
            placeholder='Name'
            onChange={(e)=>setName(e.target.value)}
        />
         <input 
         type="email"
            className='w-full p-2 mb-3 bg-gray-700 rounded'
            placeholder='Email'
            onChange={(e)=>setEmail(e.target.value)}
        />
         <input 
         type="password"
            className='w-full p-2 mb-3 bg-gray-700 rounded'
            placeholder='Password'
            onChange={(e)=>setPassword(e.target.value)}
        />
        <button className='w-full bg-green-600 p-2 rounded'>Register</button>
    </form>

    </div>

    </>
  )
}
