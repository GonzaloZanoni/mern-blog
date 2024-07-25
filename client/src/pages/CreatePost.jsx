import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';


export default function CreatePost() {
    // const [editorHtml, setEditorHtml] = useState('');
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    // Se le agrega la galería
    const [gallery, setGallery] = useState([]);
    const [galleryFiles, setGalleryFiles] = useState([]);
    const [galleryUploadProgress, setGalleryUploadProgress] = useState([]);

    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const navigate = useNavigate();


    const handleUploadImage = async () => {
        try {
            if (!file) {
                setImageUploadError('Please select an image');
                return;
            }
            setImageUploadError(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                // eslint-disable-next-line no-unused-vars
                (error) => {
                    setImageUploadError('Image upload failed');
                    setImageUploadProgress(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUploadProgress(null);
                        setImageUploadError(null);
                        setFormData({ ...formData, image: downloadURL });
                        // setFormData({ ...formData, image: downloadURL }); 
                    });
                }
            );


        } catch (error) {
            setImageUploadError('Image upload failed');
            setImageUploadProgress(null);
            console.log(error)
        }
    };

    // funcion de la subida de imagenes de la galeria
    const handleUploadGallery = async () => {
        try {
            if (galleryFiles.length === 0) {
                setImageUploadError('Please select at least one image for the gallery');
                return;
            }
            if (galleryFiles.length > 10) {
                setImageUploadError('You can upload up to 10 images only.');
                return;
            }
            setImageUploadError(null);
            const storage = getStorage(app);
            const newGallery = [];
            const progressArray = [];

            for (let i = 0; i < galleryFiles.length; i++) {
                const fileName = new Date().getTime() + '-' + galleryFiles[i].name;
                const storageRef = ref(storage, fileName);
                const uploadTask = uploadBytesResumable(storageRef, galleryFiles[i]);

                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        progressArray[i] = progress.toFixed(0);
                        setGalleryUploadProgress([...progressArray]);
                    },
                    // eslint-disable-next-line no-unused-vars
                    (error) => {
                        setImageUploadError('Gallery image upload failed');
                        setGalleryUploadProgress([]);
                    },
                    async () => {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        newGallery.push(downloadURL);
                        if (newGallery.length === galleryFiles.length) {
                            setGallery(newGallery); // Asegúrate de que el estado gallery se actualiza correctamente
                            setGalleryUploadProgress([]);
                            setImageUploadError(null);
                        }
                    }
                );
            }
        } catch (error) {
            setImageUploadError('Gallery image upload failed');
            setGalleryUploadProgress([]);
            console.log(error);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/post/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, gallery }), // Include gallery in the request body
            });
            const data = await res.json();
            if (!res.ok) {
                setPublishError(data.message);
                return;
            }

            if (res.ok) {
                setPublishError(null);
                navigate(`/post/${data.slug}`);
            }
        } catch (error) {
            setPublishError('Something went wrong');
            console.log(error);
        }
    };


    // toolbar text editor
    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ 'size': [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link'],
            ['clean']
        ],
    };

    return (

        <div className="p-3 max-w-3xl mx-auto min-h-screen mb-28">
            <h1 className="text-center text-3xl my-7 font-semibold">Crear un Post</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 sm:flex-row justify-between">
                    <TextInput
                        type="text"
                        placeholder="Escribe un Título"
                        required id="title"
                        className="flex-1"
                        onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                        }
                    />
                    <Select
                        onChange={(e) =>
                            setFormData({ ...formData, category: e.target.value })
                        }
                    >
                        <option value='uncategorized'>Seleccionar categoría</option>
                        <option value='Primer-grado'>1er Grado</option>
                        <option value='Segundo-grado'>2do Grado</option>
                        <option value='Tercer-grado'>3er Grado</option>
                        <option value='Cuarto-grado'>4to Grado</option>
                        <option value='Quinto-grado'>5to Grado</option>
                        <option value='Sexto-grado'>6to Grado</option>
                        <option value='Artistica' className="font-bold text-orange-500">Artística</option>
                        <option value='Ciencias' className="font-bold text-orange-500">Ciencias</option>
                        <option value='Programacion' className="font-bold text-orange-500">Programación</option>
                        <option value='Ingles'>Inglés</option>
                        <option value='Educacion-fisica'>Educación Física</option>
                        <option value='Artes-visuales'>Artes Visuales</option>
                        <option value='Musica'>Música</option>
                        <option value='uncategorized'>Sin-categoria</option>
                    </Select>
                </div>
                <h2 className="font-bold text-xl mt-5 sm:mt-5">Imagen de portada</h2>
                <div className="flex gap-4 items-center justify-between border-2 border-grey-500 p-3">
                    <FileInput
                        typeof="file"
                        accept='image/*'
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <Button
                        type='button'
                        gradientDuoTone='greenToBlue'
                        size='sm'
                        outline
                        onClick={handleUploadImage}
                        disabled={imageUploadProgress}
                    >
                        {
                            imageUploadProgress ? (
                                <div className="w-16 h-16">
                                    <CircularProgressbar
                                        value={imageUploadProgress}
                                        text={`${imageUploadProgress || 0}%`}
                                    />
                                </div>
                            ) : (
                                'Cargar Imagen'
                            )
                        }
                    </Button>
                </div>
                {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
                {formData.image && (
                    <img
                        src={formData.image}
                        alt="upload"
                        className="w-full h-72 object-cover"
                    />
                )}
                <ReactQuill
                    theme='snow'
                    placeholder="Escribe algo..."
                    className="h-72 mb-12"
                    required
                    // value={editorHtml} 
                    modules={modules}
                    // onChange={setEditorHtml}
                    onChange={
                        (value) => {
                            setFormData({ ...formData, content: value })
                        }
                    }
                />
                {/* <ReactQuill
                    theme="snow"
                    value={editorHtml}
                    onChange={setEditorHtml}
                    modules={{
                        toolbar: {
                            container: [
                                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                [{ 'size': [] }],
                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                [{ 'list': 'ordered' }, { 'list': 'bullet' },
                                { 'indent': '-1' }, { 'indent': '+1' }],
                                ['link', 'image'],
                                ['clean']
                            ],
                            handlers: {
                                'image': handleUploadImage
                            }
                        }
                    }}
                /> */}

                {/* PARTE GALERIA */}
                <h2 className="font-bold text-xl mt-14 sm:mt-5">Galeria de imagenes</h2>
                <h4 className="font-semibold text-sm">Solamente puedes subir hasta 10 imágenes.</h4>
                <div className="flex flex-col gap-4   items-center justify-between border-2 border-grey-500 p-3">
                    <div className="flex justify-between lg:gap-20 gap-5 w-full">
                        <FileInput
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => setGalleryFiles(Array.from(e.target.files))}
                            className="rounded-lg sm:w-1/2"
                        // onChange={(e) => {
                        //     const files = Array.from(e.target.files);
                        //     if (files.length > 10) {
                        //         setImageUploadError('You can upload up to 10 images only.');
                        //         return;
                        //     }
                        //     setGalleryFiles(files);
                        // }}
                        />
                        <Button
                            type='button'
                            gradientDuoTone='greenToBlue'
                            size='sm'
                            outline
                            onClick={handleUploadGallery}
                            disabled={galleryUploadProgress.length > 0}
                            className="w-1/3"
                        >
                            {galleryUploadProgress.length > 0 ? (
                                <div className="w-16 h-16">
                                    <CircularProgressbar
                                        value={galleryUploadProgress.reduce((a, b) => a + b, 0) / galleryUploadProgress.length}
                                        text={`${Math.round(galleryUploadProgress.reduce((a, b) => a + b, 0) / galleryUploadProgress.length) || 0}%`}
                                    />
                                </div>
                            ) : (
                                'Cargar Imagenes'
                            )}
                        </Button>
                    </div>
                    {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
                    {gallery.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {gallery.map((url, index) => (
                                <img
                                    key={index}
                                    src={url}
                                    alt={`Gallery Image ${index + 1}`}
                                    className="w-full h-40 object-cover"
                                />
                            ))}
                        </div>
                    )}

                </div>
                <Button type="submit" gradientDuoTone='purpleToBlue' className="mt-10 mb-10">Publicar</Button>
                {/* {
                    imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>
                } */}

                {
                    publishError && <Alert className="m-5" color='failure'>{publishError}</Alert>
                }
            </form>
        </div>

    )
}
