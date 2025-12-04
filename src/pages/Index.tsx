import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Calendar,
  Car,
  MessageSquare,
  Truck,
  Wrench,
  ClipboardList,
  ChevronRight,
  Star,
  Shield,
  Clock,
  CheckCircle2,
} from "lucide-react";
import heroWorkshop from "@/assets/hero-workshop.jpg";
import serviceCenter from "@/assets/service-center.jpg";

const Index = () => {
  const features = [
    {
      icon: Calendar,
      title: "Book Appointment",
      description: "Schedule your car service at your preferred time and location.",
      link: "/book-appointment",
    },
    {
      icon: Truck,
      title: "Pickup & Delivery",
      description: "We'll pick up your car and deliver it back when ready.",
      link: "/pickup",
    },
    {
      icon: MessageSquare,
      title: "AI Assistant",
      description: "Get instant diagnosis and recommendations from our AI chatbot.",
      link: "/chatbot",
    },
    {
      icon: ClipboardList,
      title: "Track Progress",
      description: "Monitor your repair status and view detailed reports.",
      link: "/reports",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Book Your Service",
      description: "Choose your preferred service center, date, and time slot.",
    },
    {
      number: "02",
      title: "We Handle the Rest",
      description: "Optional pickup service or drop your car at the center.",
    },
    {
      number: "03",
      title: "Track & Receive",
      description: "Monitor progress and get notified when your car is ready.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "BMW Owner",
      content: "AutoCare made maintaining my car so effortless. The pickup service is a game-changer!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Mercedes Owner",
      content: "The AI chatbot accurately diagnosed my issue before I even visited. Saved me hours!",
      rating: 5,
    },
    {
      name: "Emily Davis",
      role: "Audi Owner",
      content: "Professional service, transparent pricing, and excellent communication throughout.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src={heroWorkshop}
            alt="Premium car workshop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/80 to-foreground/40" />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6 animate-fade-in">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Trusted by 50,000+ drivers</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background leading-tight mb-6 animate-slide-up">
              Premium Car Care,{" "}
              <span className="gradient-text">Simplified</span>
            </h1>
            
            <p className="text-lg text-background/70 mb-8 leading-relaxed animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Experience hassle-free car maintenance with our comprehensive service platform. 
              Book appointments, track repairs, and get AI-powered diagnostics all in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Link to="/book-appointment">
                <Button variant="hero" size="xl">
                  Book Appointment
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/chatbot">
                <Button variant="glass" size="xl">
                  <MessageSquare className="w-5 h-5" />
                  Talk to AI Assistant
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center gap-8 mt-10 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm text-background/70">24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="text-sm text-background/70">Certified Technicians</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From booking to delivery, we've got every aspect of car maintenance covered.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Link key={index} to={feature.link}>
                <Card className="p-6 h-full hover-lift cursor-pointer group">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-5 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-secondary/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                How It Works
              </h2>
              <p className="text-muted-foreground text-lg mb-10">
                Getting your car serviced has never been easier. Follow these simple steps.
              </p>
              
              <div className="space-y-8">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-5 group">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-glow">
                      {step.number}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <img
                src={serviceCenter}
                alt="Service center"
                className="w-full rounded-3xl shadow-elevated"
              />
              <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-5 shadow-elevated">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Wrench className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">15+</div>
                    <div className="text-sm text-muted-foreground">Service Centers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Join thousands of satisfied car owners who trust AutoCare.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 hover-lift">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold text-sm">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            Book your first appointment today and experience the future of car maintenance.
          </p>
          <Link to="/book-appointment">
            <Button variant="glass" size="xl" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              Book Your Appointment
              <ChevronRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
