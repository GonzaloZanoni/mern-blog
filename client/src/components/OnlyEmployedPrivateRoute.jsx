import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function OnlyEmployedPrivateRoute() {
    const { currentUser } = useSelector(state => state.user);
    return currentUser && (currentUser.isAdmin || currentUser.isEmployed) ? (
        <Outlet />
    ) : (
        <Navigate to='/sign-in' />
    );
}
