import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { UppercasePipe } from 'src/common/pipes/uppercase/uppercase.pipe';

@Controller('product')

export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    getAll() {
        return this.productService.getAllProducts();
    }

    @Get(':id')
    getById(@Param('id') id: string) {
        return this.productService.getProductById(+id);
    }

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.productService.createProduct(createProductDto);
    }

    @Post('uppercase')
    uppercase(@Body('name', new UppercasePipe()) name: string) {
        return { message: `Received uppercase name: ${name}` };
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() product: { name: string; price: number }) {
        return this.productService.updateProduct(+id, product);
    }

    @Patch(':id')
    patch(@Param('id') id: string, @Body() product: Partial<{ name: string; price: number }>) {
        return this.productService.patchProduct(+id, product);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.productService.deleteProduct(+id);
    }
}
