'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function page() {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/movie/view`)
            .then(res => {
                setMovies(res.data.data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="px-4 py-6">

            <div>
                <h2 className="text-xl font-semibold text-white mb-4">
                    Browse Movies
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                    {movies.length > 0 ? (
                        movies.map(movie => (
                            <Link key={movie._id} href={`/movie/${movie._id}`}>

                                <div className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200">
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/movie/${movie.poster}`}
                                        alt={movie.title}
                                        className="h-52 w-full object-cover"
                                    />
                                    <div className="p-3">
                                        <h2 className="text-white font-medium text-sm truncate">
                                            {movie.title}
                                        </h2>
                                        <p className="text-gray-400 text-xs mt-1">
                                            {movie.year}
                                        </p>
                                    </div>
                                </div>

                            </Link>
                        ))
                    ) : (
                        <p className="text-gray-400 col-span-full text-center">
                            No movies found
                        </p>
                    )}
                </div>

            </div>

        </div>
    )
}
