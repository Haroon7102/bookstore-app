import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
  } from '@nestjs/common';
  import { BooksService } from './books.service';
  import { CreateBookDto } from './dto/create-book.dto';
  import { UpdateBookDto } from './dto/update-book.dto';
  
  @Controller('books')
  export class BooksController {
    constructor(private readonly booksService: BooksService) {}
  
    @Post()
    create(@Body() createBookDto: CreateBookDto) {
    console.log('📚 Received a POST request to add a new book:', createBookDto);
      return this.booksService.create(createBookDto);
    }
  
    @Get()
    findAll() {
    console.log('📖 GET request to fetch all books');
      return this.booksService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
    console.log(`📖 GET request for book with ID: ${id}`);
      return this.booksService.findOne(id);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    console.log(`✏️ PUT request to update book ${id} with`, updateBookDto);
      return this.booksService.update(id, updateBookDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
    console.log(`🗑️ DELETE request to remove book with ID: ${id}`);
      return this.booksService.remove(id);
    }
  }
  