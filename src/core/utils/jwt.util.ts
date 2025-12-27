import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'secret';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret';

export const generateAccessToken = (payload: object) => {
    return jwt.sign(payload, ACCESS_SECRET as Secret, { expiresIn: (process.env.JWT_ACCESS_EXPIRES_IN || '1h') as any });
};

export const generateRefreshToken = (payload: object) => {
    return jwt.sign(payload, REFRESH_SECRET as Secret, { expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || '7d') as any });
};

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, ACCESS_SECRET);
};

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, REFRESH_SECRET);
};
