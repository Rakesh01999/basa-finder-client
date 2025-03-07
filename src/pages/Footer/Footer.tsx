import React, { useState } from 'react';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPaperPlane,
  FaHome,
  FaUsers,
  FaQuestionCircle
} from "react-icons/fa";

// Color Theme
const colors = {
  primary: "#1E40AF", // Deep Blue
  secondary: "#3B82F6", // Vibrant Blue
  accent: "#60A5FA", // Soft Blue
  text: {
    primary: "#FFFFFF",
    secondary: "#BFDBFE"
  }
};

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const quickLinks = [
    { title: 'Home', href: '/', icon: FaHome },
    { title: 'Listings', href: '/all-listings', icon: FaHome },
    { title: 'About Us', href: '/about', icon: FaUsers },
    { title: 'Help', href: '/help', icon: FaQuestionCircle }
  ];

  const serviceAreas = [
    "Dhaka", "Chittagong", "Sylhet", 
    "Khulna", "Rajshahi", "Barishal"
  ];

  const socialMedia = [
    { 
      Icon: FaFacebookF, 
      color: 'bg-blue-600', 
      hoverColor: 'hover:bg-blue-700',
      link: 'https://facebook.com/basafinder'
    },
    { 
      Icon: FaTwitter, 
      color: 'bg-sky-500', 
      hoverColor: 'hover:bg-sky-600',
      link: 'https://twitter.com/basafinder'
    },
    { 
      Icon: FaInstagram, 
      color: 'bg-pink-500', 
      hoverColor: 'hover:bg-pink-600',
      link: 'https://instagram.com/basafinder'
    },
    { 
      Icon: FaLinkedinIn, 
      color: 'bg-blue-700', 
      hoverColor: 'hover:bg-blue-800',
      link: 'https://linkedin.com/company/basafinder'
    }
  ];

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement newsletter signup logic
    console.log('Submitted email:', email);
    setEmail('');
  };

  return (
    <footer 
      className="text-white py-16 px-6"
      style={{
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        boxShadow: '0 -4px 6px rgba(0,0,0,0.1)'
      }}
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Company Introduction */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <FaMapMarkerAlt className="text-4xl text-white" />
            <h2 className="text-3xl font-bold tracking-wider">Basa Finder</h2>
          </div>
          
          <p className="text-blue-100 leading-relaxed">
            Empowering renters and landlords with seamless, transparent, 
            and efficient property discovery and management solutions.
          </p>
          
          {/* Newsletter */}
          <form 
            onSubmit={handleEmailSubmit} 
            className="flex border-2 border-blue-700 rounded-full overflow-hidden"
          >
            <input 
              type="email"
              placeholder="Subscribe for updates"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full bg-transparent px-4 py-3 
                focus:outline-none text-white
                placeholder-blue-200
              "
              required
            />
            <button 
              type="submit" 
              className="
                bg-white text-blue-700 p-3 
                hover:bg-blue-50 
                transition-colors duration-300
              "
            >
              <FaPaperPlane className="text-blue-700" />
            </button>
          </form>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Quick Links</h3>
            {quickLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.href}
                className="
                  flex items-center py-2 text-blue-100 
                  hover:text-white hover:translate-x-2 
                  transition-all duration-300
                "
              >
                <link.icon className="mr-2" />
                {link.title}
              </a>
            ))}
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Service Areas</h3>
            {serviceAreas.map((area, index) => (
              <div 
                key={index} 
                className="
                  py-2 text-blue-100 
                  hover:text-white 
                  transition-colors duration-300
                "
              >
                {area}
              </div>
            ))}
          </div>
        </div>

        {/* Social Media & Contacts */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialMedia.map(({ Icon, color, hoverColor, link }, index) => (
                <a 
                  key={index} 
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    p-3 rounded-full ${color} ${hoverColor}
                    transform hover:-translate-y-2 
                    transition-all duration-300
                  `}
                >
                  <Icon className="text-white" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-white" />
                <span className="text-blue-100">support@basafinder.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-white" />
                <span className="text-blue-100">House 25, Road 7, Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-16 pt-6 border-t border-blue-700 text-center">
        <p className="text-blue-200">
          &copy; {new Date().getFullYear()} Basa Finder. All Rights Reserved.
        </p>
        <div className="mt-4 space-x-4 text-blue-100">
          <a href="/privacy" className="hover:text-white">Privacy Policy</a>
          <a href="/terms" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
