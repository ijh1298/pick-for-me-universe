
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { User, Settings, RotateCcw, Heart, Star, Clock } from "lucide-react";

interface UserPreferences {
  genres: string[];
  moods: string[];
  platforms: string[];
  completedAt: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);

  useEffect(() => {
    const preferences = localStorage.getItem('pickforme_user_preferences');
    if (preferences) {
      setUserPreferences(JSON.parse(preferences));
    }
  }, []);

  const handleResetOnboarding = () => {
    localStorage.removeItem('pickforme_user_preferences');
    localStorage.removeItem('pickforme_onboarding_completed');
    navigate('/onboarding');
  };

  const stats = [
    { label: "추천받은 콘텐츠", value: "47개", icon: Heart },
    { label: "시청한 콘텐츠", value: "23개", icon: Clock },
    { label: "평균 평점", value: "4.2", icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Profile Header */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-center gap-6">
              <div className="pick-gradient rounded-full p-6">
                <User className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">내 프로필</h1>
                <p className="text-gray-600">픽포미와 함께한 시간들</p>
                {userPreferences && (
                  <p className="text-sm text-gray-500 mt-2">
                    가입일: {new Date(userPreferences.completedAt).toLocaleDateString('ko-KR')}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="pick-gradient rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* User Preferences */}
        {userPreferences && (
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-purple-600" />
                  선호 장르
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {userPreferences.genres.map(genre => (
                    <Badge key={genre} className="pick-gradient text-white">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-purple-600" />
                  선호 분위기
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {userPreferences.moods.map(mood => (
                    <Badge key={mood} variant="outline">
                      {mood}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-purple-600" />
                  이용 플랫폼
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {userPreferences.platforms.map(platform => (
                    <div key={platform} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-sm">📺</span>
                      </div>
                      <span className="font-medium">{platform}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Settings */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>설정</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleResetOnboarding}
              variant="outline"
              className="w-full justify-start"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              취향 설정 다시하기
            </Button>
            
            <div className="text-sm text-gray-500 pt-4 border-t">
              <p>픽포미는 당신의 개인정보를 소중히 여깁니다.</p>
              <p className="mt-1">모든 데이터는 로컬에 안전하게 저장됩니다.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
