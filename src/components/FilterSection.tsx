
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";

interface FilterSectionProps {
  selectedFilters: {
    platform: string;
    genre: string;
    mood: string;
  };
  onFiltersChange: (filters: { platform: string; genre: string; mood: string }) => void;
}

const FilterSection = ({ selectedFilters, onFiltersChange }: FilterSectionProps) => {
  const platforms = ["all", "Netflix", "Disney+", "웨이브", "티빙", "쿠팡플레이", "왓챠"];
  const genres = ["all", "액션", "로맨스", "코미디", "드라마", "스릴러", "공포", "판타지", "SF", "다큐멘터리", "애니메이션"];
  const moods = ["all", "힐링", "감동적인", "유쾌한", "긴장감 있는", "로맨틱한", "슬픈", "무서운", "신나는", "생각하게 하는"];

  const handleFilterChange = (type: string, value: string) => {
    onFiltersChange({
      ...selectedFilters,
      [type]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      platform: "all",
      genre: "all", 
      mood: "all"
    });
  };

  const hasActiveFilters = selectedFilters.platform !== "all" || selectedFilters.genre !== "all" || selectedFilters.mood !== "all";

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <Filter className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold">필터</h3>
        {hasActiveFilters && (
          <Badge 
            variant="outline" 
            className="cursor-pointer hover:bg-red-50 hover:border-red-200"
            onClick={clearFilters}
          >
            초기화
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">플랫폼</label>
          <Select value={selectedFilters.platform} onValueChange={(value) => handleFilterChange('platform', value)}>
            <SelectTrigger className="bg-white border-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200">
              {platforms.map(platform => (
                <SelectItem key={platform} value={platform}>
                  {platform === "all" ? "전체" : platform}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">장르</label>
          <Select value={selectedFilters.genre} onValueChange={(value) => handleFilterChange('genre', value)}>
            <SelectTrigger className="bg-white border-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200">
              {genres.map(genre => (
                <SelectItem key={genre} value={genre}>
                  {genre === "all" ? "전체" : genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">분위기</label>
          <Select value={selectedFilters.mood} onValueChange={(value) => handleFilterChange('mood', value)}>
            <SelectTrigger className="bg-white border-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200">
              {moods.map(mood => (
                <SelectItem key={mood} value={mood}>
                  {mood === "all" ? "전체" : mood}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
