'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function page() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('access_token')
        console.log('TOKEN:', token)

        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                setUser(res.data.data)
            })
            .catch(err => console.log('PROFILE ERROR:', err))
    }, [])


    if (!user) return <div>Loading...</div>

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md w-80 text-white">
                <h1 className="text-xl font-semibold mb-4 text-center">
                    Profile
                </h1>

                <div className="space-y-2">
                    <p className="text-sm text-gray-400">Name</p>
                    <h2 className="text-lg font-medium">{user.name}</h2>

                    <p className="text-sm text-gray-400 mt-3">Email</p>
                    <p className="text-base">{user.email}</p>
                </div>
            </div>
        </div>
    )
}
