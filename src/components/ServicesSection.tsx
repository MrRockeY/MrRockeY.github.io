import { SectionHeading } from "./SectionHeading";
import { Layout, Code, Search, ShoppingCart } from "lucide-react";
import { useInView } from "react-intersection-observer";

const services = [
    {
        title: "Responsive Web Design",
        description: "Custom, responsive designs that bring your brand to life with modern aesthetics and intuitive user experiences that work flawlessly across all devices.",
        icon: Layout,
        color: "from-neon-purple/20 to-neon-blue/20",
        darkColor: "from-neon-purple/10 to-neon-blue/10",
    },
    {
        title: "Frontend Development",
        description: "Expert HTML, CSS, JavaScript development with React and Tailwind CSS for robust, scalable, and high-performance websites that convert visitors into customers.",
        icon: Code,
        color: "from-neon-pink/20 to-neon-purple/20",
        darkColor: "from-neon-pink/10 to-neon-purple/10",
    },
    {
        title: "SEO Optimization",
        description: "Strategic SEO services to improve your site's visibility, drive organic traffic, and boost search engine rankings for your target keywords.",
        icon: Search,
        color: "from-neon-blue/20 to-neon-orange/20",
        darkColor: "from-neon-blue/10 to-neon-orange/10",
    },
    {
        title: "E-Commerce Solutions",
        description: "Custom online stores with secure payment processing, inventory management, and optimized shopping experiences that drive sales and growth.",
        icon: ShoppingCart,
        color: "from-neon-orange/20 to-neon-purple/20",
        darkColor: "from-neon-orange/10 to-neon-purple/10",
    },
];

export function ServicesSection() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section id="services" className="py-20">
            <div className="container mx-auto px-4">
                <SectionHeading
                    title="My Services"
                    subtitle="Comprehensive frontend web development solutions tailored to your specific needs and goals."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" ref={ref}>
                    {services.map((service, index) => (
                        <div
                            key={service.title}
                            className={`card-glass p-8 rounded-2xl border border-white/10 neon-shadow hover:translate-y-[-5px] transition-all duration-300 animate-on-scroll ${inView ? 'visible' : ''}`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className={`mb-6 inline-flex p-4 rounded-xl bg-gradient-to-br ${service.color} dark:${service.darkColor}`}>
                                <service.icon className="h-6 w-6 text-neon-purple" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                            <p className="text-muted-foreground">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
