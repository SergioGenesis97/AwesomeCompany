$(document).ready(function(){
    $("form#CreateEmpl").on('submit', function(e) {

        e.preventDefault();

        var data = {};
        data.full_name = $('input[name=full_name]').val();
        data.birth_date = $('input[name=birth_date]').val();
        data.telephone = $('input[name=telephone]').val();
        data.email = $('input[name=email]').val(); 
        data.salary = $('#input[name=salary]').val();
        data.marital_status = $('input[name=marital_status]').val();
        
        $.ajax({
            type: 'post',
            url: '/employee/save',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: "application/json",
            success: () => {
                alert('Success', JSON.stringify(data));                               
            },
            error: (error) => {
                alert('ERROR AJAX: ', error);
            }
        });
    });
});