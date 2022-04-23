import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/all')
  async getBooksAndMagazines(@Query('sort') sort: string) {
    return await this.appService.getBooksAndMagazines(sort);
  }

  @Get('/book/:isbn')
  async getBookByIsbn(@Param('isbn') isbn: string) {
    return await this.appService.getBookByIsbn(isbn);
  }

  @Get('/allByAuthor')
  async getBookAndMagazineByAuthor(@Query('email')email: string){
    return await this.appService.getBookAndMagazineByAuthor(email);
  }

  @Post('/add')
  async exportCsv(@Res() res: Response, @Body() body: any) {
    const result = await this.appService.addBookAndMagazine(body);
    if(result === 'Add Data in the Request Body') res.send('Add Data in the Request Body');
    else {
      const file = createReadStream(__dirname+'/static/bookAndMags.csv');
    res.set({
      'Content-Type': 'text/csv',
      'Content-Disposition': 'filename=abc.csv'
    });
    file.pipe(res);
    }
  }
}
