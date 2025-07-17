import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Search, ChevronDown, Crown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
  useClerk,
} from "@clerk/clerk-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoaded, user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <div className='w-full flex items-center justify-center'>
      <header
        className={`fixed top-0 z-50 mt-3 py-4 bg-transparent w-[90%] max-w-[95%] transition-all duration-300 lg:px-12 ${isScrolled ? 'bg-white/50 max-w-[80%] rounded-2xl border backdrop-blur-lg lg:px-5' : ''}`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between">

            {/* Minimal Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <Crown className="h-7 w-7 text-gray-900 group-hover:text-purple-600 transition-colors duration-300" />
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-semibold text-gray-900 tracking-tight">
                  Startup Insights
                </span>
              </div>
            </Link>

            {/* Mobile Search */}
            <div className="md:hidden flex-1 flex flex-row gap-2 items-center justify-center mx-4">
              <div className="relative w-full max-w-xs">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search..."
                  className="pl-10 w-full bg-gray-50/80 border-0 focus:ring-1 focus:ring-purple-500/30 focus:bg-white rounded-full h-9 text-sm"
                />
              </div>
              <SignedIn>
                  <div className="flex items-center justify-center z-50">
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: "w-8 h-8 rounded-full border-2 border-gray-200"
                        }
                      }}
                    />
                  </div>
                </SignedIn>

            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/news"
                className={`text-sm font-medium transition-colors duration-200 relative ${isActive("/news")
                    ? "text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                News
                {isActive("/news") && (
                  <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-purple-600 rounded-full" />
                )}
              </Link>

              <Link
                to="/events"
                className={`text-sm font-medium transition-colors duration-200 relative ${isActive("/events")
                    ? "text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                Events
                {isActive("/events") && (
                  <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-purple-600 rounded-full" />
                )}
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger className={`text-sm font-medium transition-colors duration-200 flex items-center gap-1 relative ${isActive("/database")
                    ? "text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                  }`}>
                  Database
                  <ChevronDown className="h-3 w-3" />
                  {isActive("/database") && (
                    <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-purple-600 rounded-full" />
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-lg rounded-xl mt-2 min-w-40">
                  <DropdownMenuItem asChild>
                    <Link
                      to="/database/angels"
                      className="w-full hover:bg-gray-50 rounded-lg text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      Angel Investors
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/database/vc"
                      className="w-full hover:bg-gray-50 rounded-lg text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      VC Firms
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                to="/policies"
                className={`text-sm font-medium transition-colors duration-200 relative ${isActive("/policies")
                    ? "text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                Policies Hub
                {isActive("/policies") && (
                  <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-purple-600 rounded-full" />
                )}
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1 transition-colors duration-200">
                  Resources <ChevronDown className="h-3 w-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-lg rounded-xl mt-2 min-w-40">
                  <DropdownMenuItem className="hover:bg-gray-50 rounded-lg text-gray-700 hover:text-gray-900 transition-colors">
                    Guides
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-50 rounded-lg text-gray-700 hover:text-gray-900 transition-colors">
                    Reports
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-50 rounded-lg text-gray-700 hover:text-gray-900 transition-colors">
                    Tools
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            {/* Desktop Search & Auth */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative border border-gray-200 rounded-full bg-white/80 hover:bg-white transition-colors duration-200">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search..."
                  className="pl-10 w-64 bg-gray-50/80 border-0 focus:ring-1 focus:ring-purple-500/30 focus:bg-white rounded-full h-9"
                />
              </div>

              <SignedOut>
                <Button className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-6 h-9 rounded-full transition-all duration-200 shadow-sm hover:shadow-md">
                  <SignInButton />
                </Button>
              </SignedOut>
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8 rounded-full border-2 border-gray-200 hover:border-purple-300 transition-colors"
                    }
                  }}
                />
              </SignedIn>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="p-2 hover:bg-gray-100 rounded-full">
                    <Menu className="h-8 w-8 text-gray-700" />
                  </Button>

                </SheetTrigger>
                <SheetContent side="right" className="p-0 w-80 bg-white/95 backdrop-blur-xl border-l border-gray-200/50">
                  <div className="flex flex-col h-full">

                    {/* Mobile Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <Crown className="h-6 w-6 text-gray-900" />
                        <span className="text-lg font-semibold text-gray-900">
                          Startup Insights
                        </span>
                      </div>
                      {/* <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <X className="h-4 w-4 text-gray-700" />
                      </Button> */}
                    </div>

                    {/* Mobile Navigation */}
                    <nav className="flex flex-col px-6 py-4 space-y-1">
                      <Link
                        to="/news"
                        className={`py-3 px-4 rounded-xl font-medium transition-colors duration-200 ${isActive("/news")
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                          }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        News
                      </Link>

                      <Link
                        to="/events"
                        className={`py-3 px-4 rounded-xl font-medium transition-colors duration-200 ${isActive("/events")
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                          }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Events
                      </Link>

                      <div className="py-2">
                        <span className="block text-xs text-gray-400 mb-2 px-4">Database</span>
                        <Link
                          to="/database/angels"
                          className="py-2 px-4 rounded-lg hover:bg-gray-50 block text-gray-600 hover:text-gray-900 transition-colors duration-200"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Angel Investors
                        </Link>
                        <Link
                          to="/database/vc"
                          className="py-2 px-4 rounded-lg hover:bg-gray-50 block text-gray-600 hover:text-gray-900 transition-colors duration-200"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          VC Firms
                        </Link>
                      </div>

                      <Link
                        to="/policies"
                        className={`py-3 px-4 rounded-xl font-medium transition-colors duration-200 ${isActive("/policies")
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                          }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Policies Hub
                      </Link>

                      <div className="py-2">
                        <span className="block text-xs text-gray-400 mb-2 px-4">Resources</span>
                        <div className="space-y-1">
                          <div className="py-2 px-4 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer">
                            Guides
                          </div>
                          <div className="py-2 px-4 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer">
                            Reports
                          </div>
                          <div className="py-2 px-4 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer">
                            Tools
                          </div>
                        </div>
                      </div>
                    </nav>

                    {/* Mobile Auth */}
                    <div className="mt-auto px-6 py-6 border-t border-gray-100">
                      <SignedOut>
                        <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium h-11 rounded-xl transition-all duration-200">
                          <SignInButton />
                        </Button>
                      </SignedOut>

                    </div>
                  </div>
                </SheetContent>
                
                
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-16" />
    </div>
  );
};

export default Header;