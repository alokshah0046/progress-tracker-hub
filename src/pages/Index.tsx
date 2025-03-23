
import React, { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Logo from "@/components/Logo";
import { Link } from "react-router-dom";
import { ArrowRight, Code, GitBranch, BarChart3 } from "lucide-react";

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  
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
      
      {/* Footer */}
      <footer className="py-8 text-center text-sm text-foreground/60">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} Progress Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
