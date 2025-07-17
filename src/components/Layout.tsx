
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  breadcrumb?: string;
}

const Layout = ({ children, title, breadcrumb }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-purple-100/20">
      <Header />
      
      {title && (
        <div className="royal-gradient text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container mx-auto px-4 py-12 text-center relative z-10">
            <h1 className="text-4xl font-bold mb-2 drop-shadow-lg">{title}</h1>
            {breadcrumb && (
              <p className="text-purple-100 mt-2 font-medium">{breadcrumb}</p>
            )}
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>
        </div>
      )}
      
      <main className="container mx-auto px-4 py-12">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;
