'use client'
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {

  const [movies, setMovies] = useState([])

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/movie/view`)
      .then(res => {
        setMovies(res.data.data)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-6">

      <div className="max-w-4xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold mb-3">
          Popular Movies and TV Shows
        </h2>

        <p className="text-gray-400 text-sm w-2xl">
          Discover today's most-watched movies and TV shows available on Netflix,
          Prime Video, Hotstar, and more. Filter by genre and find
          what to watch next.
        </p>
      </div>

      {/* all Movie */}
      <div className="max-w-6xl mx-auto">

        <h2 className="text-lg font-semibold mb-5">
          Browse Movies
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {movies.length > 0 ? (
            movies.map(movie => (
              <Link key={movie._id} href={`/movie/${movie._id}`}>
                <div className="bg-gray-800 rounded-xl overflow-hidden hover:shadow-xl transition duration-200">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/movie/${movie.poster}`}
                    alt={movie.title}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-3">
                    <h2 className="font-medium text-sm line-clamp-1">
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
            <p className="text-gray-500 col-span-full text-center py-10">
              No movies available right now.
            </p>
          )}
        </div>
      </div>

    </div>

  );
}
