function sendPostRequest(){
  var latitude = document.getElementById('lat').value;
  var longitude = document.getElementById('lon').value;
  var comment = document.getElementById('comment-request-complete').value;
  //alert(latitude + '||||'+ longitude +'||||'+ comment);
  var xmlhttp = new XMLHttpRequest();
  var data_send = {
    csrfmiddlewaretoken : encodeURIComponent(document.getElementsByName("csrfmiddlewaretoken")[0].value),
  };
  var variable_body = 'csrfmiddlewaretoken=' + data_send.csrfmiddlewaretoken + '&latitude=' + latitude + '&longitude=' + longitude +'&comment='+ comment +'&num_service=service-2';

  var request_answer = '&var_1='+ getCookie('service-2-check-ques-1');

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
  document.getElementById('property-address-input').value = '';
  document.getElementById('label-view-info-1').innerText = '';
  document.getElementById('comment-request-complete').value = '';
  document.getElementById('label-view-info-5').innerText = '';
  deleteCookie('service-2-check-ques-1');
  deleteCookie('service-2-comment');
}


document.addEventListener("DOMContentLoaded", function() {
  var cookie_input_1 = getCookie('service-2-check-ques-1');
  if (cookie_input_1 != undefined) {
    document.getElementById('property-address-input').value = cookie_input_1;
    document.getElementById('label-view-info-1').innerText = cookie_input_1;
  }
  var cookie_comment = getCookie('service-2-comment');
  if (cookie_comment != undefined) {
    document.getElementById('comment-request-complete').value = cookie_comment;
    document.getElementById('label-view-info-5').innerText = cookie_comment;
  }
});


function SelectElement(el){
  if (el.id == 'property-address-input'){
    document.getElementById('label-view-info-1').innerText = el.value;
    setCookie('service-2-check-ques-1', el.value, { expires: 60 * 60 * 24 * 30 });
  }
  if (el.id == 'comment-request-complete'){
    document.getElementById('label-view-info-5').innerText = el.value;
    setCookie('service-2-comment', el.value, { expires: 60 * 60 * 24 * 30 });
  }
}
