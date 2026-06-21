import Banner from '@/Components/Shared/Banner';
import FeaturedTasks from '@/Components/Shared/Home/FeaturedTasks';
import TopFreelancers from '@/Components/Shared/Home/TopFreelancer';
import React from 'react';

const PublicHomePage = () => {
  return (
    <div>
      <Banner />
      <FeaturedTasks />
      <TopFreelancers />
      Public Home PublicHomePage
    </div>
  );
};

export default PublicHomePage;