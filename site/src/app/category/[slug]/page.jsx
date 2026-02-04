'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'

export default function CategoryPage() {
    const { slug } = useParams()
    const [movies, setMovies] = useState([])

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/movie/view`)
            .then(res => {
                const filtered = res.data.data.filter(
                    movie => movie.category?._id === slug
                )
                setMovies(filtered)
            })
            .catch(err => console.log(err))
    }, [slug])

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-white mb-6">
                Movies
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {movies.length > 0 ? (
                    movies.map(movie => (

                        <Link key={movie._id} href={`/movie/${movie._id}`}>

                            <div className="bg-gray-800 rounded-lg overflow-hidden">
                                <img
                                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/movie/${movie.poster}`}
                                    alt={movie.title}
                                    className="h-48 w-full object-cover"
                                />
                                <div className="p-2">
                                    <h2 className="text-white font-semibold text-sm">
                                        {movie.title}
                                    </h2>
                                    <p className="text-gray-400 text-xs">
                                        {movie.year}
                                    </p>
                                </div>
                            </div>

                        </Link>
                    ))
                ) : (
                    <p className="text-gray-400 col-span-full">
                        No movies found
                    </p>
                )}
            </div>
        </div>
    )
}
