import {Injectable} from '@angular/core';
import {Board,Project,Role,TicketDraft,User,Workspace} from './models';
@Injectable({providedIn:'root'})
export class ApiService {
 private async request<T>(path:string,method='GET',body?:unknown):Promise<T>{const r=await fetch('/api'+path,{method,credentials:'same-origin',headers:body===undefined?{}:{'Content-Type':'application/json'},body:body===undefined?undefined:JSON.stringify(body)});const data=await r.json().catch(()=>null);if(!r.ok)throw new Error(data?.error??`Error ${r.status}`);return data as T}
 me(){return this.request<{user:User|null}>('/me')}
 logout(){return this.request('/auth/logout','POST')}
 projects(){return this.request<{projects:Project[];workspaces:Workspace[]}>('/projects')}
 workspace(name:string){return this.request<{id:string}>('/workspaces','POST',{name})}
 project(workspaceId:string,name:string,code:string){return this.request<{id:string}>('/projects','POST',{workspaceId,name,code})}
 board(p:string){return this.request<Board>(`/projects/${p}/board`)}
 create(p:string,b:TicketDraft){return this.request(`/projects/${p}/tickets`,'POST',b)}
 update(p:string,t:string,b:TicketDraft){return this.request(`/projects/${p}/tickets/${t}`,'PATCH',b)}
 move(p:string,t:string,column_id:string,before_id:string|null){return this.request(`/projects/${p}/tickets/${t}/move`,'POST',{column_id,before_id})}
 remove(p:string,t:string){return this.request(`/projects/${p}/tickets/${t}`,'DELETE')}
 invite(p:string,role:Exclude<Role,'ADMIN'>){return this.request<{url:string;expiresInDays:number}>(`/projects/${p}/invitations`,'POST',{role})}
 accept(token:string){return this.request<{id:string}>('/invitations/accept','POST',{token})}
}
