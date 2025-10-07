import { motion } from "framer-motion";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Foodie",
      description: "A beautiful landing page app using React and Tailwind",
      image: "project1.png",
      tags: ["React", "TailwindCss", "Supabase"],
    },
    {
      id: 2,
      title: "Portfolio",
      description: "Personal portfolio website with animations",
      image: "project2.png",
      tags: ["Next.js", "Framer Motion", "TailwindCss"],
    },
    {
      id: 3,
      title: "E-commerce",
      description: "A modern e-commerce store with authentication",
      image: "project3.png",
      tags: ["React", "Supabase", "Stripe"],
    },
  ];

  // Parent animation controls stagger
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  // Children animation with scale + opacity + smooth easing
  const variants = [
    {
      hidden: { x: -120, opacity: 0, scale: 0.95 },
      visible: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: { duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }, // smooth cubic
      },
    },
    {
      hidden: { y: 120, opacity: 0, scale: 0.95 },
      visible: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: { duration: 0.8, ease: [0.25, 0.8, 0.25, 1] },
      },
    },
    {
      hidden: { x: 120, opacity: 0, scale: 0.95 },
      visible: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: { duration: 0.8, ease: [0.25, 0.8, 0.25, 1] },
      },
    },
  ];

  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="text-indigo-500">Projects</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here's some of my recent projects, each was crafted with attention,
          detail and performance.
        </p>

        {/* Parent motion div controls stagger */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group rounded-2xl bg-card overflow-hidden shadow-lg hover:shadow-2xl transform-gpu transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]"
              variants={variants[index % variants.length]}
              whileHover={{ scale: 1.05, rotate: 0.5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="h-48 overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-center object-contain border border-black transition-transform duration-700 group-hover:scale-110"
                  whileHover={{ rotate: 1 }}
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs font-medium rounded-full border bg-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
