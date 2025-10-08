import { Coffee, Leaf, Award } from 'lucide-react';


export default function About() {
  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Our Story</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Welcome to Nuvia, where every sip tells a story.
          </p>
        </div>

        {/* Our Story Section */}
        <div className="mt-12 lg:flex lg:items-center lg:gap-16">
          <div className="lg:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80"
              alt="A barista pouring coffee" 
              className="rounded-lg shadow-xl w-full h-auto" 
            />
          </div>
          <div className="mt-8 lg:mt-0 lg:w-1/2">
            <h3 className="text-3xl font-bold text-gray-900">From a Passion to a Brand</h3>
            <p className="mt-4 text-lg text-gray-600">
              Nuvia started with a simple idea: to craft beverages that are not only delicious but also a joy to experience. Our founders, a team of passionate drink enthusiasts, began experimenting with unique flavors in a small kitchen, driven by a desire to create something truly special. What started as a hobby soon grew into a mission to share our creations with the world.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              We believe in quality ingredients, ethical sourcing, and a commitment to innovation. Every bottle of Nuvia is a testament to our dedication to excellence.
            </p>
          </div>
        </div>

        {/* Our Mission Section */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <Coffee size={48} className="text-orange-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold">Crafted with Passion</h4>
              <p className="mt-2 text-gray-600">
                We obsess over every detail, ensuring each drink is a perfect blend of flavor and quality.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <Leaf size={48} className="text-green-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold">Sustainable & Ethical</h4>
              <p className="mt-2 text-gray-600">
                Our ingredients are ethically sourced, and we are committed to sustainable practices.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <Award size={48} className="text-yellow-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold">Excellence in Every Sip</h4>
              <p className="mt-2 text-gray-600">
                From our recipes to our customer service, we strive for nothing less than excellence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}