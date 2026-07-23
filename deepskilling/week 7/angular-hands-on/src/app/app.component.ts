import { Component } from '@angular/core';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  available: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Enterprise Portal Catalog';
  author = 'Sankar V';

  products: Product[] = [
    { id: 1, name: 'Cloud Native Microservices Guide', category: 'Books', price: 549, available: true },
    { id: 2, name: 'Spring Boot 3 Enterprise Masterclass', category: 'Training', price: 1299, available: true },
    { id: 3, name: 'Modern React & TypeScript Toolkit', category: 'Tools', price: 849, available: true },
    { id: 4, name: 'DevOps & Kubernetes Infrastructure Pass', category: 'Training', price: 1650, available: false }
  ];

  selectedCategory = 'All';

  get filteredProducts(): Product[] {
    if (this.selectedCategory === 'All') return this.products;
    return this.products.filter(p => p.category === this.selectedCategory);
  }

  setCategory(category: string): void {
    this.selectedCategory = category;
  }
}
