// src/auth/jwt-payload.interface.ts
export interface JwtPayload {
    email: string;
    sub: string; // This is usually the user ID or some unique identifier
    role: 'admin' | 'customer'; // Add any other properties that you include in the JWT payload
  }
  