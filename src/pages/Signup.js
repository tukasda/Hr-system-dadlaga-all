import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Validation from './SignupValidationk'; 

function Signup() {

    const [values, setValues] = useState({
        last_name: '',
        first_name: '',
        email: '',
        age: '',
        sex: '',
        ID_number: '',
        location: '',
        profession: '',
        experience: '',
        skills: '',
        _password: '' 
    });

    const [errors, setErrors] = useState({});
    const [duplicateError, setDuplicateError] = useState(null);
    useEffect(() => {
        setErrors({});
        setDuplicateError(null);
    }, []);

    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues((prev) => ({ ...prev, [name]: value }));
        
        setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);
    
        if (Object.keys(validationErrors).length > 0) {
            return;
        }
    
        try {
            const dataToSend = { ...values, _password: values._password };
            await axios.post('http://localhost:5000/users', dataToSend);
            swal({
                title: "Амжилттай бүртгэгдлээ",
                text: "Санд амжилттай орлоо",
                button: "Next!"
            });
            setTimeout(() => {
                window.location.href = '/login';
            }, 3000);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const errorData = error.response.data;
                if (errorData.error === 'Email or ID_number already exists') {
                    setDuplicateError('Имэйл эсвэл регистрийн дугаар бүртгэлтэй байна');
                } else {
                    console.error('Sign-up failed:', error);
                }
            } else {
                console.error('Sign-up failed:', error);
            }
        }
    };

    
    return (
        <div className='d-flex justify-content-center align-items-center bg-dark '>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Бүртгүүлэх</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='last_name'><strong>Овог</strong></label>
                        <input
                            type='text'
                            placeholder='Овгоо оруулна уу.'
                            name='last_name'
                            onChange={handleInput}
                            className='form-control rounded-0'
                        />
                        {errors.last_name && <span className='text-danger'>{errors.last_name}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='first_name'><strong>Нэр</strong></label>
                        <input
                            type='text'
                            placeholder='Нэрээ оруулна уу.'
                            name='first_name'
                            onChange={handleInput}
                            className='form-control rounded-0'
                        />
                        {errors.first_name && <span className='text-danger'>{errors.first_name}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong>И-мэйл</strong></label>
                        <input
                            type='email'
                            placeholder='И-мэйл хаяг оруулна уу.'
                            name='email'
                            onChange={handleInput}
                            className='form-control rounded-0'
                        />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='age'><strong>Нас</strong></label>
                        <input
                            type='number'
                            placeholder='Насаа оруулна уу.'
                            name='age'
                            onChange={handleInput}
                            className='form-control rounded-0'
                        />
                        {errors.age && <span className='text-danger'>{errors.age}</span>}
                    </div>
                    <div className='mb-3'>
                    <label htmlFor='sex'><strong>Хүйс</strong></label>
                        <select
                        name='sex'
                        onChange={handleInput}
                        className='form-select rounded-0'
    >
                    <option value=''>Сонгох</option>
                    <option value='M'>Эрэгтэй</option> 
                    <option value='F'>Эмэгтэй</option> 
                    <option value='O'>Бусад</option>  
                    </select>
                        {errors.sex && <span className='text-danger'>{errors.sex}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='ID_number'><strong>Регистрийн дугаар</strong></label>
                        <input
                            type='text'
                            placeholder='Та регистрийн дугаараа оруулна уу.'
                            name='ID_number'
                            onChange={handleInput}
                            className='form-control rounded-0'
                        />
                        {errors.ID_number && <span className='text-danger'>{errors.ID_number}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='location'><strong>Байршил</strong></label>
                        <input
                            type='text'
                            placeholder='байршлаа оруулна уу.'
                            name='location'
                            onChange={handleInput}
                            className='form-control rounded-0'
                        />
                        {errors.location && <span className='text-danger'>{errors.location}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='profession'><strong>Мэргэжил</strong></label>
                        <input
                            type='text'
                            placeholder='Мэргэжлээ оруулна уу.'
                            name='profession'
                            onChange={handleInput}
                            className='form-control rounded-0'
                        />
                        {errors.profession && <span className='text-danger'>{errors.profession}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='experience'><strong>Туршлага</strong></label>
                        <input
                            type='text'
                            placeholder='Ажилласан туршлага'
                            name='experience'
                            onChange={handleInput}
                            className='form-control rounded-0'
                        />
                        {errors.experience && <span className='text-danger'>{errors.experience}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='skills'><strong>Чадвар</strong></label>
                        <input
                            type='text'
                            placeholder='Чадвар'
                            name='skills'
                            onChange={handleInput}
                            className='form-control rounded-0'
                        />
                        {errors.skills && <span className='text-danger'>{errors.skills}</span>}
                    </div>
                    <div className='mb-3'>
                    <label htmlFor='_password'><strong>Нууц үг</strong></label>
                    <input
                    type='password'  
                    placeholder='Нууц үгээ оруулна уу.'
                    name='_password'
                    onChange={handleInput}
                    className='form-control rounded-0'
                    />
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'><strong>Бүртгүүлэх</strong></button>
                    {duplicateError && (
                    <p className='text-danger' style={{ color: 'red' }}>
                        {duplicateError}
                    </p>
                )}
                    <p></p>
                    </form>
                    {Object.keys(errors).map((fieldName) => (
                    <span key={fieldName} className='text-danger'>
                        {errors[fieldName]}
                    </span>
                    ))}
                    <Link
                        to='/login'
                        className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'
                    >
                        Нэвтрэх
                    </Link>
            </div>
        </div>
    );
}

export default Signup;