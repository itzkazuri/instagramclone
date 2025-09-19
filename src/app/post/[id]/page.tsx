// src/app/post/[id]/page.tsx
import { PrismaClient } from '@prisma/client';
import { convertToNextMetadata, generatePostMetadata } from '@/lib/metadata';

const prisma = new PrismaClient();

// Fungsi untuk mengambil post berdasarkan ID
async function getPost(id: string) {
  return await prisma.post.findUnique({
    where: { id },
    include: {
      author: true,
      media: true,
      tags: true,
    },
  });
}

// Generate metadata untuk post spesifik
export async function generateMetadata({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  
  if (!post) {
    // Jika post tidak ditemukan, gunakan metadata default
    return convertToNextMetadata({
      title: 'Post Not Found',
      description: 'The requested post could not be found',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/post/${params.id}`,
      type: 'website',
      siteName: 'Cosplayer Medsos',
      locale: 'en_US'
    });
  }
  
  // Generate metadata khusus untuk post ini
  const metadata = generatePostMetadata(post);
  return convertToNextMetadata(metadata);
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
        <p>The post you are looking for does not exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">
          {post.character ? `${post.character} Cosplay` : 'Cosplay Post'}
        </h1>
        <div className="flex items-center mb-6">
          <span className="font-semibold">{post.author.cosplayerName || post.author.username}</span>
          <span className="mx-2">•</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        
        {post.content && (
          <div className="prose max-w-none mb-6">
            <p>{post.content}</p>
          </div>
        )}
        
        {post.media && post.media.length > 0 && (
          <div className="grid grid-cols-1 gap-4 mb-6">
            {post.media.map((media) => (
              <div key={media.id}>
                {media.type === 'IMAGE' ? (
                  <img 
                    src={media.url} 
                    alt={media.altText || `Cosplay image`} 
                    className="w-full rounded-lg"
                  />
                ) : (
                  <video 
                    src={media.url} 
                    controls 
                    className="w-full rounded-lg"
                  />
                )}
              </div>
            ))}
          </div>
        )}
        
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">About the Cosplayer</h2>
          <div className="flex items-center">
            {post.author.avatar && (
              <img 
                src={post.author.avatar} 
                alt={post.author.cosplayerName || post.author.username} 
                className="w-12 h-12 rounded-full mr-4"
              />
            )}
            <div>
              <h3 className="font-semibold">{post.author.cosplayerName || post.author.username}</h3>
              {post.author.bio && (
                <p className="text-sm text-gray-600">{post.author.bio}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}