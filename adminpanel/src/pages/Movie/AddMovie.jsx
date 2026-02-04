import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddMovie() {

    let navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    let submithandler = (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append("title", event.target.title.value);
        formData.append("poster", event.target.poster.files[0]); // ✅ FILE
        // formData.append("category", event.target.category.value);
        formData.append("category", event.target.category.value);
        formData.append("year", event.target.year.value);

        axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/movie/add`, formData)
            .then((result) => {
                // navigate('/movie/view')
                toast.success(result.data.message)
                console.log(result.data)
            })
            .catch((error) => {
                toast.error("error")
            })

    }

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/category/view`)
            .then(res => setCategories(res.data.data));
    }, []);


    return (
        <div>

            <ToastContainer />

            <h2>AddMovie</h2>

            <form onSubmit={submithandler}>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                    <div className="sm:col-span-4">
                        <label htmlFor="title" className="block text-sm/6 font-medium text-white">
                            Title
                        </label>
                        <div className="mt-2">
                            <input
                                id="title"
                                name="title"
                                type="text"
                                autoComplete="given-name"
                                className="block w-full border rounded-md "
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-4">
                        <label htmlFor="poster" className="block text-sm/6 font-medium text-white">
                            Poster
                        </label>
                        <div className="mt-2">
                            <input
                                id="poster"
                                name="poster"
                                type="file"
                                autoComplete="given-name"
                                className="block w-full border rounded-md "
                            />
                        </div>
                    </div>

                    <select name="category" className="block w-full border rounded-md">
                        <option value="">Select Category</option>
                        {
                            categories.map(cat => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))
                        }
                    </select>


                    <div className="sm:col-span-4">
                        <label htmlFor="year" className="block text-sm/6 font-medium text-white">
                            year
                        </label>
                        <div className="mt-2">
                            <input
                                id="year"
                                name="year"
                                type="date"
                                autoComplete="given-name"
                                className="block w-full border rounded-md "
                            />
                        </div>
                    </div>

                </div>

                <button
                    type="submit"
                    className="rounded-md bg-indigo-500 px-6 py-2 my-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                    Save
                </button>

            </form>
        </div>
    )
}



