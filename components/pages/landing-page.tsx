"use client"

import React from "react"
import { ArrowRight, Users, Target, Shield, Globe, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAppContext } from "@/contexts/app-context"


export function LandingPage() {
  const { setCurrentScreen, setIsLoggedIn } = useAppContext();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-black text-foreground px-4 relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-hidden="true"
        >
          <defs>
            <radialGradient
              id="bg1"
              cx="50%"
              cy="50%"
              r="80%"
              fx="50%"
              fy="50%"
              gradientTransform="rotate(45)"
            >
              <stop offset="0%" stopColor="#6366F1" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#A78BFA" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="720" cy="400" rx="700" ry="300" fill="url(#bg1)" />
        </svg>
      </div>
      {/* Navbar */}
      <nav
        className="w-full max-w-7xl mx-auto flex items-center justify-between py-6 px-4 z-10 relative"
        aria-label="Main Navigation"
      >
        <div className="flex items-center gap-2">
          
          <span className="text-2xl font-bold text-white tracking-wide">SkillXchange</span>
        </div>
        <div className="hidden md:flex gap-8 text-white font-medium">
          <a
            href="/discover"
            className="hover:text-blue-300 transition focus:outline focus:ring-2 focus:ring-blue-400"
          >
            Discover
          </a>
          <a
            href="#how"
            className="hover:text-blue-300 transition focus:outline focus:ring-2 focus:ring-blue-400"
          >
            How It Works
          </a>
          <a
            href="#stats"
            className="hover:text-blue-300 transition focus:outline focus:ring-2 focus:ring-blue-400"
          >
            Stats
          </a>
        </div>
        <Button
          size="lg"
          type="button"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 shadow-lg focus:outline focus:ring-2 focus:ring-purple-400"
          onClick={() => {
            setIsLoggedIn(true);
            setCurrentScreen('home');
          }}
        >
          Join Now <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </nav>
      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center py-24 z-10 relative">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-lg">
          Unlock Your Potential
        </h1>
        <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mb-8">
          Connect, learn, and grow by exchanging skills with a vibrant global community. Discover
          new opportunities, share your expertise, and unlock your future.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            type="button"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 shadow-xl focus:outline focus:ring-2 focus:ring-purple-400"
            onClick={() => {
              setIsLoggedIn(true);
              setCurrentScreen('home');
            }}
          >
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            type="button"
            variant="outline"
            className="px-8 py-3 bg-white/10 border-white text-white hover:bg-white/20 focus:outline focus:ring-2 focus:ring-blue-400"
            onClick={() => setCurrentScreen('skills-assessment')}
          >
            Explore Roadmaps <Award className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </header>
      {/* Features Section */}
      <section id="features" className="py-20 w-full z-10 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose SkillXchange?</h2>
            <p className="text-lg text-blue-200">Discover the power of peer-to-peer learning</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center bg-gradient-to-br from-blue-800/60 to-blue-600/40 border-none shadow-xl hover:scale-105 transition-transform">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-blue-600" aria-label="Mutual Exchange" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-white">Mutual Exchange</h3>
                <p className="text-blue-200">
                  Trade skills directly with other learners in a money-free environment
                </p>
              </CardContent>
            </Card>
            <Card className="text-center bg-gradient-to-br from-purple-800/60 to-purple-600/40 border-none shadow-xl hover:scale-105 transition-transform">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-purple-600" aria-label="Smart Matching" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-white">Smart Matching</h3>
                <p className="text-purple-200">
                  AI-powered algorithm finds your perfect learning partners
                </p>
              </CardContent>
            </Card>
            <Card className="text-center bg-gradient-to-br from-green-800/60 to-green-600/40 border-none shadow-xl hover:scale-105 transition-transform">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-green-600" aria-label="Trusted Community" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-white">Trusted Community</h3>
                <p className="text-green-200">
                  Verified profiles and rating system ensure quality exchanges
                </p>
              </CardContent>
            </Card>
            <Card className="text-center bg-gradient-to-br from-orange-800/60 to-orange-600/40 border-none shadow-xl hover:scale-105 transition-transform">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-orange-600" aria-label="Global Reach" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-white">Global Reach</h3>
                <p className="text-orange-200">
                  Connect with learners worldwide, both online and offline
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section
        id="stats"
        className="py-16 w-full bg-gradient-to-r from-blue-900 via-purple-900 to-black z-10 relative"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-extrabold mb-2 animate-pulse">10K+</div>
              <div className="text-blue-200">Active Learners</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold mb-2 animate-pulse">50K+</div>
              <div className="text-blue-200">Skills Exchanged</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold mb-2 animate-pulse">95%</div>
              <div className="text-blue-200">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold mb-2 animate-pulse">4.9★</div>
              <div className="text-blue-200">User Rating</div>
            </div>
          </div>
        </div>
      </section>
      {/* How It Works */}
      <section
        id="how"
        className="py-20 w-full bg-gradient-to-br from-blue-950 via-purple-950 to-black z-10 relative"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-lg text-blue-200">
              Start your learning journey in three simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-lg">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Create Your Profile</h3>
              <p className="text-blue-200">
                List your skills and what you want to learn. Our smart matching will do the rest.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-lg">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Find Your Match</h3>
              <p className="text-purple-200">
                Browse compatible learners and send swap requests for mutual skill exchange.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-lg">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Start Learning</h3>
              <p className="text-green-200">
                Connect through our platform and begin your collaborative learning journey.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 w-full z-10 relative">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Learning?</h2>
          <p className="text-lg text-blue-200 mb-8">
            Join thousands of learners who are already growing their skills through peer-to-peer
            exchange.
          </p>
          <Button
            size="lg"
            type="button"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 shadow-xl focus:outline focus:ring-2 focus:ring-purple-400"
            onClick={() => {
              setIsLoggedIn(true);
              setCurrentScreen('home');
            }}
          >
            Join SkillXchange Today <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
      {/* Footer */}
      <footer className="mt-12 text-sm text-blue-200 w-full text-center py-8 z-10 relative">
        &copy; {new Date().getFullYear()} SkillXchange. All rights reserved.
      </footer>
    </main>
  );
}