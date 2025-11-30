import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Database, BarChart, Cloud, Brain, Wrench } from "lucide-react";

const skillCategories = [
  {
    icon: Code,
    title: "Languages",
    skills: ["Python", "SQL", "R", "Excel VBA"],
    color: "text-primary"
  },
  {
    icon: Brain,
    title: "ML/NLP",
    skills: ["scikit-learn", "PyTorch", "TensorFlow", "LSTM", "GNNs", "BERTopic", "RAG", "LLMs"],
    color: "text-accent"
  },
  {
    icon: Cloud,
    title: "Data/Cloud",
    skills: ["GCP", "BigQuery", "AWS", "Hadoop", "Spark", "PySpark"],
    color: "text-primary"
  },
  {
    icon: BarChart,
    title: "Visualization",
    skills: ["Tableau", "Power BI", "Looker Studio", "MicroStrategy"],
    color: "text-accent"
  },
  {
    icon: Database,
    title: "Tools",
    skills: ["Git", "Jupyter", "VSCode", "FastAPI", "Docker"],
    color: "text-primary"
  },
  {
    icon: Wrench,
    title: "Methods",
    skills: ["ETL", "A/B Testing", "Statistical Analysis", "Data Modeling"],
    color: "text-accent"
  }
];

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Technical Arsenal
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Skills & <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit spanning data engineering, machine learning, and analytics
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all card-hover"
            >
              <div className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 ${category.color}`}>
                <category.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg bg-muted text-sm font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
