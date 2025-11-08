'use client';

import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Zap, ArrowRight } from 'lucide-react';

export default function LandingPage({ onGetStarted }) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Large Gradient Backgrounds */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-20%] w-[1000px] h-[1000px] bg-gradient-to-br from-[#753AED]/25 to-purple-400/15 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-[-15%] right-[-15%] w-[1000px] h-[1000px] bg-gradient-to-br from-[#1E40AF]/25 to-blue-400/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-[750px] h-[750px] bg-gradient-to-br from-[#F5900B]/20 to-orange-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '0.5s', transform: 'translate(-50%, -50%)' }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-20 px-8 py-4 bg-white/50 backdrop-blur-xl rounded-2xl shadow-md border border-white/30"
        >
          {/* Logo */}
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="relative w-14 h-14 bg-gradient-to-br from-[#1E40AF] via-[#753AED] to-purple-600 rounded-2xl flex items-center justify-center shadow-xl shadow-[#753AED]/30"
            >
              <div className="absolute inset-0 rounded-2xl bg-white/10 blur-xl animate-pulse"></div>
              <Sparkles className="w-8 h-8 text-white relative z-10" />
            </motion.div>
            <span className="text-3xl font-extrabold bg-gradient-to-r from-[#1E40AF] via-[#753AED] to-purple-600 bg-clip-text text-transparent tracking-tight">
              GrowthAI
            </span>
          </div>

          <div className="flex gap-5">
            {['About', 'Contact'].map((label, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05, y: -1 }}
                className="px-7 py-2.5 text-gray-700 font-semibold rounded-full bg-white/70 backdrop-blur-md border border-gray-200 shadow-md hover:text-[#753AED] hover:border-[#753AED]/30 hover:shadow-lg transition-all duration-300"
              >
                {label}
              </motion.button>
            ))}
          </div>
        </motion.nav>

        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-250px)]">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-lg rounded-full border border-[#753AED]/30 mb-8 shadow-lg"
          >
            <Zap className="w-5 h-5 text-[#F5900B] animate-pulse" />
            <span className="text-sm font-semibold text-gray-700 tracking-wide">
              AI-Powered Business Solutions
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-[#1E40AF] via-[#753AED] to-[#F5900B] bg-clip-text text-transparent">
              Accelerate Your
            </span>
            <br />
            <span className="text-gray-900">Business Growth</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed tracking-wide"
            style={{
              lineHeight: '1.8',
              fontSize: '1.25rem',
            }}
          >
            Unlock your business potential with AI-driven insights and personalized strategies.
            <br />
            Get expert recommendations tailored to your unique needs — in just minutes.
          </motion.p>

          {/* CTA Button - visually separated from features */}
          <motion.button
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ scale: 1.07, y: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={onGetStarted}
            className="group relative px-28 py-9 mt-6 mb-16 bg-gradient-to-r from-[#1E40AF] via-[#753AED] to-purple-600 text-white rounded-3xl text-3xl font-bold shadow-2xl shadow-[#753AED]/40 hover:shadow-[#753AED]/60 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <span className="relative flex items-center gap-4 justify-center">
              Get Started
              <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
          </motion.button>

          {/* Features Row - Single Row */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex justify-center items-stretch gap-10 mt-6 w-[90%] mx-auto"
          >
            {[
              {
                icon: <Sparkles className="w-10 h-10" />,
                title: 'AI-Powered Insights',
                description:
                  'Get intelligent recommendations that empower smarter business decisions.',
                color: '#1E40AF',
              },
              {
                icon: <TrendingUp className="w-10 h-10" />,
                title: 'Growth Strategies',
                description:
                  'Access personalized scaling plans and actionable strategies built for success.',
                color: '#753AED',
              },
              {
                icon: <Zap className="w-10 h-10" />,
                title: 'Quick Results',
                description:
                  'Experience measurable improvements and insights in just minutes.',
                color: '#F5900B',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.04 }}
                className="group bg-white/90 backdrop-blur-md p-10 flex-1 max-w-sm rounded-3xl border border-gray-200/60 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden flex flex-col items-center text-center"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-15 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${feature.color}33, transparent)`,
                  }}
                ></div>

                <div
                  className="w-24 h-24 rounded-3xl flex items-center justify-center mb-8 transform group-hover:scale-110 transition-all duration-300 shadow-md"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <div style={{ color: feature.color }}>{feature.icon}</div>
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-[#753AED] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed max-w-xs">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
