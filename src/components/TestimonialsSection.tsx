
import { useState, useEffect } from "react";
import { SectionHeading } from "./SectionHeading";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "./ui/button";

const testimonials = [
  {
    id: 1,
    name: "Sarah Thompson",
    company: "Bloom Boutique",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    content: "Working with this developer was an absolute pleasure. They took my e-commerce vision and turned it into a beautiful, functional online store that has significantly increased my sales. The attention to detail and responsiveness to my feedback was outstanding.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    company: "FinTech Solutions",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    content: "Our financial consulting firm needed a professional website that conveyed trust and expertise. The developer delivered exactly what we needed, and was extremely responsive throughout the entire process. Our new site has helped us attract high-value clients.",
    rating: 5
  },
  {
    id: 3,
    name: "Jessica Martinez",
    company: "Wellness Studio",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    content: "I couldn't be happier with my new yoga studio website. The design perfectly captures the calm, peaceful atmosphere I wanted to convey, and the booking system works flawlessly. The developer was patient with my requests and delivered everything on time.",
    rating: 4
  },
  {
    id: 4,
    name: "Robert Jackson",
    company: "Architecture Firm",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    content: "As an architecture firm, we needed a portfolio website that showcased our work in a visually stunning way. The developer understood our aesthetic perfectly and created a site that has received countless compliments from clients and colleagues alike.",
    rating: 5
  },
  {
    id: 5,
    name: "Emily Wilson",
    company: "Travel Blog",
    avatar: "https://randomuser.me/api/portraits/women/17.jpg",
    content: "My travel blog needed a complete redesign, and I couldn't be more thrilled with the results. The site is now beautiful, fast, and easy to navigate. My readership has grown significantly since the launch, and I've received so many compliments on the design.",
    rating: 5
  }
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    if (!autoplay || !inView) return;
    
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay, inView]);

  const handlePrev = () => {
    setAutoplay(false);
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setAutoplay(false);
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const handleDotClick = (index: number) => {
    setAutoplay(false);
    setActiveIndex(index);
  };

  return (
    <section id="testimonials" className="py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Client Testimonials"
          subtitle="See what our clients have to say about working with us."
        />
        
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="min-w-full">
                  <div className="card-glass p-8 md:p-10 rounded-2xl border border-border">
                    <div className="flex items-center mb-6">
                      <div className="flex-shrink-0 mr-4">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                        <div className="flex mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < testimonial.rating ? 'text-neon-purple fill-neon-purple/90' : 'text-muted'}`} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <blockquote>
                      <p className="text-lg italic text-muted-foreground">"{testimonial.content}"</p>
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeIndex ? 'bg-primary w-6' : 'bg-muted'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-4 transform -translate-y-1/2 md:-left-12 border-primary hover:bg-primary/10 neon-border hidden md:flex"
            onClick={handlePrev}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 md:-right-12 border-primary hover:bg-primary/10 neon-border hidden md:flex"
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
