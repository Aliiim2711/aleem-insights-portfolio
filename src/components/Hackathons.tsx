import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Trophy, Calendar, Code, Award, Github, ExternalLink, Target, Lightbulb, TrendingUp, AlertCircle } from "lucide-react";
import hackathonsData from "@/data/hackathons.json";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Hackathon {
  id: string;
  name: string;
  date: string;
  project: string;
  description: string;
  achievement?: string;
  techStack: string[];
  links?: {
    github?: string;
    demo?: string;
  };
  impact?: string;
  problemStatement?: string;
  approach?: string;
  challenges?: string;
}

export const Hackathons = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedHackathon, setSelectedHackathon] = useState<Hackathon | null>(null);

  return (
    <section id="hackathons" className="py-24" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Competition Track
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Hackathon <span className="text-gradient">Achievements</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Building real products fast — 3+ hackathons, multiple awards
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {hackathonsData.map((hackathon, index) => (
            <motion.div
              key={hackathon.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedHackathon(hackathon as Hackathon)}
              className="group cursor-pointer"
            >
              <div className="h-full p-6 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all card-hover">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{hackathon.date}</span>
                </div>

                <h3 className="text-xl font-bold mb-2 line-clamp-2">{hackathon.name}</h3>

                {hackathon.achievement && (
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="h-5 w-5 text-accent" />
                    <span className="text-accent font-semibold text-sm">{hackathon.achievement}</span>
                  </div>
                )}

                <div className="mb-3">
                  <div className="flex items-start gap-2 mb-2">
                    <Code className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <p className="font-medium text-sm line-clamp-2">{hackathon.project}</p>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3">{hackathon.description}</p>
                </div>

                {hackathon.impact && (
                  <p className="text-sm text-primary mb-3 line-clamp-2">
                    <Trophy className="inline h-4 w-4 mr-1" />
                    {hackathon.impact}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  {hackathon.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 rounded-md bg-muted text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {hackathon.techStack.length > 3 && (
                    <span className="px-2 py-1 rounded-md bg-muted text-xs font-medium">
                      +{hackathon.techStack.length - 3} more
                    </span>
                  )}
                </div>

                <div className="text-primary text-sm font-medium group-hover:underline">
                  View Details →
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detail Modal */}
        <Dialog open={!!selectedHackathon} onOpenChange={() => setSelectedHackathon(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedHackathon && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold">
                    {selectedHackathon.name}
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Header Info */}
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{selectedHackathon.date}</span>
                    </div>
                    {selectedHackathon.achievement && (
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-accent" />
                        <span className="text-accent font-semibold">{selectedHackathon.achievement}</span>
                      </div>
                    )}
                  </div>

                  {/* Project Name */}
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <div className="flex items-start gap-2 mb-2">
                      <Code className="h-5 w-5 text-primary mt-0.5" />
                      <h3 className="text-xl font-bold">{selectedHackathon.project}</h3>
                    </div>
                    <p className="text-muted-foreground">{selectedHackathon.description}</p>
                  </div>

                  {/* Problem Statement */}
                  {selectedHackathon.problemStatement && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Target className="h-5 w-5 text-accent" />
                        <h4 className="text-lg font-semibold">Problem Statement</h4>
                      </div>
                      <p className="text-muted-foreground">{selectedHackathon.problemStatement}</p>
                    </div>
                  )}

                  {/* Approach */}
                  {selectedHackathon.approach && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="h-5 w-5 text-primary" />
                        <h4 className="text-lg font-semibold">Approach</h4>
                      </div>
                      <p className="text-muted-foreground">{selectedHackathon.approach}</p>
                    </div>
                  )}

                  {/* Impact */}
                  {selectedHackathon.impact && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="h-5 w-5 text-accent" />
                        <h4 className="text-lg font-semibold">Impact</h4>
                      </div>
                      <p className="text-accent font-medium">{selectedHackathon.impact}</p>
                    </div>
                  )}

                  {/* Challenges */}
                  {selectedHackathon.challenges && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <AlertCircle className="h-5 w-5 text-muted-foreground" />
                        <h4 className="text-lg font-semibold">Challenges & Learnings</h4>
                      </div>
                      <p className="text-muted-foreground">{selectedHackathon.challenges}</p>
                    </div>
                  )}

                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Technical Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedHackathon.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 rounded-lg bg-muted text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  {selectedHackathon.links && (
                    <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                      {selectedHackathon.links.github && (
                        <a
                          href={selectedHackathon.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                        >
                          <Github className="h-4 w-4" />
                          View on GitHub
                        </a>
                      )}
                      {selectedHackathon.links.demo && (
                        <a
                          href={selectedHackathon.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Live Demo
                        </a>
                      )}
                    </div>
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
