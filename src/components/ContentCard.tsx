
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink, Heart, Clock } from "lucide-react";

interface Content {
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

interface ContentCardProps {
  content: Content;
  onClick?: () => void;
}

const ContentCard = ({ content, onClick }: ContentCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const getPlatformColor = (platform: string) => {
    const colors: { [key: string]: string } = {
      'Netflix': 'bg-red-500',
      'Disney+': 'bg-blue-600',
      '웨이브': 'bg-blue-400',
      '티빙': 'bg-orange-500',
      '쿠팡플레이': 'bg-green-500',
      '왓챠': 'bg-pink-500'
    };
    return colors[platform] || 'bg-gray-500';
  };

  const handleWatchClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`${content.platform}에서 "${content.title}" 보기`);
  };

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <Card 
      className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={content.thumbnail}
          alt={content.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Platform Badge */}
        <Badge className={`absolute top-3 left-3 ${getPlatformColor(content.platform)} text-white border-0`}>
          {content.platform}
        </Badge>
        
        {/* Like Button */}
        <Button
          size="sm"
          variant="secondary"
          className={`absolute top-3 right-3 w-8 h-8 p-0 ${isLiked ? 'text-red-500' : 'text-gray-600'}`}
          onClick={handleLikeToggle}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        </Button>

        {/* Rating */}
        <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded-lg text-sm flex items-center gap-1">
          <Star className="w-3 h-3 fill-current text-yellow-400" />
          {content.rating}
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-lg leading-tight flex-1">{content.title}</h3>
          <span className="text-sm text-gray-500 ml-2">{content.year}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{content.description}</p>
        
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline" className="text-xs">{content.genre}</Badge>
          <Badge variant="secondary" className="text-xs">{content.mood}</Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            {content.duration}
          </div>
          
          <Button
            size="sm"
            className="pick-gradient text-white hover:scale-105 transition-transform"
            onClick={handleWatchClick}
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            보기
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentCard;
