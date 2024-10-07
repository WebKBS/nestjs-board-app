import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './boards.entity';
import { BoardStatus } from './board-status.enum';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  async getAllBoard(): Promise<Board[]> {
    return await this.boardsService.getAllBoards();
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;
    return this.boardsService.createBoard({ title, description });
  }

  @Get('/:id')
  async getBoardById(@Param('id') id: number): Promise<Board> {
    return await this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  async deleteBoard(@Param('id') id: string): Promise<void> {
    return await this.boardsService.deleteBoard(id);
  }

  @Patch('/:id/status')
  async updateBoardStatus(
    @Param('id') id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return await this.boardsService.updateBoardStatus(id, status);
  }
}
