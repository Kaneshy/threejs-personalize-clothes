import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TargetbyId } from '../actions/gallery'
import CanvasModelTest from '../canvas/indexTest'

const Test = () => {
  const { id } = useParams()
  const [data, setdata] = useState({})

  useEffect(() => {
    const fetchTarget = async () => {
      const res = await TargetbyId({
        id: id
      })
      setdata(res)
    }
    fetchTarget()
  }, [])

  // show tab content depending on the activeTab



  console.log(id)
  return (
    <main className='relative'>
      <div className='h-screen  '>
        <CanvasModelTest />
        <div className='  p-4 top-0 absolute left-0   '>
          <div className={`p-2 w-full  rounded-xl gap-6 bg-white flex flex-col `}>

            <section>
              <h1 className='text-center font-bold'>New Proyect</h1>
              <div className='flex flex-col gap-y-1'>
                <span className='text-small-regular'>385 purchased in the last 7 days</span>
                <h1 className='text-heading2-bold'>New Proyect</h1>
                <p className='t text-heading3-bold'>$10</p>
              </div>
              <div className='flex flex-col gap-y-2 mb-4'>
                <span className='f text-body-semibold'>Select Size</span>
                <div className='flex gap-2'>
                  <p className='p-2 bg-neutral-400 text-white'>XS</p>
                  <p className='p-2 bg-neutral-400 text-white'>S</p>
                  <p className='p-2 bg-neutral-400 text-white'>M</p>
                  <p className='p-2 bg-neutral-400 text-white'>L</p>
                  <p className='p-2 bg-neutral-400 text-white'>XL</p>
                </div>
              </div>
              <div className='flex flex-col gap-4'>
                <p className='text-small-regular '>4 interest-free payments of $37.50 with klama</p>
                <button className='w-full rounded-xl p-2 text-white bg-black'>Add to bag</button>
                <button className='w-full rounded-xl p-2 border border-black'>Add to Wishlist</button>

              </div>
              <div className='mt-6 flex flex-col gap-y-4'>
                <span>Faster Shipping options may be available</span>
                <h1>More About the Product:</h1>
                <p>More About the ProductMore About the Product</p>
              </div>
            </section>


            <img
              width={500}
              className=" rounded-xl w-full object-fill  "
              src={data.logoUrl}
              alt="logourl"
            />
            <img
              width={100}
              className=" w-full  rounded-xl object-fill  "
              src={data.patternUrl}
              alt="patternurl"
            />
          </div>
        </div>
      </div >
      <div>

      </div>

    </main >
  )
}

export default Test

