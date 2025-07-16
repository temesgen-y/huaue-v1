import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// Import multiple hero images
import hero1 from "@assets/slide 2_1751240134537.jpg";
import hero2 from "@assets/slide 3_1751240146995.jpg";
import hero3 from "@assets/slide 4_1751240163800.jpg";
import hero4 from "@assets/slide 5_1751240176316.jpg";
import hero5 from "@assets/slide 6_1751240188332.jpg";
import hero6 from "@assets/slide 7_1751240220078.jpg";
import hero7 from "@assets/slide 12_1751240241545.jpg";
import hero8 from "@assets/slide 12_1751240295668.jpg";
import hero9 from "@assets/slide 15_1751240334608.jpg";
import hero10 from "@assets/slide 17_1751240311394.jpg";
// Import product line images
import eiderProductImage from "@assets/eider_1751242269580.jpg";
import huayueProductImage from "@assets/huaye_1751242280886.jpg";
// Import client logos
import constructionCorpLogo from "../assets/clients/construction-corp.svg";
import industrialSystemsLogo from "../assets/clients/industrial-systems.svg";
import petrotechLogo from "../assets/clients/petrotech.svg";
import waterWorksLogo from "../assets/clients/water-works.svg";
import infrastructureLtdLogo from "../assets/clients/infrastructure-ltd.svg";
import manufacturingGroupLogo from "../assets/clients/manufacturing-group.svg";
import energySolutionsLogo from "../assets/clients/energy-solutions.svg";
import pipelineEngineeringLogo from "../assets/clients/pipeline-engineering.svg";
import globalUtilitiesLogo from "../assets/clients/global-utilities.svg";
// Import CTA banner image
import ctaBannerImage from "../assets/images/cta-banner.svg";
import {
  CheckCircle,
  Cog,
  Bolt,
  ArrowRight,
  Quote,
  Globe,
  Wrench,
} from "lucide-react";
import Marquee from "react-fast-marquee";

export default function Home() {
  // Hero slides configuration using multiple authentic images
  const heroSlides = [
    {
      image: hero1,
      title: "HUAYUE PLASTICS",
      subtitle: "INDUSTRY",
      description: "Leading manufacturer of high-quality PP-R pipes and fittings with organized warehouse storage and professional inventory management.",
    },
    {
      image: hero2,
      title: "PREMIUM QUALITY",
      subtitle: "PIPING SOLUTIONS",
      description: "ISO 15874 certified products manufactured with high-quality Korean PP-R resin for superior strength and durability.",
    },
    {
      image: hero3,
      title: "INDUSTRIAL",
      subtitle: "EXCELLENCE",
      description: "Professional warehouse storage and inventory management system ensuring reliable supply chain operations.",
    },
    {
      image: hero4,
      title: "ADVANCED",
      subtitle: "MANUFACTURING",
      description: "State-of-the-art production facilities with cutting-edge technology for precision pipe and fitting manufacturing.",
    },
    {
      image: hero5,
      title: "QUALITY",
      subtitle: "ASSURANCE",
      description: "Rigorous testing and quality control processes ensuring every product meets international standards and specifications.",
    },
    {
      image: hero6,
      title: "GLOBAL",
      subtitle: "DISTRIBUTION",
      description: "Worldwide supply chain network delivering reliable piping solutions to construction and industrial projects globally.",
    },
    {
      image: hero7,
      title: "INNOVATIVE",
      subtitle: "SOLUTIONS",
      description: "Cutting-edge pipe technology and fitting designs engineered for modern infrastructure and industrial applications.",
    },
    {
      image: hero8,
      title: "TRUSTED",
      subtitle: "PARTNERSHIP",
      description: "Decades of experience serving contractors, engineers, and industrial clients with reliable piping system solutions.",
    },
    {
      image: hero9,
      title: "SUSTAINABLE",
      subtitle: "MANUFACTURING",
      description: "Environmentally responsible production processes and recyclable materials supporting green construction initiatives.",
    },
    {
      image: hero10,
      title: "TECHNICAL",
      subtitle: "EXPERTISE",
      description: "Professional engineering support and technical consultation for complex piping system design and installation.",
    },
  ];

  const testimonials = [
    {
      quote:
        "HUAYUE pipes exceeded our expectations in both durability and delivery time. A reliable partner for industrial infrastructure projects.",
      name: "Amanuel Getachew",
      title: "Senior Engineer, EthioInfra Solutions",
      image: "/team-ceo.png",
    },
    {
      quote:
        "The EIDER fittings were critical for maintaining clean standards in our pharmaceutical pipeline. Precision and reliability at its best.",
      name: "Dr. Meseret Taye",
      title: "Director of Operations, Medpharm Manufacturing",
      image: "/team-cto.png",
    },
    {
      quote:
        "Excellent quality and on-time delivery. We've used HUAYUE products in several projects across the region—always with great results.",
      name: "Muluwork Desta",
      title: "Procurement Lead, Addis Construction Group",
      image: "/team-coo.png",
    },
    {
      quote:
        "HUAYUE pipes exceeded our expectations in both durability and delivery time. A reliable partner for industrial infrastructure projects.",
      name: "Amanuel Getachew",
      title: "Senior Engineer, EthioInfra Solutions",
      image: "/team-ceo.png",
    },
    {
      quote:
        "The EIDER fittings were critical for maintaining clean standards in our pharmaceutical pipeline. Precision and reliability at its best.",
      name: "Dr. Meseret Taye",
      title: "Director of Operations, Medpharm Manufacturing",
      image: "/team-cto.png",
    },
    {
      quote:
        "Excellent quality and on-time delivery. We've used HUAYUE products in several projects across the region—always with great results.",
      name: "Muluwork Desta",
      title: "Procurement Lead, Addis Construction Group",
      image: "/team-coo.png",
    },
  ];



  return (
    <div>
      {/* Hero Section with Swiper Carousel */}
      <section className="relative text-white overflow-hidden h-screen">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ 
            delay: 3500,
            disableOnInteraction: false 
          }}
          loop={true}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ 
            clickable: true 
          }}
          navigation={true}
          className="h-full"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
                
                {/* Background image */}
                <img
                  src={slide.image}
                  alt={`HUAYUE hero slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Content overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="text-center max-w-4xl mx-auto px-4">
                    <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6">
                      <span className="text-white">
                        {slide.title}
                      </span>
                      <span className="text-primary">
                        {" "}
                        {slide.subtitle}
                      </span>
                    </h1>
                    <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 mb-6 sm:mb-8 leading-relaxed">
                      {slide.description}
                    </p>
                    <div className="flex justify-center">
                      <Link href="/products">
                        <Button className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 hover:scale-105 transition-all duration-300 shadow-lg">
                          View Products
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Company Introduction */}
      <section className="py-16 lg:py-24 bg-pipe-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-6">
                HUAYUE PLASTICS INDUSTRY
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                HUAYUE PLASTICS INDUSTRY P.L.C. produces two major product
                brands: EIDER and HUAYUE PP-R pipes and fittings. The factory
                has the capability to manufacture PP-R pipes and fittings
                ranging from 20mm to 50mm in diameter, with pressure ratings of
                PN20 and PN16
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Committed to quality and reliability, EIDER and HUAYUE PP-R
                products comply with ISO 15874 standards and are manufactured
                using high-quality Korean-origin PP-R resin, ensuring superior
                strength, durability, and safety for both hot and cold water
                applications. HUAYUE PLASTICS INDUSTRY P.L.C. operates alongside
                its sister company, HUAXU Textile Industry, within the same
                industrial compound, reinforcing its commitment to excellence
                across multiple sectors.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                HUAYUE PLASTICS INDUSTRY P.L.C. operates alongside its sister
                company, HUAXU Textile Industry, within the same industrial
                compound, reinforcing its commitment to excellence across
                multiple sectors.
              </p>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="text-accent text-xl mr-3" />
                  <span className="text-slate-700">ISO 15874 standards</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-accent text-xl mr-3" />
                  <span className="text-slate-700">24/7 Support</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-accent text-xl mr-3" />
                  <span className="text-slate-700">
                    Regional delivery available across selected areas
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-accent text-xl mr-3" />
                  <span className="text-slate-700">Custom Solutions</span>
                </div>
              </div>

              <Link href="/about">
                <Button className="bg-primary hover:bg-blue-800 text-white font-semibold px-8 py-3 h-auto shadow-lg hover:shadow-xl">
                  Learn More About Us
                </Button>
              </Link>
            </div>

            <div className="mt-12 lg:mt-0">
              <div className="overflow-hidden rounded-xl shadow-2xl">
                <img
                  src="/showroom-display.jpg"
                  alt="Modern industrial piping facility"
                  className="w-full h-[400px] md:h-[600px] object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose HUAYUE PLASTICS INDUSTRY */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Why Choose HUAYUE PLASTICS INDUSTRY
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Key advantages that set us apart from the competition
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Quality Assurance Card */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                Premium Quality:
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Manufactured using state-of-the-art technology with strict
                quality control.
              </p>
            </div>

            {/* Industry Experience Card */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <ArrowRight className="h-12 w-12 text-blue-500 transform rotate-45" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                Reliable Performance
              </h3>
              <p className="text-slate-600 leading-relaxed">
                High durability and resistance against wear and tear.
              </p>
            </div>

            {/* Certified Products Card */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <Cog className="h-12 w-12 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                Comprehensive Product Range:
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Covering all plumbing needs from piping to fittings and valves.
              </p>
            </div>

            {/* Reliable Support Card */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <Bolt className="h-12 w-12 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                Cost-Effective Solutions:
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Long-lasting materials reduce maintenance and replacement costs.
              </p>
            </div>

            {/* Global Reach Card */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <Globe className="h-12 w-12 text-indigo-500" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                Eco-Friendly Materials:
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Safe for potable water and environmentally sustainable.
              </p>
            </div>

            {/* Custom Solutions Card */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <Wrench className="h-12 w-12 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                Excellent Customer Support
              </h3>
              <p className="text-slate-600 leading-relaxed">
                A dedicated team for technical assistance and sales inquiries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Our Product Lines
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              HUAYUE PLASTICS INDUSTRY P.L.C. Specializes in producing
              high-quality PPR pipes and fittings designed for long-lasting and
              efficient plumbing solutions. Our products are suitable for a wide
              range of applications, including residential, commercial, and
              industrial water supply systems. Manufactured with the highest
              standards, our pipes and fittings ensure superior performance,
              ease of installation, and environmental safety
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* HUAYUE Products */}
            <Card className="overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <img
                src={huayueProductImage}
                alt="Overview of HUAYUE and EIDER product lines"
                className="w-full h-64 object-cover"
              />
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Cog className="text-primary text-2xl mr-3" />
                  <h3 className="text-2xl font-bold text-slate-800">HUAYUE</h3>
                </div>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  HUAYUE PP-R pipes and fittings designed for extreme industrial
                  conditions. Built to withstand high pressure and corrosive
                  environments with exceptional durability.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-slate-600">
                    <CheckCircle className="text-green-500 text-sm mr-2" />
                    High Durability: Resistant to corrosion, chemicals, and
                    scaling, ensuring longevity in various applications
                  </li>
                  <li className="flex items-center text-slate-600">
                    <CheckCircle className="text-green-500 text-sm mr-2" />
                    Heat Resistance:
                  </li>
                  <li className="flex items-center text-slate-600">
                    <CheckCircle className="text-green-500 text-sm mr-2" />
                    Pressure Resistance
                  </li>
                </ul>
                <Link href="/products/huayue">
                  <Button className="w-full bg-primary hover:bg-green-600 text-white font-semibold">
                    Explore HUAYUE Products
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* EIDER Products */}
            <Card className="overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <img
                src={eiderProductImage}
                alt="Overview of HUAYUE and EIDER product lines"
                className="w-full h-64 object-cover"
              />
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Bolt className="text-accent text-2xl mr-3" />
                  <h3 className="text-2xl font-bold text-slate-800">EIDER</h3>
                </div>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Precision-engineered piping systems for pharmaceutical, food
                  processing, and clean energy applications. Designed for
                  absolute purity and reliability.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-slate-600">
                    <CheckCircle className="text-green-500 text-sm mr-2" />
                    Lightweight & Easy Installation:
                  </li>
                  <li className="flex items-center text-slate-600">
                    <CheckCircle className="text-green-500 text-sm mr-2" />
                    Pressure Resistance:
                  </li>
                  <li className="flex items-center text-slate-600">
                    <CheckCircle className="text-green-500 text-sm mr-2" />
                    Low Thermal Conductivity:Reduces heat loss in hot water
                    systems, improving energy efficiency
                  </li>
                </ul>
                <Link href="/products/eider">
                  <Button className="w-full bg-accent hover:bg-blue-600 text-white font-semibold">
                    Explore EIDER Systems
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Quality Assurance Process Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Our Quality Assurance Process
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Rigorous testing and validation at every step
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Quality Steps - Left Column */}
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    Raw Material Inspection
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Every batch of raw materials undergoes comprehensive testing before production begins.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    In-Process Quality Control
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Continuous monitoring and testing throughout the manufacturing process.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    Final Product Testing
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Complete quality verification before products leave our facility.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    Documentation & Traceability
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Full documentation trail for complete product traceability.
                  </p>
                </div>
              </div>
            </div>

            {/* Quality Control Image - Right Column */}
            <div className="lg:pl-8">
              <div className="relative">
                <img
                  src="/quality-control-facility.jpg"
                  alt="Quality control facility showing organized pipe inventory and testing area"
                  className="w-full h-auto rounded-lg shadow-lg object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Trusted Clients Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Our Trusted Clients
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Partnering with industry leaders worldwide
            </p>
          </div>

          <div className="overflow-hidden">
            <div className="flex animate-marquee space-x-8">
              {[
                constructionCorpLogo,
                industrialSystemsLogo,
                petrotechLogo,
                waterWorksLogo,
                infrastructureLtdLogo,
                manufacturingGroupLogo,
                energySolutionsLogo,
                pipelineEngineeringLogo,
                globalUtilitiesLogo,
                // Duplicate for seamless loop
                constructionCorpLogo,
                industrialSystemsLogo,
                petrotechLogo,
                waterWorksLogo,
                infrastructureLtdLogo,
                manufacturingGroupLogo,
                energySolutionsLogo,
                pipelineEngineeringLogo,
                globalUtilitiesLogo,
              ].map((logo, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 flex-shrink-0"
                >
                  <img
                    src={logo}
                    alt={`Client ${(index % 9) + 1}`}
                    className="h-16 w-auto mx-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Real experiences from industry leaders who trust our piping
              solutions
            </p>
          </div>

          <div className="relative overflow-hidden">
            <Marquee
              gradient={false}
              speed={30}
              pauseOnHover={true}
              className="py-4"
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="mx-4 bg-white rounded-xl shadow-lg p-8 w-96 flex-shrink-0"
                >
                  <Quote className="text-primary text-4xl mb-4" />
                  <p className="text-slate-600 text-lg leading-relaxed mb-6 line-clamp-4">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-slate-800">
                        {testimonial.name}
                      </h4>
                      <p className="text-slate-500 text-sm">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${ctaBannerImage})` }}
      >
        <div className="absolute inset-0 bg-green-900 bg-opacity-80"></div>
        <div className="relative z-10 text-center py-24 px-6 text-white max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
            Ready to Elevate Your Industrial Piping?
          </h2>
          <p className="text-lg md:text-xl mb-8">
            Contact our team of experts today to discuss your specific requirements and discover how our solutions can benefit your operations.
          </p>
          <Link href="/contact">
            <Button className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full transition duration-300 h-auto">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
