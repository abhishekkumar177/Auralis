'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Brain, Sparkles, Lock, Zap, ArrowRight } from 'lucide-react';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-8"
          >
            <Brain className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Smart Notes
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Organize your thoughts with AI-powered summaries and intelligent insights
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full font-medium text-lg hover:border-gray-400 transition"
              >
                Sign In
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8 mt-24"
        >
          <FeatureCard
            icon={<Sparkles className="w-8 h-8" />}
            title="AI Summaries"
            description="Automatically generate concise summaries and key points from your notes using advanced AI"
            gradient="from-yellow-400 to-orange-500"
          />
          <FeatureCard
            icon={<Brain className="w-8 h-8" />}
            title="Smart Insights"
            description="Discover patterns and categories in your notes with AI-powered analysis"
            gradient="from-purple-400 to-pink-500"
          />
          <FeatureCard
            icon={<Lock className="w-8 h-8" />}
            title="Secure & Private"
            description="Your notes are secured with Appwrite authentication and stored safely in the cloud"
            gradient="from-blue-400 to-cyan-500"
          />
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-32 text-center"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <Step
              number="1"
              title="Create Notes"
              description="Write and organize your thoughts, ideas, and important information"
            />
            <Step
              number="2"
              title="AI Summarize"
              description="Click the summarize button to get AI-generated summaries and tags"
            />
            <Step
              number="3"
              title="Get Insights"
              description="View AI-powered insights and discover patterns in your notes"
            />
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-32 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to supercharge your note-taking?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join Smart Notes today and experience AI-powered productivity
          </p>
          <Link href="/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-blue-600 rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition"
            >
              Start Free
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  gradient,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition"
    >
      <div
        className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${gradient} rounded-xl mb-6 text-white`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full text-white text-2xl font-bold mb-6">
        {number}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
