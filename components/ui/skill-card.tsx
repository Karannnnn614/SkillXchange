'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MessageCircle, Calendar, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { UserProfile } from '@/types';

interface SkillCardProps {
  user: UserProfile;
  skillOffered: string;
  direction?: 'horizontal' | 'vertical';
  showActions?: boolean;
  onRequestSwap?: (userId: string, skillName: string) => void;
  className?: string;
}

export function SkillCard({
  user,
  skillOffered,
  direction = 'vertical',
  showActions = true,
  onRequestSwap,
  className = '',
}: SkillCardProps) {
  const router = useRouter();

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/profile/${user.id}`);
  };

  const handleRequestSwap = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onRequestSwap) {
      onRequestSwap(user.id, skillOffered);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.2)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={`overflow-hidden border-2 border-blue-100 shadow-md bg-white ${
          direction === 'horizontal' ? 'flex flex-row' : ''
        } ${className}`}
      >
        <CardHeader className={`pb-2 bg-white ${direction === 'horizontal' ? 'w-1/3' : ''}`}>
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16 border-2 border-blue-200 ring-2 ring-blue-50 shadow-md">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-lg font-bold">
                {user.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <motion.div
                className="font-bold text-blue-700 text-xl hover:text-purple-600 cursor-pointer"
                onClick={handleProfileClick}
              >
                {user.name}
              </motion.div>
              <div className="flex items-center text-sm mt-2">
                <div className="bg-yellow-50 border border-yellow-200 rounded-md px-2 py-0.5 flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="font-bold text-yellow-700">{user.rating.toFixed(1)}</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full mx-2"></div>
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-md px-2 py-0.5">
                  <MapPin className="h-3.5 w-3.5 mr-1 text-gray-600" />
                  <span className="font-medium text-gray-700">{user.location}</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className={`pb-4 bg-white ${direction === 'horizontal' ? 'flex-1' : ''}`}>
          <div className="mb-4">
            <div className="text-base font-semibold text-blue-600 mb-2 flex items-center">
              <span className="inline-block w-2 h-4 bg-blue-500 rounded-sm mr-2"></span>
              Offering
            </div>
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-base px-4 py-1.5 font-medium border border-blue-200">
              {skillOffered}
            </Badge>
          </div>

          <div className="mb-4">
            <div className="text-base font-semibold text-purple-600 mb-2 flex items-center">
              <span className="inline-block w-2 h-4 bg-purple-500 rounded-sm mr-2"></span>
              Looking for
            </div>
            <div className="flex flex-wrap gap-2">
              {user.skillsWanted.slice(0, 3).map((skill, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-purple-50 text-purple-700 border-2 border-purple-200 px-4 py-1.5 font-medium text-base"
                >
                  {skill}
                </Badge>
              ))}
              {user.skillsWanted.length > 3 && (
                <Badge
                  variant="outline"
                  className="bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1 font-medium"
                >
                  +{user.skillsWanted.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          <div className="flex flex-col space-y-3 bg-white p-3 rounded-lg border border-blue-100 shadow-inner">
            <div className="flex items-center text-blue-700 p-2 bg-white rounded-md border border-gray-100 shadow-sm">
              <Calendar className="h-5 w-5 mr-3 text-blue-600" />
              <span className="font-medium">
                Available: <span className="font-bold text-blue-700">{user.availability}</span>
              </span>
            </div>
            <div className="flex items-center text-purple-700 p-2 bg-white rounded-md border border-gray-100 shadow-sm">
              <MessageCircle className="h-5 w-5 mr-3 text-purple-600" />
              <span className="font-medium">
                Completed Swaps:{' '}
                <span className="font-bold text-purple-700">{user.completedSwaps}</span>
              </span>
            </div>
          </div>
        </CardContent>

        {showActions && (
          <CardFooter className="flex justify-between bg-white pt-5 pb-5 px-5 border-t border-blue-100 shadow-inner">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                onClick={handleProfileClick}
                className="font-medium border-2 border-blue-200 text-blue-700 hover:bg-blue-50 shadow-sm bg-white"
              >
                View Profile
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                onClick={handleRequestSwap}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-md"
              >
                Request Swap
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
}
