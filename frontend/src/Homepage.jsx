import { Link } from "react-router-dom";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import Navbar from "./components/Navbar";
import { Search, Zap, Shield, Clock, Star, MapPin, User } from "lucide-react";

import heroImage from "./assets/hero-image.jpg";
import electricianIcon from "./assets/electrician-icon.png";
import plumberIcon from "./assets/plumber-icon.png";
import cleanerIcon from "./assets/cleaner-icon.png";
import carpenterIcon from "./assets/carpenter-icon.png";

const Homepage = () => {
  const serviceCategories = [
    { name: "Electrician", icon: electricianIcon, description: "Electrical repairs & installations", providers: 45 },
    { name: "Plumber", icon: plumberIcon, description: "Plumbing & pipe repairs", providers: 38 },
    { name: "Cleaner", icon: cleanerIcon, description: "Home & office cleaning", providers: 62 },
    { name: "Carpenter", icon: carpenterIcon, description: "Furniture & woodwork", providers: 28 },
  ];

  const features = [
    { icon: <MapPin className="w-8 h-8 text-primary" />, title: "Local Experts", description: "Find trusted service providers within 10 km of your location" },
    { icon: <Shield className="w-8 h-8 text-primary" />, title: "Verified Professionals", description: "All providers are verified and background-checked for your safety" },
    { icon: <Clock className="w-8 h-8 text-primary" />, title: "Quick Booking", description: "Book services instantly and get help when you need it most" },
    { icon: <Star className="w-8 h-8 text-primary" />, title: "Quality Assured", description: "Read reviews and ratings from real customers in your area" },
  ];

  const steps = [
    { number: "01", title: "Search Services", description: "Browse through various service categories or search for specific services" },
    { number: "02", title: "Choose Provider", description: "View profiles, ratings, and prices to find the perfect match" },
    { number: "03", title: "Book & Relax", description: "Confirm your booking and let the professional handle the rest" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background" />
        
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
                <span className="text-primary font-medium text-sm">🎉 Trusted by 10,000+ customers</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Find Local
                <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Service Experts</span>
                Near You
              </h1>

              <p className="text-xl text-muted-foreground">Connect with verified electricians, plumbers, cleaners, and more within 10 km. Quality service at your doorstep.</p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-xl">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input placeholder="Search for electrician, plumber..." className="pl-10 h-12 rounded-lg" />
                </div>
                <Button variant="hero" size="lg" asChild>
                  <Link to="/services">Find Services</Link>
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center border-2 border-background">
                      <User className="w-5 h-5 text-primary-foreground" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">4.9/5 from 500+ reviews</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
              <img src={heroImage} alt="Professional service providers" className="relative rounded-3xl shadow-2xl w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Popular Services</h2>
            <p className="text-muted-foreground text-lg">Browse our most requested service categories</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCategories.map((category) => (
              <Card key={category.name} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <img src={category.icon} alt={category.name} className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                  <p className="text-xs text-primary">{category.providers} providers available</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose NukkadHelp?</h2>
            <p className="text-muted-foreground text-lg">Your trusted partner for local services</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="inline-flex p-4 rounded-full bg-primary/10">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-xl">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg">Get help in three simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-2xl font-bold">
                    {step.number}
                  </div>
                  <h3 className="font-semibold text-xl">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary to-accent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl mb-8 opacity-90">Join thousands of satisfied customers today</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/signup">Sign Up Now</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                  <Link to="/services">Browse Services</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2025 NukkadHelp. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;