export type Role='ADMIN'|'MEMBER'|'VIEWER';
export type TicketType='STORY'|'TASK'|'BUG'|'IMPROVEMENT';
export type Priority='LOW'|'MEDIUM'|'HIGH'|'URGENT';
export interface User {id:string;name:string;email:string;avatar:string|null}
export interface Member extends User {role:Role}
export interface Workspace {id:string;name:string}
export interface Project {id:string;name:string;code:string;workspace_id:string;workspace_name:string;role:Role}
export interface Column {id:string;name:string;color:string;position:number}
export interface TicketDraft {title:string;description:string;type:TicketType;priority:Priority;column_id:string;assignee_id:string|null}
export interface Ticket extends TicketDraft {id:string;number:number;creator_id:string;position:number;created_at:string;updated_at:string}
export interface Board {project:Pick<Project,'id'|'name'|'code'>;role:Role;columns:Column[];tickets:Ticket[];members:Member[]}
export const TYPES:Record<TicketType,string>={STORY:'Historia',TASK:'Tarea',BUG:'Bug',IMPROVEMENT:'Mejora'};
export const PRIORITIES:Record<Priority,string>={LOW:'Baja',MEDIUM:'Media',HIGH:'Alta',URGENT:'Urgente'};
