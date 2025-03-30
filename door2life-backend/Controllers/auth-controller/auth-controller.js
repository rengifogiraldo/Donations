import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateUser = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    password: '',
    referralCode: '',
    paymentMethod: 'manual',
    amount: 50,
    paymentStatus: 'completed'
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.phone || !formData.email || !formData.password || !formData.referralCode) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    try {
      // Mostrar datos enviados para depuración
      console.log('Sending data to backend:', formData);
      
      // Usar el endpoint de registro normal
      const response = await axios.post('/api/auth/register', formData);
      
      toast.success(response.data.successMessage || 'User created successfully');
      
      // Reset form
      setFormData({
        username: '',
        phone: '',
        email: '',
        password: '',
        referralCode: '',
        paymentMethod: 'manual',
        amount: 50,
        paymentStatus: 'completed'
      });
      
      // Redirigir después de un breve retraso
      setTimeout(() => {
        navigate('/admin/dashboard/getUser');
      }, 2000);
      
    } catch (error) {
      console.error('Error creating user:', error);
      const errorMessage = error.response?.data?.Error || 'Error creating user';
      toast.error(errorMessage);
      
      // Mostrar detalles adicionales del error para depuración
      console.log('Error details:', error.response?.data);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <ToastContainer />
      
      {/* Botón Atrás con el color verde específico */}
      <div className="mb-4">
        <button 
          onClick={() => navigate('/admin/dashboard')}
          className="px-4 py-2 bg-grassGreen text-black rounded-md hover:bg-green-400 transition font-medium"
        >
          {t('Back')}
        </button>
      </div>
      
      <h2 className="text-2xl font-bold mb-6 text-center">{t('Create New User')}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('Username')} *
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('Phone')} *
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('Email')} *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('Password')} *
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('Referral Code')} *
          </label>
          <input
            type="text"
            name="referralCode"
            value={formData.referralCode}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder={t('Enter the referral code of the inviting user')}
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            {t('The referral code must exist in the system. Example: 73n1ih')}
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('Payment Method')} *
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="manual"
                checked={formData.paymentMethod === 'manual'}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">{t('Manual Payment')}</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={formData.paymentMethod === 'paypal'}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">{t('PayPal')}</span>
            </label>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('Amount')}
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            min="1"
            step="1"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            {t('Default donation amount is $50')}
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('Payment Status')}
          </label>
          <select
            name="paymentStatus"
            value={formData.paymentStatus}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="completed">{t('Completed')}</option>
            <option value="pending">{t('Pending')}</option>
          </select>
        </div>
        
        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {t('Create User')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;