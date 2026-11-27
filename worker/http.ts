export interface Env {DB:D1Database; ASSETS:Fetcher; GOOGLE_CLIENT_ID:string; GOOGLE_CLIENT_SECRET:string}
export class HttpError extends Error {constructor(public status:number,message:string){super(message)}}
export const json=(data:unknown,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
export const fail=(status:number,message:string):never=>{throw new HttpError(status,message)};
export const id=()=>crypto.randomUUID();
export const token=()=>Array.from(crypto.getRandomValues(new Uint8Array(32)),v=>v.toString(16).padStart(2,'0')).join('');
export async function hash(value:string){return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value))),v=>v.toString(16).padStart(2,'0')).join('')}
export const cookie=(r:Request,key:string)=>r.headers.get('Cookie')?.split(';').map(s=>s.trim()).find(s=>s.startsWith(key+'='))?.slice(key.length+1)??'';
export const setCookie=(r:Request,key:string,value:string,age:number)=>`${key}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${age}${new URL(r.url).protocol==='https:'?'; Secure':''}`;
export async function body(r:Request):Promise<Record<string,unknown>> {if(!r.headers.get('Content-Type')?.startsWith('application/json'))fail(415,'Se requiere JSON');const raw=await r.text();if(raw.length>40000)fail(413,'Solicitud demasiado grande');try{const v=JSON.parse(raw);if(!v||typeof v!=='object'||Array.isArray(v))fail(400,'Datos inválidos');return v}catch{ return fail(400,'JSON inválido')}}
export function str(v:unknown,max:number,min=1):string {if(typeof v!=='string'||v.trim().length<min||v.length>max)return fail(400,'Campo inválido');return v.trim()}
export function choice<T extends string>(v:unknown,values:readonly T[]):T {if(!values.includes(v as T))return fail(400,'Opción inválida');return v as T}
export const now=()=>Math.floor(Date.now()/1000);
