import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-purple-100 to-purple-300 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white overflow-y-auto">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6">
        <h1 className="text-5xl font-extrabold mb-4 text-purple-800 dark:text-purple-300">Twogether</h1>
        <p className="text-xl mb-2">Long distance can be hard...</p>
        <p className="text-xl mb-4 font-semibold">But it's easier together 💜</p>
        <p className="max-w-xl text-slate-700 dark:text-slate-300">
          Most long distance apps are clunky, expensive, or missing the features that matter. Twogether is different — built by someone actually in a long-distance relationship.
        </p>
      </section>

      {/* Features Section */}
      <section className="bg-white dark:bg-slate-900 py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-purple-700 dark:text-purple-300 mb-10">Core Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <FeatureTile title="Shared Notes" description="Write and manage to-do lists together in real time." />
          <FeatureTile title="Visit Planner" description="Plan future visits with a calendar and countdowns." />
          <FeatureTile title="Interactive Map" description="Visualize your locations and see how far apart you are." />
          <FeatureTile title="Location Updates" description="Update names and locations anytime from your profile." />
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 bg-purple-50 dark:bg-slate-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-purple-800 dark:text-purple-200">Built with Love</h2>
          <p className="text-slate-700 dark:text-slate-300">
            Twogether is crafted by someone in a real long-distance relationship who knows the struggle. It's not just software — it's a labor of love to help couples stay close no matter the miles.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 flex flex-col items-center text-center">
        <h2 className="text-4xl font-bold text-purple-800 dark:text-purple-300 mb-4">Ready to feel closer?</h2>
        <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">Start planning your future together today — completely free.</p>
        <Link
          to="/auth"
          className="px-8 py-4 bg-purple-700 text-white font-semibold rounded-xl text-lg hover:bg-purple-800 transition-all"
        >
          Join Twogether
        </Link>
      </section>
    </div>
  );
}

function FeatureTile({ title, description }) {
  return (
    <div className="bg-purple-100 dark:bg-slate-700 p-6 rounded-xl shadow text-center">
      <h3 className="text-xl font-semibold mb-2 text-purple-800 dark:text-white">{title}</h3>
      <p className="text-slate-600 dark:text-slate-300">{description}</p>
    </div>
  );
}