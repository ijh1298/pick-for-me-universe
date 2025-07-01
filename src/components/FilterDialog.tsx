
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, Sparkles } from "lucide-react";

interface FilterDialogProps {
  selectedFilters: {
    platforms: string[];
    genres: string[];
    moods: string[];
  };
  onFiltersChange: (filters: { platforms: string[]; genres: string[]; moods: string[] }) => void;
}

const FilterDialog = ({ selectedFilters, onFiltersChange }: FilterDialogProps) => {
  const [tempFilters, setTempFilters] = useState(selectedFilters);
  const [isOpen, setIsOpen] = useState(false);

  const platforms = [
    { id: "Netflix", name: "Netflix", icon: "🎥", color: "bg-red-500" },
    { id: "Disney+", name: "Disney+", icon: "🏰", color: "bg-blue-600" },
    { id: "웨이브", name: "웨이브", icon: "🌊", color: "bg-blue-400" },
    { id: "티빙", name: "티빙", icon: "📺", color: "bg-orange-500" },
    { id: "쿠팡플레이", name: "쿠팡플레이", icon: "📦", color: "bg-green-500" },
    { id: "왓챠", name: "왓챠", icon: "👀", color: "bg-pink-500" }
  ];

  const genres = [
    { id: "액션", name: "액션", emoji: "💥" },
    { id: "로맨스", name: "로맨스", emoji: "💕" },
    { id: "코미디", name: "코미디", emoji: "😂" },
    { id: "드라마", name: "드라마", emoji: "🎭" },
    { id: "스릴러", name: "스릴러", emoji: "😱" },
    { id: "공포", name: "공포", emoji: "👻" },
    { id: "판타지", name: "판타지", emoji: "🧙‍♂️" },
    { id: "SF", name: "SF", emoji: "🚀" },
    { id: "다큐멘터리", name: "다큐멘터리", emoji: "📽️" },
    { id: "애니메이션", name: "애니메이션", emoji: "🎨" },
    { id: "범죄", name: "범죄", emoji: "🔍" },
    { id: "전쟁", name: "전쟁", emoji: "⚔️" },
    { id: "서부", name: "서부", emoji: "🤠" },
    { id: "뮤지컬", name: "뮤지컬", emoji: "🎵" },
    { id: "가족", name: "가족", emoji: "👨‍👩‍👧‍👦" }
  ];

  const moods = [
    { id: "힐링", name: "힐링", emoji: "🌿" },
    { id: "감동적인", name: "감동적인", emoji: "😭" },
    { id: "유쾌한", name: "유쾌한", emoji: "😄" },
    { id: "긴장감있는", name: "긴장감 있는", emoji: "😰" },
    { id: "로맨틱한", name: "로맨틱한", emoji: "💖" },
    { id: "슬픈", name: "슬픈", emoji: "😢" },
    { id: "무서운", name: "무서운", emoji: "😨" },
    { id: "신나는", name: "신나는", emoji: "🎉" },
    { id: "생각하게하는", name: "생각하게 하는", emoji: "🤔" },
    { id: "편안한", name: "편안한", emoji: "😌" },
    { id: "몰입감있는", name: "몰입감 있는", emoji: "🎯" },
    { id: "현실적인", name: "현실적인", emoji: "📰" },
    { id: "환상적인", name: "환상적인", emoji: "✨" },
    { id: "어두운", name: "어두운", emoji: "🌑" },
    { id: "밝은", name: "밝은", emoji: "☀️" }
  ];

  const handleFilterToggle = (type: 'platforms' | 'genres' | 'moods', value: string) => {
    setTempFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(item => item !== value)
        : [...prev[type], value]
    }));
  };

  const applyFilters = () => {
    onFiltersChange(tempFilters);
    setIsOpen(false);
  };

  const resetFilters = () => {
    const resetValues = { platforms: [], genres: [], moods: [] };
    setTempFilters(resetValues);
    onFiltersChange(resetValues);
    setIsOpen(false);
  };

  const hasActiveFilters = selectedFilters.platforms.length > 0 || selectedFilters.genres.length > 0 || selectedFilters.moods.length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="relative">
          <Filter className="w-4 h-4 mr-2" />
          필터
          {hasActiveFilters && (
            <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-purple-500 text-white text-xs rounded-full">
              {selectedFilters.platforms.length + selectedFilters.genres.length + selectedFilters.moods.length}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            필터 설정
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Platform Filter */}
          <div>
            <h3 className="text-lg font-semibold mb-3">플랫폼</h3>
            <div className="grid grid-cols-3 gap-3">
              {platforms.map(platform => (
                <button
                  key={platform.id}
                  onClick={() => handleFilterToggle('platforms', platform.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    tempFilters.platforms.includes(platform.id)
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{platform.icon}</div>
                  <div className="text-sm font-medium">{platform.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Genre Filter */}
          <div>
            <h3 className="text-lg font-semibold mb-3">장르</h3>
            <div className="flex flex-wrap gap-2">
              {genres.map(genre => (
                <Badge
                  key={genre.id}
                  variant={tempFilters.genres.includes(genre.id) ? "default" : "outline"}
                  className={`cursor-pointer transition-all px-3 py-2 ${
                    tempFilters.genres.includes(genre.id) ? 'pick-gradient text-white' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handleFilterToggle('genres', genre.id)}
                >
                  <span className="mr-1">{genre.emoji}</span>
                  {genre.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Mood Filter */}
          <div>
            <h3 className="text-lg font-semibold mb-3">분위기</h3>
            <div className="flex flex-wrap gap-2">
              {moods.map(mood => (
                <Badge
                  key={mood.id}
                  variant={tempFilters.moods.includes(mood.id) ? "default" : "outline"}
                  className={`cursor-pointer transition-all px-3 py-2 ${
                    tempFilters.moods.includes(mood.id) ? 'pick-gradient text-white' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handleFilterToggle('moods', mood.id)}
                >
                  <span className="mr-1">{mood.emoji}</span>
                  {mood.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" onClick={resetFilters} className="flex-1">
              초기화
            </Button>
            <Button onClick={applyFilters} className="flex-1 pick-gradient text-white">
              적용하기 ({tempFilters.platforms.length + tempFilters.genres.length + tempFilters.moods.length}개 선택됨)
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;
