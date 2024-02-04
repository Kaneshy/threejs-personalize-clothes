import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deletebyId, getCards } from '../actions/gallery'
import { FaTrash } from "react-icons/fa";


const Gallery = () => {

  const [targetsA, settargetsA] = useState([])

  const handleDelete = async (id) => {
    await deletebyId({
      id: id
    })
  }

  useEffect(() => {
    const fetchTargets = async () => {
      const res = await getCards()
      settargetsA(res)
    }
    fetchTargets()
  }, [])


  return (
    <main className='flex min-h-screen  bg-[#f2f2f2] select-none flex-col p-6 justify-between'>
      <section className=' '>
        <div className='px-4 flex '>
          <p className='text-black text-2xl text-center w-full font-bold py-1 px-2 rounded-xl'>Choose your favorite </p>
        </div>
        <div className='home-sv-a  '>
          {targetsA && targetsA.map((x, index) => {
            return (
              <section key={x._id} className='relative bg-white rounded-xl shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]'>
                <div className='absolute text-white text-opacity-50 py-1 px-2 rounded-full hover:text-red-900 top-4 right-4 z-20'>
                  <button onClick={() => { handleDelete(x._id) }}>
                    <FaTrash />
                  </button>
                </div>
                <Link to={`/Test/${x._id}`} className=' ' >
                  {/* <div  className={`p-2 rounded-t-xl  flex flex-col  `}>
                    <img
                      className=" max-h-96  rounded-xl object-contain  "
                      src={x.thumbnailUrl}
                      alt="patternurl"
                    />

                  </div> */}
                  <div style={{ backgroundColor: x.color }} className="rounded-t-xl flex max-h-52">
                    <img className="w-full rounded-2xl object-contain" src={x.thumbnailUrl} alt="" />
                  </div>

                  <div className='flex text-black items-center gap-x-2 px-2 '>
                    <p className="text-small-semibold   p-4">
                      {x.title}
                    </p>
                  </div>

                </Link>
              </section>

            )
          })}
        </div>

      </section>

    </main>
  )
}

export default Gallery