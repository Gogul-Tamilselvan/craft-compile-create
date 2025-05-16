
import React from "react";
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
import { CheckIcon, GlobeIcon, FileTextIcon, MapPin, CalendarIcon, UsersIcon, PhoneIcon, InfoIcon } from "lucide-react";

const Landing: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1469041797191-50ace28483c3')] bg-cover bg-center" />
        <div className="container mx-auto px-4 py-20 sm:py-28 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-1 text-center md:text-left text-white mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Your Trusted Travel Partner in Pattukottai
              </h1>
              <p className="text-xl mt-4 text-blue-100">
                We make your journey seamless from planning to destination
              </p>
              <div className="mt-8">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  Get Free Consultation
                </Button>
              </div>
            </div>
            <div className="flex-1 flex justify-center md:justify-end">
              <div className="bg-white p-4 rounded-lg shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                  alt="Aasia Consultancy Travel Services" 
                  className="w-full h-auto rounded"
                  width={500}
                  height={375}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">About Aasia Consultancy</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 mb-6"></div>
          </div>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-700">
              Since our establishment, Aasia Consultancy has been the premier travel agency in Pattukottai, Tamil Nadu. 
              We take pride in providing comprehensive travel solutions tailored to your needs.
            </p>
            <p className="text-lg text-gray-700 mt-4">
              Our mission is to make travel planning stress-free by offering personalized service for all your 
              travel requirements - from booking flights and trains to handling passport and visa services.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Our Services</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We offer a comprehensive range of travel services to make your journey smooth and hassle-free.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Flight Tickets */}
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-2">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <GlobeIcon className="text-blue-700 w-6 h-6" />
                </div>
                <CardTitle>Flight Tickets</CardTitle>
                <CardDescription>Domestic & International</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Book your domestic and international flight tickets through our agency. 
                  We ensure the best prices and routes for your journey.
                </p>
                <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                  Book Now
                </Button>
              </CardContent>
            </Card>
            
            {/* Train & Bus Tickets */}
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-2">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <CalendarIcon className="text-blue-700 w-6 h-6" />
                </div>
                <CardTitle>Train & Bus Tickets</CardTitle>
                <CardDescription>Convenient Booking</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Hassle-free booking of train and bus tickets for your travels. 
                  Save time and enjoy our efficient service.
                </p>
                <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                  Book Now
                </Button>
              </CardContent>
            </Card>
            
            {/* Passport Services */}
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-2">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <FileTextIcon className="text-blue-700 w-6 h-6" />
                </div>
                <CardTitle>Passport Services</CardTitle>
                <CardDescription>New, Renewal & Lost</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Complete assistance with passport applications, renewals, or replacements. 
                  We handle all the paperwork for a smooth process.
                </p>
                <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                  Learn More
                </Button>
              </CardContent>
            </Card>
            
            {/* Visa Services */}
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-2">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <FileTextIcon className="text-blue-700 w-6 h-6" />
                </div>
                <CardTitle>Visa Services</CardTitle>
                <CardDescription>Tourist, Business & Student</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Expert guidance for visa applications of all types. We ensure your documentation 
                  is complete and accurate for approval.
                </p>
                <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                  Learn More
                </Button>
              </CardContent>
            </Card>
            
            {/* Foreign Agent Services */}
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-2">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <UsersIcon className="text-blue-700 w-6 h-6" />
                </div>
                <CardTitle>Foreign Agent Services</CardTitle>
                <CardDescription>Overseas Job Consultancy</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Find opportunities abroad with our overseas job consultancy. 
                  We connect you with reputable employers worldwide.
                </p>
                <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                  Learn More
                </Button>
              </CardContent>
            </Card>
            
            {/* Travel Consultancy */}
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-2">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <InfoIcon className="text-blue-700 w-6 h-6" />
                </div>
                <CardTitle>Travel Consultancy</CardTitle>
                <CardDescription>Itinerary Planning</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Get personalized travel plans and advice from our experienced consultants. 
                  We help you create the perfect itinerary.
                </p>
                <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                  Contact Us
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Why Choose Aasia Consultancy</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 mb-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-blue-700 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Local Expertise</h3>
              <p className="text-gray-600">
                With years of experience in Pattukottai, we understand local travel needs better than anyone.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckIcon className="text-blue-700 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast & Reliable</h3>
              <p className="text-gray-600">
                Quick service with attention to detail. We value your time and ensure prompt responses.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarIcon className="text-blue-700 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Affordable Pricing</h3>
              <p className="text-gray-600">
                Quality service at competitive rates. We believe in providing value without compromising quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-blue-600 rounded-lg shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 bg-blue-700">
                <h2 className="text-3xl font-bold text-white mb-4">Get Your Free Consultation</h2>
                <p className="text-blue-100 mb-6">
                  Fill out this form and our team will contact you within 24 hours to discuss your travel needs.
                </p>
                <ul className="space-y-3 text-blue-100">
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 mr-2" />
                    <span>Expert travel advice</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 mr-2" />
                    <span>Best deals on bookings</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="w-5 h-5 mr-2" />
                    <span>Personalized service</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-8 md:p-12 bg-white">
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <Input id="name" placeholder="Full Name" />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <Input id="email" type="email" placeholder="email@example.com" />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <Input id="phone" placeholder="+91 XXXX XXXXX" />
                  </div>
                  
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                      Service Required
                    </label>
                    <select
                      id="service"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select a Service</option>
                      <option value="flight">Flight Booking</option>
                      <option value="train">Train/Bus Booking</option>
                      <option value="passport">Passport Services</option>
                      <option value="visa">Visa Services</option>
                      <option value="job">Foreign Job Consultancy</option>
                      <option value="travel">Travel Consultancy</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message (Optional)
                    </label>
                    <Textarea id="message" placeholder="Tell us about your travel needs..." />
                  </div>
                  
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Get Started Now
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Frequently Asked Questions</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 mb-6"></div>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-white rounded-lg shadow-sm border border-gray-200">
                <AccordionTrigger className="px-6 py-4 hover:bg-blue-50 rounded-t-lg">
                  Where can I book international flight tickets in Pattukottai?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  Aasia Consultancy is Pattukottai's premier agency for booking international flight tickets. We offer competitive rates, flexible booking options, and complete assistance with your travel plans.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="bg-white rounded-lg shadow-sm border border-gray-200">
                <AccordionTrigger className="px-6 py-4 hover:bg-blue-50 rounded-t-lg">
                  Who provides visa services in Pattukottai?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  Aasia Consultancy offers comprehensive visa services in Pattukottai for tourist, business, and student visas. Our experienced team handles all documentation and provides guidance throughout the application process.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="bg-white rounded-lg shadow-sm border border-gray-200">
                <AccordionTrigger className="px-6 py-4 hover:bg-blue-50 rounded-t-lg">
                  How to apply for a passport easily near me?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  For hassle-free passport application in Pattukottai, visit Aasia Consultancy. We handle new applications, renewals, and replacements with complete documentation assistance, verification, and tracking services.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="bg-white rounded-lg shadow-sm border border-gray-200">
                <AccordionTrigger className="px-6 py-4 hover:bg-blue-50 rounded-t-lg">
                  What are the charges for travel consultancy in Pattukottai?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  At Aasia Consultancy in Pattukottai, our travel consultancy fees vary based on your requirements. We offer free initial consultations, with affordable packages for comprehensive travel planning. Contact us for a customized quote.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5" className="bg-white rounded-lg shadow-sm border border-gray-200">
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
      <section className="py-16">
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
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15758.141134665786!2d79.3134068!3d10.4349715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5532b3deaf51f3%3A0x7f48afb11d8b23d4!2sPattukottai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1621234567890!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  title="Aasia Consultancy Location"
                ></iframe>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <MapPin className="text-blue-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Address</h3>
                    <p className="text-gray-600">Aasia Consultancy, Main Street, Pattukottai, Tamil Nadu, India</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <PhoneIcon className="text-blue-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Phone & WhatsApp</h3>
                    <p className="text-gray-600">+91 98765 43210</p>
                    <p className="text-gray-600">+91 98765 12345</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <GlobeIcon className="text-blue-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Email</h3>
                    <p className="text-gray-600">info@aasiaconsultancy.com</p>
                    <p className="text-gray-600">support@aasiaconsultancy.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Aasia Consultancy</h3>
              <p className="text-gray-400">Your trusted travel partner in Pattukottai, providing comprehensive travel services since 2010.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Flight Booking</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Passport Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Visa Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Foreign Jobs</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
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
