import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { GroceryService } from '../grocery.service';



@Component({
  selector: 'app-grocery-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './grocery-list.component.html',
  styleUrl: './grocery-list.component.css'
})
export class GroceryListComponent {

  newProduct: string = '';
  errorMessage: string = '';
  //groceryList: string[] = ['Bananas', 'Peanut Butter', 'Wheat Bread', 'Greek yogurt'];
  groceryList: any[] = [];

  constructor(private groceryService: GroceryService) { }

  ngOnInit() {
    this.loadGroceries();
  }

  loadGroceries() {
    this.groceryService.getGroceries().subscribe({
      next: (data) => {

        for (let i = 0; i < data.length; i++) {
          this.groceryList.push(data[i].itemName);
        }
      },
      error: (error) => {
        console.error('Error fetching grocery list:', error);
      }
    });
  }

  addProduct() {

    // trim()==Prevents users from adding empty or whitespace-only product names
    if (!this.newProduct.trim()) {
      this.errorMessage = 'Empty or duplicate product not allowed';
      return;
    }
    if (this.groceryList.includes(this.newProduct.trim())) {
      this.errorMessage = 'Duplicate product not allowed';
      return;
    }

    if (this.groceryList.some(item => item.toLowerCase() === this.newProduct.trim().toLowerCase())) {
      // The new product exists in the list in any case format
      this.errorMessage = 'Duplicate product not allowed';
      return;
    }
    this.groceryList.push(this.newProduct.trim());

    this.newProduct = '';
    this.errorMessage = '';
  }
  //splice(index, 1) removes one element from the array, starting at index.
  //splice() modifies the original array directly.

  removeProduct(index: number) {

    this.groceryList.splice(index, 1);
  }
}
