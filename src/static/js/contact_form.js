
$(document).ready(function() {

	 // captcha
    var reloadCaptcha = function(e) {
        e.preventDefault();
        var $form = $(this).closest('form'),
            id = $(this).data('captcha-id'),
            $captcha = false,
            $img = $form.find('img.captcha');

        if (id)
            $captcha = $form.find('#' + id);
        if (!$captcha.length)
            $captcha = $form.find('#id_captcha_0');

        $.post($(this).attr('datasrc'), {key: $captcha.val()}, function(data){
            $img.attr('src', data.image_url);
            $captcha.val(data.key);
        }, 'json');
    };
    $('body').on('click', '.js-captcha-reload', reloadCaptcha);

	$('body').on('submit', '.js-contact-form', function(e) {
    	$(".js-contact-form button").attr('disabled', true);
        var form = this,
        	$this = $(this);
		$.ajax({
            type: this.method || "GET",
            url: $this.data('url') || this.action,
            data: $this.serializeArray(),
		    //data:{status:status},
		    success: function(data) {
		    	$this.html(data.html);
		    },
		});
		$(".js-contact-form button").attr('disabled', false);
		return false;
    });
});