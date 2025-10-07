import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Star,
  Users,
  Mail,
  BarChart3,
  Zap,
  Shield,
  Globe,
  Target,
  TrendingUp,
  MessageSquare,
  Play,
  ChevronDown,
  Sparkles,
  Award,
  Clock,
  Rocket,
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import leadTreeLogo from "../../assets/leadtree.png";

export const LandingPage = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const plans = [
    {
      id: "starter",
      name: "Starter",
      description: "Perfect for individuals getting started",
      price: 19,
      billing: "month",
      originalPrice: 29,
      features: [
        "1,000 emails per month",
        "Up to 500 leads",
        "Basic email templates",
        "Email tracking",
        "Standard support",
        "Basic analytics",
      ],
      popular: false,
    },
    {
      id: "pro",
      name: "Pro",
      description: "Best for growing teams and businesses",
      price: 49,
      billing: "month",
      originalPrice: 79,
      features: [
        "5,000 emails per month",
        "Unlimited leads",
        "AI email generation",
        "Advanced analytics",
        "Campaign automation",
        "CRM integrations",
        "Priority support",
        "A/B testing",
      ],
      popular: true,
    },
    {
      id: "growth",
      name: "Growth",
      description: "For large teams and enterprises",
      price: 99,
      billing: "month",
      originalPrice: 149,
      features: [
        "15,000 emails per month",
        "Unlimited leads",
        "Advanced AI features",
        "Custom integrations",
        "White-label options",
        "Dedicated account manager",
        "24/7 phone support",
        "Custom reporting",
        "API access",
      ],
      popular: false,
    },
  ];

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Email Generation",
      description:
        "Create compelling emails with our advanced AI that understands your audience and converts better.",
      gradient: "from-purple-500 to-pink-500",
      delay: "0ms",
    },
    {
      icon: Target,
      title: "Smart Lead Management",
      description:
        "Organize, track, and nurture your leads with intelligent segmentation and automated workflows.",
      gradient: "from-blue-500 to-cyan-500",
      delay: "100ms",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Get deep insights into your campaigns with real-time tracking, open rates, and conversion metrics.",
      gradient: "from-green-500 to-emerald-500",
      delay: "200ms",
    },
    {
      icon: Zap,
      title: "Campaign Automation",
      description:
        "Set up automated email sequences that engage prospects and drive conversions on autopilot.",
      gradient: "from-yellow-500 to-orange-500",
      delay: "300ms",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description:
        "Bank-level security with SOC 2 compliance, data encryption, and privacy protection.",
      gradient: "from-red-500 to-rose-500",
      delay: "400ms",
    },
    {
      icon: Globe,
      title: "CRM Integrations",
      description:
        "Seamlessly connect with your favorite CRM tools and sync data across all platforms.",
      gradient: "from-indigo-500 to-purple-500",
      delay: "500ms",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp",
      content:
        "LeadTree increased our email open rates by 300% and helped us close 50% more deals. The AI suggestions are spot-on every time.",
      rating: 5,
      avatar: "SJ",
      color: "bg-gradient-to-br from-purple-500 to-pink-500",
    },
    {
      name: "Mike Chen",
      role: "Sales Manager",
      company: "GrowthCo",
      content:
        "The AI email generation is incredible. It saves us 10+ hours per week on outreach and our conversion rates have doubled.",
      rating: 5,
      avatar: "MC",
      color: "bg-gradient-to-br from-blue-500 to-cyan-500",
    },
    {
      name: "Emily Davis",
      role: "Founder",
      company: "StartupXYZ",
      content:
        "Best investment we made for our sales process. ROI was positive within the first month and our team productivity skyrocketed.",
      rating: 5,
      avatar: "ED",
      color: "bg-gradient-to-br from-green-500 to-emerald-500",
    },
  ];

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    navigate("/onboarding", { state: { selectedPlan: plan } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-700/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <img 
                src={leadTreeLogo} 
                alt="LeadTree" 
                className="h-10 w-auto object-contain cursor-pointer"
                onClick={() => navigate("/")}
              />

            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Reviews
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/login")}
                className="hidden sm:inline-flex"
              >
                Sign In
              </Button>
              <Button
                onClick={() => navigate("/signup")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
              >
                Get Started Free
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center relative z-10">
            <div
              className={`mb-8 transform transition-all duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 dark:from-blue-900/50 dark:to-purple-900/50 dark:text-blue-200 border border-blue-200/50 dark:border-blue-700/50 shadow-lg backdrop-blur-sm">
                <Award className="h-4 w-4 mr-2" />
                Trusted by 10,000+ businesses worldwide
              </span>
            </div>

            <div
              className={`transform transition-all duration-1000 delay-200 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
                Turn Leads Into
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                  Revenue
                </span>
                <span className="inline-block ml-4">
                  <Rocket className="h-12 w-12 md:h-16 md:w-16 text-blue-600 animate-bounce" />
                </span>
              </h1>
            </div>

            <div
              className={`transform transition-all duration-1000 delay-400 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                The all-in-one platform for email outreach, lead management, and
                sales automation.
                <br className="hidden md:block" />
                <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Powered by AI to help you close more deals faster.
                </span>
              </p>
            </div>

            <div
              className={`flex flex-col sm:flex-row gap-6 justify-center mb-16 transform transition-all duration-1000 delay-600 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <Button
                size="lg"
                className="text-lg px-10 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-200"
                onClick={() =>
                  document
                    .getElementById("pricing")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                <Sparkles className="mr-3 h-6 w-6" />
                Start Free Trial
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-10 py-6 border-2 border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transform hover:scale-105 transition-all duration-200"
              >
                <Play className="mr-3 h-6 w-6" />
                Watch Demo
              </Button>
            </div>

            <div
              className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto transform transition-all duration-1000 delay-800 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              {[
                {
                  icon: Check,
                  text: "14-day free trial",
                  color: "text-green-500",
                },
                {
                  icon: Shield,
                  text: "No credit card required",
                  color: "text-blue-500",
                },
                {
                  icon: Clock,
                  text: "Cancel anytime",
                  color: "text-purple-500",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center space-x-3 p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-lg"
                >
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-slate-400 dark:text-slate-500" />
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-24 px-4 sm:px-6 lg:px-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm relative"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 dark:from-blue-900/50 dark:to-purple-900/50 dark:text-blue-200 border border-blue-200/50 dark:border-blue-700/50 mb-6">
              <Zap className="h-4 w-4 mr-2" />
              Powerful Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Everything you need to
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                scale your outreach
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Powerful features designed to help you generate more leads, send
              better emails, and close more deals with the power of AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm overflow-hidden relative"
                style={{ animationDelay: feature.delay }}
              >
                {/* Gradient Border Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg`}
                ></div>
                <div className="absolute inset-[1px] bg-white dark:bg-slate-800 rounded-lg"></div>

                <CardHeader className="relative z-10">
                  <div
                    className={`h-16 w-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-4 h-4 bg-white rounded-full animate-pulse"></div>
            <div className="absolute top-20 right-20 w-2 h-2 bg-white rounded-full animate-pulse delay-1000"></div>
            <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-white rounded-full animate-pulse delay-2000"></div>
            <div className="absolute bottom-32 right-1/3 w-2 h-2 bg-white rounded-full animate-pulse delay-3000"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by thousands of businesses
          </h2>
          <p className="text-xl text-blue-100 mb-16 max-w-2xl mx-auto">
            Join the growing community of successful businesses using LeadTree
            to transform their sales process
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10,000+", label: "Active Users", icon: Users },
              { number: "50M+", label: "Emails Sent", icon: Mail },
              {
                number: "300%",
                label: "Average ROI Increase",
                icon: TrendingUp,
              },
              { number: "99.9%", label: "Uptime", icon: Shield },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <stat.icon className="h-8 w-8 text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-blue-100 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 relative"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 dark:from-green-900/50 dark:to-emerald-900/50 dark:text-green-200 border border-green-200/50 dark:border-green-700/50 mb-6">
              <MessageSquare className="h-4 w-4 mr-2" />
              Customer Stories
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              What our customers
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {" "}
                say about us
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what real customers are
              saying about their experience with LeadTree.
            </p>
          </div>

          {/* Featured Testimonial */}
          <div className="mb-16">
            <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 overflow-hidden">
              <CardContent className="p-12">
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonials[activeTestimonial].rating)].map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="h-6 w-6 text-yellow-400 fill-current mx-1"
                        />
                      )
                    )}
                  </div>
                  <blockquote className="text-2xl md:text-3xl font-medium text-slate-900 dark:text-white mb-8 leading-relaxed">
                    "{testimonials[activeTestimonial].content}"
                  </blockquote>
                  <div className="flex items-center justify-center space-x-4">
                    <div
                      className={`h-16 w-16 ${testimonials[activeTestimonial].color} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg`}
                    >
                      {testimonials[activeTestimonial].avatar}
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-slate-900 dark:text-white text-lg">
                        {testimonials[activeTestimonial].name}
                      </div>
                      <div className="text-slate-600 dark:text-slate-400">
                        {testimonials[activeTestimonial].role} at{" "}
                        {testimonials[activeTestimonial].company}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial Navigation */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial
                      ? "bg-blue-600 scale-125"
                      : "bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* All Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                  index === activeTestimonial
                    ? "ring-2 ring-blue-500 scale-105"
                    : ""
                }`}
                onClick={() => setActiveTestimonial(index)}
              >
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mb-6 line-clamp-3">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <div
                      className={`h-10 w-10 ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold text-sm`}
                    >
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
          <div className="absolute top-32 right-20 w-3 h-3 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
          <div className="absolute bottom-40 right-1/3 w-4 h-4 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-green-100 to-blue-100 text-green-800 dark:from-green-900/50 dark:to-blue-900/50 dark:text-green-200 border border-green-200/50 dark:border-green-700/50 mb-6">
              <Star className="h-4 w-4 mr-2" />
              Special Launch Pricing
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Choose the perfect plan for
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                your business
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
              Start with a 14-day free trial. No credit card required. Cancel
              anytime.
              <span className="font-semibold text-green-600 dark:text-green-400">
                Save up to 40% with our launch pricing!
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={plan.id}
                className={`relative border-2 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                  plan.popular
                    ? "border-blue-500 shadow-2xl scale-105 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20"
                    : "border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600"
                } overflow-hidden`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {plan.popular && (
                  <>
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center shadow-lg">
                        <Star className="h-4 w-4 mr-2 fill-current" />
                        Most Popular
                      </span>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                  </>
                )}

                <CardHeader className="text-center pb-4 relative">
                  <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-base text-slate-600 dark:text-slate-400 mb-6">
                    {plan.description}
                  </CardDescription>

                  <div className="relative">
                    <div className="flex items-center justify-center space-x-3 mb-2">
                      <span className="text-lg text-slate-500 line-through">
                        ${plan.originalPrice}
                      </span>
                      <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-1 rounded-full text-xs font-bold">
                        SAVE{" "}
                        {Math.round(
                          ((plan.originalPrice - plan.price) /
                            plan.originalPrice) *
                            100
                        )}
                        %
                      </div>
                    </div>
                    <div className="text-5xl font-bold text-slate-900 dark:text-white mb-2">
                      ${plan.price}
                    </div>
                    <span className="text-slate-600 dark:text-slate-400 font-medium">
                      per {plan.billing}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="px-6 pb-8">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <div className="flex-shrink-0 w-5 h-5 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3 mt-0.5">
                          <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full py-4 text-lg font-semibold transition-all duration-300 ${
                      plan.popular
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
                        : "hover:bg-blue-600 hover:text-white"
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                    onClick={() => handleSelectPlan(plan)}
                  >
                    <Rocket className="mr-2 h-5 w-5" />
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-4">
                    14-day free trial • No credit card required
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Money Back Guarantee */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center px-6 py-3 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full border border-green-200 dark:border-green-700">
              <Shield className="h-5 w-5 mr-2" />
              <span className="font-semibold">30-day money-back guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-32 right-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-2000"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/10 text-white border border-white/20 backdrop-blur-sm mb-6">
              <Sparkles className="h-4 w-4 mr-2" />
              Limited Time Offer
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to transform your
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {" "}
                sales process?
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of businesses already using LeadTree to grow their
              revenue.
              <span className="text-white font-semibold">
                Start your free trial today and see results in 24 hours.
              </span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button
              size="lg"
              className="text-xl px-12 py-6 bg-white text-slate-900 hover:bg-slate-100 shadow-2xl hover:shadow-white/25 transform hover:scale-105 transition-all duration-300"
              onClick={() =>
                document
                  .getElementById("pricing")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              <Rocket className="mr-3 h-6 w-6" />
              Start Your Free Trial Today
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-xl px-12 py-6 border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
            >
              <MessageSquare className="mr-3 h-6 w-6" />
              Talk to Sales
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              {
                icon: Clock,
                text: "Setup in 5 minutes",
                subtext: "No technical skills required",
              },
              {
                icon: Shield,
                text: "Enterprise security",
                subtext: "SOC 2 compliant",
              },
              {
                icon: Users,
                text: "24/7 support",
                subtext: "Real humans, not bots",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-center space-x-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <item.icon className="h-6 w-6 text-blue-400" />
                <div className="text-left">
                  <div className="text-white font-semibold">{item.text}</div>
                  <div className="text-slate-300 text-sm">{item.subtext}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-16 left-16 w-1.5 h-1.5 bg-white rounded-full"></div>
          <div className="absolute top-32 right-24 w-1.5 h-1.5 bg-white rounded-full"></div>
          <div className="absolute bottom-24 left-1/4 w-1.5 h-1.5 bg-white rounded-full"></div>
          <div className="absolute bottom-40 right-1/3 w-1.5 h-1.5 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src={leadTreeLogo} 
                  alt="LeadTree" 
                  className="h-10 w-auto object-contain"
                />
              </div>
              <p className="text-slate-400 mb-6 leading-relaxed">
                The all-in-one platform for email outreach and lead management.
                Powered by AI to help businesses grow faster and smarter.
              </p>
              <div className="flex space-x-4">
                {["twitter", "linkedin", "github", "youtube"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 bg-slate-800 hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <div className="w-5 h-5 bg-slate-400 rounded"></div>
                  </a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            <div>
              <h4 className="font-bold mb-6 text-white">Product</h4>
              <ul className="space-y-3">
                {[
                  "Features",
                  "Pricing",
                  "Integrations",
                  "API",
                  "Changelog",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-white">Company</h4>
              <ul className="space-y-3">
                {["About", "Blog", "Careers", "Contact", "Press"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-slate-400 hover:text-white transition-colors duration-200"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-white">Support</h4>
              <ul className="space-y-3">
                {[
                  "Help Center",
                  "Documentation",
                  "Status",
                  "Security",
                  "Privacy",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="border-t border-slate-800 pt-12 mb-8">
            <div className="max-w-md mx-auto text-center">
              <h4 className="font-bold text-white mb-4">Stay updated</h4>
              <p className="text-slate-400 mb-6">
                Get the latest product updates and marketing tips.
              </p>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 mb-4 md:mb-0">
              &copy; 2024 LeadTree. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
