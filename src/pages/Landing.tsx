
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
    location: "Chennai"
  },
  {
    quote: "I got my passport renewed through Aasia in just 7 days. Their expertise in documentation saved me a lot of time!",
    name: "Priya Sharma",
    location: "Thanjavur"
  },
  {
    quote: "The overseas job consultancy team helped me secure a position in Dubai. Very professional service!",
    name: "Abdul Rahman",
    location: "Pattukottai"
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

      {/* Redesigned Premium Hero Section */}
      <section id="home" className="relative pt-20 min-h-screen flex items-center">
        {/* Premium gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-blue-900 overflow-hidden">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-20" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556l-1.414-1.414L28 0h4zM.284 0l28 28-1.414 1.414L0 2.544v-2.26zM0 5.373l25.456 25.455-1.414 1.415L0 8.2V5.374zm0 5.656l22.627 22.627-1.414 1.414L0 13.86v-2.83zm0 5.656l19.8 19.8-1.415 1.413L0 19.514v-2.83zm0 5.657l16.97 16.97-1.414 1.415L0 25.172v-2.83zM0 28l14.142 14.142-1.414 1.414L0 30.828V28zm0 5.657L11.314 44.97l-1.414 1.414L0 36.485v-2.83zm0 5.657L8.485 47.8l-1.414 1.414L0 42.142v-2.83zm0 5.657l5.657 5.657-1.414 1.415L0 47.8v-2.83zm0 5.657l2.828 2.83-1.414 1.413L0 53.456v-2.83zM54.627 60L30 35.373 5.373 60H8.2L30 38.2 51.8 60h2.827zm-5.656 0L30 41.03 11.03 60h2.828L30 43.858 46.142 60h2.83zm-5.656 0L30 46.686 16.686 60h2.83L30 49.515 40.485 60h2.83zm-5.657 0L30 52.343 22.343 60h2.83L30 55.172 34.828 60h2.83zM32 60l-2-2-2 2h4zM59.716 0l-28 28 1.414 1.414L60 2.544V0h-.284zM60 5.373L34.544 30.828l1.414 1.415L60 8.2V5.374zm0 5.656L37.373 33.656l1.414 1.414L60 13.86v-2.83zm0 5.656l-19.8 19.8 1.415 1.413L60 19.514v-2.83zm0 5.657l-16.97 16.97 1.414 1.415L60 25.172v-2.83zM60 28L45.858 42.142l1.414 1.414L60 30.828V28zm0 5.657L48.686 44.97l1.414 1.414L60 36.485v-2.83zm0 5.657L51.515 47.8l1.414 1.414L60 42.142v-2.83zm0 5.657l-5.657 5.657 1.414 1.415L60 47.8v-2.83zm0 5.657l-2.828 2.83 1.414 1.413L60 53.456v-2.83zM39.9 16.385l1.414-1.414L30 3.658 18.686 14.97l1.415 1.415 9.9-9.9 9.9 9.9zm-2.83 2.828l1.415-1.414L30 9.313 21.515 17.8l1.414 1.413L30 11.8l7.07 7.07zm-2.827 2.83l1.414-1.416L30 14.97l-5.657 5.657 1.414 1.415L30 17.8l4.243 4.242zm-2.83 2.827l1.415-1.414L30 20.626l-2.828 2.83 1.414 1.414L30 23.456l1.414 1.414zM56.87 59.414L58.284 58 30 29.716 1.716 58l1.414 1.414L30 32.544l26.87 26.87z' fill='%23ffffff' fill-opacity='0.15' fill-rule='evenodd'/%3E%3C/svg%3E")}}</div>
          
          {/* Subtle animated light effect */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-400/10 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-300/10 blur-3xl animate-pulse" style={{animationDelay: "1.5s"}}></div>
        </div>
        
        {/* Content Container */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-8">
              <div className="space-y-4 max-w-xl">
                <div className="inline-block">
                  <span className="px-3 py-1 bg-blue-600/30 text-blue-200 text-sm font-medium rounded-full backdrop-blur-sm border border-blue-400/20">
                    Premier Travel Solutions
                  </span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="block">Experience Travel</span>
                  <span className="block mt-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Without Boundaries</span>
                </h1>
                
                <p className="text-lg sm:text-xl text-blue-100/80 max-w-lg">
                  Elevate your journey with Pattukottai's most trusted travel consultancy. Seamless service from documentation to destination.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  onClick={() => scrollToSection('contact')}
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-900/30 transition-all duration-300"
                >
                  Contact Us
                  <PhoneIcon className="w-4 h-4 ml-2" />
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => scrollToSection('services')}
                  className="border-white/30 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 transition-all duration-300"
                >
                  Explore Services
                  <CompassIcon className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              {/* Stats section */}
              <div className="grid grid-cols-3 gap-6 pt-8 mt-6 border-t border-white/10">
                <div>
                  <div className="text-3xl font-bold">15+</div>
                  <div className="text-blue-200/70 text-sm">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">1000+</div>
                  <div className="text-blue-200/70 text-sm">Happy Clients</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">100%</div>
                  <div className="text-blue-200/70 text-sm">Success Rate</div>
                </div>
              </div>
            </div>
            
            {/* Right Content - Premium card display */}
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-80 h-80 rounded-full bg-gradient-to-r from-blue-500/20 to-blue-700/20 blur-3xl"></div>
              </div>
              
              <div className="relative">
                {/* Main card */}
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-xl transform transition-transform duration-500 hover:scale-[1.02] max-w-md mx-auto">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="text-white text-xl font-semibold">Premium Travel Services</h3>
                      <p className="text-blue-100/70">Tailored to your needs</p>
                    </div>
                    <div className="bg-blue-600/30 p-3 rounded-full backdrop-blur-sm">
                      <GlobeIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-500/20 p-2 rounded-full">
                        <CheckIcon className="w-4 h-4 text-blue-300" />
                      </div>
                      <p className="text-white">International Flight Bookings</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-500/20 p-2 rounded-full">
                        <CheckIcon className="w-4 h-4 text-blue-300" />
                      </div>
                      <p className="text-white">Express Passport Services</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-500/20 p-2 rounded-full">
                        <CheckIcon className="w-4 h-4 text-blue-300" />
                      </div>
                      <p className="text-white">Visa Application Assistance</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-500/20 p-2 rounded-full">
                        <CheckIcon className="w-4 h-4 text-blue-300" />
                      </div>
                      <p className="text-white">Overseas Job Consultancy</p>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                      onClick={() => scrollToSection('contact')}
                    >
                      Get Started Now
                    </Button>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -bottom-4 -right-4 w-28 h-28 bg-blue-600/20 rounded-full blur-xl"></div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-400/20 rounded-full blur-lg"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <span className="text-white/70 text-sm mb-2">Scroll Down</span>
          <div className="w-6 h-6 border-b-2 border-r-2 border-white/70 transform rotate-45"></div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
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
                    loading="lazy"
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

      {/* Services Section with 3 columns */}
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

      {/* Redesigned Testimonial Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">What Our Clients Say</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 mb-6"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {/* Premium testimonial carousel */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-lg p-8 shadow-lg border border-gray-100 transition-all duration-500 ${
                    index === activeTestimonial 
                      ? "ring-2 ring-blue-500 ring-offset-2 transform scale-105" 
                      : "hover:shadow-xl hover:-translate-y-1"
                  }`}
                  onClick={() => setActiveTestimonial(index)}
                >
                  {/* Quote mark */}
                  <div className="text-blue-100 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="opacity-30">
                      <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/>
                    </svg>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-700 italic">{testimonial.quote}</p>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-gray-500 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Testimonial navigation */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeTestimonial 
                      ? 'bg-blue-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
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
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('home')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Home</button></li>
                <li><button onClick={() => scrollToSection('about')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">About Us</button></li>
                <li><button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Services</button></li>
                <li><button onClick={() => scrollToSection('testimonials')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Testimonials</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Contact</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Flight Booking</button></li>
                <li><button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Passport Services</button></li>
                <li><button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Visa Services</button></li>
                <li><button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Foreign Jobs</button></li>
                <li><button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Travel Consultancy</button></li>
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

