import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../models/product';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
    items: Product[] = [];
    products: Product[] = [];
    categories: any[] = [];
    startIndex = 0;
    endIndex = 0;
    maxProductsPerPage: number = 0;
    productsPerPage: number = 9;
    currentPage: number = 0;
    search = '';
    totalItems: number = 0;
    checkbox: any;
    value: any[] = [];
    productsCount: number = 0;
    isClicked: boolean = false;

    constructor(private apiService: ApiService) {}

    ngOnInit(): void {
        this.startIndex = this.currentPage * this.productsPerPage;
        this.endIndex = this.startIndex + this.productsPerPage;
        this._getProducts();
        this._getCategories();
        this.getCartProducts();
    }
    // Getting cart products length
    getCartProducts() {
        this.apiService.getProductdata().subscribe((data) => {
            this.totalItems = data.length;
        });
    }
    // Getting pages number
    getPages() {
        let pagesNumber = Math.ceil(
            this.products.length / this.productsPerPage
        );
        this.maxProductsPerPage = pagesNumber;

        if (pagesNumber == 0) {
            return [];
        } else {
            let pages = [];
            for (let i = 1; i <= pagesNumber; i++) {
                pages.push(i);
            }
            return pages;
        }
    }
    // Adding products to the cart
    addToCart(item: any) {
        this.apiService.addToCart(item);
    }
    // Navigating to the previous page
    decrementPage() {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.startIndex = this.currentPage * this.productsPerPage;
            this.endIndex = this.startIndex + this.productsPerPage;
        }
    }
    // Navigating to the next page
    incrementPage() {
        if (this.currentPage < this.maxProductsPerPage - 1) {
            this.currentPage++;
            this.startIndex = this.currentPage * this.productsPerPage;
            this.endIndex = this.startIndex + this.productsPerPage;
        }
    }
    // Navigating to the current page
    jumptoPage(pageNumber: number) {
        this.currentPage = pageNumber - 1;
        this.startIndex = this.currentPage * this.productsPerPage;
        this.endIndex = this.startIndex + this.productsPerPage;
    }
    // Getting products from api
    private _getProducts() {
        this.apiService.getProducts().subscribe((product: any) => {
            this.products = product.products;
        });
    }
    // Getting categories from api
    private _getCategories() {
        this.apiService.getCategory().subscribe((categories) => {
            this.categories = categories;
        });
    }

    // Checkbox filtering
    categoryFilter(event: any) {
        let check = event.target.checked;
        if (check == true) {
            this.isClicked = true;
            this.value.push(event.target.value);
            this.getFilteredProducts(this.value);
        } else if (check == false && this.value.length != 0) {
            let newValue: any[] = [];

            newValue = this.value.filter((item) => item != event.target.value);
            this.value = newValue;

            this.value.length == 0
                ? (this._getProducts(), (this.isClicked = false))
                : this.getFilteredProducts(this.value);
        }
    }

    // Filtering  products according to checkbox products
    getFilteredProducts(categoryName: any) {
        const items: any[] = [];
        categoryName.map((category: any) => {
            this.apiService
                .getProductsByCategory(category)
                .subscribe((filtered: any) => {
                    items.push(filtered.products);

                    this.products = items.flatMap((x) => x);
                    this.productsCount = items.flatMap((x) => x).length;
                });
        });
    }
}
