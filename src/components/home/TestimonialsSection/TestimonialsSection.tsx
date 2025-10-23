'use client';

import { useState } from 'react';

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials = [
    {
      quote: "TreVox has completely transformed how I approach investing. The automated portfolio management and rebalancing has saved me countless hours while delivering excellent returns.",
      author: "Sarah Johnson",
      title: "Software Engineer",
      image: "/images/testimonial-1.jpg" // Will be added later
    },
    {
      quote: "As someone new to investing, I was intimidated by the stock market. TreVox made it easy to get started with clear guidance and low minimum investments. My portfolio is up 12% this year!",
      author: "Michael Chen",
      title: "Marketing Director",
      image: "/images/testimonial-2.jpg" // Will be added later
    },
    {
      quote: "The financial advisors at TreVox helped me develop a retirement strategy that I'm confident in. Their tax-optimization strategies alone have saved me thousands in taxes.",
      author: "Robert Patel",
      title: "Small Business Owner",
      image: "/images/testimonial-3.jpg" // Will be added later
    }
  ];

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Thousands of investors trust TreVox to help them achieve their financial goals.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-md">
            <div className="flex items-center mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                  {/* Placeholder for testimonial image */}
                  <div className="w-full h-full flex items-center justify-center text-gray-500 font-medium">
                    {testimonials[activeIndex].author.charAt(0)}
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-lg">{testimonials[activeIndex].author}</h3>
                <p className="text-gray-600">{testimonials[activeIndex].title}</p>
              </div>
            </div>

            <blockquote>
              <p className="text-gray-700 text-lg md:text-xl italic leading-relaxed">
                &ldquo;{testimonials[activeIndex].quote}&rdquo;
              </p>
            </blockquote>
          </div>

          <div className="mt-8 flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === activeIndex ? "bg-blue-600" : "bg-gray-300"
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}