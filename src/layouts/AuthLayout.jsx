import React from 'react';
import RegistrationPage from '../pages/RegistrationPage';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default AuthLayout;