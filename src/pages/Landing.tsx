import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  LuggageIcon,
  TicketIcon,
  CompassIcon,
  HotelIcon,
  EarthIcon,
  CameraIcon,
  MenuIcon
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

const testimonials = [
  {
    quote: "Aasia Consultancy made our international trip hassle-free. Their visa and flight booking services are excellent!",
    name: "Ramesh Kumar",
    location: "Chennai",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format"
  },
  {
    quote: "I got my passport renewed through Aasia in just 7 days. Their expertise in documentation saved me a lot of time!",
    name: "Priya Sharma",
    location: "Thanjavur",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format"
  },
  {
    quote: "The overseas job consultancy team helped me secure a position in Dubai. Very professional service!",
    name: "Abdul Rahman",
    location: "Pattukottai",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format"
  },
];

const Landing: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Automatic testimonial rotation
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
    <div className="bg-white min-h-screen">
      {/* Navigation Bar */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <GlobeIcon className="text-blue-600 h-6 w-6" />
              <span className="font-bold text-xl text-blue-600">Aasia Consultancy</span>
            </div>
            
            {/* Mobile menu button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <MenuIcon className="h-6 w-6 text-blue-600" />
            </button>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-blue-600">
                Home
              </button>
              <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-blue-600">
                About
              </button>
              <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-blue-600">
                Services
              </button>
              <button onClick={() => scrollToSection('testimonials')} className="text-gray-700 hover:text-blue-600">
                Testimonials
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-blue-600">
                Contact
              </button>
              <Link to="/app">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 ml-4">
                  Client Portal
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 animate-fade-in">
              <div className="flex flex-col space-y-3">
                <button onClick={() => scrollToSection('home')} className="text-left py-2 px-4 hover:bg-blue-50 rounded-md">Home</button>
                <button onClick={() => scrollToSection('about')} className="text-left py-2 px-4 hover:bg-blue-50 rounded-md">About</button>
                <button onClick={() => scrollToSection('services')} className="text-left py-2 px-4 hover:bg-blue-50 rounded-md">Services</button>
                <button onClick={() => scrollToSection('testimonials')} className="text-left py-2 px-4 hover:bg-blue-50 rounded-md">Testimonials</button>
                <button onClick={() => scrollToSection('contact')} className="text-left py-2 px-4 hover:bg-blue-50 rounded-md">Contact</button>
                <Link to="/app" className="py-2 px-4">
                  <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                    Client Portal
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Redesigned Hero Section */}
      <section id="home" className="relative pt-24 min-h-screen flex items-center">
        {/* New geometric background with vibrant gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500 overflow-hidden">
          {/* Abstract geometric shapes */}
          <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl top-1/4 left-1/4 animate-pulse-slow"></div>
          <div className="absolute w-64 h-64 bg-purple-300/20 rounded-full blur-2xl bottom-1/3 right-1/3 animate-pulse-slow" style={{animationDelay: "1s", animationDuration: "7s"}}></div>
          <div className="absolute w-80 h-80 bg-pink-300/20 rounded-full blur-2xl top-1/3 right-1/4 animate-pulse-slow" style={{animationDelay: "2s", animationDuration: "10s"}}></div>
          
          {/* Floating elements with animations */}
          <div className="hidden md:block">
            <div className="absolute top-24 left-[15%] animate-float" style={{animationDuration: "15s"}}>
              <PlaneIcon className="w-14 h-14 text-white/40 transform rotate-45" />
            </div>
            <div className="absolute bottom-32 left-[20%] animate-float" style={{animationDuration: "12s", animationDelay: "1s"}}>
              <LuggageIcon className="w-10 h-10 text-white/30" />
            </div>
            <div className="absolute top-1/2 right-[15%] animate-float" style={{animationDuration: "18s", animationDelay: "2s"}}>
              <TicketIcon className="w-12 h-12 text-white/30 transform -rotate-12" />
            </div>
            <div className="absolute bottom-1/4 right-[25%] animate-float" style={{animationDuration: "20s", animationDelay: "3s"}}>
              <GlobeIcon className="w-16 h-16 text-white/20" />
            </div>
          </div>
          
          {/* Animated mesh grid pattern */}
          <div className="absolute inset-0" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0V0zm2 2v16h16V2H2z' fill='%23ffffff' fill-opacity='0.05'/%3E%3C/svg%3E')"}}></div>
          
          {/* Radial overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/70"></div>
        </div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Left Content - Text and CTA */}
            <div className="w-full md:w-1/2 text-white space-y-8 py-16 md:py-0">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight animate-fade-in" style={{animationDelay: "0.3s"}}>
                  <span className="block">Your Gateway to</span>
                  <span className="block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Seamless Travel</span>
                </h1>
                
                <p className="text-xl md:text-2xl mt-6 text-blue-100 max-w-lg animate-fade-in" style={{animationDelay: "0.6s"}}>
                  Experience hassle-free travel planning with Pattukottai's premier travel consultancy
                </p>
              </div>
              
              <div className="flex flex-wrap gap-6 animate-fade-in" style={{animationDelay: "0.9s"}}>
                <Button 
                  size="lg" 
                  onClick={() => scrollToSection('contact')}
                  className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <span>Contact Us</span>
                  <PhoneIcon className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => scrollToSection('services')}
                  className="border-white text-white hover:bg-white/20 transition-all duration-300"
                >
                  <span>Explore Services</span>
                  <CompassIcon className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              {/* Highlight Icons */}
              <div className="grid grid-cols-3 gap-4 pt-8 animate-fade-in" style={{animationDelay: "1.2s"}}>
                <div className="flex flex-col items-center">
                  <div className="bg-white/10 w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-sm mb-2">
                    <GlobeIcon className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-sm font-medium text-center">Global Service</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-white/10 w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-sm mb-2">
                    <CheckIcon className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-sm font-medium text-center">100% Success</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-white/10 w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-sm mb-2">
                    <CalendarIcon className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-sm font-medium text-center">Quick Process</p>
                </div>
              </div>
            </div>
            
            {/* Right Content - Floating 3D Cards */}
            <div className="w-full md:w-1/2 relative mt-12 md:mt-0 animate-fade-in" style={{animationDelay: "0.6s"}}>
              <div className="relative max-w-xl mx-auto">
                {/* Main Card */}
                <div className="relative z-30 transform transition-all duration-500 hover:rotate-y-6 hover:scale-105 shadow-2xl rounded-xl overflow-hidden mx-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&q=75" 
                    alt="Travel Destinations"
                    className="w-full object-cover h-96"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-2xl font-bold text-white">World-class Service</h3>
                    <p className="text-blue-100">Your journey begins with us</p>
                  </div>
                </div>
                
                {/* Floating Card 1 */}
                <div className="absolute top-14 -left-5 md:-left-20 z-20 transform -rotate-6 shadow-xl rounded-lg overflow-hidden w-48 h-64 animate-float" style={{animationDuration: "10s"}}>
                  <img 
                    src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=300&auto=format&q=75" 
                    alt="Passport and Travel Documents" 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent"></div>
                  <div className="absolute bottom-3 left-3">
                    <FileTextIcon className="text-white w-6 h-6" />
                  </div>
                </div>
                
                {/* Floating Card 2 */}
                <div className="absolute -bottom-5 -right-5 md:-right-10 z-10 transform rotate-6 shadow-xl rounded-lg overflow-hidden w-56 h-40 animate-float" style={{animationDuration: "15s", animationDelay: "2s"}}>
                  <img 
                    src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=300&auto=format&q=75" 
                    alt="Travel Planning" 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent"></div>
                  <div className="absolute bottom-3 left-3">
                    <PlaneIcon className="text-white w-6 h-6" />
                  </div>
                </div>
                
                {/* Glowing Light Effects */}
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-400/30 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce" style={{ animationDuration: "2s" }}>
            <span className="text-white text-sm mb-2">Scroll Down</span>
            <div className="w-6 h-6 border-b-2 border-r-2 border-white transform rotate-45"></div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 transform transition-all duration-500 hover:scale-105">
            <h2 className="text-3xl font-bold text-gray-800">About Aasia Consultancy</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 mb-6"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1577017040065-650ee4d43339" 
                    alt="Aasia Consultancy Office" 
                    className="rounded-lg shadow-lg w-full hover:shadow-2xl transition-shadow duration-300"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg">
                    <p className="font-bold">Established 2010</p>
                    <p className="text-sm">Trusted by 1000+ clients</p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 mt-6 md:mt-0">
                <p className="text-lg text-gray-700 mb-4">
                  Since our establishment, Aasia Consultancy has been the premier travel agency in Pattukottai, Tamil Nadu. 
                  We take pride in providing comprehensive travel solutions tailored to your needs.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Our mission is to make travel planning stress-free by offering personalized service for all your 
                  travel requirements - from booking flights and trains to handling passport and visa services.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
                    <UsersIcon className="text-blue-600 w-5 h-5" />
                    <span className="text-blue-800 font-medium">15+ Expert Consultants</span>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
                    <GlobeIcon className="text-blue-600 w-5 h-5" />
                    <span className="text-blue-800 font-medium">Global Connections</span>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
                    <FileTextIcon className="text-blue-600 w-5 h-5" />
                    <span className="text-blue-800 font-medium">100% Success Rate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with 3 columns only */}
      <section id="services" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Our Services</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We offer a comprehensive range of travel services to make your journey smooth and hassle-free.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Flight Tickets */}
            <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-t-4 border-transparent hover:border-t-blue-600">
              <CardHeader className="pb-2">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <PlaneIcon className="text-blue-700 w-8 h-8 group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <CardTitle>Flight Tickets</CardTitle>
                <CardDescription>Domestic & International</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Book your domestic and international flight tickets through our agency. 
                  We ensure the best prices and routes for your journey.
                </p>
                <Button 
                  variant="outline" 
                  className="text-blue-600 border-blue-600 hover:bg-blue-50 group"
                  onClick={() => scrollToSection('contact')}
                >
                  <span>Book Now</span>
                  <PlaneIcon className="w-4 h-4 ml-1 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Button>
              </CardContent>
            </Card>
            
            {/* Train & Bus Tickets */}
            <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-t-4 border-transparent hover:border-t-blue-600">
              <CardHeader className="pb-2">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <TicketIcon className="text-blue-700 w-8 h-8 group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <CardTitle>Train & Bus Tickets</CardTitle>
                <CardDescription>Convenient Booking</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Hassle-free booking of train and bus tickets for your travels. 
                  Save time and enjoy our efficient service.
                </p>
                <Button 
                  variant="outline" 
                  className="text-blue-600 border-blue-600 hover:bg-blue-50 group"
                  onClick={() => scrollToSection('contact')}
                >
                  <span>Book Now</span>
                  <TicketIcon className="w-4 h-4 ml-1 transition-all group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
            
            {/* Passport Services */}
            <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-t-4 border-transparent hover:border-t-blue-600">
              <CardHeader className="pb-2">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileTextIcon className="text-blue-700 w-8 h-8 group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <CardTitle>Passport Services</CardTitle>
                <CardDescription>New, Renewal & Lost</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Complete assistance with passport applications, renewals, or replacements. 
                  We handle all the paperwork for a smooth process.
                </p>
                <Button 
                  variant="outline" 
                  className="text-blue-600 border-blue-600 hover:bg-blue-50 group"
                  onClick={() => scrollToSection('contact')}
                >
                  <span>Learn More</span>
                  <FileTextIcon className="w-4 h-4 ml-1 transition-all group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Why Choose Aasia Consultancy</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 mb-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="text-blue-700 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Local Expertise</h3>
              <p className="text-gray-600">
                With years of experience in Pattukottai, we understand local travel needs better than anyone.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckIcon className="text-blue-700 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Fast & Reliable</h3>
              <p className="text-gray-600">
                Quick service with attention to detail. We value your time and ensure prompt responses.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CalendarIcon className="text-blue-700 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Affordable Pricing</h3>
              <p className="text-gray-600">
                Quality service at competitive rates. We believe in providing value without compromising quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">What Our Clients Say</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 mb-6"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {/* Testimonial carousel */}
            <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1528127269322-539801943592')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-blue-900/50"></div>
              </div>
              
              {/* Quote icons */}
              <div className="absolute top-4 left-4 text-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/>
                </svg>
              </div>
              
              <div className="px-8 md:px-12 py-12 md:py-16 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Testimonial content slider */}
                  <div className="w-full md:w-3/4 text-white">
                    <div className="relative h-48">
                      {testimonials.map((testimonial, index) => (
                        <div 
                          key={index} 
                          className={`absolute inset-0 transition-all duration-500 ${
                            index === activeTestimonial 
                              ? 'opacity-100 translate-x-0' 
                              : 'opacity-0 translate-x-8'
                          }`}
                        >
                          <p className="text-xl italic mb-6">{testimonial.quote}</p>
                          <div>
                            <p className="font-bold text-lg">{testimonial.name}</p>
                            <p className="text-blue-100">{testimonial.location}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Testimonial navigation */}
                    <div className="flex justify-center md:justify-start space-x-2 mt-6">
                      {testimonials.map((_, index) => (
                        <button 
                          key={index}
                          onClick={() => setActiveTestimonial(index)}
                          className={`w-3 h-3 rounded-full transition-all ${
                            index === activeTestimonial 
                              ? 'bg-white scale-125' 
                              : 'bg-white/40 hover:bg-white/60'
                          }`}
                          aria-label={`View testimonial ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Testimonial image */}
                  <div className="w-full md:w-1/4 flex justify-center">
                    <div className="relative">
                      {testimonials.map((testimonial, index) => (
                        <div 
                          key={index} 
                          className={`absolute inset-0 transition-all duration-500 ${
                            index === activeTestimonial 
                              ? 'opacity-100 scale-100' 
                              : 'opacity-0 scale-90'
                          }`}
                        >
                          <div className="bg-white p-2 rounded-full shadow-lg">
                            <div className="w-32 h-32 rounded-full overflow-hidden">
                              <img 
                                src={testimonial.image} 
                                alt={testimonial.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-8">
                  <Button 
                    onClick={() => scrollToSection('contact')}
                    className="bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700 group"
                  >
                    <span>Join Our Satisfied Clients</span>
                    <CheckIcon className="w-4 h-4 ml-1 group-hover:scale-125 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Frequently Asked Questions</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 mb-6"></div>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-white rounded-lg shadow-sm border-l-4 border-blue-600 hover:shadow-md transition-shadow">
                <AccordionTrigger className="px-6 py-4 hover:bg-blue-50 rounded-t-lg">
                  Where can I book international flight tickets in Pattukottai?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  Aasia Consultancy is Pattukottai's premier agency for booking international flight tickets. We offer competitive rates, flexible booking options, and complete assistance with your travel plans.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="bg-white rounded-lg shadow-sm border-l-4 border-blue-600 hover:shadow-md transition-shadow">
                <AccordionTrigger className="px-6 py-4 hover:bg-blue-50 rounded-t-lg">
                  Who provides visa services in Pattukottai?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  Aasia Consultancy offers comprehensive visa services in Pattukottai for tourist, business, and student visas. Our experienced team handles all documentation and provides guidance throughout the application process.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="bg-white rounded-lg shadow-sm border-l-4 border-blue-600 hover:shadow-md transition-shadow">
                <AccordionTrigger className="px-6 py-4 hover:bg-blue-50 rounded-t-lg">
                  How to apply for a passport easily near me?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  For hassle-free passport application in Pattukottai, visit Aasia Consultancy. We handle new applications, renewals, and replacements with complete documentation assistance, verification, and tracking services.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="bg-white rounded-lg shadow-sm border-l-4 border-blue-600 hover:shadow-md transition-shadow">
                <AccordionTrigger className="px-6 py-4 hover:bg-blue-50 rounded-t-lg">
                  What are the charges for travel consultancy in Pattukottai?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  At Aasia Consultancy in Pattukottai, our travel consultancy fees vary based on your requirements. We offer free initial consultations, with affordable packages for comprehensive travel planning. Contact us for a customized quote.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5" className="bg-white rounded-lg shadow-sm border-l-4 border-blue-600 hover:shadow-md transition-shadow">
                <AccordionTrigger className="px-6 py-4 hover:bg-blue-50 rounded-t-lg">
                  How do I find overseas job opportunities through Aasia Consultancy?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  Our foreign agent services connect job seekers with legitimate overseas employment opportunities. Visit our office in Pattukottai for a consultation where we can assess your qualifications and match you with suitable positions abroad.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Visit our office in Pattukottai or contact us through phone, email, or WhatsApp.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15758.141134665786!2d79.3134068!3d10.4349715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5532b3deaf51f3%3A0x7f48afb11d8b23d4!2sPattukottai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1621234567890!5m2!1sen!2sin"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  title="Aasia Consultancy Location"
                ></iframe>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-4 mr-4">
                    <MapPin className="text-blue-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Address</h3>
                    <p className="text-gray-600">Aasia Consultancy, Main Street, Pattukottai, Tamil Nadu, India</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-4 mr-4">
                    <PhoneIcon className="text-blue-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Phone & WhatsApp</h3>
                    <p className="text-gray-600">+91 98765 43210</p>
                    <p className="text-gray-600">+91 98765 12345</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-4 mr-4">
                    <GlobeIcon className="text-blue-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Email</h3>
                    <p className="text-gray-600">info@aasiaconsultancy.com</p>
                    <p className="text-gray-600">support@aasiaconsultancy.com</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center mt-6">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 shadow-lg group"
                  onClick={() => window.location.href = "mailto:info@aasiaconsultancy.com"}
                >
                  <span>Email Us Now</span>
                  <InfoIcon className="w-4 h-4 ml-2 group-hover:animate-bounce" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <GlobeIcon className="w-6 h-6 mr-2" /> 
                Aasia Consultancy
              </h3>
              <p className="text-gray-400">Your trusted travel partner in Pattukottai, providing comprehensive travel services since 2010.</p>
              
              {/* Social Icons */}
              <div className="flex space-x-4 mt-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.597 0-2.917-.01-3.96-.058-1.064-.045-1.791-.207-2.427-.465-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.023-.06-1.379-.06-3.808v-.63c0-2.597.01-2.917.058-3.96.045-.976.207-1.505.344-1.858.182-.466.399-.8.748-1.15.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 01-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 01-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 01 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a onClick={() => scrollToSection('home')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Home</a></li>
                <li><a onClick={() => scrollToSection('about')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">About Us</a></li>
                <li><a onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Services</a></li>
                <li><a onClick={() => scrollToSection('testimonials')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Testimonials</a></li>
                <li><a onClick={() => scrollToSection('contact')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li><a onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Flight Booking</a></li>
                <li><a onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Passport Services</a></li>
                <li><a onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Visa Services</a></li>
                <li><a onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Foreign Jobs</a></li>
                <li><a onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Travel Consultancy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} Aasia Consultancy. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
