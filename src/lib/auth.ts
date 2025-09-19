import bcrypt from 'bcryptjs';
import { jwtVerify, SignJWT } from 'jose';

// Secret key untuk JWT - sebaiknya disimpan di environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'cosplayermedsos_jwt_secret';

// Fungsi untuk hashing password
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

// Fungsi untuk memverifikasi password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

// Fungsi untuk generate JWT token
export async function generateToken(userId: string, role: string, username?: string, cosplayerName?: string): Promise<string> {
  const secret = new TextEncoder().encode(JWT_SECRET);
  
  return await new SignJWT({ 
      userId, 
      role,
      username,
      cosplayerName
    })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);
}

// Fungsi untuk verify JWT token
export async function verifyToken(token: string): Promise<{ userId: string; role: string; username?: string; cosplayerName?: string } | null> {
  try {
    // Cek apakah token dalam format JWT yang valid
    if (!token || token.split('.').length !== 3) {
      return null;
    }
    
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    return {
      userId: payload.userId as string,
      role: payload.role as string,
      username: payload.username as string | undefined,
      cosplayerName: payload.cosplayerName as string | undefined
    };
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
}