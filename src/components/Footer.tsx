import { Crown, Linkedin, Twitter, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-purple-900/80 to-black/90 text-white mt-16 backdrop-blur-md">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md" />
      <div className="container mx-auto px-4 py-14 relative z-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 md:gap-16">
          {/* Logo & Tagline */}
          <div className="flex-1 min-w-[200px] flex flex-col gap-4">
            <div className="flex items-center gap-2">
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
            <p className="text-gray-300 text-sm max-w-xs">
              Your premier destination for startup ecosystem insights, investor
              connections, and policy updates.
            </p>
            <div className="flex gap-3 mt-2">
              <Link
                to="#"
                aria-label="LinkedIn"
                className="hover:text-purple-300 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                to="#"
                aria-label="Twitter"
                className="hover:text-purple-300 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                to="#"
                aria-label="Email"
                className="hover:text-purple-300 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links & Resources */}
          <div className="flex-1 grid grid-cols-2 gap-8 min-w-[200px]">
            <div>
              <h4 className="font-semibold mb-4 text-purple-300">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link
                    to="/news"
                    className="hover:text-purple-300 transition-colors"
                  >
                    News
                  </Link>
                </li>
                <li>
                  <Link
                    to="/events"
                    className="hover:text-purple-300 transition-colors"
                  >
                    Events
                  </Link>
                </li>
                <li>
                  <Link
                    to="/database/angels"
                    className="hover:text-purple-300 transition-colors"
                  >
                    Investors
                  </Link>
                </li>
                <li>
                  <Link
                    to="/database/vc"
                    className="hover:text-purple-300 transition-colors"
                  >
                    VC Firms
                  </Link>
                </li>
                <li>
                  <Link
                    to="/policies"
                    className="hover:text-purple-300 transition-colors"
                  >
                    Policies
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-purple-300">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link
                    to="/resources/guides"
                    className="hover:text-purple-300 transition-colors"
                  >
                    Guides
                  </Link>
                </li>
                <li>
                  <Link
                    to="/resources/reports"
                    className="hover:text-purple-300 transition-colors"
                  >
                    Reports
                  </Link>
                </li>
                <li>
                  <Link
                    to="/resources/tools"
                    className="hover:text-purple-300 transition-colors"
                  >
                    Tools
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex-1 min-w-[220px] flex flex-col gap-4">
            <h4 className="font-semibold mb-4 text-purple-300">
              Stay in the loop
            </h4>
            <p className="text-gray-400 text-sm mb-2">
              Subscribe to our newsletter for the latest updates.
            </p>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-white/10 border border-purple-400/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
              />
              <Button
                type="submit"
                className="royal-gradient text-white font-semibold px-4"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="border-t border-purple-800/40 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center text-gray-400 text-xs">
          <span>© 2025 Startup Hub. All rights reserved.</span>
          <div className="flex gap-4">
            <Link to="#" className="hover:text-purple-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-purple-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-2xl -translate-y-48 translate-x-48 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-400/10 rounded-full blur-2xl translate-y-32 -translate-x-32 pointer-events-none" />
    </footer>
  );
};

export default Footer;
