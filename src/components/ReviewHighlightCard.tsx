
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink, Quote } from "lucide-react";

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
  reviews?: Array<{
    id: string;
    author: string;
    rating: number;
    content: string;
    date: string;
    likes: number;
  }>;
}

interface ReviewHighlightCardProps {
  content: Content;
  onClick?: () => void;
}

const ReviewHighlightCard = ({ content, onClick }: ReviewHighlightCardProps) => {
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

  // 가장 공감이 많은 리뷰 찾기
  const topReview = content.reviews?.reduce((prev, current) => 
    (prev.likes > current.likes) ? prev : current
  );

  const handleWatchClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`${content.platform}에서 "${content.title}" 보기`);
  };

  return (
    <Card 
      className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-0 overflow-hidden cursor-pointer bg-gray-800 hover:bg-gray-750"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="flex">
          {/* 왼쪽 이미지 */}
          <div className="relative w-48 h-32 flex-shrink-0">
            <img
              src={content.thumbnail}
              alt={content.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <Badge className={`absolute top-2 left-2 ${getPlatformColor(content.platform)} text-white border-0 text-xs`}>
              {content.platform}
            </Badge>
          </div>
          
          {/* 오른쪽 컨텐츠 */}
          <div className="flex-1 p-4 flex flex-col justify-between">
            {/* 상단: 인용문 */}
            <div className="mb-3">
              <div className="flex items-start gap-2 mb-2">
                <Quote className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                <p className="text-gray-300 italic leading-relaxed">
                  "{topReview?.content}"
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>- {topReview?.author}</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current text-yellow-400" />
                  <span>{topReview?.rating}</span>
                </div>
                <span>공감 {topReview?.likes}</span>
              </div>
            </div>
            
            {/* 하단: 작품 정보 */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold text-lg text-white mb-1">{content.title}</h3>
                  <p className="text-gray-400 text-sm line-clamp-1">{content.description}</p>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-300 ml-4">
                  <Star className="w-3 h-3 fill-current text-yellow-400" />
                  {content.rating}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                    {content.genre}
                  </Badge>
                  <Badge variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                    {content.year}
                  </Badge>
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
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewHighlightCard;
