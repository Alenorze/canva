
function deleteCookie(name) {
  setCookie(name, null, {
    expires: -1,
  })
}
function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

function clearTwilioStr(str){
	return str
		.replace(/[^\w\d\s.]/g, '')
		.replace(/\d+m/g, '')
		.replace(/\n+/g, '\n')
		.split('\n')[6];
}
/*==========================================================================*/
/**************************** ФОРМА КОНТАКТОВ *******************************/
/*==========================================================================*/
$().ready(function() {
    var form = $("#contact-form");

    $('body').on('submit', '#contact-form', function(e) {
        $("#contact-form-send").attr('disabled', true);
        var form = this,
          $this = $(this);
        $.ajax({
          type: this.method || "GET",
          url: $this.data('url') || this.action,
          data: $this.serializeArray(),
          success: function(data) {
              $this.html(data.html);
              $('.thanks').css('display', 'block');
          },
          error: function(xhr) {
              console.log('d"oh');
          }
        });
    $("#contact-form-send").attr('disabled', false);
    return false;
    });
});
/*==========================================================================*/
/*=============== NAVBAR ON SCROLL =========================================*/
/*==========================================================================*/
var width = $(window).width();
if (parseFloat(width) >= 768) {
  var scrollStart = 1;
} else {
  var scrollStart = 1;
};

$(window).scroll(function(){
  var scroll = $(window).scrollTop();

  if (scroll > scrollStart && window.pageYOffset > scrollStart) {
    $('.navbar').addClass('navbar-compact');
  } else {
    $('.navbar').removeClass('navbar-compact');
  };
});
/*==========================================================================*/
/*================ CAROUSEL ================================================*/
/*==========================================================================*/
$(document).ready(function() {
  var owl = $("#slider-slide");
  var touchDrag = $('#slider-slide').data('itemsLength') > 1;

  owl.owlCarousel({
    nav: true,
    dots: true,
    loop: touchDrag,
    touchDrag: touchDrag,
    mouseDrag: false,
    items: 1,
    navText: ['<i class="fas fa-arrow-left"></i>','<i class="fas fa-arrow-right"></i>'],
  });
});
/*==========================================================================*/
/*======= PREVENT DROPDOWN CLOSE ON CLICK ITSELF ===========================*/
/*==========================================================================*/
$(document).on('click', '.dropdown-menu', function (e) {
  e.stopPropagation();
});
/*==========================================================================*/
/*========= TENDER FORM ====================================================*/
/*==========================================================================*/
// $('.js-tender-modal').on('hide.bs.modal', function (e) {
//   $('.js-tender-modal .js-tender-form')[0].reset();
// });

function activateFormHeaders(index) {
  var items = $('.js-tender-form-header-item');
  for (var i = 0; i <= items.length; i++) {
    var current_item = items[i];
    if (i <= index) {
      $(current_item).addClass('active');
    } else {
      $(current_item).removeClass('active');
    }
  };
};

function clearModal(){
	$('.js-tender-modal-container .js-tender-modal').off('hide.bs.modal');
	$('.js-tender-modal-container .js-tender-modal').on('hide.bs.modal', function (e) {
		$('.js-tender-modal').remove();
	});
}

$('body').on('click', '.js-tender-section_clear_btn', function(event) {
  event.preventDefault();
  $(this).parent().find('input:text, textarea').val('');
  $(this).parent().find('input:radio, input:checkbox').prop('checked', false);
});

$('body').on('click', '.js-tender-form_clear_btn', function(event) {
  event.preventDefault();
  $('.js-tender-form').find('input:text').not('#js-location').val('');
  $('.js-tender-form').find('input:radio, input:checkbox').prop('checked', false);
  $(this).siblings('.js-tender-form-result').find('.js-item-remove').remove();
  if ($('.js-tender-form-result').is(':empty')) {
    $('.js-tender-form-result').html('<span>Not provided</span>');
  }
});

$('body').on('click', '.js-full-tender-btn', function(event) {
  event.preventDefault();
  var sections = $('.js-tender-form-section');
  var index = 0;

  sections.hide();
  $(sections[index]).show();
  activateFormHeaders(index);
  $('.js-tender-modal').modal('show')
});

$('body').on('click', '.js-fast-tender-btn', function(event) {
  event.preventDefault();
  var sections = $('.js-tender-form-section');
  var comment_index = sections.length - 2;

  sections.hide();
  $(sections[comment_index]).show();
  activateFormHeaders(comment_index);
  $('.js-tender-modal').modal('show')
});

$('body').off('click', '.js-tender-open');

$('body').on('click', '.js-tender-open', function(event){
	$('.js-tender-modal').remove();
	$('.js-tender-modal-container').html('');
	var t = $(this), slow = !t.is('.js-fast-tender-open'),
		modal = t.closest('.modal');
	event.preventDefault();
	t.closest('.modal-body').html(window.spin);
	$.get(t.data('url'), function(data){
		$('.js-tender-modal-container').html(data);
		var sections = $('.js-tender-form-section');
		if(slow){
			var index = 0;
	
			sections.hide();
			$(sections[index]).show();
			activateFormHeaders(index);
		}else{
			var comment_index = sections.length - 2;

			sections.hide();
			$(sections[comment_index]).show();
			activateFormHeaders(comment_index);
		}
		modal.modal('hide');
		setTimeout(function(){
			clearModal();
			$('.tender-modal-1 .form-check label').each(function(){
				$(this).addClass('value-'+$(this).find('input').val());
			});
			$('.js-tender-modal').modal('show');
			setTimeout(function(){
				$('.js-tender-modal').modalCenter();
				initAutocomplete(['js-location-tender', 'js-tender-latitude', 'js-tender-longitude']);
			}, 200);
		}, 500);
	});
});

$('body').on('click', '.js-tender-form-header-item', function(event) {
  event.preventDefault();
  var header_items = $('.js-tender-form-header-item');
  var sections = $('.js-tender-form-section');

  var target_item = $(event.target);
  if (target_item.attr('class') == 'fa fa-caret-right') {
    target_item = target_item.parent();
  };
  var target_index = header_items.index(target_item);

  sections.hide();
  $(sections[target_index]).show();
  activateFormHeaders(target_index);
});

$(document).on('click', '.js-tender-form-next-btn', function(e) {
  var sections = $('.js-tender-form-section');
  var current_section = $('.js-tender-form-section:visible');
  var next_section = current_section.next('.js-tender-form-section');
  var current_index = sections.index(current_section);
  var next_index = sections.index(next_section);
  var data = $('.js-tender-form').serialize();
  var action = $('.js-tender-form').attr('action');
  var loc = $('.js-tender-form [name=location]');

  if (current_index == (sections.length - 1)) {
    if(loc.val().replace(/^\s+/gi, '').replace(/\s+$/gi, '') == ''){
        loc.addClass('is-invalid').focus();
    }else{
        $(this).prop('disabled', true);
        //$('.js-tender-form').submit();
        $('.js-tender-modal .modal-body').html('<div class="text-center">'+window.spin+'</div>');
        $.ajax({
            type:'POST',
            dataType:'json',
            data:data,
            url:action,
            success:function(j){
                if(j['status'])
                    location = j['url'];
                else{
                    $('.js-tender-modal').modal('hide');
                    setTimeout(function(){
                        loadModal(j['url'], true);
                    }, 500);
                }
            }
        });
    }
  } else if (current_index == (sections.length - 2)) {
    var form = $('.js-tender-form');
    // var inputs = form.find('input:not([name="location"]), textarea');
    var result_container = $('.js-tender-form-result');

    if (!result_container.is(':empty')) {
      result_container.empty();
    };

    for (var i = 0; i < sections.length; i++) {
      var inputs = $(sections[i]).find('input:not([name="location"]), textarea');

      if ($(sections[i]).find('.js-multi-question').length
            && $(sections[i]).find('input:checked').length) {

        var multi_question = $(sections[i]).find('.js-multi-question').text();
        var checked_multi_inputs = $(sections[i]).find('input:checked');
        var multi_answers = '';

        for (var x = 0; x < checked_multi_inputs.length; x++) {
          var answer = $(checked_multi_inputs[x]).parent().text();
          multi_answers = multi_answers + answer;

          if (x < (checked_multi_inputs.length - 1)) {
            multi_answers = multi_answers + ', '
          };
        }

        result_container.append(
          "<li class='js-item-remove'><span>" + $.trim(multi_question) + ":</span><em>" + multi_answers + "</em></li>"
        );
      } else {
        for (var y = 0; y < inputs.length; y++) {
          var current_input = inputs[y];
          if (current_input.type == 'radio' && $(current_input).is(':checked')) {
            var text = $(current_input).parent().text();
            var name = current_input.name.split('__')[0]
            result_container.append(
              "<li class='js-item-remove'><span>" + $.trim(name) + ":</span> <em>" + text + "</em></li>"
            );
          } else if ($(current_input).is('textarea') && $.trim($(current_input).val())) {
            var name = 'Comment';
            result_container.append(
              "<li><span>" + $.trim(name) + ":</span> <em>" + $(current_input).val() + "</em></li>"
            );
          } else if (current_input.type == 'text' && $.trim($(current_input).val())) {
            var name = current_input.name.split('__')[0]
            result_container.append(
              "<li class='js-item-remove'><span>" + $.trim(name) + ":</span> " + $(current_input).val() + "</li>"
            );
          } else if (current_input.type == 'checkbox' && $(current_input).is(':checked')) {
            var text = $(current_input).parent().text();
            result_container.append(
              "<li class='js-item-remove'><span>" + $.trim(text) + ":</span> <em>" + 'Yes' + "</em></li>"
            );
          };
        };
      }
    }

    if (result_container.is(':empty')) {
      result_container.html(
      "<li>Not provided</li>"
      );
    };

    current_section.hide();
    next_section.show();
    initAutocomplete();
  } else {
    current_section.hide();
    next_section.show();
    activateFormHeaders(next_index);
  };
});

$(document).on('click', '.js-tender-form-prev-btn', function(e) {
  var sections = $('.js-tender-form-section');
  var current_section = $('.js-tender-form-section:visible');
  var prev_section = current_section.prev('.js-tender-form-section');
  var prev_index = sections.index(prev_section);

  if (sections.index(current_section) > 0) {
    current_section.hide();
    prev_section.show();
    activateFormHeaders(prev_index);
  };
});
/*==========================================================================*/
/*========= TENDER RESUBMIT ================================================*/
/*==========================================================================*/
$('body').on('click', '.js-resubmit-tender-btn', function(event) {
  event.preventDefault();
  $.ajax({
    type: "GET",
    url: $(this).data('href'),

    success: function(data) {
        var modal = data.html;
        $('#js-modal-lg #js-modal-lg-label').text('Change request');
        $(modal).modal('show');
        initAutocomplete();
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});

$(document).on('hidden.bs.modal','.js-tender-resubmit-modal', function () {
  $('.js-tender-resubmit-modal').remove();
});
/*==========================================================================*/
/*========= GOOGLE LOCATION ================================================*/
/*==========================================================================*/
var autocomplete2;
function initAutocompleteAlt(ids2) {
	if(!ids2)
		ids2 = ['js-location2', 'js-latitude', 'js-longitude'];
	var types = 'geocode';
	
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  if (document.getElementById(ids2[0])) {
    autocomplete2 = new google.maps.places.Autocomplete(
      /* @type {!HTMLInputElement} */(document.getElementById(ids2[0])),
                                      {types: [types]});

    autocomplete2.setComponentRestrictions(
      {'country': ['us', 'pr', 'vi', 'gu', 'mp']}
    );

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete2.addListener('place_changed', fillInAddressAlt);
    var frm = $('.location-right form').eq(1).detach();
    if(frm.length > 0)
        $('footer form').replaceWith(frm);
  };

  function fillInAddressAlt() {
    // Get the place details from the autocomplete object.
    var place = autocomplete2.getPlace();

    var cur_value = $('#' + ids2[0]).val();
    $('#' + ids2[0]).val(cur_value.replace(', USA', ''));

    var lat = place.geometry.location.lat();
    var lon = place.geometry.location.lng();
    deleteCookie('location-latitude');
    deleteCookie('location-longitude');
    setCookie('location-latitude', lat, { expires: 60 * 60 * 24 * 30 , path: '/'});
    setCookie('location-longitude', lon, { expires: 60 * 60 * 24 * 30 , path: '/'});
    document.getElementById(ids2[1]).value = lat;
    document.getElementById(ids2[2]).value = lon;
  }
}


var autocomplete;
function initAutocomplete(ids) {
	if(!ids)
		ids = ['js-location', 'id_latitude', 'id_longitude'];
	var types = 'geocode';
	if($('.js-tender-form tender-form').length)
		types = '(cities)';
  // Create the autocomplete object, restricting the search to geographical
  // location types.
	//alert(document.getElementById(ids[0]))
  if (document.getElementById(ids[0])) {
    autocomplete = new google.maps.places.Autocomplete(
      /* @type {!HTMLInputElement} */(document.getElementById(ids[0])),
                                      {types: [types]});

    autocomplete.setComponentRestrictions(
      {'country': ['us', 'pr', 'vi', 'gu', 'mp']}
    );

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
    if($('#js-location2').length)
		initAutocompleteAlt()
  };

  function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();

    var cur_value = $('#' + ids[0]).val();
    $('#' + ids[0]).val(cur_value.replace(', USA', ''));

    var lat = place.geometry.location.lat();
    var lon = place.geometry.location.lng();
    deleteCookie('location-latitude');
    deleteCookie('location-longitude');
    setCookie('location-latitude', lat, { expires: 60 * 60 * 24 * 30 , path: '/'});
    setCookie('location-longitude', lon, { expires: 60 * 60 * 24 * 30 , path: '/'});
    document.getElementById(ids[1]).value = lat;
    document.getElementById(ids[2]).value = lon;
  }
}

/*==========================================================================*/
/*==========================================================================*/
/*==========================================================================*/
$(function(){
	if(typeof $.fn.inputmask != 'undefined')
		$("input[name*=phone]").inputmask({"mask": "(999) 999-9999"});
	$('.blue-line').click(function(){
		$(this).find('a')[0].click();
	});
})
/*==========================================================================*/
/*============= DISPLAY TENDER DETAILS =====================================*/
/*==========================================================================*/
$('body').on('click', '.js-tender-detail-btn', function(event) {
  event.preventDefault();
  var item = $(this).closest('.profi-tender-item');
  $.ajax({
    type: "GET",
    url: this.href,

    success: function(data) {
        $('#js-modal-lg .modal-body').html(data.html);
        $('#js-modal-lg #js-modal-lg-label').html('<div style="">Request information</div>');
        $('#js-modal-lg').modal('show')
        item.find('.request-badge').removeClass('bg-green').addClass('bg-text-light');
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});
/*==========================================================================*/
/*=========== ADD TASK =====================================================*/
/*==========================================================================*/
$('body').on('click', '.js-add-task-btn', function(event) {
  event.preventDefault();
  $.ajax({
    type: "GET",
    url: this.href || $(this).data('href'),

    success: function(data) {
        $('#js-modal-lg .modal-body').html(data.html);
        dt_picker_init();
        $('#js-modal-lg #js-modal-lg-label').text('Add task');
        $('#js-modal-lg').modal('show')
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});

$('body').on('submit', '.js-task-add-form', function(event) {
  event.preventDefault();
  $('.js-task-add-form button[type="submit"]').prop('disabled', true)

  $.ajax({
    type: this.method,
    url: this.action,
    data: $(this).serializeArray(),

    success: function(data) {
        $('#js-modal-lg .modal-body').html(data.html);
        dt_picker_init();
        $('.js-task-add-form button[type="submit"]').prop('disabled', false);

    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});
/*==========================================================================*/
/*=========== DELETE TASK ==================================================*/
/*==========================================================================*/
$('body').on('click', '.js-task-delete-btn', function(event) {
  event.preventDefault();
  $.ajax({
    type: "GET",
    url: this.href,

    success: function(data) {
        $('#js-modal .modal-body').html(data.html);
        $('#js-modal #js-modal-label').text('Delete task from calendar');
        $('#js-modal').modal('show')
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});

$('body').on('submit', '.js-task-delete-form', function(event) {
  event.preventDefault();
  $('.js-task-delete-form button[type="submit"]').prop('disabled', true);

  $.ajax({
    type: this.method,
    url: this.action,

    success: function(data) {
        $('#js-modal .modal-body').html(data.html);
        $('.js-task-delete-form button[type="submit"]').prop('disabled', false);
        $('#js-task-' + data.obj_id).remove();
        if (!$('div[id*="js-task-"').length) {
          $('.js-tasks-container').html(
            "<div>No tasks for today.</div>"
          )
        };

    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});
/*==========================================================================*/
/*============== CANCEL TENDER =============================================*/
/*==========================================================================*/
$('body').on('click', '.js-cancel-tender-btn', function(event) {
  event.preventDefault();
  $.ajax({
    type: "GET",
    url: $(this).data('href'),

    success: function(data) {
        $('#js-modal .modal-body').html(data.html);
        $('#js-modal #js-modal-label').text('Cancel request');
        $('#js-modal').modal('show');
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});

$('body').on('submit', '.js-cancel-tender-form', function(event) {
  event.preventDefault();
  $('.js-cancel-tender-form button[type="submit"]').prop('disabled', true);

  $.ajax({
    type: this.method,
    url: this.action,
    data: $(this).serializeArray(),

    success: function(data) {
        $('#js-modal .modal-body').html(data.html);
        $('.js-cancel-tender-form button[type="submit"]').prop('disabled', false);
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});
/*==========================================================================*/
/*========= CREATE TENDER BID ==============================================*/
/*==========================================================================*/
$('body').on('click', '.js-tender-reply-btn', function(event) {
  event.preventDefault();
  $.ajax({
    type: "GET",
    url: this.href,

    success: function(data) {
        $('#js-modal-lg').modal('hide');
        $('#js-modal .modal-body').html(data.html);
        $('#js-modal #js-modal-label').text('Send reply to client');
        $('#js-modal').modal('show');
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});

$('body').on('submit', '.js-tender-reply-form', function(event) {
  event.preventDefault();
  $('.js-tender-reply-form button[type="submit"]').prop('disabled', true);
  var tid = $(this).find('#id_tender_id').val(),
  	tnew = $('.js-tenders-new-count'),
  	tanswered = $('.js-tenders-answered-count');

  $.ajax({
    type: this.method,
    url: this.action,
    data: $(this).serializeArray(),

    success: function(data) {
        $('#js-modal .modal-body').html(data.html);
        $('.js-tender-reply-form button[type="submit"]').prop('disabled', false);

        if (data.obj_id) {
          $('.js-profi-tender-item-' + data.obj_id + ' .js-tender-reply-btn').replaceWith(
            '<span>Your reply was sent</span>'
          );
          var count = $('.js-profi-tender-item-' + data.obj_id + ' .js-count').text()
          count = parseInt(count) + 1;
          $('.js-profi-tender-item-' + data.obj_id + ' .js-count').text(count);
          $('.js-profi-tender-item-'+tid).remove();
          tnew.text(parseInt(tnew.text()) - 1);
          tanswered.text(parseInt(tanswered.text()) + 1);
          $('.crm-right-content .list-group').ajaxReload();
        };
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});
/*==========================================================================*/
/*========= ADD PROFI TO TEAM ==============================================*/
/*==========================================================================*/
$('body').on('click', '.js-add-to-team-btn', function(event) {
  event.preventDefault();
  var $this = $(this);
  $this.prop('disabled', true);

  $.ajax({
    type: "POST",
    url: this.href,

    success: function(data) {
        $this.before('<small>Profi added to your team.</small>');
        $this.remove();
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});
/*==========================================================================*/
/*========= REMOVE PROFI FROM TEAM =========================================*/
/*==========================================================================*/
$('body').on('click', '.js-remove-from-team-btn', function(event) {
  event.preventDefault();
  var $this = $(this);
  $.ajax({
    type: "GET",
    url: this.href,

    success: function(data) {
        $('#js-modal .modal-body').html(data.html);
        $('#js-modal #js-modal-label').text('Remove professional from my team');
        $('#js-modal').modal('show')
        $('#js-modal form').attr('data-id', $this.closest('.js-team-client-item').data('id'));
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});

$('body').on('submit', '.js-remove-from-team-form', function(event) {
  var $this = $(this);
  event.preventDefault();
  $('.js-remove-from-team-form button[type="submit"]').prop('disabled', true);

  $.ajax({
    type: this.method,
    url: this.action,

    success: function(data) {
        $('#js-modal .modal-body').html(data.html);
        $('.js-remove-from-team-form button[type="submit"]').prop('disabled', false);
        $('.js-team-client-item[data-id=' + $this.data('id') + ']').remove();

        if ($('.js-team-client-item').length == 0) {
          $('.js-team-container').html(
            "<p>You have not add anyone to your team.</p>"
          )
        };
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});

/*==========================================================================*/
/*========= PROFILE EDIT FORMS =============================================*/
/*==========================================================================*/

$('.hidden').hide();

dpick_init = function(){
	if ($('.js-datepicker').length) {
     $('.js-datepicker').datetimepicker({
      'format': 'm/d/Y',
      'timepicker': false,
      minDate: new Date()
    })
  }
}

window.callbacks = {
//		'.js-location-form':function(){
//			initAutocomplete(['js-location-popup', 'id-latitude-popup', 'id-longitude-popup']);
//		},
		'.js-prof-invite-form':function(){
			initAutocomplete();
		},
		'.js-license-form, .js-datepicker-form':function(){
			dpick_init();
		},
		'.js-prof-step2-form':function(){
			$(".modal input[name*=phone]").inputmask({"mask": "(999) 999-9999"});
			initAutocomplete();
		}
}

window.after_callbacks = {
		'.js-location-form':function(frm, html){
			$('.js-locations').html(html);
		},
		'.js-profi-contact-form-form':function(frm, html){
			$("input[name*=phone]").inputmask({"mask": "(999) 999-9999"});
		},
		'.js-reject-form':function(frm){
			$('.js-list-item[data-id='+frm.data('id')+'], .crm-item[data-id='+frm.data('id')+']').remove();
		},
		'.js-ticket-answer-form, .js-ticket-resend-form, .js-report-approve-form, .js-suspend-review, .js-mark-complete, .js-correct-form, .js-license-form, .js-profile-approve':function(frm){
			$('.js-list-item[data-id='+frm.data('id')+'], .crm-item[data-id='+frm.data('id')+']').remove();
            $('.crm-right-content .list-group').ajaxReload();
		},
		'.js-suspend-review, .js-mark-complete, .js-profile-approve':function(frm){
			$('#js-modal-lg').modal('hide');
		},
		'.js-ban-form':function(frm){
			$('.js-ban-user[data-id='+frm.data('id')+']').hide();
			$('.js-unban-user[data-id='+frm.data('id')+']').show();
			$('.js-ban-sup[data-id='+frm.data('id')+']').show();
		},
		'.js-unban-user':function(frm){
			$('.js-ban-user[data-id='+frm.data('id')+']').show();
			$('.js-unban-user[data-id='+frm.data('id')+']').hide();
			$('.js-ban-sup[data-id='+frm.data('id')+']').hide();
		},
		'.js-root-edit-form, .js-root-ajax-link':function(frm){
			var item = $('.js-list-item[data-id='+frm.data('id')+'], .crm-item[data-id='+frm.data('id')+']');
			$.get(item.data('list-url'), function(d){
				item.replaceWith($(d))
			})
		},
		'.js-code-verify-form':function(frm){
			$.alert('Your phone successfully verified');
            var btn = $('.js-verify-phone')
			btn.attr('disabled', 'disabled').addClass('btn-transparent-grey').removeClass('btn-blue');
            var phone = btn.closest('form').find('[data-verified]');
            phone.attr('data-verified', phone.val().replace(/[^\d]+/gi, ''))
		},
		'.js-password-form':function(frm){
//			location.reload()
		}
}

window.spin = '<i class="fa fa-spinner fa-spin" id="spinner" style="font-size:24px"></i>';

function makePlaceholders(obj){
	obj.each(function(){
		var inp = $(this).find('.form-control'),
			id = inp.attr('id'),
			pl = inp.attr('placeholder');
		if(!inp.attr('placeholder'))return;
		if(!inp.is('[type=text], [type=email], [type=number], [type=date], [type=password], textarea'))return;
		$(this).append('<div class="placeholder"><label for="'+id+'">'+pl+'</label>'+(inp.attr("required")?'<span class="star">*</span>':"")+'</div>');
		inp.attr('placeholder', '');
	});
}

function loadModal(url, transparent, id, big_class){
	if(!transparent)transparent=false;
	$('#js-modal-lg .modal-body')
	.html('<div class="text-center">'+window.spin+'</div>');
	$('#js-modal-lg .modal-title').html('');
	$('#js-modal-lg').modal('show')[big_class?'addClass':'removeClass']('big');
	$('#js-modal-lg').modal('show')[transparent?'addClass':'removeClass']('transparent');
	$.ajax({
		type:'GET',
		url:url,
		success:function(data){
			$('#js-modal-lg .modal-title').html(
				$(data).find('legend').html()
			);			
			data = $(data).find('.ajax-content').length ? $(data).find('.ajax-content').html() : data;
			$('#js-modal-lg .modal-body').html(data);
			if(transparent){
				makePlaceholders($('#js-modal-lg .modal-body .form-group'));
			}
			$('#js-modal-lg .modal-body').find('legend').remove();
			if(id)
				$('#js-modal-lg .modal-body form').attr('data-id', id);
			$.each(window.callbacks, function(i,v){
				if($('#js-modal-lg .modal-body form').is(i))
					v();
			});
			$('#js-modal-lg .modal-body .form-control').blur();
			setTimeout(function(){
				$('.modal.show').modalCenter();
                $('#js-modal-lg .modal-body').find('.form-control').each(function(){
                    if($(this).val() != '')
                        $(this).closest('.form-group').find('.placeholder').hide();
                });
			}, 200);
			
			$('#js-modal-lg:not(.transparent) .modal-body').find('.form-control[required]').each(function(){
				var lbl = $(this).closest('[class*=col], .form-group').find('label');
				lbl.html(lbl.text().replace(/\n\r/, '').replace(/^\s+/, '').replace(/\s+$/, '')+'<sup></sup>');
			});
		}
	});
}

$(document).on('click', '.js-form-modal', function(){
	var t = $(this);
	loadModal(t.data('url')||t.attr('href'), t.is('.js-modal-transparent'), t.data('id'), t.data('big'));
	return false;
});

$(document).on('submit', '#js-modal-lg .modal-body .js-ajax-form', function() {
	var t = $(this), cs = $('[name=csrfmiddlewaretoken]').val();
	//t.find('input, select, textarea, button').attr()
	$(this).ajaxSubmit({
		type:'POST',
		dataType:(t.is('.js-simple-form')?'html':'json'),
		url:t.attr('action'),
		beforeSend:function(xhr, settings){
			if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
	            xhr.setRequestHeader("X-CSRFToken", csrftoken);
	        }
			t.find('fieldset').attr('disabled', 'disabled');
			$(window.spin).insertBefore(t.find('button[type=submit]'));
			$('<input type="hidden" name="csrfmiddlewaretoken" value="'+cs+'">')
			.appendTo('#js-modal-lg .modal-body .js-ajax-form');
		},
		success:function(data){
			if(t.is('.js-simple-form')){
				data = $(data).find('.ajax-content').length ? $(data).find('.ajax-content').html() : data;
				$('#js-modal-lg .modal-body').html(data);
				if($('#js-modal-lg').is('.transparent')){
					makePlaceholders($('#js-modal-lg .modal-body .form-group'));
				}
			}
			else{
				if(!data['success']){
					$('#js-modal-lg .modal-body').html(data['html']);
					$('#js-modal-lg .modal-body').find('legend').remove();
					$.each(window.callbacks, function(i,v){
						if($('#js-modal-lg .modal-body form').is(i))
							v();
					});
                    $('#js-modal-lg .modal-body').find('.form-control[required]').each(function(){
                        var lbl = $(this).closest('[class*=col], .form-group').find('label');
                        if(lbl.find('sup').length)return;
                        lbl.html(lbl.text().replace(/\n\r/, '').replace(/^\s+/, '').replace(/\s+$/, '')+'<sup></sup>');
                    });
                    $('#js-modal-lg .modal-body').find('.form-control:not([required])').each(function(){
                        var lbl = $(this).closest('[class*=col], .form-group').find('label');
                        if(lbl.find('sup').length)return;
                        lbl.html(lbl.text().replace(/\n\r/, '').replace(/^\s+/, '').replace(/\s+$/, '')+'<sup style="visibility:hidden"></sup>');
                    });
				}
				else{
					$('#js-modal-lg').modal('hide');
					if(t.data('result'))
						$(t.data('result')).replaceWith(data['html']);
					$.each(window.after_callbacks, function(i,v){
						if(t.is(i))
							v(t, data['html']);
					});
					$('<input type="hidden" name="csrfmiddlewaretoken" value="'+cs+'">')
					.appendTo('#js-modal-lg .modal-body .js-ajax-form');
				}
				if(data['message'])
					$.alert(data['message'])
			}
			$('.modal.transparent.show').modalCenter();
		}
	});
	return false;
});

$(document).on('submit', '.js-ajax-inline-form', function(){
	var t = $(this), cs = $('[name=csrfmiddlewaretoken]').val();
	//t.find('input, select, textarea, button').attr()
	$(this).ajaxSubmit({
		type:'POST',
		dataType:'json',
		url:t.attr('action'),
		beforeSend:function(xhr, settings){
			if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
	            xhr.setRequestHeader("X-CSRFToken", csrftoken);
	        }
			t.find('fieldset').attr('disabled', 'disabled');
			if(t.is('.js-spec-inline-form'))
                t.find('button[type=submit]').prepend(window.spin);
            else
                $(window.spin).insertBefore(t.find('button[type=submit]'));
			$('<input type="hidden" name="csrfmiddlewaretoken" value="'+cs+'">')
			.appendTo('.js-ajax-inline-form');
		},
		success:function(data){
			if(!data['success']){
				t.closest('.js-inline-container').html(data['html']);
				$('.js-profi-contact-form-form').find("input[name*=phone]").inputmask({"mask": "(999) 999-9999"});
			}
			else{

				t.find('fieldset').removeAttr('disabled');
				$('#spinner').remove();
				if(!t.is('.js-spec-inline-form')){
                    t.resetForm();
                    t[0].reset();
                }
				t.find('.errorlist').remove();
				if(t.data('result'));
					$(t.data('result')).replaceWith(data['html']);
				$.each(window.after_callbacks, function(i,v){
					if(t.is(i))
						v(t, data['html']);
				});
				$('<input type="hidden" name="csrfmiddlewaretoken" value="'+cs+'">')
					.appendTo('.js-ajax-inline-form');
			}
			if(data['message'])
				$.alert(data['message']);
		}
	});
	return false;
});

$(document).on('click', '.js-form-external', function(){
	var t = $(this), frm = $(t.data('form'));

	if(t.is('.js-verify-phone')){
		$('.js-verify-message')
			.html('<div class="text-center">'+window.spin+'</div>');
	}

	t.attr('disabled', 'disabled');

	frm.ajaxSubmit({
		type:'POST',
		dataType:t.is('.js-verify-phone')?'html':'json',
		data:{
            'phone':frm.find('[name=phone]').val(),
            'csrfmiddlewaretoken':frm.find('[name=csrfmiddlewaretoken]').val()
        },
		url:t.data('url'),
		success:function(data){
			if(t.is('.js-verify-phone')){
				$('.js-verify-message').html('');
				console.log(data);
				if(data.indexOf('<form') != -1){
					$('#js-modal-lg .modal-title').html(
						$(data).find('legend').html()
					);
					$('#js-modal-lg .modal-body').html(data);
					$('#js-modal-lg .modal-body').find('legend').remove();
					$('#js-modal-lg').modal('show');
					$('.js-verify-message').removeClass('has-error text-danger');
				}else{
					try{
						var msg = clearTwilioStr(
								$(data).eq(0).text()
							);
						}catch(e){
							var msg = $(data).children('.errorlist li').html();
						}
						if(typeof msg == 'undefined' && msg != ''){
							li = $(data).children('.errorlist li')
							if(li.length)
								$('.js-verify-message').addClass('has-error text-danger').html(li.html());
						}else{
							$('.js-verify-message').addClass('has-error text-danger').html(msg);
						}
				}
			}else{
				var resp = $(t.data('response'));
				try{
				var msg = clearTwilioStr(
						$(data['html']).eq(0).text()
					);
				}catch(e){
					var msg = $(data['html'])
						.children('.errorlist li').html();
				}
				if(typeof msg == 'undefined'){
					li = $(data['html']).children('.errorlist li')
					msg = li.length ? li.html() : $(data['html']).eq(0).html();
				}
				resp.find('.js-verify-message').html(
					msg
				);
				if(data['success']){
					resp.removeClass('has-error text-danger');
					resp.find('input').removeClass('is-invalid');
				}
				else{
					resp.addClass('has-error text-danger');
					resp.find('input').addClass('is-invalid');
				}
			}
			t.removeAttr('disabled')
		}
	});
	return false;
});

$(document).on('click', '.js-delete-link, .js-update-link', function(){
	var t = $(this);
	$.confirm({
	    title: t.data('title'),
	    content: t.data('content'),
	    buttons: {
	        confirm: function () {
	        	t.attr('disabled', 'disabled');
	        	$.ajax({
	        		type:'POST',
	        		url:t.data('url'),
	        		success:function(data){
	        			if(t.is('.js-delete-link')){
                            t.closest('.js-list-item, .crm-item').remove();
                            $('.crm-right-content .list-group').ajaxReload();
                        }
        				$.each(window.after_callbacks, function(i,v){
        					if(t.is(i))
        						v(t);
        				});
        				if(data['message'])
        					$.alert(data['message'])
        				t.removeAttr('disabled');
	        		}
	        	});
	        },
	        cancel: function () {},
	    }
	});
	return false;
})
/*==========================================================================*/
/*=========== CREATE / EDIT TRANSACTION ====================================*/
/*==========================================================================*/
$('body').on('click', '.js-create-transaction-btn', function(event) {
  event.preventDefault();

  $.ajax({
    type: "GET",
    url: this.href || $(this).data('href'),

    success: function(data) {
        $('#js-modal-lg .modal-body').html(data.html);
        $('#js-modal-lg #js-modal-lg-label').text('Create new transaction');
        $('#js-modal-lg').modal('show');
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});

$('body').on('click', '.js-transaction-update-btn', function(event) {
  event.preventDefault();
  var $this = $(this);

  $.ajax({
    type: "GET",
    url: $this.data('href'),

    success: function(data) {
        $('#js-modal-lg .modal-body').html(data.html);
        $('#js-modal-lg #js-modal-lg-label').text('Edit transaction');
        $('#js-modal-lg').modal('show');
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});

$('body').on('submit', '.js-transaction-form', function(event) {
  event.preventDefault();
  $('.js-transaction-form button[type="submit"]').prop('disabled', true);

  $.ajax({
    type: this.method,
    url: this.action,
    data: $(this).serializeArray(),

    success: function(data) {
        $('#js-modal-lg .modal-body').html(data.html);
        $('.js-transaction-form button[type="submit"]').prop('disabled', false);

        if (data.obj_id && data.transaction_item) {
            $('#js-transaction-item-' + data.obj_id).replaceWith(
              data.transaction_item
            )
        } else {
          $('.js-transactions').prepend(data.transaction_item);
        }
        $('.crm-right-content .list-group').ajaxReload();
        // $('html, body').animate({
        //   scrollTop: $("#js-transaction-item-" + data.obj_id).offset().top + 60
        // }, 0);
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});
/*==========================================================================*/
/*============== DELETE TRANSACTION ========================================*/
/*==========================================================================*/
$('body').on('click', '.js-transaction-del-btn', function(event) {
  event.preventDefault();
  var $this = $(this);

  $.ajax({
    type: "GET",
    url: $this.data('href'),

    success: function(data) {
        $('#js-modal .modal-body').html(data.html);
        $('#js-modal #js-modal-label').text('Delete transaction');
        $('#js-modal').modal('show')
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});

$('body').on('submit', '.js-transaction-del-form', function(event) {
  event.preventDefault();
  $('.js-transaction-del-form button[type="submit"]').prop('disabled', true);

  $.ajax({
    type: this.method,
    url: this.action,
    data: $(this).serializeArray(),

    success: function(data) {
        $('#js-modal .modal-body').html(data.html);
        $('.js-transaction-del-form button[type="submit"]').prop('disabled', false);

        $('#js-transaction-item-' + data.obj_id).remove();
        // if (!$('div[id*="js-transaction-item-"').length) {
        //   $('.js-transactions').html(
        //     "<p>You have no transactions yet.</p>"
        //   )
        // };
        $('.crm-right-content .list-group').ajaxReload();
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});
/*==========================================================================*/
/*============== ADD / EDIT TRANSACTION DOCUMENTS ==========================*/
/*==========================================================================*/
$('body').on('click', '.js-add-transaction-doc-btn', function(event) {
  event.preventDefault();

  $.ajax({
    type: "GET",
    url: this.href,

    success: function(data) {
        $('#js-modal .modal-body').html(data.html);
        $('#js-modal #js-modal-label').text('Attach new document');
        $('#js-modal').modal('show');
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});

$('body').on('click', '.js-document-update-btn', function(event) {
  event.preventDefault();
  var $this = $(this);

  $.ajax({
    type: "GET",
    url:  $this.data('href'),

    success: function(data) {
        $('#js-modal .modal-body').html(data.html);
        $('#js-modal #js-modal-label').text('Edit document');
        $('#js-modal').modal('show');
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});

$('body').on('submit', '.js-transaction-docs-form', function(event) {
  event.preventDefault();
  $('.js-transaction-docs-form button[type="submit"]').prop('disabled', true);
  var data = new FormData($('.js-transaction-docs-form').get(0));

  $.ajax({
    type: this.method,
    url: this.action,
    data: data,
    cache: false,
    processData: false,
    contentType: false,

    success: function(data) {
        $('#js-modal .modal-body').html(data.html);
        $('.js-transaction-docs-form button[type="submit"]').prop('disabled', false);

        if (data.obj_id && data.transaction_item) {
          $('#js-transaction-item-' + data.obj_id).replaceWith(
            data.transaction_item
          );
          $('#js-transaction-item-' + data.obj_id + ' .transaction-collapse-btn').removeClass('collapsed');
          $('#js-transaction-item-' + data.obj_id + ' .transaction-collapse-btn').attr('aria-expanded', 'true');
          $('#transaction-collapse-'+ data.obj_id).addClass('show');
        };
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});
/*==========================================================================*/
/*============= DELETE TRANSACTION DOCUMENT ================================*/
/*==========================================================================*/
$('body').on('click', '.js-document-del-btn', function(event) {
  event.preventDefault();
  var $this = $(this);

  $.ajax({
    type: "GET",
    url: $this.data('href'),

    success: function(data) {
        $('#js-modal .modal-body').html(data.html);
        $('#js-modal #js-modal-label').text('Delete role');
        $('#js-modal').modal('show');
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});

$('body').on('submit', '.js-document-del-form', function(event) {
  event.preventDefault();
  $('.js-document-del-form button[type="submit"]').prop('disabled', true);

  $.ajax({
    type: this.method,
    url: this.action,
    data: $(this).serializeArray(),

    success: function(data) {
        $('#js-modal .modal-body').html(data.html);
        $('.js-document-del-form button[type="submit"]').prop('disabled', false);

        if (
            $(
                '#js-transaction-item-'
                + data.transaction_id
                + ' '
                + '[class*="js-transaction-document-item-"]'
            ).length == 1
        ) {
          $('.js-transaction-document-item-' + data.obj_id).before(
            '<li class="text-center">No attached documents.</li>'
          )
        };
        $('.js-transaction-document-item-' + data.obj_id).remove();
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});
/*==========================================================================*/
/*========= DETAILS OF TRANSACTION ROLE ====================================*/
/*==========================================================================*/
$('body').on('click', '.js-role-detail-btn', function(event) {
  event.preventDefault();

  $.ajax({
    type: "GET",
    url: this.href,

    success: function(data) {
        $('#js-modal .modal-body').html(data.html);
        $('#js-modal #js-modal-label').text($(data.html).find('#title').text());
        $('#js-modal').modal('show');
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});
/*==========================================================================*/
/*=========== ADD / EDIT TRANSACTION ROLE ==================================*/
/*==========================================================================*/
$('body').on('click', '.js-add-transaction-role-btn', function(event) {
  event.preventDefault();

  $.ajax({
    type: "GET",
    url: this.href,

    success: function(data) {
        $('#js-modal-lg .modal-body').html(data.html);
        $('#js-modal-lg #js-modal-lg-label').text('NEW TEAM MEMBER DETAILS');
        $('#js-modal-lg').modal('show');
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});

$('body').on('click', '.js-role-update-btn', function(event) {
  event.preventDefault();
  var $this = $(this);
  $.ajax({
    type: "GET",
    url: $this.data('href'),

    success: function(data) {
        $('#js-modal-lg .modal-body').html(data.html);
        $('#js-modal-lg #js-modal-lg-label').text('Edit role');
        $('#js-modal-lg').modal('show');
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});

$('body').on('submit', '.js-transaction-role-form', function(event) {
  event.preventDefault();
  $('.js-transaction-role-form button[type="submit"]').prop('disabled', true);

  $.ajax({
    type: this.method,
    url: this.action,
    data: $(this).serializeArray(),

    success: function(data) {
        $('#js-modal-lg .modal-body').html(data.html);
        $('.js-transaction-role-form button[type="submit"]').prop('disabled', false);

        if (data.obj_id && data.transaction_item) {
          $('#js-transaction-item-' + data.obj_id).replaceWith(
            data.transaction_item
          );
          $('#js-transaction-item-' + data.obj_id + ' .transaction-collapse-btn').removeClass('collapsed');
          $('#js-transaction-item-' + data.obj_id + ' .transaction-collapse-btn').attr('aria-expanded', 'true');
          $('#transaction-collapse-'+ data.obj_id).addClass('show');
        };
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});
/*==========================================================================*/
/*========== DELETE TRANSACTION ROLE =======================================*/
/*==========================================================================*/
$('body').on('click', '.js-role-del-btn', function(event) {
  event.preventDefault();
  var $this = $(this);

  $.ajax({
    type: "GET",
    url: $this.data('href'),

    success: function(data) {
        $('#js-modal .modal-body').html(data.html);
        $('#js-modal #js-modal-label').text('Delete role');
        $('#js-modal').modal('show');
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});

$('body').on('submit', '.js-role-del-form', function(event) {
  event.preventDefault();
  $('.js-role-del-form button[type="submit"]').prop('disabled', true);

  $.ajax({
    type: this.method,
    url: this.action,
    data: $(this).serializeArray(),

    success: function(data) {
        $('#js-modal .modal-body').html(data.html);
        $('.js-role-del-form button[type="submit"]').prop('disabled', false);

        if (
            $(
                '#js-transaction-item-'
                + data.transaction_id
                + ' '
                + '[class*="js-transaction-role-item-"]'
            ).length == 1
        ) {
          $('.js-transaction-role-item-' + data.obj_id).before(
            '<li class="text-center">No roles in transaction. </li>'
          )
        };
        $('.js-transaction-role-item-' + data.obj_id).remove();
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});
/*==========================================================================*/
/*========== DATEPICKER ====================================================*/
/*==========================================================================*/
$(document).ready(function() {
  if ($('.js-datepicker').length) {
     $('.js-datepicker').datetimepicker({
      'format': 'm/d/Y',
      'timepicker': false,
      minDate: new Date()
    })
  }
});

var dt_picker_init = function() {
  $('.js-datetimepicker').datetimepicker({
    'formatDate': 'm/d/Y',
    'formatTime': 'h:i A',
    'format': 'm/d/Y h:i A',
    'validateOnBlur': false,
  })
};

$(document).ready(function() {
  if ($('.js-datetimepicker').length) {
    dt_picker_init()
  }
});
/*==========================================================================*/
/*===== ADD / EDIT CONTACT =================================================*/
/*==========================================================================*/
$('body').on('click', '.js-contact-add-btn', function(event) {
  event.preventDefault();

  $.ajax({
    type: "GET",
    url: this.href,

    success: function(data) {
        $('#js-modal-lg .modal-body').html(data.html);
        $('#js-modal-lg #js-modal-lg-label').text('Add new contact');
        $('#js-modal-lg input[name*=phone]').inputmask({"mask": "(999) 999-9999"});
        $('#js-modal-lg').modal('show');
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});

$('body').on('click', '.js-contact-update-btn', function(event) {
  event.preventDefault();
  var $this = $(this);
  $.ajax({
    type: "GET",
    url: $this.data('href'),

    success: function(data) {
        $('#js-modal-lg .modal-body').html(data.html);
        $('#js-modal-lg #js-modal-lg-label').text('Edit contact');
        $('#js-modal-lg input[name*=phone]').inputmask({"mask": "(999) 999-9999"});
        $('#js-modal-lg').modal('show');
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});

$('body').on('submit', '.js-contacts-form', function(event) {
  event.preventDefault();
  $('.js-contacts-form button[type="submit"]').prop('disabled', true);

  $.ajax({
    type: this.method,
    url: this.action,
    data: $(this).serializeArray(),

    success: function(data) {
        $('#js-modal-lg .modal-body').html(data.html);
        $('.js-contacts-form button[type="submit"]').prop('disabled', false);

        if (data.contact_item && data.obj_id) {
          $('.js-contact-item-' + data.obj_id).replaceWith(data.contact_item);
        } else if (data.contact_item) {
          $('.js-contacts-container').prepend(data.contact_item)
        };
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});
/*==========================================================================*/
/*========== DELETE CONTACT ================================================*/
/*==========================================================================*/
$('body').on('click', '.js-contact-del-btn', function(event) {
  event.preventDefault();
  var $this = $(this);

  $.ajax({
    type: "GET",
    url: $this.data('href'),

    success: function(data) {
        $('#js-modal .modal-body').html(data.html);
        $('#js-modal #js-modal-label').text('Delete contact');
        $('#js-modal').modal('show');
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});

$('body').on('submit', '.js-contact-delete-form', function(event) {
  event.preventDefault();
  $('.js-contact-delete-form button[type="submit"]').prop('disabled', true);
  var $this = $(this);

  $.ajax({
    type: this.method,
    url: this.action,
    data: $this.serializeArray(),

    success: function(data) {
        $('#js-modal .modal-body').html(data.html);
        $('.js-contact-delete-form button[type="submit"]').prop('disabled', false);

        var data_part = '[data-contact-id="' + $this.data('contact-id') + '"]';
        var selector = '.js-contact-item'+ data_part;

        $(selector).remove();

        // if ($('.js-contacts-container').is(':empty')) {
        //   $('.js-contacts-container').prepend(
        //     '<div>You have not added any contact yet.</div>'
        //   )
        // };
        $('.js-contacts-container').ajaxReload();
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});
/*==========================================================================*/
/*============= COLLAPSE DIARY TO CONTACT =======================================*/
/*==========================================================================*/
$('body').on('click', '.js-contact-diaries-collapse', function(event) {
  var $this = $(this);
  var target = $this.data('target');

  $.ajax({
    type: "GET",
    url: $this.data('url'),
    success: function(data) {
        $(target).html(data);
    },

    error: function(xhr) {
        console.log('d"oh');
    },
    cache: false,
  });

});

/*==========================================================================*/
/*============= ADD DIARY TO CONTACT =======================================*/
/*==========================================================================*/
$('body').on('click', '.js-contact-add-diary-btn', function(event) {
  event.preventDefault();

  $.ajax({
    type: "GET",
    url: this.href,

    success: function(data) {
        $('#js-modal-lg .modal-body').html(data.html);
        $('#js-modal-lg #js-modal-lg-label').html('<span style="font-size:20px!important">New log event</span>');
        $('#js-modal-lg').modal('show');
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});

$('body').on('submit', '.js-diary-add-form', function(event) {
  event.preventDefault();
  var $this = $(this);
  $('.js-diary-add-form button[type="submit"]').prop('disabled', true);

  var teamclient_id = $this.data('teamclient-id');
  var contact_id = $this.data('contact-id');
  var container_id = teamclient_id;
  if (!container_id) {
    container_id = contact_id;
  }

  $.ajax({
    type: this.method,
    url: this.action,
    data: $this.serializeArray(),

    success: function(data) {
        $('#js-modal-lg .modal-body').html(data.html);
        $('.js-diary-add-form button[type="submit"]').prop('disabled', false);

        var data_part = '[data-container-id="' + container_id + '"]';
        var selector = '.js-diary-container'+ data_part;
        if ($(selector).is(':empty')) {
            $(selector).html(data.diary_item);
        } else {
            $(selector).prepend(data.diary_item);
        }
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});
/*==========================================================================*/
/*========= SEND INVITE TO CONTACT =========================================*/
/*==========================================================================*/
$('body').on('click', '.js-send-invite-btn', function(event) {
  event.preventDefault();

  $.ajax({
    type: "GET",
    url: $(this).data('href'),

    success: function(data) {
        $('#js-modal-lg .modal-body').html(data.html);
        $('#js-modal-lg #js-modal-lg-label').text('Send invitation');
        $('#js-modal-lg').modal('show');
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});

$('body').on('submit', '.js-send-invite-form', function(event) {
  event.preventDefault();
  $('.js-send-invite-form button[type="submit"]').prop('disabled', true);

  $.ajax({
    type: this.method,
    url: this.action,
    data: $(this).serializeArray(),

    success: function(data) {
        $('#js-modal-lg .modal-body').html(data.html);
        $('.js-send-invite-form button[type="submit"]').prop('disabled', false);

        $('.js-contact-item-' + data.obj_id).replaceWith(data.contact_item);
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});
/*==========================================================================*/
/*========== VIEW CONTACT NOTES ============================================*/
/*==========================================================================*/
$('body').on('click', '.js-contact-note-btn', function(event) {
  event.preventDefault();
  var $this = $(this);

  $.ajax({
    type: "GET",
    url: this.href || $(this).data('href'),

    success: function(data) {
        $('#js-modal .modal-body').html(data.html);
        $('#js-modal #js-modal-label').text('Contact notes');
        $('#js-modal').modal('show');
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});
/*==========================================================================*/
/*========== DELETE CLIENT FROM TEAM =======================================*/
/*==========================================================================*/
$('body').on('click', '.js-remove-client-btn', function(event) {
  event.preventDefault();
  var $this = $(this);

  $.ajax({
    type: "GET",
    url: this.href,

    success: function(data) {
        $('#js-modal .modal-body').html(data.html);
        $('#js-modal #js-modal-label').text('Remove client');
        $('#js-modal').modal('show');
        $('#js-modal form').attr('data-id', $this.data('id'));
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});

$('body').on('submit', '.js-client-del-form', function(event) {
  event.preventDefault();
  var $this = $(this);
  $('.js-client-del-form button[type="submit"]').prop('disabled', true);

  $.ajax({
    type: this.method,
    url: this.action,
    data: $(this).serializeArray(),

    success: function(data) {
        $('#js-modal .modal-body').html(data.html);
        $('.js-client-del-form button[type="submit"]').prop('disabled', false);

        $('.js-team-client-item[data-team-client-id=' + $this.data('id') + ']').remove();
        // if ($this.closest('.js-team-container:empty')) {
        //   $('.js-team-container').html(
        //       '<p>You have no clients yet</p>'
        //   )
        // }
        $('.crm-right-content .js-team-container').ajaxReload();
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});
/*==========================================================================*/
/*============= COLLAPSE DIARY TO CLIENT =======================================*/
/*==========================================================================*/
$('body').on('click', '.js-team-clients-diaries-collapse', function(event) {
  var $this = $(this);
  var target = $this.data('target');

  $.ajax({
    type: "GET",
    url: $this.data('url'),
    success: function(data) { $(target).html(data); },
    error: function(xhr) { console.log('d"oh'); },
    cache: false,
  });

});

/*==========================================================================*/
/*============= ADD DIARY TO CLIENT ========================================*/
/*==========================================================================*/
$('body').on('click', '.js-team-add-diary-btn', function(event) {
  event.preventDefault();

  $.ajax({
    type: "GET",
    url: this.href,

    success: function(data) {
        $('#js-modal-lg .modal-body').html(data.html);
        $('#js-modal-lg #js-modal-lg-label').text('New log event');
        $('#js-modal-lg').modal('show');
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});
/*==========================================================================*/
/*=========== ADD REVIEW ===================================================*/
/*==========================================================================*/
$('body').on('click', '.js-add-review-btn', function(event) {
  event.preventDefault();

  $.ajax({
    type: "GET",
    url: this.href,

    success: function(data) {
        $('#js-modal .modal-body').html(data.html);
        $('#js-modal #js-modal-label').text('Rate professional');
        $('#js-modal').modal('show');
        $('.review-form input').attr('oninvalid', '$(this).closest("form").addClass("form-invalid")')
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});

$('body').on('submit', '.js-review-form', function(event) {
  event.preventDefault();
  $('.js-review-form button[type="submit"]').prop('disabled', true);

  $.ajax({
    type: this.method,
    url: this.action,
    data: $(this).serializeArray(),

    success: function(data) {
        $('#js-modal .modal-body').html(data.html);
        $('.js-review-form button[type="submit"]').prop('disabled', false);
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});
/*==========================================================================*/
/*========== EDIT REVIEW ===================================================*/
/*==========================================================================*/
$('body').on('click', '.js-edit-review-btn', function(event) {
  event.preventDefault();

  $.ajax({
    type: "GET",
    url: this.href,

    success: function(data) {
        $('#js-modal .modal-body').html(data.html);
        $('#js-modal #js-modal-label').text('Edit review');
        $('#js-modal').modal('show');
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});

$('body').on('click', '.js-review-edit-form button[type="submit"]', function(event) {
  var f = $('.js-review-edit-form')[0];
  if(!f.checkValidity())return;
  $(this).prop('disabled', true);

  $.ajax({
    type: f.method,
    url: f.action,
    data: $(f).serializeArray(),

    success: function(data) {
        $('#js-modal .modal-body').html(data.html);
        $('.js-review-edit-form button[type="submit"]').prop('disabled', false);
        $.alert("Review saved");
        $('#js-modal').modal('hide');
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});
/*==========================================================================*/
/*========= SEE REVIEW =====================================================*/
/*==========================================================================*/
$('body').on('click', '.js-see-review-btn', function(event) {
  event.preventDefault();

  $.ajax({
    type: "GET",
    url: this.href,

    success: function(data) {
        $('#js-modal-lg .modal-body').html(data.html);
        $('#js-modal-lg #js-modal-lg-label').html('<div style="">My review</div>');
        $('#js-modal-lg').modal('show');
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});
/*==========================================================================*/
/*========= POP-UP PROFILE =================================================*/
/*==========================================================================*/
$('body').on('click', '.js-pro-pop-up-btn', function(event) {
  event.preventDefault();

  $.ajax({
    type: "GET",
    url: $(this).data('pop-up-link'),

    success: function(data) {
        $('#js-modal-lg .modal-body').html(data.html);
        $('#js-modal-lg #js-modal-lg-label').text('Professional info');
        $('#js-modal-lg').modal('show');
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});
/*==========================================================================*/
/*==========================================================================*/
/*==========================================================================*/
$(function(){
	if(typeof $.fn.tooltipster != 'undefined')
		$('.js-tooltip').tooltipster({
			theme: 'tooltipster-light',
			maxWidth:200,
			side:'bottom'
		});
})
/*==========================================================================*/
/*========= MARK REPLIES AS VIEWED =========================================*/
/*==========================================================================*/
$('body').on('click', '.js-mark-replies-viewed', function(event) {
  event.preventDefault();
  $('.js-mark-replies-viewed').prop('disabled', true);

  $.ajax({
    type: "GET",
    url: this.href,

    success: function(data) {
        $('#js-modal .modal-body').html(data.html);
        $('.js-mark-replies-viewed').prop('disabled', false);

        $('#js-modal #js-modal-label').text('Mark replies as viewed');
        $('#js-modal').modal('show');
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});
/*==========================================================================*/
/*========== OFFCANVAS =====================================================*/
/*==========================================================================*/
$('body').on('click', '.js-toggle-offcanvas', function(event) {
  var target = $(this).attr('href');
  $(target).toggleClass('is-open');
});
/*==========================================================================*/
/*========= READ TENDER BID DETAIL =========================================*/
/*==========================================================================*/
$('body').on('click', '.js-tender-reply-read', function(event) {
  event.preventDefault();

  $.ajax({
    type: "GET",
    url: $(this).data('url'),

    success: function(data) {
        $('#js-modal .modal-body').html(data.html);
        $('#js-modal #js-modal-label').text('My reply');
        $('#js-modal').modal('show');
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});
/*==========================================================================*/
/*============ ASK TO RATE BTN =============================================*/
/*==========================================================================*/
$('body').on('click', '.js-ask-rate-btn', function(event) {
  event.preventDefault();

  $.ajax({
    type: "GET",
    url: $(this).data('href'),

    success: function(data) {
        $('#js-modal .modal-body').html(data.html)
        $('#js-modal #js-modal-label').text('Ask to rate');
        $('#js-modal').modal('show');
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});

$('body').on('submit', '.js-ask-rate-form', function(event) {
  event.preventDefault();
  var team_client_id = $(this).data('team-client-id');
  $('.js-ask-rate-form button[type="submit"]').prop('disabled', true);

  $.ajax({
    type: this.method,
    url: this.action,
    data: $(this).serializeArray(),

    success: function(data) {
        $('#js-modal .modal-body').html(data.html);
        $('.js-ask-rate-form button[type="submit"]').prop('disabled', false);

        $('.js-team-client-item[data-team-client-id="' + team_client_id + '"] .js-ask-rate-btn').replaceWith(
            '<span>Your request to rate was sent</span>'
        );
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});
/*==========================================================================*/
/*================= HIDDEN CONTROL BUTTONS =================================*/
/*==========================================================================*/
$(document).ready(function() {
  if ($('.js-hidden-btns').length) {
    $('body').on('click', function(event) {
      if (!$(event.target).is('.js-hidden-btns, .js-hidden-btns *')) {
        $('.js-hidden-btns.active').removeClass('active');
      }
    });
  }
});

$('body').on('click', '.js-hidden-btns', function(event) {
  $('.js-hidden-btns.active').not($(this)).removeClass('active');
  $(this).toggleClass('active');
});
/*==========================================================================*/
/*========= UPDATE DIARY LOG ===============================================*/
/*==========================================================================*/
$('body').on('click', '.js-diary-update-btn', function(event) {
  event.preventDefault();

  $.ajax({
    type: "GET",
    url: $(this).data('href'),

    success: function(data) {
        $('#js-modal .modal-body').html(data.html)
        $('#js-modal #js-modal-label').text('Update log event');
        $('#js-modal').modal('show');
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});

$('body').on('submit', '.js-diary-update-form', function(event) {
  event.preventDefault();
  var data_diary_id = $(this).data('diary-id');
  $('.js-diary-update-form button[type="submit"]').prop('disabled', true);

  $.ajax({
    type: this.method,
    url: this.action,
    data: $(this).serializeArray(),

    success: function(data) {
        $('#js-modal .modal-body').html(data.html);
        $('.js-ask-rate-form button[type="submit"]').prop('disabled', false);

        $('.js-diary-item[data-diary-id="' + data_diary_id + '"] .js-diary-body').html(data.diary_text);
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});
/*==========================================================================*/
/*=========== DELETE DIARY LOG =============================================*/
/*==========================================================================*/
$('body').on('click', '.js-diary-del-btn', function(event) {
  event.preventDefault();

  $.ajax({
    type: "GET",
    url: $(this).data('href'),

    success: function(data) {
        $('#js-modal .modal-body').html(data.html)
        $('#js-modal #js-modal-label').text('Delete log event');
        $('#js-modal').modal('show');
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});

$('body').on('submit', '.js-diary-del-form', function(event) {
  event.preventDefault();
  var data_diary_id = $(this).data('diary-id');
  $('.js-diary-del-form button[type="submit"]').prop('disabled', true);

  $.ajax({
    type: this.method,
    url: this.action,
    data: $(this).serializeArray(),

    success: function(data) {
        $('#js-modal .modal-body').html(data.html);
        $('.js-ask-rate-form button[type="submit"]').prop('disabled', false);

        $('.js-diary-item[data-diary-id="' + data_diary_id + '"]').remove();
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});
/*==========================================================================*/
/*================= MODERATOR HISTORY PAGE =================================*/
/*==========================================================================*/
$(function(){
	if($('#id_date_range').length)
		$('#id_date_range').daterangepicker({
			"locale": {"format": "MM/DD/YYYY"},
			maxDate:new Date(),
			showDropdowns:true,
			ranges: {
		           'Today': [moment(), moment()],
		           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
		           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
		           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
		           'This Month': [moment().startOf('month'), moment().endOf('month')],
		           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
		        }
		});
});
/*==========================================================================*/
/*============ MARK REPLIES VIEWED =========================================*/
/*==========================================================================*/
$('body').on('click', '.js-mark-replies-viewed-form button[type="submit"]', function(event) {
  // $(this).prop('disabled', true);
  $.get(this.action, function(){
    $('#js-modal').modal('hide');
    $('.team-img-wrapper span').removeClass('btn-green').addClass('bg-text-light');
  });
  return false;
});
/*==========================================================================*/
/*========== PROBLEM REVIEW BTN ============================================*/
/*==========================================================================*/
$('body').on('click', '.js-problem-review-btn', function(event) {
  event.preventDefault();
  var t = $(this);

  $.ajax({
    type: "GET",
    url: $(this).data('url'),

    success: function(data) {
        if(t.closest('.modal').length){
            t.closest('.js-start-dispute').html(data.html);
            t.closest('.modal').modalCenter();
        }else{
            $('#js-modal .modal-body').html(data.html)
            $('#js-modal #js-modal-label').text('Start dispute');
            $('#js-modal').modal('show');
        }
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});

$('body').on('submit', '.js-problem-review-form', function(event) {
  event.preventDefault();
  var t = $(this);
  $('.js-problem-review-form button[type="submit"]').prop('disabled', true);

  $.ajax({
    type: this.method,
    url: this.action,
    data: $(this).serializeArray(),

    success: function(data) {
        t.closest('.modal-body').html(data.html);
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});

$(function(){
	$('body').on('click', '.placeholder',function() {
		  $(this).closest('.form-group').find('input').focus();
		});
	$('body').on('focus', '.form-group', function() {
		  $(this).closest('.form-group').find('.placeholder').hide();
		});
	$('body').on('blur','.form-control',function() {
		  var $this = $(this);
		  if ($this.val().length == 0)
		    $(this).closest('.form-group').find('.placeholder').show();
		});
	$('.form-control').blur();
	$('body').on('click change', '.form-check input, .form-checkbox input', function(){
		$(this).closest('.form-checkbox, .form-check').find('label').each(function(){
			$(this)[($(this).find('input').is(':checked')?'addClass':'removeClass')]('checked');
		});
	});
	$('.tender-modal-1 .form-check label').each(function(){
		$(this).addClass('value-'+$(this).find('input').val());
	});
	$('.js-footer-locations li a').click(function(){
		$('footer form input:first').val($(this).text()).focus();
		return false;
	});
	$('.js-start-request').click(function(){
		$('footer form').trigger('submit');
        return false;
	});
	$('.js-messages-story-read').unbind('click').click(function(){
		$('#js-modal .modal-title').text($(this).data('title')||'Message');
		$('#js-modal .modal-body').html('<div class="open-sans-16 margBot30 text-dark-blue">'+$(this).data('content')+'</div>');
		$.post($(this).data('url'));
		$('#js-modal').modal('show');
        $(this).closest('.crm-item').find('.img-wrapper .btn, .team-img-wrapper .btn, .request-badge').remove();
		return false;
	});

  $('.avatar-inline-form [type=file]').bind('change', function(){
    $('.js-file-name').text(this.value);
  });

  $('body').on('click', '.js-review-detail',function() {
     $('#js-modal').modal('hide');
    });
  
  $('body').on('submit', '.location form, form.location',function() {
     var t = $(this), loc = t.find('[type=text]');
     if(loc.val().replace(/^\s+/gi, '').replace(/\s+$/gi, '') == ''){
        loc.addClass('is-invalid').focus();
     }else{
        loadModal(t.attr('action')+'?location='+loc.val(), true);
     }
     return false;
    });

  $('.js-mark-read').click(function(){
    $(this).closest('.crm-item').find('.img-wrapper .btn, .team-img-wrapper .btn, .request-badge').hide()
  });

  $('.js-set-read').click(function(){
    $(this).closest('.crm-item').find('.img-wrapper .btn, .team-img-wrapper .btn, .request-badge').remove();
  });

  $('.js-set-view').click(function(){
    $(this).closest('.crm-item').find('.img-wrapper .btn, .team-img-wrapper .btn, .request-badge')
        .removeClass('btn-green').addClass('bg-text-light');
  });

  $('[name=phone][data-verified]').bind('keydown keyup keypress cut copy paste change update', function(){
    var t = this, $t = $(t), btn = $t.closest('form').find('.js-verify-phone'),
        frmgroup = $t.closest('.form-group');
    setTimeout(function(){
            var is_new_phone = ($t.val().replace(/[^\d]+/gi, '') != $t.data('verified'));
            try{
                is_new_phone = is_new_phone && t.checkValidity();
            }catch(e){}
            btn.toggleAttr('disabled', !is_new_phone);
            btn.toggleClass('btn-blue', is_new_phone);
            btn.toggleClass('btn-transparent-grey', !is_new_phone);
            btn.toggleClass('disabled', !is_new_phone);
            frmgroup.toggleClass('js-phone-verified', !is_new_phone);
            frmgroup.toggleClass('js-phone-unverified', is_new_phone);
        }, 200);
  }).trigger('change');

    $( '.js-client-form #id_phone' ).bind('keypress', function(e){
       if ( e.keyCode == 13 ) {
         $( this ).closest('form').find( '.js-verify-phone' ).click();
         return false;
       }
    });

    $('body').on('mousedown', '.js-license-item', function(event) {
        event.preventDefault();
        $(this).find('.js-update-license').click();
        return false;
    });
    $('body').on('click', '.js-license-item .js-delete-link', function(event) {
        event.preventDefault();
        var item = $(this).closest('.js-list-item'),
            form = $(this).closest('.modal').find('form');
        if(item.is('.active')){
            item.removeClass('active');
            $('.license-fields [readonly]').removeAttr('readonly');
            form.attr('action', form.data('orig-url')).find('input:visible').val('');
            form.find('.form-group').removeClass('has-error');
            form.find('.errorlist').remove();
        }
    });
    $('body').on('mousedown', '.js-license-item .js-delete-link', function(event) {
        event.preventDefault();
        return false;
    });
    $('body').on('click', '.js-update-license', function() {
        var item = $(this).closest('.js-list-item'),
            form = $(this).closest('.modal').find('form');

        form.attr('action', item.data('url'));
        $('.js-license-item').removeClass('active');
        item.addClass('active');

        $.each(['agency_name', 'name', 'date_end_at'], function(i, v){
            var sel = '[name=' + v + ']';
            if(item.data('verify')){
                form.find('#id_name, #id_agency_name').attr('readonly', 'readonly');
            }else{
                form.find('#id_name, #id_agency_name').removeAttr('readonly');
            }
            form.find(sel+':visible').val(item.find(sel).val());
        });

        $('.license-fields input:not([readonly]):first').focus();

        $('.js-license-skip').show();

        return false;
    });

    $('body').on('click', '.js-license-skip', function(event){
        event.preventDefault();
        var form = $(this).closest('.modal').find('form');
        
        $('.license-fields [readonly]').removeAttr('readonly');
        form.attr('action', form.data('orig-url')).find('input:visible').val('');
        form.find('.form-group').removeClass('has-error');
        form.find('.errorlist').remove();
        $('.js-license-item').removeClass('active');

        $(this).hide();

        return false;
    });
});

$.fn.toggleAttr = function(attr, condition){
    if(condition)
        this.prop(attr, attr);
    else
        this.removeAttr(attr);
}

$.fn.modalCenter = function(){
	var t = this,
		wh = $(window).height(),
		h = t.find('.modal-body').height(),
		hh = $('#header').height()+20,
		mh = t.is('.js-tender-modal')?0:t.find('.modal-header').height();
		if(!t.is('.transparent'))
			var sel = '.modal-dialog';
		else
			var sel = t.is('.js-tender-modal')?'.modal-content':'.modal-body';
	/*if(!t.is('.transparent'))
		return this;*/
	if(t.is('.transparent')){
		if(h < (wh - hh)){
			t.find(sel).css('padding-top', Math.max(hh, wh / 2 - h / 2 - mh));
		}else{
			t.find(sel).css('padding-top', hh - mh);
		}
	}else if(t.is('#js-modal-lg, #js-modal')){
		vh = document.documentElement.clientHeight;
		s = t.find(sel);
		setTimeout(function(){
			if(s.height() < vh){
				s.css('margin-top', 'calc(50vh - '+s.height()/2+'px)');
				s.css('margin-bottom', '0');
			}else{
				s.css('margin-top', '1.75rem');
				s.css('margin-bottom', '1.75rem');
			}
		}, 500);
	}
	
	return this;
}

$.fn.ajaxReload = function(cb){
    var t = this;
    this.addClass('reloading').load(location.href, function(){
        t.removeClass('reloading');
        if(cb)cb();
    });
}

$('.modal').on('show.bs.modal', function (e) {
	var t = $(this);
	setTimeout(function(){
		$('.modal-image-bg')[t.is('.transparent')?'addClass':'removeClass']('modal-image-bg-transparent');
		/*if(t.is('.transparent'))*/
			t.modalCenter();
	}, 200);
	$('#js-modal-lg:not(.transparent) .modal-body').find('.form-control[required]').each(function(){
        var lbl = $(this).closest('[class*=col], .form-group').find('label');
        lbl.html(lbl.text().replace(/\n\r/, '').replace(/^\s+/, '').replace(/\s+$/, '')+'<sup></sup>');
    });
	$('#js-modal-lg:not(.transparent) .modal-body').find('.form-control:not([required])').each(function(){
		var lbl = $(this).closest('[class*=col], .form-group').find('label');
		lbl.html(lbl.text().replace(/\n\r/, '').replace(/^\s+/, '').replace(/\s+$/, '')+'<sup style="visibility:hidden"></sup>');
	});
    setTimeout(function(){
            // alert('');
            $('#js-modal-lg.modal.show').modalCenter();
            $('#js-modal.modal.show').modalCenter();
        },200);
});
$('.modal').on('hide.bs.modal', function (e) {
	$('.modal-image-bg').removeClass('modal-image-bg-transparent');
    try{
        $('.js-datepicker').datetimepicker('hide');
    }catch(e){}
});

$(window).on('resize', function(){
	$('.modal.show').modalCenter();
})

try{
$.ajaxSetup({
    complete:function(){
        setTimeout(function(){
            // alert('');
            $('#js-modal-lg.modal.show').modalCenter();
            $('#js-modal.modal.show').modalCenter();
        },200);
    }
});
}catch(e){}