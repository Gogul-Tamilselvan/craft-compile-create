
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

const Landing: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
      
      // Check which sections are visible
      const sections = ["home", "about", "services", "testimonials", "contact"];
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
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initially
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 overflow-hidden">
      {/* Premium Navigation Bar */}
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
              {["home", "about", "services", "testimonials", "contact"].map((section) => (
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
                {["home", "about", "services", "testimonials", "contact"].map((section) => (
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

      {/* Premium Hero Section with Animations */}
      <section 
        id="home" 
        className="min-h-screen flex items-center pt-20 relative overflow-hidden"
        ref={heroRef}
      >
        {/* Sophisticated background with subtle animations */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 overflow-hidden">
          {/* Animated particles/stars */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-white/10"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 6 + 2}px`,
                  height: `${Math.random() * 6 + 2}px`,
                  opacity: Math.random() * 0.5 + 0.3,
                  animation: `pulse-slow ${Math.random() * 4 + 3}s infinite ease-in-out ${Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>
          
          {/* Premium gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
          
          {/* Animated blurred spheres */}
          <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-blue-700/20 blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -right-20 w-96 h-96 rounded-full bg-indigo-600/10 blur-3xl animate-float" style={{animationDelay: "2s"}}></div>
        </div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content with animated entrance */}
            <div className="text-white space-y-8 animate-scale-fade-in">
              <div className="space-y-5 max-w-xl">
                {/* Premium badge */}
                <div className="inline-block animate-fade-in" style={{animationDelay: "0.3s"}}>
                  <div className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
                    <span className="text-blue-100 text-sm font-medium">Premier Travel Solutions</span>
                  </div>
                </div>
                
                {/* Heading with gradient and animation */}
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight animate-fade-in" style={{animationDelay: "0.5s"}}>
                  <span className="block">Experience</span>
                  <span className="block mt-2 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
                    Limitless Travel
                  </span>
                </h1>
                
                {/* Subheading with animation */}
                <p className="text-lg sm:text-xl text-blue-100/90 max-w-lg animate-fade-in" style={{animationDelay: "0.7s"}}>
                  Elevate your journey with Pattukottai's most trusted travel consultancy. 
                  From documentation to destination, we make every step of your travel seamless.
                </p>
              </div>
              
              {/* CTA buttons with hover effects */}
              <div className="flex flex-wrap gap-4 animate-fade-in" style={{animationDelay: "0.9s"}}>
                <Button 
                  size="lg" 
                  onClick={() => scrollToSection('contact')}
                  className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-lg hover:shadow-blue-900/30 transition-all duration-300 group"
                >
                  Contact Us
                  <ArrowRightIcon className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => scrollToSection('services')}
                  className="border-white/30 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 transition-all duration-300 group"
                >
                  Our Services
                  <ChevronRightIcon className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
              
              {/* Stats with counters */}
              <div className="grid grid-cols-3 gap-6 pt-8 mt-6 border-t border-white/10 animate-fade-in" style={{animationDelay: "1.1s"}}>
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
            
            {/* Right Content - Premium 3D card effect */}
            <div className="relative hidden lg:flex justify-center perspective-1000 animate-scale-fade-in">
              <div className="w-full max-w-md transform rotate-y-12 hover:rotate-y-0 transition-all duration-700 group">
                {/* Premium card with glass effect */}
                <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-2xl transform transition-all duration-500 group-hover:shadow-blue-500/20">
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
                        style={{animationDelay: `${0.2 * index}s`}}
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
                      onClick={() => scrollToSection('contact')}
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
        
        {/* Animated scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-subtle">
          <div className="flex flex-col items-center text-white/70">
            <span className="text-sm mb-2">Scroll Down</span>
            <div className="w-5 h-5 border-b-2 border-r-2 border-white/70 transform rotate-45"></div>
          </div>
        </div>
      </section>

      {/* About Us Section with Reveal Animations */}
      <section id="about" className="py-28 bg-white relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5 pattern-dots"></div>
        <div className="absolute left-0 top-0 w-full h-24 bg-gradient-to-b from-gray-50 to-transparent"></div>
        
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
                  {/* Main image with shadow and hover effect */}
                  <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl transform transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1577017040065-650ee4d43339" 
                      alt="Aasia Consultancy Office" 
                      className="w-full h-auto rounded-2xl object-cover"
                      loading="lazy"
                    />
                    
                    {/* Premium overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-70"></div>
                  </div>
                  
                  {/* Floating stats card */}
                  <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-blue-700 to-blue-900 text-white p-6 rounded-xl shadow-xl z-20 transform transition-transform duration-500 group-hover:translate-y-2 group-hover:-translate-x-2">
                    <p className="text-2xl font-bold">Since 2010</p>
                    <p className="text-blue-100">Trusted by 1000+ clients</p>
                  </div>
                  
                  {/* Decorative element */}
                  <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-blue-100 rounded-full opacity-30 z-0"></div>
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
                
                {/* Feature boxes with hover animations */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-all duration-300 group">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-3 rounded-lg text-white shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                      <UsersIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">15+ Expert Consultants</h4>
                      <p className="text-sm text-gray-600">Dedicated professionals</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-all duration-300 group">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-3 rounded-lg text-white shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                      <GlobeIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Global Connections</h4>
                      <p className="text-sm text-gray-600">Worldwide partnerships</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-all duration-300 group">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-3 rounded-lg text-white shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                      <FileTextIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">100% Success Rate</h4>
                      <p className="text-sm text-gray-600">Guaranteed results</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-all duration-300 group">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-3 rounded-lg text-white shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
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

      {/* Services Section with Cards */}
      <section id="services" className="py-28 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-100 opacity-40"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-100 opacity-30"></div>
        
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
          
          {/* Premium service cards with hover effects */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group"
                style={{
                  animationDelay: `${index * 0.2}s`
                }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg h-full transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl border border-gray-100 hover:border-blue-100 flex flex-col">
                  <div className={`mb-6 bg-gradient-to-r ${service.color} w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transform transition-all duration-500`}>
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
                    onClick={() => scrollToSection('contact')}
                  >
                    <span>Learn More</span>
                    <ArrowRightIcon className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Additional services in 3-column grid */}
          <div className="mt-16 pt-16 border-t border-gray-200">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900">Additional Services</h3>
              <p className="text-gray-600 mt-2">Comprehensive solutions for all your travel needs</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileTextIcon className="text-blue-700 w-6 h-6" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Visa Services</h4>
                <p className="text-gray-600">Expert assistance for all types of visa applications with high success rate.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GlobeIcon className="text-blue-700 w-6 h-6" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Overseas Jobs</h4>
                <p className="text-gray-600">Connect with international employers through our professional job consultancy.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckIcon className="text-blue-700 w-6 h-6" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Travel Insurance</h4>
                <p className="text-gray-600">Comprehensive travel insurance packages for worry-free journeys.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section with Statistics */}
      <section className="py-28 bg-white relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-gray-50 to-white"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                Our Advantage
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
              Why Choose <span className="text-blue-700">Aasia Consultancy</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto mt-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg text-center border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                <MapPin className="text-white w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Local Expertise</h3>
              <p className="text-gray-600">
                With years of experience in Pattukottai, we understand local travel needs better than anyone.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg text-center border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl md:mt-8">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                <CheckIcon className="text-white w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Fast & Reliable</h3>
              <p className="text-gray-600">
                Quick service with attention to detail. We value your time and ensure prompt responses.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg text-center border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                <CalendarIcon className="text-white w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Affordable Pricing</h3>
              <p className="text-gray-600">
                Quality service at competitive rates. We believe in providing value without compromising quality.
              </p>
            </div>
          </div>
          
          {/* Statistics counter section */}
          <div className="mt-24 max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-100">
                <div className="text-4xl font-bold text-blue-800 mb-2">15+</div>
                <p className="text-gray-600">Years of Experience</p>
              </div>
              
              <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-100">
                <div className="text-4xl font-bold text-blue-800 mb-2">5000+</div>
                <p className="text-gray-600">Happy Travelers</p>
              </div>
              
              <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-100">
                <div className="text-4xl font-bold text-blue-800 mb-2">20+</div>
                <p className="text-gray-600">Countries Covered</p>
              </div>
              
              <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-100">
                <div className="text-4xl font-bold text-blue-800 mb-2">99%</div>
                <p className="text-gray-600">Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Redesigned Premium Testimonial Section */}
      <section id="testimonials" className="py-28 bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          {/* Subtle dot pattern overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.15) 2px, transparent 2px)",
            backgroundSize: "30px 30px"
          }}></div>
          
          {/* Animated blurred spheres */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl animate-pulse-slow" style={{animationDelay: "1.5s"}}></div>
        </div>
        
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
            {/* Premium testimonial carousel */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className={cn(
                    "bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/10 transition-all duration-500",
                    index === activeTestimonial 
                      ? "transform scale-105 shadow-xl border-blue-500/30" 
                      : "hover:bg-white/15 hover:-translate-y-2 cursor-pointer"
                  )}
                  onClick={() => setActiveTestimonial(index)}
                >
                  {/* Premium quote mark */}
                  <div className="mb-6">
                    <svg className="w-12 h-12 text-white/10" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path>
                    </svg>
                  </div>
                  
                  {/* Rating stars */}
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <p className="text-white/90 text-lg mb-6 italic leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  
                  {/* Client info */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-white">{testimonial.name}</p>
                        <p className="text-blue-200/70">{testimonial.location}</p>
                      </div>
                      
                      {/* Animated indicator for active testimonial */}
                      {index === activeTestimonial && (
                        <div className="w-3 h-3 rounded-full bg-blue-500 relative">
                          <span className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-75"></span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Testimonial navigation */}
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

      {/* FAQ Section with Animated Accordions */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white opacity-70"></div>
        
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

      {/* Premium Contact Section */}
      <section id="contact" className="py-28 bg-gradient-to-br from-gray-50 to-white relative">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-50"></div>
          <div className="absolute -bottom-48 -left-48 w-96 h-96 rounded-full bg-blue-50"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                Get in Touch
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
              Contact <span className="text-blue-700">Us</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto mt-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-6">
              Visit our office in Pattukottai or contact us through phone, email, or WhatsApp.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Map with premium shadow */}
            <div className="h-full">
              <div className="rounded-xl overflow-hidden shadow-2xl h-full hover:shadow-blue-200 transition-shadow duration-300 border border-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15758.141134665786!2d79.3134068!3d10.4349715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5532b3deaf51f3%3A0x7f48afb11d8b23d4!2sPattukottai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1621234567890!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "400px" }}
                  allowFullScreen={true}
                  loading="lazy"
                  title="Aasia Consultancy Location"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                ></iframe>
              </div>
            </div>
            
            {/* Contact cards */}
            <div className="space-y-6">
              {/* Contact Form */}
              <Card className="overflow-hidden shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                  <CardTitle>Send us a message</CardTitle>
                  <CardDescription className="text-blue-100">We'll get back to you within 24 hours</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Input placeholder="Your Name" className="border-gray-300 focus:border-blue-500" />
                      </div>
                      <div className="space-y-2">
                        <Input placeholder="Email Address" type="email" className="border-gray-300 focus:border-blue-500" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Input placeholder="Subject" className="border-gray-300 focus:border-blue-500" />
                    </div>
                    <div className="space-y-2">
                      <Textarea placeholder="Your Message" className="border-gray-300 focus:border-blue-500 min-h-[120px]" />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              {/* Contact Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-3 rounded-lg shadow-md text-white">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">Our Address</h3>
                      <p className="text-gray-600 mt-1">Aasia Consultancy,<br/>Main Street, Pattukottai,<br/>Tamil Nadu, India</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-3 rounded-lg shadow-md text-white">
                      <PhoneIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">Contact Info</h3>
                      <p className="text-gray-600 mt-1">+91 98765 43210<br/>info@aasiaconsultancy.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Footer with Gradient */}
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
              
              {/* Social Icons with hover effects */}
              <div className="flex space-x-4">
                <a href="#" className="bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full" aria-label="Facebook">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                  </svg>
                </a>
                <a href="#" className="bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full" aria-label="Instagram">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path>
                  </svg>
                </a>
                <a href="#" className="bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full" aria-label="Twitter">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                  </svg>
                </a>
                <a href="#" className="bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full" aria-label="LinkedIn">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                  </svg>
                </a>
              </div>
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
                <li>
                  <button onClick={() => scrollToSection('contact')} className="text-blue-200/80 hover:text-white transition-colors flex items-center">
                    <ChevronRightIcon className="w-4 h-4 mr-2" />
                    <span>Contact</span>
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
    </div>
  );
};

export default Landing;
