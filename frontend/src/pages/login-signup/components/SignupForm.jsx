/*import React, { useState } from 'react';
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
  e.preventDefault();

  const newErrors = validateForm();
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setIsLoading(true);

  try {
    // 🟩 Prepare payload based on user role
    const payload =
      userRole === "provider"
        ? {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phoneNumber: formData.phone,
            password: formData.password,
            address: formData.address,
            businessName: formData.businessName,
            serviceCategories: formData.serviceCategories,
            experience: formData.experience,
          }
        : {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phoneNumber: formData.phone,
            
            address: formData.address,
            password: formData.password, 
          };

    // 🟩 Select correct endpoint
    const apiUrl =
      userRole === "provider"
        ? "http://localhost:3000/api/auth/provider-signup"
        : "http://localhost:3000/api/auth/customer-signup";

    // 🟩 Send request
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      // Backend returned error (e.g., user already exists)
      setErrors({ apiError: data.message || "Signup failed" });
      setIsLoading(false);
      return;
    }

    // 🟩 Successful signup
    alert(`${userRole === "provider" ? "Provider" : "Customer"} signup successful!`);

    // Store minimal user data locally if needed
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: formData.email,
        name: `${formData.firstName} ${formData.lastName}`,
        role: userRole,
      })
    );

    // 🟩 Navigate to correct page
    if (userRole === "customer") {
      navigate("/customer-dashboard");
    } else {
      navigate("/service-provider-profile");
    }
  } catch (error) {
    console.error("❌ Signup error:", error);
    setErrors({ apiError: "Something went wrong. Please try again later." });
  } finally {
    setIsLoading(false);
  }
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
*/

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Select from "../../../components/ui/Select";
import { Checkbox } from "../../../components/ui/Checkbox";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

// Beautiful Toast Component with Animation
const Toast = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const styles = {
    success: {
      gradient: "from-emerald-500 to-teal-600",
      iconBg: "bg-white/20",
      icon: <CheckCircle2 className="w-5 h-5" />,
    },
    error: {
      gradient: "from-rose-500 to-pink-600",
      iconBg: "bg-white/20",
      icon: <AlertCircle className="w-5 h-5" />,
    },
  };

  const currentStyle = styles[type];

  return (
    <div
      className={`fixed top-20 right-6 z-[9999] transition-all duration-300 transform ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-[400px] opacity-0"
      }`}
      style={{ maxWidth: "400px" }}
    >
      <div
        className={`bg-gradient-to-r ${currentStyle.gradient} text-white rounded-2xl shadow-2xl overflow-hidden`}
      >
        <div className="px-5 py-4 flex items-start gap-4">
          {/* Icon */}
          <div className={`${currentStyle.iconBg} rounded-full p-2 flex-shrink-0`}>
            {currentStyle.icon}
          </div>

          {/* Message */}
          <div className="flex-1 pt-1">
            <p className="text-sm font-medium leading-relaxed">{message}</p>
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="flex-shrink-0 hover:bg-white/20 rounded-lg p-1.5 transition-colors duration-200"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-white/20">
          <div
            className="h-full bg-white/40 animate-[shrink_5s_linear]"
            style={{
              animation: "shrink 5s linear forwards",
            }}
          />
        </div>
      </div>
    </div>
  );
};

// Add keyframes for progress bar animation
const style = document.createElement("style");
style.textContent = `
  @keyframes shrink {
    from { width: 100%; }
    to { width: 0%; }
  }
`;
if (!document.querySelector('style[data-toast-animations]')) {
  style.setAttribute('data-toast-animations', 'true');
  document.head.appendChild(style);
}

const SignupForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: "customer",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    serviceCategories: [],
    experience: "",
    address: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const serviceOptions = [
    { value: "electrician", label: "Electrician" },
    { value: "plumber", label: "Plumber" },
    { value: "cleaner", label: "House Cleaning" },
    { value: "maid", label: "Maid Service" },
    { value: "carpenter", label: "Carpenter" },
    { value: "painter", label: "Painter" },
    { value: "gardener", label: "Gardener" },
    { value: "mechanic", label: "Mechanic" },
  ];

  const experienceOptions = [
    { value: "1-2", label: "1-2 years" },
    { value: "3-5", label: "3-5 years" },
    { value: "6-10", label: "6-10 years" },
    { value: "10+", label: "10+ years" },
  ];

  // Show toast notification
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleRoleChange = (role) => {
    setFormData((prev) => ({ ...prev, role }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, "")))
      newErrors.phone = "Enter a valid 10-digit number";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Minimum 8 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (formData.role === "provider") {
      if (!formData.businessName.trim())
        newErrors.businessName = "Business name is required";
      if (!formData.serviceCategories.length)
        newErrors.serviceCategories = "Select at least one service";
      if (!formData.experience)
        newErrors.experience = "Experience level is required";
    }

    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.agreeToTerms)
      newErrors.agreeToTerms = "You must agree to the terms";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast("Please fix the errors in the form", "error");
      return;
    }

    setIsLoading(true);
    try {
      const payload =
        formData.role === "provider"
          ? {
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              phoneNumber: formData.phone,
              password: formData.password,
              address: formData.address,
              businessName: formData.businessName,
              serviceCategories: formData.serviceCategories,
              experience: formData.experience,
            }
          : {
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              phoneNumber: formData.phone,
              address: formData.address,
              password: formData.password,
            };

      const apiUrl =
        formData.role === "provider"
          ? "http://localhost:3000/api/auth/provider-signup"
          : "http://localhost:3000/api/auth/customer-signup";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        showToast(data.message || "Signup failed. Please try again.", "error");
        setIsLoading(false);
        return;
      }

      showToast(
        `🎉 Welcome aboard! Your ${formData.role === "provider" ? "provider" : "customer"} account has been created successfully.`,
        "success"
      );

      localStorage.setItem(
        "user",
        JSON.stringify({
          email: formData.email,
          name: `${formData.firstName} ${formData.lastName}`,
          role: formData.role,
        })
      );

      setTimeout(() => {
        navigate(
          formData.role === "customer"
            ? "/customer-dashboard"
            : "/service-provider-profile"
        );
      }, 1500);
    } catch (error) {
      console.error("❌ Signup error:", error);
      showToast("Something went wrong. Please try again later.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            error={errors.firstName}
            required
          />
          <Input
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            error={errors.lastName}
            required
          />
        </div>

        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          error={errors.phone}
          required
        />

        {/* Provider Fields */}
        {formData.role === "provider" && (
          <>
            <Input
              label="Business Name"
              name="businessName"
              value={formData.businessName}
              onChange={handleInputChange}
              error={errors.businessName}
            />

            <Select
              label="Service Categories"
              multiple
              options={serviceOptions}
              value={formData.serviceCategories}
              onChange={(value) => handleSelectChange("serviceCategories", value)}
              error={errors.serviceCategories}
            />

            <Select
              label="Experience Level"
              options={experienceOptions}
              value={formData.experience}
              onChange={(value) => handleSelectChange("experience", value)}
              error={errors.experience}
            />
          </>
        )}

        <Input
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          error={errors.address}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            required
          />
          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword}
            required
          />
        </div>

        <Checkbox
          label="I agree to the Terms of Service and Privacy Policy"
          name="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={handleInputChange}
          error={errors.agreeToTerms}
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
    </>
  );
};

export default SignupForm;
