import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

const TOKEN = 'Token';
@Injectable({
    providedIn: 'root',
})
export class ApiService {
    totalPrice: any;
    cartItems: any[] = [];
    productList = new BehaviorSubject<any>([]);
    apiURLAuth = 'https://dummyjson.com/auth/login';
    constructor(private http: HttpClient, private router: Router) {}

    login(username: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.apiURLAuth}`, {
            username,
            password,
        });
    }

    getData() {
        return this.totalPrice;
    }

    getProductdata() {
        return this.productList.asObservable();
    }
    addToCart(product: any) {
        this.cartItems.push(product);
        this.productList.next(this.cartItems);
    }

    setToken(data: any) {
        localStorage.setItem(TOKEN, data);
    }

    getToken() {
        return localStorage.getItem(TOKEN);
    }

    getProducts(): Observable<any> {
        return this.http.get<any>('https://dummyjson.com/products');
    }

    getCategory(): Observable<any[]> {
        return this.http.get<[]>('https://dummyjson.com/products/categories');
    }

    getProductsByCategory(categoryName: string) {
        return this.http.get<[]>(
            'https://dummyjson.com/products/category/' + categoryName
        );
    }
}
