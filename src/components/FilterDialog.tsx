
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, Sparkles } from "lucide-react";

interface FilterDialogProps {
  selectedFilters: {
    platform: string;
    genre: string;
    mood: string;
  };
  onFiltersChange: (filters: { platform: string; genre: string; mood: string }) => void;
}

const FilterDialog = ({ selectedFilters, onFiltersChange }: FilterDialogProps) => {
  const [tempFilters, setTempFilters] = useState(selectedFilters);
  const [isOpen, setIsOpen] = useState(false);

  const platforms = [
    { id: "all", name: "전체", icon: "🎬", color: "bg-gray-500" },
    { id: "Netflix", name: "Netflix", icon: "🎥", color: "bg-red-500" },
    { id: "Disney+", name: "Disney+", icon: "🏰", color: "bg-blue-600" },
    { id: "웨이브", name: "웨이브", icon: "🌊", color: "bg-blue-400" },
    { id: "티빙", name: "티빙", icon: "📺", color: "bg-orange-500" },
    { id: "쿠팡플레이", name: "쿠팡플레이", icon: "📦", color: "bg-green-500" },
    { id: "왓챠", name: "왓챠", icon: "👀", color: "bg-pink-500" }
  ];

  const genres = ["all", "액션", "로맨스", "코미디", "드라마", "스릴러", "공포", "판타지", "SF", "다큐멘터리", "애니메이션"];
  const moods = ["all", "힐링", "감동적인", "유쾌한", "긴장감 있는", "로맨틱한", "슬픈", "무서운", "신나는", "생각하게 하는"];

  const handleFilterChange = (type: string, value: string) => {
    setTempFilters({
      ...tempFilters,
      [type]: value
    });
  };

  const applyFilters = () => {
    onFiltersChange(tempFilters);
    setIsOpen(false);
  };

  const resetFilters = () => {
    const resetValues = { platform: "all", genre: "all", mood: "all" };
    setTempFilters(resetValues);
    onFiltersChange(resetValues);
    setIsOpen(false);
  };

  const hasActiveFilters = selectedFilters.platform !== "all" || selectedFilters.genre !== "all" || selectedFilters.mood !== "all";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="relative">
          <Filter className="w-4 h-4 mr-2" />
          필터
          {hasActiveFilters && (
            <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-purple-500 text-white text-xs rounded-full">
              !
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
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
            <div className="grid grid-cols-4 gap-3">
              {platforms.map(platform => (
                <button
                  key={platform.id}
                  onClick={() => handleFilterChange('platform', platform.id)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    tempFilters.platform === platform.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{platform.icon}</div>
                  <div className="text-xs font-medium">{platform.name}</div>
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
                  key={genre}
                  variant={tempFilters.genre === genre ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${
                    tempFilters.genre === genre ? 'pick-gradient text-white' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handleFilterChange('genre', genre)}
                >
                  {genre === "all" ? "전체" : genre}
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
                  key={mood}
                  variant={tempFilters.mood === mood ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${
                    tempFilters.mood === mood ? 'pick-gradient text-white' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handleFilterChange('mood', mood)}
                >
                  {mood === "all" ? "전체" : mood}
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
              적용하기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;
