
import { useEffect, useState } from "react";

const InfiniteCarousel = () => {
  const [posters] = useState([
    "https://images.unsplash.com/photo-1489599904472-84b9ca35e8b1?w=300&h=450&fit=crop",
    "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&h=450&fit=crop",
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=300&h=450&fit=crop",
    "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=450&fit=crop",
    "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=450&fit=crop",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop",
    "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=450&fit=crop",
    "https://images.unsplash.com/photo-1571847140471-1d7766e825ea?w=300&h=450&fit=crop",
    "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&h=450&fit=crop",
  ]);

  return (
    <div className="w-full h-64 overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-blue-900/20"></div>
      
      <div className="flex animate-scroll-left">
        {/* 첫 번째 세트 */}
        {posters.map((poster, index) => (
          <div
            key={`first-${index}`}
            className="flex-shrink-0 w-40 h-60 mx-2 rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={poster}
              alt={`Movie poster ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        
        {/* 두 번째 세트 (무한 스크롤을 위한 복제) */}
        {posters.map((poster, index) => (
          <div
            key={`second-${index}`}
            className="flex-shrink-0 w-40 h-60 mx-2 rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={poster}
              alt={`Movie poster ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      
      {/* 오버레이 그라데이션 */}
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-gray-900 via-gray-800/50 to-transparent"></div>
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-gray-900 via-gray-800/50 to-transparent"></div>
    </div>
  );
};

export default InfiniteCarousel;
