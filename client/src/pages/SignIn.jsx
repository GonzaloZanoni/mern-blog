import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    signInStart,
    signInSuccess,
    signInFailure
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";


export default function SignIn() {
    const [formData, setFormData] = useState({});
    // const [errorMessage, setErrorMessage] = useState(null);
    // const [loading, setLoading] = useState(false);
    const { loading, error: errorMessage } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
    };
    // console.log(formData)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            // return setErrorMessage('Please fill out all fields')
            return dispatch(signInFailure('Please fill out all fields'))
        }
        try {
            // setLoading(true);
            // setErrorMessage(null);
            dispatch(signInStart());
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                // return setErrorMessage(data.message);
                dispatch(signInFailure(data.message));
            }
            // setLoading(false);
            if (res.ok) {
                dispatch(signInSuccess(data));
                navigate('/')
            }
        } catch (error) {
            dispatch(signInFailure(error.message))
            // setErrorMessage(error.message)
            // setLoading(false);
        }
    }
    return (
        <div className="min-h-screen mt-20">
            <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
                {/* left */}
                <div className="flex-1">
                    <Link
                        to='/'
                        className='font-bold dark:text-white text-4xl'
                    >
                        <span className='px-2 py-1 bg-gradient-to-r  from-green-500 via-green-500 to-green-700 rounded-lg text-white'>
                            Capitan
                        </span>
                        Blog
                    </Link>
                    <p className="text-sm mt-5">
                        This is a demo project. You can sign in with your email and password or with Google.
                    </p>
                </div>
                {/* right */}

                <div className="flex-1">
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

                        <div>
                            <Label value='Your email' />
                            <TextInput
                                type='email'
                                placeholder="name@gmail.com"
                                id='email'
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label value='Your password' />
                            <TextInput
                                type='password'
                                placeholder="*********"
                                id='password'
                                onChange={handleChange}
                            />
                        </div>
                        <Button gradientDuoTone='greenToBlue' type="submit" disabled={loading}>
                            {
                                loading ? (
                                    <>
                                        <Spinner size='sm' />
                                        <span className="pl-3">Loading...</span>
                                    </>
                                ) : 'Sign In'
                            }
                        </Button>
                        <OAuth />
                    </form>
                    <div className="flex gap-2 text-sm mt-5">
                        <span>Dont have an account </span>
                        <Link to='/sign-up' className="text-blue-600">Sign Up</Link>
                    </div>
                    {
                        errorMessage && (
                            <Alert className="mt-5" color='failure'>
                                {errorMessage}
                            </Alert>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
