import Cartclass from "../classes/Cartclass.js";
import { currency } from "../modules/helpers.js";

const btnsAddCart = document.querySelectorAll(".btn-add-to-cart");
const btnsRemoveFromCart = document.querySelectorAll(".btn-remove-from-cart");
const btnClearCart = document.querySelector('#btn-clear-cart');
const productList = document.querySelectorAll(".products-list");
const cart = new Cartclass;

productList.forEach((product) => {
    const productJSON = JSON.parse(product.getAttribute("data-product"));
    getTotalAndPrice(productJSON);
})

function getProductQuantityAndPrice(product){
    const { qty, price } = cart.getProductQuantityAndPrice(product);

    document.querySelector(`.total-product-in-cart${product.id}`).textContent = qty;
    document.querySelector(`.total-product-price-in-cart${product.id}`).textContent = price;
}

function getTotalHeader() {
    const sum = cart.getTotalQuantityAndPrice();
    document.querySelector('#totalQuantity').textContent = sum.qty;
    document.querySelector('#totalPrice').textContent = currency(sum.total);
}

function getTotalAndPrice(product){
    getProductQuantityAndPrice(product)
    getTotalHeader()
}

btnsAddCart.forEach(button => {
    button.addEventListener('click', () => {
        const product = JSON.parse(button.getAttribute('data-product'));        
        cart.add(product);
        getTotalAndPrice(product);
    })
})

btnsRemoveFromCart.forEach(button => {
    button.addEventListener('click', () => {
        const product = JSON.parse(button.getAttribute('data-product'));
        cart.remove(product);
        getTotalAndPrice(product);
    })
})

btnClearCart.addEventListener('click', () => {
    if (!cart.getCart().length) {
        Swal.fire({
          icon: "info",
          title: "Empty",
          text: "Carrinho vazio!",
        });
        return;
      }
      Swal.fire({
        title: "Você esta certo?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          cart.clear();
          Swal.fire("Carrinho vazio!", "", "sucesso");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else if (result.isDenied) {
        }
      });
})