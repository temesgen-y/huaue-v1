import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Cog, Bolt } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";
// Import logos as URL paths
const huayueLogo = "/attached_assets/huayu logo_1749995328636.PNG";
import eiderLogoAuthentic from "../assets/eider-logo-authentic.png";

export default function Products() {
  // Fetch HUAYUE products
  const { data: huayueProducts, isLoading: huayueLoading } = useQuery<Product[]>({
    queryKey: ["/api/products/HUAYUE"],
  });

  // Fetch EIDER products
  const { data: eiderProducts, isLoading: eiderLoading } = useQuery<Product[]>({
    queryKey: ["/api/products/EIDER"],
  });

  return (
    <section className="py-16 lg:py-24 bg-pipe-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <img 
            src="/product-lines-overview.png" 
            alt="Our Product Lines - HUAYUE and EIDER industrial piping solutions" 
            className="w-full max-w-4xl mx-auto rounded-xl shadow-lg mb-8"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* HUAYUE Section */}
          <Card className="shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Cog className="text-primary text-3xl mr-4" />
                <h2 className="text-3xl font-bold text-slate-800">HUAYUE</h2>
              </div>
              
              <img 
                src="/showroom-display.jpg" 
                alt="HUAYUE steel pipe manufacturing" 
                className="w-full h-48 object-cover rounded-lg mb-6"
              />
              
              <p className="text-slate-600 mb-6 leading-relaxed">
                HUAYUE represents our premium line of heavy-duty industrial pipes and fittings, engineered for the most demanding applications in oil & gas, petrochemical, and power generation industries.
              </p>

              <Link href="/products/huayue">
                <Button className="w-full bg-primary hover:bg-blue-800 text-white font-semibold py-3 h-auto">
                  View HUAYUE Products
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* EIDER Section */}
          <Card className="shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Bolt className="text-primary text-3xl mr-4" />
                <h2 className="text-3xl font-bold text-slate-800">EIDER</h2>
              </div>
              
              <img 
                src="/mizena-product.jpg" 
                alt="EIDER precision piping systems" 
                className="w-full h-48 object-cover rounded-lg mb-6"
              />
              
              <p className="text-slate-600 mb-6 leading-relaxed">
                EIDER specializes in precision-engineered piping systems for clean industries including pharmaceutical, food processing, biotechnology, and semiconductor manufacturing.
              </p>

              <Link href="/products/eider">
                <Button className="w-full bg-accent hover:bg-yellow-500 text-white font-semibold py-3 h-auto">
                  View EIDER Products
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* HUAYUE Products Section */}
        <div className="mt-24 pt-16 border-t border-slate-200">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <img 
                src={huayueLogo} 
                alt="HUAYUE Logo" 
                className="h-16 md:h-20 lg:h-24 w-auto object-contain"
              />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">HUAYUE Products</h2>
            <p className="text-lg font-semibold text-primary mb-2">Premium steel pipes and fittings designed for industrial applications worldwide</p>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Heavy-duty solutions for oil & gas, petrochemical, power generation, and infrastructure projects requiring maximum durability and performance.
            </p>
          </div>

          {huayueLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="bg-white">
                  <CardContent className="p-6">
                    <div className="w-full h-48 bg-slate-200 rounded-lg mb-4 animate-pulse"></div>
                    <div className="h-6 bg-slate-200 rounded mb-2 animate-pulse"></div>
                    <div className="h-16 bg-slate-200 rounded mb-4 animate-pulse"></div>
                    <div className="flex items-center justify-between">
                      <div className="h-4 w-24 bg-slate-200 rounded animate-pulse"></div>
                      <div className="h-8 w-20 bg-slate-200 rounded animate-pulse"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {huayueProducts?.map((product) => (
                <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white">
                  <CardContent className="p-6">
                    <div className="aspect-w-16 aspect-h-10 mb-4">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{product.name}</h3>
                    <p className="text-slate-600 mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-semibold">{product.certifications}</span>
                      <Button size="sm" className="bg-primary hover:bg-green-600">Learn More</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/products/huayue">
              <Button className="bg-primary hover:bg-green-600 text-white px-8 py-3 h-auto font-semibold">
                View All HUAYUE Products
              </Button>
            </Link>
          </div>
        </div>

        {/* EIDER Products Section - Repositioned above HUAYUE section */}
        <div className="mt-24 pt-16 border-t border-slate-200">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <img 
                src={eiderLogoAuthentic} 
                alt="EIDER Logo" 
                className="h-16 md:h-20 lg:h-24 w-auto object-contain"
              />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">EIDER Products</h2>
            <p className="text-lg font-semibold text-primary mb-2">EIDER delivers advanced piping systems for agricultural, domestic, and light industrial use.</p>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Reliable and efficient solutions designed for everyday applications where quality and performance matter.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
            <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white">
              <CardContent className="p-6">
                <div className="aspect-w-16 aspect-h-10 mb-4">
                  <img 
                    src="/pipe-inventory-white.jpg" 
                    alt="Agricultural irrigation pipes" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Agricultural Irrigation</h3>
                <p className="text-slate-600 mb-4">Durable piping systems for efficient water distribution in farming and irrigation applications.</p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-semibold">UV Resistant</span>
                  <Button size="sm" className="bg-primary hover:bg-green-600">Learn More</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white">
              <CardContent className="p-6">
                <div className="aspect-w-16 aspect-h-10 mb-4">
                  <img 
                    src="/green-fittings-collection.jpg" 
                    alt="Domestic water supply" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Domestic Water Systems</h3>
                <p className="text-slate-600 mb-4">Safe and reliable piping for residential water supply and plumbing applications.</p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-semibold">Food Grade</span>
                  <Button size="sm" className="bg-primary hover:bg-green-600">Learn More</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white">
              <CardContent className="p-6">
                <div className="aspect-w-16 aspect-h-10 mb-4">
                  <img 
                    src="/green-pipes-closeup.jpg" 
                    alt="Light industrial applications" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Light Industrial</h3>
                <p className="text-slate-600 mb-4">Versatile piping solutions for small-scale industrial and commercial applications.</p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-semibold">Flexible Design</span>
                  <Button size="sm" className="bg-primary hover:bg-green-600">Learn More</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mb-16">
            <Link href="/products/eider">
              <Button className="bg-primary hover:bg-green-600 text-white px-8 py-3 h-auto font-semibold">
                View All EIDER Products
              </Button>
            </Link>
          </div>
        </div>

        {/* New Branded Section at the End */}
        <div className="mt-24 pt-16 border-t border-slate-200">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Built for Quality. Trusted by Industry.
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Delivering excellence in every product, backed by decades of manufacturing expertise and innovation.
            </p>
          </div>

          {/* Image Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
            <div className="aspect-square overflow-hidden rounded-xl shadow-md group">
              <img 
                src="/pipe-inventory-white.jpg" 
                alt="Manufacturing excellence"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-xl shadow-md group">
              <img 
                src="/warehouse-storage.jpg" 
                alt="Quality assurance"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-xl shadow-md group">
              <img 
                src="/warehouse-overview.jpg" 
                alt="Industrial applications"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-xl shadow-md group">
              <img 
                src="/green-pipes-closeup.jpg" 
                alt="Technical innovation"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-xl shadow-md group">
              <img 
                src="/showroom-display.jpg" 
                alt="Global standards"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Call-to-Action Button */}
          <div className="text-center">
            <Button className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              Request Product Details
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
