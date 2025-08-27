import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './interfaces/product.interface';

@Injectable()
export class ProductService {
    private products: Product[] = [];

    getAllProducts(): Product[] {
        return this.products;
    }

    getProductById(id: number): Product {
        const product = this.products.find(product => product.id === id);

        if (!product) throw new NotFoundException('Product not found');

        return product;
    }

    createProduct(createProductDto: CreateProductDto): Product {
        const newProduct: Product = {
            id: this.products.length + 1,
            ...createProductDto
        };
        this.products.push(newProduct);
        return newProduct;
    }

    updateProduct(id: number, product: { name: string; price: number }): Product {
        const index = this.products.findIndex(product => product.id === id);

        if (index === -1) throw new NotFoundException('Product not found');

        this.products[index] = {
            id,
            ...product
        };

        return this.products[index];
    }

    patchProduct(id: number, data: Partial<{ name: string; price: number }>): Product {
        const product = this.getProductById(id);
        Object.assign(product, data);
        return product;
    }

    deleteProduct(id: number): { message: string; product: Product } {
        const index = this.products.findIndex(product => product.id === id);

        if (index === -1) throw new NotFoundException('Product not found');

        const deletedProduct = this.products.splice(index, 1);
        return { message: "Product deleted successfully", product: deletedProduct[0] }
    }
}
