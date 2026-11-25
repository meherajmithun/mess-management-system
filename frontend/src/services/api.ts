let csrfToken='';
export async function api<T>(path:string, options:RequestInit={}):Promise<T>{
  if(options.method && options.method!=='GET' && !csrfToken) await csrf();
  const res=await fetch('/api/v1'+path,{credentials:'same-origin',...options,headers:{'Content-Type':'application/json',...(options.method&&options.method!=='GET'?{'x-csrf-token':csrfToken}:{}),...options.headers}});
  const data=await res.json().catch(()=>({error:'Connection failed'}));
  if(!res.ok)throw new Error(data.error||'Request failed');return data as T;
}
export async function csrf(){const r=await fetch('/api/v1/auth/csrf',{credentials:'same-origin'});csrfToken=(await r.json()).csrf;}
export const post=<T,>(path:string,body:unknown)=>api<T>(path,{method:'POST',body:JSON.stringify(body)});
