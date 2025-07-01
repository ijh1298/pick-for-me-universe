
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Play, Heart, Zap, Star } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="pick-gradient rounded-full p-4 animate-float">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gray-900">Pick</span>
            <span className="pick-gradient-text"> for Me</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            당신의 취향을 분석해서 완벽한 OTT 콘텐츠를 추천해드릴게요
          </p>
          
          <Button 
            onClick={handleGetStarted}
            className="pick-gradient text-white px-8 py-6 text-lg rounded-full hover:scale-105 transition-all duration-300 shadow-xl"
          >
            <Play className="mr-2 w-5 h-5" />
            시작하기
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-8 text-center">
              <div className="pick-gradient rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">취향 맞춤 추천</h3>
              <p className="text-gray-600">
                당신만의 독특한 취향을 분석해서 딱 맞는 콘텐츠를 찾아드려요
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-8 text-center">
              <div className="pick-gradient rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">모든 OTT 한번에</h3>
              <p className="text-gray-600">
                넷플릭스, 웨이브, 디즈니+ 등 모든 플랫폼의 콘텐츠를 한눈에 비교
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-8 text-center">
              <div className="pick-gradient rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">스마트 학습</h3>
              <p className="text-gray-600">
                시청 후 평가를 통해 점점 더 정확한 추천을 받아보세요
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-500 mb-4">더 이상 뭘 볼지 고민하지 마세요</p>
          <div className="flex justify-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span>무료</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              <span>간편 설정</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <div className="w-2 h-2 rounded-full bg-purple-400"></div>
              <span>개인화</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
