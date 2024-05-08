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

//Wishlist Sidebar
window.openWishlistSidebar = function(){
    var wishlistSidebar = document.getElementById("wishlist-sidebar");
    var backDrop = document.getElementById("back-drop");
    wishlistSidebar.classList.add('active');
    backDrop.classList.add('active');
};
window.closeWishlistSidebar = function(){
    var wishlistSidebar = document.getElementById("wishlist-sidebar");
    var backDrop = document.getElementById("back-drop");
    wishlistSidebar.classList.remove('active');
    backDrop.classList.remove('active');
};

//Add To Cart
function addToCart() {
    event.preventDefault();
  var formData = $('#addToCartForm').serialize();
  $.ajax({
    type: 'POST',
    url: contextPath + '/AddToCartServlet',
    data: formData,
    success: function (response) {
      alert(response);
      location.reload();
    },
  });
  return false;
}

//Add To Wishlist 
function addToWishlist(){
    event.preventDefault();
   var formData = $('#addToWishlistForm').serialize();
   console.log(formData)
   $.ajax({
       url: 'AddToWishlistServlet',
       type: 'POST',
       data: formData,
       success: function (response){
            alert(response);
            location.reload();
       }
   });
}

//Remove From Wishlist
function deleteWishlist(wishlistId){
    $.ajax({
        url: 'DeleteWishlistServlet',
        type: 'POST',
        data: {wishlistId: wishlistId},
        success: function(response){
            alert(response);
            location.reload();
            
        },
        error: function(){
            alert("Error Deleting item");
        }
    })
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
                        $('<img>').attr('src', 'assets/images/icons/close.png')
                    ).text('Remove').data('cart-id', item.cartId).click(function() {
                        removeCartItem(item.cartId);
                    });

                    var row = $('<tr>').addClass('cart-item').attr({id: 'cartItem_' + item.cartId, 'data-pro-id': item.productId });

                    var productDetailsColumn = $('<td>').append(
                        $('<div>').addClass('cart-product-details').append(
                            $('<img>').attr('src', 'assets/images/products/plate01.png').addClass('pro-img'),
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
//                alert('Error fetching cart items.');
            }
        });
    }
    
    
   // Display ContactInformation
   function fetchContactInformation() {
       $.ajax({
         url: 'ContactInformationServlet',
         type: 'GET',
         dataType: 'json',
         success: function (data) {
           if (data.length > 0) {
             var contactInfo = data[0];

             $('#fname').val(contactInfo.firstName);
             $('#lname').val(contactInfo.lastName);
             $('#email').val(contactInfo.email);
             $('#phone').val(contactInfo.phoneNo);
           }
         },
         error: function () {
//            alert('Error fetching contact information.');
         },
       });
  }
  
    //Display AddressInformation
    function fetchAddressInformation() {
        $.ajax({
          url: 'AddressInfoServlet',
          type: 'GET',
          dataType: 'json',
          success: function (data) {
            if (data.length > 0) {
              var addressInfo = data[0];

              $('#street').val(addressInfo.streetAddress);
              $('#city').val(addressInfo.city);
              $('#state').val(addressInfo.state);
              $('#postalCode').val(addressInfo.postalCode);
              $('#db-country').text(addressInfo.country);
            }
          },
          error: function () {
//            alert('Error fetching contact information.');
          },
        });
    }
    
    //Display OrderSummary
    function fetchOrderSummary() {
      $.ajax({
      url: 'OrderSummaryServlet',
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        var orderSummaryList = $('.order-summary-list');
        var sumSubtotal = 0;
        var shippingMethod = '';
        var total = 0;

        orderSummaryList.empty();

        $.each(data, function (index, item) {
          var product = $('<div>')
            .addClass('list-item')
            .append(
              $('<div>')
                .addClass('product')
                .append(
                  $('<img>')
                    .addClass('pro-img')
                    .attr('src', 'assets/images/products/plate01.png'),
                  $('<div>')
                    .addClass('details')
                    .append(
                      $('<h3>').text(item.productName),
                      $('<span>').text('Quantity: ' + item.quantity)
                    )
                ),
              $('<div>')
                .addClass('price')
                .css('display', 'none')
                .text('$' + item.productPrice.toFixed(2)),
              $('<div>')
                .addClass('sub-total')
                .text('$' + (item.productPrice * item.quantity).toFixed(2)),
              $('<input>').attr({
                type: 'hidden',
                class: 'order-id',
                id: 'order-id',
                value: item.orderId,
              })
            );

          orderSummaryList.append(product);

          sumSubtotal += item.productPrice * item.quantity;
          total = item.total;

          shippingMethod = item.shippingMethod;
        });

        // Add classes to shipping, subtotal, and total elements
        orderSummaryList.append(
          $('<div>')
            .addClass('shipping')
            .append(
              $('<span>').addClass('text').text('Shipping'),
              $('<span>').addClass('value').text(shippingMethod)
            ),
          $('<div>')
            .addClass('shipping')
            .append(
              $('<span>').addClass('text').text('SubTotal'),
              $('<span>')
                .addClass('value')
                .text('$' + sumSubtotal.toFixed(2))
            ),
          $('<div>')
            .addClass('total-cost')
            .append(
              $('<span>').addClass('text').text('Total'),
              $('<span>')
                .addClass('value')
                .text('$' + total.toFixed(2))
            )
        );
      },
      error: function () {
//        alert('Error fetching cart items.');
      },
    });
    }
    
    //Display Order
    function fetchOrderComplete() {
        $.ajax({
          url: 'OrderCompleteServlet',
          type: 'GET',
          dataType: 'json',
          success: function (data) {
            var orderCode = '';
            var orderedDate = '';
            var total;
            var paymentMethod = '';

            var orderedItems = $('.ordered-items');
            orderedItems.empty();

            $.each(data, function (index, item) {
              var orderedItem = $('<div>')
                .addClass('ordered-item')
                .append(
                  $('<span>').addClass('circle').text(item.quantity),
                  $('<img>').attr(
                    'src',
                    'assets/images/products/plate01.png'
                  )
                );
              orderedItems.append(orderedItem);

              orderCode = item.orderCode;
              orderedDate = item.orderedDate;
              total = item.total;
              paymentMethod = item.paymentMethod;
            });

            $('.order-details .details li:nth-child(1)').text(orderCode);
            $('.order-details .details li:nth-child(2)').text(orderedDate);
            $('.order-details .details li:nth-child(3)').text(
              '$' + total.toFixed(2)
            );
            $('.order-details .details li:nth-child(4)').text(paymentMethod);
          },
          error: function () {
//            alert('Error fetching order details.');
          },
        });
    }
    
    //Display CartTotal
    function fetchCartTotal(){
        $.ajax({
            url: 'GetCartTotalServlet',
            type: 'GET',
            dataType: 'json',
            success: function(data){
                $('#cart-total').text(data);
            }
        });
    }
    
    //Display Wishlist
    function fetchWishlist(){
        $.ajax({
            url: 'WishlistServlet',
            type: 'GET',
            dataType: 'json',
            success: function(products){
                $('#wishlist-container').empty();       
                products.forEach(function(product){
                    console.log(product);
                    var productHtml = '<a href="productDetails.jsp?proId='+ product.proId +'" style="width: 100%;">' +
                            '<div class="wishlist-item">'+
                            '<img src="assets/images/products/plate01.png"/>' +
                            '<div class="wishlist-details">'+
                            '<div class="details-top">'+
                            '<h4 style="margin-bottom: 1rem!important;">'+ product.proName +'</h4>'+
                            '<p>Rs.'+ product.price +'</p>'+
                            '</div>'+
                            '<div class="wishlist-actions">'+
                            '<form id="addToCartForm" method="POST">' +
                            '<input type="hidden" name="pro_id" value="' + product.proId +'" />'+
                            '<input type="hidden" name="quantity" value="1" />' +
                            '<input type="hidden" name="sub_total" value="' + product.price + '" />' +
                            '<button class="add-to-cart" onclick="addToCart()">Add To Cart</button>' +
                            '</form>'+
                            '<button onclick="deleteWishlist(' + product.wishlistId +')"><img src="assets/images/icons/close.png"/></button>'+
                            '</div>'+
                            '</div>'+
                            '</div>'+
                            '</a>' 
                            
                    $('#wishlist-container').append(productHtml);
                })
        
            }
        });
    }
    
    fetchCartItemsAndUpdateTotal();
    fetchContactInformation();
    fetchAddressInformation();
    fetchOrderSummary();
    fetchOrderComplete();
    fetchCartTotal();
    fetchWishlist();
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

//Send Cart Data
function sendData() {
  var total = $('.cart-sum-total .price').text().trim();
  var total = total.replace('$', '');
  var cartItems = [];
  var shipping = parseInt($('input[name=shipping-method]:checked').val());
  if (shipping === 15) {
    shippingMethod = 'Express Shipping';
  } else {
    shippingMethod = 'Free Shiping';
  }

  $('.cart-item').each(function () {
    var cartId = $(this).attr('id').split('_')[1];
    var proId = $(this).data('pro-id');
    var quantity = parseInt($('input[id^=quantity_]', this).val());

    cartItems.push({
      cartId: cartId,
      productId: proId,
      quantity: quantity,
    });
  });

  console.log(JSON.stringify(cartItems));
  $.ajax({
    url: 'CartDetailsServlet',
    type: 'POST',
    data: {
      total_price: total,
      cart_items: JSON.stringify(cartItems),
      shipping_method: shippingMethod,
    },
    success: function (response) {
      if (response.startsWith('Success')) {
        window.location.href = 'checkout.jsp';
      } else {
        console.error('Error in processing order:', response);
        alert('Error in processing order. Please try again later.');
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error('AJAX Error:', textStatus, errorThrown);
      alert('Error sending data. Please try again later.');
    },
  });
}

//Send CheckOut Data
function sendCheckoutData() {
  var firstName = $('#fname').val();
  var lastName = $('#lname').val();
  var email = $('#email').val();
  var phoneNo = $('#phone').val();
  var street = $('#street').val();
  var city = $('#city').val();
  var state = $('#state').val();
  var postalCode = $('#postalCode').val();
  var country = $('#country').val();
  var orderId = $('#order-id').val();
  var paymentMethod = $('input[name=payment-method]:checked').val();

  $.ajax({
    url: 'CheckoutDetailsServlet',
    type: 'POST',
    data: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNo: phoneNo,
      street: street,
      city: city,
      state: state,
      postalCode: postalCode,
      country: country,
      orderId: orderId,
      paymentMethod: paymentMethod,
    },
    success: function (response) {
      if (response.startsWith('Success')) {
        window.location.href = 'orderComplete.jsp';
      } else {
        console.error('Error in processing order:', response);
        alert('Error in processing order. Please try again later.');
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error('AJAX Error:', textStatus, errorThrown);
      alert('Error sending data. Please try again later.');
    },
  });
}

//Password Visibility
function togglePasswordVisibility() {
  event.preventDefault();
  var passwordInput = document.getElementById('passwordInput');
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
}

//Password Validation
function validatePassword(password) {
  if (password.length < 8) {
    return false;
  }
  if (!/[A-Z]/.test(password)) {
    return false;
  }
  if (!/\d/.test(password)) {
    return false;
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
    return false;
  }
  return true;
}


//Sign up
function signUp() {
  event.preventDefault();

  var firstName = $('#signup-fname').val();
  var lastName = $('#signup-lname').val();
  var email = $('#signup-email').val();
  var password = $('#passwordInput').val();
  var phoneNumber = $('#signup-pno').val();
  var agreement = $('#signup-terms').prop('checked');

  if (
    firstName.length === 0 ||
    lastName.length === 0 ||
    email.length === 0 ||
    password.length === 0 ||
    phoneNumber.length === 0 ||
    !agreement
  ) {
    alert('Please fill in all fields and agree to the terms.');
    return;
  }
  if (!validatePassword(password)) {
    alert(
      'Password must be at least 8 characters long and contain at least one uppercase letter, one digit, and one special character.'
    );
    return;
  }
  var formData = $('#signup-form').serialize();

  $.ajax({
    type: 'POST',
    url: contextPath + '/SignupServlet',
    data: formData,
    success: function (response) {
      alert(response);
      if (response === 'Successfully Registered') {
        window.location.href = 'index.jsp';
      }
    },
    error: function (xhr, status, error) {
//      alert('Error occurred: ' + error);
    },
  });
}


//Sign in
function signIn() {
  event.preventDefault();

  var email = $('#signin-email').val();
  var password = $('#passwordInput').val();

  if (email.length === 0 || password.length === 0) {
    alert('Please fill in all fields and agree to the terms.');
    return;
  }

  var formData = $('#signin-form').serialize();

  $.ajax({
    type: 'GET',
    url: contextPath + '/SigninServlet',
    data: formData,
    success: function (response) {
      if (response === 'Authentication successful as admin!') {
        window.location.href = 'admin';
      } else if (response === 'Authentication successful') {
        alert(response);
        window.location.href = 'index.jsp';
      } else {
        alert(response);
      }
    },
    error: function (xhr, status, error) {
      alert('Error occurred: ' + error);
    },
  });
}

//Sign out
function signOut() {
  $.ajax({
    type: 'GET',
    url: contextPath + '/SignoutServlet',
    success: function (response) {
      if (response === 'Sign out Succesfully') {
        window.location.href = 'signin.jsp';
      }
    },
    error: function (xhr, status, error) {
      alert('Error occurred: ' + error);
    },
  });
}


//Get Categories
$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "CategoriesServlet",
        success: function(categories){
            categories.forEach(function(category){
                $('.category-buttons').append('<button class="categoryBtn" data-category="' + category.catId + '">' + category.catName + '</button>');
            });
        }

    });
})

//Get Products
$(document).ready(function(){
    // Function to load all products when the page loads
    function loadAllProducts() {
        $.ajax({
            type: "POST",
            url: contextPath + "/ProductByCatServlet",
            data: { category: 0 }, 
            success: function(products){
                $('#productContainer').empty();
                products.forEach(function(product){
                    var productHTML = '<div class="col-md-4 product-card-wrapper">' +
                                        '<a href="productDetails.jsp?proId='+ product.proId +'" class="product-card">' +
                                        '<div class="product-box">' +
                                        '<img src="assets/images/products/plate01.png" class="product-img"/>' +
                                        '<h3>' + product.proName + '</h3>' +
                                        '<p>Rs.' + product.proPrice + '</p>' +
                                        '<form id="addToCartForm" method="POST">' +
                                        '<input type="hidden" name="pro_id" value="' + product.proId +'" />'+
                                        '<input type="hidden" name="quantity" value="1" />' +
                                        '<input type="hidden" name="sub_total" value="' + product.proPrice + '" />' +
                                        '<button class="button" onclick="addToCart()">Add To Cart</button>' +
                                        '</form>'+
                                        '<form id="addToWishlistForm" method="POST">' +
                                        '<input type="hidden" name="pro_id" value="' + product.proId +'" />'+
                                        '<input type="hidden" name="sub_total" value="' + product.proPrice + '" />' +
                                        '<button class="wishlistBtn" onclick="addToWishlist()"><img src="assets/images/icons/heart.png" /></button>' +
                                        '</form>'+
                                        '</div>' +
                                        '</a>' +
                                        '</div>';
                    $('#productContainer').append(productHTML);
                });
            }
        });
    }

    loadAllProducts();

    // Handle click event on category buttons
    $(document).on('click', '.categoryBtn', function(){
        var category = $(this).data('category');
        console.log(category)
        $.ajax({
            type: "POST",
            url: contextPath + "/ProductByCatServlet",
            data: { category: category },
            success: function(products){
                console.log(products)
                $('#productContainer').empty();
                products.forEach(function(product){
                    var productHTML = '<div class="col-md-4 product-card-wrapper">' +
                                        '<a href="#" class="product-card">' +
                                        '<div class="product-box">' +
                                        '<img src="assets/images/products/plate01.png" class="product-img"/>' +
                                        '<h3>' + product.proName + '</h3>' +
                                        '<p>Rs.' + product.proPrice + '</p>' +
                                        '<form id="addToCartForm" method="POST">' +
                                        '<input type="hidden" name="pro_id" value="' + product.proId +'" />'+
                                        '<input type="hidden" name="quantity" value="1" />' +
                                        '<input type="hidden" name="sub_total" value="' + product.proPrice + '" />' +
                                        '<button class="button" onclick="addToCart()">Add To Cart</button>' +
                                        '</form>'+
                                        '<form id="addToWishlistForm" method="POST">' +
                                        '<input type="hidden" name="pro_id" value="' + product.proId +'" />'+
                                        '<input type="hidden" name="sub_total" value="' + product.proPrice + '" />' +
                                        '<button class="wishlistBtn" onclick="addToWishlist()"><img src="assets/images/icons/heart.png" /></button>' +
                                        '</form>'+
                                        '</div>' +
                                        '</a>' +
                                        '</div>';
                    $('#productContainer').append(productHTML);
                });
            }
        });
    });
    
    
    //Get Latest Products
    function fetchLatestProducts(){
        $.ajax({
            url: 'GetLatestProductsServlet',
            type: 'GET',
            dataType: 'json',
            success: function(data){
                $('#latestProducts').empty();
                data.forEach(function(product){
                    var productHTML = '<div class="col-md-4 product-card-wrapper">' +
                                        '<a href="productDetails.jsp?proId='+ product.proId +'" class="product-card">' +
                                        '<div class="product-box">' +
                                        '<img src="assets/images/products/plate01.png" class="product-img"/>' +
                                        '<h3>' + product.proName + '</h3>' +
                                        '<p>Rs.' + product.proPrice + '</p>' +
                                        '<form id="addToCartForm" method="POST">' +
                                        '<input type="hidden" name="pro_id" value="' + product.proId +'" />'+
                                        '<input type="hidden" name="quantity" value="1" />' +
                                        '<input type="hidden" name="sub_total" value="' + product.proPrice + '" />' +
                                        '<button class="button" onclick="addToCart()">Add To Cart</button>' +
                                        '</form>'+
                                        '<form id="addToWishlistForm" method="POST">' +
                                        '<input type="hidden" name="pro_id" value="' + product.proId +'" />'+
                                        '<input type="hidden" name="sub_total" value="' + product.proPrice + '" />' +
                                        '<button class="wishlistBtn" onclick="addToWishlist()"><img src="assets/images/icons/heart.png" /></button>' +
                                        '</form>'+
                                        '</div>' +
                                        '</a>' +
                                        '</div>';
                    $('#latestProducts').append(productHTML);
                });
            }
        });
    }
    
    fetchLatestProducts();
    
});
 
 
 
 
 //Send Message
 function sendMessage(){
    event.preventDefault();
    var formData = $('#contactForm').serialize();
    
    $.ajax({
        url: "SendMessageServlet",
        type: "POST",
        data: formData,
        success: function(response){
            alert(response);
            location.reload();
        }
    });
 }