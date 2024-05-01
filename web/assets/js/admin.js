//Add Category
function addCategory(){
    var formData = $("#categoryForm").serialize();
    $.ajax({
        type: "POST",
        url: contextPath + "/AddCategoryServlet",
        data: formData,
        success: function(response) {
            $("#loadingIndicator").hide();
            alert(response);
        }
    });
    return false;
}
