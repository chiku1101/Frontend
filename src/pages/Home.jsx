import React from 'react'
import Banner from '../components/Banner'
import Categories from '../components/Categories'
import TrendingCategories from '../components/TrendingCategories'
import FeaturedBrands from '../components/FeaturedBrands'

const Home = () => {
  return (
    <div>
      <Banner />
      <Categories />
      <TrendingCategories />
      <FeaturedBrands />
    </div>
  )
}

export default Home