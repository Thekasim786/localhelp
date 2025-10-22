import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    services: [
      { name: "Electricians", href: "/customer-dashboard?category=electricians" },
      { name: "Plumbers", href: "/customer-dashboard?category=plumbers" },
      { name: "House Maids", href: "/customer-dashboard?category=maids" },
      { name: "Cleaners", href: "/customer-dashboard?category=cleaners" },
      { name: "Gardeners", href: "/customer-dashboard?category=gardeners" },
      { name: "Painters", href: "/customer-dashboard?category=painters" }
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "How It Works", href: "/how-it-works" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Blog", href: "/blog" }
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Us", href: "/contact" },
      { name: "Safety Guidelines", href: "/safety" },
      { name: "Provider Guidelines", href: "/provider-guidelines" },
      { name: "Report Issue", href: "/report" }
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Refund Policy", href: "/refunds" }
    ]
  };

  const socialLinks = [
    { name: "Facebook", icon: "Facebook", href: "https://facebook.com/nukkadhelp" },
    { name: "Twitter", icon: "Twitter", href: "https://twitter.com/nukkadhelp" },
    { name: "Instagram", icon: "Instagram", href: "https://instagram.com/nukkadhelp" },
    { name: "LinkedIn", icon: "Linkedin", href: "https://linkedin.com/company/nukkadhelp" }
  ];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/landing-page" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <Icon name="Home" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold">NukkadHelp</span>
            </Link>
            <p className="text-slate-300 text-sm mb-4 leading-relaxed">
              Connecting you with trusted local service providers for all your home needs. Quality services within your neighborhood.
            </p>
            <div className="flex space-x-4">
              {socialLinks?.map((social) => (
                <a
                  key={social?.name}
                  href={social?.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors duration-200"
                  aria-label={social?.name}
                >
                  <Icon name={social?.icon} size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks?.services?.map((link) => (
                <li key={link?.name}>
                  <Link
                    to={link?.href}
                    className="text-slate-300 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link?.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks?.company?.map((link) => (
                <li key={link?.name}>
                  <a
                    href={link?.href}
                    className="text-slate-300 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link?.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks?.support?.map((link) => (
                <li key={link?.name}>
                  <a
                    href={link?.href}
                    className="text-slate-300 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link?.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks?.legal?.map((link) => (
                <li key={link?.name}>
                  <a
                    href={link?.href}
                    className="text-slate-300 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link?.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-slate-700 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <Icon name="Phone" size={20} className="text-primary" />
              <div>
                <div className="text-sm font-medium">Call Us</div>
                <div className="text-slate-300 text-sm">+1 (555) 123-4567</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="Mail" size={20} className="text-primary" />
              <div>
                <div className="text-sm font-medium">Email Us</div>
                <div className="text-slate-300 text-sm">support@nukkadhelp.com</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="MapPin" size={20} className="text-primary" />
              <div>
                <div className="text-sm font-medium">Service Area</div>
                <div className="text-slate-300 text-sm">10km radius coverage</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-slate-400 text-sm mb-4 md:mb-0">
            © {currentYear} NukkadHelp. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <Icon name="Shield" size={16} className="text-success" />
              SSL Secured
            </span>
            <span className="flex items-center gap-2">
              <Icon name="CheckCircle" size={16} className="text-primary" />
              Verified Platform
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;