import Banner from '@/Components/Shared/Banner';
import FeaturedTasks from '@/Components/Shared/Home/FeaturedTasks';
import PopularCategories from '@/Components/Shared/Home/PopularCategories';
import Testimonials from '@/Components/Shared/Home/Testimonials';
import TopFreelancers from '@/Components/Shared/Home/TopFreelancer';
import React from 'react';

const PublicHomePage = () => {
  return (
    <div>
      <Banner />
      <FeaturedTasks />
      <PopularCategories />
      <TopFreelancers />
      <Testimonials />
      Public Home PublicHomePage
    </div>
  );
};

export default PublicHomePage;