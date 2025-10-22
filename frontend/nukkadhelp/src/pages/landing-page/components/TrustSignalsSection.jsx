import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignalsSection = () => {
  const trustFeatures = [
    {
      id: 1,
      icon: "ShieldCheck",
      title: "Verified Providers",
      description: "All service providers undergo thorough background checks and verification processes before joining our platform.",
      gradient: "from-emerald-400 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50"
    },
    {
      id: 2,
      icon: "Star",
      title: "Customer Reviews",
      description: "Real reviews from verified customers help you make informed decisions about service providers.",
      gradient: "from-orange-400 to-red-500",
      bgGradient: "from-orange-50 to-red-50"
    },
    {
      id: 3,
      icon: "Clock",
      title: "Quick Response",
      description: "Most providers respond within 30 minutes and can schedule services within 24-48 hours.",
      gradient: "from-indigo-400 to-purple-500",
      bgGradient: "from-indigo-50 to-purple-50"
    },
    {
      id: 4,
      icon: "DollarSign",
      title: "Fair Pricing",
      description: "Transparent pricing with no hidden fees. Compare quotes from multiple providers easily.",
      gradient: "from-pink-400 to-rose-500",
      bgGradient: "from-pink-50 to-rose-50"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1711385532989-0eee58bada25",
      avatarAlt: "Professional headshot of smiling woman with shoulder-length brown hair wearing white blouse",
      rating: 5,
      text: "Found an amazing electrician through NukkadHelp. Quick response, fair pricing, and excellent work quality. Highly recommended!",
      service: "Electrical Work",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1698072556534-40ec6e337311",
      avatarAlt: "Professional headshot of Asian man with short black hair wearing navy blue shirt",
      rating: 5,
      text: "The plumber I hired was professional and solved my emergency leak issue within hours. Great platform for finding reliable services.",
      service: "Plumbing",
      gradient: "from-blue-400 to-cyan-500"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1654110951517-0307aed76b75",
      avatarAlt: "Professional headshot of Hispanic woman with long dark hair wearing light blue top",
      rating: 5,
      text: "Regular house cleaning service has been fantastic. The maid is punctual, thorough, and trustworthy. Couldn't be happier!",
      service: "House Cleaning",
      gradient: "from-purple-400 to-pink-500"
    }
  ];

  const securityBadges = [
    {
      id: 1,
      name: "SSL Secured",
      icon: "Lock",
      description: "256-bit SSL encryption",
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      id: 2,
      name: "Verified Business",
      icon: "CheckCircle",
      description: "Registered & Licensed",
      gradient: "from-indigo-500 to-purple-600"
    },
    {
      id: 3,
      name: "Insured Services",
      icon: "Shield",
      description: "Liability Coverage",
      gradient: "from-orange-500 to-red-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 via-indigo-50/50 to-purple-50/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-pink-400 to-orange-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Features */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent font-bold text-sm uppercase tracking-wide">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Why Choose NukkadHelp?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're committed to connecting you with the best local service providers while ensuring your safety and satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustFeatures?.map((feature) => (
              <div key={feature?.id} className={`group relative bg-gradient-to-br ${feature?.bgGradient} p-8 rounded-2xl border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}>
                <div className={`w-20 h-20 bg-gradient-to-br ${feature?.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                  <Icon name={feature?.icon} size={36} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 text-center">
                  {feature?.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed text-center">
                  {feature?.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Testimonials */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-pink-600 via-red-600 to-orange-600 bg-clip-text text-transparent font-bold text-sm uppercase tracking-wide">
                Customer Stories
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              What Our Customers Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Real experiences from satisfied customers across our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials?.map((testimonial) => (
              <div key={testimonial?.id} className="group relative bg-white/80 backdrop-blur-sm border border-indigo-100 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Gradient accent border */}
                <div className={`absolute inset-0 bg-gradient-to-r ${testimonial?.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                
                <div className="relative">
                  <div className="flex items-center mb-6">
                    <div className="relative">
                      <Image
                        src={testimonial?.avatar}
                        alt={testimonial?.avatarAlt}
                        className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r ${testimonial?.gradient} rounded-full flex items-center justify-center`}>
                        <Icon name="CheckCircle" size={14} className="text-white" />
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      <h4 className="font-bold text-foreground text-lg">{testimonial?.name}</h4>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(testimonial?.rating)]?.map((_, i) => (
                          <Icon key={i} name="Star" size={16} className="text-orange-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-base mb-4 leading-relaxed italic">
                    "{testimonial?.text}"
                  </p>
                  
                  <div className={`inline-block bg-gradient-to-r ${testimonial?.gradient} text-white text-sm font-bold px-4 py-2 rounded-lg`}>
                    {testimonial?.service}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Badges */}
        <div className="text-center">
          <div className="inline-block mb-8">
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent font-bold text-sm uppercase tracking-wide">
              Security & Trust
            </span>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-12">
            Your Security & Trust Matter
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {securityBadges?.map((badge) => (
              <div key={badge?.id} className="group flex items-center gap-4 bg-white/80 backdrop-blur-sm border border-indigo-100 rounded-2xl px-6 py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className={`w-12 h-12 bg-gradient-to-r ${badge?.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                  <Icon name={badge?.icon} size={24} className="text-white" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-foreground text-base">{badge?.name}</div>
                  <div className="text-sm text-muted-foreground">{badge?.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignalsSection;