import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';

export default function ViewMovie() {

    let [movie, setmovie] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/movie/view`)
            .then((success) => {
                // result.data.data = all movie
                console.log(success.data.data)
                setmovie(success.data.data);
            })
            .catch((error) => {
                toast.error("error " + error.message);
            })
    }, []);

    let singledelete = (movieid) => {
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/movie/delete/${movieid}`)
            .then((result) => {
                toast.success(result.data.message);
            })
            .catch((error) => {
                toast.error('something went wrong')
            });
    }

    return (
        <div>
            <ToastContainer />


            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">

                <thead>
                    <tr className="border-b">
                        <th className="p-2 text-left">index</th>
                        <th className="p-2 text-left">title</th>
                        <th className="p-2 text-left">poster</th>
                        <th className="p-2 text-left">category</th>
                        <th className="p-2 text-left">year</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        movie.map((data, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data.title}</td>
                                <td>
                                    <img src={data.poster} className="w-16 h-16" />
                                </td>
                                <td>{data.category?.name}</td>
                                <td>{data.year}</td>
                                <td><button onClick={() => singledelete(data._id)} className="px-4 py-1 bg-blue-500 text-white rounded">Delete</button></td>
                            </tr>
                        ))

                    }
                </tbody>

            </table>


        </div>
    )
}
