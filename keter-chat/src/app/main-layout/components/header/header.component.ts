import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Chat } from 'src/app/chat/models/chat.interface';
import { ChatService } from 'src/app/chat/services/chat.services';
import { User } from 'src/app/shared/models/user.interface';
import { SessionService } from 'src/app/shared/services/session.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  
  user: User;
  chatList: Chat[];
  chatSelected: Chat;

  private subscriptions: Subscription[];

  constructor(private router: Router,
              private sessionService: SessionService,
              private chatService: ChatService) {}

  ngOnInit() {
    this.subscriptions = [
      this.sessionService.getUser().subscribe(user => {
        this.user = user
        if (user) {
          this.chatService.getChatList().subscribe(data => {
            this.chatList = data.data;
          });
        }
        else {
          this.chatList = [];
        }
      }),

      this.chatService.getChat().subscribe(chat => this.chatSelected = chat)
    ];
      
  }

  ngOnDestroy() {
      this.subscriptions.map(s => s.unsubscribe());
    }

  logout(): void {
    this.sessionService.deleteUser();
    this.login();
  }

  login(): void {
    this.router.navigate(['/auth/login']);
  }

  selectChat(chat: Chat): void {
    this.chatService.setChat(chat)
    this.router.navigate([`/chat/${chat.id}`]);
  } 

  newChat(): void {
    this.chatService.createChat().subscribe(data => {
      this.chatList.push(data.data);
      this.selectChat(data.data);
    })
  }
}
