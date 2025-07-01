
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ExternalLink, Heart, Clock, Calendar, Users } from "lucide-react";
import ContentCard from "./ContentCard";

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
  director?: string;
  cast?: string[];
  reviews?: Array<{
    id: string;
    author: string;
    rating: number;
    content: string;
    date: string;
  }>;
  similarContents?: Content[];
}

interface ContentDetailDialogProps {
  content: Content | null;
  isOpen: boolean;
  onClose: () => void;
  allContents: Content[];
}

const ContentDetailDialog = ({ content, isOpen, onClose, allContents }: ContentDetailDialogProps) => {
  const [isLiked, setIsLiked] = useState(false);

  if (!content) return null;

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

  const handleWatchClick = () => {
    alert(`${content.platform}에서 "${content.title}" 보기`);
  };

  const similarContents = allContents.filter(c => 
    c.id !== content.id && 
    (c.genre === content.genre || c.mood === content.mood)
  ).slice(0, 4);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="relative">
          {/* Hero Image */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={content.thumbnail}
              alt={content.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            
            {/* Platform Badge */}
            <Badge className={`absolute top-4 left-4 ${getPlatformColor(content.platform)} text-white border-0`}>
              {content.platform}
            </Badge>
            
            {/* Like Button */}
            <Button
              size="sm"
              variant="secondary"
              className={`absolute top-4 right-4 w-10 h-10 p-0 ${isLiked ? 'text-red-500' : 'text-white bg-black/50'}`}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </Button>

            {/* Title and Rating */}
            <div className="absolute bottom-4 left-4 right-4">
              <h1 className="text-3xl font-bold text-white mb-2">{content.title}</h1>
              <div className="flex items-center gap-4 text-white">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current text-yellow-400" />
                  <span className="font-semibold">{content.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{content.year}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{content.duration}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Details */}
          <div className="p-6 space-y-6">
            {/* Description and Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold mb-3">줄거리</h2>
                <p className="text-gray-600 leading-relaxed mb-4">{content.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">{content.genre}</Badge>
                  <Badge variant="secondary">{content.mood}</Badge>
                </div>

                <Button
                  className="pick-gradient text-white hover:scale-105 transition-transform"
                  onClick={handleWatchClick}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {content.platform}에서 보기
                </Button>
              </div>

              <div className="space-y-4">
                {content.director && (
                  <div>
                    <h3 className="font-semibold text-gray-700">감독</h3>
                    <p className="text-gray-600">{content.director}</p>
                  </div>
                )}
                
                {content.cast && (
                  <div>
                    <h3 className="font-semibold text-gray-700">출연진</h3>
                    <p className="text-gray-600">{content.cast.join(", ")}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Reviews */}
            {content.reviews && content.reviews.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">리뷰</h2>
                <div className="space-y-4">
                  {content.reviews.map(review => (
                    <Card key={review.id} className="border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{review.author}</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-current text-yellow-400" />
                              <span className="text-sm">{review.rating}</span>
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-600">{review.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Similar Contents */}
            {similarContents.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">비슷한 작품</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {similarContents.map(similarContent => (
                    <ContentCard key={similarContent.id} content={similarContent} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContentDetailDialog;
