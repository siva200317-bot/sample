import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Zap, Shield, Globe } from "lucide-react";
import { Link, useParams, Navigate } from "react-router-dom";

const productsData = {
  agriport: {
    title: "Agriport",
    tagline: "Smart Agriculture for Modern Farming",
    description: "Agriport is a comprehensive smart agriculture solution that leverages IoT, AI, and data analytics to revolutionize farming practices. Our platform helps farmers optimize crop yields, reduce waste, and make data-driven decisions.",
    image: "/products/Agriport.png",
    category: "Agriculture",
    features: [
      "Real-time crop monitoring and health analysis",
      "Automated irrigation systems with weather integration",
      "Soil quality analysis and recommendations",
      "Pest and disease detection using AI",
      "Yield prediction and harvest planning",
      "Market price analytics and insights",
    ],
    benefits: [
      {
        icon: <Zap className="w-6 h-6" />,
        title: "Increased Productivity",
        description: "Boost crop yields by up to 30% with data-driven farming practices",
      },
      {
        icon: <Shield className="w-6 h-6" />,
        title: "Risk Mitigation",
        description: "Early detection of diseases and pests to prevent crop losses",
      },
      {
        icon: <Globe className="w-6 h-6" />,
        title: "Sustainable Farming",
        description: "Reduce water usage and optimize resource allocation",
      },
    ],
    technologies: ["IoT Sensors", "Machine Learning", "Cloud Computing", "Mobile Apps"],
  },
  aqua: {
    title: "Aqua",
    tagline: "Intelligent Water Management Systems",
    description: "Aqua provides advanced water management and monitoring solutions for municipalities, industries, and agriculture. Our platform ensures efficient water usage, quality monitoring, and predictive maintenance.",
    image: "/products/Aqua.png",
    category: "Water Tech",
    features: [
      "Real-time water quality monitoring",
      "Leak detection and prevention systems",
      "Automated water distribution management",
      "Consumption analytics and reporting",
      "Predictive maintenance for water infrastructure",
      "Mobile alerts and notifications",
    ],
    benefits: [
      {
        icon: <Zap className="w-6 h-6" />,
        title: "Water Conservation",
        description: "Reduce water wastage by up to 40% with smart monitoring",
      },
      {
        icon: <Shield className="w-6 h-6" />,
        title: "Quality Assurance",
        description: "Continuous monitoring ensures water safety standards",
      },
      {
        icon: <Globe className="w-6 h-6" />,
        title: "Cost Efficiency",
        description: "Lower operational costs through optimized resource management",
      },
    ],
    technologies: ["IoT", "Data Analytics", "Cloud Platform", "AI/ML"],
  },
  civic: {
    title: "Civic",
    tagline: "Smart City Solutions for Urban Development",
    description: "Civic is a comprehensive smart city platform that integrates various urban services to create efficient, sustainable, and livable cities. From traffic management to public safety, Civic enables cities to operate smarter.",
    image: "/products/Civic.png",
    category: "Smart City",
    features: [
      "Intelligent traffic management systems",
      "Smart parking solutions",
      "Public safety and surveillance integration",
      "Waste management optimization",
      "Smart street lighting",
      "Citizen engagement platforms",
    ],
    benefits: [
      {
        icon: <Zap className="w-6 h-6" />,
        title: "Improved Efficiency",
        description: "Streamline city operations and reduce administrative overhead",
      },
      {
        icon: <Shield className="w-6 h-6" />,
        title: "Enhanced Safety",
        description: "Integrated monitoring for better public safety and emergency response",
      },
      {
        icon: <Globe className="w-6 h-6" />,
        title: "Citizen Satisfaction",
        description: "Better services lead to improved quality of life for residents",
      },
    ],
    technologies: ["IoT", "Big Data", "AI", "Mobile Apps", "Cloud Infrastructure"],
  },
  cloud: {
    title: "Cloud",
    tagline: "Enterprise Cloud Infrastructure & Services",
    description: "Our Cloud platform provides enterprise-grade infrastructure and services designed for scalability, reliability, and security. Deploy, manage, and scale your applications with ease.",
    image: "/products/Cloud.png",
    category: "Cloud Computing",
    features: [
      "Auto-scaling infrastructure",
      "Multi-region deployment",
      "Advanced security and compliance",
      "Container orchestration",
      "Serverless computing",
      "Managed databases and storage",
    ],
    benefits: [
      {
        icon: <Zap className="w-6 h-6" />,
        title: "High Performance",
        description: "Lightning-fast deployment and response times",
      },
      {
        icon: <Shield className="w-6 h-6" />,
        title: "Enterprise Security",
        description: "Bank-level security with compliance certifications",
      },
      {
        icon: <Globe className="w-6 h-6" />,
        title: "Global Reach",
        description: "Deploy applications across multiple regions worldwide",
      },
    ],
    technologies: ["Kubernetes", "Docker", "AWS/Azure", "Terraform", "Microservices"],
  },
  cvm: {
    title: "CVM",
    tagline: "Customer Value Management Platform",
    description: "CVM is a powerful customer relationship and value management platform that helps businesses understand, engage, and retain customers through data-driven insights and automated workflows.",
    image: "/products/cvm.png",
    category: "Business",
    features: [
      "Customer lifecycle management",
      "Predictive analytics and churn prevention",
      "Personalized marketing campaigns",
      "Customer segmentation and targeting",
      "Real-time engagement tracking",
      "ROI and value analytics",
    ],
    benefits: [
      {
        icon: <Zap className="w-6 h-6" />,
        title: "Increased Revenue",
        description: "Boost customer lifetime value by 25% on average",
      },
      {
        icon: <Shield className="w-6 h-6" />,
        title: "Customer Retention",
        description: "Reduce churn with predictive insights and proactive engagement",
      },
      {
        icon: <Globe className="w-6 h-6" />,
        title: "Data-Driven Decisions",
        description: "Make informed decisions with comprehensive analytics",
      },
    ],
    technologies: ["Machine Learning", "Big Data", "Marketing Automation", "CRM Integration"],
  },
  rubber: {
    title: "Rubber",
    tagline: "Comprehensive Rubber Industry Management",
    description: "Rubber is an end-to-end management solution for the rubber industry, covering everything from plantation management to processing, quality control, and supply chain optimization.",
    image: "/products/Rubber.png",
    category: "Manufacturing",
    features: [
      "Plantation management and monitoring",
      "Processing plant automation",
      "Quality control and testing",
      "Inventory and supply chain management",
      "Production planning and scheduling",
      "Compliance and reporting tools",
    ],
    benefits: [
      {
        icon: <Zap className="w-6 h-6" />,
        title: "Operational Excellence",
        description: "Streamline operations from plantation to production",
      },
      {
        icon: <Shield className="w-6 h-6" />,
        title: "Quality Assurance",
        description: "Maintain consistent quality with automated testing and monitoring",
      },
      {
        icon: <Globe className="w-6 h-6" />,
        title: "Supply Chain Visibility",
        description: "Track materials and products throughout the entire supply chain",
      },
    ],
    technologies: ["ERP Systems", "IoT", "Quality Management", "Supply Chain Software"],
  },
  spark: {
    title: "Spark",
    tagline: "Data Analytics & Business Intelligence Platform",
    description: "Spark is a powerful analytics platform that transforms raw data into actionable insights. With advanced visualization, real-time analytics, and AI-powered predictions, Spark empowers data-driven decision making.",
    image: "/products/Spark.png",
    category: "Analytics",
    features: [
      "Real-time data processing and analytics",
      "Interactive dashboards and visualizations",
      "Predictive analytics and forecasting",
      "Custom report generation",
      "Data integration from multiple sources",
      "AI-powered insights and recommendations",
    ],
    benefits: [
      {
        icon: <Zap className="w-6 h-6" />,
        title: "Faster Insights",
        description: "Get real-time analytics and instant insights from your data",
      },
      {
        icon: <Shield className="w-6 h-6" />,
        title: "Accurate Predictions",
        description: "Leverage AI/ML for accurate forecasting and trend analysis",
      },
      {
        icon: <Globe className="w-6 h-6" />,
        title: "Unified View",
        description: "Consolidate data from all sources into a single platform",
      },
    ],
    technologies: ["Apache Spark", "Python", "Power BI", "Machine Learning", "Big Data"],
  },
  st: {
    title: "ST - Smart Tracking",
    tagline: "Advanced Logistics & Tracking Solutions",
    description: "ST provides comprehensive tracking and logistics management solutions for businesses of all sizes. From fleet management to real-time shipment tracking, ST ensures visibility and efficiency across your supply chain.",
    image: "/products/St.png",
    category: "Logistics",
    features: [
      "Real-time GPS tracking",
      "Fleet management and optimization",
      "Route planning and optimization",
      "Delivery management system",
      "Warehouse management integration",
      "Analytics and performance metrics",
    ],
    benefits: [
      {
        icon: <Zap className="w-6 h-6" />,
        title: "Improved Efficiency",
        description: "Optimize routes and reduce delivery times by up to 30%",
      },
      {
        icon: <Shield className="w-6 h-6" />,
        title: "Enhanced Visibility",
        description: "Track shipments and vehicles in real-time across the supply chain",
      },
      {
        icon: <Globe className="w-6 h-6" />,
        title: "Cost Reduction",
        description: "Lower fuel costs and improve resource utilization",
      },
    ],
    technologies: ["GPS/GIS", "Mobile Apps", "Cloud Platform", "IoT", "AI Optimization"],
  },
};

export default function ProductDetail() {
  const { productId } = useParams();
  const product = productsData[productId];

  // If product doesn't exist, redirect to products page
  if (!product) {
    return <Navigate to="/products" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative border-b border-border overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-background" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <Link 
            to="/products" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="inline-block px-3 py-1 text-xs font-medium bg-accent/10 text-accent border border-accent/20 rounded-full mb-4">
                {product.category}
              </span>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
                {product.title}
              </h1>
              
              <p className="text-xl text-accent mb-6">
                {product.tagline}
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              <div className="flex gap-4 mt-8">
                <button className="px-6 py-3 bg-accent text-background font-semibold rounded-lg hover:bg-accent/90 transition-colors">
                  Request Demo
                </button>
                <button className="px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:border-accent transition-colors">
                  Learn More
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-border bg-muted">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Key Features
          </h2>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            Comprehensive features designed to transform your business operations
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-start gap-3 p-4 rounded-lg border border-border hover:border-accent transition-colors"
              >
                <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Benefits Section */}
      <div className="bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Benefits
            </h2>
            <p className="text-muted-foreground mb-12 max-w-2xl">
              Unlock powerful advantages for your business
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {product.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="bg-background p-6 rounded-xl border border-border"
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Technologies Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Technologies Used
          </h2>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            Built with cutting-edge technologies and industry best practices
          </p>

          <div className="flex flex-wrap gap-3">
            {product.technologies.map((tech, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.05 }}
                className="px-4 py-2 bg-accent/10 text-accent border border-accent/20 rounded-full text-sm font-medium"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="bg-accent/5 border-y border-accent/20">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to get started?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact us today to learn more about how {product.title} can transform your business
            </p>
            <div className="flex gap-4 justify-center">
              <button className="px-8 py-3 bg-accent text-background font-semibold rounded-lg hover:bg-accent/90 transition-colors">
                Contact Sales
              </button>
              <button className="px-8 py-3 border border-border text-foreground font-semibold rounded-lg hover:border-accent transition-colors">
                Schedule Demo
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
