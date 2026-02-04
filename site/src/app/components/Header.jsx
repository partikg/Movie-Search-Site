'use client'

import { useEffect, useState } from 'react'
import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel
} from '@headlessui/react'
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import axios from 'axios'

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [categories, setCategories] = useState([])
    const [searchItem, setSearchItem] = useState('')
    const [filteredUsers, setFilteredUsers] = useState([])
    const [apiUsers, setApiUsers] = useState([])

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/category/view`)
            .then(res => setCategories(res.data.data))
            .catch(err => console.log(err))

        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/movie/view`)
            .then(response => response.json())
            .then(data => {
                setApiUsers(data.data)
                setFilteredUsers(data.data)
            })
            .catch(err => console.log(err))
    }, [])

    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm)

        const filteredItems = apiUsers.filter((user) =>
            user.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredUsers(filteredItems);
    }

    return (
        <header className="bg-gray-900 border border-gray-800 sticky top-0 z-50">

            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between h-12 px-4 lg:px-6">

                {/* logo */}
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Home</span>
                        <img
                            alt=""
                            src="movieslogo.avif"
                            className="h-10 w-24 rounded-xl"
                        />
                    </Link>
                </div>

                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>
                </div>

                <div className="hidden lg:flex items-center gap-x-6">

                    {/* Home */}
                    <Link href="/" className="flex items-center h-6 text-[13px] font-medium text-white hover:text-gray-300">
                        Home
                    </Link>

                    {/* movie */}
                    <Link href="/movie" className="flex items-center h-6 text-[13px] font-medium text-white hover:text-gray-300">
                        Browse
                    </Link>

                    {/* categories */}
                    <Disclosure as="div" className="relative">
                        {({ open }) => (
                            <>
                                <DisclosureButton className="flex items-center h-8  text-[12px] font-medium text-white hover:text-gray-300">
                                    Categories
                                    <ChevronDownIcon className={`ml-1 h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
                                </DisclosureButton>
                                <DisclosurePanel className="absolute top-full mt-1 w-44 rounded-md bg-gray-800 shadow-xl z-50">
                                    {categories.map(cat => (
                                        <Link
                                            key={cat._id}
                                            href={`/category/${cat._id}`}
                                            className="block px-3 py-1.5 text-[12px] text-white hover:bg-gray-700"
                                        >
                                            {cat.name}
                                        </Link>
                                    ))}
                                </DisclosurePanel>
                            </>
                        )}
                    </Disclosure>

                    {/* search */}
                    <div className="relative flex items-center">
                        <input
                            value={searchItem}
                            onChange={handleInputChange}
                            type="search"
                            placeholder="Search movies…"
                            className="h-7 w-52 rounded-md bg-gray-800 px-3 text-[12px] text-white placeholder-gray-400 outline-none ring-1 ring-gray-700 focus:ring-red-500"
                        />

                        {searchItem && (
                            <div className="absolute mt-28 w-64 rounded bg-gray-800 shadow-lg z-50">
                                {filteredUsers.length === 0 ? (
                                    <p className="p-2 text-sm text-gray-400">No movies found</p>
                                ) : (
                                    filteredUsers.map(user => (
                                        <Link
                                            key={user._id}
                                            href={`/movie/${user._id}`}
                                            className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                                        >
                                            {user.title}
                                        </Link>
                                    ))
                                )}
                            </div>
                        )}
                    </div>


                </div>

                {/* profile and login*/}
                <div className="hidden lg:flex lg:flex-1 justify-end items-center gap-x-4">
                    <Link
                        href="/profile"
                        className="flex items-center h-7 text-[13px] font-medium text-white hover:text-gray-300"
                    >
                        Profile
                    </Link>

                    <Link
                        href="/login"
                        className="flex items-center h-7 text-[13px] font-medium text-white hover:text-gray-300"
                    >
                        Login →
                    </Link>
                </div>

            </nav>



            {/* mobilemenu */}
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50" />

                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
                    <div className="flex items-center justify-between">

                        {/* logo */}
                        <div className="flex lg:flex-1">
                            <Link href="/" className="-m-1.5 p-1.5">
                                <span className="sr-only">Home</span>
                                <img
                                    alt=""
                                    src="movieslogo.avif"
                                    className="h-7 w-auto"
                                />
                            </Link>
                        </div>

                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-400"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-white/10">
                            <div className="space-y-2 py-6">

                                {/* movie */}
                                <Link href="/movie" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5">
                                    Browse
                                </Link>

                                {/* categories */}
                                <Disclosure as="div" className="relative">
                                    {({ open }) => (
                                        <>
                                            <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-[13px] font-medium text-white hover:bg-white/5">
                                                Categories
                                                <ChevronDownIcon className={`ml-1 h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
                                            </DisclosureButton>
                                            <DisclosurePanel className="mt-1 w-full rounded-md bg-gray-800 shadow-xl z-50">
                                                {categories.map(cat => (
                                                    <Link
                                                        key={cat._id}
                                                        href={`/category/${cat._id}`}
                                                        className="block px-3 py-1.5 text-[12px] text-white hover:bg-gray-700"
                                                    >
                                                        {cat.name}
                                                    </Link>
                                                ))}
                                            </DisclosurePanel>
                                        </>
                                    )}
                                </Disclosure>

                                {/* search */}
                                <div>
                                    <input
                                        value={searchItem}
                                        onChange={handleInputChange}
                                        type="search"
                                        placeholder="Search movies…"
                                        className="h-7 w-52 rounded-md bg-gray-800 px-3 text-[12px] text-white placeholder-gray-400 outline-none ring-1 ring-gray-700 focus:ring-red-500"
                                    />

                                    {searchItem && (
                                        <div className="absolute mt-2 w-64 rounded bg-gray-800 shadow-lg z-50">
                                            {filteredUsers.length === 0 ? (
                                                <p className="p-2 text-sm text-gray-400">No movies found</p>
                                            ) : (
                                                filteredUsers.map(user => (
                                                    <Link
                                                        key={user._id}
                                                        href={`/movie/${user._id}`}
                                                        className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                                                    >
                                                        {user.title}
                                                    </Link>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </div>

                            </div>

                            {/* profile and login */}
                            <div className="flex flex-col gap-2">
                                <Link href="/profile" className="block px-3 py-2 text-[12px] text-white hover:bg-gray-700">
                                    Profile
                                </Link>
                                <Link href="/login" className="block px-3 py-2 text-[12px] text-white hover:bg-gray-700">
                                    Login →
                                </Link>
                            </div>

                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}
