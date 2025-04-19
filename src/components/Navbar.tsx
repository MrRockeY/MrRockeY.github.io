import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 80; // Height of the navbar
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
        setIsMenuOpen(false);
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2 bg-background/80 backdrop-blur-md shadow-md' : 'py-4 bg-transparent'}`}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                <a href="#" className="text-2xl font-bold neon-text">
                    Mr RockeY
                </a>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    <ul className="flex space-x-6">
                        {["about", "services", "portfolio", "testimonials", "contact"].map((item) => (
                            <li key={item}>
                                <button
                                    onClick={() => scrollToSection(item)}
                                    className="capitalize text-foreground hover:text-neon-purple transition-colors"
                                >
                                    {item}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <Button
                        className="bg-primary hover:bg-primary/90 text-primary-foreground neon-shadow"
                        onClick={() => scrollToSection('order')}
                    >
                        Order Website
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-foreground">
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </Button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border animate-fade-in">
                    <div className="container mx-auto px-4 py-4">
                        <ul className="space-y-4">
                            {["about", "services", "portfolio", "testimonials", "contact"].map((item) => (
                                <li key={item}>
                                    <button
                                        onClick={() => scrollToSection(item)}
                                        className="capitalize text-foreground hover:text-neon-purple transition-colors w-full text-left py-2"
                                    >
                                        {item}
                                    </button>
                                </li>
                            ))}
                            <li>
                                <Button
                                    className="bg-primary hover:bg-primary/90 text-primary-foreground neon-shadow w-full mt-4"
                                    onClick={() => scrollToSection('order')}
                                >
                                    Order Website
                                </Button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </nav>
    );
}
