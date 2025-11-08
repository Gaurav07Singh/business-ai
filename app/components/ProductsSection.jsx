'use client';

import { motion } from 'framer-motion';
import { Mail, Users, Megaphone, ArrowLeft, Sparkles } from 'lucide-react';

export default function ProductsSection({ onServiceSelect, onBack }) {
  const services = [
    {
      id: 'email',
      icon: <Mail className="w-12 h-12" />,
      title: 'Professional Email',
      description:
        'Set up professional email solutions that enhance your brand credibility and communication.',
      color: '#1E40AF',
      gradient: 'from-[#1E40AF] to-blue-600',
    },
    {
      id: 'lead-generation',
      icon: <Users className="w-12 h-12" />,
      title: 'Lead Generation',
      description:
        'Discover effective strategies to attract and convert high-quality leads for your business.',
      color: '#753AED',
      gradient: 'from-[#753AED] to-purple-600',
    },
    {
      id: 'marketing',
      icon: <Megaphone className="w-12 h-12" />,
      title: 'Marketing Campaign Planner',
      description:
        'Create data-driven marketing campaigns that resonate with your target audience.',
      color: '#F5900B',
      gradient: 'from-[#F5900B] to-orange-600',
    },
    {
      id: 'image-generator',
      icon: <Sparkles className="w-12 h-12" />,
      title: 'AI Image Generator',
      description:
        'Upload an image and create stunning variations with AI-powered image generation.',
      color: '#EC4899',
      gradient: 'from-[#EC4899] to-pink-600',
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[700px] h-[700px] bg-gradient-to-br from-[#753AED]/25 to-purple-400/15 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-br from-[#1E40AF]/25 to-blue-400/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#F5900B]/20 to-orange-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '0.5s', transform: 'translate(-50%, -50%)' }}
        />
      </div>

      {/* Main Section */}
      <div className="relative z-10 container mx-auto px-6 py-20 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center flex flex-col items-center"
          >
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-[#1E40AF] transition-colors font-medium mb-10 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full shadow-sm hover:shadow-md"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>

            <div className="max-w-2xl text-center">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
                <span className="bg-gradient-to-r from-[#1E40AF] via-[#753AED] to-[#F5900B] bg-clip-text text-transparent">
                  Choose Your Service
                </span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Select a service to get started with our AI-powered questionnaire and receive personalized recommendations in minutes.
              </p>
            </div>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-10 w-full px-4 relative z-0">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.03 }}
                onClick={() => onServiceSelect(service.id)}
                className="group cursor-pointer bg-white/90 backdrop-blur-md rounded-3xl p-10 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 relative overflow-visible flex flex-col items-center text-center min-h-[460px] will-change-transform z-10 hover:z-20"
              >
                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl`}
                ></div>

                {/* Card Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                  {/* Icon */}
                  <div
                    className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-all duration-300 shadow-md"
                    style={{ backgroundColor: `${service.color}15` }}
                  >
                    <div style={{ color: service.color }}>{service.icon}</div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#753AED] transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base text-gray-600 leading-relaxed mb-10 max-w-xs">
                    {service.description}
                  </p>

                  {/* Centered, Wider Button */}
                  <button
                    className="relative w-[80%] py-4 px-10 bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200 rounded-2xl text-base font-bold text-gray-700 hover:from-[#753AED] hover:to-[#1E40AF] hover:text-white hover:border-transparent transition-all duration-300 flex items-center justify-center gap-3 shadow-md hover:shadow-xl transform hover:scale-105 overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <span className="relative text-lg">⚡</span>
                    <span className="relative">Launch Tool</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer Info */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-20"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/70 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">
                AI-powered analysis • Instant results • Personalized recommendations
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
