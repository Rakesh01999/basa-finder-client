import React from 'react';
import { Card, Row, Col, Avatar } from "antd";
import { 
  HomeOutlined, 
  HeartOutlined, 
  StarOutlined, 
  UserOutlined 
} from "@ant-design/icons";

const testimonials = [
  {
    id: 1,
    quote: "Basa Finder made my apartment hunt incredibly smooth. Found my perfect home in just a week!",
    name: "Aminul Islam",
    location: "Dhaka",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    rating: 5,
    highlight: "Quick Search"
  },
  {
    id: 2,
    quote: "The detailed property listings and transparent information saved me so much time and hassle.",
    name: "Fatima Rahman",
    location: "Chittagong",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    rating: 4,
    highlight: "Comprehensive Details"
  },
  {
    id: 3,
    quote: "As a student, I found affordable and safe housing options perfectly matched to my budget.",
    name: "Rakib Hassan",
    location: "Sylhet",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    rating: 5,
    highlight: "Budget-Friendly"
  },
  {
    id: 4,
    quote: "The map-based search helped me find properties exactly in the neighborhoods I wanted.",
    name: "Tasnim Ahmed",
    location: "Rajshahi",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    rating: 4,
    highlight: "Location Precision"
  },
  {
    id: 5,
    quote: "Never thought finding a rental could be this easy. Basa Finder is a game-changer!",
    name: "Sharmin Akhter",
    location: "Khulna",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    rating: 5,
    highlight: "User-Friendly"
  },
  {
    id: 6,
    quote: "The filtering options are incredibly detailed. I could find exactly what I was looking for.",
    name: "Imran Khan",
    location: "Barisal",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    rating: 4,
    highlight: "Advanced Filters"
  }
];

const Testimonials: React.FC = () => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarOutlined 
        key={index} 
        style={{ 
          color: index < rating ? '#FFD700' : '#E0E0E0',
          fontSize: '16px' 
        }} 
      />
    ));
  };

  return (
    <div 
      className="py-16 px-6"
      style={{
        background: 'linear-gradient(135deg, #F0F4F8 0%, #E6F2FF 100%)'
      }}
    >
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-blue-800 mb-4">
          <HomeOutlined className="mr-3 text-blue-500" />
          Trusted by Happy Renters
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Hear from our satisfied users who found their perfect home through Basa Finder
        </p>
      </div>

      {/* Testimonials Grid */}
      <Row 
        gutter={[24, 24]} 
        className="max-w-6xl mx-auto"
      >
        {testimonials.map((testimonial) => (
          <Col 
            key={testimonial.id} 
            xs={24} 
            sm={12} 
            lg={8}
          >
            <Card
              className="h-full transform transition-all hover:scale-105 hover:shadow-xl"
              style={{
                background: 'white',
                borderLeft: '6px solid #2563EB', // Blue accent
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            >
              {/* Quote */}
              <p className="text-gray-700 italic mb-4">
                <HeartOutlined className="mr-2 text-blue-500" />
                "{testimonial.quote}"
              </p>

              {/* User Info */}
              <div className="flex items-center mt-4">
                <Avatar 
                  src={testimonial.avatar} 
                  icon={<UserOutlined />} 
                  size={64} 
                  className="mr-4 border-2 border-blue-300"
                />
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-blue-600 text-sm">
                    {testimonial.location}
                  </p>
                </div>
              </div>

              {/* Rating and Highlight */}
              <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center">
                  {renderStars(testimonial.rating)}
                </div>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {testimonial.highlight}
                </span>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <p className="text-xl text-gray-700 mb-4">
          Ready to find your dream home?
        </p>
        <a 
          href="/allListings" 
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold shadow-md"
        >
          Start Your Search
        </a>
      </div>
    </div>
  );
};

export default Testimonials;
