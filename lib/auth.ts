import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN: string | number = process.env.JWT_EXPIRES_IN || '7d';

export interface JWTPayload {
  userId: string;
  email: string;
  username: string;
}

export class AuthUtils {
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
  }

  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  static generateToken(payload: JWTPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  }

  static verifyToken(token: string): JWTPayload | null {
    try {
      return jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch (error) {
      return null;
    }
  }

  static extractTokenFromRequest(request: NextRequest): string | null {
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }

    // Check for token in cookies as well
    const tokenFromCookie = request.cookies.get('auth_token')?.value;
    return tokenFromCookie || null;
  }

  static async getUserFromRequest(request: NextRequest): Promise<JWTPayload | null> {
    const token = this.extractTokenFromRequest(request);
    if (!token) return null;

    return this.verifyToken(token);
  }

  static generateRefreshToken(): string {
    return jwt.sign({}, JWT_SECRET, { expiresIn: '30d' });
  }

  static isTokenExpired(token: string): boolean {
    try {
      const decoded = jwt.decode(token) as { exp?: number };
      if (!decoded || !decoded.exp) return true;

      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime;
    } catch {
      return true;
    }
  }
}

export class PasswordValidator {
  static validate(password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

export class RateLimiter {
  private static attempts = new Map<string, { count: number; firstAttempt: number }>();
  private static readonly MAX_ATTEMPTS = parseInt(process.env.RATE_LIMIT_MAX || '100');
  private static readonly WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW || '15') * 60 * 1000; // Convert to milliseconds

  static isAllowed(identifier: string): boolean {
    const now = Date.now();
    const userAttempts = this.attempts.get(identifier);

    if (!userAttempts) {
      this.attempts.set(identifier, { count: 1, firstAttempt: now });
      return true;
    }

    // Reset if window has passed
    if (now - userAttempts.firstAttempt > this.WINDOW_MS) {
      this.attempts.set(identifier, { count: 1, firstAttempt: now });
      return true;
    }

    // Check if under limit
    if (userAttempts.count < this.MAX_ATTEMPTS) {
      userAttempts.count++;
      return true;
    }

    return false;
  }

  static getRemainingAttempts(identifier: string): number {
    const userAttempts = this.attempts.get(identifier);
    if (!userAttempts) return this.MAX_ATTEMPTS;

    const now = Date.now();
    if (now - userAttempts.firstAttempt > this.WINDOW_MS) {
      return this.MAX_ATTEMPTS;
    }

    return Math.max(0, this.MAX_ATTEMPTS - userAttempts.count);
  }

  static getResetTime(identifier: string): number {
    const userAttempts = this.attempts.get(identifier);
    if (!userAttempts) return 0;

    return userAttempts.firstAttempt + this.WINDOW_MS;
  }
}
