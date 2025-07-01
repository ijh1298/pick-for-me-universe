
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const genres = [
    "액션", "로맨스", "코미디", "드라마", "스릴러", "공포", 
    "판타지", "SF", "다큐멘터리", "애니메이션", "범죄", "전쟁"
  ];

  const moods = [
    "힐링", "감동적인", "유쾌한", "긴장감 있는", "로맨틱한", 
    "슬픈", "무서운", "신나는", "생각하게 하는", "편안한"
  ];

  const platforms = [
    { name: "Netflix", icon: "🎬", color: "bg-red-500" },
    { name: "Disney+", icon: "🏰", color: "bg-blue-600" },
    { name: "웨이브", icon: "🌊", color: "bg-blue-400" },
    { name: "티빙", icon: "📺", color: "bg-orange-500" },
    { name: "쿠팡플레이", icon: "📦", color: "bg-green-500" },
    { name: "왓챠", icon: "👀", color: "bg-pink-500" }
  ];

  const handleGenreToggle = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const handleMoodToggle = (mood: string) => {
    setSelectedMoods(prev => 
      prev.includes(mood) 
        ? prev.filter(m => m !== mood)
        : [...prev, mood]
    );
  };

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    } else {
      // 온보딩 완료
      const userPreferences = {
        genres: selectedGenres,
        moods: selectedMoods,
        platforms: selectedPlatforms,
        completedAt: new Date().toISOString()
      };
      
      localStorage.setItem('pickforme_user_preferences', JSON.stringify(userPreferences));
      localStorage.setItem('pickforme_onboarding_completed', 'true');
      
      navigate('/home');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedGenres.length >= 3;
      case 2: return selectedMoods.length >= 2;
      case 3: return selectedPlatforms.length >= 1;
      default: return false;
    }
  };

  const progress = (currentStep / 3) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="pick-gradient-text">픽포미</span> 설정하기
          </h1>
          <p className="text-gray-600">당신만의 취향을 알려주세요</p>
          
          <div className="mt-6">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-gray-500 mt-2">{currentStep}/3 단계</p>
          </div>
        </div>

        {/* Step Content */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {currentStep === 1 && "좋아하는 장르를 선택해주세요"}
              {currentStep === 2 && "선호하는 분위기를 선택해주세요"}
              {currentStep === 3 && "이용 중인 OTT 플랫폼을 선택해주세요"}
              <CheckCircle className={`w-5 h-5 ${canProceed() ? 'text-green-500' : 'text-gray-300'}`} />
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Step 1: Genres */}
            {currentStep === 1 && (
              <div>
                <p className="text-gray-600 mb-4">최소 3개 이상 선택해주세요</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {genres.map((genre) => (
                    <Badge
                      key={genre}
                      variant={selectedGenres.includes(genre) ? "default" : "outline"}
                      className={`p-3 cursor-pointer text-center justify-center hover:scale-105 transition-all ${
                        selectedGenres.includes(genre) 
                          ? 'pick-gradient text-white' 
                          : 'hover:bg-purple-50'
                      }`}
                      onClick={() => handleGenreToggle(genre)}
                    >
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Moods */}
            {currentStep === 2 && (
              <div>
                <p className="text-gray-600 mb-4">최소 2개 이상 선택해주세요</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {moods.map((mood) => (
                    <Badge
                      key={mood}
                      variant={selectedMoods.includes(mood) ? "default" : "outline"}
                      className={`p-3 cursor-pointer text-center justify-center hover:scale-105 transition-all ${
                        selectedMoods.includes(mood) 
                          ? 'pick-gradient text-white' 
                          : 'hover:bg-purple-50'
                      }`}
                      onClick={() => handleMoodToggle(mood)}
                    >
                      {mood}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Platforms */}
            {currentStep === 3 && (
              <div>
                <p className="text-gray-600 mb-4">이용 중인 플랫폼을 선택해주세요</p>
                <div className="grid grid-cols-2 gap-4">
                  {platforms.map((platform) => (
                    <div
                      key={platform.name}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-105 ${
                        selectedPlatforms.includes(platform.name)
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-200'
                      }`}
                      onClick={() => handlePlatformToggle(platform.name)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg ${platform.color} flex items-center justify-center text-white text-lg`}>
                          {platform.icon}
                        </div>
                        <span className="font-medium">{platform.name}</span>
                        {selectedPlatforms.includes(platform.name) && (
                          <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                이전
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="pick-gradient text-white flex items-center gap-2"
              >
                {currentStep === 3 ? '완료' : '다음'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
