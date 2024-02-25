import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chat } from '../../models/chat.interface';
import { Message } from '../../models/message.interface';
import { ChatService } from '../../services/chat.services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  
  form: FormGroup;

  chat: Chat;
  messageList: Message[];
  waitMessage: string = '';
  
  
  
  private subscription: Subscription;
  private subscriptions: Subscription[];

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private chatService: ChatService) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      chatId: [, Validators.required],
      question: ['', Validators.required]
    });

    this.subscriptions = [
      this.chatService.getChat().subscribe(chat => {
        this.chat = chat;
        this.chat && this.initChat();
      }),
      this.route.paramMap.subscribe(params => {
        const chatId = params.get('chatId');
        chatId && this.chatService.setChat({ id: +chatId });
      })
    ];

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  send(): void {
    this.waitMessage = 'Wait...';
    this.chatService.createMessage(this.form.value)
          .subscribe(
            data => {
              this.form.get('question')?.setValue('');
              this.waitMessage = '';
              this.messageList.push(data.data);
            },
            (error: HttpErrorResponse) => {
              const data = error.error.data;
              this.waitMessage = '';
            }
          );
  }

  private initChat(): void {
    console.log('initChat :>> ');
    this.form.get('chatId')?.setValue(this.chat.id);
    this.chatService.getMessageList(this.chat.id).subscribe(data => {
      console.log('initChat data :>> ', data);
      this.messageList = data?.data || [];
    });
  }
}
