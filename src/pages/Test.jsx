import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TargetbyId } from '../actions/gallery'
import CanvasModelTest from '../canvas/indexTest'
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { downloadCanvas, downloadCanvasToImage, reader } from '../config/helpers';
import { useSnapshot } from 'valtio';
import state from '../store';
import CanvasModel from '../canvas';

const Test = () => {
  const snap = useSnapshot(state);
  console.log('bera', snap)
  const { id } = useParams()
  const [data, setdata] = useState({})
  const [file, setFile] = useState('');
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })

  useEffect(() => {
    const fetchTarget = async () => {
      const res = await TargetbyId({
        id: id
      })
      console.log('kk', res)
      setdata(res)
    }
    fetchTarget()
  }, [])

  const readFile = (type) => {
    reader(file)
      .then((result) => {
        handleDecals(type, result);
        setActiveEditorTab("");
      })
  }

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />
      case "filepicker":
        return <FilePicker
          file={file}
          setFile={setFile}
          readFile={readFile}
        />
      case "aipicker":
        return <AIPicker
          prompt={prompt}
          setPrompt={setPrompt}
          generatingImg={generatingImg}
          handleSubmit={handleSubmit}
        />
      default:
        return null;
    }
  }


  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    // after setting the state, activeFilterTab is updated

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  }

  // show tab content depending on the activeTab



  console.log(id)
  return (
    <main className='relative'>
      <div className='h-screen  '>
        <CanvasModel />

        <div className='absolute  p-4 top-0  left-0   '>
          <div className={`p-2 w-full  overflow-auto h-screen  rounded-xl gap-6 bg-white flex flex-col `}>

            <section className='p-4 flex flex-col gap-4'>
              <h1 className='text-center font-bold'>New Proyect</h1>
              <div className="flex items-center ">
                <div className="flex justify-around w-full tabs">
                  {EditorTabs.map((tab) => (
                    <Tab
                      key={tab.name}
                      tab={tab}
                      handleClick={() => setActiveEditorTab(tab.name)}
                    />
                  ))}

                  {generateTabContent()}
                </div>
              </div>
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

