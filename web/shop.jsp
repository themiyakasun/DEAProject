<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        
        <!--CSS-->
        <link rel="stylesheet" type="text/css" href="assets/css/style.css">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" >
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        
    </head>
    <body>
        <%@include file="includes/shared/navbar.jsp" %>
        <%@include file="includes/shared/search.jsp" %>
        
        <header class="sub-header">
            <div class="container">
                <div class="hero-text">
                    <h1>Our Shop</h1>
                </div>
            </div>
        </header>
        
        <section class="shop-wrapper">
            <div class="container">
                <div class="d-flex">
                    <div class="product-sidebar">
                        <h3>Products Categories</h3>
                        <div class="category-buttons">
                            <button class="">All</button>
                            <button class="">Fruits</button>
                            <button class="">Fruits</button>
                        </div>
                    </div>

                    <div class="product-container">
                        <div class="row">
                            <div class="col-md-4 product-card-wrapper">
                                <a href="#" class="product-card">
                                    <div class="product-box">
                                        <img src="assets/images/products/plate01.png" class="product-img"/>
                                        <h3>Excellent food</h3>
                                        <p>Rs.100.00</p>
                                        <form id="addToCartForm" method="POST">
                                            <input type="hidden" name="pro_id" value="1" id="pro_id" />
                                            <input type="hidden" name="quantity" value="1" id="quantity" />
                                            <input type="hidden" name="sub_total" value="199.10" id="sub_total" />
                                            <button class="button" onclick="addToCart()">Add To Cart</button>
                                        </form>
                                    </div>
                                </a>
                            </div>
                            <div class="col-md-4 product-card-wrapper">
                                <a href="#" class="product-card">
                                    <div class="product-box">
                                        <img src="assets/images/products/plate01.png" class="product-img"/>
                                        <h3>Excellent food</h3>
                                        <p>Rs.100.00</p>
                                        <form id="addToCartForm" method="POST">
                                            <input type="hidden" name="pro_id" value="1" id="pro_id" />
                                            <input type="hidden" name="quantity" value="1" id="quantity" />
                                            <input type="hidden" name="sub_total" value="199.10" id="sub_total" />
                                            <button class="button" onclick="addToCart()">Add To Cart</button>
                                        </form>
                                    </div>
                                </a>
                            </div>
                            <div class="col-md-4 product-card-wrapper">
                                <a href="#" class="product-card">
                                    <div class="product-box">
                                        <img src="assets/images/products/plate01.png" class="product-img"/>
                                        <h3>Excellent food</h3>
                                        <p>Rs.100.00</p>
                                        <form id="addToCartForm" method="POST">
                                            <input type="hidden" name="pro_id" value="1" id="pro_id" />
                                            <input type="hidden" name="quantity" value="1" id="quantity" />
                                            <input type="hidden" name="sub_total" value="199.10" id="sub_total" />
                                            <button class="button" onclick="addToCart()">Add To Cart</button>
                                        </form>
                                    </div>
                                </a>
                            </div>
                            <div class="col-md-4 product-card-wrapper">
                                <a href="#" class="product-card">
                                    <div class="product-box">
                                        <img src="assets/images/products/plate01.png" class="product-img"/>
                                        <h3>Excellent food</h3>
                                        <p>Rs.100.00</p>
                                        <form id="addToCartForm" method="POST">
                                            <input type="hidden" name="pro_id" value="1" id="pro_id" />
                                            <input type="hidden" name="quantity" value="1" id="quantity" />
                                            <input type="hidden" name="sub_total" value="199.10" id="sub_total" />
                                            <button class="button" onclick="addToCart()">Add To Cart</button>
                                        </form>
                                    </div>
                                </a>
                            </div>
                            <div class="col-md-4 product-card-wrapper">
                                <a href="#" class="product-card">
                                    <div class="product-box">
                                        <img src="assets/images/products/plate01.png" class="product-img"/>
                                        <h3>Excellent food</h3>
                                        <p>Rs.100.00</p>
                                        <form id="addToCartForm" method="POST">
                                            <input type="hidden" name="pro_id" value="1" id="pro_id" />
                                            <input type="hidden" name="quantity" value="1" id="quantity" />
                                            <input type="hidden" name="sub_total" value="199.10" id="sub_total" />
                                            <button class="button" onclick="addToCart()">Add To Cart</button>
                                        </form>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    
        <script>
            var contextPath = "${pageContext.request.contextPath}";
        </script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        <script src="assets/js/index.js"></script>
    </body>
</html>
