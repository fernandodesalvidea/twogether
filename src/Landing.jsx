import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from './logo.png';

export default function Landing() {
  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 text-slate-900 dark:text-white">
      {/* Hero */}
      <section className="w-full min-h-screen flex flex-col items-center justify-center px-4 py-20 text-center">
        <img src={logo} alt="Twogether Logo" className="w-16 h-16 mb-4" />
        <h1 className="text-4xl font-bold text-purple-700 mb-2">Twogether</h1>
        <p className="text-lg text-slate-700 dark:text-slate-300 mb-2">
          Long distance can be hard — but it's easier <span className="text-purple-600 font-semibold">together</span>. ❤️
        </p>
        <p className="max-w-xl text-sm text-slate-600 dark:text-slate-400">
          Most long-distance apps are too expensive or lack personality.
          Twogether is free, personal, and built by someone who understands.
        </p>
        <Link
          to="#features"
          className="mt-6 px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg shadow hover:bg-slate-100 transition"
        >
          Learn More ↓
        </Link>
      </section>

      {/* Features */}
      <section id="features" className="w-full px-6 py-16 bg-white dark:bg-slate-900 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-10"
        >
          Features
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              title: 'Map View',
              desc: 'Visualize the distance between you both with animated globe arcs.',
            },
            {
              title: 'Shared Notes',
              desc: 'Plan your future together with our to-do and notes section.',
            },
            {
              title: 'Visit Planner',
              desc: 'Create and count down to your next visit with ease.',
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.2 }}
              className="bg-purple-100 dark:bg-purple-800 rounded-xl p-6 shadow-md transition-all"
            >
              <h3 className="text-xl font-semibold text-purple-800 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full px-6 py-20 bg-gradient-to-br from-white to-purple-100 dark:from-slate-800 dark:to-slate-900 text-center"
      >
        <h2 className="text-3xl font-bold mb-4">About Twogether</h2>
        <p className="max-w-xl mx-auto text-slate-600 dark:text-slate-300">
          Twogether was built by someone in a real long-distance relationship who
          knows how important shared connection and planning can be. No fluff,
          just love — made with purpose.
        </p>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full px-6 py-20 text-center bg-purple-600 text-white"
      >
        <h2 className="text-3xl font-bold mb-4">Join Twogether Today</h2>
        <p className="mb-6">Make your love stronger — no matter the distance.</p>
        <Link
          to="/auth"
          className="px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg hover:bg-slate-100 transition"
        >
          Start Planning
        </Link>
      </motion.section>
    </div>
  );
}