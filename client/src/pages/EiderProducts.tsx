import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import eiderLogoAuthentic from "../assets/eider-logo-authentic.png";

export default function EiderProducts() {
  const products = [
    {
      name: "Sanitary Plastic Pipes",
      description:
        "FDA-approved stainless steel for food & pharmaceutical industries",
      image: "/pipe-inventory-white.jpg",
    },
    {
      name: "Precision Fittings",
      description: "High-precision fittings for clean room environments",
      image: "/green-fittings-collection.jpg",
    },
    {
      name: "Clean Room Systems",
      description: "Ultra-pure piping systems for semiconductor manufacturing",
      image: "/warehouse-overview.jpg",
    },
    {
      name: "Tri-Clamp Connections",
      description: "Quick-release sanitary connections for easy maintenance",
      image: "/green-pipes-closeup.jpg",
    },
    {
      name: "Pharmaceutical Tubing",
      description: "Sterile tubing solutions for pharmaceutical applications",
      image: "/green-pipes-branded.jpg",
    },
    {
      name: "Biotechnology Systems",
      description:
        "Specialized piping for biotechnology and research facilities",
      image: "/showroom-display.jpg",
    },
  ];

  return (
    <>
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Logo Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <img
                src={eiderLogoAuthentic}
                alt="EIDER - Precision piping systems for specialized applications"
                className="h-20 sm:h-24 lg:h-32 w-auto object-contain"
              />
            </div>

            {/* Brand Introduction Section */}
            <div className="bg-accent/5 rounded-2xl p-8 max-w-4xl mx-auto mb-20">
              <p className="text-lg lg:text-xl text-slate-600 leading-relaxed">
                Specialized piping systems for precision applications in
                pharmaceutical, food processing, biotechnology, and
                semiconductor manufacturing.
              </p>
            </div>
          </div>

          {/* Product Showcase Grid */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
                Our Product Range
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Explore our comprehensive range of precision piping solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <Card
                  key={index}
                  className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-slate-800 mb-3">
                      {product.name}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {product.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Branded Footer Section - EIDER Quality & Innovation */}
          <div className="bg-gradient-to-b from-blue-50 to-white py-16 px-6 lg:px-8 rounded-2xl">
            <div className="max-w-6xl mx-auto">
              {/* Brand Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
                  EIDER Quality & Innovation
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Precision engineering for the most demanding applications
                </p>
              </div>

              {/* Feature Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-blue-500">
                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    Precision Manufacturing
                  </h3>
                  <p className="text-slate-600">
                    Ultra-precise tolerances for critical applications
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-green-500">
                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    Clean Room Standards
                  </h3>
                  <p className="text-slate-600">
                    Certified for pharmaceutical and semiconductor use
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-purple-500">
                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    FDA Compliance
                  </h3>
                  <p className="text-slate-600">
                    Full regulatory compliance for food and pharma
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-amber-500">
                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    Innovation Focus
                  </h3>
                  <p className="text-slate-600">
                    Continuous R&D for next-generation solutions
                  </p>
                </div>
              </div>

              {/* Image Gallery Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
                <div className="aspect-square overflow-hidden rounded-xl shadow-md group">
                  <img
                    src="/mizena-product.jpg"
                    alt="Clean room manufacturing"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-xl shadow-md group">
                  <img
                    src="/standard-product.jpg"
                    alt="Precision instrumentation"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-xl shadow-md group">
                  <img
                    src="/certificate-shop.jpg"
                    alt="Quality testing laboratory"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-xl shadow-md group">
                  <img
                    src="/ecae-certificate.jpg"
                    alt="Pharmaceutical facility"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-xl shadow-md group">
                  <img
                    src="/ecae2-certificate.jpg"
                    alt="Research and development"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose EIDER Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose EIDER
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Industry-leading features that set us apart
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Superior Quality */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Superior Quality
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Premium materials and rigorous quality control
              </p>
            </div>

            {/* Custom Solutions */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Custom Solutions
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Tailored products for specific industry needs
              </p>
            </div>

            {/* Global Standards */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Global Standards
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Compliance with international certifications
              </p>
            </div>

            {/* Technical Support */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Technical Support
              </h3>
              <p className="text-gray-600 leading-relaxed">
                24/7 expert assistance and consultation
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
