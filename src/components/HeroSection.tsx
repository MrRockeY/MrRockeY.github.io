import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";

export function HeroSection() {
    const { ref: refLeft, isVisible: isVisibleLeft } = useAnimateOnScroll({
        threshold: 0.2,
    });

    const { ref: refRight, isVisible: isVisibleRight } = useAnimateOnScroll({
        threshold: 0.2,
    });

    const scrollToOrder = () => {
        const orderSection = document.getElementById('order');
        if (orderSection) {
            orderSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToPortfolio = () => {
        const portfolioSection = document.getElementById('portfolio');
        if (portfolioSection) {
            portfolioSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="min-h-screen flex items-center pt-16 pb-16 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center">
                    <div
                        ref={refLeft}
                        className={`w-full md:w-1/2 md:pr-12 mb-10 md:mb-0 transition-all duration-1000 ${isVisibleLeft ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                            }`}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            <span className="neon-text">Frontend Web Developer</span> Creating Modern, Responsive Websites
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            Specializing in React, Tailwind CSS, and responsive web design. I build custom websites that help businesses grow, stand out, and connect with their audience.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                size="lg"
                                className="bg-primary hover:bg-primary/90 text-primary-foreground neon-shadow"
                                onClick={scrollToOrder}
                            >
                                Hire Frontend Developer
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="group border-primary hover:bg-primary/10 neon-border"
                                onClick={scrollToPortfolio}
                            >
                                View My Portfolio
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </div>
                    </div>
                    <div
                        ref={refRight}
                        className={`w-full md:w-1/2 relative transition-all duration-1000 ${isVisibleRight ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                            }`}
                    >
                        <div className="relative bg-gradient-to-br from-neon-purple/20 to-neon-blue/20 dark:from-neon-purple/10 dark:to-neon-blue/10 rounded-2xl overflow-hidden card-glass p-4 transform rotate-2 animate-fade-in">
                            <img
                                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                                alt="Frontend web developer workspace with React and Tailwind CSS code"
                                className="w-full h-auto rounded-lg shadow-lg"
                                loading="eager"
                            />
                        </div>
                        <div className="absolute -bottom-10 -left-10 w-3/4 bg-gradient-to-br from-neon-pink/20 to-neon-orange/20 dark:from-neon-pink/10 dark:to-neon-orange/10 rounded-2xl overflow-hidden card-glass p-4 transform -rotate-3 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                            <img
                                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
                                alt="Responsive web design with modern UI components"
                                className="w-full h-auto rounded-lg shadow-lg"
                                loading="eager"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
