import React, { useEffect, useState } from 'react'
import { Navbar } from '../shared/Navbar'
import { Input } from '../ui/input'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { toast } from 'sonner';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

export default function Log() {
  const [input, setinput] = useState({
    email: '',
    password: '',
    role: ''
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector(store => store.auth);

  const changeEventHandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  }

  const submitInput = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        if (res.data.user.role === 'recruiter') {
          navigate('/admin/companies');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    if (user) navigate('/');
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-md p-6 sm:p-8">

          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 text-center">Login</h2>
          <p className="text-sm text-gray-500 mb-6 text-center">Welcome back!</p>

          <form className="space-y-4" onSubmit={submitInput}>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input
                type="email"
                name='email'
                placeholder="Enter your email"
                className="w-full"
                value={input.email}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <Input
                type="password"
                name='password'
                placeholder="Enter your password"
                className="w-full"
                value={input.password}
                onChange={changeEventHandler}
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <div className="flex gap-3 sm:gap-4">
                <label className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg border cursor-pointer transition-all flex-1 justify-center
                  ${input.role === 'student' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 text-gray-600'}`}>
                  <input
                    type="checkbox"
                    className="accent-blue-600"
                    checked={input.role === 'student'}
                    onChange={() => setinput({ ...input, role: 'student' })}
                  />
                  Student
                </label>

                <label className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg border cursor-pointer transition-all flex-1 justify-center
                  ${input.role === 'recruiter' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 text-gray-600'}`}>
                  <input
                    type="checkbox"
                    className="accent-blue-600"
                    checked={input.role === 'recruiter'}
                    onChange={() => setinput({ ...input, role: 'recruiter' })}
                  />
                  Recruiter
                </label>
              </div>
            </div>

            {loading ? (
              <button
                disabled
                className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg mt-2 flex items-center justify-center gap-2"
              >
                <Loader2 className="h-4 w-4 animate-spin" />
                Please Wait...
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors mt-2"
              >
                Login Account
              </button>
            )}

            <p className="text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <a href="/sign" className="text-blue-600 hover:underline font-medium">Sign Up</a>
            </p>

          </form>
        </div>
      </div>
    </>
  )
}