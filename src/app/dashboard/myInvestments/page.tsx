"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, TrendingUp, Info, Settings } from "lucide-react";
import InvestmentGraph from "@/components/dashboard/InvestmentGraph/InvestmentGraph";


const MyInvestment = () => {
  const router = useRouter();

  const handlePlanClick = (planId: string) => {
    router.push(`/dashboard/myInvestments/${planId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Main Account Balance Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
        <div className="flex flex-col space-y-4">
          <div>
            <h2 className="text-sm md:text-base font-semibold text-gray-600 mb-3">
              MAIN ACCOUNT BALANCE
            </h2>
            <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:items-start md:space-x-8">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900">
                  250.00 USD
                </div>
                <div className="text-xs md:text-sm text-gray-500">
                  0.0648 ETH
                </div>
              </div>
              <div>
                <div className="text-xs md:text-sm text-gray-500">
                  Profits (7d)
                </div>
                <div className="text-lg md:text-xl font-bold text-gray-900">
                  35.21 USD
                </div>
              </div>
              <div>
                <div className="text-xs md:text-sm text-gray-500">
                  Deposit in orders
                </div>
                <div className="text-lg md:text-xl font-bold text-gray-900">
                  120.00 USD
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 sm:flex-none bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-6 rounded-md transition-colors">
              DEPOSIT
            </button>
            <button className="flex-1 sm:flex-none bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2.5 px-6 rounded-md transition-colors">
              WITHDRAW
            </button>
          </div>
        </div>
      </div>

      {/* Invested Plans Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 space-y-4 md:space-y-0">
        <div>
          <div className="text-xs md:text-sm text-gray-500 mb-1">
            Investment
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Invested Plans
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            At a glance summary of your investment.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm md:text-base">
            Deposit Funds <ArrowRight className="w-4 h-4 ml-2" />
          </button>
          <button className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm md:text-base">
            Invest & Earn <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>

      {/* Investment Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-8">
        {/* Investment Account Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 md:p-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base md:text-lg font-semibold text-gray-900">
                Investment Account
              </h3>
              <Info className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="p-4 md:p-6">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div>
                <div className="text-xl md:text-2xl font-bold text-gray-900">
                  0.00{" "}
                  <span className="text-sm font-normal text-gray-500">USD</span>
                </div>
                <div className="text-xs md:text-sm text-gray-500">
                  Available Funds
                </div>
              </div>
              <div className="text-gray-300 text-xl">+</div>
              <div>
                <div className="text-xl md:text-2xl font-bold text-gray-900">
                  422.51
                </div>
                <div className="text-xs md:text-sm text-gray-500">Locked</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <button className="flex items-center justify-center px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-md transition-colors text-sm md:text-base flex-1 sm:flex-none">
                Transfer Funds <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Amount Invested Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 md:p-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base md:text-lg font-semibold text-gray-900">
                Amount in Invested
              </h3>
              <Info className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="p-4 md:p-6">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div>
                <div className="text-xl md:text-2xl font-bold text-gray-900">
                  250.00{" "}
                  <span className="text-sm font-normal text-gray-500">USD</span>
                </div>
                <div className="text-xs md:text-sm text-gray-500">
                  Currently Invested
                </div>
              </div>
              <div className="text-gray-300 text-xl">+</div>
              <div>
                <div className="text-xl md:text-2xl font-bold text-gray-900">
                  172.5
                </div>
                <div className="text-xs md:text-sm text-gray-500">
                  Approx Profit
                </div>
              </div>
            </div>
            <InvestmentGraph />
            <div className="flex gap-4 mt-6">
              <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                Transactions
              </button>
              <button className="text-gray-400 hover:text-gray-500 text-sm font-medium">
                History
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Active Plans */}
      <div>
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">
          Active Plan (1)
        </h2>

        {/* Desktop View - Full Table */}
        <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div
            className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => handlePlanClick("venus-weekly-001")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 text-base">
                    Venus - Weekly 5.75% for 3 Months
                  </h3>
                  <p className="text-sm text-gray-500">Invested: 250.00 USD</p>
                </div>
              </div>

              <div className="flex items-center space-x-6 text-sm ml-6">
                <div>
                  <div className="text-gray-500 text-xs mb-1">Start Date</div>
                  <div className="font-medium text-gray-900">
                    Jul 29, 2025 08:50 PM
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <div>
                  <div className="text-gray-500 text-xs mb-1">End Date</div>
                  <div className="font-medium text-gray-900">
                    Oct 29, 2025 08:51 PM
                  </div>
                </div>
                <div className="w-px h-10 bg-gray-200"></div>
                <div>
                  <div className="text-gray-500 text-xs mb-1">Total Return</div>
                  <div className="font-medium text-gray-900">422.5 USD</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs mb-1">Net Profit</div>
                  <div className="font-medium text-green-600">172.5 USD</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View - Compact Card */}
        <div
          className="md:hidden bg-white rounded-lg shadow-sm border border-gray-200 p-4 active:bg-gray-50 cursor-pointer transition-colors"
          onClick={() => handlePlanClick("venus-weekly-001")}
        >
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-base mb-1">
                Venus - Weekly 5.75% for 3 Months
              </h3>
              <p className="text-sm text-gray-500 mb-3">Invested: 250.00 USD</p>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-gray-500 text-xs mb-0.5">Net Profit</div>
                  <div className="font-semibold text-green-600">172.5 USD</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs mb-0.5">
                    Total Return
                  </div>
                  <div className="font-semibold text-gray-900">422.5 USD</div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500">Tap for details</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInvestment;
