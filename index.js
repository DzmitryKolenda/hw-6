fetch('https://dummyjson.com/products')
  .then(res => res.json())
  .then((data) => {
    console.log(data.products);
    // Start here :)
    const allProducts = data.products;

    displayProducts(allProducts);

    const formSearch = document.querySelector('#form-search');

    const  inputSearch  = document.querySelector('#input-search');

    const yourCart = formSearch.querySelector('button[type="button"]');

    const cardBody = document.querySelectorAll('.card-body');

    const orderList = document.querySelector('#orderList');
    
    let cartPrice = 0;

    yourCart.textContent = `Your cart - ${cartPrice}.00$`;

    function displayProducts(products) {
      const parent = document.querySelector('#parent');

      for (let item in products) {
      let div = document.createElement('div');

      div.innerHTML = 
        '<div class="card">' + 

          '<div class="card-img">' + 
            '<img src="' + products[item].thumbnail + '" class="card-img-top" alt="...">' + 
          '</div>' + 
        
          '<div class="card-body">' + 
            '<h5 class="card-title">' + products[item].title + '</h5>' + 

            '<p class="card-text">' + products[item].description + '</p>' + 

            '<div class="bg-border-top">' + 
              '<div class="price">Price: ' + products[item].price + '$</div>' + 

              '<div class="rating">Rating: ' + products[item].rating + '</div>' +
            '</div>' + 

            '<button type="button" class="btn btn-primary">Add to cart</button>' + 
          '</div>' + 
        '</div>'

        parent.append(div);
        };
    };

    formSearch.addEventListener('submit', searchProducts);

    function searchProducts(event) {
      event.preventDefault();

      const searchValue = inputSearch.value.trim().toLowerCase();

      const hiddenCard = document.querySelectorAll('.card');

      if (searchValue !== '') {
        hiddenCard.forEach(function(item) {

          const searchTitle = item.querySelector('.card-title');

          const searchDescription = item.querySelector('.card-text');

          if (searchTitle.innerText.toLowerCase().search(searchValue) === -1
            && searchDescription.innerText.toLowerCase().search(searchValue) === -1) {
            item.classList.add('hide');
          } else {
            item.classList.remove('hide');
          }
        });
      } else {
          hiddenCard.forEach(function(item) {
          item.classList.remove('hide');
        });
      };
    };

    cardBody.forEach(body => body.querySelector('button[type="button"]').addEventListener('click', addToCart, creatOrderItem));

    function addToCart(event) {
      const cardButton = event.target.parentElement;

      const price = cardButton.querySelector('.price');

      let el = price.textContent;

      let numEl = '';

      for (let i in el) {
        if (!isNaN(el[i])) {
          console.log(el[i]);
          numEl += el[i];
        };
      };
    
      numEl = parseInt(numEl);

      yourCart.textContent = `Your cart - ${cartPrice + numEl}.00$`;

      cartPrice += numEl;
  };

  function creatOrderItem() {
    const imageProductsEl = document.createElement('div');
    imageProductsEl.classList.add();
    const imageProducts = imageProductsEl.createElement('img');
    imageProducts.setAttribute('src', '');
    imageProducts.classList.add();


    const titleEl = document.createElement('div');
    titleEl.classList.add();
    titleEl.textContent = title;


    const quantityAndPrice = document.createElement('div');
    quantityAndPrice.classList.add();

    const buttonMinus = quantityAndPrice.createElement('button');
    buttonMinus.classList.add();
    buttonMinus.textContent = '-';

    const quantityPrice = quantityAndPrice.createElement('div');
    quantityAndPrice.classList.add();
    quantityAndPrice.textContent = `${quantity} x ${price}`;

    const buttonPlus = quantityAndPrice.createElement('button');
    buttonPlus.classList.add();
    buttonPlus.textContent = '+';


    const RemoveFromOrder = document.createElement('div');
    RemoveFromOrder.classList.add();
    const buttonRemoveFromOrder = RemoveFromOrder.createElement('button');
    buttonRemoveFromOrder.classList.add();
    buttonRemoveFromOrder.textContent = 'Remove from order';



    const listItem = document.createElement('li');
    listItem.classList.add();
    listItem.append(imageProductsEl, titleEl, quantityAndPrice);

    return listItem;
  }

});