import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BallPitModal from './BallPitModal'
import { gsap } from 'gsap'

const TrendingCategories = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const itemsRef = useRef([]);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  
  useEffect(() => {
    const items = itemsRef.current;
    const title = titleRef.current;
    
    if (!items.length || !title) return;
    
    // Make everything visible immediately
    gsap.set(title, { opacity: 1 });
    items.forEach(item => {
      if (item) gsap.set(item, { opacity: 1, y: 0 });
    });
  }, []);
  
  const trendingItems = [
    {
      title: 'Floral Dresses',
      subtitle: 'Up to 75% off',
      image: 'https://images.pexels.com/photos/994234/pexels-photo-994234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      link: '/women',
      gradient: 'from-[#ff7f50] to-[#ffa07a]',
      showBallPit: false
    },
    {
      title: 'Breezy Kurta Sets',
      subtitle: 'Up to 75% off',
      image: 'https://images.pexels.com/photos/3146784/pexels-photo-3146784.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      link: '/breezy-kurta',
      gradient: 'from-[#ffff00] to-[#fafad2]',
      showBallPit: false
    },
    {
      title: 'Iconic Blue Denim',
      subtitle: 'Up to 70% off',
      image: 'https://images.pexels.com/photos/1346187/pexels-photo-1346187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      link: '/denim',
      gradient: 'from-[#87ceeb] to-[#b0e0e6]',
      showBallPit: false
    },
    {
      title: 'Airy Co-ords',
      subtitle: 'Up to 70% off',
      image: 'https://images.pexels.com/photos/1163194/pexels-photo-1163194.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      link: '/coords',
      gradient: 'from-[#ff69b4] to-[#ffc0cb]',
      showBallPit: false
    },
    {
      title: 'Statement Handbags',
      subtitle: 'Up to 75% off',
      image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      link: '/handbags',
      gradient: 'from-[#dda0dd] to-[#e6e6fa]',
      showBallPit: true
    }
  ];
  
  const handleItemClick = (item) => {
    if (item.showBallPit) {
      setSelectedCategory({
        name: item.title,
        link: item.link
      });
      setModalOpen(true);
      return false; // Prevent default navigation
    }
    return true; // Allow default navigation
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-12 px-4 bg-black text-white"
      style={{
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        height: 'auto',
        minHeight: '100vh',
        overflow: 'visible'
      }}
    >
      <div className="w-36 h-2 bg-[#4299e1] mx-auto mb-6 rounded-full"></div>
      <div className="container mx-auto pt-4">
        <h2 ref={titleRef} className="text-5xl font-bold text-center mb-10 tracking-tight opacity-100">
          <span className="bg-gradient-to-r from-[#4299e1] to-[#667eea] text-transparent bg-clip-text">TRENDIEST</span>
          {' '}<span className="text-white">CATEGORIES</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {trendingItems.map((item, index) => (
            <div 
              key={index}
              ref={el => itemsRef.current[index] = el}
              className="relative group overflow-hidden rounded-xl aspect-[3/4] shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl trending-item cursor-pointer opacity-100"
              onClick={() => handleItemClick(item)}
            >
              {item.showBallPit ? (
                // For items that should show the ball pit
                <>
                  <div className="absolute inset-0 w-full h-full">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-70 group-hover:opacity-60 transition-opacity duration-300`} />
                  <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                    <h3 className="text-3xl font-bold text-white mb-3 transform transition-transform duration-300 group-hover:translate-y-[-8px]">{item.title}</h3>
                    <p className="text-white/90 text-base font-medium transform transition-transform duration-300 group-hover:translate-y-[-8px]">{item.subtitle}</p>
                  </div>
                </>
              ) : (
                // Standard link for other items
                <Link to={item.link} className="block absolute inset-0">
                  <div className="absolute inset-0 w-full h-full">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-70 group-hover:opacity-60 transition-opacity duration-300`} />
                  <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                    <h3 className="text-3xl font-bold text-white mb-3 transform transition-transform duration-300 group-hover:translate-y-[-8px]">{item.title}</h3>
                    <p className="text-white/90 text-base font-medium transform transition-transform duration-300 group-hover:translate-y-[-8px]">{item.subtitle}</p>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Ball Pit Modal */}
      {selectedCategory && (
        <BallPitModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          categoryName={selectedCategory.name}
          categoryLink={selectedCategory.link}
        />
      )}
    </section>
  );
};

export default TrendingCategories