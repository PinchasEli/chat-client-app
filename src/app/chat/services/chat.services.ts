import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionService } from 'src/app/shared/services/session.service';
import { environment } from 'src/environments/environment';
import { Chat } from '../models/chat.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

    private baseUrl: string = `${environment.serverUrl}/chat`;
    private chat$: BehaviorSubject<any> = new BehaviorSubject(null);
  
    constructor(private http: HttpClient,
                private sessionService: SessionService) {}
  
    getChat(): Observable<Chat> {
        return this.chat$.asObservable();
    }
    
    setChat(chat: Chat): void {
        this.chat$.next(chat);
    }
        
    getChatList(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}`);
    }

    createChat(): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/new`, {});
    }

    getMessageList(chatId: number): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/${chatId}/messages`);
    }

    createMessage(data: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/message`, data);
    }
}
