import {allocate,daysInMonth} from './money.js';
type Assignment={memberId:string;startAt:Date;endAt:Date|null;customSharePaisa:bigint|null};
export function calculateRoomRent(month:Date,rentPaisa:bigint,assignments:Assignment[]){
  const days=daysInMonth(month),first=new Date(Date.UTC(month.getUTCFullYear(),month.getUTCMonth(),1));
  const dayShares=allocate(rentPaisa,Array(days).fill(1n),Array.from({length:days},(_,i)=>String(i+1).padStart(2,'0')));
  const result=new Map<string,bigint>();const vacant:number[]=[];
  for(let day=1;day<=days;day++){
    const current=new Date(first.getTime()+(day-1)*86400000);
    const active=assignments.filter(x=>x.startAt<=current&&(!x.endAt||x.endAt>=current));
    if(!active.length){vacant.push(day);continue;}
    const custom=active.some(x=>x.customSharePaisa!==null);
    if(custom&&active.some(x=>x.customSharePaisa===null))throw new Error(`Mixed custom and equal shares on day ${day}`);
    const weights=active.map(x=>custom?x.customSharePaisa!:1n);
    if(custom&&weights.reduce((s,x)=>s+x,0n)!==rentPaisa)throw new Error(`Custom shares do not reconcile on day ${day}`);
    const shares=allocate(dayShares[day-1],weights,active.map(x=>x.memberId));
    active.forEach((x,i)=>result.set(x.memberId,(result.get(x.memberId)||0n)+shares[i]));
  }
  return {allocations:[...result].map(([memberId,amountPaisa])=>({memberId,amountPaisa})),vacantDays:vacant,monthlyRentPaisa:rentPaisa};
}
