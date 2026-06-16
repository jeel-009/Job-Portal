import { Dialog } from './ui/dialog'
import React, { useState } from 'react'
import { DialogContent, DialogTitle } from './ui/dialog'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from './ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '@/redux/store';
import axios from 'axios';
import { USER_API_END_POINT } from './utils/constant';
import { setLoading, setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function UpdateProfile({ open, setopen }) {
    const { user, loading } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const [input, setinput] = useState({
        fullname: user?.fullname,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        skills: user?.profile?.skills?.join(", "),
        bio: user?.profile?.bio,
        file: user?.profile?.resume
    });

    const changeEventHandler = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        setinput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills.split(",").map(skill => skill.trim()));
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: { "Content-Type": 'multipart/form-data' },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
        setopen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setopen}>
            <DialogContent className="w-[95vw] max-w-lg rounded-xl p-4 sm:p-6 max-h-[90vh] overflow-y-auto">

                <DialogTitle className="text-lg sm:text-xl font-bold">
                    Edit Profile
                </DialogTitle>

                <form onSubmit={submitHandler}>
                    <div className="space-y-4 mt-4">

                        <div className='space-y-1'>
                            <Label>Full Name</Label>
                            <Input
                                type="text"
                                name='fullname'
                                value={input.fullname || ""}
                                onChange={changeEventHandler}
                                placeholder="Enter your name"
                            />
                        </div>

                        <div className='space-y-1'>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name='email'
                                value={input.email || ""}
                                onChange={changeEventHandler}
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className='space-y-1'>
                            <Label>Phone Number</Label>
                            <Input
                                type="number"
                                name='phoneNumber'
                                value={input.phoneNumber || ""}
                                onChange={changeEventHandler}
                                placeholder="Enter your phone number"
                            />
                        </div>

                        <div className='space-y-1'>
                            <Label>Skills</Label>
                            <Input
                                type="text"
                                name='skills'
                                value={input.skills || ""}
                                onChange={changeEventHandler}
                                placeholder="React, Node.js, MongoDB"
                            />
                        </div>

                        <div className='space-y-1'>
                            <Label>Bio</Label>
                            <Input
                                type="text"
                                name='bio'
                                value={input.bio || ""}
                                onChange={changeEventHandler}
                                placeholder="Add a bio"
                            />
                        </div>

                        <div className='space-y-1'>
                            <Label>Resume</Label>
                            <Input
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer"
                            />
                        </div>
                    </div>

                    {loading ? (
                        <Button disabled className="w-full mt-5">
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            Please Wait...
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full mt-5">
                            Update Profile
                        </Button>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    )
}