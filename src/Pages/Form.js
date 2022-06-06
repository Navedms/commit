import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import YupPassword from 'yup-password'

import { postUserData } from '../Services/Features/userData/userDataSlice';

import '../Assets/Styles/form.css';

YupPassword(yup);

const schema = yup.object({
    user: yup.string().required().max(32),
    phoneNumber: yup.string().required().max(10),
    password: yup.string().required().min(6).max(12).minUppercase(1).minLowercase(1).minSymbols(1),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
}).required();

export default function Form() {

    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [formData, setFormData] = useState({
        user: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    });
    const [formSubmit, setFormSubmit] = useState(false);

    const handleOnChange = (event) => {
        let name = event.target.name;
        let updatedValue = {};
        updatedValue[name] = event.target.value;
        setFormData(formData => ({
            ...formData,
            ...updatedValue
        }));
    }

    const onSubmit = async (data) => {
        const response = await dispatch(postUserData(data));
        if (response.payload) {
            setFormSubmit(true);
            setFormData({
                user: '',
                phoneNumber: '',
                password: '',
                confirmPassword: ''
            });
        }
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-element">
                    <label>User Name</label>
                    <input
                        type="text"
                        placeholder="Enter your User Name"
                        value={formData.user}
                        {...register("user")}
                        onChange={handleOnChange}
                    />
                    <p className='error-msg'>{errors.user?.message}</p>
                </div>
                <div className="form-element">
                    <label>Phone Number</label>
                    <input
                        type="tel"
                        placeholder="Enter your Phone Number"
                        value={formData.phoneNumber}
                        {...register("phoneNumber")}
                        onChange={handleOnChange}
                    />
                    <p className='error-msg'>{errors.phoneNumber?.message}</p>
                </div>
                <div className="form-element">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        {...register("password")}
                        onChange={handleOnChange}
                    />
                    <p className='error-msg'>{errors.password?.message}</p>
                </div>
                <div className="form-element">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Just one more time..."
                        value={formData.confirmPassword}
                        {...register("confirmPassword")}
                        onChange={handleOnChange}
                    />
                    <p className='error-msg'>{errors.confirmPassword?.message}</p>
                </div>
                <button type="submit" className='btn submit-form-btn'>SUBMIT</button>
                <div className='form-submit'>
                    {formSubmit && <p className='form-submit-msg'>Your form has been successfully submitted!</p>}
                </div>
            </form>

        </div>
    );
}
