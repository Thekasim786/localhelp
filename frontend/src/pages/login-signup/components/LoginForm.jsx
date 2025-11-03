import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import { useAuth } from '../../../contexts/AuthContext';

const LoginForm = ({ userRole }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Select correct endpoint
      const apiUrl =
        userRole === 'provider'
          ? 'http://localhost:3000/api/auth/provider-login'
          : 'http://localhost:3000/api/auth/customer-login';

      // Make POST request
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({
          general: data.message || 'Invalid credentials, please try again.',
        });
        setIsLoading(false);
        return;
      }

      // Save user info or token
      localStorage.setItem('user', JSON.stringify(data.user || data));
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      // Update auth context
      login({
        email: data.user?.email || formData.email,
        name: data.user?.name || 'User',
        role: userRole,
      });

      // Redirect based on role
      if (userRole === 'customer') {
        navigate('/customer-dashboard');
      } else {
        navigate('/service-provider-profile');
      }
    } catch (err) {
      console.error('❌ Login error:', err);
      setErrors({ general: 'Something went wrong. Please try again later.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert('Password reset link would be sent to your email address.');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.general && (
        <div className="p-3 bg-error/10 border border-error/20 rounded-md">
          <p className="text-sm text-error">{errors.general}</p>
        </div>
      )}

      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleInputChange}
        error={errors.email}
        required
      />

      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleInputChange}
        error={errors.password}
        required
      />

      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          name="rememberMe"
          checked={formData.rememberMe}
          onChange={handleInputChange}
        />

        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm text-primary hover:text-primary/80 transition-micro"
        >
          Forgot password?
        </button>
      </div>

      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        iconName="LogIn"
        iconPosition="left"
      >
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
