'use client';

import React from "react";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

const InvestmentPlanDetails = () => {
  // In a real app, you'd fetch this data based on the plan ID
  const router = useRouter();

  const planData = {
    title: "Venus - Weekly 5.75% for 3 Months",
    planId: "INV-1009136",
    status: "Active",
    invested: "250.00",
    profit: "172.5",
    totalReturn: "422.51",
    details: [
      { label: "Term basis", value: "Weekly", label2: "Interest (weekly)", value2: "5.75%" },
      { label: "Term duration", value: "3 Months", label2: "Total net profit", value2: "USD 172.5" },
      { label: "Term start at", value: "Jul 29, 2025 08:50 PM", label2: "Weekly profit (inc. cap)", value2: "USD 35.21" },
      { label: "Term end at", value: "Oct 29, 2025 08:51 PM", label2: "Adjust profit", value2: "12 / 12 times" },
      { label: "Ordered date", value: "Jul 29, 2025 08:50 PM", label2: "Payment source", value2: "Main Account" },
      { label: "Payment reference", value: "97120609", label2: "Paid amount", value2: "USD 250.00" },
    ],
    graphData: [
      { label: "Overview", percentage: "100%", subtitle: "5.75% / per week", start: "0.00 USD", end: "422.5 USD", color: "blue" },
      { label: "Net Profit", percentage: "5.75%", subtitle: "weekly profit", start: "0.00 USD", end: "172.5 USD", color: "green" },
      { label: "Remain", percentage: "0", subtitle: "remain to adjust", start: "0 Time", end: "12 Times", color: "purple" },
    ],
    transactions: [
      { details: "Investment", date: "Jul 29, 2025 08:50 PM", amount: "-250.00", isNegative: true },
      { details: "Profit Earn - 5.75%", date: "Aug 05, 2025 08:50 PM", amount: "+35.209", isNegative: false },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-6">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4 text-sm md:text-base"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Investment
        </button>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start gap-3">
            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {planData.title}
              </h1>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{planData.planId}</span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                  {planData.status}
                </span>
              </div>
            </div>
          </div>
          
          <button className="p-2 hover:bg-gray-100 rounded-md transition-colors self-start sm:self-center">
            <RefreshCw className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
          <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
            {planData.invested} <span className="text-base font-normal text-gray-500">USD</span>
          </div>
          <div className="text-sm text-gray-500">Invested</div>
          <div className="text-lg md:text-xl font-semibold text-gray-700 mt-3">
            + {planData.profit}
          </div>
          <div className="text-sm text-gray-500">Profit</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 sm:col-span-2">
          <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
            {planData.totalReturn} <span className="text-base font-normal text-gray-500">USD</span>
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-1">
            Total Returned (inc. cap) 
            <span className="inline-block w-4 h-4 text-gray-400">ⓘ</span>
          </div>
        </div>
      </div>

      {/* Details Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 md:mb-8 overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {planData.details.map((row, index) => (
              <div 
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center justify-between p-4 md:border-r border-gray-100">
                  <span className="text-sm text-gray-600">{row.label}</span>
                  <span className="text-sm font-medium text-gray-900">{row.value}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 md:bg-white border-t md:border-t-0 border-gray-100">
                  <span className="text-sm text-gray-600">{row.label2}</span>
                  <span className="text-sm font-medium text-gray-900">{row.value2}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Graph View Section */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">Graph View</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {planData.graphData.map((graph, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
              <h3 className="text-sm md:text-base font-semibold text-gray-900 text-center mb-4">
                {graph.label}
              </h3>
              
              {/* Circular Progress */}
              <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                  {/* Background circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="16"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke={graph.color === 'blue' ? '#3b82f6' : graph.color === 'green' ? '#10b981' : '#8b5cf6'}
                    strokeWidth="16"
                    strokeDasharray={`${(parseFloat(graph.percentage) / 100) * 502.4} 502.4`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                
                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">{graph.percentage}</div>
                  <div className="text-xs text-gray-500 text-center px-2">{graph.subtitle}</div>
                </div>
              </div>
              
              {/* Legend */}
              <div className="flex justify-between text-xs text-gray-600">
                <span>{graph.start}</span>
                <span>{graph.end}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transactions Section */}
      <div>
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">Transactions</h2>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Desktop Table Header */}
          <div className="hidden md:grid md:grid-cols-3 bg-gray-50 border-b border-gray-200 p-4 text-sm font-medium text-gray-600">
            <div>DETAILS</div>
            <div>DATE & TIME</div>
            <div className="text-right">AMOUNT</div>
          </div>
          
          {/* Transactions */}
          {planData.transactions.map((transaction, index) => (
            <div 
              key={index}
              className="border-b border-gray-100 last:border-b-0 p-4 hover:bg-gray-50 transition-colors"
            >
              {/* Mobile Layout */}
              <div className="flex flex-col md:hidden gap-2">
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-gray-900">{transaction.details}</span>
                  <span className={`text-sm font-semibold ${transaction.isNegative ? 'text-red-600' : 'text-green-600'}`}>
                    {transaction.amount}
                  </span>
                </div>
                <span className="text-xs text-gray-500">{transaction.date}</span>
              </div>
              
              {/* Desktop Layout */}
              <div className="hidden md:grid md:grid-cols-3 md:items-center">
                <div className="text-sm text-gray-900">{transaction.details}</div>
                <div className="text-sm text-gray-600">{transaction.date}</div>
                <div className={`text-sm font-semibold text-right ${transaction.isNegative ? 'text-red-600' : 'text-green-600'}`}>
                  {transaction.amount}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvestmentPlanDetails;