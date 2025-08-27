import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductService {
    private products: { id: number; name: string; price: number }[] = [{
        id: 1,
        name: "Apple iPhone 14",
        price: 59000
    }, {
        id: 2,
        name: "Apple MacBook Pro",
        price: 149900
    }];

    getAllProducts() {
        return this.products;
    }

    getProductById(id: number) {
        const product = this.products.find(product => product.id === id);

        if (!product) throw new NotFoundException('Product not found');

        return product;
    }

    createProduct(product: { name: string; price: number }) {
        const newProduct = {
            id: this.products.length + 1,
            ...product
        };
        this.products.push(newProduct);
        return newProduct;
    }

    updateProduct(id: number, product: { name: string; price: number }) {
        const index = this.products.findIndex(product => product.id === id);

        if (index === -1) throw new NotFoundException('Product not found');

        this.products[index] = {
            id,
            ...product
        };

        return this.products[index];
    }

    patchProduct(id: number, data: Partial<{ name: string; price: number }>) {
        const product = this.getProductById(id);
        Object.assign(product, data);
        return product;
    }

    deleteProduct(id: number) {
        const index = this.products.findIndex(product => product.id === id);

        if (index === -1) throw new NotFoundException('Product not found');

        const deletedProduct = this.products.splice(index, 1);
        return { message: "Product deleted successfully", product: deletedProduct[0] }
    }
}
