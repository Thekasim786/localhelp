import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import AuthToggle from './components/AuthToggle';
import RoleToggle from './components/RoleToggle';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

const LoginSignup = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [userRole, setUserRole] = useState('customer');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      
      // Redirect to appropriate dashboard
      if (userData?.role === 'customer') {
        navigate('/customer-dashboard');
      } else {
        navigate('/service-provider-profile');
      }
    }
  }, [navigate]);

  const handleAuthToggle = (loginMode) => {
    setIsLogin(loginMode);
  };

  const handleRoleChange = (role) => {
    setUserRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={handleLogout} />
      
      <main className="pt-16 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header Section */}
          <div className="text-center">
            <Link to="/landing-page" className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-micro mb-6">
              <Icon name="ArrowLeft" size={20} />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
            
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Icon name="Home" size={24} color="white" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome to NukkadHelp
            </h1>
            <p className="text-muted-foreground">
              {isLogin 
                ? 'Sign in to your account to continue' :'Create your account to get started'
              }
            </p>
          </div>

          {/* Auth Form Card */}
          <div className="bg-card rounded-lg shadow-card border border-border p-6 sm:p-8">
            <AuthToggle isLogin={isLogin} onToggle={handleAuthToggle} />
            
            {!isLogin && (
              <RoleToggle userRole={userRole} onRoleChange={handleRoleChange} />
            )}

            {isLogin ? (
              <LoginForm userRole={userRole} />
            ) : (
              <SignupForm userRole={userRole} />
            )}
          </div>

          {/* Additional Links */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 text-primary hover:text-primary/80 font-medium transition-micro"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
            
            <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-micro">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-foreground transition-micro">Terms of Service</a>
              <span>•</span>
              <a href="#" className="hover:text-foreground transition-micro">Help</a>
            </div>
          </div>
        </div>
      </main>

      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default LoginSignup;