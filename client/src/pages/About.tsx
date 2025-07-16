import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import {
  Target,
  Eye,
  Heart,
  Shield,
  Award,
  CheckCircle,
  FileCheck,
  Globe,
  Leaf,
  X,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

// Import certificate images
import warrantyCertificate from "../assets/certificates/warranty-certificate.png";
import distributorCertificate from "../assets/certificates/distributor-certificate.jpg";
import ecaeTestReport1 from "../assets/certificates/ecae-test-report-1.jpg";
import ecaeTestReport2 from "../assets/certificates/ecae-test-report-2.jpg";
import mizenaCertificate from "../assets/certificates/mizena-certificate.jpg";
import standardLicense from "../assets/certificates/standard-license.jpg";
import testReport2 from "../assets/certificates/test-report-2.jpg";
import testReport3 from "../assets/certificates/test-report-3.jpg";
import testReport4 from "../assets/certificates/test-report-4.jpg";

// Import product line images
import huayueImage from "../assets/products/huaye.jpg";
import eiderDesign from "../assets/products/eider-design.jpg";

// Import team images
import team1 from "../assets/team/team1.jpg";
import team2 from "../assets/team/team2.jpg";
import team3 from "../assets/team/team3.jpg";

// Import factory warehouse image
import factoryWarehouse from "../assets/factory-warehouse.jpg";



export default function About() {
  const [modalImage, setModalImage] = useState<string | null>(null);

  const team = [
    {
      name: "Alemayehu Tadesse",
      position: "Chief Executive Officer",
      description: "25+ years in industrial manufacturing and global business development.",
      image: team1
    },
    {
      name: "Meron Habtamu",
      position: "Chief Technology Officer", 
      description: "Expert in materials engineering and product innovation with 20+ years experience.",
      image: team2
    },
    {
      name: "Dawit Kebede",
      position: "Chief Operations Officer",
      description: "Operations excellence and supply chain optimization specialist with global expertise.",
      image: team3
    },
  ];

  // Handle keyboard events for modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && modalImage) {
        setModalImage(null);
      }
    };

    if (modalImage) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [modalImage]);

  const openModal = (imageSrc: string) => {
    setModalImage(imageSrc);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const timeline = [
    {
      year: "2015",
      title: "Company Founded",
      description: "HUAYUE PLASTICS INDUSTRY P.L.C. established in Kombolcha, Ethiopia"
    },
    {
      year: "2017",
      title: "EIDER Brand Launch",
      description: "Introduced EIDER precision pipe systems for critical applications"
    },
    {
      year: "2020",
      title: "Capacity Expansion",
      description: "Expanded manufacturing capabilities to include 20mm-50mm diameter range"
    },
    {
      year: "2023",
      title: "Quality Certifications",
      description: "Achieved ISO 9001:2015 and multiple international quality standards"
    }
  ];



  const certifications = [
    {
      name: "50 Year Warranty",
      description: "PP-R Built to Last, Guaranteed!",
      image: warrantyCertificate,
    },
    {
      name: "Sole Authorized Distributor",
      description: "WHEM Trading PLC Certificate",
      image: distributorCertificate,
    },
    {
      name: "ECAE Test Report - 63mm",
      description: "PPR Pipe Testing Results",
      image: ecaeTestReport1,
    },
    {
      name: "ECAE Test Report - 32mm",
      description: "PPR Pipe Quality Verification",
      image: ecaeTestReport2,
    },
    {
      name: "Mizena Certificate",
      description: "Ethiopian Conformity Assessment",
      image: mizenaCertificate,
    },
    {
      name: "Ethiopian Standards License",
      description: "License to Use Ethiopian Standard Mark",
      image: standardLicense,
    },
    {
      name: "Test Report - 25mm",
      description: "Quality Testing Documentation",
      image: testReport2,
    },
    {
      name: "Test Report - 50mm",
      description: "Comprehensive Testing Results",
      image: testReport3,
    },
    {
      name: "Quality Standards Certificate",
      description: "Ethiopian Conformity Assessment Enterprise",
      image: testReport4,
    },
  ];

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <img
              src="/huayue-main-logo.png"
              alt="HUAYUE - Look forward to the future"
              className="h-16 w-auto object-contain"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            About HUAYE PLASTICS INDUSTRY P.L.C.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Look forward to the future with innovative industrial pipe solutions
            that meet the highest standards of quality and reliability for
            global infrastructure projects.
          </p>
        </div>

        {/* Company Overview */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-6">
              Our Story
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mb-6 leading-relaxed">
              Established in 2015, HUAYUE PLASTICS INDUSTRY P.L.C. was founded
              with a vision to support Ethiopia’s con struction sector,
              particularly in water transportation solutions. Specializing in
              the manufacturing of PP-R pipes and fittings, the company is
              strategically located in Kombolcha, Ethiopia
            </p>
            <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed">
              HUAYUE PLASTICS INDUSTRY P.L.C. produces two major product brands:
              EIDER and HUAYUE PP-R pipes and fittings. The factory has the
              capability to manufacture PP-R pipes and fittings ranging from
              20mm to 50mm in diameter, with pressure ratings of PN20 and PN16.
            </p>
            <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed">
              Our commitment to innovation, quality, and customer satisfaction
              has driven our expansion into specialized pipe manufacturing
              including HUAYUE heavy-duty series and EIDER precision systems for
              critical applications.
            </p>

            {/* Timeline */}
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div
                    className={`${index === timeline.length - 1 ? "bg-accent" : "bg-primary"} text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      {item.year} - {item.title}
                    </h3>
                    <p className="text-slate-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 lg:mt-0">
            <img
              src={factoryWarehouse}
              alt="HUAYUE warehouse with organized green pipe storage system"
              className="rounded-xl shadow-2xl w-full h-96 object-cover cursor-pointer hover:opacity-90 transition-opacity duration-300"
              onClick={() => openModal(factoryWarehouse)}
            />
          </div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-20">
          <Card className="text-center shadow-lg">
            <CardContent className="p-6 sm:p-8">
              <div className="bg-primary text-white rounded-full w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 sm:h-8 w-6 sm:w-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-4">
                Mission
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                To deliver innovative, high-quality industrial pipe solutions
                that enable our customers to build safe, efficient, and
                sustainable infrastructure for global markets.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-lg">
            <CardContent className="p-6 sm:p-8">
              <div className="bg-accent text-white rounded-full w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center mx-auto mb-4">
                <Eye className="h-6 sm:h-8 w-6 sm:w-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-4">
                Vision
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                To be the leading industrial pipe manufacturer globally,
                recognized for innovation, sustainability, and unwavering
                commitment to customer success. Look forward to the future.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-lg">
            <CardContent className="p-8">
              <div className="bg-emerald-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Values</h3>
              <p className="text-slate-600 leading-relaxed">
                Quality, integrity, innovation, and customer-centricity guide
                everything we do. We believe in building lasting partnerships.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Our Product Lines Section */}
        <section className="my-12 px-4 mb-20">
          <h2 className="text-2xl font-bold text-center mb-4 text-slate-800">Our Product Lines</h2>
          <p className="text-center text-gray-600 mb-8">
            Discover our comprehensive range of industrial piping solutions designed for various applications and industries.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center max-w-6xl mx-auto">
            {/* HUAYUE Card */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden md:w-1/2 hover:shadow-xl transition-shadow duration-300">
              <div className="cursor-pointer" onClick={() => openModal(huayueImage)}>
                <img 
                  src={huayueImage} 
                  alt="HUAYUE Pipes" 
                  className="object-cover w-full h-48"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-green-700">✅ HUAYUE</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Heavy-duty steel pipes and fittings designed for extreme industrial conditions.
                </p>
                <ul className="list-disc list-inside text-sm mt-2 text-gray-700">
                  <li>High-pressure applications</li>
                  <li>Corrosion resistant coating</li>
                  <li>20-50mm diameter range</li>
                  <li>PN16 & PN20 pressure ratings</li>
                </ul>
                <div className="mt-4">
                  <Link
                    to="/products/huayue"
                    aria-label="View HUAYUE Products"
                    className="group inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 hover:scale-105 transition-all duration-300 shadow-md w-full sm:w-auto justify-center"
                  >
                    View HUAYUE Products
                    <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} />
                  </Link>
                </div>
              </div>
            </div>

            {/* EIDER Card */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden md:w-1/2 hover:shadow-xl transition-shadow duration-300">
              <div className="cursor-pointer" onClick={() => openModal(eiderDesign)}>
                <img 
                  src={eiderDesign} 
                  alt="EIDER precision piping systems" 
                  className="object-cover w-full h-48"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-green-700">✅ EIDER</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Precision-engineered piping systems for pharmaceutical and clean energy industries.
                </p>
                <ul className="list-disc list-inside text-sm mt-2 text-gray-700">
                  <li>Pharmaceutical-grade materials</li>
                  <li>Food-safe coatings</li>
                  <li>FDA approved components</li>
                  <li>Clean room certified</li>
                </ul>
                <div className="mt-4">
                  <Link
                    to="/products/eider"
                    aria-label="View EIDER Products"
                    className="group inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 text-white font-semibold rounded-full hover:bg-emerald-800 hover:scale-105 transition-all duration-300 shadow-md w-full sm:w-auto justify-center"
                  >
                    View EIDER Products
                    <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-slate-600 text-sm italic">
              Both product lines meet international quality standards and are manufactured in our state-of-the-art facility in Kombolcha, Ethiopia
            </p>
          </div>
        </section>

        {/* Our Core Values Section */}
        <section className="my-12 px-4 mb-20">
          <h2 className="text-2xl font-bold text-center mb-4 text-slate-800">Our Core Values</h2>
          <p className="text-center text-gray-600 mb-8">The principles that guide our operations and decisions</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Excellence Card */}
            <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Excellence</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We strive for excellence in everything we do, from product quality to customer service.
              </p>
            </div>

            {/* Innovation Card */}
            <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Innovation</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We continuously seek new ways to improve our products and processes.
              </p>
            </div>

            {/* Integrity Card */}
            <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Integrity</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We conduct business ethically and transparently, building trust with all stakeholders.
              </p>
            </div>

            {/* Sustainability Card */}
            <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Sustainability</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We are committed to environmentally responsible manufacturing and operations.
              </p>
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Our Certifications
            </h2>
            <p className="text-slate-600 text-lg">
              Trusted quality, proven performance.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <Card
                key={index}
                className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-video relative cursor-pointer hover:opacity-90 transition-opacity duration-300" onClick={() => openModal(cert.image)}>
                  <img
                    src={cert.image}
                    alt={`${cert.name} certification`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-bold text-slate-800 mb-2">
                    {cert.name}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {cert.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-slate-600 text-sm">
              All certifications are regularly audited and maintained to ensure
              compliance with international standards.
            </p>
          </div>
        </div>

        {/* Leadership Team Section */}
        <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-slate-800 text-center mb-16">
            Leadership Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6 cursor-pointer" onClick={() => openModal(member.image)}>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 object-cover rounded-full mx-auto shadow-md transition-transform duration-300 group-hover:scale-105 hover:opacity-90"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-bold text-slate-800 mb-2 tracking-tight">
                    {member.name}
                  </h3>
                  <p className="text-primary font-semibold mb-3 text-base">
                    {member.position}
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed max-w-xs mx-auto">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {modalImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-screen-md w-full max-h-screen">
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200 z-10"
              aria-label="Close modal"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={modalImage}
              alt="Full size preview"
              className="w-full h-auto max-h-screen object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
}
