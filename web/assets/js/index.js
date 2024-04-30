//Mobile Nav Toggle
window.openMobileNav = function() {
    var mobileNav = document.getElementById("mobile-nav");
    mobileNav.classList.add("active");
};
window.closeMobileNav = function() {
    var mobileNav = document.getElementById("mobile-nav");
    mobileNav.classList.remove("active");
};

//Search Toggle
window.toggleSearch = function(){
    var searchWrapper = document.getElementById("search-wrapper");
    searchWrapper.classList.toggle("active");
};


//Profile DropDown
window.toggleProfileDropdown = function(){
    var profileDropdown = document.getElementById("profile-dropdown");
    profileDropdown.classList.toggle("active");
};

//Add To Cart
function addToCart() {
  var formData = $('#addToCartForm').serialize();
  $.ajax({
    type: 'POST',
    url: contextPath + '/AddToCartServlet',
    data: formData,
    success: function (response) {
      $('#loadingIndicator').hide();
      alert(response);
    },
  });
  return false;
}


//Get Shipping Value
window.getShipping = function(){
    var selectedValue = parseFloat($('input[name="shipping-method"]:checked').val());
    var totalString = $('.cart-sum-total .price').text();
    var totalNumeric = parseFloat(totalString.substring(1));
    var previousShippingString = $('.cart-sum-total .shipping').text().trim();
    var previousShipping = previousShippingString ? parseFloat(previousShippingString.substring(1)) : 0;
    var newTotal = totalNumeric - previousShipping + selectedValue;
    $('.cart-sum-total .price').text('$' + newTotal.toFixed(2));
    $('.cart-sum-total .shipping').text('$' + selectedValue.toFixed(2));
};

//Quantity
function minus(cartId) {
  var quantityInput = document.getElementById('quantity_' + cartId);
  if (quantityInput) {
    var currentValue = parseInt(quantityInput.value);
    if (currentValue === 1) {
      document.getElementById('minus-btn_' + cartId).disabled = true;
    }
    if (!isNaN(currentValue) && currentValue > 0) {
      quantityInput.value = currentValue - 1;
      updateSubtotal(cartId);
      updateCartTotal();
    }
  }
}

function add(cartId) {
  var quantityInput = document.getElementById('quantity_' + cartId);
  if (quantityInput) {
    var currentValue = parseInt(quantityInput.value);
    if (!isNaN(currentValue)) {
      quantityInput.value = currentValue + 1;
      updateSubtotal(cartId);
      updateCartTotal();
    }
  }
}

function updateSubtotal(cartId) {
  var quantity = parseInt(document.getElementById('quantity_' + cartId).value);
  var price = parseFloat(
    document
      .querySelector('#cartItem_' + cartId + ' .price')
      .innerText.replace('$', '')
  );
  var subtotal = quantity * price;
  document.querySelector('#cartItem_' + cartId + ' .sub-total').textContent =
    '$' + subtotal.toFixed(2);
}

function updateCartTotal() {
  var sumSubtotal = 0;
  $('.sub-total').each(function () {
    var subtotal = parseFloat($(this).text().replace('$', ''));
    sumSubtotal += subtotal;
  });
  var shippingCost = parseFloat(
    $('.cart-sum-total .shipping').text().trim().substring(1)
  );
  $('.cart-sum-sub-total .price').text('$' + sumSubtotal.toFixed(2));
  updateCartWithShippingTotal(sumSubtotal + shippingCost);
}

function updateCartWithShippingTotal(subTotal) {
  $('.cart-sum-total .price').text('$' + subTotal.toFixed(2));
}


 $(document).ready(function() {
    //Display Cart Items
    function fetchCartItemsAndUpdateTotal() {
        $.ajax({
            url: contextPath + '/CartServlet',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                var tbody = $('.cart-table tbody');
                var sumSubtotal = 0; 
                $.each(data, function(index, item) {
                    var minusButton = $('<button>').addClass('minus-btn').attr({id:'minus-btn_' + item.cartId, 'data-cart-id': item.cartId}).append(
                        $('<img>').attr('src', 'assets/images/icons/minus.png')
                    ).click(function() {
                        var cartId = $(this).attr('data-cart-id');
                        minus(cartId);
                    }).prop('disabled', false);

                    var addButton = $('<button>').addClass('add-btn').attr({id:'add-btn', 'data-cart-id': item.cartId}).append(
                        $('<img>').attr('src', 'assets/images/icons/add.png')
                    ).click(function() {
                        var cartId = $(this).attr('data-cart-id');
                        add(cartId);
                    });

                    var removeButton = $('<button>').addClass('remove-btn').append(
                        $('<img>').attr('src', 'assets/icons/close.png')
                    ).text('Remove').data('cart-id', item.cartId).click(function() {
                        removeCartItem(item.cartId);
                    });

                    var row = $('<tr>').addClass('cart-item').attr({id: 'cartItem_' + item.cartId, 'data-pro-id': item.productId });

                    var productDetailsColumn = $('<td>').append(
                        $('<div>').addClass('cart-product-details').append(
                            $('<img>').attr('src', contextPath + '/uploads/' + item.productImage).addClass('pro-img'),
                            $('<div>').addClass('pro-details').append(
                                $('<h3>').text(item.productName),
                                $('<span>').text('Color: Black'),
                                removeButton
                            )
                        )
                    );

                    var quantityColumn = $('<td>').append(
                        $('<div>').addClass('cart-product-element').append(
                            $('<div>').addClass('quantity-wrapper').append(
                                minusButton,
                                $('<input>').attr({
                                    type: 'text',
                                    value: item.quantity,
                                    id: 'quantity_' + item.cartId
                                }),
                                addButton
                            )
                        )
                    );

                    var priceColumn = $('<td>').append(
                        $('<div>').addClass('cart-product-element').append(
                            $('<div>').addClass('price').text('$' + item.price)
                        )
                    );

                    var subtotal = item.quantity * item.price;
                    var subtotalColumn = $('<td>').append(
                        $('<div>').addClass('cart-product-element').append(
                            $('<div>').addClass('sub-total').attr({id: 'subtotal_' + item.cartId}).text('$' + subtotal.toFixed(2))
                        )
                    );

                    sumSubtotal += subtotal;
                    row.append(productDetailsColumn, quantityColumn, priceColumn, subtotalColumn);
                    tbody.append(row);

                });
                
                $('.cart-sum-sub-total .price').text('$' + sumSubtotal.toFixed(2));
                $('.cart-sum-total .price').text('$' + sumSubtotal.toFixed(2));
                
            },
            error: function() {
                alert('Error fetching cart items.');
            }
        });
    }
    
    fetchCartItemsAndUpdateTotal();   
 });
 
 
 //Change Payment Method 
 function showPaymentInfo(paymentMethod) {
  var cardInfo = document.getElementById('card-info');
  var paypalInfo = document.getElementById('paypal-info');

  if (paymentMethod === 'credit-card') {
    cardInfo.style.display = 'block';
    paypalInfo.style.display = 'none';
  } else if (paymentMethod === 'paypal') {
    cardInfo.style.display = 'none';
    paypalInfo.style.display = 'block';
  }
}