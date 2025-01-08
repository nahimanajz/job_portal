
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from '../interfaces';



export const tokenExtractor = async (token: string) => {
  try {
    const user = jwt.decode(token, {
      json: true,
    });
    return user;
  } catch (error) {}
};

export const generateSubscriptionToken = (
  payload: JwtPayload,
  secret: string = process.env.JWT_SECRET,
): string => {
  return jwt.sign(payload, secret);
};
