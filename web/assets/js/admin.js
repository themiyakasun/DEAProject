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

//Delete Category
function deleteCategory(catId){
    $.ajax({
        url: contextPath + '/DeleteServlet',
        type: 'POST',
        data: {catId: catId},
        success: function(response){
            alert(response);
            location.reload();
            
        },
        error: function(){
            alert("Error Deleting category");
        }
    })
}

$(document).ready(function() {
    //Display Categories
    function fetchCategories() {
        $.ajax({
        url: contextPath + '/CategoriesServlet',
        type: 'GET',
        dataType: 'json',
        success: function(categories) {
            var tbody = $('#categoriesTableBody');
            var dropdown = $('#pro_cat');
            tbody.empty(); 
            
            if (categories.length === 0) {
                tbody.append('<tr><td colspan="5" class="text-center">No categories available</td></tr>');
            } else {
                $.each(categories, function(index, category) {
                    var row = $('<tr>').addClass('category-row').attr('data-cat-id', category.catId);
                    row.append($('<td>').addClass('cat-id').text(category.catId));
                    row.append($('<td>').addClass('cat-name').text(category.catName));
                    row.append($('<td>').addClass('cat-slug').text(category.catSlug));
                    row.append($('<td>').addClass('cat-order').text(category.catOrder));
                    row.append($('<td>').addClass('action').html(
                        '<div class="d-flex align-items-center gap-3 fs-6">' +
                        '<button class="text-warning edit-info" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit info" aria-label="Edit" onclick="editCategory(' + category.catId + ')"><img src="../assets/images/icons/edit.png"/></button>' +
                        '<button class="text-danger delete-category" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete" aria-label="Delete" onclick="deleteCategory(' + category.catId + ')"><img src="../assets/images/icons/trash.png"/></button>' +
                        '</div>'
                    ));
                    tbody.append(row);
                    
                    dropdown.append($('<option>').text(category.catName).val(category.catId));
                });
            }
        },
        error: function() {
            alert('Error fetching categories.');
        }
        });
    }
    
    fetchCategories();
});