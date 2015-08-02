var serverURL = "http://localhost:8080";

$(document).ready(function(){
  var productCache = {};
  var orderCache = {};

  $.ajax({
    url: serverURL + '/products'
  }).done(function(products){
    createProductDropdown(products);
  });

  $('#product_id').on('click', 'li', function(e){
    e.preventDefault();
    var orderId = $('#order_id').val();
    var dt = new Date();
    var time = dt.toDateString() + " " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
    $.ajax({
      type: 'GET',
      cache: false,
      url: serverURL + '/products/' + $(this)["context"]["id"]
    }).done(function(product){
      $('.product-results').empty();
      generateProductTemplate(product);
      productCache[product.id] = product;
      $('.product-search-log').append('<li id =' + product.id + '>' + product.name + '</li>'+ '<p>' + time + '</p>');
    }).error(function(){
      console.log('Product does not exist');
    });
  });

  $('#all-products').on('click', function(e){
    e.preventDefault();
    $.ajax({
      type: 'GET',
      cache: false,
      url: serverURL + '/products'
    }).done(function(products){
      $('.product-results').empty();
      for (var i = 0; i < products.length; i++) {
        generateProductTemplate(products[i]);
      }
    });
  });

  $('.order-find').on('submit', function(e){
    e.preventDefault();
    var orderId = $('#order-id').val();
    var dt = new Date();
    var time = dt.toDateString() + " " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
    $.ajax({
      type: 'GET',
      cache: false,
      url: serverURL + '/orders/' + orderId
    }).done(function(order){
      $('.order-results').empty();
      generateOrderTemplate(order);
      orderCache[order.id] = order;
      $('.order-search-log').append('<li id =' + order.id + '>' + order.name + ', ' + order.quantity+ ' ' + returnPlural(order["Product"]["name"]) + '</li>'+ '<p>' + time + '</p>');
    }).error(function(error){
      console.log(error);
    });
  });

  $(document).foundation({
    dropdown: {
      // specify the class used for active dropdowns
      active_class: 'open'
    }
  });

});


function createProductDropdown(products){
  for(var i = 0; i < products.length; i++){
    $('#product_id').append('<li id =' + products[i].id + '><a href="#">' + products[i].name + '</a></li>');
  }
}

function displayValidOrders(orders){
  $('.order-find').append('<div class="all-orders"></div>');
}

function generateProductTemplate(product){
  $('.product-results').append('<div class="product-data"></div>')
    .append('<div class="product-name">'+product.name+'</div>')
    .append('<div class="product-description">'+product.description+'</div>')
    .append('<div class="product-price"> $'+product.price+'</div>');
}

function generateOrderTemplate(order){
  $('.order-results').append('<div class="order-data"></div>')
    .append('<div class="order">'+order.name+' ordered '+order.quantity+' '+ returnPlural(order["Product"]["name"])+ '.</div>');
}

function returnPlural(word){
  if (word[word.length - 1] !== 's'){
    word = word + 's';
  }
  return word;
}