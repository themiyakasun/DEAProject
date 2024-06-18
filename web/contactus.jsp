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
        
        <section class="contact-section">

            <div class="container">
                <h1 class="contact-header">
                    We believe in better than just serving delicious food, We believe in creating experiences that resonate with the soul
                </h1>
                <form class="contact-form" id="contactForm" method="POST">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="input-box">
                                <label>Full Name</label>
                                <input type="text" placeholder="Full Name" name="name" id="fname"/>
                            </div>
                            <div class="input-box mt-3">
                                <label>Email Address</label>
                                <input type="email" placeholder="Email Address" name="email" id="email"/>
                            </div>
                            <div class="input-box mt-3">
                                <label>Subject</label>
                                <input type="text" placeholder="Subject" name="subject" id="subject"/>
                            </div>
                            <div class="input-box mt-3">
                                <label>Message</label>
                                <textarea placeholder="Message" name="message" id="message"></textarea>
                            </div>
                            <button class="button mt-3" onclick="sendMessage()">Send Message</button>
            </div>
            

        </section>
                
        <%@include file="includes/shared/footer.jsp" %>
        
        <script>
            var contextPath = "${pageContext.request.contextPath}";
        </script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        <script src="assets/js/index.js"></script>
    </body>
</html>