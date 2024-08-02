import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";

export default function UpdatePost() {
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        image: '',
        content: '',
    });
    const [publishError, setPublishError] = useState(null);
    const [gallery, setGallery] = useState([]);
    const [galleryFiles, setGalleryFiles] = useState([]);
    const [galleryUploadProgress, setGalleryUploadProgress] = useState([]);
    const { postId } = useParams();
    const { currentUser } = useSelector((state) => state.user);

    const navigate = useNavigate();

    useEffect(() => {
        try {
            const fetchPost = async () => {
                const res = await fetch(`/api/post/getposts?postId=${postId}`)
                const data = await res.json()
                if (!res.ok) {
                    console.log(data.message)
                    setPublishError(data.message);
                    return;
                }
                if (res.ok) {
                    setPublishError(null);
                    setFormData(data.posts[0]);
                    setGalleryFiles(data.posts[0].gallery || []);
                }
            }
            fetchPost();

        } catch (error) {
            console.log(error.message)
        }
    }, [postId]);

    // console.log(formData);
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
                    });
                }
            );
        } catch (error) {
            setImageUploadError('Image upload failed');
            setImageUploadProgress(null);
            console.log(error);
        }
    };

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
                            setGallery(newGallery);
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
            const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, gallery }),
            });
            const data = await res.json();
            if (!res.ok) {
                setPublishError(data.message)
                return;
            }

            if (res.ok) {
                setPublishError(null)
                navigate(`/post/${data.slug}`)
            }
        } catch (error) {
            setPublishError('Something went wrong');
        }
    }

    const handleRefresh = async () => {
        try {
            // Limpia los errores y las imágenes cargadas
            setImageUploadProgress(null);
            setImageUploadError(null);
            setGallery([]);
            setGalleryFiles([]);

            // Solicita los datos actualizados del post
            const res = await fetch(`/api/post/getposts?postId=${postId}`);
            const data = await res.json();
            if (!res.ok) {
                setPublishError(data.message);
                return;
            }
            setPublishError(null);
            setFormData({
                title: data.posts[0].title,
                category: data.posts[0].category,
                image: data.posts[0].image,
                content: data.posts[0].content,
            });
            setGallery(data.posts[0].gallery || []);
        } catch (error) {
            setPublishError('Failed to refresh post data');
        }
    };

    return (

        <div className="p-3 max-w-3xl mx-auto min-h-screen">
            <h1 className="text-center text-3xl my-7 font-semibold">Modificar el Post</h1>
            <form className="flex flex-col gap-4 mb-28 " onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 sm:flex-row justify-between">
                    <TextInput
                        type="text"
                        placeholder="Title"
                        required id="title"
                        className="flex-1"
                        onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                        }
                        value={formData.title}
                    />
                    <Select
                        onChange={(e) =>
                            setFormData({ ...formData, category: e.target.value })
                        }
                        value={formData.category}
                    >
                        <option value='uncategorized'>Seleccionar categoría</option>
                        <option value='Novedades'>Novedades</option>
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
                        // disabled={imageUploadProgress}
                        disabled={!file || imageUploadProgress !== null}
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
                    value={formData.content}
                    placeholder="Escribe algo..."
                    className="h-52 mb-12"
                    required
                    modules={{
                        toolbar: {
                            container: [
                                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                [{ 'size': [] }],
                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                [{ 'list': 'ordered' }, { 'list': 'bullet' },
                                { 'indent': '-1' }, { 'indent': '+1' }],
                                ['link'],
                                ['clean']
                            ],
                        }
                    }}
                    onChange={
                        (value) => {
                            setFormData({ ...formData, content: value })
                        }
                    }
                />
                <div className="flex flex-col gap-4">
                    <h2 className="font-bold text-xl mt-14 sm:mt-5">Galería de imágenes</h2>
                    <FileInput
                        typeof="file"
                        accept='image/*'
                        multiple
                        onChange={(e) => setGalleryFiles([...e.target.files])}
                    />
                    <Button
                        type='button'
                        gradientDuoTone='greenToBlue'
                        size='sm'
                        outline
                        onClick={handleUploadGallery}
                        disabled={galleryFiles.length === 0 || galleryUploadProgress.length > 0}
                    >
                        {
                            galleryUploadProgress.length > 0 ? (
                                galleryUploadProgress.map((progress, index) => (
                                    <div key={index} className="w-16 h-16">
                                        <CircularProgressbar
                                            value={progress}
                                            text={`${progress || 0}%`}
                                        />
                                    </div>
                                ))
                            ) : (
                                'Cargar Galería'
                            )
                        }
                    </Button>
                </div>
                <div className="flex flex-wrap gap-4 mt-4">
                    {gallery.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`gallery-${index}`}
                            className="w-32 h-32 object-cover"
                        />
                    ))}
                </div>
                {publishError && <Alert color='failure'>{publishError}</Alert>}
                {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
                <Button
                    type="submit"
                    gradientDuoTone="greenToBlue"
                    size="lg"
                >
                    Actualizar Post
                </Button>
                <Button
                    type="button"
                    gradientMonochrome="failure"
                    size="lg"
                    onClick={handleRefresh}
                >
                    Refrescar
                </Button>
            </form>
        </div>

    )
}
