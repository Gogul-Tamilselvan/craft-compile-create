
import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  CheckIcon, 
  GlobeIcon, 
  FileTextIcon, 
  MapPin, 
  CalendarIcon, 
  UsersIcon, 
  PhoneIcon, 
  InfoIcon,
  PlaneIcon,
  TicketIcon,
  CompassIcon,
  StarIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  MenuIcon,
  XIcon
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote: "Aasia Consultancy made our international trip hassle-free. Their visa and flight booking services are excellent!",
    name: "Ramesh Kumar",
    location: "Chennai",
    rating: 5
  },
  {
    quote: "I got my passport renewed through Aasia in just 7 days. Their expertise in documentation saved me a lot of time!",
    name: "Priya Sharma",
    location: "Thanjavur",
    rating: 5
  },
  {
    quote: "The overseas job consultancy team helped me secure a position in Dubai. Very professional service!",
    name: "Abdul Rahman",
    location: "Pattukottai",
    rating: 5
  },
];

const services = [
  {
    title: "Flight Tickets",
    description: "Domestic & International",
    icon: PlaneIcon,
    content: "Book your domestic and international flight tickets through our agency. We ensure the best prices and routes for your journey.",
    color: "from-blue-600 to-indigo-700"
  },
  {
    title: "Train & Bus Tickets",
    description: "Convenient Booking",
    icon: TicketIcon,
    content: "Hassle-free booking of train and bus tickets for your travels. Save time and enjoy our efficient service.",
    color: "from-teal-600 to-emerald-700"
  },
  {
    title: "Passport Services",
    description: "New, Renewal & Lost",
    icon: FileTextIcon,
    content: "Complete assistance with passport applications, renewals, or replacements. We handle all the paperwork for a smooth process.",
    color: "from-amber-600 to-orange-700"
  }
];

// Navigation component - extracted for performance
const Navigation = ({ isScrolled, visibleSections, scrollToSection, isMenuOpen, setIsMenuOpen }) => (
  <nav 
    className={cn(
      "fixed w-full z-50 transition-all duration-300 border-b",
      isScrolled 
        ? "bg-white/95 backdrop-blur-md shadow-md border-transparent py-2" 
        : "bg-transparent border-transparent py-4"
    )}
  >
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className={cn(
            "bg-gradient-to-r from-blue-600 to-blue-800 p-2 rounded-lg transition-all duration-300",
            isScrolled ? "scale-90" : "scale-100"
          )}>
            <GlobeIcon className="text-white h-5 w-5" />
          </div>
          <span className={cn(
            "font-bold text-xl transition-all duration-300",
            isScrolled ? "text-blue-800" : "text-blue-700"
          )}>
            Aasia Consultancy
          </span>
        </div>
        
        {/* Mobile menu button with animation */}
        <button 
          className="md:hidden rounded-md p-2 hover:bg-gray-100 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <XIcon className="h-6 w-6 text-gray-700" />
          ) : (
            <MenuIcon className="h-6 w-6 text-gray-700" />
          )}
        </button>
        
        {/* Desktop Navigation with hover effects */}
        <div className="hidden md:flex items-center space-x-8">
          {["home", "about", "services", "testimonials"].map((section) => (
            <button 
              key={section}
              onClick={() => scrollToSection(section)} 
              className={cn(
                "relative px-2 py-1 text-gray-700 font-medium transition-colors duration-300 hover:text-blue-700",
                visibleSections[section] && "text-blue-700"
              )}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
              
              {/* Animated underline */}
              <span className={cn(
                "absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 transition-transform duration-300 origin-left",
                visibleSections[section] && "scale-x-100"
              )}></span>
            </button>
          ))}
          
          <Link to="/app">
            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 shadow-md hover:shadow-lg transition-all duration-300">
              Client Portal
              <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Mobile menu with slide animation */}
      {isMenuOpen && (
        <div className="md:hidden py-4 animate-in slide-in-from-right duration-300">
          <div className="flex flex-col space-y-1 bg-blue-50 rounded-lg p-2">
            {["home", "about", "services", "testimonials"].map((section) => (
              <button 
                key={section}
                onClick={() => scrollToSection(section)} 
                className={cn(
                  "flex items-center justify-between text-left py-3 px-4 rounded-md transition-colors",
                  visibleSections[section] 
                    ? "bg-blue-100 text-blue-800"
                    : "hover:bg-blue-100/50 text-gray-700 hover:text-blue-800"
                )}
              >
                <span className="capitalize font-medium">{section}</span>
                <ChevronRightIcon className={cn(
                  "h-4 w-4 transition-transform",
                  visibleSections[section] && "transform rotate-90"
                )} />
              </button>
            ))}
            <Link to="/app" className="mt-2">
              <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900">
                Client Portal
                <ChevronRightIcon className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  </nav>
);

// Hero Section - extracted component
const HeroSection = ({ scrollToSection, heroRef }) => (
  <section 
    id="home" 
    className="min-h-screen flex items-center pt-20 relative overflow-hidden"
    ref={heroRef}
  >
    {/* Simplified background with fewer animated elements */}
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 overflow-hidden">
      {/* Reduced number of particles for better performance */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 1}px`,
              height: `${Math.random() * 8 + 1}px`,
              opacity: Math.random() * 0.5 + 0.3,
            }}
          ></div>
        ))}
      </div>
      
      {/* Simplified gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent"></div>
      
      {/* Reduced number of blurred spheres */}
      <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-blue-700/20 blur-3xl"></div>
      <div className="absolute -bottom-40 -right-20 w-96 h-96 rounded-full bg-indigo-600/10 blur-3xl"></div>
    </div>
    
    {/* Hero Content */}
    <div className="container mx-auto px-4 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content with simplified animations */}
        <div className="text-white space-y-8">
          <div className="space-y-5 max-w-xl">
            {/* Premium badge with simplified design */}
            <div className="inline-block">
              <div className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full shadow-lg">
                <span className="w-2 h-2 rounded-full bg-blue-400 mr-2"></span>
                <span className="text-blue-100 text-sm font-medium">Premium Travel Solutions</span>
              </div>
            </div>
            
            {/* Simplified Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
              <span className="block">Experience</span>
              <span className="block mt-2 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
                Limitless Travel
              </span>
            </h1>
            
            {/* Subheading */}
            <p className="text-lg sm:text-xl text-blue-100/90 max-w-lg">
              Elevate your journey with Pattukottai's most trusted travel consultancy. 
              From documentation to destination, we make every step of your travel seamless.
            </p>
          </div>
          
          {/* CTA buttons with simplified hover effects */}
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              onClick={() => scrollToSection('services')}
              className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-lg transition-all duration-300 group"
            >
              Our Services
              <ArrowRightIcon className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => scrollToSection('about')}
              className="border-white/30 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 transition-all duration-300 group"
            >
              About Us
              <ChevronRightIcon className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          
          {/* Stats with simplified styling */}
          <div className="grid grid-cols-3 gap-6 pt-8 mt-6 border-t border-white/10">
            <div className="text-center p-3 backdrop-blur-sm bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300">
              <div className="text-3xl font-bold text-white">15+</div>
              <div className="text-blue-200/70 text-sm">Years Experience</div>
            </div>
            <div className="text-center p-3 backdrop-blur-sm bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300">
              <div className="text-3xl font-bold text-white">1000+</div>
              <div className="text-blue-200/70 text-sm">Happy Clients</div>
            </div>
            <div className="text-center p-3 backdrop-blur-sm bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300">
              <div className="text-3xl font-bold text-white">100%</div>
              <div className="text-blue-200/70 text-sm">Success Rate</div>
            </div>
          </div>
        </div>
        
        {/* Right Content - Simplified premium card */}
        <div className="relative hidden lg:flex justify-center">
          <div className="w-full max-w-md transform hover:rotate-y-0 transition-all duration-700 group">
            {/* Simplified Premium card */}
            <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-2xl">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-white text-xl font-semibold">Premium Travel Services</h3>
                  <p className="text-blue-100/70">Tailored to your needs</p>
                </div>
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-3 rounded-full">
                  <GlobeIcon className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className={`bg-gradient-to-r ${service.color} p-2 rounded-full`}>
                      <service.icon className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-white">{service.title}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/10">
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-lg transition-all duration-300"
                  onClick={() => scrollToSection('services')}
                >
                  Get Started
                  <ArrowRightIcon className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Simplified scroll indicator */}
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
      <div className="flex flex-col items-center text-white/70">
        <span className="text-sm mb-2">Scroll Down</span>
        <div className="w-5 h-5 border-b-2 border-r-2 border-white/70 transform rotate-45"></div>
      </div>
    </div>
  </section>
);

// About Section - extracted component
const AboutSection = () => (
  <section id="about" className="py-28 bg-white relative overflow-hidden">
    {/* Simplified background pattern */}
    <div className="absolute inset-0 opacity-5 pattern-dots"></div>
    
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <div className="inline-block">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            Our Story
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
          About <span className="text-blue-700">Aasia Consultancy</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto mt-6"></div>
      </div>
      
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <div className="relative group">
              {/* Main image with optimized loading */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl transform transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1577017040065-650ee4d43339?auto=format&q=75&fit=crop&w=800" 
                  alt="Aasia Consultancy Office" 
                  className="w-full h-auto rounded-2xl object-cover"
                  width="800"
                  height="600"
                  loading="lazy"
                />
                
                {/* Simplified overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-70"></div>
              </div>
              
              {/* Floating stats card */}
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-blue-700 to-blue-900 text-white p-6 rounded-xl shadow-xl z-20">
                <p className="text-2xl font-bold">Since 2010</p>
                <p className="text-blue-100">Trusted by 1000+ clients</p>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 mt-12 md:mt-0">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Your Premier Travel Partner Since 2010
            </h3>
            
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Since our establishment, Aasia Consultancy has been the premier travel agency in Pattukottai, Tamil Nadu. 
              We take pride in providing comprehensive travel solutions tailored to your needs with a commitment to excellence.
            </p>
            
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Our mission is to make travel planning stress-free by offering personalized service for all your 
              travel requirements - from booking flights and trains to handling passport and visa services.
            </p>
            
            {/* Feature boxes with simplified animations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-all duration-300 group">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-3 rounded-lg text-white shadow-md">
                  <UsersIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">15+ Expert Consultants</h4>
                  <p className="text-sm text-gray-600">Dedicated professionals</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-all duration-300 group">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-3 rounded-lg text-white shadow-md">
                  <GlobeIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Global Connections</h4>
                  <p className="text-sm text-gray-600">Worldwide partnerships</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-all duration-300 group">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-3 rounded-lg text-white shadow-md">
                  <FileTextIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">100% Success Rate</h4>
                  <p className="text-sm text-gray-600">Guaranteed results</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-all duration-300 group">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-3 rounded-lg text-white shadow-md">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Fast Processing</h4>
                  <p className="text-sm text-gray-600">Quick turnaround times</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Services Section - extracted component
const ServicesSection = () => (
  <section id="services" className="py-28 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
    <div className="container mx-auto px-4 relative z-10">
      <div className="text-center mb-16">
        <div className="inline-block">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            What We Offer
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
          Our <span className="text-blue-700">Premium Services</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto mt-6"></div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-6">
          We offer a comprehensive range of travel services to make your journey smooth and hassle-free.
        </p>
      </div>
      
      {/* Service cards with simplified effects */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <div 
            key={index}
            className="group"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg h-full transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl border border-gray-100 hover:border-blue-100 flex flex-col">
              <div className={`mb-6 bg-gradient-to-r ${service.color} w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg`}>
                <service.icon className="text-white w-8 h-8" />
              </div>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-blue-600 font-medium mb-4">{service.description}</p>
              
              <p className="text-gray-600 mb-6 flex-grow">
                {service.content}
              </p>
              
              <Button 
                variant="outline"
                className="border-blue-200 hover:border-blue-300 text-blue-700 hover:bg-blue-50 group mt-auto"
              >
                <span>Learn More</span>
                <ArrowRightIcon className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Testimonials Section - extracted component
const TestimonialsSection = ({ activeTestimonial, setActiveTestimonial }) => (
  <section id="testimonials" className="py-28 bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 relative overflow-hidden">
    {/* Simplified background elements */}
    <div className="container mx-auto px-4 relative z-10">
      <div className="text-center mb-16">
        <div className="inline-block">
          <span className="px-3 py-1 bg-white/10 backdrop-blur-sm text-blue-100 text-sm font-medium rounded-full border border-white/20">
            Client Feedback
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
          What Our Clients Say
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mt-6"></div>
      </div>
      
      <div className="max-w-6xl mx-auto">
        {/* Testimonial cards with simplified animations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={cn(
                "bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-xl p-8 border transition-all duration-500",
                index === activeTestimonial 
                  ? "transform scale-105 shadow-xl border-blue-500/30" 
                  : "border-white/10 hover:bg-white/15 hover:-translate-y-2 cursor-pointer"
              )}
              onClick={() => setActiveTestimonial(index)}
            >
              {/* Simplified quote mark */}
              <div className="mb-6 flex justify-center">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 w-12 h-12 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
              </div>
              
              {/* Rating stars */}
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current mx-0.5" />
                ))}
              </div>
              
              {/* Quote */}
              <p className="text-white/90 text-lg mb-6 italic leading-relaxed text-center">
                "{testimonial.quote}"
              </p>
              
              {/* Client info */}
              <div className="mt-6 pt-6 border-t border-white/10 text-center">
                <p className="font-semibold text-white text-xl mb-1">{testimonial.name}</p>
                <p className="text-blue-200/70">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Simplified navigation */}
        <div className="flex justify-center space-x-3 mt-10">
          {testimonials.map((_, index) => (
            <button 
              key={index}
              onClick={() => setActiveTestimonial(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === activeTestimonial 
                  ? 'bg-blue-500 scale-125' 
                  : 'bg-white/30 hover:bg-white/50'
              )}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  </section>
);

// FAQ Section - extracted component
const FAQSection = () => (
  <section className="py-28 bg-white relative overflow-hidden">
    <div className="container mx-auto px-4 relative z-10">
      <div className="text-center mb-16">
        <div className="inline-block">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            Got Questions?
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
          Frequently Asked <span className="text-blue-700">Questions</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto mt-6"></div>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-6">
          <AccordionItem value="item-1" className="bg-white rounded-xl shadow-md border-l-4 border-blue-600 overflow-hidden">
            <AccordionTrigger className="px-6 py-5 hover:bg-blue-50/50 text-lg font-medium transition-all">
              Where can I book international flight tickets in Pattukottai?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-5 text-gray-600">
              Aasia Consultancy is Pattukottai's premier agency for booking international flight tickets. We offer competitive rates, flexible booking options, and complete assistance with your travel plans.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2" className="bg-white rounded-xl shadow-md border-l-4 border-blue-600 overflow-hidden">
            <AccordionTrigger className="px-6 py-5 hover:bg-blue-50/50 text-lg font-medium transition-all">
              Who provides visa services in Pattukottai?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-5 text-gray-600">
              Aasia Consultancy offers comprehensive visa services in Pattukottai for tourist, business, and student visas. Our experienced team handles all documentation and provides guidance throughout the application process.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3" className="bg-white rounded-xl shadow-md border-l-4 border-blue-600 overflow-hidden">
            <AccordionTrigger className="px-6 py-5 hover:bg-blue-50/50 text-lg font-medium transition-all">
              How to apply for a passport easily near me?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-5 text-gray-600">
              For hassle-free passport application in Pattukottai, visit Aasia Consultancy. We handle new applications, renewals, and replacements with complete documentation assistance, verification, and tracking services.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4" className="bg-white rounded-xl shadow-md border-l-4 border-blue-600 overflow-hidden">
            <AccordionTrigger className="px-6 py-5 hover:bg-blue-50/50 text-lg font-medium transition-all">
              What are the charges for travel consultancy in Pattukottai?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-5 text-gray-600">
              At Aasia Consultancy in Pattukottai, our travel consultancy fees vary based on your requirements. We offer free initial consultations, with affordable packages for comprehensive travel planning. Contact us for a customized quote.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-5" className="bg-white rounded-xl shadow-md border-l-4 border-blue-600 overflow-hidden">
            <AccordionTrigger className="px-6 py-5 hover:bg-blue-50/50 text-lg font-medium transition-all">
              How do I find overseas job opportunities through Aasia Consultancy?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-5 text-gray-600">
              Our foreign agent services connect job seekers with legitimate overseas employment opportunities. Visit our office in Pattukottai for a consultation where we can assess your qualifications and match you with suitable positions abroad.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  </section>
);

// Owner Section - extracted component
const OwnerSection = () => (
  <section className="py-28 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
    <div className="container mx-auto px-4 relative z-10">
      <div className="text-center mb-16">
        <div className="inline-block">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            Meet Our Founder
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
          The <span className="text-blue-700">Leadership</span> Behind Aasia Consultancy
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto mt-6"></div>
      </div>
      
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Owner Image with optimized loading */}
          <div className="w-full md:w-1/2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&q=75&fit=crop&w=600" 
                  alt="Aasia Consultancy Founder" 
                  className="w-full h-auto object-cover"
                  width="600"
                  height="800"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          
          {/* Owner details */}
          <div className="w-full md:w-1/2">
            <h3 className="text-3xl font-bold text-gray-900 mb-3">Rahul Singh</h3>
            <p className="text-blue-700 text-lg font-medium mb-6">Founder & CEO</p>
            
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              With over 20 years of experience in the travel industry, Rahul founded Aasia Consultancy in 2010 with a vision to provide exceptional travel services to the people of Pattukottai.
            </p>
            
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              His extensive knowledge of travel documentation, visa procedures, and international travel regulations has helped thousands of clients fulfill their travel dreams with ease and confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 shadow-lg group">
                Contact Directly
                <ArrowRightIcon className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              {/* Contact information with icons */}
              <div className="flex items-center gap-6">
                <a href="tel:+919876543210" className="flex items-center gap-2 text-gray-700 hover:text-blue-700 transition-colors">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <PhoneIcon className="w-4 h-4 text-blue-700" />
                  </div>
                  <span>+91 98765 43210</span>
                </a>
                
                <a href="mailto:founder@aasiaconsultancy.com" className="flex items-center gap-2 text-gray-700 hover:text-blue-700 transition-colors">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <InfoIcon className="w-4 h-4 text-blue-700" />
                  </div>
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Location information - with optimized map loading */}
        <div className="mt-20 bg-blue-50 p-8 rounded-2xl shadow-lg border border-blue-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Visit Our Office</h3>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-2/3 h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15758.141134665786!2d79.3134068!3d10.4349715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5532b3deaf51f3%3A0x7f48afb11d8b23d4!2sPattukottai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1621234567890!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                title="Aasia Consultancy Location"
                className="grayscale"
              ></iframe>
            </div>
            <div className="w-full md:w-1/3">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-3 rounded-lg text-white">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">Our Address</h4>
                  <p className="text-gray-600 mt-1">Aasia Consultancy,<br/>Main Street, Pattukottai,<br/>Tamil Nadu, India</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-3 rounded-lg text-white">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">Business Hours</h4>
                  <p className="text-gray-600 mt-1">Monday to Saturday<br/>9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Footer - extracted component
const Footer = ({ scrollToSection }) => (
  <footer className="bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 text-white">
    <div className="container mx-auto px-4">
      {/* Main Footer Content */}
      <div className="py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-2 rounded-lg">
              <GlobeIcon className="text-white h-6 w-6" />
            </div>
            <span className="font-bold text-2xl text-white">Aasia Consultancy</span>
          </div>
          
          <p className="text-blue-200/80 mb-6 leading-relaxed">
            Your trusted travel partner in Pattukottai, providing comprehensive travel services since 2010. 
            We make your journey seamless from documentation to destination.
          </p>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-6 text-white">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <button onClick={() => scrollToSection('home')} className="text-blue-200/80 hover:text-white transition-colors flex items-center">
                <ChevronRightIcon className="w-4 h-4 mr-2" />
                <span>Home</span>
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('about')} className="text-blue-200/80 hover:text-white transition-colors flex items-center">
                <ChevronRightIcon className="w-4 h-4 mr-2" />
                <span>About Us</span>
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('services')} className="text-blue-200/80 hover:text-white transition-colors flex items-center">
                <ChevronRightIcon className="w-4 h-4 mr-2" />
                <span>Services</span>
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('testimonials')} className="text-blue-200/80 hover:text-white transition-colors flex items-center">
                <ChevronRightIcon className="w-4 h-4 mr-2" />
                <span>Testimonials</span>
              </button>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-6 text-white">Services</h3>
          <ul className="space-y-3">
            {services.map((service, index) => (
              <li key={index}>
                <button onClick={() => scrollToSection('services')} className="text-blue-200/80 hover:text-white transition-colors flex items-center">
                  <ChevronRightIcon className="w-4 h-4 mr-2" />
                  <span>{service.title}</span>
                </button>
              </li>
            ))}
            <li>
              <button onClick={() => scrollToSection('services')} className="text-blue-200/80 hover:text-white transition-colors flex items-center">
                <ChevronRightIcon className="w-4 h-4 mr-2" />
                <span>Visa Services</span>
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('services')} className="text-blue-200/80 hover:text-white transition-colors flex items-center">
                <ChevronRightIcon className="w-4 h-4 mr-2" />
                <span>Overseas Jobs</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Footer Bottom */}
      <div className="py-8 border-t border-white/10 text-center">
        <p className="text-blue-200/80">
          &copy; {new Date().getFullYear()} Aasia Consultancy. All Rights Reserved.
        </p>
      </div>
    </div>
  </footer>
);

const Landing: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});

  // Handle scroll effect for sticky header with throttling for performance
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
      
      // Check which sections are visible (optimized)
      const sections = ["home", "about", "services", "testimonials"];
      const newVisibleSections: Record<string, boolean> = {};
      
      sections.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
          newVisibleSections[id] = isVisible;
        }
      });
      
      setVisibleSections(newVisibleSections);
    };
    
    // Throttle scroll event for better performance
    let timeout: number;
    const throttledScroll = () => {
      if (!timeout) {
        timeout = window.setTimeout(() => {
          handleScroll();
          timeout = 0;
        }, 100);
      }
    };
    
    window.addEventListener("scroll", throttledScroll);
    handleScroll(); // Check initially
    
    return () => {
      window.removeEventListener("scroll", throttledScroll);
      window.clearTimeout(timeout);
    };
  }, []);

  // Automatic testimonial rotation - optimized
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 overflow-hidden">
      {/* Navigation bar */}
      <Navigation 
        isScrolled={isScrolled}
        visibleSections={visibleSections}
        scrollToSection={scrollToSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* Hero Section */}
      <HeroSection scrollToSection={scrollToSection} heroRef={heroRef} />

      {/* About Section */}
      <AboutSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Testimonials Section */}
      <TestimonialsSection 
        activeTestimonial={activeTestimonial} 
        setActiveTestimonial={setActiveTestimonial} 
      />

      {/* FAQ Section */}
      <FAQSection />

      {/* Owner Section */}
      <OwnerSection />

      {/* Footer */}
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
};

export default Landing;

