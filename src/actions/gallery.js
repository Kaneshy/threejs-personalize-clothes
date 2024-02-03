import axios from 'axios'

export const AddCard = async ({ logoUrl, patternUrl, color, title, desc, next }) => {

    const base64String = next

    // Extract the actual Base64-encoded content after the comma
    const base64Content = base64String.split(',')[1];

    // Decode the Base64 string to binary data
    const binaryData = atob(base64Content);

    // Convert the binary data to a Uint8Array
    const uint8Array = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
    }

    // Create a Blob from the Uint8Array
    const blob = new Blob([uint8Array], { type: 'image/jpeg' });
    console.log('dfd', blob)

    // Create an object URL for the Blob
    const imageUrl = URL.createObjectURL(blob);

    console.log(logoUrl, patternUrl, color, title, desc)
    try {
        const res = await axios.post('http://localhost:8080/api/gallery', {
            logoUrl, patternUrl, color, title, desc
        })
        console.log(res.data, res.status)
    } catch (error) {
        console.log(error)
    }
}

export const getCards = async () => {
    try {
        const res = await axios.get('http://localhost:8080/api/gallery')
        console.log('jjjjj', res.data, res.status)
        return res.data
    } catch (error) {
        console.log(error)
    }
}