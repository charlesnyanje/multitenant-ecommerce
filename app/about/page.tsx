"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/store/navbar";

export default function AboutPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar tenant={{ name: "Luxe Essentials", logo: null }} />
      
      {/* Hero */}
      <section className="relative py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80" 
            alt="About hero"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-800/70" />
        
        <div className={`relative container mx-auto px-4 text-center transition-all duration-700 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We are dedicated to bringing you the finest quality products for the modern lifestyle.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-700 ease-out delay-100 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}>
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" 
                alt="Our store"
                className="rounded-xl shadow-lg"
              />
            </div>
            <div className={`transition-all duration-700 ease-out delay-200 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}>
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Founded in 2020, Luxe Essentials started with a simple mission: to provide premium quality products that enhance everyday life. We believe that exceptional quality shouldn't come at the expense of style or functionality.
              </p>
              <p className="text-muted-foreground mb-4">
                Our team carefully curates each item in our collection, working directly with trusted manufacturers and artisans who share our commitment to excellence.
              </p>
              <p className="text-muted-foreground">
                Today, we serve customers worldwide, offering a diverse range of electronics, fashion, and accessories that meet our stringent quality standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Quality First", desc: "Every product undergoes rigorous quality checks to ensure excellence.", emoji: "✓" },
              { title: "Customer Focus", desc: "Your satisfaction is our top priority. We're here to help.", emoji: "♥" },
              { title: "Sustainability", desc: "We're committed to minimizing our environmental impact.", emoji: "♻" },
            ].map((item, index) => (
              <div 
                key={item.title}
                className={`text-center p-6 transition-all duration-500 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">{item.emoji}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Johnson", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80" },
              { name: "Michael Chen", role: "Head of Operations", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
              { name: "Emily Davis", role: "Creative Director", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80" },
            ].map((member, index) => (
              <div 
                key={member.name}
                className={`text-center transition-all duration-500 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
                />
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
