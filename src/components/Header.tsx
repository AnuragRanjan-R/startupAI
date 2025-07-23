import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useClerk,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import {
  BarChart3,
  ChevronDown,
  Crown,
  FileText,
  Menu,
  Search,
  Wrench,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoaded, user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const [resourcesModalOpen, setResourcesModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <div className="w-full flex items-center justify-center">
      <header
        className={`fixed top-0 z-50 mt-3 py-4 bg-transparent w-[90%] max-w-[95%] transition-all duration-300 lg:px-12 ${isScrolled
            ? "bg-white/50 max-w-[80%] rounded-2xl border backdrop-blur-xl lg:px-5"
            : ""
          }`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between">
            {/* Minimal Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative ">
                <img
                  src="/StartupHUB.png"
                  alt="Startup HUB Logo"
                  className="h-10 object-contain"
                />
              </div>
            </Link>

            {/* Mobile Search */}
            <div className="md:hidden flex-1 flex flex-row gap-2 items-center justify-center mx-4">
              <div className="relative w-full max-w-xs">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search..."
                  className="pl-10 w-full bg-gray-100/80 border-1 border-gray-200 text-gray-500 focus:ring-1 focus:ring-purple-500/30 focus:bg-white rounded-full h-9 text-sm"
                />
              </div>
              <SignedIn>
                <div className="flex items-center justify-center z-50">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox:
                          "w-8 h-8 rounded-full border-2 border-gray-200",
                      },
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
                <DropdownMenuTrigger
                  className={`text-sm font-medium transition-colors duration-200 flex items-center gap-1 relative ${isActive("/database")
                      ? "text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                    }`}
                >
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
                <DropdownMenuContent className="bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-lg rounded-xl mt-2 min-w-[200px]">
                  <DropdownMenuItem asChild>
                    <Link
                      to="/resources"
                      className="w-full hover:bg-gray-50 rounded-lg text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      All Resources
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/resources/guides"
                      className="w-full hover:bg-gray-50 rounded-lg text-gray-700 hover:text-gray-900 transition-colors flex items-center gap-2"
                    >
                      <FileText className="h-4 w-4 text-purple-600" />
                      Registration Guides
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/resources/tools"
                      className="w-full hover:bg-gray-50 rounded-lg text-gray-700 hover:text-gray-900 transition-colors flex items-center gap-2"
                    >
                      <Wrench className="h-4 w-4 text-blue-600" />
                      Startup Tools
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/resources/reports"
                      className="w-full hover:bg-gray-50 rounded-lg text-gray-700 hover:text-gray-900 transition-colors flex items-center gap-2"
                    >
                      <BarChart3 className="h-4 w-4 text-green-600" />
                      Market Reports
                    </Link>
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
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl">
                  <SignInButton />
                </Button>
              </SignedOut>
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox:
                        "w-8 h-8 rounded-full border-2 border-gray-200 hover:border-purple-300 transition-colors",
                    },
                  }}
                />
              </SignedIn>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <Menu className="h-8 w-8 text-gray-700" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="p-0 w-80 bg-white/95 backdrop-blur-xl border-l border-gray-200/50"
                >
                  <div className="flex flex-col h-full">
                    {/* Mobile Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <Link to="/" className="flex items-center gap-3 group">
                          <div className="relative ">
                            <img
                              src="/StartupHUB.png"
                              alt="Startup HUB Logo"
                              className="h-10 object-contain"
                            />
                          </div>
                        </Link>

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
                        <span className="block text-xs text-gray-400 mb-2 px-4">
                          Database
                        </span>
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

                      {/* Update mobile menu resources section */}
                      <div className="py-2">
                        <span className="block text-xs text-gray-400 mb-2 px-4">
                          Resources
                        </span>
                        <div className="space-y-1">
                          <Link
                            to="/resources/guides"
                            className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <FileText className="h-4 w-4 text-purple-600" />
                            Registration Guides
                          </Link>
                          <Link
                            to="/resources/tools"
                            className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Wrench className="h-4 w-4 text-blue-600" />
                            Startup Tools
                          </Link>
                          <Link
                            to="/resources/reports"
                            className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <BarChart3 className="h-4 w-4 text-green-600" />
                            Market Reports
                          </Link>
                        </div>
                      </div>
                    </nav>

                    {/* Mobile Auth */}
                    <div className="mt-auto px-6 py-6 border-t border-gray-100">
                      <SignedOut>
                        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl">
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

      {/* Remove the old resources modal since we now have dedicated pages */}
    </div>
  );
};

export default Header;
