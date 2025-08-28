import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { UppercasePipe } from 'src/common/pipes/uppercase/uppercase.pipe';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { Roles } from 'src/guards/roles/roles.decorator';
import { Role } from 'src/guards/roles/roles.enums';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@Controller('product')

export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @UseGuards(AuthGuard)
    @UseGuards(RolesGuard)
    @Roles(Role.USER)

    @Get()
    getAll() {
        return this.productService.getAllProducts();
    }

    @Get(':id')
    getById(@Param('id') id: string) {
        return this.productService.getProductById(+id);
    }

    @Roles(Role.ADMIN)

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
