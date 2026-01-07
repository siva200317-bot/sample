import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const products = [
  {
    title: "Agriport",
    description: "Smart agriculture solutions for modern farming",
    image: "/products/Agriport.png",
    category: "Agriculture",
    id: "agriport",
  },
  {
    title: "Aqua",
    description: "Water management and monitoring systems",
    image: "/products/Aqua.png",
    category: "Water Tech",
    id: "aqua",
  },
  {
    title: "Civic",
    description: "Smart city solutions for urban development",
    image: "/products/Civic.png",
    category: "Smart City",
    id: "civic",
  },
  {
    title: "Cloud",
    description: "Cloud infrastructure and services",
    image: "/products/Cloud.png",
    category: "Cloud Computing",
    id: "cloud",
  },
  {
    title: "CVM",
    description: "Customer value management platform",
    image: "/products/cvm.png",
    category: "Business",
    id: "cvm",
  },
  {
    title: "Rubber",
    description: "Rubber industry management solutions",
    image: "/products/Rubber.png",
    category: "Manufacturing",
    id: "rubber",
  },
  {
    title: "Spark",
    description: "Data analytics and insights platform",
    image: "/products/Spark.png",
    category: "Analytics",
    id: "spark",
  },
  {
    title: "ST",
    description: "Smart tracking and logistics solutions",
    image: "/products/St.png",
    category: "Logistics",
    id: "st",
  },
];

export default function Products() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-foreground mb-4"
          >
            Our Products
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl"
          >
            Innovative solutions designed to transform industries and drive digital excellence
          </motion.p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Link
              key={product.title}
              to={`/products/${product.id}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-accent transition-all duration-300 cursor-pointer h-full"
              >
                {/* Product Image */}
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent border border-accent/20 rounded-full">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {product.description}
                  </p>
                  <div className="inline-flex items-center gap-2 text-accent group-hover:gap-3 transition-all">
                    Learn More
                    <span>→</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
