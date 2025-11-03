import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navigationItems = [
    { label: 'Home', path: '/landing-page', authRequired: false },
    { label: 'Services', path: '/customer-dashboard', authRequired: true },
    { label: 'Sign In', path: '/login-signup', authRequired: false, hideWhenAuthenticated: true },
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const handleNavigation = (path, authRequired) => {
    if (authRequired && !user) {
      navigate('/login-signup');
      return;
    }
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const Logo = () => (
    <Link to="/landing-page" className="flex items-center space-x-3 hover:opacity-80 transition-micro group">
      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
        <Icon name="Home" size={22} color="white" />
      </div>
      <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
        NukkadHelp
      </span>
    </Link>
  );

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-indigo-100 z-100 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems?.map((item) => {
                if (item?.hideWhenAuthenticated && user) return null;
                
                return (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path, item?.authRequired)}
                    className={`text-sm font-semibold transition-all duration-200 hover:text-indigo-600 relative ${
                      isActivePath(item?.path) 
                        ? 'text-indigo-600' : 'text-gray-700'
                    }`}
                  >
                    {item?.label}
                    {isActivePath(item?.path) && (
                      <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                    )}
                  </button>
                );
              })}
              
              {user && (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/service-provider-profile"
                    className={`text-sm font-semibold transition-all duration-200 hover:text-indigo-600 relative ${
                      isActivePath('/service-provider-profile') 
                        ? 'text-indigo-600' : 'text-gray-700'
                    }`}
                  >
                    Profile
                    {isActivePath('/service-provider-profile') && (
                      <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                    )}
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    iconName="LogOut"
                    iconPosition="left"
                    iconSize={16}
                    className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300"
                  >
                    Sign Out
                  </Button>
                </div>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-xl text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>
      </header>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-200 md:hidden">
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed right-0 top-0 h-full w-80 max-w-sm bg-white/95 backdrop-blur-lg shadow-2xl transform transition-modal border-l border-indigo-100">
            <div className="flex items-center justify-between p-6 border-b border-indigo-100">
              <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Menu</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-xl text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
                aria-label="Close menu"
              >
                <Icon name="X" size={24} />
              </button>
            </div>
            
            <nav className="p-6 space-y-4">
              {navigationItems?.map((item) => {
                if (item?.hideWhenAuthenticated && user) return null;
                
                return (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path, item?.authRequired)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 ${
                      isActivePath(item?.path)
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                    }`}
                  >
                    {item?.label}
                  </button>
                );
              })}
              
              {user && (
                <>
                  <button
                    onClick={() => handleNavigation('/service-provider-profile', false)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 ${
                      isActivePath('/service-provider-profile')
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg' :'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                    }`}
                  >
                    Profile
                  </button>
                  
                  <div className="pt-4 border-t border-indigo-100">
                    <div className="px-4 py-2 text-sm text-gray-600">
                      Signed in as {user?.name || user?.email}
                    </div>
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={handleLogout}
                      iconName="LogOut"
                      iconPosition="left"
                      iconSize={16}
                      className="mt-3 border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300"
                    >
                      Sign Out
                    </Button>
                  </div>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;