
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { OrderSection } from "@/components/OrderSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SEO } from "@/components/SEO";
import { ServicesSection } from "@/components/ServicesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { useAnimationOnScroll } from "@/hooks/useAnimationOnScroll";
import { useEffect } from "react";

const Index = () => {
  const animationRef = useAnimationOnScroll();
  
  // Add smooth scrolling behavior to all internal links
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.href && link.href.indexOf('#') !== -1 && link.hostname === window.location.hostname) {
        e.preventDefault();
        const id = link.hash.substring(1);
        const element = document.getElementById(id);
        
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };
    
    document.addEventListener('click', handleLinkClick);
    
    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);
  
  return (
    <ThemeProvider>
      <SEO />
      <div ref={animationRef} className="min-h-screen flex flex-col">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <OrderSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
        <ScrollToTop />
      </div>
    </ThemeProvider>
  );
};

export default Index;
