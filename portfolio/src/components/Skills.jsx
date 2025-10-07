
   const skills = [
  // Frontend
  { name: "HTML/CSS", level: 98, category: "frontend" },
  { name: "JavaScript", level: 90, category: "frontend" },
  { name: "React", level: 90, category: "frontend" },
  { name: "TypeScript", level: 85, category: "frontend" },
  { name: "Tailwind CSS", level: 90, category: "frontend" },

  // Backend
  { name: "Node.js", level: 80, category: "backend" },
  { name: "Firebase", level: 55, category: "backend" },
    { name: "Netlify", level: 90, category: "backend" },
     { name: "Supabase", level: 95, category: "backend" },


  // Tools
  { name: "GitHub", level: 90, category: "tools" },
  { name: "Figma", level: 85, category: "tools" },
  { name: "VS Code", level: 95, category: "tools" },
];

const Skills = () => {
    return (
  <section className="py-24 px-4 relative bg-secondary/30">
    <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center"> 
            My <span className="text-fuchsia-300">Skills</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {skills.map((skill, key) => (
                <div key={key} className=" p-6 rounded-lg shadow-xs  border-2 border-indigo-500">
                    <h3>{skill.name}</h3>
                     <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-500 h-2 rounded-full"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Level: {skill.level}%
              </p>
                </div>
            ))}
        </div>
    </div>
  </section>
    )
}
 
export default Skills;