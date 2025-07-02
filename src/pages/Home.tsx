
import { useState } from "react";
import Header from "@/components/Header";
import ContentCard from "@/components/ContentCard";
import ContentDetailDialog from "@/components/ContentDetailDialog";
import FilterDialog from "@/components/FilterDialog";
import InfiniteCarousel from "@/components/InfiniteCarousel";
import { Button } from "@/components/ui/button";
import { Filter, Sparkles, TrendingUp, Award, Zap, Calendar, Settings } from "lucide-react";

const Home = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [filters, setFilters] = useState({
    platforms: [],
    genres: [],
    moods: [],
  });

  // 목 데이터 - 썸네일 수정
  const allContents = [
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
      category: "custom",
      reviews: [
        { id: "1", author: "영화광123", rating: 5, content: "정말 충격적이고 깊이 있는 작품이었습니다!", date: "2024-01-15" },
        { id: "2", author: "드라마러버", rating: 4, content: "연출과 연기 모두 완벽했어요", date: "2024-01-10" }
      ]
    },
    {
      id: "2",
      title: "인셉션",
      platform: "Netflix",
      genre: "SF 🚀",
      mood: "지적인 🤔",
      rating: 4.7,
      year: 2010,
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop",
      description: "놀란 감독의 대표작. 꿈 속의 꿈이라는 독특한 설정으로 관객들을 사로잡았습니다.",
      duration: "148분",
      category: "awarded",
      reviews: [
        { id: "3", author: "놀란팬", rating: 5, content: "놀란 감독님, 제 꿈도 설계해주세요!", date: "2024-01-12" },
        { id: "4", author: "SF매니아", rating: 4, content: "스토리텔링이 정말 대단해요", date: "2024-01-08" }
      ]
    },
    {
      id: "3",
      title: "어벤져스: 엔드게임",
      platform: "Disney+",
      genre: "액션 💥",
      mood: "신나는 😄",
      rating: 4.6,
      year: 2019,
      thumbnail: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=450&fit=crop",
      description: "마블 시네마틱 유니버스의 클라이맥스. 히어로들의 화려한 액션과 감동적인 스토리가 인상적입니다.",
      duration: "181분",
      category: "trending",
      reviews: [
        { id: "5", author: "마블팬", rating: 5, content: "마블은 역시 실망시키지 않아요!", date: "2024-01-05" },
        { id: "6", author: "액션히어로", rating: 4, content: "액션씬이 정말 화려하고 멋있었어요", date: "2024-01-03" }
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
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop",
      description: "전 세계적 신드롬을 일으킨 한국 드라마. 생존 게임의 새로운 패러다임을 제시했습니다.",
      duration: "60분×9화",
      category: "trending",
      reviews: [
        { id: "7", author: "글로벌뷰어", rating: 5, content: "전 세계가 열광한 이유를 알 수 있었어요!", date: "2024-01-01" },
        { id: "8", author: "한류팬", rating: 4, content: "한국 콘텐츠의 위상을 보여준 작품", date: "2024-01-02" }
      ]
    },
    {
      id: "5",
      title: "이터널 선샤인",
      platform: "왓챠",
      genre: "멜로/로맨스 💖",
      mood: "몽환적인 💭",
      rating: 4.4,
      year: 2004,
      thumbnail: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&h=450&fit=crop",
      description: "사랑의 기억을 지우는 실험적인 설정이 돋보이는 영화. 독특한 영상미와 감성적인 스토리가 인상적입니다.",
      duration: "108분",
      category: "custom",
      reviews: [
        { id: "9", author: "감성충만", rating: 5, content: "인생 영화 등극! OST도 너무 좋아요", date: "2024-01-04" },
        { id: "10", author: "멜로홀릭", rating: 4, content: "영상미가 정말 아름다워요", date: "2024-01-06" }
      ]
    },
    {
      id: "6",
      title: "기묘한 이야기",
      platform: "Netflix",
      genre: "SF 🚀",
      mood: "긴장감 넘치는 😰",
      rating: 4.3,
      year: 2016,
      thumbnail: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=300&h=450&fit=crop",
      description: "80년대 분위기를 완벽하게 재현한 SF 스릴러 드라마. 흥미진진한 스토리와 매력적인 캐릭터들이 돋보입니다.",
      duration: "50분×8화",
      category: "new",
      reviews: [
        { id: "11", author: "SF드라마광", rating: 5, content: "밤새도록 정주행했어요!", date: "2024-01-07" },
        { id: "12", author: "80년대향수", rating: 4, content: "80년대 분위기가 너무 좋아요", date: "2024-01-08" }
      ]
    },
    {
      id: "7",
      title: "그랜드 부다페스트 호텔",
      platform: "왓챠",
      genre: "코미디 🤣",
      mood: "유쾌한 😄",
      rating: 4.2,
      year: 2014,
      thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=450&fit=crop",
      description: "웨스 앤더슨 감독 특유의 미장센이 돋보이는 영화. 화려한 색감과 유쾌한 스토리가 인상적입니다.",
      duration: "99분",
      category: "awarded",
      reviews: [
        { id: "13", author: "색감천재", rating: 5, content: "웨스 앤더슨 감독님은 천재 같아요!", date: "2024-01-09" },
        { id: "14", author: "코미디매니아", rating: 4, content: "유머 코드가 너무 좋아요", date: "2024-01-10" }
      ]
    },
    {
      id: "8",
      title: "블랙 미러",
      platform: "Netflix",
      genre: "SF 🚀",
      mood: "심오한 🤔",
      rating: 4.1,
      year: 2011,
      thumbnail: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&h=450&fit=crop",
      description: "현대 사회의 어두운 면을 그린 SF 옴니버스 드라마. 기술 발전의 이면을 날카롭게 비판합니다.",
      duration: "60분×3화",
      category: "new",
      reviews: [
        { id: "15", author: "SF철학자", rating: 5, content: "생각할 거리를 던져주는 드라마", date: "2024-01-11" },
        { id: "16", author: "블랙미러팬", rating: 4, content: "매 에피소드가 충격적이에요", date: "2024-01-12" }
      ]
    },
    {
      id: "9",
      title: "존 윅",
      platform: "웨이브",
      genre: "액션 💥",
      mood: "신나는 😄",
      rating: 4.0,
      year: 2014,
      thumbnail: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=450&fit=crop",
      description: "액션 영화의 새로운 지평을 연 작품. 키아누 리브스의 화려한 액션이 돋보입니다.",
      duration: "101분",
      category: "action",
      reviews: [
        { id: "17", author: "액션광", rating: 5, content: "액션씬이 정말 시원하고 통쾌해요!", date: "2024-01-13" },
        { id: "18", author: "키아누팬", rating: 4, content: "키아누 리브스는 역시 멋있어요", date: "2024-01-14" }
      ]
    },
    {
      id: "10",
      title: "베놈",
      platform: "웨이브",
      genre: "액션 💥",
      mood: "신나는 😄",
      rating: 3.9,
      year: 2018,
      thumbnail: "https://images.unsplash.com/photo-1571847140471-1d7766e825ea?w=300&h=450&fit=crop",
      description: "마블 코믹스의 빌런 베놈을 주인공으로 한 영화. 톰 하디의 연기와 화려한 액션이 돋보입니다.",
      duration: "112분",
      category: "action",
      reviews: [
        { id: "19", author: "마블매니아", rating: 4, content: "베놈의 매력에 푹 빠졌어요!", date: "2024-01-15" },
        { id: "20", author: "톰하디팬", rating: 3, content: "톰 하디의 연기는 역시 최고", date: "2024-01-16" }
      ]
    },
  ];

  const customRecommendations = allContents.filter(content => content.category === 'custom');
  const trendingContents = allContents.filter(content => content.category === 'trending');
  const newReleases = allContents.filter(content => content.category === 'new');
  const awardedContents = allContents.filter(content => content.category === 'awarded');
  const actionThrillerContents = allContents.filter(content => content.category === 'action');

  const handleContentClick = (content: any) => {
    setSelectedContent(content);
    setIsDetailOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section with Infinite Carousel */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4 pick-gradient-text">
              당신만을 위한 특별한 추천
            </h1>
            <p className="text-gray-400 text-lg">
              AI가 선별한 맞춤형 콘텐츠를 만나보세요
            </p>
          </div>
          <InfiniteCarousel />
        </section>

        {/* Filter Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <h2 className="text-3xl font-bold text-white">맞춤 추천</h2>
          </div>
          
          {/* Enhanced Filter Button */}
          <Button
            onClick={() => setIsFilterOpen(true)}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Settings className="w-5 h-5 mr-3" />
            <span className="font-semibold">스마트 필터</span>
            <Filter className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* 맞춤 추천 */}
          <section>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-400" />
              당신을 위한 맞춤 추천
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {customRecommendations.map((content) => (
                <ContentCard
                  key={content.id}
                  content={content}
                  onClick={() => handleContentClick(content)}
                />
              ))}
            </div>
          </section>

          {/* 지금 뜨고 있는 작품 */}
          <section>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-red-400" />
              지금 뜨고 있는 작품
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {trendingContents.map((content) => (
                <ContentCard
                  key={content.id}
                  content={content}
                  onClick={() => handleContentClick(content)}
                />
              ))}
            </div>
          </section>

          {/* 최신 출시작 */}
          <section>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-green-400" />
              최신 출시작
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {newReleases.map((content) => (
                <ContentCard
                  key={content.id}
                  content={content}
                  onClick={() => handleContentClick(content)}
                />
              ))}
            </div>
          </section>

          {/* 수상작 & 화제작 */}
          <section>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-400" />
              수상작 & 화제작
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {awardedContents.map((content) => (
                <ContentCard
                  key={content.id}
                  content={content}
                  onClick={() => handleContentClick(content)}
                />
              ))}
            </div>
          </section>

          {/* 액션 & 스릴러 */}
          <section>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6 text-orange-400" />
              액션 & 스릴러
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {actionThrillerContents.map((content) => (
                <ContentCard
                  key={content.id}
                  content={content}
                  onClick={() => handleContentClick(content)}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Dialogs */}
      <FilterDialog
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
      />

      {selectedContent && (
        <ContentDetailDialog
          content={selectedContent}
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          allContents={allContents}
        />
      )}
    </div>
  );
};

export default Home;
