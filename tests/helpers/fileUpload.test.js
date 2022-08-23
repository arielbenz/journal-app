import fileUpload from "../../src/helpers/fileUpload"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
    cloud_name: 'abenz',
    api_key: '934222465239242',
    api_secret: 'KNFx6j9ujpRXk35JSrC1SlINTVw',
    secure: true
})

describe('Pruebas en fileUpload', () => {

    test('Debe subir el archivo correctamente a Cloudinary', async() => {

        const imageUrl = 'https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg'
        const response = await fetch(imageUrl)
        const blob = await response.blob()
        const file = new File([blob], 'foto.jpg')

        const url = await fileUpload(file)
        expect(typeof url).toBe('string')

        // Remove the image from Cloudinary
        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.jpg', '')

        const imagePath = `journal/${imageId}`;
        const respDelete = await cloudinary.api.delete_resources([imagePath])

        const expectedResp = { [imagePath] : 'deleted' }

        expect(respDelete.deleted).toStrictEqual(expectedResp)

    })

    test('Debe retornar un error de que no se pudo subir la imagen', async() => {

        const file = new File([], 'foto.jpg')
        await expect(fileUpload(file)).rejects.toThrow('No se pudo subir la imagen');
    })

    test('Debe retornar un error de que no hay un archivo seleccionado', async() => {
        await expect(fileUpload(null)).rejects.toThrow('No hay archivo seleccionado');
    })

})