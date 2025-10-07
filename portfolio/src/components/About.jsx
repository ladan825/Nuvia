import { Briefcase, Code2, User } from 'lucide-react';
import { Link } from 'react-router-dom'

const About = () => {
    return (  
        <section className="py-24 px-24 relative">
            {""}
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text:4xl font-bold mb-12 text-center"> 
                    About <span className="text-violet-400">Me</span>
                </h2>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold">Passionate Web Developer & Tech Ethusiast</h3>


                        <p className="text-muted-black">
                                With 2 years focused on the modern web, I specialize in bringing beautiful, responsive designs to life. I thrive on solving complex
                                 problems with clean code, focusing on the latest technologies like [React and libraries under it, supabase , Netlify and vercel] to 
                                build performant and enjoyable user experience
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                            <button className="p-3 border-1 border-pink-500 bg-indigo-500 rounded-full hover:bg-indigo-300 transition duration-300">
                                    <Link to="/contact">
                                    <span className='font-bold'>Get In Touch</span>
                                    </Link>
                            </button>
                            

                             <button className="p-3 border-1 border-orange-500 rounded-full hover:text-indigo-400 transition-colors duration-300">
                                    <Link>
                                    <span className='font-bold'>Download Cv</span>
                                    </Link>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <div className='gradient-border p-6  border-2 border-indigo-500 transform hover:scale-105 transtion duration-200'>
                            <div className='flex items-start gap-4'>
                                <div className='p-3 rounded-full bg-indigo-300'>
                                    <Code2  className='h-6 w-6 text-indigo-700'/>
                                </div>
                                <div className='text-left'>
                            <h2 className='font-semibold text-lg'>Web Development</h2>
                            <p>Building high-performance, full-stack applications with modern frameworks.</p>
                                </div>
                            </div>
                        </div>

                        <div className='gradient-border p-6  border-2 border-indigo-500 transform hover:scale-105 transtion duration-200'>
                            <div className='flex items-start gap-4'>
                                <div className='p-3 rounded-full bg-indigo-300'>
                                    <User  className='h-6 w-6 text-indigo-700'/>
                                </div>
                                <div className='text-left'>
                            <h2 className='font-semibold text-lg'>UI/UX Design</h2>
                            <p>Designing seamless and intuitive user interfaces using tools like Figma.</p>
                                </div>
                            </div>
                        </div>

                        <div className='gradient-border p-6  border-2 border-indigo-500 transform hover:scale-105 transtion duration-200'>
                            <div className='flex items-start gap-4'>
                                <div className='p-3 rounded-full bg-indigo-300'>
                                    <Briefcase  className='h-6 w-6 text-indigo-700'/>
                                </div>
                                <div className='text-left'>
                            <h2 className='font-semibold text-lg'>Project Design</h2>
                            <p>Consulting on tech stack, architecture, and deployment strategy for new projects.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default About;