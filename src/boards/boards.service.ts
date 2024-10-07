import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { Board } from './boards.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
  ) {}

  async getAllBoards(): Promise<Board[]> {
    return await this.boardRepository.find();
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.boardRepository.save(board);

    return board;
  }

  async getBoardById(id: number): Promise<Board> {
    const board = await this.boardRepository.findOne({
      where: { id },
    });
    if (!board) {
      throw new Error(`Board with ID "${id}" not found`);
    }

    return board;
  }

  async deleteBoard(id: string): Promise<void> {
    const result = await this.boardRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Board with ID "${id}" not found`);
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.save(board);
    return board;
  }

  // private boards: Board[] = [];
  //
  // getAllBoards(): Board[] {
  //   return this.boards;
  // }
  //
  // createBoard(@Body() createBoardDto: CreateBoardDto): Board {
  //   const { title, description } = createBoardDto;
  //   const board: Board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //   this.boards.push(board);
  //   return board;
  // }
  //
  // getBoardById(id: string): Board {
  //   const board = this.boards.find((board) => board.id === id);
  //   if (!board) {
  //     throw new NotFoundException(`Board with ID "${id}" not found`);
  //   }
  //
  //   return board;
  // }
  //
  // deleteBoard(id: string): void {
  //   const found = this.getBoardById(id);
  //   this.boards = this.boards.filter((board) => board.id !== found.id);
  // }
  //
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
}
