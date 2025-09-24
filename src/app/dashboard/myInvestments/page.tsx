import React from "react";
import {
  TrendingUp,
  ArrowRight,
  Settings,
} from "lucide-react";
import InvestmentGraph from "@/components/dashboard/InvestmentGraph/InvestmentGraph";

const MyInvestment = () => {
  return (
    <>
      {/* Main Content */}
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="text-sm text-gray-500 mb-1">Investment</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Invested Plans
            </h1>
            <p className="text-gray-600">
              At a glance summary of your investment.
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              <span>Deposit Funds</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              <span>Invest & Earn</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Investment Cards */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Investment Account Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Investment Account
              </h3>
              <div className="w-6 h-6 text-gray-400">ⓘ</div>
            </div>

            <div className="flex items-center space-x-4 mb-4">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  0.00 <span className="text-sm font-normal text-gray-500">USD</span>
                </div>
                <div className="text-sm text-gray-500">Available Funds</div>
              </div>
              <div className="text-gray-300">+</div>
              <div>
                <div className="text-2xl font-bold text-gray-900">221.62</div>
                <div className="text-sm text-gray-500">Locked</div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded text-sm">
                <span>Transfer Funds</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Amount Invested Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Amount Invested
              </h3>
              <div className="w-6 h-6 text-gray-400">ⓘ</div>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  200.00 <span className="text-sm font-normal text-gray-500">USD</span>
                </div>
                <div className="text-sm text-gray-500">Currently Invested</div>
              </div>
              <div className="text-gray-300">+</div>
              <div>
                <div className="text-2xl font-bold text-gray-900">21.6</div>
                <div className="text-sm text-gray-500">Approx Profit</div>
              </div>
            </div>

            {/* Chart */}
            <InvestmentGraph />

            <div className="flex space-x-4 text-sm">
              <button className="text-blue-500 border-b-2 border-blue-500 pb-1">
                Transactions
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                History
              </button>
            </div>
          </div>
        </div>

        {/* Active Plans */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Active Plan (2)
          </h2>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Plan 1 */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Mercury - Hourly 0.45% for 1 Day
                    </h3>
                    <p className="text-sm text-gray-500">Invested: 100.00 USD</p>
                  </div>
                </div>

                <div className="flex items-center space-x-8 text-sm">
                  <div>
                    <div className="text-gray-500">Start Date</div>
                    <div className="font-medium">Sep 10, 2025 05:27 PM</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="text-gray-500">End Date</div>
                    <div className="font-medium">Sep 11, 2025 05:28 PM</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Total Return</div>
                    <div className="font-medium">110.8 USD</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Net Profit</div>
                    <div className="font-medium text-green-600">10.8 USD</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Plan 2 */}
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Mercury - Hourly 0.45% for 1 Day
                    </h3>
                    <p className="text-sm text-gray-500">Invested: 100.00 USD</p>
                  </div>
                </div>

                <div className="flex items-center space-x-8 text-sm">
                  <div>
                    <div className="text-gray-500">Start Date</div>
                    <div className="font-medium">Sep 05, 2025 06:37 PM</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="text-gray-500">End Date</div>
                    <div className="font-medium">Sep 06, 2025 06:38 PM</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Total Return</div>
                    <div className="font-medium">110.8 USD</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Net Profit</div>
                    <div className="font-medium text-green-600">10.8 USD</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Currency Ticker */}
        {/* <div className="fixed top-0 left-0 right-0 bg-gray-100 border-b border-gray-200 px-4 py-2 text-xs text-gray-600 z-10">
          <div className="flex space-x-6 overflow-x-auto">
            <span>CAD = 1.384</span>
            <span>USD/AUD = 1.502</span>
            <span>USD/TRY = 41.3</span>
            <span>USD/RUB = 73.4</span>
            <span>USD/INR = 83.27</span>
            <span>USD/BRL = 5.393</span>
            <span>USD/BTC = 0.00000874</span>
            <span>USD/ETH = ...</span>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default MyInvestment;
