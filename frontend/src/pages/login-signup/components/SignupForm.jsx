import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SignupForm = ({ userRole }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    serviceCategories: [],
    experience: '',
    address: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const serviceOptions = [
    { value: 'electrician', label: 'Electrician' },
    { value: 'plumber', label: 'Plumber' },
    { value: 'cleaner', label: 'House Cleaning' },
    { value: 'maid', label: 'Maid Service' },
    { value: 'carpenter', label: 'Carpenter' },
    { value: 'painter', label: 'Painter' },
    { value: 'gardener', label: 'Gardening' },
    { value: 'mechanic', label: 'Mechanic' }
  ];

  const experienceOptions = [
    { value: '1-2', label: '1-2 years' },
    { value: '3-5', label: '3-5 years' },
    { value: '6-10', label: '6-10 years' },
    { value: '10+', label: '10+ years' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/?.test(formData?.phone?.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (userRole === 'provider') {
      if (!formData?.businessName?.trim()) {
        newErrors.businessName = 'Business name is required';
      }
      
      if (!formData?.serviceCategories?.length) {
        newErrors.serviceCategories = 'Please select at least one service category';
      }
      
      if (!formData?.experience) {
        newErrors.experience = 'Experience level is required';
      }
    }
    
    if (!formData?.address?.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors)?.length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Successful signup
      const userData = {
        id: Date.now(),
        email: formData?.email,
        name: `${formData?.firstName} ${formData?.lastName}`,
        role: userRole,
        phone: formData?.phone,
        address: formData?.address,
        ...(userRole === 'provider' && {
          businessName: formData?.businessName,
          serviceCategories: formData?.serviceCategories,
          experience: formData?.experience
        })
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      
      if (userRole === 'customer') {
        navigate('/customer-dashboard');
      } else {
        navigate('/service-provider-profile');
      }
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          type="text"
          name="firstName"
          placeholder="Enter your first name"
          value={formData?.firstName}
          onChange={handleInputChange}
          error={errors?.firstName}
          required
        />

        <Input
          label="Last Name"
          type="text"
          name="lastName"
          placeholder="Enter your last name"
          value={formData?.lastName}
          onChange={handleInputChange}
          error={errors?.lastName}
          required
        />
      </div>
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData?.email}
        onChange={handleInputChange}
        error={errors?.email}
        required
      />
      <Input
        label="Phone Number"
        type="tel"
        name="phone"
        placeholder="Enter your phone number"
        value={formData?.phone}
        onChange={handleInputChange}
        error={errors?.phone}
        required
      />
      {userRole === 'provider' && (
        <>
          <Input
            label="Business Name"
            type="text"
            name="businessName"
            placeholder="Enter your business name"
            value={formData?.businessName}
            onChange={handleInputChange}
            error={errors?.businessName}
            required
          />

          <Select
            label="Service Categories"
            description="Select the services you provide"
            multiple
            searchable
            clearable
            options={serviceOptions}
            value={formData?.serviceCategories}
            onChange={(value) => handleSelectChange('serviceCategories', value)}
            error={errors?.serviceCategories}
            placeholder="Choose service categories"
          />

          <Select
            label="Experience Level"
            options={experienceOptions}
            value={formData?.experience}
            onChange={(value) => handleSelectChange('experience', value)}
            error={errors?.experience}
            placeholder="Select your experience level"
          />
        </>
      )}
      <Input
        label="Address"
        type="text"
        name="address"
        placeholder="Enter your address"
        value={formData?.address}
        onChange={handleInputChange}
        error={errors?.address}
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Create a password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          required
        />

        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData?.confirmPassword}
          onChange={handleInputChange}
          error={errors?.confirmPassword}
          required
        />
      </div>
      <Checkbox
        label="I agree to the Terms of Service and Privacy Policy"
        name="agreeToTerms"
        checked={formData?.agreeToTerms}
        onChange={handleInputChange}
        error={errors?.agreeToTerms}
        required
      />
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        iconName="UserPlus"
        iconPosition="left"
      >
        Create Account
      </Button>
    </form>
  );
};

export default SignupForm;