import { useState } from "react";
import { SectionHeading } from "./SectionHeading";
import { ExternalLink, X } from "lucide-react";
import { Button } from "./ui/button";

const categories = ["All", "Business", "Blog", "E-commerce", "Portfolio"];

const projects = [
    {
        id: 1,
        title: "Corporate Finance Portal",
        category: "Business",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
        description: "A comprehensive financial management system for corporate clients with dashboard, reporting, and analysis tools.",
        technologies: ["React", "Node.js", "Chart.js", "Tailwind CSS"],
        link: "#"
    },
    {
        id: 2,
        title: "Lifestyle Blog Platform",
        category: "Blog",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
        description: "A modern blog platform for lifestyle content creators with custom CMS and social media integration.",
        technologies: ["Next.js", "Strapi CMS", "PostgreSQL", "Vercel"],
        link: "#"
    },
    {
        id: 3,
        title: "Premium Furniture Store",
        category: "E-commerce",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
        description: "A high-end furniture e-commerce store with 3D product visualization and secure payment processing.",
        technologies: ["React", "Shopify", "Three.js", "Stripe"],
        link: "#"
    },
    {
        id: 4,
        title: "Creative Agency Portfolio",
        category: "Portfolio",
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
        description: "A dynamic portfolio for a creative agency showcasing their projects with immersive interactions.",
        technologies: ["Vue.js", "GSAP", "Firebase", "Tailwind CSS"],
        link: "#"
    },
    {
        id: 5,
        title: "Health & Wellness App",
        category: "Blog",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
        description: "A health and wellness blog with subscription features, workout tracking, and nutritional resources.",
        technologies: ["React Native", "Express", "MongoDB", "AWS"],
        link: "#"
    },
    {
        id: 6,
        title: "Handcrafted Goods Marketplace",
        category: "E-commerce",
        image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da",
        description: "A marketplace for artisans to sell their handcrafted products with vendor management and order processing.",
        technologies: ["Next.js", "WooCommerce", "Stripe", "Vercel"],
        link: "#"
    },
];

export function PortfolioSection() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

    const filteredProjects = activeCategory === "All"
        ? projects
        : projects.filter(project => project.category === activeCategory);

    return (
        <section id="portfolio" className="py-20 bg-secondary/50">
            <div className="container mx-auto px-4">
                <SectionHeading
                    title="My Portfolio"
                    subtitle="Explore my recent projects and see how I can help bring your vision to life."
                />

                <div className="flex flex-wrap justify-center mb-10 gap-2">
                    {categories.map(category => (
                        <Button
                            key={category}
                            variant={activeCategory === category ? "default" : "outline"}
                            onClick={() => setActiveCategory(category)}
                            className={activeCategory === category
                                ? "bg-primary text-primary-foreground neon-shadow"
                                : "border-primary hover:bg-primary/10 neon-border"}
                        >
                            {category}
                        </Button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => (
                        <div
                            key={project.id}
                            className="group relative cursor-pointer overflow-hidden rounded-xl card-glass"
                            onClick={() => setSelectedProject(project)}
                        >
                            <div className="aspect-video overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                                <p className="text-white/90 text-sm mb-4 line-clamp-2">{project.description}</p>
                                <span className="inline-block px-3 py-1 bg-primary/80 text-primary-foreground text-xs rounded-full">
                                    {project.category}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Project Modal */}
                {selectedProject && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm transition-all duration-300 animate-in fade-in">
                        <div className="bg-card w-full max-w-4xl rounded-2xl shadow-lg overflow-hidden card-glass border border-border animate-in zoom-in-50 duration-300">
                            <div className="relative aspect-video">
                                <img
                                    src={selectedProject.image}
                                    alt={selectedProject.title}
                                    className="w-full h-full object-cover animate-in fade-in duration-500"
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-4 right-4 bg-foreground/10 hover:bg-foreground/20 backdrop-blur-sm rounded-full animate-in fade-in duration-300"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedProject(null);
                                    }}
                                >
                                    <X className="h-5 w-5 text-white" />
                                </Button>
                            </div>
                            <div className="p-6 animate-in slide-in-from-bottom duration-500">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-bold">{selectedProject.title}</h3>
                                    <span className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full">
                                        {selectedProject.category}
                                    </span>
                                </div>
                                <p className="text-muted-foreground mb-6">{selectedProject.description}</p>
                                <div className="mb-6">
                                    <h4 className="text-sm font-medium mb-2">Technologies Used:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.technologies.map((tech, index) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full animate-in fade-in"
                                                style={{ animationDelay: `${index * 100}ms` }}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex justify-end animate-in slide-in-from-right duration-500">
                                    <Button
                                        className="group bg-primary hover:bg-primary/90 text-primary-foreground neon-shadow"
                                        onClick={() => window.open(selectedProject.link, '_blank')}
                                    >
                                        View Project
                                        <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
