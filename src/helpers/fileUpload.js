const fileUpload = async( file ) => {

    if (!file) {
        throw new Error('No hay archivo seleccionado')
    }

    const cloudUrl = 'https://api.cloudinary.com/v1_1/abenz/upload'

    const formData = new FormData();
    formData.append('upload_preset', 'react-journal')
    formData.append('file', file)

    try {
        const response = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        })

        if (!response.ok) {
            throw new Error('No se pudo subir la imagen')
        }

        const result = await response.json()
        return result.secure_url;

    } catch (error) {
        throw new Error(error.message)
    }

}

export default fileUpload
