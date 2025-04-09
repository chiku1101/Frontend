import React from 'react'
import Banner from '../components/Banner'
import Categories from '../components/Categories'
import TrendingCategories from '../components/TrendingCategories'
import FeaturedBrands from '../components/FeaturedBrands'

const Home = () => {
  return (
    <div className="scroll-smooth">
      <Banner />
      <div className="categories-section">
        <Categories />
      </div>
      
      <div className="trending-overlay">
        <TrendingCategories />
      </div>
      
      <div className="featured-overlay">
        <FeaturedBrands />
      </div>
    </div>
  )
}

export default Home