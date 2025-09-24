import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 z-0"></div>
      
      {/* Abstract shapes */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 hidden lg:block z-0">
        <svg width="404" height="384" fill="none" viewBox="0 0 404 384" aria-hidden="true">
          <defs>
            <pattern id="pattern-squares" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="4" height="4" fill="rgba(99, 102, 241, 0.2)" />
            </pattern>
          </defs>
          <rect width="404" height="384" fill="url(#pattern-squares)" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 hidden lg:block z-0">
        <svg width="404" height="384" fill="none" viewBox="0 0 404 384" aria-hidden="true">
          <defs>
            <pattern id="pattern-circles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="3" fill="rgba(59, 130, 246, 0.2)" />
            </pattern>
          </defs>
          <rect width="404" height="384" fill="url(#pattern-circles)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col-reverse lg:flex-row items-center">
            {/* Left content */}
            <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Invest Smarter,
                <br />
                <span className="text-blue-600">Secure Your Future</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl">
                InvestWise combines advanced technology with financial expertise to help you 
                build wealth with confidence. Start investing with as little as $100.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/signup"
                  className="px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors text-center"
                >
                  Get Started
                </Link>
                <Link
                  href="#learn-more"
                  className="px-8 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors text-center"
                >
                  Learn More
                </Link>
              </div>
              <div className="mt-10 flex items-center">
                <div className="flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`w-10 h-10 rounded-full bg-blue-${i * 100 + 200} border-2 border-white flex items-center justify-center text-white font-medium`}>
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <p className="ml-4 text-sm text-gray-600">
                  Join over <span className="font-medium">50,000</span> investors who trust InvestWise
                </p>
              </div>
            </div>
            
            {/* Right content - Illustration */}
            <div className="w-full lg:w-1/2 lg:pl-12">
              <div className="relative">
                <div className="aspect-w-4 aspect-h-3 rounded-lg shadow-xl overflow-hidden bg-white">
                  <div className="p-8">
                    <div className="h-4 w-24 bg-blue-100 rounded mb-6"></div>
                    <div className="h-6 w-32 bg-blue-600 rounded mb-12"></div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                        <div className="h-4 w-16 bg-green-200 rounded"></div>
                      </div>
                      <div className="h-16 w-full bg-blue-50 rounded"></div>
                      
                      <div className="flex justify-between items-center">
                        <div className="h-4 w-20 bg-gray-200 rounded"></div>
                        <div className="h-4 w-12 bg-blue-200 rounded"></div>
                      </div>
                      <div className="h-16 w-full bg-green-50 rounded"></div>
                      
                      <div className="flex justify-between items-center">
                        <div className="h-4 w-28 bg-gray-200 rounded"></div>
                        <div className="h-4 w-14 bg-purple-200 rounded"></div>
                      </div>
                      <div className="h-16 w-full bg-indigo-50 rounded"></div>
                    </div>
                  </div>
                </div>
                
                {/* Stats card */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-5 md:p-6 lg:p-8 w-52">
                  <div className="flex flex-col">
                    <div className="flex items-center mb-2">
                      <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-600">Portfolio Growth</span>
                    </div>
                    <span className="text-2xl font-bold text-gray-900">+24.3%</span>
                    <span className="text-sm text-green-600 mt-1">Year-to-Date</span>
                  </div>
                </div>
                
                {/* Chart card */}
                <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-5 w-48 hidden sm:block">
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <div className="h-4 w-12 bg-blue-100 rounded"></div>
                      <div className="h-4 w-8 bg-blue-600 rounded"></div>
                    </div>
                    <div className="flex items-end space-x-1 h-16">
                      {[30, 50, 25, 45, 55, 40, 60, 35, 45, 55, 65, 50].map((h, i) => (
                        <div key={i} style={{height: `${h}%`}} className="w-1/12 bg-blue-600 rounded-t"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Trust badges */}
          <div className="mt-16 border-t border-gray-200 pt-8">
            <p className="text-center text-sm text-gray-500 mb-6">Trusted by industry-leading companies</p>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
              {["Forbes", "Bloomberg", "TechCrunch", "CNBC", "WSJ"].map((brand) => (
                <div key={brand} className="text-gray-400 font-semibold text-lg">
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}