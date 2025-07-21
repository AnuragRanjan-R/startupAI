import React from 'react';
import Layout from '../components/Layout';
import HeroSection from './HeroSection';
import NewsSection from './NewsSection';
import InvestorSpotlight from './InvestorSpotlight';
import EventsSection from './EventsSection';

const Landing: React.FC = () => {
  return (
    <Layout >
      <HeroSection />
      <NewsSection />
      <InvestorSpotlight />
      <EventsSection />
    </Layout>
  );
};

export default Landing;

