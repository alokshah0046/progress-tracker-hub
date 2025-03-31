
import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Logo from "@/components/Logo";
import { Link } from "react-router-dom";
import { ArrowRight, Code, GitBranch, BarChart3, Mail, Info, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  
  // Animation for elements as they come into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            entry.target.classList.remove("opacity-0");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll(".animate-on-scroll").forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  const features = [
    {
      icon: <Code className="h-12 w-12 text-portal-blue" />,
      title: "Track Your Progress",
      description: "Monitor your coding journey across multiple platforms in one unified dashboard."
    },
    {
      icon: <BarChart3 className="h-12 w-12 text-portal-orange" />,
      title: "Visualize Growth",
      description: "See your progress through beautiful charts and intuitive visualizations."
    },
    {
      icon: <GitBranch className="h-12 w-12 text-portal-purple" />,
      title: "Connect Platforms",
      description: "Easily link your accounts from LeetCode, CodeChef, GeeksForGeeks, and more."
    }
  ];

  const faqs = [
    {
      question: "How does Progress Portal work?",
      answer: "Progress Portal integrates with various coding platforms like LeetCode, CodeChef, and GeeksForGeeks to track and visualize your progress. Simply connect your accounts, and we'll automatically sync your data and provide insightful analytics."
    },
    {
      question: "Is my data secure with Progress Portal?",
      answer: "Absolutely! We employ industry-standard encryption practices and never share your personal information with third parties. Your security is our top priority."
    },
    {
      question: "Can I track multiple coding platforms at once?",
      answer: "Yes! Progress Portal is designed to aggregate data from multiple platforms, giving you a comprehensive view of your coding journey across all your preferred sites."
    },
    {
      question: "Is Progress Portal free to use?",
      answer: "Progress Portal offers both free and premium plans. The free plan includes basic tracking features, while premium plans offer advanced analytics, unlimited platform connections, and personalized insights."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Navbar transparent={true} />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-portal-blue/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 -left-10 w-72 h-72 bg-portal-purple/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-portal-pink/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container px-6 mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <div className="mb-8">
              <Logo size="lg" withText={false} className="animate-float" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              <span className="gradient-text">Progress Portal</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-foreground/80 mb-12 max-w-2xl animate-scale-in">
              Measure your journey, celebrate your milestones.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-in-bottom">
              <Link to="/login">
                <button className="portal-btn-primary">
                  Get Started
                  <ArrowRight className="inline-block ml-2 h-4 w-4" />
                </button>
              </Link>
              <a href="#features">
                <button className="portal-btn bg-foreground/5 hover:bg-foreground/10 border border-foreground/10">
                  Learn More
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section 
        id="features" 
        ref={featuresRef} 
        className="py-20 bg-gradient-to-b from-background to-foreground/5 dark:from-background dark:to-foreground/5"
      >
        <div className="container px-6 mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 animate-on-scroll opacity-0">
            <span className="gradient-text">Everything You Need</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="glass-card p-8 rounded-xl animate-on-scroll opacity-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-foreground/80">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-portal-blue/10 to-portal-purple/10">
        <div className="container px-6 mx-auto max-w-6xl">
          <div className="glass-card p-10 md:p-16 rounded-2xl text-center animate-on-scroll opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to track your coding journey?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-foreground/80">
              Join Progress Portal today and visualize your growth across multiple coding platforms.
            </p>
            <Link to="/login">
              <button className="portal-btn-primary">
                Start Now
                <ArrowRight className="inline-block ml-2 h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* About Progress Portal Section */}
      <section id="about" className="py-16 bg-gradient-to-b from-foreground/5 to-background">
        <div className="container px-6 mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-10 animate-on-scroll opacity-0">
            <span className="gradient-text">About Progress Portal</span>
          </h2>
          
          <div className="glass-card p-8 rounded-xl animate-on-scroll opacity-0">
            <p className="text-lg mb-6 text-foreground/80">
              Progress Portal is a comprehensive tracking platform designed specifically for programmers and coding enthusiasts. We believe that consistent progress is the key to mastery, and our mission is to help you visualize and celebrate that progress.
            </p>
            <p className="text-lg mb-6 text-foreground/80">
              Our platform integrates with popular coding websites like LeetCode, CodeChef, GeeksForGeeks, and more, giving you a unified dashboard to track your journey across multiple platforms.
            </p>
            <p className="text-lg text-foreground/80">
              Whether you're preparing for technical interviews, participating in coding competitions, or simply improving your skills, Progress Portal provides the insights and motivation you need to reach your goals.
            </p>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section id="faq" className="py-16">
        <div className="container px-6 mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-10 animate-on-scroll opacity-0">
            <span className="gradient-text">Frequently Asked Questions</span>
          </h2>
          
          <div className="glass-card p-8 rounded-xl animate-on-scroll opacity-0">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/80">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
      
      {/* Terms & Privacy Section */}
      <section id="terms" className="py-16 bg-gradient-to-b from-background to-foreground/5">
        <div className="container px-6 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-8 rounded-xl animate-on-scroll opacity-0">
              <h3 className="text-2xl font-bold mb-6">Terms of Service</h3>
              <p className="mb-4 text-foreground/80">
                By using Progress Portal, you agree to our Terms of Service which govern your use of the platform. These terms ensure a fair and transparent relationship between users and our service.
              </p>
              <p className="text-foreground/80">
                Our terms cover important topics including user responsibilities, content ownership, subscription terms, and limitation of liability. For the complete terms, please contact our support team.
              </p>
            </div>
            
            <div className="glass-card p-8 rounded-xl animate-on-scroll opacity-0">
              <h3 className="text-2xl font-bold mb-6">Privacy Policy</h3>
              <p className="mb-4 text-foreground/80">
                At Progress Portal, we take your privacy seriously. Our Privacy Policy outlines how we collect, use, and protect your personal information when you use our services.
              </p>
              <p className="text-foreground/80">
                We only collect information necessary to provide our services and improve your experience. We never sell your personal data to third parties. For more details about our privacy practices, please contact our support team.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer with Support and About Buttons */}
      <footer className="py-12 bg-gradient-to-r from-portal-blue/10 to-portal-purple/10">
        <div className="container px-6 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div className="flex flex-col">
              <h4 className="font-bold text-lg mb-4">Progress Portal</h4>
              <Logo withText={false} className="mb-4" />
              <p className="text-sm text-foreground/70">
                Your coding journey, visualized.
              </p>
            </div>
            
            <div className="flex flex-col">
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-foreground/70 hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#about" className="text-foreground/70 hover:text-foreground transition-colors">About</a></li>
                <li><a href="#faq" className="text-foreground/70 hover:text-foreground transition-colors">FAQ</a></li>
                <li><a href="#terms" className="text-foreground/70 hover:text-foreground transition-colors">Terms & Privacy</a></li>
              </ul>
            </div>
            
            <div className="flex flex-col">
              <h4 className="font-bold text-lg mb-4">Connect</h4>
              <div className="flex space-x-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Mail size={16} />
                      <span>Support</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Contact Support</DialogTitle>
                      <DialogDescription>
                        For any queries or support, please contact:
                      </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center gap-2">
                        <Mail size={16} className="text-portal-blue" />
                        <a href="mailto:shah.alokkumar23@gmail.com" className="text-portal-blue hover:underline">
                          shah.alokkumar23@gmail.com
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail size={16} className="text-portal-blue" />
                        <a href="mailto:rahuljena26@gmail.com" className="text-portal-blue hover:underline">
                          rahuljena26@gmail.com
                        </a>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Info size={16} />
                      <span>About Us</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>About The Creators</DialogTitle>
                      <DialogDescription>
                        Meet the team behind Progress Portal
                      </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4 space-y-6">
                      <div className="space-y-2">
                        <h4 className="font-bold">ALOK KUMAR SHAH</h4>
                        <div className="flex items-center gap-2">
                          <ExternalLink size={16} className="text-portal-blue" />
                          <a 
                            href="https://www.linkedin.com/in/alok-kumar-shah-20902428a" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-portal-blue hover:underline"
                          >
                            LinkedIn Profile
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail size={16} className="text-portal-blue" />
                          <a 
                            href="mailto:shah.alokkumar23@gmail.com"
                            className="text-portal-blue hover:underline"
                          >
                            shah.alokkumar23@gmail.com
                          </a>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-bold">RAHUL JENA</h4>
                        <div className="flex items-center gap-2">
                          <ExternalLink size={16} className="text-portal-blue" />
                          <a 
                            href="https://linkedin.com/in/rahul-jena-b3053028b/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-portal-blue hover:underline"
                          >
                            LinkedIn Profile
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail size={16} className="text-portal-blue" />
                          <a 
                            href="mailto:rahuljena26@gmail.com"
                            className="text-portal-blue hover:underline"
                          >
                            rahuljena26@gmail.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            <div className="flex flex-col">
              <h4 className="font-bold text-lg mb-4">Follow Us</h4>
              <p className="text-sm text-foreground/70 mb-4">
                Stay updated with our latest features and updates.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-foreground/10 pt-6 text-center text-sm text-foreground/60">
            <p>© {new Date().getFullYear()} Progress Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
