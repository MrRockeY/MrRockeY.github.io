import { SectionHeading } from "./SectionHeading";
import { Code, Layout, Star, Users } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

const skills = [
    { name: "Frontend Development", icon: Code, value: 95 },
    { name: "Responsive Web Design", icon: Layout, value: 90 },
    { name: "Client Relations", icon: Users, value: 85 },
    { name: "Project Management", icon: Star, value: 88 },
];

export function AboutSection() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section id="about" className="py-20 bg-secondary/50 dark:bg-secondary/20">
            <div className="container mx-auto px-4">
                <SectionHeading
                    title="About Me"
                    subtitle="I'm a passionate frontend web developer dedicated to creating exceptional digital experiences."
                />

                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    <div className="w-full lg:w-1/3">
                        <div className="relative">
                            <div className="card-glass p-2 rounded-2xl neon-shadow">
                                <img
                                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5"
                                    alt="Professional frontend web developer headshot"
                                    className="w-full h-auto rounded-xl"
                                />
                            </div>
                            <div className="absolute -bottom-4 -right-4 dark:bg-neon-purple/20 bg-neon-purple/10 p-6 rounded-2xl backdrop-blur-sm">
                                <p className="font-medium">3+ Years Experience</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-2/3" ref={ref}>
                        <h3 className="text-2xl font-bold mb-4">HTML, CSS, JavaScript & React Expert Creating Responsive Websites</h3>
                        <p className="text-muted-foreground mb-6">
                            I'm a frontend developer specializing in React and Tailwind CSS with a passion for creating beautiful, functional websites that help businesses achieve their goals. With over 3 years of experience in web development, I've worked with clients from various industries to build custom solutions that stand out.
                        </p>
                        <p className="text-muted-foreground mb-8">
                            My approach combines clean code, modern design principles, and a deep understanding of user experience to deliver websites that not only look amazing but also perform exceptionally well. As a freelance website developer, I focus on creating responsive web designs that work seamlessly across all devices.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {skills.map((skill, index) => (
                                <div key={skill.name} className={`card-glass p-6 rounded-xl animate-on-scroll ${inView ? 'visible' : ''}`} style={{ transitionDelay: `${index * 100}ms` }}>
                                    <div className="flex items-center mb-3">
                                        <div className="mr-3 bg-primary/20 p-2 rounded-md">
                                            <skill.icon className="h-5 w-5 text-primary" />
                                        </div>
                                        <h4 className="font-medium">{skill.name}</h4>
                                    </div>
                                    <div className="w-full bg-muted rounded-full h-2.5">
                                        <div
                                            className="bg-neon-purple h-2.5 rounded-full animate-on-scroll visible"
                                            style={{
                                                width: inView ? `${skill.value}%` : '0%',
                                                transition: 'width 1s ease-in-out',
                                                transitionDelay: `${index * 200 + 300}ms`
                                            }}
                                        ></div>
                                    </div>
                                    <p className="text-right text-sm text-muted-foreground mt-1">{skill.value}%</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
