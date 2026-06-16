import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Link2, LogOut, Menu, User2, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '../utils/constant'
import { setUser } from '@/redux/authSlice'

export const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const HanlingLogout = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(null));
        navigate('/')
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message)
    }
  }

  const navLinks = user && user?.role === 'recruiter'
    ? [
        { label: 'Companies', to: '/admin/companies' },
        { label: 'Jobs', to: '/admin/jobs' },
      ]
    : [
        { label: 'Home', to: '/' },
        { label: 'Jobs', to: '/jobs' },
        { label: 'Browse', to: '/browse' },
      ];

  return (
    <>
      <div className="border-b shadow-sm bg-white">
        <div className="flex justify-between items-center max-w-7xl h-16 mx-auto px-4">

          {/* Logo */}
          <div>
            <h1 className="text-2xl font-bold">
              Jobs <span className="text-red-500">Portal</span>
            </h1>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 items-center">
            <ul className="flex gap-6 font-medium text-gray-700">
              {navLinks.map((link) => (
                <li key={link.to} className="cursor-pointer hover:text-red-500">
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>

            {!user ? (
              <div className="flex gap-3">
                <Link to="/Log">
                  <Button variant="destructive">Log In</Button>
                </Link>
                <Link to="/Sign">
                  <Button variant="outline">Sign Up</Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="h-10 w-10 cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                  </Avatar>
                </PopoverTrigger>

                <PopoverContent className="w-80">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{user?.fullname}</h3>
                      <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col items-start">
                    {user?.role === 'student' && (
                      <Button variant="link">
                        <User2 />
                        <Link to={'/profile'}>View Profile</Link>
                      </Button>
                    )}
                    <Button variant="link" onClick={HanlingLogout}>
                      <LogOut />
                      Log Out
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center gap-3">
            {user && (
              <Avatar className="h-9 w-9">
                <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
              </Avatar>
            )}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t px-4 pb-4 flex flex-col gap-3">
            <ul className="flex flex-col gap-3 font-medium text-gray-700 pt-3">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="block py-1 hover:text-red-500"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <hr />

            {!user ? (
              <div className="flex flex-col gap-2">
                <Link to="/Log" onClick={() => setMenuOpen(false)}>
                  <Button variant="destructive" className="w-full">Log In</Button>
                </Link>
                <Link to="/Sign" onClick={() => setMenuOpen(false)}>
                  <Button variant="outline" className="w-full">Sign Up</Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3 py-2">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{user?.fullname}</p>
                    <p className="text-xs text-gray-500">{user?.profile?.bio}</p>
                  </div>
                </div>

                {user?.role === 'student' && (
                  <Link to="/profile" onClick={() => setMenuOpen(false)}>
                    <Button variant="link" className="flex gap-2 px-0">
                      <User2 size={16} /> View Profile
                    </Button>
                  </Link>
                )}

                <Button
                  variant="link"
                  className="flex gap-2 px-0 text-red-500"
                  onClick={() => { HanlingLogout(); setMenuOpen(false); }}
                >
                  <LogOut size={16} /> Log Out
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}