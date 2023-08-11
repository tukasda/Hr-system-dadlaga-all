import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';
import swal from 'sweetalert';

function Login() {
    const [values, setValues] = useState({
        email: '',
        _password: ''
    });
    const [errors, setErrors] = useState({});
    const [loginError, setLoginError] = useState('');

    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);
        setLoginError('');

        if (Object.keys(validationErrors).length > 0) {
            return; // Don't proceed if there are validation errors
        }

        try {
            const response = await axios.post('http://localhost:5000/login', values);
            const { access_token } = response.data;
            localStorage.setItem('access_token', access_token);
            swal({
                title: 'Амжилттай нэвтэрлээ',
                text: '',
                button: 'Next!'
            });
            setTimeout(() => {
                window.location.href = '/dashboard/app';
            }, 2000);
        } catch (error) {
            if (error.response && error.response.data.error === 'Invalid credentials') {
                setLoginError('Имэйл эсвэл нууц үг буруу байна');
            } else {
                console.error('Login failed:', error);
            }
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-dark vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Нэвтрэх</h2>
                {loginError && <p className='text-danger'>{loginError}</p>}
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>И-мэйл</strong></label>
                        <input
                            type="email"
                            placeholder='Майлээ оруулна уу.'
                            name='email'
                            onChange={handleInput}
                            className='form-control rounded-0'
                        />
                        {errors.email && <span className='text-danger'> {errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="_password"><strong>Нууц үг</strong></label>
                        <input
                            type="password"
                            placeholder='Нууц үгээ оруулна уу.'
                            name='_password'
                            onChange={handleInput}
                            className='form-control rounded-0'
                        />
                        {errors._password && <span className='text-danger'> {errors._password}</span>}
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'><strong>Нэвтрэх</strong></button>
                    <p></p>
                    <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Бүртгүүлэх</Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
