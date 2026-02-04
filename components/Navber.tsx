"use client"
import React, {useState} from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {User} from 'next-auth'

const Navber = () => {
    const {data:session}= useSession();
    const router=useRouter();
    const user = session?.user as User | undefined;
    const [open, setOpen] = useState(false);

    const handleSignOut = async () => {
      await signOut({redirect:false});
      router.replace('/signin');
    }

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href={`/dashboard`} className="text-xl font-semibold text-gray-800">Aura Messenger</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4 transition-all delay-300">
            <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>

            {session?.user ? (
              <>
                <span className="text-gray-700">Hello, {user?.username ?? user?.name ?? 'User'}</span>
                <button onClick={handleSignOut} className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">Sign out</button>
              </>
            ) : (
              <button onClick={()=>router.push('/dashboard')} className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer">Sign in</button>
            )}
          </div>

          <div className="md:hidden">
            <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100" onClick={()=>setOpen(!open)} aria-expanded={open}>
              <span className="sr-only">Open menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-100 md:size-0 size-full transition-all delay-100000">
          <div className="px-4 py-3 space-y-1">
            <Link href="/" className="block text-gray-700 py-2">Home</Link>
            <Link href="/about" className="block text-gray-700 py-2">About</Link>
            {session?.user ? (
              <div className="flex flex-col space-y-2">
                <span className="text-gray-700">Hello, {user?.username ?? user?.name ?? 'User'}</span>
                <button onClick={handleSignOut} className="w-full px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer">Sign out</button>
              </div>
            ) : (
              <button onClick={()=>{setOpen(false); router.push('/signin');}} className="w-full px-3 py-2 bg-blue-600 text-white rounded-md">Sign in</button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navber
