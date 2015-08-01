var serverURL = "http://localhost:8080";

$(document).ready(function(){
  $.ajax({
    url: serverURL + '/orders'
  }).done(function(orders){
    console.log(orders);
  });

  $('.product-find').on('submit', function(e){
    e.preventDefault();
    var productId = $('#product_id').val();
    $.ajax({
      type: 'GET',
      cache: false,
      url: serverURL + '/products/' + productId
    }).done(function(product){
      generateProductTemplate(product);
    }).error(function(){
      console.log('Product does not exist');
    });
  });

  $('.order-find').on('submit', function(e){
    e.preventDefault();
    var orderId = $('#order_id').val();
    $.ajax({
      type: 'GET',
      cache: false,
      url: serverURL + '/orders/' + orderId
    }).done(function(order){
      generateOrderTemplate(order);
    }).error(function(error){
      console.log(error);
    });
  });
});

function generateProductTemplate(product){
  $('.product-results').empty();
  $('.product-results').append('<div class="product-data"></div>')
    .append('<div class="product-name">'+product.name+'</div>')
    .append('<div class="product-description">'+product.description+'</div>')
    .append('<div class="product-price">'+product.price+'</div>');
}

function generateOrderTemplate(order){
  console.log(order);
  $('.order-results').empty();
  $('.order-results').append('<div class="order-data"></div>')
    .append('<div class="order-name">'+order.name+'</div>')
    .append('<div class="order-quantity">'+'Quantity: '+order.quantity+'</div>')
    .append('<div class="order-product-id">'+'Product: '+order[product].name+'</div>');
}