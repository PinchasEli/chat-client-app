export interface Message {
    id: number;
    chatId: number;
    question: string;
    answer: string;
    createdAt: Date;
}
