var GLOBAL_COOKIE_SAVE_PROPERTIES = { expires: 60 * 60 * 24 * 30 };

function sendPostRequest(){
  var latitude = document.getElementById('lat').value;
  var longitude = document.getElementById('lon').value;
  var comment = document.getElementById('comment-request-complete').value;
  //alert(latitude + '||||'+ longitude +'||||'+ comment);
  var xmlhttp = new XMLHttpRequest();
  var data_send = {
    csrfmiddlewaretoken : encodeURIComponent(document.getElementsByName("csrfmiddlewaretoken")[0].value),
  };
  var variable_body = 'csrfmiddlewaretoken=' + data_send.csrfmiddlewaretoken + '&latitude=' + latitude + '&longitude=' + longitude +'&comment='+ comment +'&num_service=service-4';

  var is_check_5_1 = getCookie('service-4-check-ques-5-1') == undefined ? 'NO' : getCookie('service-4-check-ques-5-1') == 'true' ? 'YES' : 'NO';
  var is_check_5_2 = getCookie('service-4-check-ques-5-2') == undefined ? 'NO' : getCookie('service-4-check-ques-5-2') == 'true' ? 'YES' : 'NO';
  var is_check_5_3 = getCookie('service-4-check-ques-5-3') == undefined ? 'NO' : getCookie('service-4-check-ques-5-3') == 'true' ? 'YES' : 'NO';

  var answer_5 = 'Have you been emplyed, or had a business income for the period of 2 years or more? <b class="bold-text-spec-profi">'+ is_check_5_1 +'</b> | Do you have a co-signer? <b class="bold-text-spec-profi">'+ is_check_5_2 +'</b> | Did you file for bankruptcy or had a foreclosure within last 2 years? <b class="bold-text-spec-profi">'+ is_check_5_3 +'</b>';

  var request_answer = '&var_1='+ getCookie('service-4-check-ques-1')+ '&var_2='+ getCookie('service-4-check-ques-2')+ '&var_3='+ getCookie('service-4-check-ques-3')+ '&var_4='+ getCookie('service-4-check-ques-4')+ '&var_5='+ answer_5;

  xmlhttp.open("POST", "/board/services/create-request/", true);
  xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  xmlhttp.send(variable_body + request_answer);
  xmlhttp.onreadystatechange = function(){
    if (xmlhttp.readyState != 4) return;
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
      window.location.href = xmlhttp.responseURL + 'thanks/';
    }
  }
  document.getElementById('spinner-create-request').style.display = 'inline-block';
}

function clearForm(){
  //var elements_radio_1 = document.getElementsByName('check_ques_1');
  //for(var i = 0; i < elements_radio_1.length; i++){
  //  if(elements_radio_1[i].checked) elements_radio_1[i].checked = false;
  //}
  document.getElementById('current-mortgage-amount').value = '';

  var elements_radio_1 = document.getElementsByName('check_ques_2');
  for(var i = 0; i < elements_radio_1.length; i++){
    if(elements_radio_1[i].checked) elements_radio_1[i].checked = false;
  }
  var elements_radio_1 = document.getElementsByName('check_ques_3');
  for(var i = 0; i < elements_radio_1.length; i++){
    if(elements_radio_1[i].checked) elements_radio_1[i].checked = false;
  }
  //var elements_radio_1 = document.getElementsByName('check_ques_4');
  //for(var i = 0; i < elements_radio_1.length; i++){
  //  if(elements_radio_1[i].checked) elements_radio_1[i].checked = false;
  //}
  document.getElementById('monthly-payment').value = '';

  document.getElementById('check-1-ques-5').checked = false;
  document.getElementById('check-2-ques-5').checked = false;
  document.getElementById('check-3-ques-5').checked = false;

  document.getElementById('comment-request-complete').value = '';



  document.getElementById('label-view-info-1').innerText = '';
  document.getElementById('label-view-info-2').innerText = '';
  document.getElementById('label-view-info-3').innerText = '';
  document.getElementById('label-view-info-4').innerText = '';
  document.getElementById('label-view-info-5').innerText = '';
  document.getElementById('label-view-info-6').innerText = '';

  deleteCookie('service-4-check-ques-1');
  deleteCookie('service-4-check-ques-2');
  deleteCookie('service-4-check-ques-3');
  deleteCookie('service-4-check-ques-4');
  deleteCookie('service-4-check-ques-5-1');
  deleteCookie('service-4-check-ques-5-2');
  deleteCookie('service-4-check-ques-5-3');
  deleteCookie('service-4-comment');
}


document.addEventListener("DOMContentLoaded", function() {
  //alert(document.cookie);
  var cookie_input_1 = getCookie('service-4-check-ques-1');
  if (cookie_input_1 != undefined) {
    document.getElementById('current-mortgage-amount').value = cookie_input_1;
    document.getElementById('label-view-info-1').innerText = cookie_input_1;
  }

  var elements_radio_2 = document.getElementsByName('check_ques_2');
  var saved_cookie_checked_2 = getCookie('service-4-check-ques-2');
  for(var i = 0; i < elements_radio_2.length; i++){
    if(elements_radio_2[i].value == saved_cookie_checked_2 && saved_cookie_checked_2 != undefined){
      elements_radio_2[i].checked = true;
      document.getElementById('label-view-info-2').innerText = saved_cookie_checked_2;
    }
  }
  var elements_radio_3 = document.getElementsByName('check_ques_3');
  var saved_cookie_checked_3 = getCookie('service-4-check-ques-3');
  for(var i = 0; i < elements_radio_3.length; i++){
    if(elements_radio_3[i].value == saved_cookie_checked_3 && saved_cookie_checked_3 != undefined){
      elements_radio_3[i].checked = true;
      document.getElementById('label-view-info-3').innerText = saved_cookie_checked_3;
    }
  }
  var cookie_input_4 = getCookie('service-4-check-ques-4');
  if (cookie_input_4 != undefined) {
    document.getElementById('monthly-payment').value = cookie_input_4;
    document.getElementById('label-view-info-4').innerText = cookie_input_4;
  }

  var sav_cookie_1 = getCookie('service-4-check-ques-5-1');
  document.getElementById('check-1-ques-5').checked = sav_cookie_1 == undefined ? false : sav_cookie_1 == 'true' ? true : null;
  var sav_cookie_2 = getCookie('service-4-check-ques-5-2');
  document.getElementById('check-2-ques-5').checked = sav_cookie_2 == undefined ? false : sav_cookie_2 == 'true' ? true : null;
  var sav_cookie_3 = getCookie('service-4-check-ques-5-3');
  document.getElementById('check-3-ques-5').checked = sav_cookie_3 == undefined ? false : sav_cookie_3 == 'true' ? true : null;




  var cookie_comment = getCookie('service-4-comment');
  if (cookie_comment != undefined) {
    document.getElementById('comment-request-complete').value = cookie_comment;
    document.getElementById('label-view-info-6').innerText = cookie_comment;
  }
});


function SelectElement(el){
  // Window 1
  if (el.id == 'current-mortgage-amount'){
    document.getElementById('label-view-info-1').innerText = el.value;
    setCookie('service-4-check-ques-1', el.value, GLOBAL_COOKIE_SAVE_PROPERTIES);
  }

  // Window 2
  if (el.name == 'check_ques_2'){
    document.getElementById('label-view-info-2').innerText = el.value;
    setCookie('service-4-check-ques-2', el.value, GLOBAL_COOKIE_SAVE_PROPERTIES);
  }
  // Window 3
  if (el.name == 'check_ques_3'){
    document.getElementById('label-view-info-3').innerText = el.value;
    setCookie('service-4-check-ques-3', el.value, GLOBAL_COOKIE_SAVE_PROPERTIES);
  }
  // Window 4
  if (el.id == 'monthly-payment'){
    document.getElementById('label-view-info-4').innerText = el.value;
    setCookie('service-4-check-ques-4', el.value, GLOBAL_COOKIE_SAVE_PROPERTIES);
  }
  // Window 5
  if (el.name == 'check-1-ques-5'){
    //Wiew in completed window <<
    if(el.checked)
      setCookie('service-4-check-ques-5-1', true, GLOBAL_COOKIE_SAVE_PROPERTIES);
    else
      setCookie('service-4-check-ques-5-1', false, GLOBAL_COOKIE_SAVE_PROPERTIES);
  }
  if (el.name == 'check-2-ques-5'){
    //Wiew in completed window <<
    if(el.checked)
      setCookie('service-4-check-ques-5-2', true, GLOBAL_COOKIE_SAVE_PROPERTIES);
    else
      setCookie('service-4-check-ques-5-2', false, GLOBAL_COOKIE_SAVE_PROPERTIES);
  }
  if (el.name == 'check-3-ques-5'){
    //Wiew in completed window <<
    if(el.checked)
      setCookie('service-4-check-ques-5-3', true, GLOBAL_COOKIE_SAVE_PROPERTIES);
    else
      setCookie('service-4-check-ques-5-3', false, GLOBAL_COOKIE_SAVE_PROPERTIES);
  }

  // Window comment
  if (el.id == 'comment-request-complete'){
    document.getElementById('label-view-info-6').innerText = el.value;
    setCookie('service-4-comment', el.value, GLOBAL_COOKIE_SAVE_PROPERTIES);
  }
}

  // function saveCookieRequest(){
  //   //var elements_radio_1 = document.getElementsByName('check_ques_1');
  //   //for(var i = 0; i < elements_radio_1.length; i++){
  //   //  if(elements_radio_1[i].checked){
  //   //    document.getElementById('label-view-info-1').innerText = elements_radio_1[i].value;
  //   //  }
  //   //}
  //   var elem_1_value = document.getElementById('input-address-put-1').value;
  //   document.getElementById('label-view-info-1').innerText = elem_1_value;

  //   var elements_radio_1 = document.getElementsByName('check_ques_2');
  //   for(var i = 0; i < elements_radio_1.length; i++){
  //     if(elements_radio_1[i].checked){
  //       document.getElementById('label-view-info-2').innerText = elements_radio_1[i].value;
  //     }
  //   }

  //   var elements_radio_1 = document.getElementsByName('check_ques_3');
  //   for(var i = 0; i < elements_radio_1.length; i++){
  //     if(elements_radio_1[i].checked){
  //       document.getElementById('label-view-info-3').innerText = elements_radio_1[i].value;
  //     }
  //   }

  //   var elements_radio_1 = document.getElementsByName('check_ques_4');
  //   for(var i = 0; i < elements_radio_1.length; i++){
  //     if(elements_radio_1[i].checked){
  //       document.getElementById('label-view-info-4').innerText = elements_radio_1[i].value;
  //     }
  //   }

  //   document.getElementById('label-view-info-5').innerText = document.getElementById('comment-request-complete').value;
  // }

  // function sendPostRequest(){
  //   var latitude = document.getElementById('lat').value;
  //   var longitude = document.getElementById('lon').value;
  //   var comment = document.getElementById('comment-request-complete').value;
  //   //alert(latitude + '||||'+ longitude +'||||'+ comment);
  //   var xmlhttp = new XMLHttpRequest();
  //   var data_send = {
  //     csrfmiddlewaretoken : encodeURIComponent(document.getElementsByName("csrfmiddlewaretoken")[0].value),
  //   };
  //   var variable_body = 'csrfmiddlewaretoken=' + data_send.csrfmiddlewaretoken + '&latitude=' + latitude + '&longitude=' + longitude +'&comment='+ comment +'&num_service=service-4';
  //   xmlhttp.open("POST", "{% url 'tender_start' %}", true);
  //   xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  //   xmlhttp.send(variable_body);
  //   xmlhttp.onreadystatechange = function(){
  //     if (xmlhttp.readyState != 4) return;
  //     if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
  //       window.location.href = xmlhttp.responseText;
  //     }
  //   }
  //   document.getElementById('spinner-create-request').style.display = 'inline-block';
  // }
