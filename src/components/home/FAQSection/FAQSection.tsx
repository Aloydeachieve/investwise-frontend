"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs = [
    {
      question: "How does InvestWise work?",
      answer: "InvestWise uses advanced algorithms to create and manage a personalized investment portfolio based on your financial goals and risk tolerance. We invest your money in a diversified mix of low-cost ETFs across global markets, and our platform automatically rebalances your portfolio to maintain your target asset allocation."
    },
    {
      question: "What are the fees?",
      answer: "InvestWise charges a flat annual fee of 0.25% on your account balance, billed quarterly. There are no additional trading commissions, account maintenance fees, or withdrawal penalties. The underlying ETFs in your portfolio have their own expense ratios, which typically range from 0.04% to 0.15%."
    },
    {
      question: "Is my money safe with InvestWise?",
      answer: "Yes. InvestWise is a registered investment advisor with the SEC, and all accounts are held with our trusted broker-dealer partner, which provides SIPC insurance that protects securities in your account up to $500,000, including up to $250,000 in cash. Additionally, our broker-dealer partner provides additional insurance beyond SIPC limits."
    },
    {
      question: "What's the minimum investment?",
      answer: "You can start investing with as little as $100 for our basic investment accounts. Some specialized portfolios may require higher minimums, typically starting at $1,000. There's no minimum for additional deposits."
    },
    {
      question: "How do I withdraw my money?",
      answer: "You can withdraw money from your InvestWise account at any time without penalty. Simply log into your account, select the 'Withdraw' option, and specify the amount. Withdrawals typically take 3-5 business days to complete as we need to sell investments and transfer the funds to your bank account."
    },
    {
      question: "What types of accounts do you offer?",
      answer: "We offer various account types including individual and joint taxable accounts, Traditional IRAs, Roth IRAs, SEP IRAs, and 401(k) rollovers. Each account type has different tax implications, contribution limits, and withdrawal rules."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get answers to common questions about investing with InvestWise.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
            {faqs.map((faq, index) => (
              <div key={index} className="py-5">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full justify-between items-center text-left focus:outline-none"
                >
                  <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      openIndex === index ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="mt-2 text-gray-600 pr-8">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}