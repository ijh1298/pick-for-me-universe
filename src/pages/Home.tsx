
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import ContentCard from "@/components/ContentCard";
import FilterSection from "@/components/FilterSection";
import { Search, Sparkles, TrendingUp, Clock } from "lucide-react";

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
}

const Home = () => {
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    platform: "all",
    genre: "all",
    mood: "all"
  });

  // Mock 콘텐츠 데이터 (실제로는 API에서 가져올 데이터)
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
      description: "생존을 건 극한의 게임이 시작된다",
      duration: "시즌 1, 9화"
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
      description: "계급 사회를 날카롭게 그린 블랙 코미디",
      duration: "132분"
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
      description: "국경을 넘나드는 운명적 사랑 이야기",
      duration: "시즌 1, 16화"
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
      description: "멀티버스가 펼치는 스파이더맨의 모험",
      duration: "148분"
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
      description: "따뜻한 인간애를 그린 감동 드라마",
      duration: "시즌 1, 16화"
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
      description: "북유럽의 밝은 공포를 경험하다",
      duration: "148분"
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
    const matchesPlatform = selectedFilters.platform === "all" || content.platform === selectedFilters.platform;
    const matchesGenre = selectedFilters.genre === "all" || content.genre === selectedFilters.genre;
    const matchesMood = selectedFilters.mood === "all" || content.mood === selectedFilters.mood;
    
    return matchesSearch && matchesPlatform && matchesGenre && matchesMood;
  });

  const recommendedContents = userPreferences ? mockContents.filter(content => 
    userPreferences.genres.includes(content.genre) || 
    userPreferences.moods.includes(content.mood) ||
    userPreferences.platforms.includes(content.platform)
  ) : mockContents;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        {userPreferences && (
          <Card className="mb-8 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold">환영합니다!</h2>
              </div>
              <p className="text-gray-600 mb-4">
                당신의 취향을 바탕으로 엄선한 콘텐츠들을 준비했어요
              </p>
              <div className="flex flex-wrap gap-2">
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
            </CardContent>
          </Card>
        )}

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
        <FilterSection 
          selectedFilters={selectedFilters}
          onFiltersChange={setSelectedFilters}
        />

        {/* Recommended Section */}
        {!searchTerm && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold">맞춤 추천</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recommendedContents.slice(0, 8).map(content => (
                <ContentCard key={content.id} content={content} />
              ))}
            </div>
          </section>
        )}

        {/* All Contents / Search Results */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold">
              {searchTerm ? `"${searchTerm}" 검색 결과` : "모든 콘텐츠"}
            </h2>
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
                <ContentCard key={content.id} content={content} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
