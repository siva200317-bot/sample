import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "@/data/products";

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
                className="group relative rounded-2xl overflow-hidden cursor-pointer h-full"
              >
                {/* Product Image - Full Height */}
                <div className="relative h-[400px] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent border border-accent/20 rounded-full backdrop-blur-sm">
                      {product.category}
                    </span>
                  </div>
                  
                  {/* Default Title Overlay - visible by default, fades on hover */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 transition-opacity duration-300 group-hover:opacity-0">
                    <h3 className="text-2xl font-bold text-white">
                      {product.title}
                    </h3>
                  </div>
                  
                  {/* Hover Overlay - Full content revealed on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 delay-75">
                      <h3 className="text-3xl font-bold text-white mb-3">
                        {product.title}
                      </h3>
                    </div>
                    <div className="transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 delay-150">
                      <p className="text-gray-300 mb-4 line-clamp-3">
                        {product.description}
                      </p>
                    </div>
                    <div className="transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 delay-200">
                      <div className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-full font-semibold w-fit hover:bg-accent/90">
                        Explore
                        <span>→</span>
                      </div>
                    </div>
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
