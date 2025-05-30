import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { data, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_ENT_POINT } from '@/utils/constant'
import { toast } from 'sonner'





const Login = () => {

    const navigate = useNavigate();

    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });

    const changeEventHandler = (e) => {

        setInput({ ...input, [e.target.name]: e.target.value });

    }

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${USER_API_ENT_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });

            if (res.data.success) {
                navigate("/");
                toast.success(res.data.message);
            }

            console.log('Login successful:', data);
        } catch (error) {
          console.error('Login error:', error.response?.data || error.message);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Singup</h1>

                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="email@gmail.com" />
                    </div>

                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="password" />
                    </div>

                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-2">
                            <div className="flex items-center space-x-2">

                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role == 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2"> Student</Label>
                            </div>
                            <div className="flex items-center gap-4 my-5">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role == 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2"> Recruiter</Label>

                            </div>
                        </RadioGroup>

                    </div>

                    <Button type="submit" className="w-full my-4">Login</Button>
                    <span className='text-sm'>Don't have an account? <Link to="/singup" className='text-blue-600'>Singup</Link> </span>

                </form>
            </div>
        </div>
    )
}

export default Login