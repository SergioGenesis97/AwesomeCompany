$(document).ready(function(){
    $("form#CreateEmpl").on('submit', function(e) {

        e.preventDefault();

        var data = {};
        data.full_name = $('input[name=full_name]').val();
        data.birth_date = $('input[name=date_birth]').val();
        data.telephone = $('input[name=telephone]').val();
        data.email = $('input[name=email]').val(); 
        data.salary = $('input[name=salary]').val();
        data.marital_status = $('#marital_status').val();
        
        $.ajax({
            type: 'post',
            url: '/employee/save',
            data: data,
            dataType: 'text',
            success: () => {
                alert('Datos Gardados con éxito', data);
                window.location = '/employee/show';                            
            }
        });
    });
});