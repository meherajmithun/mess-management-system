import { createHash, randomBytes } from 'node:crypto';
import type { Request, Response, NextFunction } from 'express';
import { db } from '../config/db.js';
export type Actor = { userId: string; memberId: string; messId: string; role: 'MANAGER'|'MEMBER'; name: string };
declare global { namespace Express { interface Request { actor?: Actor } } }
export const hash = (v:string) => createHash('sha256').update(v).digest('hex');
export const token = () => randomBytes(32).toString('hex');
export async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const raw = req.cookies?.sid;
    if (!raw) return res.status(401).json({error:'Sign in required'});
    const session = await db.session.findUnique({where:{tokenHash:hash(raw)},include:{user:{include:{memberships:true}}}});
    if (!session || session.expiresAt < new Date() || !session.user.active) return res.status(401).json({error:'Session expired'});
    const membership = session.user.memberships.find(m=>m.status==='ACTIVE');
    if (!membership) return res.status(403).json({error:'No active membership'});
    req.actor = {userId:session.userId,memberId:membership.id,messId:membership.messId,role:membership.role,name:session.user.name};
    next();
  } catch (e) { next(e); }
}
export function manager(req: Request,res: Response,next: NextFunction) { if(req.actor?.role !== 'MANAGER') return res.status(403).json({error:'Manager access required'}); next(); }
export function csrf(req: Request,res: Response,next: NextFunction) {
  if (['GET','HEAD','OPTIONS'].includes(req.method)) return next();
  if (!req.cookies?.csrf || req.get('x-csrf-token') !== req.cookies.csrf) return res.status(403).json({error:'Invalid CSRF token'});
  next();
}
