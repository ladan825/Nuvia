import { motion } from "framer-motion";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Nuvia Mobile E-commerce App",
      description: "A beautiful landing page app using React and Tailwind",
      image: "Nuvia.png",
      tags: ["React", "TailwindCss", "Supabase", "Vite", "Framer-Motion"],
      liveDemo: "https://nuviadrink.vercel.app",
    },
    {
      id: 2,
      title: "Snar - Blog/Social App",
      description: "A full-stack blog application built for sharing quick thoughts and projects, featuring authentication and CRUD functionality.",
      // You must update the 'image' path to match the file name of your Snar screenshot
      image: "snar.png", 
      tags: ["React", "Vite", "Supabase", "TailwindCss", "React-Router"],
      // Use your actual live URL here if you have one
      liveDemo: "https://snar-drab.vercel.app", 
    },
  ];

  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Featured <span className="text-indigo-500">Project</span>
        </h2>

        <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here's one of my recent works, crafted with attention to detail & performance.
        </p>

        {projects.map((project) => (
          <motion.a
            key={project.id}
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="block group max-w-xl mx-auto rounded-2xl bg-card border border-indigo-400/20 backdrop-blur-md shadow-xl hover:shadow-indigo-500/30 transition-all duration-500 mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03, rotateX: 2, rotateY: 2 }}
            viewport={{ once: true }}
          >
            <div className="h-56 overflow-hidden rounded-t-2xl">
              <motion.img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            <div className="p-6 text-left">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100/10 border border-indigo-400/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {project.description}
              </p>

              <motion.button
                className="px-4 py-2 bg-indigo-500 rounded-full text-white font-semibold hover:bg-indigo-600 transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                View Project →
              </motion.button>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default Projects;
