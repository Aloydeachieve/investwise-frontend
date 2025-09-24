import Link from 'next/link';

export default function InvestmentProducts() {
  const products = [
    {
      name: "High-Yield Savings",
      description: "Earn higher interest rates than traditional bank accounts with our FDIC-insured savings plans.",
      apy: "4.25%",
      minInvestment: "$0",
      risk: "Very Low",
      color: "bg-green-100",
      textColor: "text-green-700",
      link: "/products/savings"
    },
    {
      name: "Growth Portfolio",
      description: "A diversified mix of stocks and bonds designed for long-term capital appreciation.",
      apy: "9-12%",
      minInvestment: "$1,000",
      risk: "Medium",
      color: "bg-blue-100",
      textColor: "text-blue-700",
      link: "/products/growth"
    },
    {
      name: "Dividend Income",
      description: "Focus on established companies that regularly pay dividends to generate passive income.",
      apy: "6-8%",
      minInvestment: "$5,000",
      risk: "Medium-Low",
      color: "bg-indigo-100",
      textColor: "text-indigo-700",
      link: "/products/dividend"
    },
    {
      name: "Tech Innovation Fund",
      description: "Invest in cutting-edge technology companies with high growth potential.",
      apy: "12-18%",
      minInvestment: "$2,500",
      risk: "High",
      color: "bg-purple-100",
      textColor: "text-purple-700",
      link: "/products/tech"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Investment Products</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our range of investment options tailored to different financial goals and risk appetites.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 flex flex-col">
              <div className={`p-4 ${product.color} ${product.textColor}`}>
                <h3 className="text-xl font-semibold">{product.name}</h3>
              </div>
              <div className="p-6 flex-grow">
                <p className="text-gray-600 mb-6">{product.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Est. Annual Return:</span>
                    <span className="font-medium">{product.apy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Minimum:</span>
                    <span className="font-medium">{product.minInvestment}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Risk Level:</span>
                    <span className="font-medium">{product.risk}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-100">
                <Link href={product.link} className="block w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-center rounded-md transition-colors">
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/products" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800">
            View All Investment Options
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}