import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiUser } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import { useSelector } from 'react-redux';

export default function DashSidebar() {
    const location = useLocation()
    const [tab, setTab] = useState('')
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')
        // console.log(tabFromUrl);
        if (tabFromUrl) {
            setTab(tabFromUrl)
        }
    }, [location.search]);

    const handleSignout = async () => {
        try {
            const res = await fetch('/api/user/signout', {
                method: 'POST',
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                dispatch(signoutSuccess());
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const getUserLabel = () => {
        if (currentUser.isAdmin) return 'Admin';
        if (currentUser.isEmployed) return 'Docente';
        return 'User';
    };

    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup className='flex flex-col gap-1'>
                    <Link to='/dashboard?tab=profile'>
                        <Sidebar.Item
                            active={tab === 'profile'}
                            icon={HiUser}
                            label={getUserLabel()}
                            labelColor='dark'
                            as='div'>
                            Perfil
                        </Sidebar.Item>
                    </Link>
                    {(currentUser.isAdmin || currentUser.isEmployed) && (

                        <Link to='/dashboard?tab=posts'>
                            <Sidebar.Item
                                active={tab === 'posts'}
                                icon={HiDocumentText}
                                as='div'>
                                Posts
                            </Sidebar.Item>
                        </Link>
                    )}
                    {currentUser.isAdmin && (

                        <Link to='/dashboard?tab=users'>
                            <Sidebar.Item
                                active={tab === 'users'}
                                icon={HiOutlineUserGroup}
                                as='div'>
                                Usuarios
                            </Sidebar.Item>
                        </Link>
                    )}
                    <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignout}>
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}
