import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {
  private boards = ['board1', 'board2', 'board3'];

  getAllBoards() {
    return this.boards;
  }
}
