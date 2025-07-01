import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import ContentCard from "@/components/ContentCard";
import FilterDialog from "@/components/FilterDialog";
import ContentDetailDialog from "@/components/ContentDetailDialog";
import InfiniteCarousel from "@/components/InfiniteCarousel";
import { Search, Sparkles, TrendingUp, Clock, Flame, Award, Calendar, Heart } from "lucide-react";

interface UserPreferences {
  genres: string[];
  moods: string[];
  platforms: string[];
  completedAt: string;
}

interface MockContent {
  id: string;
  title: string;
  platform: string;
  genre: string;
  mood: string;
  rating: number;
  year: number;
  thumbnail: string;
  description: string;
  duration: string;
  director?: string;
  cast?: string[];
  reviews?: Array<{
    id: string;
    author: string;
    rating: number;
    content: string;
    date: string;
  }>;
}

const Home = () => {
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    platforms: [] as string[],
    genres: [] as string[],
    moods: [] as string[]
  });
  const [selectedContent, setSelectedContent] = useState<MockContent | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // 확장된 Mock 콘텐츠 데이터
  const mockContents: MockContent[] = [
    {
      id: "1",
      title: "오징어 게임",
      platform: "Netflix",
      genre: "스릴러",
      mood: "긴장감 있는",
      rating: 8.7,
      year: 2021,
      thumbnail: "https://images.unsplash.com/photo-1489599904472-84b9ca35e8b1?w=400&h=600&fit=crop",
      description: "생존을 건 극한의 게임이 시작된다. 수백억 원의 상금을 놓고 벌이는 생과 사의 경쟁에서 과연 누가 살아남을 것인가?",
      duration: "시즌 1, 9화",
      director: "황동혁",
      cast: ["이정재", "박해수", "위하준", "정호연"],
      reviews: [
        {
          id: "1",
          author: "김영수",
          rating: 9,
          content: "정말 충격적이고 몰입도가 높은 작품이었습니다. 사회적 메시지도 강력하고요.",
          date: "2024-01-15"
        }
      ]
    },
    {
      id: "2", 
      title: "기생충",
      platform: "Netflix",
      genre: "드라마",
      mood: "생각하게 하는",
      rating: 8.5,
      year: 2019,
      thumbnail: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=600&fit=crop",
      description: "계급 사회를 날카롭게 그린 블랙 코미디. 기택네 가족이 부유한 박 사장 가족에게 접근하면서 벌어지는 이야기",
      duration: "132분",
      director: "봉준호",
      cast: ["송강호", "최우식", "박소담", "조여정"]
    },
    {
      id: "3",
      title: "사랑의 불시착",
      platform: "Netflix",
      genre: "로맨스",
      mood: "로맨틱한",
      rating: 8.9,
      year: 2019,
      thumbnail: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=600&fit=crop",
      description: "국경을 넘나드는 운명적 사랑 이야기. 재벌 상속녀와 북한 군인의 불가능한 사랑",
      duration: "시즌 1, 16화",
      director: "이정효",
      cast: ["현빈", "손예진", "서지혜", "김정현"]
    },
    {
      id: "4",
      title: "스파이더맨: 노 웨이 홈",
      platform: "Disney+",
      genre: "액션",
      mood: "신나는",
      rating: 8.4,
      year: 2021,
      thumbnail: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
      description: "멀티버스가 펼치는 스파이더맨의 모험. 역대 모든 스파이더맨이 한자리에 모이다",
      duration: "148분",
      director: "존 왓츠",
      cast: ["톰 홀랜드", "젠데이아", "베네딕트 컴버배치"]
    },
    {
      id: "5",
      title: "나의 아저씨",
      platform: "웨이브",
      genre: "드라마",
      mood: "감동적인",
      rating: 9.1,
      year: 2018,
      thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
      description: "따뜻한 인간애를 그린 감동 드라마. 힘든 현실 속에서도 서로를 위로하는 사람들의 이야기",
      duration: "시즌 1, 16화",
      director: "김원석",
      cast: ["이선균", "이지은", "박호산"]
    },
    {
      id: "6",
      title: "미드소마",
      platform: "티빙",
      genre: "공포",
      mood: "무서운",
      rating: 7.1,
      year: 2019,
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      description: "북유럽의 밝은 공포를 경험하다. 한여름 스웨덴에서 벌어지는 기괴한 축제",
      duration: "148분",
      director: "아리 애스터",
      cast: ["플로렌스 퓨", "잭 레이너", "윌 폴터"]
    },
    {
      id: "7",
      title: "아바타: 물의 길",
      platform: "Disney+",
      genre: "SF",
      mood: "신나는",
      rating: 7.8,
      year: 2022,
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
      description: "판도라 행성에서 펼쳐지는 새로운 모험. 제이크 설리 가족의 바다 여행",
      duration: "192분",
      director: "제임스 카메론",
      cast: ["샘 워딩턴", "조 샐다나", "시고니 위버"]
    },
    {
      id: "8",
      title: "토이 스토리 4",
      platform: "Disney+",
      genre: "애니메이션",
      mood: "유쾌한",
      rating: 8.2,
      year: 2019,
      thumbnail: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=600&fit=crop",
      description: "우디와 친구들의 마지막 모험. 새로운 장난감 포키와 함께하는 여행",
      duration: "100분",
      director: "조시 쿨리",
      cast: ["톰 행크스", "티모시 달튼", "애니 팟츠"]
    },
    {
      id: "9",
      title: "조커",
      platform: "웨이브",
      genre: "드라마",
      mood: "생각하게 하는",
      rating: 8.6,
      year: 2019,
      thumbnail: "https://images.unsplash.com/photo-1571847140471-1d7766e825ea?w=400&h=600&fit=crop",
      description: "광대 아서 플렉의 조커 탄생 이야기. 사회의 냉혹함이 만든 악의 화신",
      duration: "122분",
      director: "토드 필립스",
      cast: ["호아킨 피닉스", "로버트 드 니로", "제이미 폭스"]
    },
    {
      id: "10",
      title: "킹덤",
      platform: "Netflix",
      genre: "스릴러",
      mood: "긴장감 있는",
      rating: 8.3,
      year: 2019,
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      description: "조선시대 좀비 스릴러. 왕세자가 발견한 충격적인 비밀과 전염병",
      duration: "시즌 2, 12화",
      director: "김성훈",
      cast: ["주지훈", "배두나", "류승룡"]
    },
    {
      id: "11",
      title: "1917",
      platform: "쿠팡플레이",
      genre: "액션",
      mood: "긴장감 있는",
      rating: 8.7,
      year: 2019,
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      description: "1차 대전 참호전의 사실적 묘사. 두 병사의 위험한 임무",
      duration: "119분",
      director: "샘 멘데스",
      cast: ["조지 맥케이", "딘찰스 채프먼"]
    },
    {
      id: "12",
      title: "부산행",
      platform: "왓챠",
      genre: "액션",
      mood: "긴장감 있는",
      rating: 8.5,
      year: 2016,
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      description: "KTX 안에서 벌어지는 좀비 아포칼립스. 생존을 위한 사투",
      duration: "118분",
      director: "연상호",
      cast: ["공유", "마동석", "정유미"]
    }
  ];

  useEffect(() => {
    const preferences = localStorage.getItem('pickforme_user_preferences');
    if (preferences) {
      setUserPreferences(JSON.parse(preferences));
    }
  }, []);

  const filteredContents = mockContents.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = selectedFilters.platforms.length === 0 || selectedFilters.platforms.includes(content.platform);
    const matchesGenre = selectedFilters.genres.length === 0 || selectedFilters.genres.includes(content.genre);
    const matchesMood = selectedFilters.moods.length === 0 || selectedFilters.moods.includes(content.mood);
    
    return matchesSearch && matchesPlatform && matchesGenre && matchesMood;
  });

  const recommendedContents = userPreferences ? mockContents.filter(content => 
    userPreferences.genres.includes(content.genre) || 
    userPreferences.moods.includes(content.mood) ||
    userPreferences.platforms.includes(content.platform)
  ) : mockContents;

  // 다양한 추천 섹션을 위한 데이터
  const trendingContents = mockContents.filter(content => content.rating >= 8.5).slice(0, 8);
  const newReleases = mockContents.filter(content => content.year >= 2021).slice(0, 8);
  const awarded = mockContents.filter(content => content.rating >= 8.0 && content.genre === "드라마").slice(0, 8);
  const actionPacked = mockContents.filter(content => content.genre === "액션" || content.genre === "스릴러").slice(0, 8);

  const handleContentClick = (content: MockContent) => {
    setSelectedContent(content);
    setIsDetailOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section with Infinite Carousel */}
        <Card className="mb-8 border-0 shadow-lg overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6 pb-4">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold">환영합니다!</h2>
              </div>
              <p className="text-gray-600 mb-4">
                당신의 취향을 바탕으로 엄선한 콘텐츠들을 준비했어요
              </p>
              {userPreferences && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {userPreferences.genres.slice(0, 3).map(genre => (
                    <Badge key={genre} variant="secondary" className="text-xs">
                      {genre}
                    </Badge>
                  ))}
                  {userPreferences.moods.slice(0, 2).map(mood => (
                    <Badge key={mood} variant="outline" className="text-xs">
                      {mood}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            
            <InfiniteCarousel />
          </CardContent>
        </Card>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="어떤 콘텐츠를 찾고 계세요?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 text-lg border-0 shadow-lg"
          />
        </div>

        {/* Filter Section */}
        <div className="mb-8 flex justify-between items-center">
          <FilterDialog 
            selectedFilters={selectedFilters}
            onFiltersChange={setSelectedFilters}
          />
          
          {/* Active Filters Display */}
          {(selectedFilters.platforms.length > 0 || selectedFilters.genres.length > 0 || selectedFilters.moods.length > 0) && (
            <div className="flex flex-wrap gap-2">
              {selectedFilters.platforms.map(platform => (
                <Badge key={platform} variant="secondary" className="text-xs">
                  {platform}
                </Badge>
              ))}
              {selectedFilters.genres.map(genre => (
                <Badge key={genre} variant="secondary" className="text-xs">
                  {genre}
                </Badge>
              ))}
              {selectedFilters.moods.map(mood => (
                <Badge key={mood} variant="secondary" className="text-xs">
                  {mood}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Search Results */}
        {searchTerm && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Search className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold">"{searchTerm}" 검색 결과</h2>
              <Badge variant="secondary">{filteredContents.length}개</Badge>
            </div>
            
            {filteredContents.length === 0 ? (
              <Card className="p-12 text-center border-0 shadow-lg">
                <p className="text-gray-500 text-lg">검색 결과가 없습니다</p>
                <p className="text-gray-400 mt-2">다른 검색어를 시도해보세요</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredContents.map(content => (
                  <div key={content.id} onClick={() => handleContentClick(content)}>
                    <ContentCard content={content} />
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Recommendation Sections */}
        {!searchTerm && (
          <>
            {/* 맞춤 추천 */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold">맞춤 추천</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {recommendedContents.slice(0, 8).map(content => (
                  <div key={content.id} onClick={() => handleContentClick(content)}>
                    <ContentCard content={content} />
                  </div>
                ))}
              </div>
            </section>

            {/* 지금 뜨고 있는 작품 */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Flame className="w-6 h-6 text-orange-500" />
                <h2 className="text-2xl font-bold">지금 뜨고 있는 작품</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {trendingContents.map(content => (
                  <div key={content.id} onClick={() => handleContentClick(content)}>
                    <ContentCard content={content} />
                  </div>
                ))}
              </div>
            </section>

            {/* 최신 작품 */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6 text-blue-500" />
                <h2 className="text-2xl font-bold">최신 작품</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {newReleases.map(content => (
                  <div key={content.id} onClick={() => handleContentClick(content)}>
                    <ContentCard content={content} />
                  </div>
                ))}
              </div>
            </section>

            {/* 수상작 및 화제작 */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-6 h-6 text-yellow-500" />
                <h2 className="text-2xl font-bold">수상작 및 화제작</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {awarded.map(content => (
                  <div key={content.id} onClick={() => handleContentClick(content)}>
                    <ContentCard content={content} />
                  </div>
                ))}
              </div>
            </section>

            {/* 액션 & 스릴러 */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-6 h-6 text-red-500" />
                <h2 className="text-2xl font-bold">액션 & 스릴러</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {actionPacked.map(content => (
                  <div key={content.id} onClick={() => handleContentClick(content)}>
                    <ContentCard content={content} />
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>

      {/* Content Detail Dialog */}
      <ContentDetailDialog
        content={selectedContent}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        allContents={mockContents}
      />
    </div>
  );
};

export default Home;
