function sendPostRequest(){
  var latitude = document.getElementById('lat').value;
  var longitude = document.getElementById('lon').value;
  var comment = document.getElementById('comment-request-complete').value;
  //alert(latitude + '||||'+ longitude +'||||'+ comment);
  var xmlhttp = new XMLHttpRequest();
  var data_send = {
    csrfmiddlewaretoken : encodeURIComponent(document.getElementsByName("csrfmiddlewaretoken")[0].value),
  };
  var variable_body = 'csrfmiddlewaretoken=' + data_send.csrfmiddlewaretoken + '&latitude=' + latitude + '&longitude=' + longitude +'&comment='+ comment +'&num_service=service-1';

  var question_answered = '&var_1=' + getCookie('service-1-check-ques-1') + '&var_2='+ getCookie('service-1-check-ques-2')+ '&var_3='+ getCookie('service-1-check-ques-3')+ '&var_4='+ getCookie('service-1-check-ques-4');
  //alert(question_answered);

  xmlhttp.open("POST", "/board/services/create-request/", true);
  xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  xmlhttp.send(variable_body + question_answered);
  xmlhttp.onreadystatechange = function(){
    if (xmlhttp.readyState != 4) return;
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
      window.location.href = xmlhttp.responseURL + 'thanks/';
    }
  }
  document.getElementById('spinner-create-request').style.display = 'inline-block';
}

function clearForm(){
  var elements_radio_1 = document.getElementsByName('check_ques_1');
  for(var i = 0; i < elements_radio_1.length; i++){
    if(elements_radio_1[i].checked) elements_radio_1[i].checked = false;
  }
  var elements_radio_1 = document.getElementsByName('check_ques_2');
  for(var i = 0; i < elements_radio_1.length; i++){
    if(elements_radio_1[i].checked) elements_radio_1[i].checked = false;
  }
  var elements_radio_1 = document.getElementsByName('check_ques_3');
  for(var i = 0; i < elements_radio_1.length; i++){
    if(elements_radio_1[i].checked) elements_radio_1[i].checked = false;
  }
  var elements_radio_1 = document.getElementsByName('check_ques_4');
  for(var i = 0; i < elements_radio_1.length; i++){
    if(elements_radio_1[i].checked) elements_radio_1[i].checked = false;
  }
  document.getElementById('comment-request-complete').value = '';
  document.getElementById('label-view-info-1').innerText = '';
  document.getElementById('label-view-info-2').innerText = '';
  document.getElementById('label-view-info-3').innerText = '';
  document.getElementById('label-view-info-4').innerText = '';
  document.getElementById('label-view-info-5').innerText = '';

  deleteCookie('service-1-check-ques-1');
  deleteCookie('service-1-check-ques-2');
  deleteCookie('service-1-check-ques-3');
  deleteCookie('service-1-check-ques-4');
  deleteCookie('service-1-comment');
}


document.addEventListener("DOMContentLoaded", function() {
  //alert(document.cookie);
  var elements_radio_1 = document.getElementsByName('check_ques_1');
  var saved_cookie_checked_1 = getCookie('service-1-check-ques-1');
  for(var i = 0; i < elements_radio_1.length; i++){
    if(elements_radio_1[i].value == saved_cookie_checked_1 && saved_cookie_checked_1 != undefined){
      elements_radio_1[i].checked = true;
      document.getElementById('label-view-info-1').innerText = saved_cookie_checked_1;
    }
  }
  var elements_radio_2 = document.getElementsByName('check_ques_2');
  var saved_cookie_checked_2 = getCookie('service-1-check-ques-2');
  for(var i = 0; i < elements_radio_2.length; i++){
    if(elements_radio_2[i].value == saved_cookie_checked_2 && saved_cookie_checked_2 != undefined){
      elements_radio_2[i].checked = true;
      document.getElementById('label-view-info-2').innerText = saved_cookie_checked_2;
    }
  }
  var elements_radio_3 = document.getElementsByName('check_ques_3');
  var saved_cookie_checked_3 = getCookie('service-1-check-ques-3');
  for(var i = 0; i < elements_radio_3.length; i++){
    if(elements_radio_3[i].value == saved_cookie_checked_3 && saved_cookie_checked_3 != undefined){
      elements_radio_3[i].checked = true;
      document.getElementById('label-view-info-3').innerText = saved_cookie_checked_3;
    }
  }
  var elements_radio_4 = document.getElementsByName('check_ques_4');
  var saved_cookie_checked_4 = getCookie('service-1-check-ques-4');
  for(var i = 0; i < elements_radio_4.length; i++){
    if(elements_radio_4[i].value == saved_cookie_checked_4 && saved_cookie_checked_4 != undefined){
      elements_radio_4[i].checked = true;
      document.getElementById('label-view-info-4').innerText = saved_cookie_checked_4;
    }
  }
  var cookie_comment = getCookie('service-1-comment');
  if (cookie_comment != undefined) {
    document.getElementById('comment-request-complete').value = cookie_comment;
    document.getElementById('label-view-info-5').innerText = cookie_comment;
  }
});


function SelectElement(el){
  //alert(el.name);
  if (el.name == 'check_ques_1'){
    document.getElementById('label-view-info-1').innerText = el.value;
    setCookie('service-1-check-ques-1', el.value, { expires: 60 * 60 * 24 * 30 });
  }
  if (el.name == 'check_ques_2'){
    document.getElementById('label-view-info-2').innerText = el.value;
    setCookie('service-1-check-ques-2', el.value, { expires: 60 * 60 * 24 * 30 });
  }
  if (el.name == 'check_ques_3'){
    document.getElementById('label-view-info-3').innerText = el.value;
    setCookie('service-1-check-ques-3', el.value, { expires: 60 * 60 * 24 * 30 });
  }
  if (el.name == 'check_ques_4'){
    document.getElementById('label-view-info-4').innerText = el.value;
    setCookie('service-1-check-ques-4', el.value, { expires: 60 * 60 * 24 * 30 });
  }
  if (el.id == 'comment-request-complete'){
    document.getElementById('label-view-info-5').innerText = el.value;
    setCookie('service-1-comment', el.value, { expires: 60 * 60 * 24 * 30 });
  }
}
