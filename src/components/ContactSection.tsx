import { useState } from "react";
import { SectionHeading } from "./SectionHeading";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Facebook, Github, Instagram, Linkedin, Mail, MapPin, Phone, Send, Twitter } from "lucide-react";
import { sendContactEmail } from "../api/sendEmail";
import { toast } from "sonner";

export function ContactSection() {
    const { toast: useToastToast } = useToast();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await sendContactEmail(formData);
            if (response.success) {
                toast.success("Message sent successfully!");
                setFormData({ name: "", email: "", message: "" });
            } else {
                toast.error("Failed to send message. Please try again.");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <section id="contact" className="py-20 bg-secondary/50 dark:bg-secondary/20">
            <div className="container mx-auto px-4">
                <SectionHeading
                    title="Get In Touch"
                    subtitle="Have a project in mind? Let's discuss how I can help bring your vision to life."
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    <div>
                        <div className="card-glass p-8 rounded-2xl border border-border h-full">
                            <h3 className="text-xl font-bold mb-6">Contact Information</h3>

                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="mr-4 p-3 bg-primary/20 rounded-lg">
                                        <Mail className="h-5 w-5 text-neon-purple" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Email</p>
                                        <p className="font-medium">MrRockeYx@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="mr-4 p-3 bg-primary/20 rounded-lg">
                                        <Phone className="h-5 w-5 text-neon-purple" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Phone</p>
                                        <p className="font-medium">+923287618199</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="mr-4 p-3 bg-primary/20 rounded-lg">
                                        <MapPin className="h-5 w-5 text-neon-purple" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Location</p>
                                        <p className="font-medium">Pakistan, Islamabad</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12">
                                <h4 className="text-lg font-medium mb-4">Connect With Me</h4>
                                <div className="flex space-x-4">
                                    <a
                                        href="#"
                                        className="p-3 bg-muted rounded-full hover:bg-primary/20 transition-colors"
                                        aria-label="GitHub"
                                    >
                                        <Github className="h-5 w-5 text-foreground" />
                                    </a>
                                    <a
                                        href="#"
                                        className="p-3 bg-muted rounded-full hover:bg-primary/20 transition-colors"
                                        aria-label="LinkedIn"
                                    >
                                        <Linkedin className="h-5 w-5 text-foreground" />
                                    </a>
                                    <a
                                        href="#"
                                        className="p-3 bg-muted rounded-full hover:bg-primary/20 transition-colors"
                                        aria-label="Twitter"
                                    >
                                        <Twitter className="h-5 w-5 text-foreground" />
                                    </a>
                                    <a
                                        href="#"
                                        className="p-3 bg-muted rounded-full hover:bg-primary/20 transition-colors"
                                        aria-label="Instagram"
                                    >
                                        <Instagram className="h-5 w-5 text-foreground" />
                                    </a>
                                    <a
                                        href="#"
                                        className="p-3 bg-muted rounded-full hover:bg-primary/20 transition-colors"
                                        aria-label="Facebook"
                                    >
                                        <Facebook className="h-5 w-5 text-foreground" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <form onSubmit={handleSubmit} className="card-glass p-8 rounded-2xl border border-border">
                            <h3 className="text-xl font-bold mb-6">Send a Message</h3>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium">
                                            Name
                                        </label>
                                        <Input
                                            id="name"
                                            name="name"
                                            placeholder="Your name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium">
                                            Email
                                        </label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="Your email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-medium">
                                        Subject
                                    </label>
                                    <Input
                                        id="subject"
                                        placeholder="Message subject"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium">
                                        Message
                                    </label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        placeholder="Your message..."
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground neon-shadow"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
