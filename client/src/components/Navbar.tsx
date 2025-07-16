import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link href={href}>
      <span className={`text-black hover:text-primary transition-colors duration-200 font-medium cursor-pointer ${
        isActive(href) ? "text-primary" : ""
      }`}>
        {children}
      </span>
    </Link>
  );

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <div className="flex-shrink-0 flex items-center cursor-pointer">
                <img 
                  src="/logo.png" 
                  alt="HUAYUE - Look forward to the future" 
                  className="h-8 sm:h-10 lg:h-12 w-auto mr-2"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/">Home</NavLink>
            
            {/* Products Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={`text-black hover:text-primary transition-colors duration-200 font-medium p-0 h-auto ${
                    isActive("/products") ? "text-primary" : ""
                  }`}
                >
                  Products
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/products/huayue" className="w-full cursor-pointer">
                    HUAYUE
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/products/eider" className="w-full cursor-pointer">
                    EIDER
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <NavLink href="/about">About Us</NavLink>
            <NavLink href="/news">News</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                    <span className={`block px-3 py-2 text-black hover:text-primary transition-colors duration-200 cursor-pointer ${
                      isActive("/") ? "text-primary" : ""
                    }`}>
                      Home
                    </span>
                  </Link>
                  
                  {/* Mobile Products Toggle */}
                  <div>
                    <button
                      onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                      className="w-full flex justify-between items-center px-3 py-2 text-black hover:text-primary transition-colors duration-200 font-medium"
                    >
                      Products
                      {mobileProductsOpen ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                    {mobileProductsOpen && (
                      <div className="pl-6 space-y-1 mt-2">
                        <Link href="/products/huayue" onClick={() => setMobileMenuOpen(false)}>
                          <span className="block px-3 py-2 text-black hover:text-primary transition-colors duration-200 cursor-pointer">
                            HUAYUE
                          </span>
                        </Link>
                        <Link href="/products/eider" onClick={() => setMobileMenuOpen(false)}>
                          <span className="block px-3 py-2 text-black hover:text-primary transition-colors duration-200 cursor-pointer">
                            EIDER
                          </span>
                        </Link>
                      </div>
                    )}
                  </div>

                  <Link href="/about" onClick={() => setMobileMenuOpen(false)}>
                    <span className={`block px-3 py-2 text-black hover:text-primary transition-colors duration-200 cursor-pointer ${
                      isActive("/about") ? "text-primary" : ""
                    }`}>
                      About Us
                    </span>
                  </Link>
                  <Link href="/news" onClick={() => setMobileMenuOpen(false)}>
                    <span className={`block px-3 py-2 text-black hover:text-primary transition-colors duration-200 cursor-pointer ${
                      isActive("/news") ? "text-primary" : ""
                    }`}>
                      News
                    </span>
                  </Link>
                  <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                    <span className={`block px-3 py-2 text-black hover:text-primary transition-colors duration-200 cursor-pointer ${
                      isActive("/contact") ? "text-primary" : ""
                    }`}>
                      Contact
                    </span>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
