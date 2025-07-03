
import { useState } from "react";
import Header from "@/components/Header";
import ContentCard from "@/components/ContentCard";
import ContentDetailDialog from "@/components/ContentDetailDialog";
import FilterDialog from "@/components/FilterDialog";
import InfiniteCarousel from "@/components/InfiniteCarousel";
import ReviewHighlightCard from "@/components/ReviewHighlightCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, Sparkles, TrendingUp, Award, Zap, Calendar, Settings, Star, X, ThumbsUp } from "lucide-react";

const Home = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [filters, setFilters] = useState({
    platforms: [],
    genres: [],
    moods: [],
  });

  // 리뷰 공감 상태 관리
  const [reviewLikes, setReviewLikes] = useState({});

  // 목 데이터 - 썸네일 복원 및 리뷰 공감 수 추가
  const allContents = [
    {
      id: "1",
      title: "기생충",
      platform: "Netflix",
      genre: "스릴러 🎬",
      mood: "긴장감 넘치는 😰",
      rating: 4.8,
      year: 2019,
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=450&fit=crop",
      description: "전 세계를 뒤흔든 봉준호 감독의 대표작. 계급사회의 모순을 날카롭게 그려낸 작품입니다.",
      duration: "132분",
      category: "custom",
      reviews: [
        { id: "1", author: "영화광123", rating: 5, content: "정말 충격적이고 깊이 있는 작품이었습니다!", date: "2024-01-15", likes: 24 },
        { id: "2", author: "드라마러버", rating: 4, content: "연출과 연기 모두 완벽했어요", date: "2024-01-10", likes: 18 }
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
        { id: "3", author: "놀란팬", rating: 5, content: "놀란 감독님, 제 꿈도 설계해주세요!", date: "2024-01-12", likes: 31 },
        { id: "4", author: "SF매니아", rating: 4, content: "스토리텔링이 정말 대단해요", date: "2024-01-08", likes: 22 }
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
        { id: "5", author: "마블팬", rating: 5, content: "마블은 역시 실망시키지 않아요!", date: "2024-01-05", likes: 45 },
        { id: "6", author: "액션히어로", rating: 4, content: "액션씬이 정말 화려하고 멋있었어요", date: "2024-01-03", likes: 28 }
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
        { id: "7", author: "글로벌뷰어", rating: 5, content: "전 세계가 열광한 이유를 알 수 있었어요!", date: "2024-01-01", likes: 52 },
        { id: "8", author: "한류팬", rating: 4, content: "한국 콘텐츠의 위상을 보여준 작품", date: "2024-01-02", likes: 38 }
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
        { id: "9", author: "감성충만", rating: 5, content: "인생 영화 등극! OST도 너무 좋아요", date: "2024-01-04", likes: 29 },
        { id: "10", author: "멜로홀릭", rating: 4, content: "영상미가 정말 아름다워요", date: "2024-01-06", likes: 19 }
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
        { id: "11", author: "SF드라마광", rating: 5, content: "밤새도록 정주행했어요!", date: "2024-01-07", likes: 33 },
        { id: "12", author: "80년대향수", rating: 4, content: "80년대 분위기가 너무 좋아요", date: "2024-01-08", likes: 25 }
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
        { id: "13", author: "색감천재", rating: 5, content: "웨스 앤더슨 감독님은 천재 같아요!", date: "2024-01-09", likes: 27 },
        { id: "14", author: "코미디매니아", rating: 4, content: "유머 코드가 너무 좋아요", date: "2024-01-10", likes: 21 }
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
        { id: "15", author: "SF철학자", rating: 5, content: "생각할 거리를 던져주는 드라마", date: "2024-01-11", likes: 36 },
        { id: "16", author: "블랙미러팬", rating: 4, content: "매 에피소드가 충격적이에요", date: "2024-01-12", likes: 23 }
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
        { id: "17", author: "액션광", rating: 5, content: "액션씬이 정말 시원하고 통쾌해요!", date: "2024-01-13", likes: 41 },
        { id: "18", author: "키아누팬", rating: 4, content: "키아누 리브스는 역시 멋있어요", date: "2024-01-14", likes: 32 }
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
        { id: "19", author: "마블매니아", rating: 4, content: "베놈의 매력에 푹 빠졌어요!", date: "2024-01-15", likes: 26 },
        { id: "20", author: "톰하디팬", rating: 3, content: "톰 하디의 연기는 역시 최고", date: "2024-01-16", likes: 17 }
      ]
    },
  ];

  // 필터링된 콘텐츠 계산
  const getFilteredContents = (contents) => {
    return contents.filter(content => {
      const platformMatch = filters.platforms.length === 0 || filters.platforms.includes(content.platform);
      const genreMatch = filters.genres.length === 0 || filters.genres.some(genre => content.genre.includes(genre));
      const moodMatch = filters.moods.length === 0 || filters.moods.some(mood => content.mood.includes(mood));
      return platformMatch && genreMatch && moodMatch;
    });
  };

  const customRecommendations = getFilteredContents(allContents.filter(content => content.category === 'custom'));
  const trendingContents = getFilteredContents(allContents.filter(content => content.category === 'trending'));
  const newReleases = getFilteredContents(allContents.filter(content => content.category === 'new'));
  const awardedContents = getFilteredContents(allContents.filter(content => content.category === 'awarded'));
  const actionThrillerContents = getFilteredContents(allContents.filter(content => content.category === 'action'));

  // 공감 많은 리뷰 기반 추천 (likes가 30 이상인 리뷰를 가진 콘텐츠)
  const popularReviewContents = allContents.filter(content => 
    content.reviews && content.reviews.some(review => review.likes >= 30)
  ).slice(0, 4);

  const handleContentClick = (content: any) => {
    setSelectedContent(content);
    setIsDetailOpen(true);
  };

  const removeFilter = (type: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item !== value)
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      platforms: [],
      genres: [],
      moods: [],
    });
  };

  const hasActiveFilters = filters.platforms.length > 0 || filters.genres.length > 0 || filters.moods.length > 0;

  const handleReviewLike = (reviewId: string) => {
    setReviewLikes(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
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

        {/* Filter Section - 중앙 정렬 및 새로운 디자인 */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <h2 className="text-3xl font-bold text-white">맞춤 추천</h2>
          </div>
          
          {/* 중앙에 위치한 더 넓은 필터 버튼 */}
          <div className="relative">
            <Button
              onClick={() => setIsFilterOpen(true)}
              className="premium-filter-button-wide group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-100 transition-opacity group-hover:opacity-90"></div>
              <div className="relative z-10 flex items-center gap-6 px-12 py-5">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎯</span>
                  <span className="text-xl font-bold text-white drop-shadow-md">취향 다시 고르기</span>
                </div>
                <div className="h-8 w-px bg-white/30"></div>
                <div className="flex items-center gap-3">
                  <Settings className="w-6 h-6 text-white/80" />
                  <Star className="w-5 h-5 text-yellow-300 animate-pulse" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </Button>
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mb-8 p-4 bg-gray-800 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <Filter className="w-4 h-4" />
                적용된 필터
              </h3>
              <Button
                onClick={clearAllFilters}
                variant="outline"
                size="sm"
                className="text-gray-300 border-gray-600 hover:bg-gray-700"
              >
                전체 해제
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.platforms.map(platform => (
                <Badge
                  key={platform}
                  variant="secondary"
                  className="bg-purple-600 text-white hover:bg-purple-700 cursor-pointer"
                  onClick={() => removeFilter('platforms', platform)}
                >
                  {platform}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
              {filters.genres.map(genre => (
                <Badge
                  key={genre}
                  variant="secondary"
                  className="bg-pink-600 text-white hover:bg-pink-700 cursor-pointer"
                  onClick={() => removeFilter('genres', genre)}
                >
                  {genre}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
              {filters.moods.map(mood => (
                <Badge
                  key={mood}
                  variant="secondary"
                  className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                  onClick={() => removeFilter('moods', mood)}
                >
                  {mood}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Content Sections */}
        <div className="space-y-12">
          {/* 공감 많은 리뷰 기반 추천 - 새로운 디자인 */}
          <section>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <ThumbsUp className="w-6 h-6 text-green-400" />
              리뷰어들이 극찬한 작품
            </h3>
            <div className="space-y-4">
              {popularReviewContents.map((content) => (
                <ReviewHighlightCard
                  key={content.id}
                  content={content}
                  onClick={() => handleContentClick(content)}
                />
              ))}
            </div>
          </section>

          {/* 맞춤 추천 */}
          {customRecommendations.length > 0 && (
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
          )}

          {/* 지금 뜨고 있는 작품 */}
          {trendingContents.length > 0 && (
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
          )}

          {/* 최신 출시작 */}
          {newReleases.length > 0 && (
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
          )}

          {/* 수상작 & 화제작 */}
          {awardedContents.length > 0 && (
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
          )}

          {/* 액션 & 스릴러 */}
          {actionThrillerContents.length > 0 && (
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
          )}
        </div>
      </main>

      {/* Dialogs */}
      <FilterDialog
        isOpen={isFilterOpen}
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
          reviewLikes={reviewLikes}
          onReviewLike={handleReviewLike}
        />
      )}
    </div>
  );
};

export default Home;
