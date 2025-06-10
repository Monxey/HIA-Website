import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Heart } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "AI Census", href: "/ai-assistant" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-brand-blue" />
              <h1 className="text-xl font-bold text-brand-blue">Hearts in Action</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant="ghost"
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "text-gray-900 bg-gray-100"
                        : "text-gray-500 hover:text-brand-blue"
                    }`}
                  >
                    {item.name}
                  </Button>
                </Link>
              ))}
              <Link href="/donate">
                <Button className="bg-brand-red hover:bg-red-700 text-white">
                  <Heart className="h-4 w-4 mr-2" />
                  Donate
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start text-base ${
                          isActive(item.href)
                            ? "text-gray-900 bg-gray-100"
                            : "text-gray-500"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Button>
                    </Link>
                  ))}
                  <Link href="/donate">
                    <Button 
                      className="w-full bg-brand-red hover:bg-red-700 text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Donate
                    </Button>
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
