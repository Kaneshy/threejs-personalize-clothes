import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from '../../firebase';

import config from '../config/config';
import state from '../store';
import { download } from '../assets';
import { downloadCanvas, downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components';
import { AddCard } from '../actions/gallery';
import { redirect } from "react-router-dom";

const Customizer = () => {
  const snap = useSnapshot(state);
  const [inputs, setInputs] = useState({});

  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [newInput, setNewInput] = useState([])
  const [testB, settestB] = useState(1)

  const [file, setFile] = useState('');
  const [isActive, setisActive] = useState(false)

  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })

  // show tab content depending on the activeTab
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

  const handleSubmit = async (type) => {
    if (!prompt) return alert("Please enter a prompt");

    try {
      setGeneratingImg(true);

      const response = await fetch('http://localhost:8080/api/v1/dalle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.photo) {
        throw new Error("Unexpected response format: missing photo");
      }

      handleDecals(type, `data:image/png;base64,${data.photo}`);


    } catch (error) {
      console.log('error', error)
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
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
  const handleChange = (type, file) => {
    console.log('dfd', type)
    console.log('runing', file)
    setNewInput((prev) => {
      return { ...prev, [type]: file };
    });
  };
  const readFile = (type) => {
    handleChange(type, file)
    reader(file)
      .then((result) => {
        handleDecals(type, result);
        setActiveEditorTab("");
      })
  }





  const handleData = async () => {
    console.log('handle data')
    await handlefirebasedata()
  };
  const handlefirebasedata = async () => {
    console.log('handle handlefirebasedata')
    const canvasUrl = await downloadCanvas()
    
    if (newInput.logo) {
      console.log('2')
      await uploadFile(newInput.logo, "imgUrl");
    }
    
    if (newInput.full) {
      console.log('3', inputs.length)
      await uploadFile(newInput.full, "imgFullUrl");
    }
    if (canvasUrl) {
      console.log('1')
      await uploadFile(canvasUrl, "canvasUrl");
    }


  }
  useEffect(() => {
    console.log('google', newInput, inputs)
    if(inputs.canvasUrl) {
      console.log('4', inputs)
      const handledataG = async () => {
    
        const res = await AddCard({
          next: snap.logoDecal,
          thumbnailUrl: inputs.canvasUrl,
          logoUrl: inputs.imgUrl || 'default',
          patternUrl: inputs.imgFullUrl || 'default',
          color: snap.color,
          title: 'New target',
          desc: 'set your description'
        });
        if(res===200) {
          return redirect('/Gallery')
        }
      }
      handledataG()
    }
  }, [inputs])
  


  const uploadFile = async (file, urlType) => {
    const storage = getStorage(app);
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };



  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation('left')}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
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
          </motion.div>

          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => state.intro = true}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>


          <div
            className="absolute hover:bg-white font-bold text-sm bg-neutral-200 rounded-lg py-2 px-4 z-10 top-20 right-5"
          >
            <button
              onClick={handleData}
              className=""
            >Save</button>
            <div className='hidden'>
              <canvas width="200" height="200"></canvas>
            </div>
          </div>

          <motion.div
            className='filtertabs-container'
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer