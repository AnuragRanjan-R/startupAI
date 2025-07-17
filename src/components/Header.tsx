import { Link, useLocation } from "react-router-dom";
import { Search, ChevronDown, User, Crown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-purple-200/50 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold royal-text-gradient">
            <Crown className="h-8 w-8 text-purple-600" />
            <span className="hidden sm:inline">Startup Insights</span>
            <span className="sm:hidden"></span>
          </Link>

          {/* Mobile Search Bar (inline, between logo and hamburger) */}
          <div className="md:hidden flex-1 flex items-center justify-center mx-2">
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-400" />
              <Input 
                placeholder="Search..." 
                className="pl-10 w-full bg-purple-50/50 border-purple-200 focus:border-purple-400 focus:ring-purple-400/20"
              />
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/news" 
              className={`text-sm font-medium transition-colors hover:text-purple-600 ${
                isActive('/news') ? 'text-purple-600 font-semibold' : 'text-gray-700'
              }`}
            >
              News
            </Link>
            
            <Link 
              to="/events" 
              className={`text-sm font-medium transition-colors hover:text-purple-600 ${
                isActive('/events') ? 'text-purple-600 font-semibold' : 'text-gray-700'
              }`}
            >
              Events
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger className={`text-sm font-medium transition-colors hover:text-purple-600 flex items-center gap-1 ${
                isActive('/database') ? 'text-purple-600 font-semibold' : 'text-gray-700'
              }`}>
                Database <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white/95 backdrop-blur-md border border-purple-200 shadow-xl">
                <DropdownMenuItem asChild>
                  <Link to="/database/angels" className="w-full hover:bg-purple-50">Angel Investors</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/database/vc" className="w-full hover:bg-purple-50">VC Firms</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link 
              to="/policies" 
              className={`text-sm font-medium transition-colors hover:text-purple-600 ${
                isActive('/policies') ? 'text-purple-600 font-semibold' : 'text-gray-700'
              }`}
            >
              Policies Hub
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium text-gray-700 hover:text-purple-600 flex items-center gap-1">
                Resources <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white/95 backdrop-blur-md border border-purple-200 shadow-xl">
                <DropdownMenuItem className="hover:bg-purple-50">Guides</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-purple-50">Reports</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-purple-50">Tools</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Desktop Search & Login */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-400" />
              <Input 
                placeholder="Search..." 
                className="pl-10 w-64 bg-purple-50/50 border-purple-200 focus:border-purple-400 focus:ring-purple-400/20"
              />
            </div>
            <Button className="royal-gradient hover:opacity-90 text-white font-medium flex items-center gap-2 shadow-lg">
              <User className="h-4 w-4" />
              Login/Sign Up
            </Button>
          </div>

          {/* Mobile Hamburger & Sheet */}
          <div className="md:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="p-2">
                  <Menu className="h-6 w-6 text-purple-600" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64 bg-white/95">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-2 px-4 py-4 border-b border-purple-100">
                    <Crown className="h-7 w-7 text-purple-600" />
                    <span className="text-xl font-bold royal-text-gradient">Startup Insights</span>
                  </div>
                  <nav className="flex flex-col gap-1 px-4 py-4">
                    <Link to="/news" className="py-2 px-2 rounded hover:bg-purple-50 font-medium text-gray-700" >News</Link>
                    <Link to="/events" className="py-2 px-2 rounded hover:bg-purple-50 font-medium text-gray-700" >Events</Link>
                    <div className="py-2">
                      <span className="block text-xs text-gray-400 mb-1">Database</span>
                      <Link to="/database/angels" className="py-2 px-2 rounded hover:bg-purple-50 block text-gray-700">Angel Investors</Link>
                      <Link to="/database/vc" className="py-2 px-2 rounded hover:bg-purple-50 block text-gray-700">VC Firms</Link>
                    </div>
                    <Link to="/policies" className="py-2 px-2 rounded hover:bg-purple-50 font-medium text-gray-700" >Policies Hub</Link>
                    <div className="py-2">
                      <span className="block text-xs text-gray-400 mb-1">Resources</span>
                      <span className="py-2 px-2 rounded hover:bg-purple-50 block text-gray-700">Guides</span>
                      <span className="py-2 px-2 rounded hover:bg-purple-50 block text-gray-700">Reports</span>
                      <span className="py-2 px-2 rounded hover:bg-purple-50 block text-gray-700">Tools</span>
                    </div>
                  </nav>
                  <div className="mt-auto px-4 py-4 border-t border-purple-100">
                    <Button className="royal-gradient w-full text-white font-medium flex items-center gap-2 shadow-lg">
                      <User className="h-4 w-4" />
                      Login/Sign Up
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;



