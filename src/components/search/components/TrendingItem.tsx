import { TrendingUp } from "lucide-react";

interface TrendingItemProps {
  title: string;
  posts: number;
}

export const TrendingItem = ({ title, posts }: TrendingItemProps) => (
  <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200 rounded-lg mx-2">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-orange-400 rounded-lg flex items-center justify-center">
        <TrendingUp className="h-5 w-5 text-white" />
      </div>
      <div>
        <p className="font-semibold text-gray-900">#{title}</p>
        <p className="text-sm text-gray-600">{posts.toLocaleString()} posts</p>
      </div>
    </div>
  </div>
);