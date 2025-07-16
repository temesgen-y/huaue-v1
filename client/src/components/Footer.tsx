import { Link } from "wouter";
import { Building } from "lucide-react";
import { FaLinkedin, FaTwitter, FaYoutube, FaFacebook, FaInstagram, FaTiktok, FaTelegram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <img 
                src="/logo.png" 
                alt="HUAYUE - Look forward to the future" 
                className="h-10 w-auto mr-3"
              />
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Leading manufacturer of high-quality industrial pipes and fittings serving global infrastructure projects. Your trusted partner for reliable, innovative pipe solutions across oil, gas, water, and industrial sectors.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="text-slate-400 hover:text-primary transition-colors duration-200">
                <FaLinkedin className="text-xl" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors duration-200">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors duration-200">
                <FaYoutube className="text-xl" />
              </a>
              <a href="https://www.facebook.com/HuayuePlastics" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors duration-200" aria-label="Facebook">
                <FaFacebook className="text-xl" />
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors duration-200">
                <FaInstagram className="text-xl" />
              </a>
              <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors duration-200">
                <FaTiktok className="text-xl" />
              </a>
              <a href="https://t.me/HuayuePlastics" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors duration-200" aria-label="Telegram">
                <FaTelegram className="text-xl" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products/huayue">
                  <span className="text-slate-300 hover:text-accent transition-colors duration-200 cursor-pointer">
                    HUAYUE Series
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/products/eider">
                  <span className="text-slate-300 hover:text-accent transition-colors duration-200 cursor-pointer">
                    EIDER Series
                  </span>
                </Link>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-accent transition-colors duration-200">
                  Custom Solutions
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-accent transition-colors duration-200">
                  Technical Specifications
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-accent transition-colors duration-200">
                  Product Catalog
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about">
                  <span className="text-slate-300 hover:text-accent transition-colors duration-200 cursor-pointer">
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/news">
                  <span className="text-slate-300 hover:text-accent transition-colors duration-200 cursor-pointer">
                    News & Updates
                  </span>
                </Link>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-accent transition-colors duration-200">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-accent transition-colors duration-200">
                  Quality Assurance
                </a>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-slate-300 hover:text-accent transition-colors duration-200 cursor-pointer">
                    Contact Us
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm mb-4 md:mb-0">
              © 2024 HUAYUE PLASTICS INDUSTRY PLC. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-slate-400 hover:text-accent transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-400 hover:text-accent transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-slate-400 hover:text-accent transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
