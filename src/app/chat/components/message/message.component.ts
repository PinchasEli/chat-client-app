import { Component, Input } from '@angular/core';
import { Message } from '../../models/message.interface';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  
  @Input() message: Message;
  
}
