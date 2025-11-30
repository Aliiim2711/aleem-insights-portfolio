import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Search, Github, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import projectsData from "@/data/projects.json";

type Project = typeof projectsData[0];

const categories = ["All", "AI/ML", "Analytics", "Dashboards", "NLP"];

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-24 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Portfolio
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-world data solutions with measurable impact
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-full"
            />
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all cursor-pointer card-hover"
            >
              <div className="mb-4">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-2xl font-bold group-hover:text-gradient transition-all">
                    {project.title}
                  </h3>
                  <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-sm text-muted-foreground mb-3">{project.tagline}</p>
                <p className="text-muted-foreground mb-4">{project.description}</p>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.github && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.github, "_blank");
                  }}
                >
                  <Github className="h-4 w-4" />
                  View Code
                </Button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Project Detail Modal */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold">
                    {selectedProject.title}
                  </DialogTitle>
                  <p className="text-muted-foreground">{selectedProject.tagline}</p>
                </DialogHeader>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Overview</h4>
                    <p className="text-muted-foreground">{selectedProject.overview}</p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-2">Problem Statement</h4>
                    <p className="text-muted-foreground">{selectedProject.problem}</p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-2">Approach</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium mb-1">ETL</p>
                        <p className="text-sm text-muted-foreground">{selectedProject.approach.etl}</p>
                      </div>
                      <div>
                        <p className="font-medium mb-1">Data Cleaning</p>
                        <p className="text-sm text-muted-foreground">{selectedProject.approach.cleaning}</p>
                      </div>
                      <div>
                        <p className="font-medium mb-1">Modeling</p>
                        <p className="text-sm text-muted-foreground">{selectedProject.approach.modeling}</p>
                      </div>
                      <div>
                        <p className="font-medium mb-1">Visualization</p>
                        <p className="text-sm text-muted-foreground">{selectedProject.approach.visualization}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-2">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-2">Impact</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {selectedProject.impact.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-2">Challenges & Learnings</h4>
                    <p className="text-muted-foreground mb-2">{selectedProject.challenges}</p>
                    <p className="text-muted-foreground">{selectedProject.learnings}</p>
                  </div>

                  {selectedProject.github && (
                    <Button className="w-full gap-2" asChild>
                      <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        View on GitHub
                      </a>
                    </Button>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
