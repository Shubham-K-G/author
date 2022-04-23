import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
const CSVToJSON = require('csvtojson');
import { json2csvAsync } from 'json-2-csv';

@Injectable()
export class AppService {

  async getBooksAndMagazines(sort: string) {
    const books = await CSVToJSON({delimiter: ';'}).fromFile(__dirname+'/static/books.csv');
    const magazines = await CSVToJSON({delimiter: ';'}).fromFile(__dirname+'/static/magazines.csv');
    if(sort === 'true') return [...books,...magazines].sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1);
    else return [...books,...magazines];
  }

  async getBookByIsbn(isbn: string) {
    const books = await CSVToJSON({delimiter: ';'}).fromFile(__dirname+'/static/books.csv');
    let book: string;
    books.forEach(bk => {
      if(bk.isbn === isbn) book = bk;
    });
    if(book)  return book;
    else return 'No Data Found';
  }

  async getBookAndMagazineByAuthor(email: string) {
    const books: any[] = await CSVToJSON({delimiter: ';'}).fromFile(__dirname+'/static/books.csv');
    const magazines = await CSVToJSON({delimiter: ';'}).fromFile(__dirname+'/static/magazines.csv');
    const result = [...books.filter(book => String(book.authors).split(',').includes(email)) , ...magazines.filter(magazine => String(magazine.authors).split(',').includes(email))];
    if(result.length > 0) return result;
    else return 'No Data Found';
  }

  async addBookAndMagazine( body: any ) {
    if(!body || body.length === 0 || JSON.stringify(body) === JSON.stringify({})) {
      return 'Add Data in the Request Body'
    }
    else {
      const csv = await json2csvAsync(body, {emptyFieldValue: null});
      fs.writeFileSync(__dirname+'/static/bookAndMags.csv', csv);
    }
  }

}
