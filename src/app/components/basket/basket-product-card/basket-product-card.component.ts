import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/mocks/products';
import { BasketServiceService, IBasketProduct } from 'src/app/services/basketService/basket-service.service';
import { CustomisationService } from 'src/app/services/customisation/customisation.service';

@Component({
  selector: 'app-basket-product-card',
  templateUrl: './basket-product-card.component.html',
  styleUrls: ['./basket-product-card.component.css'],
})
export class BasketProductCardComponent {

  // Je récupère mon panier
  basket: IBasketProduct[] = [];

  //je recupère la liste des produits temporaires customisé
  productsList: IProduct[] = [];
  customPrice? : number;
  isCustomised: boolean = false;

  //propriété pour afficher le bouton supprimer un produit
  isButtonVisible: boolean = true;

  constructor(
    private basketService: BasketServiceService,
    private router: Router,
    private customService: CustomisationService) {};

  ngOnInit() {
    this.getBasket();
    this.displayButtonRemoveProduct();
    this.getCustomPrice();
  }

  getBasket() {
    this.basket = this.basketService.getBasket();
  }

  removeProduct(index: number) {
    this.basketService.removeProduct(index);
    this.getBasket();

  }
 
  //Fonction pour faire disparatitre le bouton supprimer un produit du panier quand on est sur la page summary
  displayButtonRemoveProduct() {
    //jSi je suis sur la page summary, je fais disparaitre le bouton supprimer un produit
    if (this.router.url.endsWith("/summary")) {
      this.isButtonVisible = false;
    }
  }

  getCustomPrice() {
this.customPrice = this.customService.getCustomPrice();
console.log("prix custom", this.customPrice);
  }
}
