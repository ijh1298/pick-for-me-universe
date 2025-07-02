
import { useState } from "react";
import Header from "@/components/Header";
import ContentCard from "@/components/ContentCard";
import ContentDetailDialog from "@/components/ContentDetailDialog";
import { Heart } from "lucide-react";

const Favorites = () => {
  const [selectedContent, setSelectedContent] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // 즐겨찾기된 작품들 (실제로는 localStorage나 상태관리에서 가져와야 함)
  const favoriteContents = [
    {
      id: "1",
      title: "기생충",
      platform: "Netflix",
      genre: "스릴러 🎬",
      mood: "긴장감 넘치는 😰",
      rating: 4.8,
      year: 2019,
      thumbnail: "https://images.unsplash.com/photo-1489599904472-84b9ca35e8b1?w=300&h=450&fit=crop",
      description: "전 세계를 뒤흔든 봉준호 감독의 대표작. 계급사회의 모순을 날카롭게 그려낸 작품입니다.",
      duration: "132분",
      reviews: [
        { user: "영화광123", rating: 5, comment: "정말 충격적이고 깊이 있는 작품이었습니다!" },
        { user: "드라마러버", rating: 4, comment: "연출과 연기 모두 완벽했어요" }
      ]
    },
    {
      id: "4",
      title: "오징어 게임",
      platform: "Netflix",
      genre: "스릴러 🎬",
      mood: "긴장감 넘치는 😰",
      rating: 4.5,
      year: 2021,
      thumbnail: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=450&fit=crop",
      description: "전 세계적 신드롬을 일으킨 한국 드라마. 생존 게임의 새로운 패러다임을 제시했습니다.",
      duration: "60분×9화",
      reviews: [
        { user: "글로벌뷰어", rating: 5, comment: "전 세계가 열광한 이유를 알 수 있었어요!" },
        { user: "한류팬", rating: 4, comment: "한국 콘텐츠의 위상을 보여준 작품" }
      ]
    }
  ];

  const handleContentClick = (content: any) => {
    setSelectedContent(content);
    setIsDetailOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="w-8 h-8 text-red-500 fill-current" />
          <h1 className="text-3xl font-bold text-white">내가 좋아하는 작품들</h1>
        </div>

        {favoriteContents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteContents.map((content) => (
              <ContentCard
                key={content.id}
                content={content}
                onClick={() => handleContentClick(content)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-400 mb-2">아직 좋아하는 작품이 없어요</h2>
            <p className="text-gray-500">마음에 드는 작품에 하트를 눌러보세요!</p>
          </div>
        )}
      </main>

      {selectedContent && (
        <ContentDetailDialog
          content={selectedContent}
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
        />
      )}
    </div>
  );
};

export default Favorites;
