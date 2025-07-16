import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HuayueProducts() {
  const products = [
    {
      name: "Industrial Platic Pipes",
      description:
        "High-grade HUAYUE PP-R pipes and fittings for industrial applications",
      image: "/pipe-inventory-white.jpg",
    },
    {
      name: "Specialized Fittings",
      description: "Custom fittings for complex industrial systems",
      image: "/green-fittings-collection.jpg",
    },
    {
      name: "High-Pressure Systems",
      description: "Pipes designed for extreme pressure environments",
      image: "/green-pipes-closeup.jpg",
    },
    {
      name: "Heavy-Duty Flanges",
      description: "Industrial flanges for critical connections",
      image: "/green-pipes-branded.jpg",
    },
    {
      name: "Welded Plastic Tubes",
      description: "ERW and LSAW tubes for structural applications",
      image: "/green-pipes-detail.jpg",
    },
    {
      name: "Carbon Plastic Assemblies",
      description: "Complete piping assemblies for industrial plants",
      image: "/warehouse-storage.jpg",
    },
  ];

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Logo Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <img
              src="/huayu-logo.png"
              alt="HUAYUE - Heavy-duty industrial piping solutions"
              className="h-20 sm:h-24 lg:h-32 w-auto object-contain"
            />
          </div>

          {/* Brand Introduction Section */}
          <div className="bg-primary/5 rounded-2xl p-8 max-w-4xl mx-auto mb-20">
            <p className="text-lg lg:text-xl text-slate-600 leading-relaxed">
              Committed to quality and reliability, EIDER and HUAYUE PP-R
              products comply with ISO 15874 standards and are manufactured
              using high-quality Korean-origin PP-R resin, ensuring superior
              strength, durability, and safety for both hot and cold water
              applications
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
              Explore our comprehensive range of industrial piping solutions
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

        {/* Branded Footer Section - Why Choose HUAYUE */}
        <div className="bg-gradient-to-b from-slate-50 to-white py-16 px-6 lg:px-8 rounded-2xl">
          <div className="max-w-6xl mx-auto">
            {/* Brand Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
                Why Choose HUAYUE
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Industry-leading features that set us apart
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  Excellent Customer Support:
                </h3>
                <p className="text-slate-600">
                  Premium materials and rigorous quality control
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  Eco-Friendly Materials:
                </h3>
                <p className="text-slate-600">
                  Tailored products for specific industry needs
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  Global Standards
                </h3>
                <p className="text-slate-600">
                  Compliance with international certifications
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  Technical Support
                </h3>
                <p className="text-slate-600">
                  24/7 expert assistance and consultation
                </p>
              </div>
            </div>

            {/* Image Gallery Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
              <div className="aspect-square overflow-hidden rounded-xl shadow-md group">
                <img
                  src="/standard-product.jpg"
                  alt="Steel pipe manufacturing facility"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="aspect-square overflow-hidden rounded-xl shadow-md group">
                <img
                  src="/mizena-product.jpg"
                  alt="Industrial welding process"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="aspect-square overflow-hidden rounded-xl shadow-md group">
                <img
                  src="/certificate-shop.jpg"
                  alt="Quality control testing"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="aspect-square overflow-hidden rounded-xl shadow-md group">
                <img
                  src="/ecae-certificate.jpg"
                  alt="Pipeline installation"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="aspect-square overflow-hidden rounded-xl shadow-md group">
                <img
                  src="/ecae2-certificate.jpg"
                  alt="Industrial infrastructure"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
