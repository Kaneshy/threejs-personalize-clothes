import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className=' w-full bg-white font-bold flex justify-between p-4'>
            <section className='flex gap-14'>
                <Link className=' items-center justify-center flex' to='/' >Customize Pixel</Link>
                <div className='flex gap-8'>
                    <Link className='hover:bg-neutral-200 px-2 rounded-xl items-center justify-center flex' to='/' >Mockups</Link>
                    <Link className='hover:bg-neutral-200 px-2 rounded-xl items-center justify-center flex' to='/gallery' >Gallery</Link>
                    <Link  className='hover:bg-neutral-200 px-2 rounded-xl items-center justify-center flex'to='/' >Tools</Link>
                    <Link className='hover:bg-neutral-200 px-2 rounded-xl items-center justify-center flex' to='/' >More</Link>
                </div>
            </section>
            <div className=" hover:bg-white font-bold text-sm bg-neutral-200 rounded-lg py-2 px-4 z-10 top-20 right-5">
            <button>Log In</button>
          </div>
        </nav>
    )
}

export default Navbar