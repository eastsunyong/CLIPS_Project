import { AnswerType } from "./globalType";

export interface User {
  userId: number;
  nickname: string;
  image?: string;
}

export interface myPageAnswer extends AnswerType {
  user?: User;
}
