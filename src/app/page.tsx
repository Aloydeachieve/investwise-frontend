"use client";

import React from 'react'
import HeroSection from '@/components/home/HeroSection/HeroSection'
import FeaturesSection from '@/components/home/FeaturesSection/FeaturesSection'
import InvestmentProducts from '@/components/home/InvestmentProducts/InvestmentProducts'
import TestimonialsSection from '@/components/home/TestimonialsSection/TestimonialsSection'
import FAQSection from '@/components/home/FAQSection/FAQSection'
import CallToAction from '@/components/home/CallToAction/CallToAction'

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <InvestmentProducts />
      <TestimonialsSection />
      <FAQSection />
      <CallToAction />
    </>
  )
}