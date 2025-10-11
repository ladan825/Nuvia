import { Briefcase, Code2, User } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="py-20 px-6 relative bg-white">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-violet-400">Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold">
              Passionate Web Developer & Tech Enthusiast
            </h3>

            <p className="text-gray-600 leading-relaxed">
              With 2 years focused on the modern web, I specialize in bringing
              beautiful, responsive designs to life. I thrive on solving complex
              problems with clean code, focusing on the latest technologies like{" "}
              <strong>React, Supabase, Netlify, and Vercel</strong> to build
              performant and enjoyable user experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/contact"
                className="px-6 py-3 bg-indigo-500 text-white rounded-full font-semibold hover:bg-indigo-600 transition-colors text-center"
              >
                Get In Touch
              </Link>

              <a
                href="/cv.pdf"
                download
                className="px-6 py-3 border border-indigo-400 rounded-full font-semibold hover:bg-indigo-50 transition-colors text-center"
              >
                Download CV
              </a>
            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Card 1 */}
            <div className="p-6 border-2 border-indigo-500 rounded-xl bg-white shadow-sm hover:shadow-md transition">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-indigo-100">
                  <Code2 className="h-6 w-6 text-indigo-700" />
                </div>
                <div className="text-left">
                  <h2 className="font-semibold text-lg">Web Development</h2>
                  <p className="text-sm text-gray-600">
                    Building high-performance, full-stack applications with
                    modern frameworks.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-6 border-2 border-indigo-500 rounded-xl bg-white shadow-sm hover:shadow-md transition">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-indigo-100">
                  <User className="h-6 w-6 text-indigo-700" />
                </div>
                <div className="text-left">
                  <h2 className="font-semibold text-lg">UI/UX Design</h2>
                  <p className="text-sm text-gray-600">
                    Designing seamless and intuitive user interfaces using Figma
                    and modern design principles.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-6 border-2 border-indigo-500 rounded-xl bg-white shadow-sm hover:shadow-md transition sm:col-span-2">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-indigo-100">
                  <Briefcase className="h-6 w-6 text-indigo-700" />
                </div>
                <div className="text-left">
                  <h2 className="font-semibold text-lg">Project Design</h2>
                  <p className="text-sm text-gray-600">
                    Consulting on tech stack, architecture, and deployment
                    strategy for new projects.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
