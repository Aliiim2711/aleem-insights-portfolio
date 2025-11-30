import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, Rocket, TrendingUp } from "lucide-react";

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Section header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
            >
              About Me
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Where data, engineering, and{" "}
              <span className="text-gradient">strategy meet</span>
            </h2>
          </div>

          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none text-muted-foreground space-y-6 mb-12"
          >
            <p className="text-lg leading-relaxed">
              I'm a data analyst with a passion for transforming complex datasets into actionable insights 
              that drive business impact. With nearly 3 years of hands-on experience, I've worked across 
              analytics, machine learning, automation, and dashboard development — building end-to-end 
              data solutions that solve real-world problems.
            </p>
            <p className="text-lg leading-relaxed">
              Beyond my day-to-day work, I thrive in fast-paced environments like hackathons, where I've 
              competed in 3+ events and won awards for building innovative ML models and AI applications. 
              I love the challenge of turning ideas into working products in 24-48 hours — it's where 
              creativity meets execution.
            </p>
          </motion.div>

          {/* Current focus cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-center">What I'm Currently Working On</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all card-hover">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Learning</h4>
                <p className="text-sm text-muted-foreground">
                  Vector Databases & RAG Orchestration for advanced AI applications
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all card-hover">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <h4 className="font-semibold mb-2">Exploring</h4>
                <p className="text-sm text-muted-foreground">
                  Graph Neural Networks & advanced forecasting models
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all card-hover">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Rocket className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Building</h4>
                <p className="text-sm text-muted-foreground">
                  Real-time interactive dashboard with predictive analytics
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
