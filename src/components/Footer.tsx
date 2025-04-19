import { Facebook, Github, Instagram, Linkedin, Mail, Twitter } from "lucide-react";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-12 bg-card">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <a href="#" className="text-2xl font-bold mb-4 md:mb-0 neon-text">
                        Mr RockeY
                    </a>

                    <div className="flex space-x-6">
                        {[
                            { icon: Github, label: "GitHub", href: "https://github.com/MrRockeY" },
                            { icon: Linkedin, label: "LinkedIn", href: "www.linkedin.com/in/mr-rockey-170225361" },
                            { icon: Mail, label: "Mail", href: "mrrockeyx@gmail.com" },
                            { icon: Instagram, label: "Instagram", href: "#" },
                            { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/mrrockeyx/" }
                        ].map((social, index) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-300"
                                aria-label={social.label}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <social.icon className="h-5 w-5" />
                                <span className="sr-only">{social.label}</span>
                            </a>
                        ))}
                    </div>
                </div>

                <div className="border-t border-border pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-muted-foreground mb-4 md:mb-0">
                            &copy; {currentYear} Mr RockeY. All rights reserved.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                            {["Privacy Policy", "Terms of Service", "Sitemap"].map((link, index) => (
                                <a
                                    key={link}
                                    href="#"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
