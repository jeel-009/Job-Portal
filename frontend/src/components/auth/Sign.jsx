import React, { useEffect, useState } from 'react'
import { Navbar } from '../shared/Navbar'
import { Input } from '../ui/input'
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

export default function Sign() {
  const [input, setinput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: ''
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector(store => store.auth);

  const changeEventHandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  }

  const fileHandler = (e) => {
    setinput({ ...input, file: e.target.files?.[0] });
  }

  const submitInput = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('password', input.password);
    formData.append('role', input.role);
    if (input.file) {
      formData.append('file', input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
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
      <div className="min-h-screen flex items-center justify-center px-4 py-10">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-md p-6 sm:p-8">

          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 text-center">Sign Up</h2>
          <p className="text-sm text-gray-500 mb-4 text-center">Create Your Account</p>

          <form className="space-y-4" onSubmit={submitInput}>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <Input
                type="text"
                name='fullname'
                placeholder="Enter your full name"
                className="w-full"
                value={input.fullname}
                onChange={changeEventHandler}
              />
            </div>

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
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <Input
                type="text"
                name='phoneNumber'
                placeholder="Enter your phone number"
                className="w-full"
                value={input.phoneNumber}
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

            {/* Profile Photo */}
            <div>
              <label htmlFor="profile" className="block text-sm font-medium text-gray-700 mb-1">
                Profile Photo
              </label>
              <Input
                id="profile"
                accept="image/*"
                type="file"
                onChange={fileHandler}
                className="w-full cursor-pointer"
              />
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
                Create Account
              </button>
            )}

            <p className="text-center text-sm text-gray-500">
              Already have an account?{' '}
              <a href="/Log" className="text-blue-600 hover:underline font-medium">Log in</a>
            </p>

          </form>
        </div>
      </div>
    </>
  )
}