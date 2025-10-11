import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Instagram, Linkedin, Mail, MapPin, Phone, Send, Twitch, Twitter } from "lucide-react";

// ✅ Vite uses import.meta.env instead of process.env
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      alert("Email service not configured. Please set VITE_ variables in .env");
      return;
    }

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(
        () => {
          alert("Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          alert("Oops! Something went wrong. Error: " + error.text);
        }
      );
  };

  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-primary">Touch</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Do you have a project in mind? Feel free to reach out.
          I'm always open to discuss new opportunities and bring
          creative ideas to life.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* CONTACT INFO */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>

            <div className="space-y-6 justify-center md:justify-start">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full border border-violet-400"> 
                  <Mail className="h-6 w-6 text-violet-400" />
                </div>
                <div className='text-left'>
                  <h4 className="font-medium">Email</h4>
                  <a href="mailto:abbasladan825@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                    abbasladan825@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full border border-violet-400">
                  <Phone className="h-6 w-6 text-violet-400" />
                </div>
                <div className='text-left'>
                  <h4 className="font-medium">Phone</h4>
                  <a href="tel:+2348114352362" className="text-muted-foreground hover:text-primary transition-colors">
                    +2348114352362
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full border border-violet-400">
                  <MapPin className="h-6 w-6 text-violet-400" />
                </div>
                <div className='text-left'>
                  <h4 className="font-medium">Location</h4>
                  <span className="text-muted-foreground">Nigeria</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h4 className="font-medium mb-4">Connect With Me</h4>
              <div className="flex space-x-4 justify-center md:justify-start">
                <a href="https://x.com/yourusername" target="_blank" rel="noopener noreferrer"><Twitter className='hover:text-violet-400 transition-colors' /></a>
                <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer"><Instagram className='hover:text-violet-400 transition-colors' /></a>
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer"><Linkedin className='hover:text-violet-400 transition-colors' /></a>
                <a href="https://twitch.tv/yourusername" target="_blank" rel="noopener noreferrer"><Twitch className='hover:text-violet-400 transition-colors' /></a>
              </div>
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="bg-card p-8 rounded-lg shadow-xs border border-violet-400/50">
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>

            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Your Name</label>
                <input type="text" name="user_name" required className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-violet-400" placeholder="Abbas Ladan" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Your Email</label>
                <input type="email" name="user_email" required className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-violet-400" placeholder="you@example.com" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Your Message</label>
                <textarea name="message" required className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-violet-400" placeholder="Write your message here..." rows={4} />
              </div>

              <button type="submit" className="w-full flex items-center justify-center gap-2 bg-indigo-500 py-3 rounded-full text-white hover:bg-indigo-600 transition-colors font-bold">
                <Send size={16} /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
