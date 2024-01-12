import { proxy } from 'valtio'

const state = proxy({
    intro: true,
    color: '#fed1e0',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: './test3.png',
    fullDecal: './pattern2.jpg'
})

export default state;