import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Investing?</h2>
        <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
          Join thousands of investors who are building their wealth with InvestWise. Start with as little as $100.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/signup"
            className="px-8 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-gray-100 transition-colors"
          >
            Create Account
          </Link>
          <Link
            href="#learn-more"
            className="px-8 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors"
          >
            Learn More
          </Link>
        </div>
        <div className="mt-12 pt-8 border-t border-white/20 text-sm opacity-80">
          <p>InvestWise is a registered investment advisor. Investing involves risk and past performance does not guarantee future results.</p>
          <p className="mt-2">By using this website, you accept our Terms of Service and Privacy Policy.</p>
        </div>
      </div>
    </section>
  );
}