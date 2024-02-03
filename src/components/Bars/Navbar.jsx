import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className=' w-full bg-white flex justify-between p-4'>
            <section className='flex gap-14'>
                <Link to='/' className=''>Customize Pixel</Link>
                <div className='flex gap-8'>
                    <Link to='/' >Mockups</Link>
                    <Link to='/gallery' >Gallery</Link>
                    <Link to='/' >Tools</Link>
                    <Link to='/' >More</Link>
                </div>
            </section>
            <section>
                <div className=' bg-purple-800 text-white rounded-full py-1 px-2'>Login</div>
            </section>
        </nav>
    )
}

export default Navbar