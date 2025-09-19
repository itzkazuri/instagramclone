// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Fungsi untuk hashing password
async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

async function main() {
  // Hapus data yang sudah ada
  await prisma.like.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  
  // Buat user admin
  const adminPassword = await hashPassword('admin123');
  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      slug: 'admin',
      email: 'admin@cosplayermedsos.com',
      password: adminPassword,
      role: 'ADMIN',
      bio: 'Administrator of Cosplayer Medsos',
      cosplayerName: 'Admin User',
      isVerified: true,
      socialLinks: JSON.stringify({
        twitter: 'https://twitter.com/admin',
        instagram: 'https://instagram.com/admin'
      }),
    },
  });

  // Buat user biasa
  const userPassword = await hashPassword('user123');
  const user = await prisma.user.create({
    data: {
      username: 'cosplayer_fan',
      slug: 'cosplayer-fan',
      email: 'user@cosplayermedsos.com',
      password: userPassword,
      role: 'USER',
      bio: 'Professional cosplayer and content creator',
      cosplayerName: 'Cosplayer Fan',
      specializations: JSON.stringify(['Anime', 'Manga', 'Video Games']),
      location: 'Tokyo, Japan',
      isVerified: true,
      socialLinks: JSON.stringify({
        twitter: 'https://twitter.com/cosplayer_fan',
        instagram: 'https://instagram.com/cosplayer_fan',
        tiktok: 'https://tiktok.com/@cosplayer_fan'
      }),
      followersCount: 1200,
      followingCount: 350,
      postsCount: 42,
    },
  });

  console.log('Seeder completed successfully');
  console.log('Admin user created:', admin);
  console.log('Regular user created:', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });