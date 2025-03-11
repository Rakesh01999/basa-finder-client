import {
  TeamOutlined,
  RocketOutlined,
  HomeOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Card, Avatar } from "antd";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const AboutUs = () => {
  // Blue Theme Colors from your project
  const blueColors = {
    primary: "#1E3A8A", // Deep Blue
    secondary: "#2563EB", // Vibrant Blue
    accent: "#60A5FA", // Soft Blue (from your Home component)
    background: "#EFF6FF", // Light Blue
  };

  const socialMedia = [
    {
      Icon: FaFacebookF,
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
      link: "https://facebook.com/basafinder",
    },
    {
      Icon: FaTwitter,
      color: "bg-sky-500",
      hoverColor: "hover:bg-sky-600",
      link: "https://twitter.com/basafinder",
    },
    {
      Icon: FaInstagram,
      color: "bg-pink-500",
      hoverColor: "hover:bg-pink-600",
      link: "https://instagram.com/basafinder",
    },
    {
      Icon: FaLinkedinIn,
      color: "bg-blue-700",
      hoverColor: "hover:bg-blue-800",
      link: "https://linkedin.com/company/basafinder",
    },
  ];

  // Team members data
  const teamMembers = [
    {
      name: "Rakesh Biswas",
      role: "CEO & Founder",
      // image: "/api/placeholder/100/100", // Using placeholder for demo
      image: "https://i.postimg.cc/SKxRYWBQ/profes-photo-rk-resized.png",
      bio: "Rakesh has 10+ years of experience in real estate and technology. She founded BasaFinder with a vision to transform the rental marketplace experience.",
    },
    {
      name: "David Ahmed",
      role: "CTO",
      image: "/api/placeholder/100/100", // Using placeholder for demo
      bio: "David brings 8 years of software development expertise, specializing in creating seamless digital experiences for real estate platforms.",
    },
    {
      name: "Anika Rahman",
      role: "Chief Design Officer",
      image: "/api/placeholder/100/100", // Using placeholder for demo
      bio: "Anika leads our UI/UX team with her exceptional eye for design and understanding of user behavior in digital property marketplaces.",
    },
    {
      name: "Michael Chen",
      role: "Head of Customer Relations",
      image: "/api/placeholder/100/100", // Using placeholder for demo
      bio: "Michael ensures that both landlords and tenants receive world-class support and have the best experience using BasaFinder.",
    },
  ];

  // Stats data
  const stats = [
    { label: "Cities Covered", value: "25+" },
    { label: "Active Users", value: "15K+" },
    { label: "Properties Listed", value: "8,000+" },
    { label: "Happy Tenants", value: "12K+" },
  ];

  return (
    <div
      className="min-h-screen"
      style={{
        background: `linear-gradient(135deg, ${blueColors.accent} 0%, ${blueColors.primary} 100%)`,
      }}
    >
      {/* Hero Section */}
      <div className="w-full bg-white bg-opacity-90 backdrop-blur-md shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: blueColors.primary }}
          >
            About BasaFinder
          </h1>
          <div className="w-24 h-1 bg-blue-500 mb-8"></div>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl">
            Transforming the way people find their perfect homes through
            innovation, transparency, and a seamless digital experience.
          </p>
        </div>
      </div>

      {/* Mission Statement Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 md:p-12">
              <div className="flex items-center mb-6">
                <RocketOutlined
                  style={{ fontSize: "28px", color: blueColors.secondary }}
                />
                <h2
                  className="text-3xl font-bold ml-3"
                  style={{ color: blueColors.primary }}
                >
                  Our Mission
                </h2>
              </div>
              <p className="text-gray-700 mb-4">
                At BasaFinder, we're on a mission to revolutionize the rental
                housing market by creating a platform that connects landlords
                and tenants seamlessly, transparently, and efficiently.
              </p>
              <p className="text-gray-700 mb-4">
                We believe that finding a home should be an exciting journey,
                not a stressful experience. Our platform is designed to
                eliminate the common frustrations of the rental process.
              </p>
              <p className="text-gray-700">
                Through innovative technology and a user-centered approach,
                we're building a community where everyone can find their perfect
                living space with confidence and ease.
              </p>
            </div>
            <div
              className="md:w-1/2 flex items-center justify-center p-8 md:p-0"
              style={{
                background: `linear-gradient(45deg, ${blueColors.primary} 0%, ${blueColors.secondary} 100%)`,
              }}
            >
              <div className="text-white p-8 md:p-12">
                <h3 className="text-2xl font-bold mb-6">Our Vision</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white bg-opacity-30 flex items-center justify-center mr-3 mt-1">
                      <span className="text-sm font-bold">01</span>
                    </div>
                    <p>
                      Create the most trusted rental marketplace in the region
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white bg-opacity-30 flex items-center justify-center mr-3 mt-1">
                      <span className="text-sm font-bold">02</span>
                    </div>
                    <p>
                      Empower landlords with tools to manage properties
                      efficiently
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white bg-opacity-30 flex items-center justify-center mr-3 mt-1">
                      <span className="text-sm font-bold">03</span>
                    </div>
                    <p>Help tenants find their ideal homes without hassle</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white bg-opacity-30 flex items-center justify-center mr-3 mt-1">
                      <span className="text-sm font-bold">04</span>
                    </div>
                    <p>Expand to 50+ cities by the end of next year</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-md p-6 text-center transform hover:scale-105 transition-transform duration-300"
            >
              <div
                className="text-3xl md:text-4xl font-bold mb-2"
                style={{ color: blueColors.secondary }}
              >
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <TeamOutlined style={{ fontSize: "28px", color: "white" }} />
            <h2 className="text-3xl font-bold ml-3 text-white">
              Meet Our Team
            </h2>
          </div>
          <p className="text-white text-opacity-90 max-w-2xl mx-auto">
            The passionate individuals behind BasaFinder who are dedicated to
            transforming the rental experience for landlords and tenants alike.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="hover:shadow-xl transition-shadow duration-300 bg-white bg-opacity-95 backdrop-blur-sm"
              bordered={false}
            >
              <div className="flex flex-col items-center text-center">
                <Avatar
                  src={member.image}
                  size={100}
                  className="mb-4 border-4"
                  style={{ borderColor: blueColors.secondary }}
                />
                <h3
                  className="text-xl font-bold"
                  style={{ color: blueColors.primary }}
                >
                  {member.name}
                </h3>
                <p className="text-blue-500 mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white bg-opacity-95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="md:flex items-start">
            <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0">
              <div className="flex items-center mb-6">
                <HomeOutlined
                  style={{ fontSize: "28px", color: blueColors.secondary }}
                />
                <h2
                  className="text-3xl font-bold ml-3"
                  style={{ color: blueColors.primary }}
                >
                  Get In Touch
                </h2>
              </div>
              <p className="text-gray-700 mb-6">
                We'd love to hear from you! Whether you have a question about
                our platform, need assistance, or want to partner with us, our
                team is ready to help.
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div
                    className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center mr-3"
                    style={{ backgroundColor: blueColors.background }}
                  >
                    <PhoneOutlined style={{ color: blueColors.secondary }} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600">+880 1234 567890</p>
                    <p className="text-gray-600">+880 9876 543210</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div
                    className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center mr-3"
                    style={{ backgroundColor: blueColors.background }}
                  >
                    <MailOutlined style={{ color: blueColors.secondary }} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">info@basafinder.com</p>
                    <p className="text-gray-600">support@basafinder.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div
                    className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center mr-3"
                    style={{ backgroundColor: blueColors.background }}
                  >
                    <HomeOutlined style={{ color: blueColors.secondary }} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Address</h4>
                    <p className="text-gray-600">Tower Heights, 7th Floor</p>
                    <p className="text-gray-600">
                      123 Gulshan Avenue, Dhaka 1212
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/2">
              <div
                className="rounded-xl shadow-lg overflow-hidden"
                style={{ height: "400px", position: "relative" }}
              >
                {/* Placeholder for a map - in a real implementation you would use Google Maps or similar */}
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${blueColors.background} 0%, ${blueColors.accent} 100%)`,
                    position: "relative",
                  }}
                >
                  <div className="absolute inset-0 opacity-10">
                    {/* Grid pattern background */}
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle, #000000 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }}
                    ></div>
                  </div>
                  <div className="text-center p-6 bg-white bg-opacity-90 rounded-lg shadow-md z-10">
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{ color: blueColors.primary }}
                    >
                      BasaFinder Headquarters
                    </h3>
                    <p className="text-gray-700">
                      123 Gulshan Avenue, Dhaka 1212
                    </p>
                    <button
                      className="mt-4 px-4 py-2 rounded-md text-white transition-colors duration-300"
                      style={{
                        backgroundColor: blueColors.secondary,
                        boxShadow: `0 4px 14px 0 ${blueColors.accent}80`,
                      }}
                    >
                      Get Directions
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <h3 className="text-2xl font-bold text-white mb-6">Connect With Us</h3>
        <div className="flex justify-center space-x-6">
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

      {/* Footer note */}
      <div className="bg-white bg-opacity-10 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <p className="text-center text-white text-opacity-90 text-sm">
            © 2025 BasaFinder. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
