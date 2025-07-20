import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { setBookings, setHotelWishList } from '../../features/appSlice'
import { logout } from '../../features/authSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
    AiOutlineHeart,
    AiOutlineUser,
    AiOutlineWallet,
    BiBed,
    GiEarthAsiaOceania,
    HiUser,
    MdOutlineAttractions,
    RiSuitcaseLine,
    VscSignOut
} from '../../utils/icons'
import { Button } from '../core'

const Header = () => {
    const router = useRouter()
    const { user } = useAppSelector((state: any) => state.persistedReducer.auth)
    const dispatch = useAppDispatch()

    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)

    const handleLogout = async () => {
        dispatch(logout())
        dispatch(setHotelWishList([]))
        dispatch(setBookings([]))
        toast.success('User logged out...')
        await router.push('/auth')
        setDropdownOpen(false)
    }

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev)
    }

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const accountMenu = [
        { icon: <AiOutlineUser />, name: 'Manage account', link: '/user' },
        { icon: <RiSuitcaseLine />, name: 'Bookings & Trips', link: '/user/booking' },
        { icon: <AiOutlineWallet />, name: 'Reward & Wallet', link: '/' },
        { icon: <AiOutlineHeart />, name: 'Saved', link: '/user/wishlist' }
    ]

    const menu = [
        { icon: <BiBed />, name: 'Stays', link: '/' },
        { icon: <GiEarthAsiaOceania />, name: 'Hotel', link: '/' },
        { icon: <MdOutlineAttractions />, name: 'Attractions', link: '/' },
    ]

    return (
        <header className="w-full bg-primary text-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 lg:px-6 py-3 flex items-center gap-4 flex-wrap">
                {/* Logo */}
                <Link href="/">
                    <span className="text-2xl font-bold tracking-wide cursor-pointer whitespace-nowrap">Booking</span>
                </Link>

                {/* Navigation menu */}
                <nav className="flex-1 hidden sm:flex justify-center">
                    <ul className="flex gap-x-6">
                        {menu.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.link}
                                    className="flex items-center gap-2 py-2 px-3 rounded-full hover:bg-white hover:bg-opacity-20 transition whitespace-nowrap"
                                >
                                    {item.icon}
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* CTA & User Account */}
                <div className="flex items-center gap-4 flex-wrap">
                    <Link href="/join">
                        <Button
                            text="List your property"
                            textColor="text-white"
                            bgColor="bg-transparent border border-white"
                        />
                    </Link>

                    {user ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center gap-2 px-3 py-1 rounded hover:bg-white hover:bg-opacity-20 transition"
                            >
                                <div className="w-8 h-8 border-2 border-orange-500 rounded-full flex items-center justify-center overflow-hidden text-orange-500">
                                    <HiUser size={20} />
                                </div>
                                <span className="hidden md:inline text-white whitespace-nowrap">Your Account</span>
                            </button>

                            {dropdownOpen && (
                                <ul className="absolute right-0 mt-2 w-56 bg-white text-black rounded-md shadow-lg py-2 z-50">
                                    {accountMenu.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.link}
                                                onClick={() => setDropdownOpen(false)}
                                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                                            >
                                                {item.icon}
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="flex w-full items-center gap-2 px-4 py-2 hover:bg-gray-100"
                                        >
                                            <VscSignOut />
                                            <span>Sign out</span>
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </div>
                    ) : (
                        <Link href="/auth">
                            <Button text="Sign In" textColor="text-primary" bgColor="bg-white" />
                        </Link>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
