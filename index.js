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

    cardBody.forEach(body => body.querySelector('button[type="button"]').addEventListener('click', addToCart));

    function addToCart(event) {
      const cardButton = event.target.parentElement;

      const price = cardButton.querySelector('.price');

      let el = price.textContent;

      let numEl = '';

      for (let i in el) {
        if (!isNaN(el[i])) {
          numEl += el[i];
        };
      };
    
      numEl = parseInt(numEl);

      yourCart.textContent = `Your cart - ${cartPrice + numEl}.00$`;

      cartPrice += numEl;
    };

    const orderList = document.querySelector('#orderList');

    cardBody.forEach(body => body.querySelector('button[type="button"]').addEventListener('click', addOrderItem));

    function addOrderItem(event) {
      const card = event.target.parentElement.parentElement;
      const imageProducts = card.querySelector('img');
      const imageProductsAttribute = imageProducts.getAttribute('src');

      const cardTitle = card.querySelector('.card-title');
      const title = cardTitle.textContent;

      const cardPrice = card.querySelector('.price');
      const cardPriceTextContent = cardPrice.textContent;

      const price = number(cardPriceTextContent);

      function number(cardPriceTextContent) {
        let numEl = '';

        for (let i in cardPriceTextContent) {
          if (!isNaN(cardPriceTextContent[i])) {
            numEl += cardPriceTextContent[i];
          };
        };
      
        numEl = parseInt(numEl);

        return numEl;
      };

      quantity = count();

      function count() {
        let clisk = 0;
        return clisk += 1;       
      };

      const orderItem = creatOrderItem(imageProductsAttribute, title, price, quantity);
      orderList.append(orderItem);
    };

    function creatOrderItem(imageProductsAttribute, title, price, quantity) {

      console.log(quantity);

      const imageProductsEl = document.createElement('div');
      imageProductsEl.classList.add('imageProductsEl');
      const imageProducts = document.createElement('img');
      imageProducts.setAttribute('src', imageProductsAttribute);
      imageProducts.classList.add('imageProducts');
      imageProductsEl.append(imageProducts);


      const titleEl = document.createElement('div');
      titleEl.classList.add('titleEl');
      titleEl.textContent = title;


      const quantityAndPrice = document.createElement('div');
      quantityAndPrice.classList.add('quantityAndPrice');

      const buttonMinus = document.createElement('button');
      buttonMinus.classList.add('buttonMinus','textWhite');
      buttonMinus.textContent = '-';
      if (quantity === 1) {
        buttonMinus.setAttribute('disabled', '');
        buttonMinus.classList.add('buttonDisabled');
      };
      buttonMinus.addEventListener('click', minusQuantity);


      const quantityPrice = document.createElement('div');
      quantityPrice.classList.add('quantityPrice');
      quantityPrice.textContent = `${quantity} x ${price}`;

      const buttonPlus = document.createElement('button');
      buttonPlus.classList.add('buttonPlus', 'textWhite');
      buttonPlus.textContent = '+';
      buttonPlus.addEventListener('click', plusQuantity);

      quantityAndPrice.append(buttonMinus, quantityPrice, buttonPlus);


      const removeFromOrder = document.createElement('div');
      removeFromOrder.classList.add('RemoveFromOrder');
      const buttonRemoveFromOrder = document.createElement('button');
      buttonRemoveFromOrder.classList.add('buttonRemoveFromOrder');
      buttonRemoveFromOrder.textContent = 'Remove from order';
      removeFromOrder.append(buttonRemoveFromOrder);
      buttonRemoveFromOrder.addEventListener('click', removeOrderItem);



      const listItem = document.createElement('li');
      listItem.classList.add('listItem');
      listItem.append(imageProductsEl, titleEl, quantityAndPrice, removeFromOrder);

      return listItem;
    };

    function minusQuantity(event) {
      if (quantity > 1) {
        quantity = quantity - 1;
      };
      console.log(quantity);
      return quantity;
    };

    function plusQuantity(event) {
      quantity = quantity + 1;
      console.log(quantity);
      return quantity;
    };

    function removeOrderItem (event) {
      const listItem = event.target.parentElement.parentElement;

      listItem.remove();
    };

});