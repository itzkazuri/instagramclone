import { Post, PostProps } from "@/components/post/Post";
import { StoryCarousel } from "@/components/stories/StoryCarousel";

const mockPost: PostProps = {
  id: "1",
  user: {
    username: "sakura_cosplay",
    avatar: "/current-user-avatar.png",
  },
  mediaUrl: "https://via.placeholder.com/600x600",
  caption: "Loving the new costume! #cosplay #naruto",
  likes: 1234,
  comments: [
    {
      user: "naruto_fan",
      comment: "Looks amazing!",
    },
    {
      user: "anime_lover",
      comment: "So cool!",
    },
  ],
};

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <StoryCarousel />
          <div className="mt-8">
            <Post post={mockPost} />
            <Post post={mockPost} />
            <Post post={mockPost} />
          </div>
        </div>
        <div className="hidden md:block">
          {/* Suggestions Sidebar */}
          <div className="bg-white dark:bg-black border dark:border-gray-800 rounded-lg p-4">
            <h2 className="font-semibold text-lg mb-4">Suggestions For You</h2>
            {/* Suggested user list */}
            <div className="space-y-4">
              {/* Suggested user item */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src="https://via.placeholder.com/40" alt="user" className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="font-semibold text-sm">naruto_fan</p>
                    <p className="text-gray-500 text-xs">Suggested for you</p>
                  </div>
                </div>
                <button className="text-blue-500 font-semibold text-sm">Follow</button>
              </div>
              {/* ... more suggested users */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
