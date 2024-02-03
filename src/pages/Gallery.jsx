import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCards } from '../actions/gallery'

const Gallery = () => {

  const [targetsA, settargetsA] = useState([])

  useEffect(() => {
    const fetchTargets = async () => {
      const res = await getCards()
      settargetsA(res)
    }
    fetchTargets()
  }, [])
  

  return (
    <main className='flex  bg-[#f2f2f2] select-none flex-col p-6 justify-between'>
      <section className=' max-w-header'>
        <div className='px-4 flex '>
          <p className='text-black text-2xl text-center w-full font-bold py-1 px-2 rounded-xl'>Choose your favorite </p>
        </div>
        <div className='home-sv-a  '>
          {targetsA && targetsA.map((x, index) => {
            return (
              <Link key={index} className='rounded-xl shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]' to={`/capitulos/${index}`}>
                <div style={{backgroundColor: x.color}} className={`p-2  flex flex-col min-h-60  `}>
                  <img
                    width={150}
                    className="hover-filter-a w-full  rounded-xl object-fill  "
                    src={x.logoUrl}
                    alt="logourl"
                  />
                  <img
                    width={150}
                    className="hover-filter-a w-full  rounded-xl object-fill  "
                    src={x.patternUrl}
                    alt="patternurl"
                  />

                </div>
                <div className='flex text-black items-center gap-x-2 px-2 '>
                  <p className="text-small-semibold   p-4">
                    {x.title}
                  </p>
                </div>

              </Link>
            )
          })}
        </div>
      </section>

    </main>
  )
}

export default Gallery