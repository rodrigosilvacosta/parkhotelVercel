$(document).ready(function () {

    $("#form-msg").submit(function(e)
    {
        e.preventDefault();
        var postData = $(this).serializeArray();
        var formURL = $(this).attr("action");
        var id= "#form-msg";
        $.ajax(
        {
            url : formURL,
            type: "POST",
            data : postData,
            dataType: "json",
            beforeSend: function (xhr) {
                $('#form-msg button').html('<i class="fa fa-spinner fa-pulse fa-fw"></i>&nbsp;Enviando');
                $('#form-msg button').prop('disabled', true);
                
            },
            success:function(data, textStatus, jqXHR) 
            {
                $('#form-msg select').removeClass('focus-erro');
                $('#form-msg input').removeClass('focus-erro');
                if(data.erro===false)
                {
                    $('#resp-form').removeClass('erro');
                    $('#resp-form .modal-title').html('Parabéns!');
                    $('#resp-form-msg').html(data.msg);

                    $(':input','#form-msg')
                        .not(':button, :submit, :reset, :hidden')
                        .val('')
                        .removeAttr('checked')
                        .removeAttr('selected');
                    $('#form-msg')[0].reset();
                    
                }
                else
                {
                    $('#resp-form').addClass('erro');
                    $('#resp-form .modal-title').html('Atenção!');
                    $('#resp-form-msg').html(data.msg);
                    
                    // é um
                    $('#form-msg [name="'+data.field+'"]').addClass('focus-erro');
                    
                }
                
                $('#resp-form').modal('show');
                
                $('#form-msg button').html('Enviar');
                $('#form-msg button').prop('disabled', false);
                
            },
            error: function(jqXHR, textStatus, errorThrown) 
            {
                //if fails      
            }
        });

    });       
});