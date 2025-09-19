import { PostHeader } from './PostHeader';
import { PostMedia } from './PostMedia';
import { PostActions } from './PostActions';
import { PostContent } from './PostContent';
import { PostComments } from './PostComments';
import { CommentInput } from './CommentInput';

export interface PostProps {
  id: string;
  user: {
    username: string;
    avatar: string;
  };
  mediaUrl: string;
  caption: string;
  likes: number;
  comments: {
    user: string;
    comment: string;
  }[];
}

export const Post = ({ post }: { post: PostProps }) => {
  return (
    <div className="bg-white dark:bg-black border dark:border-gray-800 rounded-lg mb-8">
      <PostHeader user={post.user} />
      <PostMedia mediaUrl={post.mediaUrl} />
      <div className="p-4">
        <PostActions />
        <PostContent username={post.user.username} caption={post.caption} />
        <PostComments comments={post.comments} />
        <CommentInput />
      </div>
    </div>
  );
};
