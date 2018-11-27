;
    var SITE = {
        isAnonymous: false,
        userId: 1,
        playSoundNotification: false
    };
  
;/*!
 * @copyright Copyright &copy; Kartik Visweswaran, Krajee.com, 2014 - 2016
 * @version 1.3.4
 *
 * Date formatter utility library that allows formatting date/time variables or Date objects using PHP DateTime format.
 * @see http://php.net/manual/en/function.date.php
 *
 * For more JQuery plugins visit http://plugins.krajee.com
 * For more Yii related demos visit http://demos.krajee.com
 */var DateFormatter;!function(){"use strict";var t,e,r,n,a,u,i;u=864e5,i=3600,t=function(t,e){return"string"==typeof t&&"string"==typeof e&&t.toLowerCase()===e.toLowerCase()},e=function(t,r,n){var a=n||"0",u=t.toString();return u.length<r?e(a+u,r):u},r=function(t){var e,n;for(t=t||{},e=1;e<arguments.length;e++)if(n=arguments[e])for(var a in n)n.hasOwnProperty(a)&&("object"==typeof n[a]?r(t[a],n[a]):t[a]=n[a]);return t},n=function(t,e){for(var r=0;r<e.length;r++)if(e[r].toLowerCase()===t.toLowerCase())return r;return-1},a={dateSettings:{days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],meridiem:["AM","PM"],ordinal:function(t){var e=t%10,r={1:"st",2:"nd",3:"rd"};return 1!==Math.floor(t%100/10)&&r[e]?r[e]:"th"}},separators:/[ \-+\/\.T:@]/g,validParts:/[dDjlNSwzWFmMntLoYyaABgGhHisueTIOPZcrU]/g,intParts:/[djwNzmnyYhHgGis]/g,tzParts:/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,tzClip:/[^-+\dA-Z]/g},DateFormatter=function(t){var e=this,n=r(a,t);e.dateSettings=n.dateSettings,e.separators=n.separators,e.validParts=n.validParts,e.intParts=n.intParts,e.tzParts=n.tzParts,e.tzClip=n.tzClip},DateFormatter.prototype={constructor:DateFormatter,getMonth:function(t){var e,r=this;return e=n(t,r.dateSettings.monthsShort)+1,0===e&&(e=n(t,r.dateSettings.months)+1),e},parseDate:function(e,r){var n,a,u,i,s,o,c,f,l,h,d=this,g=!1,m=!1,p=d.dateSettings,y={date:null,year:null,month:null,day:null,hour:0,min:0,sec:0};if(!e)return null;if(e instanceof Date)return e;if("U"===r)return u=parseInt(e),u?new Date(1e3*u):e;switch(typeof e){case"number":return new Date(e);case"string":break;default:return null}if(n=r.match(d.validParts),!n||0===n.length)throw new Error("Invalid date format definition.");for(a=e.replace(d.separators,"\x00").split("\x00"),u=0;u<a.length;u++)switch(i=a[u],s=parseInt(i),n[u]){case"y":case"Y":if(!s)return null;l=i.length,y.year=2===l?parseInt((70>s?"20":"19")+i):s,g=!0;break;case"m":case"n":case"M":case"F":if(isNaN(s)){if(o=d.getMonth(i),!(o>0))return null;y.month=o}else{if(!(s>=1&&12>=s))return null;y.month=s}g=!0;break;case"d":case"j":if(!(s>=1&&31>=s))return null;y.day=s,g=!0;break;case"g":case"h":if(c=n.indexOf("a")>-1?n.indexOf("a"):n.indexOf("A")>-1?n.indexOf("A"):-1,h=a[c],c>-1)f=t(h,p.meridiem[0])?0:t(h,p.meridiem[1])?12:-1,s>=1&&12>=s&&f>-1?y.hour=s+f-1:s>=0&&23>=s&&(y.hour=s);else{if(!(s>=0&&23>=s))return null;y.hour=s}m=!0;break;case"G":case"H":if(!(s>=0&&23>=s))return null;y.hour=s,m=!0;break;case"i":if(!(s>=0&&59>=s))return null;y.min=s,m=!0;break;case"s":if(!(s>=0&&59>=s))return null;y.sec=s,m=!0}if(g===!0&&y.year&&y.month&&y.day)y.date=new Date(y.year,y.month-1,y.day,y.hour,y.min,y.sec,0);else{if(m!==!0)return null;y.date=new Date(0,0,0,y.hour,y.min,y.sec,0)}return y.date},guessDate:function(t,e){if("string"!=typeof t)return t;var r,n,a,u,i,s,o=this,c=t.replace(o.separators,"\x00").split("\x00"),f=/^[djmn]/g,l=e.match(o.validParts),h=new Date,d=0;if(!f.test(l[0]))return t;for(a=0;a<c.length;a++){if(d=2,i=c[a],s=parseInt(i.substr(0,2)),isNaN(s))return null;switch(a){case 0:"m"===l[0]||"n"===l[0]?h.setMonth(s-1):h.setDate(s);break;case 1:"m"===l[0]||"n"===l[0]?h.setDate(s):h.setMonth(s-1);break;case 2:if(n=h.getFullYear(),r=i.length,d=4>r?r:4,n=parseInt(4>r?n.toString().substr(0,4-r)+i:i.substr(0,4)),!n)return null;h.setFullYear(n);break;case 3:h.setHours(s);break;case 4:h.setMinutes(s);break;case 5:h.setSeconds(s)}u=i.substr(d),u.length>0&&c.splice(a+1,0,u)}return h},parseFormat:function(t,r){var n,a=this,s=a.dateSettings,o=/\\?(.?)/gi,c=function(t,e){return n[t]?n[t]():e};return n={d:function(){return e(n.j(),2)},D:function(){return s.daysShort[n.w()]},j:function(){return r.getDate()},l:function(){return s.days[n.w()]},N:function(){return n.w()||7},w:function(){return r.getDay()},z:function(){var t=new Date(n.Y(),n.n()-1,n.j()),e=new Date(n.Y(),0,1);return Math.round((t-e)/u)},W:function(){var t=new Date(n.Y(),n.n()-1,n.j()-n.N()+3),r=new Date(t.getFullYear(),0,4);return e(1+Math.round((t-r)/u/7),2)},F:function(){return s.months[r.getMonth()]},m:function(){return e(n.n(),2)},M:function(){return s.monthsShort[r.getMonth()]},n:function(){return r.getMonth()+1},t:function(){return new Date(n.Y(),n.n(),0).getDate()},L:function(){var t=n.Y();return t%4===0&&t%100!==0||t%400===0?1:0},o:function(){var t=n.n(),e=n.W(),r=n.Y();return r+(12===t&&9>e?1:1===t&&e>9?-1:0)},Y:function(){return r.getFullYear()},y:function(){return n.Y().toString().slice(-2)},a:function(){return n.A().toLowerCase()},A:function(){var t=n.G()<12?0:1;return s.meridiem[t]},B:function(){var t=r.getUTCHours()*i,n=60*r.getUTCMinutes(),a=r.getUTCSeconds();return e(Math.floor((t+n+a+i)/86.4)%1e3,3)},g:function(){return n.G()%12||12},G:function(){return r.getHours()},h:function(){return e(n.g(),2)},H:function(){return e(n.G(),2)},i:function(){return e(r.getMinutes(),2)},s:function(){return e(r.getSeconds(),2)},u:function(){return e(1e3*r.getMilliseconds(),6)},e:function(){var t=/\((.*)\)/.exec(String(r))[1];return t||"Coordinated Universal Time"},I:function(){var t=new Date(n.Y(),0),e=Date.UTC(n.Y(),0),r=new Date(n.Y(),6),a=Date.UTC(n.Y(),6);return t-e!==r-a?1:0},O:function(){var t=r.getTimezoneOffset(),n=Math.abs(t);return(t>0?"-":"+")+e(100*Math.floor(n/60)+n%60,4)},P:function(){var t=n.O();return t.substr(0,3)+":"+t.substr(3,2)},T:function(){var t=(String(r).match(a.tzParts)||[""]).pop().replace(a.tzClip,"");return t||"UTC"},Z:function(){return 60*-r.getTimezoneOffset()},c:function(){return"Y-m-d\\TH:i:sP".replace(o,c)},r:function(){return"D, d M Y H:i:s O".replace(o,c)},U:function(){return r.getTime()/1e3||0}},c(t,t)},formatDate:function(t,e){var r,n,a,u,i,s=this,o="",c="\\";if("string"==typeof t&&(t=s.parseDate(t,e),!t))return null;if(t instanceof Date){for(a=e.length,r=0;a>r;r++)i=e.charAt(r),"S"!==i&&i!==c&&(r>0&&e.charAt(r-1)===c?o+=i:(u=s.parseFormat(i,t),r!==a-1&&s.intParts.test(i)&&"S"===e.charAt(r+1)&&(n=parseInt(u)||0,u+=s.dateSettings.ordinal(n)),o+=u));return o}return""}}}();
/**
 * @preserve jQuery DateTimePicker
 * @homepage http://xdsoft.net/jqplugins/datetimepicker/
 * @author Chupurnov Valeriy (<chupurnov@gmail.com>)
 */

/**
 * @param {jQuery} $
 */
var datetimepickerFactory = function ($) {
  'use strict';

  var default_options  = {
    i18n: {
      ar: { // Arabic
        months: [
          "كانون الثاني", "شباط", "آذار", "نيسان", "مايو", "حزيران", "تموز", "آب", "أيلول", "تشرين الأول", "تشرين الثاني", "كانون الأول"
        ],
        dayOfWeekShort: [
          "ن", "ث", "ع", "خ", "ج", "س", "ح"
        ],
        dayOfWeek: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"]
      },
      ro: { // Romanian
        months: [
          "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"
        ],
        dayOfWeekShort: [
          "Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sâ"
        ],
        dayOfWeek: ["Duminică", "Luni", "Marţi", "Miercuri", "Joi", "Vineri", "Sâmbătă"]
      },
      id: { // Indonesian
        months: [
          "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ],
        dayOfWeekShort: [
          "Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"
        ],
        dayOfWeek: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
      },
      is: { // Icelandic
        months: [
          "Janúar", "Febrúar", "Mars", "Apríl", "Maí", "Júní", "Júlí", "Ágúst", "September", "Október", "Nóvember", "Desember"
        ],
        dayOfWeekShort: [
          "Sun", "Mán", "Þrið", "Mið", "Fim", "Fös", "Lau"
        ],
        dayOfWeek: ["Sunnudagur", "Mánudagur", "Þriðjudagur", "Miðvikudagur", "Fimmtudagur", "Föstudagur", "Laugardagur"]
      },
      bg: { // Bulgarian
        months: [
          "Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"
        ],
        dayOfWeekShort: [
          "Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"
        ],
        dayOfWeek: ["Неделя", "Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота"]
      },
      fa: { // Persian/Farsi
        months: [
          'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
        ],
        dayOfWeekShort: [
          'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'
        ],
        dayOfWeek: ["یک‌شنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه", "یک‌شنبه"]
      },
      ru: { // Russian
        months: [
          'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
        ],
        dayOfWeekShort: [
          "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"
        ],
        dayOfWeek: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
      },
      uk: { // Ukrainian
        months: [
          'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
        ],
        dayOfWeekShort: [
          "Ндл", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Сбт"
        ],
        dayOfWeek: ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"]
      },
      en: { // English
        months: [
          "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ],
        dayOfWeekShort: [
          "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
        ],
        dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      },
      el: { // Ελληνικά
        months: [
          "Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"
        ],
        dayOfWeekShort: [
          "Κυρ", "Δευ", "Τρι", "Τετ", "Πεμ", "Παρ", "Σαβ"
        ],
        dayOfWeek: ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"]
      },
      de: { // German
        months: [
          'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
        ],
        dayOfWeekShort: [
          "So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"
        ],
        dayOfWeek: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]
      },
      nl: { // Dutch
        months: [
          "januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"
        ],
        dayOfWeekShort: [
          "zo", "ma", "di", "wo", "do", "vr", "za"
        ],
        dayOfWeek: ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"]
      },
      tr: { // Turkish
        months: [
          "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
        ],
        dayOfWeekShort: [
          "Paz", "Pts", "Sal", "Çar", "Per", "Cum", "Cts"
        ],
        dayOfWeek: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"]
      },
      fr: { //French
        months: [
          "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
        ],
        dayOfWeekShort: [
          "Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"
        ],
        dayOfWeek: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"]
      },
      es: { // Spanish
        months: [
          "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ],
        dayOfWeekShort: [
          "Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"
        ],
        dayOfWeek: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
      },
      th: { // Thai
        months: [
          'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
        ],
        dayOfWeekShort: [
          'อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'
        ],
        dayOfWeek: ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์", "อาทิตย์"]
      },
      pl: { // Polish
        months: [
          "styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"
        ],
        dayOfWeekShort: [
          "nd", "pn", "wt", "śr", "cz", "pt", "sb"
        ],
        dayOfWeek: ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"]
      },
      pt: { // Portuguese
        months: [
          "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ],
        dayOfWeekShort: [
          "Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"
        ],
        dayOfWeek: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
      },
      ch: { // Simplified Chinese
        months: [
          "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"
        ],
        dayOfWeekShort: [
          "日", "一", "二", "三", "四", "五", "六"
        ]
      },
      se: { // Swedish
        months: [
          "Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September",  "Oktober", "November", "December"
        ],
        dayOfWeekShort: [
          "Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"
        ]
      },
      km: { // Khmer (ភាសាខ្មែរ)
        months: [
          "មករា​", "កុម្ភៈ", "មិនា​", "មេសា​", "ឧសភា​", "មិថុនា​", "កក្កដា​", "សីហា​", "កញ្ញា​", "តុលា​", "វិច្ឆិកា", "ធ្នូ​"
        ],
        dayOfWeekShort: ["អាទិ​", "ច័ន្ទ​", "អង្គារ​", "ពុធ​", "ព្រហ​​", "សុក្រ​", "សៅរ៍"],
        dayOfWeek: ["អាទិត្យ​", "ច័ន្ទ​", "អង្គារ​", "ពុធ​", "ព្រហស្បតិ៍​", "សុក្រ​", "សៅរ៍"]
      },
      kr: { // Korean
        months: [
          "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"
        ],
        dayOfWeekShort: [
          "일", "월", "화", "수", "목", "금", "토"
        ],
        dayOfWeek: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]
      },
      it: { // Italian
        months: [
          "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
        ],
        dayOfWeekShort: [
          "Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"
        ],
        dayOfWeek: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"]
      },
      da: { // Dansk
        months: [
          "Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"
        ],
        dayOfWeekShort: [
          "Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"
        ],
        dayOfWeek: ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"]
      },
      no: { // Norwegian
        months: [
          "Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"
        ],
        dayOfWeekShort: [
          "Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"
        ],
        dayOfWeek: ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag']
      },
      ja: { // Japanese
        months: [
          "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"
        ],
        dayOfWeekShort: [
          "日", "月", "火", "水", "木", "金", "土"
        ],
        dayOfWeek: ["日曜", "月曜", "火曜", "水曜", "木曜", "金曜", "土曜"]
      },
      vi: { // Vietnamese
        months: [
          "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
        ],
        dayOfWeekShort: [
          "CN", "T2", "T3", "T4", "T5", "T6", "T7"
        ],
        dayOfWeek: ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"]
      },
      sl: { // Slovenščina
        months: [
          "Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"
        ],
        dayOfWeekShort: [
          "Ned", "Pon", "Tor", "Sre", "Čet", "Pet", "Sob"
        ],
        dayOfWeek: ["Nedelja", "Ponedeljek", "Torek", "Sreda", "Četrtek", "Petek", "Sobota"]
      },
      cs: { // Čeština
        months: [
          "Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"
        ],
        dayOfWeekShort: [
          "Ne", "Po", "Út", "St", "Čt", "Pá", "So"
        ]
      },
      hu: { // Hungarian
        months: [
          "Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"
        ],
        dayOfWeekShort: [
          "Va", "Hé", "Ke", "Sze", "Cs", "Pé", "Szo"
        ],
        dayOfWeek: ["vasárnap", "hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat"]
      },
      az: { //Azerbaijanian (Azeri)
        months: [
          "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"
        ],
        dayOfWeekShort: [
          "B", "Be", "Ça", "Ç", "Ca", "C", "Ş"
        ],
        dayOfWeek: ["Bazar", "Bazar ertəsi", "Çərşənbə axşamı", "Çərşənbə", "Cümə axşamı", "Cümə", "Şənbə"]
      },
      bs: { //Bosanski
        months: [
          "Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"
        ],
        dayOfWeekShort: [
          "Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"
        ],
        dayOfWeek: ["Nedjelja","Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"]
      },
      ca: { //Català
        months: [
          "Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"
        ],
        dayOfWeekShort: [
          "Dg", "Dl", "Dt", "Dc", "Dj", "Dv", "Ds"
        ],
        dayOfWeek: ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"]
      },
      'en-GB': { //English (British)
        months: [
          "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ],
        dayOfWeekShort: [
          "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
        ],
        dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      },
      et: { //"Eesti"
        months: [
          "Jaanuar", "Veebruar", "Märts", "Aprill", "Mai", "Juuni", "Juuli", "August", "September", "Oktoober", "November", "Detsember"
        ],
        dayOfWeekShort: [
          "P", "E", "T", "K", "N", "R", "L"
        ],
        dayOfWeek: ["Pühapäev", "Esmaspäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev"]
      },
      eu: { //Euskara
        months: [
          "Urtarrila", "Otsaila", "Martxoa", "Apirila", "Maiatza", "Ekaina", "Uztaila", "Abuztua", "Iraila", "Urria", "Azaroa", "Abendua"
        ],
        dayOfWeekShort: [
          "Ig.", "Al.", "Ar.", "Az.", "Og.", "Or.", "La."
        ],
        dayOfWeek: ['Igandea', 'Astelehena', 'Asteartea', 'Asteazkena', 'Osteguna', 'Ostirala', 'Larunbata']
      },
      fi: { //Finnish (Suomi)
        months: [
          "Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"
        ],
        dayOfWeekShort: [
          "Su", "Ma", "Ti", "Ke", "To", "Pe", "La"
        ],
        dayOfWeek: ["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai"]
      },
      gl: { //Galego
        months: [
          "Xan", "Feb", "Maz", "Abr", "Mai", "Xun", "Xul", "Ago", "Set", "Out", "Nov", "Dec"
        ],
        dayOfWeekShort: [
          "Dom", "Lun", "Mar", "Mer", "Xov", "Ven", "Sab"
        ],
        dayOfWeek: ["Domingo", "Luns", "Martes", "Mércores", "Xoves", "Venres", "Sábado"]
      },
      hr: { //Hrvatski
        months: [
          "Siječanj", "Veljača", "Ožujak", "Travanj", "Svibanj", "Lipanj", "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac"
        ],
        dayOfWeekShort: [
          "Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"
        ],
        dayOfWeek: ["Nedjelja", "Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"]
      },
      ko: { //Korean (한국어)
        months: [
          "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"
        ],
        dayOfWeekShort: [
          "일", "월", "화", "수", "목", "금", "토"
        ],
        dayOfWeek: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]
      },
      lt: { //Lithuanian (lietuvių)
        months: [
          "Sausio", "Vasario", "Kovo", "Balandžio", "Gegužės", "Birželio", "Liepos", "Rugpjūčio", "Rugsėjo", "Spalio", "Lapkričio", "Gruodžio"
        ],
        dayOfWeekShort: [
          "Sek", "Pir", "Ant", "Tre", "Ket", "Pen", "Šeš"
        ],
        dayOfWeek: ["Sekmadienis", "Pirmadienis", "Antradienis", "Trečiadienis", "Ketvirtadienis", "Penktadienis", "Šeštadienis"]
      },
      lv: { //Latvian (Latviešu)
        months: [
          "Janvāris", "Februāris", "Marts", "Aprīlis ", "Maijs", "Jūnijs", "Jūlijs", "Augusts", "Septembris", "Oktobris", "Novembris", "Decembris"
        ],
        dayOfWeekShort: [
          "Sv", "Pr", "Ot", "Tr", "Ct", "Pk", "St"
        ],
        dayOfWeek: ["Svētdiena", "Pirmdiena", "Otrdiena", "Trešdiena", "Ceturtdiena", "Piektdiena", "Sestdiena"]
      },
      mk: { //Macedonian (Македонски)
        months: [
          "јануари", "февруари", "март", "април", "мај", "јуни", "јули", "август", "септември", "октомври", "ноември", "декември"
        ],
        dayOfWeekShort: [
          "нед", "пон", "вто", "сре", "чет", "пет", "саб"
        ],
        dayOfWeek: ["Недела", "Понеделник", "Вторник", "Среда", "Четврток", "Петок", "Сабота"]
      },
      mn: { //Mongolian (Монгол)
        months: [
          "1-р сар", "2-р сар", "3-р сар", "4-р сар", "5-р сар", "6-р сар", "7-р сар", "8-р сар", "9-р сар", "10-р сар", "11-р сар", "12-р сар"
        ],
        dayOfWeekShort: [
          "Дав", "Мяг", "Лха", "Пүр", "Бсн", "Бям", "Ням"
        ],
        dayOfWeek: ["Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан", "Бямба", "Ням"]
      },
      'pt-BR': { //Português(Brasil)
        months: [
          "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ],
        dayOfWeekShort: [
          "Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"
        ],
        dayOfWeek: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
      },
      sk: { //Slovenčina
        months: [
          "Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"
        ],
        dayOfWeekShort: [
          "Ne", "Po", "Ut", "St", "Št", "Pi", "So"
        ],
        dayOfWeek: ["Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"]
      },
      sq: { //Albanian (Shqip)
        months: [
          "Janar", "Shkurt", "Mars", "Prill", "Maj", "Qershor", "Korrik", "Gusht", "Shtator", "Tetor", "Nëntor", "Dhjetor"
        ],
        dayOfWeekShort: [
          "Die", "Hën", "Mar", "Mër", "Enj", "Pre", "Shtu"
        ],
        dayOfWeek: ["E Diel", "E Hënë", "E Martē", "E Mërkurë", "E Enjte", "E Premte", "E Shtunë"]
      },
      'sr-YU': { //Serbian (Srpski)
        months: [
          "Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"
        ],
        dayOfWeekShort: [
          "Ned", "Pon", "Uto", "Sre", "čet", "Pet", "Sub"
        ],
        dayOfWeek: ["Nedelja","Ponedeljak", "Utorak", "Sreda", "Četvrtak", "Petak", "Subota"]
      },
      sr: { //Serbian Cyrillic (Српски)
        months: [
          "јануар", "фебруар", "март", "април", "мај", "јун", "јул", "август", "септембар", "октобар", "новембар", "децембар"
        ],
        dayOfWeekShort: [
          "нед", "пон", "уто", "сре", "чет", "пет", "суб"
        ],
        dayOfWeek: ["Недеља","Понедељак", "Уторак", "Среда", "Четвртак", "Петак", "Субота"]
      },
      sv: { //Svenska
        months: [
          "Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"
        ],
        dayOfWeekShort: [
          "Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"
        ],
        dayOfWeek: ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"]
      },
      'zh-TW': { //Traditional Chinese (繁體中文)
        months: [
          "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"
        ],
        dayOfWeekShort: [
          "日", "一", "二", "三", "四", "五", "六"
        ],
        dayOfWeek: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
      },
      zh: { //Simplified Chinese (简体中文)
        months: [
          "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"
        ],
        dayOfWeekShort: [
          "日", "一", "二", "三", "四", "五", "六"
        ],
        dayOfWeek: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
      },
      ug:{ // Uyghur(ئۇيغۇرچە)
        months: [
          "1-ئاي","2-ئاي","3-ئاي","4-ئاي","5-ئاي","6-ئاي","7-ئاي","8-ئاي","9-ئاي","10-ئاي","11-ئاي","12-ئاي"
        ],
        dayOfWeek: [
          "يەكشەنبە", "دۈشەنبە","سەيشەنبە","چارشەنبە","پەيشەنبە","جۈمە","شەنبە"
        ]
      },
      he: { //Hebrew (עברית)
        months: [
          'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
        ],
        dayOfWeekShort: [
          'א\'', 'ב\'', 'ג\'', 'ד\'', 'ה\'', 'ו\'', 'שבת'
        ],
        dayOfWeek: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת", "ראשון"]
      },
      hy: { // Armenian
        months: [
          "Հունվար", "Փետրվար", "Մարտ", "Ապրիլ", "Մայիս", "Հունիս", "Հուլիս", "Օգոստոս", "Սեպտեմբեր", "Հոկտեմբեր", "Նոյեմբեր", "Դեկտեմբեր"
        ],
        dayOfWeekShort: [
          "Կի", "Երկ", "Երք", "Չոր", "Հնգ", "Ուրբ", "Շբթ"
        ],
        dayOfWeek: ["Կիրակի", "Երկուշաբթի", "Երեքշաբթի", "Չորեքշաբթի", "Հինգշաբթի", "Ուրբաթ", "Շաբաթ"]
      },
      kg: { // Kyrgyz
        months: [
          'Үчтүн айы', 'Бирдин айы', 'Жалган Куран', 'Чын Куран', 'Бугу', 'Кулжа', 'Теке', 'Баш Оона', 'Аяк Оона', 'Тогуздун айы', 'Жетинин айы', 'Бештин айы'
        ],
        dayOfWeekShort: [
          "Жек", "Дүй", "Шей", "Шар", "Бей", "Жум", "Ише"
        ],
        dayOfWeek: [
          "Жекшемб", "Дүйшөмб", "Шейшемб", "Шаршемб", "Бейшемби", "Жума", "Ишенб"
        ]
      },
      rm: { // Romansh
        months: [
          "Schaner", "Favrer", "Mars", "Avrigl", "Matg", "Zercladur", "Fanadur", "Avust", "Settember", "October", "November", "December"
        ],
        dayOfWeekShort: [
          "Du", "Gli", "Ma", "Me", "Gie", "Ve", "So"
        ],
        dayOfWeek: [
          "Dumengia", "Glindesdi", "Mardi", "Mesemna", "Gievgia", "Venderdi", "Sonda"
        ]
      },
      ka: { // Georgian
        months: [
          'იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი', 'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'
        ],
        dayOfWeekShort: [
          "კვ", "ორშ", "სამშ", "ოთხ", "ხუთ", "პარ", "შაბ"
        ],
        dayOfWeek: ["კვირა", "ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "შაბათი"]
      }
    },

    ownerDocument: document,
    contentWindow: window,

    value: '',
    rtl: false,

    format: 'Y/m/d H:i',
    formatTime: 'H:i',
    formatDate: 'Y/m/d',

    startDate:  false, // new Date(), '1986/12/08', '-1970/01/05','-1970/01/05',
    step: 60,
    monthChangeSpinner: true,

    closeOnDateSelect: false,
    closeOnTimeSelect: true,
    closeOnWithoutClick: true,
    closeOnInputClick: true,
    openOnFocus: true,

    timepicker: true,
    datepicker: true,
    weeks: false,

    defaultTime: false, // use formatTime format (ex. '10:00' for formatTime: 'H:i')
    defaultDate: false, // use formatDate format (ex new Date() or '1986/12/08' or '-1970/01/05' or '-1970/01/05')

    minDate: false,
    maxDate: false,
    minTime: false,
    maxTime: false,
        minDateTime: false,

    disabledMinTime: false,
    disabledMaxTime: false,

    allowTimes: [],
    opened: false,
    initTime: true,
    inline: false,
    theme: '',
    touchMovedThreshold: 5,

    onSelectDate: function () {},
    onSelectTime: function () {},
    onChangeMonth: function () {},
    onGetWeekOfYear: function () {},
    onChangeYear: function () {},
    onChangeDateTime: function () {},
    onShow: function () {},
    onClose: function () {},
    onGenerate: function () {},

    withoutCopyright: true,
    inverseButton: false,
    hours12: false,
    next: 'xdsoft_next',
    prev : 'xdsoft_prev',
    dayOfWeekStart: 0,
    parentID: 'body',
    timeHeightInTimePicker: 25,
    timepickerScrollbar: true,
    todayButton: true,
    prevButton: true,
    nextButton: true,
    defaultSelect: true,

    scrollMonth: true,
    scrollTime: true,
    scrollInput: true,

    lazyInit: false,
    mask: false,
    validateOnBlur: true,
    allowBlank: true,
    yearStart: 1950,
    yearEnd: 2050,
    monthStart: 0,
    monthEnd: 11,
    style: '',
    id: '',
    fixed: false,
    roundTime: 'round', // ceil, floor
    className: '',
    weekends: [],
    highlightedDates: [],
    highlightedPeriods: [],
    allowDates : [],
    allowDateRe : null,
    disabledDates : [],
    disabledWeekDays: [],
    yearOffset: 0,
    beforeShowDay: null,

    enterLikeTab: true,
    showApplyButton: false
  };

  var dateHelper = null,
    globalLocaleDefault = 'en',
    globalLocale = 'en';

  var dateFormatterOptionsDefault = {
    meridiem: ['AM', 'PM']
  };

  var initDateFormatter = function(){
    var locale = default_options.i18n[globalLocale],
      opts = {
        days: locale.dayOfWeek,
        daysShort: locale.dayOfWeekShort,
        months: locale.months,
        monthsShort: $.map(locale.months, function(n){ return n.substring(0, 3) })
      };

    if (typeof DateFormatter === 'function') {
      dateHelper = new DateFormatter({
        dateSettings: $.extend({}, dateFormatterOptionsDefault, opts)
      });
    }
  };

  // for locale settings
  $.datetimepicker = {
    setLocale: function(locale){
      var newLocale = default_options.i18n[locale] ? locale : globalLocaleDefault;
      if (globalLocale !== newLocale) {
        globalLocale = newLocale;
        // reinit date formatter
        initDateFormatter();
      }
    },

    setDateFormatter: function(dateFormatter) {
      dateHelper = dateFormatter;
    },

    RFC_2822: 'D, d M Y H:i:s O',
    ATOM: 'Y-m-d\TH:i:sP',
    ISO_8601: 'Y-m-d\TH:i:sO',
    RFC_822: 'D, d M y H:i:s O',
    RFC_850: 'l, d-M-y H:i:s T',
    RFC_1036: 'D, d M y H:i:s O',
    RFC_1123: 'D, d M Y H:i:s O',
    RSS: 'D, d M Y H:i:s O',
    W3C: 'Y-m-d\TH:i:sP'
  };

  // first init date formatter
  initDateFormatter();

  // fix for ie8
  if (!window.getComputedStyle) {
    window.getComputedStyle = function (el) {
      this.el = el;
      this.getPropertyValue = function (prop) {
        var re = /(-([a-z]))/g;
        if (prop === 'float') {
          prop = 'styleFloat';
        }
        if (re.test(prop)) {
          prop = prop.replace(re, function (a, b, c) {
            return c.toUpperCase();
          });
        }
        return el.currentStyle[prop] || null;
      };
      return this;
    };
  }
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (obj, start) {
      var i, j;
      for (i = (start || 0), j = this.length; i < j; i += 1) {
        if (this[i] === obj) { return i; }
      }
      return -1;
    };
  }

  Date.prototype.countDaysInMonth = function () {
    return new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate();
  };

  $.fn.xdsoftScroller = function (options, percent) {
    return this.each(function () {
      var timeboxparent = $(this),
        pointerEventToXY = function (e) {
          var out = {x: 0, y: 0},
            touch;
          if (e.type === 'touchstart' || e.type === 'touchmove' || e.type === 'touchend' || e.type === 'touchcancel') {
            touch  = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            out.x = touch.clientX;
            out.y = touch.clientY;
          } else if (e.type === 'mousedown' || e.type === 'mouseup' || e.type === 'mousemove' || e.type === 'mouseover' || e.type === 'mouseout' || e.type === 'mouseenter' || e.type === 'mouseleave') {
            out.x = e.clientX;
            out.y = e.clientY;
          }
          return out;
        },
        timebox,
        parentHeight,
        height,
        scrollbar,
        scroller,
        maximumOffset = 100,
        start = false,
        startY = 0,
        startTop = 0,
        h1 = 0,
        touchStart = false,
        startTopScroll = 0,
        calcOffset = function () {};

      if (percent === 'hide') {
        timeboxparent.find('.xdsoft_scrollbar').hide();
        return;
      }

      if (!$(this).hasClass('xdsoft_scroller_box')) {
        timebox = timeboxparent.children().eq(0);
        parentHeight = timeboxparent[0].clientHeight;
        height = timebox[0].offsetHeight;
        scrollbar = $('<div class="xdsoft_scrollbar"></div>');
        scroller = $('<div class="xdsoft_scroller"></div>');
        scrollbar.append(scroller);

        timeboxparent.addClass('xdsoft_scroller_box').append(scrollbar);
        calcOffset = function calcOffset(event) {
          var offset = pointerEventToXY(event).y - startY + startTopScroll;
          if (offset < 0) {
            offset = 0;
          }
          if (offset + scroller[0].offsetHeight > h1) {
            offset = h1 - scroller[0].offsetHeight;
          }
          timeboxparent.trigger('scroll_element.xdsoft_scroller', [maximumOffset ? offset / maximumOffset : 0]);
        };

        scroller
          .on('touchstart.xdsoft_scroller mousedown.xdsoft_scroller', function (event) {
            if (!parentHeight) {
              timeboxparent.trigger('resize_scroll.xdsoft_scroller', [percent]);
            }

            startY = pointerEventToXY(event).y;
            startTopScroll = parseInt(scroller.css('margin-top'), 10);
            h1 = scrollbar[0].offsetHeight;

            if (event.type === 'mousedown' || event.type === 'touchstart') {
              if (options.ownerDocument) {
                $(options.ownerDocument.body).addClass('xdsoft_noselect');
              }
              $([options.ownerDocument.body, options.contentWindow]).on('touchend mouseup.xdsoft_scroller', function arguments_callee() {
                $([options.ownerDocument.body, options.contentWindow]).off('touchend mouseup.xdsoft_scroller', arguments_callee)
                  .off('mousemove.xdsoft_scroller', calcOffset)
                  .removeClass('xdsoft_noselect');
              });
              $(options.ownerDocument.body).on('mousemove.xdsoft_scroller', calcOffset);
            } else {
              touchStart = true;
              event.stopPropagation();
              event.preventDefault();
            }
          })
          .on('touchmove', function (event) {
            if (touchStart) {
              event.preventDefault();
              calcOffset(event);
            }
          })
          .on('touchend touchcancel', function () {
            touchStart =  false;
            startTopScroll = 0;
          });

        timeboxparent
          .on('scroll_element.xdsoft_scroller', function (event, percentage) {
            if (!parentHeight) {
              timeboxparent.trigger('resize_scroll.xdsoft_scroller', [percentage, true]);
            }
            percentage = percentage > 1 ? 1 : (percentage < 0 || isNaN(percentage)) ? 0 : percentage;

            scroller.css('margin-top', maximumOffset * percentage);

            setTimeout(function () {
              timebox.css('marginTop', -parseInt((timebox[0].offsetHeight - parentHeight) * percentage, 10));
            }, 10);
          })
          .on('resize_scroll.xdsoft_scroller', function (event, percentage, noTriggerScroll) {
            var percent, sh;
            parentHeight = timeboxparent[0].clientHeight;
            height = timebox[0].offsetHeight;
            percent = parentHeight / height;
            sh = percent * scrollbar[0].offsetHeight;
            if (percent > 1) {
              scroller.hide();
            } else {
              scroller.show();
              scroller.css('height', parseInt(sh > 10 ? sh : 10, 10));
              maximumOffset = scrollbar[0].offsetHeight - scroller[0].offsetHeight;
              if (noTriggerScroll !== true) {
                timeboxparent.trigger('scroll_element.xdsoft_scroller', [percentage || Math.abs(parseInt(timebox.css('marginTop'), 10)) / (height - parentHeight)]);
              }
            }
          });

        timeboxparent.on('mousewheel', function (event) {
          var top = Math.abs(parseInt(timebox.css('marginTop'), 10));

          top = top - (event.deltaY * 20);
          if (top < 0) {
            top = 0;
          }

          timeboxparent.trigger('scroll_element.xdsoft_scroller', [top / (height - parentHeight)]);
          event.stopPropagation();
          return false;
        });

        timeboxparent.on('touchstart', function (event) {
          start = pointerEventToXY(event);
          startTop = Math.abs(parseInt(timebox.css('marginTop'), 10));
        });

        timeboxparent.on('touchmove', function (event) {
          if (start) {
            event.preventDefault();
            var coord = pointerEventToXY(event);
            timeboxparent.trigger('scroll_element.xdsoft_scroller', [(startTop - (coord.y - start.y)) / (height - parentHeight)]);
          }
        });

        timeboxparent.on('touchend touchcancel', function () {
          start = false;
          startTop = 0;
        });
      }
      timeboxparent.trigger('resize_scroll.xdsoft_scroller', [percent]);
    });
  };

  $.fn.datetimepicker = function (opt, opt2) {
    var result = this,
      KEY0 = 48,
      KEY9 = 57,
      _KEY0 = 96,
      _KEY9 = 105,
      CTRLKEY = 17,
      DEL = 46,
      ENTER = 13,
      ESC = 27,
      BACKSPACE = 8,
      ARROWLEFT = 37,
      ARROWUP = 38,
      ARROWRIGHT = 39,
      ARROWDOWN = 40,
      TAB = 9,
      F5 = 116,
      AKEY = 65,
      CKEY = 67,
      VKEY = 86,
      ZKEY = 90,
      YKEY = 89,
      ctrlDown  = false,
      options = ($.isPlainObject(opt) || !opt) ? $.extend(true, {}, default_options, opt) : $.extend(true, {}, default_options),

      lazyInitTimer = 0,
      createDateTimePicker,
      destroyDateTimePicker,

      lazyInit = function (input) {
        input
          .on('open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart', function initOnActionCallback() {
            if (input.is(':disabled') || input.data('xdsoft_datetimepicker')) {
              return;
            }
            clearTimeout(lazyInitTimer);
            lazyInitTimer = setTimeout(function () {

              if (!input.data('xdsoft_datetimepicker')) {
                createDateTimePicker(input);
              }
              input
                .off('open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart', initOnActionCallback)
                .trigger('open.xdsoft');
            }, 100);
          });
      };

    createDateTimePicker = function (input) {
      var datetimepicker = $('<div class="xdsoft_datetimepicker xdsoft_noselect"></div>'),
        xdsoft_copyright = $('<div class="xdsoft_copyright"><a target="_blank" href="http://xdsoft.net/jqplugins/datetimepicker/">xdsoft.net</a></div>'),
        datepicker = $('<div class="xdsoft_datepicker active"></div>'),
        month_picker = $('<div class="xdsoft_monthpicker"><button type="button" class="xdsoft_prev"></button><button type="button" class="xdsoft_today_button"></button>' +
          '<div class="xdsoft_label xdsoft_month"><span></span><i></i></div>' +
          '<div class="xdsoft_label xdsoft_year"><span></span><i></i></div>' +
          '<button type="button" class="xdsoft_next"></button></div>'),
        calendar = $('<div class="xdsoft_calendar"></div>'),
        timepicker = $('<div class="xdsoft_timepicker active"><button type="button" class="xdsoft_prev"></button><div class="xdsoft_time_box"></div><button type="button" class="xdsoft_next"></button></div>'),
        timeboxparent = timepicker.find('.xdsoft_time_box').eq(0),
        timebox = $('<div class="xdsoft_time_variant"></div>'),
        applyButton = $('<button type="button" class="xdsoft_save_selected blue-gradient-button">Save Selected</button>'),

        monthselect = $('<div class="xdsoft_select xdsoft_monthselect"><div></div></div>'),
        yearselect = $('<div class="xdsoft_select xdsoft_yearselect"><div></div></div>'),
        triggerAfterOpen = false,
        XDSoft_datetime,

        xchangeTimer,
        timerclick,
        current_time_index,
        setPos,
        timer = 0,
        _xdsoft_datetime,
        forEachAncestorOf;

      if (options.id) {
        datetimepicker.attr('id', options.id);
      }
      if (options.style) {
        datetimepicker.attr('style', options.style);
      }
      if (options.weeks) {
        datetimepicker.addClass('xdsoft_showweeks');
      }
      if (options.rtl) {
        datetimepicker.addClass('xdsoft_rtl');
      }

      datetimepicker.addClass('xdsoft_' + options.theme);
      datetimepicker.addClass(options.className);

      month_picker
        .find('.xdsoft_month span')
        .after(monthselect);
      month_picker
        .find('.xdsoft_year span')
        .after(yearselect);

      month_picker
        .find('.xdsoft_month,.xdsoft_year')
        .on('touchstart mousedown.xdsoft', function (event) {
          var select = $(this).find('.xdsoft_select').eq(0),
            val = 0,
            top = 0,
            visible = select.is(':visible'),
            items,
            i;

          month_picker
            .find('.xdsoft_select')
            .hide();
          if (_xdsoft_datetime.currentTime) {
            val = _xdsoft_datetime.currentTime[$(this).hasClass('xdsoft_month') ? 'getMonth' : 'getFullYear']();
          }

          select[visible ? 'hide' : 'show']();
          for (items = select.find('div.xdsoft_option'), i = 0; i < items.length; i += 1) {
            if (items.eq(i).data('value') === val) {
              break;
            } else {
              top += items[0].offsetHeight;
            }
          }

          select.xdsoftScroller(options, top / (select.children()[0].offsetHeight - (select[0].clientHeight)));
          event.stopPropagation();
          return false;
        });

      var handleTouchMoved = function (event) {
        this.touchStartPosition = this.touchStartPosition || event.originalEvent.touches[0]
        var touchPosition = event.originalEvent.touches[0]
        var xMovement = Math.abs(this.touchStartPosition.clientX - touchPosition.clientX)
        var yMovement = Math.abs(this.touchStartPosition.clientY - touchPosition.clientY)
        var distance = Math.sqrt(xMovement * xMovement + yMovement * yMovement)
        if(distance > options.touchMovedThreshold) {
          this.touchMoved = true;
        }
      }

      month_picker
        .find('.xdsoft_select')
        .xdsoftScroller(options)
        .on('touchstart mousedown.xdsoft', function (event) {
          this.touchMoved = false;
          this.touchStartPosition = event.originalEvent.touches[0]
          event.stopPropagation();
          event.preventDefault();
        })
        .on('touchmove', '.xdsoft_option', handleTouchMoved)
        .on('touchend mousedown.xdsoft', '.xdsoft_option', function () {
          if (!this.touchMoved) {
            if (_xdsoft_datetime.currentTime === undefined || _xdsoft_datetime.currentTime === null) {
              _xdsoft_datetime.currentTime = _xdsoft_datetime.now();
            }

            var year = _xdsoft_datetime.currentTime.getFullYear();
            if (_xdsoft_datetime && _xdsoft_datetime.currentTime) {
              _xdsoft_datetime.currentTime[$(this).parent().parent().hasClass('xdsoft_monthselect') ? 'setMonth' : 'setFullYear']($(this).data('value'));
            }

            $(this).parent().parent().hide();

            datetimepicker.trigger('xchange.xdsoft');
            if (options.onChangeMonth && $.isFunction(options.onChangeMonth)) {
              options.onChangeMonth.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
            }

            if (year !== _xdsoft_datetime.currentTime.getFullYear() && $.isFunction(options.onChangeYear)) {
              options.onChangeYear.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
            }
          }
        });

      datetimepicker.getValue = function () {
        return _xdsoft_datetime.getCurrentTime();
      };

      datetimepicker.setOptions = function (_options) {
        var highlightedDates = {};

        options = $.extend(true, {}, options, _options);

        if (_options.allowTimes && $.isArray(_options.allowTimes) && _options.allowTimes.length) {
          options.allowTimes = $.extend(true, [], _options.allowTimes);
        }

        if (_options.weekends && $.isArray(_options.weekends) && _options.weekends.length) {
          options.weekends = $.extend(true, [], _options.weekends);
        }

        if (_options.allowDates && $.isArray(_options.allowDates) && _options.allowDates.length) {
          options.allowDates = $.extend(true, [], _options.allowDates);
        }

        if (_options.allowDateRe && Object.prototype.toString.call(_options.allowDateRe)==="[object String]") {
          options.allowDateRe = new RegExp(_options.allowDateRe);
        }

        if (_options.highlightedDates && $.isArray(_options.highlightedDates) && _options.highlightedDates.length) {
          $.each(_options.highlightedDates, function (index, value) {
            var splitData = $.map(value.split(','), $.trim),
              exDesc,
              hDate = new HighlightedDate(dateHelper.parseDate(splitData[0], options.formatDate), splitData[1], splitData[2]), // date, desc, style
              keyDate = dateHelper.formatDate(hDate.date, options.formatDate);
            if (highlightedDates[keyDate] !== undefined) {
              exDesc = highlightedDates[keyDate].desc;
              if (exDesc && exDesc.length && hDate.desc && hDate.desc.length) {
                highlightedDates[keyDate].desc = exDesc + "\n" + hDate.desc;
              }
            } else {
              highlightedDates[keyDate] = hDate;
            }
          });

          options.highlightedDates = $.extend(true, [], highlightedDates);
        }

        if (_options.highlightedPeriods && $.isArray(_options.highlightedPeriods) && _options.highlightedPeriods.length) {
          highlightedDates = $.extend(true, [], options.highlightedDates);
          $.each(_options.highlightedPeriods, function (index, value) {
            var dateTest, // start date
              dateEnd,
              desc,
              hDate,
              keyDate,
              exDesc,
              style;
            if ($.isArray(value)) {
              dateTest = value[0];
              dateEnd = value[1];
              desc = value[2];
              style = value[3];
            }
            else {
              var splitData = $.map(value.split(','), $.trim);
              dateTest = dateHelper.parseDate(splitData[0], options.formatDate);
              dateEnd = dateHelper.parseDate(splitData[1], options.formatDate);
              desc = splitData[2];
              style = splitData[3];
            }

            while (dateTest <= dateEnd) {
              hDate = new HighlightedDate(dateTest, desc, style);
              keyDate = dateHelper.formatDate(dateTest, options.formatDate);
              dateTest.setDate(dateTest.getDate() + 1);
              if (highlightedDates[keyDate] !== undefined) {
                exDesc = highlightedDates[keyDate].desc;
                if (exDesc && exDesc.length && hDate.desc && hDate.desc.length) {
                  highlightedDates[keyDate].desc = exDesc + "\n" + hDate.desc;
                }
              } else {
                highlightedDates[keyDate] = hDate;
              }
            }
          });

          options.highlightedDates = $.extend(true, [], highlightedDates);
        }

        if (_options.disabledDates && $.isArray(_options.disabledDates) && _options.disabledDates.length) {
          options.disabledDates = $.extend(true, [], _options.disabledDates);
        }

        if (_options.disabledWeekDays && $.isArray(_options.disabledWeekDays) && _options.disabledWeekDays.length) {
          options.disabledWeekDays = $.extend(true, [], _options.disabledWeekDays);
        }

        if ((options.open || options.opened) && (!options.inline)) {
          input.trigger('open.xdsoft');
        }

        if (options.inline) {
          triggerAfterOpen = true;
          datetimepicker.addClass('xdsoft_inline');
          input.after(datetimepicker).hide();
        }

        if (options.inverseButton) {
          options.next = 'xdsoft_prev';
          options.prev = 'xdsoft_next';
        }

        if (options.datepicker) {
          datepicker.addClass('active');
        } else {
          datepicker.removeClass('active');
        }

        if (options.timepicker) {
          timepicker.addClass('active');
        } else {
          timepicker.removeClass('active');
        }

        if (options.value) {
          _xdsoft_datetime.setCurrentTime(options.value);
          if (input && input.val) {
            input.val(_xdsoft_datetime.str);
          }
        }

        if (isNaN(options.dayOfWeekStart)) {
          options.dayOfWeekStart = 0;
        } else {
          options.dayOfWeekStart = parseInt(options.dayOfWeekStart, 10) % 7;
        }

        if (!options.timepickerScrollbar) {
          timeboxparent.xdsoftScroller(options, 'hide');
        }

        if (options.minDate && /^[\+\-](.*)$/.test(options.minDate)) {
          options.minDate = dateHelper.formatDate(_xdsoft_datetime.strToDateTime(options.minDate), options.formatDate);
        }

        if (options.maxDate &&  /^[\+\-](.*)$/.test(options.maxDate)) {
          options.maxDate = dateHelper.formatDate(_xdsoft_datetime.strToDateTime(options.maxDate), options.formatDate);
        }

                if (options.minDateTime &&  /^\+(.*)$/.test(options.minDateTime)) {
                  options.minDateTime = _xdsoft_datetime.strToDateTime(options.minDateTime).dateFormat(options.formatDate);
                }

        applyButton.toggle(options.showApplyButton);

        month_picker
          .find('.xdsoft_today_button')
          .css('visibility', !options.todayButton ? 'hidden' : 'visible');

        month_picker
          .find('.' + options.prev)
          .css('visibility', !options.prevButton ? 'hidden' : 'visible');

        month_picker
          .find('.' + options.next)
          .css('visibility', !options.nextButton ? 'hidden' : 'visible');

        setMask(options);

        if (options.validateOnBlur) {
          input
            .off('blur.xdsoft')
            .on('blur.xdsoft', function () {
              if (options.allowBlank && (!$.trim($(this).val()).length ||
                  (typeof options.mask === "string" && $.trim($(this).val()) === options.mask.replace(/[0-9]/g, '_')))) {
                $(this).val(null);
                datetimepicker.data('xdsoft_datetime').empty();
              } else {
                var d = dateHelper.parseDate($(this).val(), options.format);
                if (d) { // parseDate() may skip some invalid parts like date or time, so make it clear for user: show parsed date/time
                  $(this).val(dateHelper.formatDate(d, options.format));
                } else {
                  var splittedHours   = +([$(this).val()[0], $(this).val()[1]].join('')),
                    splittedMinutes = +([$(this).val()[2], $(this).val()[3]].join(''));

                  // parse the numbers as 0312 => 03:12
                  if (!options.datepicker && options.timepicker && splittedHours >= 0 && splittedHours < 24 && splittedMinutes >= 0 && splittedMinutes < 60) {
                    $(this).val([splittedHours, splittedMinutes].map(function (item) {
                      return item > 9 ? item : '0' + item;
                    }).join(':'));
                  } else {
                    $(this).val(dateHelper.formatDate(_xdsoft_datetime.now(), options.format));
                  }
                }
                datetimepicker.data('xdsoft_datetime').setCurrentTime($(this).val());
              }

              datetimepicker.trigger('changedatetime.xdsoft');
              datetimepicker.trigger('close.xdsoft');
            });
        }
        options.dayOfWeekStartPrev = (options.dayOfWeekStart === 0) ? 6 : options.dayOfWeekStart - 1;

        datetimepicker
          .trigger('xchange.xdsoft')
          .trigger('afterOpen.xdsoft');
      };

      datetimepicker
        .data('options', options)
        .on('touchstart mousedown.xdsoft', function (event) {
          event.stopPropagation();
          event.preventDefault();
          yearselect.hide();
          monthselect.hide();
          return false;
        });

      //scroll_element = timepicker.find('.xdsoft_time_box');
      timeboxparent.append(timebox);
      timeboxparent.xdsoftScroller(options);

      datetimepicker.on('afterOpen.xdsoft', function () {
        timeboxparent.xdsoftScroller(options);
      });

      datetimepicker
        .append(datepicker)
        .append(timepicker);

      if (options.withoutCopyright !== true) {
        datetimepicker
          .append(xdsoft_copyright);
      }

      datepicker
        .append(month_picker)
        .append(calendar)
        .append(applyButton);

      $(options.parentID)
        .append(datetimepicker);

      XDSoft_datetime = function () {
        var _this = this;
        _this.now = function (norecursion) {
          var d = new Date(),
            date,
            time;

          if (!norecursion && options.defaultDate) {
            date = _this.strToDateTime(options.defaultDate);
            d.setFullYear(date.getFullYear());
            d.setMonth(date.getMonth());
            d.setDate(date.getDate());
          }

          if (options.yearOffset) {
            d.setFullYear(d.getFullYear() + options.yearOffset);
          }

          if (!norecursion && options.defaultTime) {
            time = _this.strtotime(options.defaultTime);
            d.setHours(time.getHours());
            d.setMinutes(time.getMinutes());
            d.setSeconds(time.getSeconds());
            d.setMilliseconds(time.getMilliseconds());
          }
          return d;
        };

        _this.isValidDate = function (d) {
          if (Object.prototype.toString.call(d) !== "[object Date]") {
            return false;
          }
          return !isNaN(d.getTime());
        };

        _this.setCurrentTime = function (dTime, requireValidDate) {
          if (typeof dTime === 'string') {
            _this.currentTime = _this.strToDateTime(dTime);
          }
          else if (_this.isValidDate(dTime)) {
            _this.currentTime = dTime;
          }
          else if (!dTime && !requireValidDate && options.allowBlank && !options.inline) {
            _this.currentTime = null;
          }
          else {
            _this.currentTime = _this.now();
          }

          datetimepicker.trigger('xchange.xdsoft');
        };

        _this.empty = function () {
          _this.currentTime = null;
        };

        _this.getCurrentTime = function () {
          return _this.currentTime;
        };

        _this.nextMonth = function () {

          if (_this.currentTime === undefined || _this.currentTime === null) {
            _this.currentTime = _this.now();
          }

          var month = _this.currentTime.getMonth() + 1,
            year;
          if (month === 12) {
            _this.currentTime.setFullYear(_this.currentTime.getFullYear() + 1);
            month = 0;
          }

          year = _this.currentTime.getFullYear();

          _this.currentTime.setDate(
            Math.min(
              new Date(_this.currentTime.getFullYear(), month + 1, 0).getDate(),
              _this.currentTime.getDate()
            )
          );
          _this.currentTime.setMonth(month);

          if (options.onChangeMonth && $.isFunction(options.onChangeMonth)) {
            options.onChangeMonth.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
          }

          if (year !== _this.currentTime.getFullYear() && $.isFunction(options.onChangeYear)) {
            options.onChangeYear.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
          }

          datetimepicker.trigger('xchange.xdsoft');
          return month;
        };

        _this.prevMonth = function () {

          if (_this.currentTime === undefined || _this.currentTime === null) {
            _this.currentTime = _this.now();
          }

          var month = _this.currentTime.getMonth() - 1;
          if (month === -1) {
            _this.currentTime.setFullYear(_this.currentTime.getFullYear() - 1);
            month = 11;
          }
          _this.currentTime.setDate(
            Math.min(
              new Date(_this.currentTime.getFullYear(), month + 1, 0).getDate(),
              _this.currentTime.getDate()
            )
          );
          _this.currentTime.setMonth(month);
          if (options.onChangeMonth && $.isFunction(options.onChangeMonth)) {
            options.onChangeMonth.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
          }
          datetimepicker.trigger('xchange.xdsoft');
          return month;
        };

        _this.getWeekOfYear = function (datetime) {
          if (options.onGetWeekOfYear && $.isFunction(options.onGetWeekOfYear)) {
            var week = options.onGetWeekOfYear.call(datetimepicker, datetime);
            if (typeof week !== 'undefined') {
              return week;
            }
          }
          var onejan = new Date(datetime.getFullYear(), 0, 1);

          //First week of the year is th one with the first Thursday according to ISO8601
          if (onejan.getDay() !== 4) {
            onejan.setMonth(0, 1 + ((4 - onejan.getDay()+ 7) % 7));
          }

          return Math.ceil((((datetime - onejan) / 86400000) + onejan.getDay() + 1) / 7);
        };

        _this.strToDateTime = function (sDateTime) {
          var tmpDate = [], timeOffset, currentTime;

          if (sDateTime && sDateTime instanceof Date && _this.isValidDate(sDateTime)) {
            return sDateTime;
          }

          tmpDate = /^([+-]{1})(.*)$/.exec(sDateTime);

          if (tmpDate) {
            tmpDate[2] = dateHelper.parseDate(tmpDate[2], options.formatDate);
          }

          if (tmpDate  && tmpDate[2]) {
            timeOffset = tmpDate[2].getTime() - (tmpDate[2].getTimezoneOffset()) * 60000;
            currentTime = new Date((_this.now(true)).getTime() + parseInt(tmpDate[1] + '1', 10) * timeOffset);
          } else {
            currentTime = sDateTime ? dateHelper.parseDate(sDateTime, options.format) : _this.now();
          }

          if (!_this.isValidDate(currentTime)) {
            currentTime = _this.now();
          }

          return currentTime;
        };

        _this.strToDate = function (sDate) {
          if (sDate && sDate instanceof Date && _this.isValidDate(sDate)) {
            return sDate;
          }

          var currentTime = sDate ? dateHelper.parseDate(sDate, options.formatDate) : _this.now(true);
          if (!_this.isValidDate(currentTime)) {
            currentTime = _this.now(true);
          }
          return currentTime;
        };

        _this.strtotime = function (sTime) {
          if (sTime && sTime instanceof Date && _this.isValidDate(sTime)) {
            return sTime;
          }
          var currentTime = sTime ? dateHelper.parseDate(sTime, options.formatTime) : _this.now(true);
          if (!_this.isValidDate(currentTime)) {
            currentTime = _this.now(true);
          }
          return currentTime;
        };

        _this.str = function () {
          return dateHelper.formatDate(_this.currentTime, options.format);
        };
        _this.currentTime = this.now();
      };

      _xdsoft_datetime = new XDSoft_datetime();

      applyButton.on('touchend click', function (e) {//pathbrite
        e.preventDefault();
        datetimepicker.data('changed', true);
        _xdsoft_datetime.setCurrentTime(getCurrentValue());
        input.val(_xdsoft_datetime.str());
        datetimepicker.trigger('close.xdsoft');
      });
      month_picker
        .find('.xdsoft_today_button')
        .on('touchend mousedown.xdsoft', function () {
          datetimepicker.data('changed', true);
          _xdsoft_datetime.setCurrentTime(0, true);
          datetimepicker.trigger('afterOpen.xdsoft');
        }).on('dblclick.xdsoft', function () {
        var currentDate = _xdsoft_datetime.getCurrentTime(), minDate, maxDate;
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        minDate = _xdsoft_datetime.strToDate(options.minDate);
        minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
        if (currentDate < minDate) {
          return;
        }
        maxDate = _xdsoft_datetime.strToDate(options.maxDate);
        maxDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
        if (currentDate > maxDate) {
          return;
        }
        input.val(_xdsoft_datetime.str());
        input.trigger('change');
        datetimepicker.trigger('close.xdsoft');
      });
      month_picker
        .find('.xdsoft_prev,.xdsoft_next')
        .on('touchend mousedown.xdsoft', function () {
          var $this = $(this),
            timer = 0,
            stop = false;

          (function arguments_callee1(v) {
            if ($this.hasClass(options.next)) {
              _xdsoft_datetime.nextMonth();
            } else if ($this.hasClass(options.prev)) {
              _xdsoft_datetime.prevMonth();
            }
            if (options.monthChangeSpinner) {
              if (!stop) {
                timer = setTimeout(arguments_callee1, v || 100);
              }
            }
          }(500));

          $([options.ownerDocument.body, options.contentWindow]).on('touchend mouseup.xdsoft', function arguments_callee2() {
            clearTimeout(timer);
            stop = true;
            $([options.ownerDocument.body, options.contentWindow]).off('touchend mouseup.xdsoft', arguments_callee2);
          });
        });

      timepicker
        .find('.xdsoft_prev,.xdsoft_next')
        .on('touchend mousedown.xdsoft', function () {
          var $this = $(this),
            timer = 0,
            stop = false,
            period = 110;
          (function arguments_callee4(v) {
            var pheight = timeboxparent[0].clientHeight,
              height = timebox[0].offsetHeight,
              top = Math.abs(parseInt(timebox.css('marginTop'), 10));
            if ($this.hasClass(options.next) && (height - pheight) - options.timeHeightInTimePicker >= top) {
              timebox.css('marginTop', '-' + (top + options.timeHeightInTimePicker) + 'px');
            } else if ($this.hasClass(options.prev) && top - options.timeHeightInTimePicker >= 0) {
              timebox.css('marginTop', '-' + (top - options.timeHeightInTimePicker) + 'px');
            }
            /**
             * Fixed bug:
             * When using css3 transition, it will cause a bug that you cannot scroll the timepicker list.
             * The reason is that the transition-duration time, if you set it to 0, all things fine, otherwise, this
             * would cause a bug when you use jquery.css method.
             * Let's say: * { transition: all .5s ease; }
             * jquery timebox.css('marginTop') will return the original value which is before you clicking the next/prev button,
             * meanwhile the timebox[0].style.marginTop will return the right value which is after you clicking the
             * next/prev button.
             *
             * What we should do:
             * Replace timebox.css('marginTop') with timebox[0].style.marginTop.
             */
            timeboxparent.trigger('scroll_element.xdsoft_scroller', [Math.abs(parseInt(timebox[0].style.marginTop, 10) / (height - pheight))]);
            period = (period > 10) ? 10 : period - 10;
            if (!stop) {
              timer = setTimeout(arguments_callee4, v || period);
            }
          }(500));
          $([options.ownerDocument.body, options.contentWindow]).on('touchend mouseup.xdsoft', function arguments_callee5() {
            clearTimeout(timer);
            stop = true;
            $([options.ownerDocument.body, options.contentWindow])
              .off('touchend mouseup.xdsoft', arguments_callee5);
          });
        });

      xchangeTimer = 0;
      // base handler - generating a calendar and timepicker
      datetimepicker
        .on('xchange.xdsoft', function (event) {
          clearTimeout(xchangeTimer);
          xchangeTimer = setTimeout(function () {

            if (_xdsoft_datetime.currentTime === undefined || _xdsoft_datetime.currentTime === null) {
              _xdsoft_datetime.currentTime = _xdsoft_datetime.now();
            }

            var table = '',
              start = new Date(_xdsoft_datetime.currentTime.getFullYear(), _xdsoft_datetime.currentTime.getMonth(), 1, 12, 0, 0),
              i = 0,
              j,
              today = _xdsoft_datetime.now(),
              maxDate = false,
              minDate = false,
                            minDateTime = false,
              hDate,
              day,
              d,
              y,
              m,
              w,
              classes = [],
              customDateSettings,
              newRow = true,
              time = '',
              h,
              line_time,
              description;

            while (start.getDay() !== options.dayOfWeekStart) {
              start.setDate(start.getDate() - 1);
            }

            table += '<table><thead><tr>';

            if (options.weeks) {
              table += '<th></th>';
            }

            for (j = 0; j < 7; j += 1) {
              table += '<th>' + options.i18n[globalLocale].dayOfWeekShort[(j + options.dayOfWeekStart) % 7] + '</th>';
            }

            table += '</tr></thead>';
            table += '<tbody>';

            if (options.maxDate !== false) {
              maxDate = _xdsoft_datetime.strToDate(options.maxDate);
              maxDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate(), 23, 59, 59, 999);
            }

            if (options.minDate !== false) {
              minDate = _xdsoft_datetime.strToDate(options.minDate);
              minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
            }

                        if (options.minDateTime !== false) {
              minDateTime = _xdsoft_datetime.strToDate(options.minDateTime);
              minDateTime = new Date(minDateTime.getFullYear(), minDateTime.getMonth(), minDateTime.getDate(), minDateTime.getHours(), minDateTime.getMinutes(), minDateTime.getSeconds());
            }

            while (i < _xdsoft_datetime.currentTime.countDaysInMonth() || start.getDay() !== options.dayOfWeekStart || _xdsoft_datetime.currentTime.getMonth() === start.getMonth()) {
              classes = [];
              i += 1;

              day = start.getDay();
              d = start.getDate();
              y = start.getFullYear();
              m = start.getMonth();
              w = _xdsoft_datetime.getWeekOfYear(start);
              description = '';

              classes.push('xdsoft_date');

              if (options.beforeShowDay && $.isFunction(options.beforeShowDay.call)) {
                customDateSettings = options.beforeShowDay.call(datetimepicker, start);
              } else {
                customDateSettings = null;
              }

              if(options.allowDateRe && Object.prototype.toString.call(options.allowDateRe) === "[object RegExp]"){
                if(!options.allowDateRe.test(dateHelper.formatDate(start, options.formatDate))){
                  classes.push('xdsoft_disabled');
                }
              }

              if(options.allowDates && options.allowDates.length>0){
                if(options.allowDates.indexOf(dateHelper.formatDate(start, options.formatDate)) === -1){
                  classes.push('xdsoft_disabled');
                }
              }

              if ((maxDate !== false && start > maxDate) || (minDateTime !== false && start < minDateTime)  || (minDate !== false && start < minDate) || (customDateSettings && customDateSettings[0] === false)) {
                classes.push('xdsoft_disabled');
              }

              if (options.disabledDates.indexOf(dateHelper.formatDate(start, options.formatDate)) !== -1) {
                classes.push('xdsoft_disabled');
              }

              if (options.disabledWeekDays.indexOf(day) !== -1) {
                classes.push('xdsoft_disabled');
              }

              if (input.is('[disabled]')) {
                classes.push('xdsoft_disabled');
              }

              if (customDateSettings && customDateSettings[1] !== "") {
                classes.push(customDateSettings[1]);
              }

              if (_xdsoft_datetime.currentTime.getMonth() !== m) {
                classes.push('xdsoft_other_month');
              }

              if ((options.defaultSelect || datetimepicker.data('changed')) && dateHelper.formatDate(_xdsoft_datetime.currentTime, options.formatDate) === dateHelper.formatDate(start, options.formatDate)) {
                classes.push('xdsoft_current');
              }

              if (dateHelper.formatDate(today, options.formatDate) === dateHelper.formatDate(start, options.formatDate)) {
                classes.push('xdsoft_today');
              }

              if (start.getDay() === 0 || start.getDay() === 6 || options.weekends.indexOf(dateHelper.formatDate(start, options.formatDate)) !== -1) {
                classes.push('xdsoft_weekend');
              }

              if (options.highlightedDates[dateHelper.formatDate(start, options.formatDate)] !== undefined) {
                hDate = options.highlightedDates[dateHelper.formatDate(start, options.formatDate)];
                classes.push(hDate.style === undefined ? 'xdsoft_highlighted_default' : hDate.style);
                description = hDate.desc === undefined ? '' : hDate.desc;
              }

              if (options.beforeShowDay && $.isFunction(options.beforeShowDay)) {
                classes.push(options.beforeShowDay(start));
              }

              if (newRow) {
                table += '<tr>';
                newRow = false;
                if (options.weeks) {
                  table += '<th>' + w + '</th>';
                }
              }

              table += '<td data-date="' + d + '" data-month="' + m + '" data-year="' + y + '"' + ' class="xdsoft_date xdsoft_day_of_week' + start.getDay() + ' ' + classes.join(' ') + '" title="' + description + '">' +
                '<div>' + d + '</div>' +
                '</td>';

              if (start.getDay() === options.dayOfWeekStartPrev) {
                table += '</tr>';
                newRow = true;
              }

              start.setDate(d + 1);
            }
            table += '</tbody></table>';

            calendar.html(table);

            month_picker.find('.xdsoft_label span').eq(0).text(options.i18n[globalLocale].months[_xdsoft_datetime.currentTime.getMonth()]);
            month_picker.find('.xdsoft_label span').eq(1).text(_xdsoft_datetime.currentTime.getFullYear());

            // generate timebox
            time = '';
            h = '';
            m = '';

            line_time = function line_time(h, m) {
              var now = _xdsoft_datetime.now(), optionDateTime, current_time,
                isALlowTimesInit = options.allowTimes && $.isArray(options.allowTimes) && options.allowTimes.length;
              now.setHours(h);
              h = parseInt(now.getHours(), 10);
              now.setMinutes(m);
              m = parseInt(now.getMinutes(), 10);
              optionDateTime = new Date(_xdsoft_datetime.currentTime);
              optionDateTime.setHours(h);
              optionDateTime.setMinutes(m);
              classes = [];
              if ((options.minDateTime !== false && options.minDateTime > optionDateTime) || (options.maxTime !== false && _xdsoft_datetime.strtotime(options.maxTime).getTime() < now.getTime()) || (options.minTime !== false && _xdsoft_datetime.strtotime(options.minTime).getTime() > now.getTime())) {
                classes.push('xdsoft_disabled');
              } else if ((options.minDateTime !== false && options.minDateTime > optionDateTime) || ((options.disabledMinTime !== false && now.getTime() > _xdsoft_datetime.strtotime(options.disabledMinTime).getTime()) && (options.disabledMaxTime !== false && now.getTime() < _xdsoft_datetime.strtotime(options.disabledMaxTime).getTime()))) {
                classes.push('xdsoft_disabled');
              } else if (input.is('[disabled]')) {
                classes.push('xdsoft_disabled');
              }

              current_time = new Date(_xdsoft_datetime.currentTime);
              current_time.setHours(parseInt(_xdsoft_datetime.currentTime.getHours(), 10));

              if (!isALlowTimesInit) {
                current_time.setMinutes(Math[options.roundTime](_xdsoft_datetime.currentTime.getMinutes() / options.step) * options.step);
              }

              if ((options.initTime || options.defaultSelect || datetimepicker.data('changed')) && current_time.getHours() === parseInt(h, 10) && ((!isALlowTimesInit && options.step > 59) || current_time.getMinutes() === parseInt(m, 10))) {
                if (options.defaultSelect || datetimepicker.data('changed')) {
                  classes.push('xdsoft_current');
                } else if (options.initTime) {
                  classes.push('xdsoft_init_time');
                }
              }
              if (parseInt(today.getHours(), 10) === parseInt(h, 10) && parseInt(today.getMinutes(), 10) === parseInt(m, 10)) {
                classes.push('xdsoft_today');
              }
              time += '<div class="xdsoft_time ' + classes.join(' ') + '" data-hour="' + h + '" data-minute="' + m + '">' + dateHelper.formatDate(now, options.formatTime) + '</div>';
            };

            if (!options.allowTimes || !$.isArray(options.allowTimes) || !options.allowTimes.length) {
              for (i = 0, j = 0; i < (options.hours12 ? 12 : 24); i += 1) {
                for (j = 0; j < 60; j += options.step) {
                  h = (i < 10 ? '0' : '') + i;
                  m = (j < 10 ? '0' : '') + j;
                  line_time(h, m);
                }
              }
            } else {
              for (i = 0; i < options.allowTimes.length; i += 1) {
                h = _xdsoft_datetime.strtotime(options.allowTimes[i]).getHours();
                m = _xdsoft_datetime.strtotime(options.allowTimes[i]).getMinutes();
                line_time(h, m);
              }
            }

            timebox.html(time);

            opt = '';

            for (i = parseInt(options.yearStart, 10) + options.yearOffset; i <= parseInt(options.yearEnd, 10) + options.yearOffset; i += 1) {
              opt += '<div class="xdsoft_option ' + (_xdsoft_datetime.currentTime.getFullYear() === i ? 'xdsoft_current' : '') + '" data-value="' + i + '">' + i + '</div>';
            }
            yearselect.children().eq(0)
              .html(opt);

            for (i = parseInt(options.monthStart, 10), opt = ''; i <= parseInt(options.monthEnd, 10); i += 1) {
              opt += '<div class="xdsoft_option ' + (_xdsoft_datetime.currentTime.getMonth() === i ? 'xdsoft_current' : '') + '" data-value="' + i + '">' + options.i18n[globalLocale].months[i] + '</div>';
            }
            monthselect.children().eq(0).html(opt);
            $(datetimepicker)
              .trigger('generate.xdsoft');
          }, 10);
          event.stopPropagation();
        })
        .on('afterOpen.xdsoft', function () {
          if (options.timepicker) {
            var classType, pheight, height, top;
            if (timebox.find('.xdsoft_current').length) {
              classType = '.xdsoft_current';
            } else if (timebox.find('.xdsoft_init_time').length) {
              classType = '.xdsoft_init_time';
            }
            if (classType) {
              pheight = timeboxparent[0].clientHeight;
              height = timebox[0].offsetHeight;
              top = timebox.find(classType).index() * options.timeHeightInTimePicker + 1;
              if ((height - pheight) < top) {
                top = height - pheight;
              }
              timeboxparent.trigger('scroll_element.xdsoft_scroller', [parseInt(top, 10) / (height - pheight)]);
            } else {
              timeboxparent.trigger('scroll_element.xdsoft_scroller', [0]);
            }
          }
        });

      timerclick = 0;
      calendar
        .on('touchend click.xdsoft', 'td', function (xdevent) {
          xdevent.stopPropagation();  // Prevents closing of Pop-ups, Modals and Flyouts in Bootstrap
          timerclick += 1;
          var $this = $(this),
            currentTime = _xdsoft_datetime.currentTime;

          if (currentTime === undefined || currentTime === null) {
            _xdsoft_datetime.currentTime = _xdsoft_datetime.now();
            currentTime = _xdsoft_datetime.currentTime;
          }

          if ($this.hasClass('xdsoft_disabled')) {
            return false;
          }

          currentTime.setDate(1);
          currentTime.setFullYear($this.data('year'));
          currentTime.setMonth($this.data('month'));
          currentTime.setDate($this.data('date'));

          datetimepicker.trigger('select.xdsoft', [currentTime]);

          input.val(_xdsoft_datetime.str());

          if (options.onSelectDate && $.isFunction(options.onSelectDate)) {
            options.onSelectDate.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'), xdevent);
          }

          datetimepicker.data('changed', true);
          datetimepicker.trigger('xchange.xdsoft');
          datetimepicker.trigger('changedatetime.xdsoft');
          if ((timerclick > 1 || (options.closeOnDateSelect === true || (options.closeOnDateSelect === false && !options.timepicker))) && !options.inline) {
            datetimepicker.trigger('close.xdsoft');
          }
          setTimeout(function () {
            timerclick = 0;
          }, 200);
        });

      timebox
        .on('touchstart', 'div', function (xdevent) {
          this.touchMoved = false;
        })
        .on('touchmove', 'div', handleTouchMoved)
        .on('touchend click.xdsoft', 'div', function (xdevent) {
          if (!this.touchMoved) {
            xdevent.stopPropagation();
            var $this = $(this),
              currentTime = _xdsoft_datetime.currentTime;

            if (currentTime === undefined || currentTime === null) {
              _xdsoft_datetime.currentTime = _xdsoft_datetime.now();
              currentTime = _xdsoft_datetime.currentTime;
            }

            if ($this.hasClass('xdsoft_disabled')) {
              return false;
            }
            currentTime.setHours($this.data('hour'));
            currentTime.setMinutes($this.data('minute'));
            datetimepicker.trigger('select.xdsoft', [currentTime]);

            datetimepicker.data('input').val(_xdsoft_datetime.str());

            if (options.onSelectTime && $.isFunction(options.onSelectTime)) {
              options.onSelectTime.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'), xdevent);
            }
            datetimepicker.data('changed', true);
            datetimepicker.trigger('xchange.xdsoft');
            datetimepicker.trigger('changedatetime.xdsoft');
            if (options.inline !== true && options.closeOnTimeSelect === true) {
              datetimepicker.trigger('close.xdsoft');
            }
          }
        });

      datepicker
        .on('mousewheel.xdsoft', function (event) {
          if (!options.scrollMonth) {
            return true;
          }
          if (event.deltaY < 0) {
            _xdsoft_datetime.nextMonth();
          } else {
            _xdsoft_datetime.prevMonth();
          }
          return false;
        });

      input
        .on('mousewheel.xdsoft', function (event) {
          if (!options.scrollInput) {
            return true;
          }
          if (!options.datepicker && options.timepicker) {
            current_time_index = timebox.find('.xdsoft_current').length ? timebox.find('.xdsoft_current').eq(0).index() : 0;
            if (current_time_index + event.deltaY >= 0 && current_time_index + event.deltaY < timebox.children().length) {
              current_time_index += event.deltaY;
            }
            if (timebox.children().eq(current_time_index).length) {
              timebox.children().eq(current_time_index).trigger('mousedown');
            }
            return false;
          }
          if (options.datepicker && !options.timepicker) {
            datepicker.trigger(event, [event.deltaY, event.deltaX, event.deltaY]);
            if (input.val) {
              input.val(_xdsoft_datetime.str());
            }
            datetimepicker.trigger('changedatetime.xdsoft');
            return false;
          }
        });

      datetimepicker
        .on('changedatetime.xdsoft', function (event) {
          if (options.onChangeDateTime && $.isFunction(options.onChangeDateTime)) {
            var $input = datetimepicker.data('input');
            options.onChangeDateTime.call(datetimepicker, _xdsoft_datetime.currentTime, $input, event);
            delete options.value;
            $input.trigger('change');
          }
        })
        .on('generate.xdsoft', function () {
          if (options.onGenerate && $.isFunction(options.onGenerate)) {
            options.onGenerate.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
          }
          if (triggerAfterOpen) {
            datetimepicker.trigger('afterOpen.xdsoft');
            triggerAfterOpen = false;
          }
        })
        .on('click.xdsoft', function (xdevent) {
          xdevent.stopPropagation();
        });

      current_time_index = 0;

      /**
       * Runs the callback for each of the specified node's ancestors.
       *
       * Return FALSE from the callback to stop ascending.
       *
       * @param {DOMNode} node
       * @param {Function} callback
       * @returns {undefined}
       */
      forEachAncestorOf = function (node, callback) {
        do {
          node = node.parentNode;

          if (!node || callback(node) === false) {
            break;
          }
        } while (node.nodeName !== 'HTML');
      };

      /**
       * Sets the position of the picker.
       *
       * @returns {undefined}
       */
      setPos = function () {
        var dateInputOffset,
          dateInputElem,
          verticalPosition,
          left,
          position,
          datetimepickerElem,
          dateInputHasFixedAncestor,
          $dateInput,
          windowWidth,
          verticalAnchorEdge,
          datetimepickerCss,
          windowHeight,
          windowScrollTop;

        $dateInput = datetimepicker.data('input');
        dateInputOffset = $dateInput.offset();
        dateInputElem = $dateInput[0];

        verticalAnchorEdge = 'top';
        verticalPosition = (dateInputOffset.top + dateInputElem.offsetHeight) - 1;
        left = dateInputOffset.left;
        position = "absolute";

        windowWidth = $(options.contentWindow).width();
        windowHeight = $(options.contentWindow).height();
        windowScrollTop = $(options.contentWindow).scrollTop();

        if ((options.ownerDocument.documentElement.clientWidth - dateInputOffset.left) < datepicker.parent().outerWidth(true)) {
          var diff = datepicker.parent().outerWidth(true) - dateInputElem.offsetWidth;
          left = left - diff;
        }

        if ($dateInput.parent().css('direction') === 'rtl') {
          left -= (datetimepicker.outerWidth() - $dateInput.outerWidth());
        }

        if (options.fixed) {
          verticalPosition -= windowScrollTop;
          left -= $(options.contentWindow).scrollLeft();
          position = "fixed";
        } else {
          dateInputHasFixedAncestor = false;

          forEachAncestorOf(dateInputElem, function (ancestorNode) {
            if (ancestorNode === null) {
              return false;
            }

            if (options.contentWindow.getComputedStyle(ancestorNode).getPropertyValue('position') === 'fixed') {
              dateInputHasFixedAncestor = true;
              return false;
            }
          });

          if (dateInputHasFixedAncestor) {
            position = 'fixed';

            //If the picker won't fit entirely within the viewport then display it above the date input.
            if (verticalPosition + datetimepicker.outerHeight() > windowHeight + windowScrollTop) {
              verticalAnchorEdge = 'bottom';
              verticalPosition = (windowHeight + windowScrollTop) - dateInputOffset.top;
            } else {
              verticalPosition -= windowScrollTop;
            }
          } else {
            if (verticalPosition + datetimepicker[0].offsetHeight > windowHeight + windowScrollTop) {
              verticalPosition = dateInputOffset.top - datetimepicker[0].offsetHeight + 1;
            }
          }

          if (verticalPosition < 0) {
            verticalPosition = 0;
          }

          if (left + dateInputElem.offsetWidth > windowWidth) {
            left = windowWidth - dateInputElem.offsetWidth;
          }
        }

        datetimepickerElem = datetimepicker[0];

        forEachAncestorOf(datetimepickerElem, function (ancestorNode) {
          var ancestorNodePosition;

          ancestorNodePosition = options.contentWindow.getComputedStyle(ancestorNode).getPropertyValue('position');

          if (ancestorNodePosition === 'relative' && windowWidth >= ancestorNode.offsetWidth) {
            left = left - ((windowWidth - ancestorNode.offsetWidth) / 2);
            return false;
          }
        });

        datetimepickerCss = {
          position: position,
          left: left,
          top: '',  //Initialize to prevent previous values interfering with new ones.
          bottom: ''  //Initialize to prevent previous values interfering with new ones.
        };

        datetimepickerCss[verticalAnchorEdge] = verticalPosition;

        datetimepicker.css(datetimepickerCss);
      };

      datetimepicker
        .on('open.xdsoft', function (event) {
          var onShow = true;
          if (options.onShow && $.isFunction(options.onShow)) {
            onShow = options.onShow.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'), event);
          }
          if (onShow !== false) {
            datetimepicker.show();
            setPos();
            $(options.contentWindow)
              .off('resize.xdsoft', setPos)
              .on('resize.xdsoft', setPos);

            if (options.closeOnWithoutClick) {
              $([options.ownerDocument.body, options.contentWindow]).on('touchstart mousedown.xdsoft', function arguments_callee6() {
                datetimepicker.trigger('close.xdsoft');
                $([options.ownerDocument.body, options.contentWindow]).off('touchstart mousedown.xdsoft', arguments_callee6);
              });
            }
          }
        })
        .on('close.xdsoft', function (event) {
          var onClose = true;
          month_picker
            .find('.xdsoft_month,.xdsoft_year')
            .find('.xdsoft_select')
            .hide();
          if (options.onClose && $.isFunction(options.onClose)) {
            onClose = options.onClose.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'), event);
          }
          if (onClose !== false && !options.opened && !options.inline) {
            datetimepicker.hide();
          }
          event.stopPropagation();
        })
        .on('toggle.xdsoft', function () {
          if (datetimepicker.is(':visible')) {
            datetimepicker.trigger('close.xdsoft');
          } else {
            datetimepicker.trigger('open.xdsoft');
          }
        })
        .data('input', input);

      timer = 0;

      datetimepicker.data('xdsoft_datetime', _xdsoft_datetime);
      datetimepicker.setOptions(options);

      function getCurrentValue() {
        var ct = false, time;

        if (options.startDate) {
          ct = _xdsoft_datetime.strToDate(options.startDate);
        } else {
          ct = options.value || ((input && input.val && input.val()) ? input.val() : '');
          if (ct) {
            ct = _xdsoft_datetime.strToDateTime(ct);
          } else if (options.defaultDate) {
            ct = _xdsoft_datetime.strToDateTime(options.defaultDate);
            if (options.defaultTime) {
              time = _xdsoft_datetime.strtotime(options.defaultTime);
              ct.setHours(time.getHours());
              ct.setMinutes(time.getMinutes());
            }
          }
        }

        if (ct && _xdsoft_datetime.isValidDate(ct)) {
          datetimepicker.data('changed', true);
        } else {
          ct = '';
        }

        return ct || 0;
      }

      function setMask(options) {

        var isValidValue = function (mask, value) {
            var reg = mask
              .replace(/([\[\]\/\{\}\(\)\-\.\+]{1})/g, '\\$1')
              .replace(/_/g, '{digit+}')
              .replace(/([0-9]{1})/g, '{digit$1}')
              .replace(/\{digit([0-9]{1})\}/g, '[0-$1_]{1}')
              .replace(/\{digit[\+]\}/g, '[0-9_]{1}');
            return (new RegExp(reg)).test(value);
          },
          getCaretPos = function (input) {
            try {
              if (options.ownerDocument.selection && options.ownerDocument.selection.createRange) {
                var range = options.ownerDocument.selection.createRange();
                return range.getBookmark().charCodeAt(2) - 2;
              }
              if (input.setSelectionRange) {
                return input.selectionStart;
              }
            } catch (e) {
              return 0;
            }
          },
          setCaretPos = function (node, pos) {
            node = (typeof node === "string" || node instanceof String) ? options.ownerDocument.getElementById(node) : node;
            if (!node) {
              return false;
            }
            if (node.createTextRange) {
              var textRange = node.createTextRange();
              textRange.collapse(true);
              textRange.moveEnd('character', pos);
              textRange.moveStart('character', pos);
              textRange.select();
              return true;
            }
            if (node.setSelectionRange) {
              node.setSelectionRange(pos, pos);
              return true;
            }
            return false;
          };

        if(options.mask) {
          input.off('keydown.xdsoft');
        }

        if (options.mask === true) {
          if (typeof moment != 'undefined') {
            options.mask = options.format
              .replace(/Y{4}/g, '9999')
              .replace(/Y{2}/g, '99')
              .replace(/M{2}/g, '19')
              .replace(/D{2}/g, '39')
              .replace(/H{2}/g, '29')
              .replace(/m{2}/g, '59')
              .replace(/s{2}/g, '59');
          } else {
            options.mask = options.format
              .replace(/Y/g, '9999')
              .replace(/F/g, '9999')
              .replace(/m/g, '19')
              .replace(/d/g, '39')
              .replace(/H/g, '29')
              .replace(/i/g, '59')
              .replace(/s/g, '59');
          }
        }

        if ($.type(options.mask) === 'string') {
          if (!isValidValue(options.mask, input.val())) {
            input.val(options.mask.replace(/[0-9]/g, '_'));
            setCaretPos(input[0], 0);
          }

          input.on('paste.xdsoft', function (event) {
              // couple options here
              // 1. return false - tell them they can't paste
              // 2. insert over current characters - minimal validation
              // 3. full fledged parsing and validation
              // let's go option 2 for now

              // fires multiple times for some reason

              // https://stackoverflow.com/a/30496488/1366033
              var clipboardData = event.clipboardData || event.originalEvent.clipboardData || window.clipboardData,
            pastedData = clipboardData.getData('text'),
            val = this.value,
            pos = this.selectionStart

              var valueBeforeCursor = val.substr(0, pos);
              var valueAfterPaste = val.substr(pos + pastedData.length);

              val = valueBeforeCursor + pastedData + valueAfterPaste;
              pos += pastedData.length;

              if (isValidValue(options.mask, val)) {
            this.value = val;
            setCaretPos(this, pos);
              } else if ($.trim(val) === '') {
            this.value = options.mask.replace(/[0-9]/g, '_');
              } else {
            input.trigger('error_input.xdsoft');
              }

              event.preventDefault();
              return false;
            });

            input.on('keydown.xdsoft', function (event) {
              var val = this.value,
            key = event.which,
            pos = this.selectionStart,
            selEnd = this.selectionEnd,
            hasSel = pos !== selEnd,
            digit;

              // only alow these characters
              if (((key >=  KEY0 && key <=  KEY9)  ||
             (key >= _KEY0 && key <= _KEY9)) ||
             (key === BACKSPACE || key === DEL)) {

                // get char to insert which is new character or placeholder ('_')
                digit = (key === BACKSPACE || key === DEL) ? '_' :
                String.fromCharCode((_KEY0 <= key && key <= _KEY9) ? key - KEY0 : key);

            // we're deleting something, we're not at the start, and have normal cursor, move back one
            // if we have a selection length, cursor actually sits behind deletable char, not in front
            if (key === BACKSPACE && pos && !hasSel) {
                pos -= 1;
            }

            // don't stop on a separator, continue whatever direction you were going
            //   value char - keep incrementing position while on separator char and we still have room
            //   del char   - keep decrementing position while on separator char and we still have room
            while (true) {
              var maskValueAtCurPos = options.mask.substr(pos, 1);
              var posShorterThanMaskLength = pos < options.mask.length;
              var posGreaterThanZero = pos > 0;
              var notNumberOrPlaceholder = /[^0-9_]/;
              var curPosOnSep = notNumberOrPlaceholder.test(maskValueAtCurPos);
              var continueMovingPosition = curPosOnSep && posShorterThanMaskLength && posGreaterThanZero

              // if we hit a real char, stay where we are
              if (!continueMovingPosition) break;

              // hitting backspace in a selection, you can possibly go back any further - go forward
              pos += (key === BACKSPACE && !hasSel) ? -1 : 1;

            }


            if (hasSel) {
              // pos might have moved so re-calc length
              var selLength = selEnd - pos

              // if we have a selection length we will wipe out entire selection and replace with default template for that range
              var defaultBlank = options.mask.replace(/[0-9]/g, '_');
              var defaultBlankSelectionReplacement = defaultBlank.substr(pos, selLength);
              var selReplacementRemainder = defaultBlankSelectionReplacement.substr(1) // might be empty

              var valueBeforeSel = val.substr(0, pos);
              var insertChars = digit + selReplacementRemainder;
              var charsAfterSelection = val.substr(pos + selLength);

              val = valueBeforeSel + insertChars + charsAfterSelection

            } else {
              var valueBeforeCursor = val.substr(0, pos);
              var insertChar = digit;
              var valueAfterNextChar = val.substr(pos + 1);

              val = valueBeforeCursor + insertChar + valueAfterNextChar
            }

            if ($.trim(val) === '') {
              // if empty, set to default
                val = defaultBlank
            } else {
              // if at the last character don't need to do anything
                if (pos === options.mask.length) {
              event.preventDefault();
              return false;
                }
            }

            // resume cursor location
            pos += (key === BACKSPACE) ? 0 : 1;
            // don't stop on a separator, continue whatever direction you were going
            while (/[^0-9_]/.test(options.mask.substr(pos, 1)) && pos < options.mask.length && pos > 0) {
                pos += (key === BACKSPACE) ? 0 : 1;
            }

            if (isValidValue(options.mask, val)) {
                this.value = val;
                setCaretPos(this, pos);
            } else if ($.trim(val) === '') {
                this.value = options.mask.replace(/[0-9]/g, '_');
            } else {
                input.trigger('error_input.xdsoft');
            }
              } else {
            if (([AKEY, CKEY, VKEY, ZKEY, YKEY].indexOf(key) !== -1 && ctrlDown) || [ESC, ARROWUP, ARROWDOWN, ARROWLEFT, ARROWRIGHT, F5, CTRLKEY, TAB, ENTER].indexOf(key) !== -1) {
                return true;
            }
              }

              event.preventDefault();
              return false;
            });
        }
      }

      _xdsoft_datetime.setCurrentTime(getCurrentValue());

      input
        .data('xdsoft_datetimepicker', datetimepicker)
        .on('open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart', function () {
          if (input.is(':disabled') || (input.data('xdsoft_datetimepicker').is(':visible') && options.closeOnInputClick)) {
            return;
          }
          if (!options.openOnFocus) {
            return;
          }
          clearTimeout(timer);
          timer = setTimeout(function () {
            if (input.is(':disabled')) {
              return;
            }

            triggerAfterOpen = true;
            _xdsoft_datetime.setCurrentTime(getCurrentValue(), true);
            if(options.mask) {
              setMask(options);
            }
            datetimepicker.trigger('open.xdsoft');
          }, 100);
        })
        .on('keydown.xdsoft', function (event) {
          var elementSelector,
            key = event.which;
          if ([ENTER].indexOf(key) !== -1 && options.enterLikeTab) {
            elementSelector = $("input:visible,textarea:visible,button:visible,a:visible");
            datetimepicker.trigger('close.xdsoft');
            elementSelector.eq(elementSelector.index(this) + 1).focus();
            return false;
          }
          if ([TAB].indexOf(key) !== -1) {
            datetimepicker.trigger('close.xdsoft');
            return true;
          }
        })
        .on('blur.xdsoft', function () {
          datetimepicker.trigger('close.xdsoft');
        });
    };
    destroyDateTimePicker = function (input) {
      var datetimepicker = input.data('xdsoft_datetimepicker');
      if (datetimepicker) {
        datetimepicker.data('xdsoft_datetime', null);
        datetimepicker.remove();
        input
          .data('xdsoft_datetimepicker', null)
          .off('.xdsoft');
        $(options.contentWindow).off('resize.xdsoft');
        $([options.contentWindow, options.ownerDocument.body]).off('mousedown.xdsoft touchstart');
        if (input.unmousewheel) {
          input.unmousewheel();
        }
      }
    };
    $(options.ownerDocument)
      .off('keydown.xdsoftctrl keyup.xdsoftctrl')
      .on('keydown.xdsoftctrl', function (e) {
        if (e.keyCode === CTRLKEY) {
          ctrlDown = true;
        }
      })
      .on('keyup.xdsoftctrl', function (e) {
        if (e.keyCode === CTRLKEY) {
          ctrlDown = false;
        }
      });

    this.each(function () {
      var datetimepicker = $(this).data('xdsoft_datetimepicker'), $input;
      if (datetimepicker) {
        if ($.type(opt) === 'string') {
          switch (opt) {
            case 'show':
              $(this).select().focus();
              datetimepicker.trigger('open.xdsoft');
              break;
            case 'hide':
              datetimepicker.trigger('close.xdsoft');
              break;
            case 'toggle':
              datetimepicker.trigger('toggle.xdsoft');
              break;
            case 'destroy':
              destroyDateTimePicker($(this));
              break;
            case 'reset':
              this.value = this.defaultValue;
              if (!this.value || !datetimepicker.data('xdsoft_datetime').isValidDate(dateHelper.parseDate(this.value, options.format))) {
                datetimepicker.data('changed', false);
              }
              datetimepicker.data('xdsoft_datetime').setCurrentTime(this.value);
              break;
            case 'validate':
              $input = datetimepicker.data('input');
              $input.trigger('blur.xdsoft');
              break;
            default:
              if (datetimepicker[opt] && $.isFunction(datetimepicker[opt])) {
                result = datetimepicker[opt](opt2);
              }
          }
        } else {
          datetimepicker
            .setOptions(opt);
        }
        return 0;
      }
      if ($.type(opt) !== 'string') {
        if (!options.lazyInit || options.open || options.inline) {
          createDateTimePicker($(this));
        } else {
          lazyInit($(this));
        }
      }
    });

    return result;
  };

  $.fn.datetimepicker.defaults = default_options;

  function HighlightedDate(date, desc, style) {
    "use strict";
    this.date = date;
    this.desc = desc;
    this.style = style;
  }
};
;(function (factory) {
  if ( typeof define === 'function' && define.amd ) {
    // AMD. Register as an anonymous module.
    define(['jquery', 'jquery-mousewheel'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS style for Browserify
    module.exports = factory(require('jquery'));;
  } else {
    // Browser globals
    factory(jQuery);
  }
}(datetimepickerFactory));



/*!
 * jQuery Mousewheel 3.1.13
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 */

(function (factory) {
    if ( typeof define === 'function' && define.amd ) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
        toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
                    ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
        slice  = Array.prototype.slice,
        nullLowestDeltaTimeout, lowestDelta;

    if ( $.event.fixHooks ) {
        for ( var i = toFix.length; i; ) {
            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
        }
    }

    var special = $.event.special.mousewheel = {
        version: '3.1.12',

        setup: function() {
            if ( this.addEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.addEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
            // Store the line height and page height for this particular element
            $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
            $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
        },

        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.removeEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
            // Clean up the data we added to the element
            $.removeData(this, 'mousewheel-line-height');
            $.removeData(this, 'mousewheel-page-height');
        },

        getLineHeight: function(elem) {
            var $elem = $(elem),
                $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
            if (!$parent.length) {
                $parent = $('body');
            }
            return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
        },

        getPageHeight: function(elem) {
            return $(elem).height();
        },

        settings: {
            adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
            normalizeOffset: true  // calls getBoundingClientRect for each event
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
        },

        unmousewheel: function(fn) {
            return this.unbind('mousewheel', fn);
        }
    });


    function handler(event) {
        var orgEvent   = event || window.event,
            args       = slice.call(arguments, 1),
            delta      = 0,
            deltaX     = 0,
            deltaY     = 0,
            absDelta   = 0,
            offsetX    = 0,
            offsetY    = 0;
        event = $.event.fix(orgEvent);
        event.type = 'mousewheel';

        // Old school scrollwheel delta
        if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1;      }
        if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;       }
        if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;      }
        if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }

        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
        if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
            deltaX = deltaY * -1;
            deltaY = 0;
        }

        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
        delta = deltaY === 0 ? deltaX : deltaY;

        // New school wheel delta (wheel event)
        if ( 'deltaY' in orgEvent ) {
            deltaY = orgEvent.deltaY * -1;
            delta  = deltaY;
        }
        if ( 'deltaX' in orgEvent ) {
            deltaX = orgEvent.deltaX;
            if ( deltaY === 0 ) { delta  = deltaX * -1; }
        }

        // No change actually happened, no reason to go any further
        if ( deltaY === 0 && deltaX === 0 ) { return; }

        // Need to convert lines and pages to pixels if we aren't already in pixels
        // There are three delta modes:
        //   * deltaMode 0 is by pixels, nothing to do
        //   * deltaMode 1 is by lines
        //   * deltaMode 2 is by pages
        if ( orgEvent.deltaMode === 1 ) {
            var lineHeight = $.data(this, 'mousewheel-line-height');
            delta  *= lineHeight;
            deltaY *= lineHeight;
            deltaX *= lineHeight;
        } else if ( orgEvent.deltaMode === 2 ) {
            var pageHeight = $.data(this, 'mousewheel-page-height');
            delta  *= pageHeight;
            deltaY *= pageHeight;
            deltaX *= pageHeight;
        }

        // Store lowest absolute delta to normalize the delta values
        absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );

        if ( !lowestDelta || absDelta < lowestDelta ) {
            lowestDelta = absDelta;

            // Adjust older deltas if necessary
            if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
                lowestDelta /= 40;
            }
        }

        // Adjust older deltas if necessary
        if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
            // Divide all the things by 40!
            delta  /= 40;
            deltaX /= 40;
            deltaY /= 40;
        }

        // Get a whole, normalized value for the deltas
        delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
        deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
        deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

        // Normalise offsetX and offsetY properties
        if ( special.settings.normalizeOffset && this.getBoundingClientRect ) {
            var boundingRect = this.getBoundingClientRect();
            offsetX = event.clientX - boundingRect.left;
            offsetY = event.clientY - boundingRect.top;
        }

        // Add information to the event object
        event.deltaX = deltaX;
        event.deltaY = deltaY;
        event.deltaFactor = lowestDelta;
        event.offsetX = offsetX;
        event.offsetY = offsetY;
        // Go ahead and set deltaMode to 0 since we converted to pixels
        // Although this is a little odd since we overwrite the deltaX/Y
        // properties with normalized deltas.
        event.deltaMode = 0;

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        // Clearout lowestDelta after sometime to better
        // handle multiple device types that give different
        // a different lowestDelta
        // Ex: trackpad = 3 and mouse wheel = 120
        if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

    function nullLowestDelta() {
        lowestDelta = null;
    }

    function shouldAdjustOldDeltas(orgEvent, absDelta) {
        // If this is an older event and the delta is divisable by 120,
        // then we are assuming that the browser is treating this as an
        // older mouse wheel event and that we should divide the deltas
        // by 40 to try and get a more usable deltaFactor.
        // Side note, this actually impacts the reported scroll distance
        // in older browsers and can cause scrolling to be slower than native.
        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
    }

}));

;/**
 * Owl Carousel v2.2.1
 * Copyright 2013-2017 David Deutsch
 * Licensed under  ()
 */
/**
 * Owl carousel
 * @version 2.1.6
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 * @todo Lazy Load Icon
 * @todo prevent animationend bubling
 * @todo itemsScaleUp
 * @todo Test Zepto
 * @todo stagePadding calculate wrong active classes
 */
;(function($, window, document, undefined) {

  /**
   * Creates a carousel.
   * @class The Owl Carousel.
   * @public
   * @param {HTMLElement|jQuery} element - The element to create the carousel for.
   * @param {Object} [options] - The options
   */
  function Owl(element, options) {

    /**
     * Current settings for the carousel.
     * @public
     */
    this.settings = null;

    /**
     * Current options set by the caller including defaults.
     * @public
     */
    this.options = $.extend({}, Owl.Defaults, options);

    /**
     * Plugin element.
     * @public
     */
    this.$element = $(element);

    /**
     * Proxied event handlers.
     * @protected
     */
    this._handlers = {};

    /**
     * References to the running plugins of this carousel.
     * @protected
     */
    this._plugins = {};

    /**
     * Currently suppressed events to prevent them from beeing retriggered.
     * @protected
     */
    this._supress = {};

    /**
     * Absolute current position.
     * @protected
     */
    this._current = null;

    /**
     * Animation speed in milliseconds.
     * @protected
     */
    this._speed = null;

    /**
     * Coordinates of all items in pixel.
     * @todo The name of this member is missleading.
     * @protected
     */
    this._coordinates = [];

    /**
     * Current breakpoint.
     * @todo Real media queries would be nice.
     * @protected
     */
    this._breakpoint = null;

    /**
     * Current width of the plugin element.
     */
    this._width = null;

    /**
     * All real items.
     * @protected
     */
    this._items = [];

    /**
     * All cloned items.
     * @protected
     */
    this._clones = [];

    /**
     * Merge values of all items.
     * @todo Maybe this could be part of a plugin.
     * @protected
     */
    this._mergers = [];

    /**
     * Widths of all items.
     */
    this._widths = [];

    /**
     * Invalidated parts within the update process.
     * @protected
     */
    this._invalidated = {};

    /**
     * Ordered list of workers for the update process.
     * @protected
     */
    this._pipe = [];

    /**
     * Current state information for the drag operation.
     * @todo #261
     * @protected
     */
    this._drag = {
      time: null,
      target: null,
      pointer: null,
      stage: {
        start: null,
        current: null
      },
      direction: null
    };

    /**
     * Current state information and their tags.
     * @type {Object}
     * @protected
     */
    this._states = {
      current: {},
      tags: {
        'initializing': [ 'busy' ],
        'animating': [ 'busy' ],
        'dragging': [ 'interacting' ]
      }
    };

    $.each([ 'onResize', 'onThrottledResize' ], $.proxy(function(i, handler) {
      this._handlers[handler] = $.proxy(this[handler], this);
    }, this));

    $.each(Owl.Plugins, $.proxy(function(key, plugin) {
      this._plugins[key.charAt(0).toLowerCase() + key.slice(1)]
        = new plugin(this);
    }, this));

    $.each(Owl.Workers, $.proxy(function(priority, worker) {
      this._pipe.push({
        'filter': worker.filter,
        'run': $.proxy(worker.run, this)
      });
    }, this));

    this.setup();
    this.initialize();
  }

  /**
   * Default options for the carousel.
   * @public
   */
  Owl.Defaults = {
    items: 3,
    loop: false,
    center: false,
    rewind: false,

    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    freeDrag: false,

    margin: 0,
    stagePadding: 0,

    merge: false,
    mergeFit: true,
    autoWidth: false,

    startPosition: 0,
    rtl: false,

    smartSpeed: 250,
    fluidSpeed: false,
    dragEndSpeed: false,

    responsive: {},
    responsiveRefreshRate: 200,
    responsiveBaseElement: window,

    fallbackEasing: 'swing',

    info: false,

    nestedItemSelector: false,
    itemElement: 'div',
    stageElement: 'div',

    refreshClass: 'owl-refresh',
    loadedClass: 'owl-loaded',
    loadingClass: 'owl-loading',
    rtlClass: 'owl-rtl',
    responsiveClass: 'owl-responsive',
    dragClass: 'owl-drag',
    itemClass: 'owl-item',
    stageClass: 'owl-stage',
    stageOuterClass: 'owl-stage-outer',
    grabClass: 'owl-grab'
  };

  /**
   * Enumeration for width.
   * @public
   * @readonly
   * @enum {String}
   */
  Owl.Width = {
    Default: 'default',
    Inner: 'inner',
    Outer: 'outer'
  };

  /**
   * Enumeration for types.
   * @public
   * @readonly
   * @enum {String}
   */
  Owl.Type = {
    Event: 'event',
    State: 'state'
  };

  /**
   * Contains all registered plugins.
   * @public
   */
  Owl.Plugins = {};

  /**
   * List of workers involved in the update process.
   */
  Owl.Workers = [ {
    filter: [ 'width', 'settings' ],
    run: function() {
      this._width = this.$element.width();
    }
  }, {
    filter: [ 'width', 'items', 'settings' ],
    run: function(cache) {
      cache.current = this._items && this._items[this.relative(this._current)];
    }
  }, {
    filter: [ 'items', 'settings' ],
    run: function() {
      this.$stage.children('.cloned').remove();
    }
  }, {
    filter: [ 'width', 'items', 'settings' ],
    run: function(cache) {
      var margin = this.settings.margin || '',
        grid = !this.settings.autoWidth,
        rtl = this.settings.rtl,
        css = {
          'width': 'auto',
          'margin-left': rtl ? margin : '',
          'margin-right': rtl ? '' : margin
        };

      !grid && this.$stage.children().css(css);

      cache.css = css;
    }
  }, {
    filter: [ 'width', 'items', 'settings' ],
    run: function(cache) {
      var width = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
        merge = null,
        iterator = this._items.length,
        grid = !this.settings.autoWidth,
        widths = [];

      cache.items = {
        merge: false,
        width: width
      };

      while (iterator--) {
        merge = this._mergers[iterator];
        merge = this.settings.mergeFit && Math.min(merge, this.settings.items) || merge;

        cache.items.merge = merge > 1 || cache.items.merge;

        widths[iterator] = !grid ? this._items[iterator].width() : width * merge;
      }

      this._widths = widths;
    }
  }, {
    filter: [ 'items', 'settings' ],
    run: function() {
      var clones = [],
        items = this._items,
        settings = this.settings,
        // TODO: Should be computed from number of min width items in stage
        view = Math.max(settings.items * 2, 4),
        size = Math.ceil(items.length / 2) * 2,
        repeat = settings.loop && items.length ? settings.rewind ? view : Math.max(view, size) : 0,
        append = '',
        prepend = '';

      repeat /= 2;

      while (repeat--) {
        // Switch to only using appended clones
        clones.push(this.normalize(clones.length / 2, true));
        append = append + items[clones[clones.length - 1]][0].outerHTML;
        clones.push(this.normalize(items.length - 1 - (clones.length - 1) / 2, true));
        prepend = items[clones[clones.length - 1]][0].outerHTML + prepend;
      }

      this._clones = clones;

      $(append).addClass('cloned').appendTo(this.$stage);
      $(prepend).addClass('cloned').prependTo(this.$stage);
    }
  }, {
    filter: [ 'width', 'items', 'settings' ],
    run: function() {
      var rtl = this.settings.rtl ? 1 : -1,
        size = this._clones.length + this._items.length,
        iterator = -1,
        previous = 0,
        current = 0,
        coordinates = [];

      while (++iterator < size) {
        previous = coordinates[iterator - 1] || 0;
        current = this._widths[this.relative(iterator)] + this.settings.margin;
        coordinates.push(previous + current * rtl);
      }

      this._coordinates = coordinates;
    }
  }, {
    filter: [ 'width', 'items', 'settings' ],
    run: function() {
      var padding = this.settings.stagePadding,
        coordinates = this._coordinates,
        css = {
          'width': Math.ceil(Math.abs(coordinates[coordinates.length - 1])) + padding * 2,
          'padding-left': padding || '',
          'padding-right': padding || ''
        };

      this.$stage.css(css);
    }
  }, {
    filter: [ 'width', 'items', 'settings' ],
    run: function(cache) {
      var iterator = this._coordinates.length,
        grid = !this.settings.autoWidth,
        items = this.$stage.children();

      if (grid && cache.items.merge) {
        while (iterator--) {
          cache.css.width = this._widths[this.relative(iterator)];
          items.eq(iterator).css(cache.css);
        }
      } else if (grid) {
        cache.css.width = cache.items.width;
        items.css(cache.css);
      }
    }
  }, {
    filter: [ 'items' ],
    run: function() {
      this._coordinates.length < 1 && this.$stage.removeAttr('style');
    }
  }, {
    filter: [ 'width', 'items', 'settings' ],
    run: function(cache) {
      cache.current = cache.current ? this.$stage.children().index(cache.current) : 0;
      cache.current = Math.max(this.minimum(), Math.min(this.maximum(), cache.current));
      this.reset(cache.current);
    }
  }, {
    filter: [ 'position' ],
    run: function() {
      this.animate(this.coordinates(this._current));
    }
  }, {
    filter: [ 'width', 'position', 'items', 'settings' ],
    run: function() {
      var rtl = this.settings.rtl ? 1 : -1,
        padding = this.settings.stagePadding * 2,
        begin = this.coordinates(this.current()) + padding,
        end = begin + this.width() * rtl,
        inner, outer, matches = [], i, n;

      for (i = 0, n = this._coordinates.length; i < n; i++) {
        inner = this._coordinates[i - 1] || 0;
        outer = Math.abs(this._coordinates[i]) + padding * rtl;

        if ((this.op(inner, '<=', begin) && (this.op(inner, '>', end)))
          || (this.op(outer, '<', begin) && this.op(outer, '>', end))) {
          matches.push(i);
        }
      }

      this.$stage.children('.active').removeClass('active');
      this.$stage.children(':eq(' + matches.join('), :eq(') + ')').addClass('active');

      if (this.settings.center) {
        this.$stage.children('.center').removeClass('center');
        this.$stage.children().eq(this.current()).addClass('center');
      }
    }
  } ];

  /**
   * Initializes the carousel.
   * @protected
   */
  Owl.prototype.initialize = function() {
    this.enter('initializing');
    this.trigger('initialize');

    this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl);

    if (this.settings.autoWidth && !this.is('pre-loading')) {
      var imgs, nestedSelector, width;
      imgs = this.$element.find('img');
      nestedSelector = this.settings.nestedItemSelector ? '.' + this.settings.nestedItemSelector : undefined;
      width = this.$element.children(nestedSelector).width();

      if (imgs.length && width <= 0) {
        this.preloadAutoWidthImages(imgs);
      }
    }

    this.$element.addClass(this.options.loadingClass);

    // create stage
    this.$stage = $('<' + this.settings.stageElement + ' class="' + this.settings.stageClass + '"/>')
      .wrap('<div class="' + this.settings.stageOuterClass + '"/>');

    // append stage
    this.$element.append(this.$stage.parent());

    // append content
    this.replace(this.$element.children().not(this.$stage.parent()));

    // check visibility
    if (this.$element.is(':visible')) {
      // update view
      this.refresh();
    } else {
      // invalidate width
      this.invalidate('width');
    }

    this.$element
      .removeClass(this.options.loadingClass)
      .addClass(this.options.loadedClass);

    // register event handlers
    this.registerEventHandlers();

    this.leave('initializing');
    this.trigger('initialized');
  };

  /**
   * Setups the current settings.
   * @todo Remove responsive classes. Why should adaptive designs be brought into IE8?
   * @todo Support for media queries by using `matchMedia` would be nice.
   * @public
   */
  Owl.prototype.setup = function() {
    var viewport = this.viewport(),
      overwrites = this.options.responsive,
      match = -1,
      settings = null;

    if (!overwrites) {
      settings = $.extend({}, this.options);
    } else {
      $.each(overwrites, function(breakpoint) {
        if (breakpoint <= viewport && breakpoint > match) {
          match = Number(breakpoint);
        }
      });

      settings = $.extend({}, this.options, overwrites[match]);
      if (typeof settings.stagePadding === 'function') {
        settings.stagePadding = settings.stagePadding();
      }
      delete settings.responsive;

      // responsive class
      if (settings.responsiveClass) {
        this.$element.attr('class',
          this.$element.attr('class').replace(new RegExp('(' + this.options.responsiveClass + '-)\\S+\\s', 'g'), '$1' + match)
        );
      }
    }

    this.trigger('change', { property: { name: 'settings', value: settings } });
    this._breakpoint = match;
    this.settings = settings;
    this.invalidate('settings');
    this.trigger('changed', { property: { name: 'settings', value: this.settings } });
  };

  /**
   * Updates option logic if necessery.
   * @protected
   */
  Owl.prototype.optionsLogic = function() {
    if (this.settings.autoWidth) {
      this.settings.stagePadding = false;
      this.settings.merge = false;
    }
  };

  /**
   * Prepares an item before add.
   * @todo Rename event parameter `content` to `item`.
   * @protected
   * @returns {jQuery|HTMLElement} - The item container.
   */
  Owl.prototype.prepare = function(item) {
    var event = this.trigger('prepare', { content: item });

    if (!event.data) {
      event.data = $('<' + this.settings.itemElement + '/>')
        .addClass(this.options.itemClass).append(item)
    }

    this.trigger('prepared', { content: event.data });

    return event.data;
  };

  /**
   * Updates the view.
   * @public
   */
  Owl.prototype.update = function() {
    var i = 0,
      n = this._pipe.length,
      filter = $.proxy(function(p) { return this[p] }, this._invalidated),
      cache = {};

    while (i < n) {
      if (this._invalidated.all || $.grep(this._pipe[i].filter, filter).length > 0) {
        this._pipe[i].run(cache);
      }
      i++;
    }

    this._invalidated = {};

    !this.is('valid') && this.enter('valid');
  };

  /**
   * Gets the width of the view.
   * @public
   * @param {Owl.Width} [dimension=Owl.Width.Default] - The dimension to return.
   * @returns {Number} - The width of the view in pixel.
   */
  Owl.prototype.width = function(dimension) {
    dimension = dimension || Owl.Width.Default;
    switch (dimension) {
      case Owl.Width.Inner:
      case Owl.Width.Outer:
        return this._width;
      default:
        return this._width - this.settings.stagePadding * 2 + this.settings.margin;
    }
  };

  /**
   * Refreshes the carousel primarily for adaptive purposes.
   * @public
   */
  Owl.prototype.refresh = function() {
    this.enter('refreshing');
    this.trigger('refresh');

    this.setup();

    this.optionsLogic();

    this.$element.addClass(this.options.refreshClass);

    this.update();

    this.$element.removeClass(this.options.refreshClass);

    this.leave('refreshing');
    this.trigger('refreshed');
  };

  /**
   * Checks window `resize` event.
   * @protected
   */
  Owl.prototype.onThrottledResize = function() {
    window.clearTimeout(this.resizeTimer);
    this.resizeTimer = window.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate);
  };

  /**
   * Checks window `resize` event.
   * @protected
   */
  Owl.prototype.onResize = function() {
    if (!this._items.length) {
      return false;
    }

    if (this._width === this.$element.width()) {
      return false;
    }

    if (!this.$element.is(':visible')) {
      return false;
    }

    this.enter('resizing');

    if (this.trigger('resize').isDefaultPrevented()) {
      this.leave('resizing');
      return false;
    }

    this.invalidate('width');

    this.refresh();

    this.leave('resizing');
    this.trigger('resized');
  };

  /**
   * Registers event handlers.
   * @todo Check `msPointerEnabled`
   * @todo #261
   * @protected
   */
  Owl.prototype.registerEventHandlers = function() {
    if ($.support.transition) {
      this.$stage.on($.support.transition.end + '.owl.core', $.proxy(this.onTransitionEnd, this));
    }

    if (this.settings.responsive !== false) {
      this.on(window, 'resize', this._handlers.onThrottledResize);
    }

    if (this.settings.mouseDrag) {
      this.$element.addClass(this.options.dragClass);
      this.$stage.on('mousedown.owl.core', $.proxy(this.onDragStart, this));
      this.$stage.on('dragstart.owl.core selectstart.owl.core', function() { return false });
    }

    if (this.settings.touchDrag){
      this.$stage.on('touchstart.owl.core', $.proxy(this.onDragStart, this));
      this.$stage.on('touchcancel.owl.core', $.proxy(this.onDragEnd, this));
    }
  };

  /**
   * Handles `touchstart` and `mousedown` events.
   * @todo Horizontal swipe threshold as option
   * @todo #261
   * @protected
   * @param {Event} event - The event arguments.
   */
  Owl.prototype.onDragStart = function(event) {
    var stage = null;

    if (event.which === 3) {
      return;
    }

    if ($.support.transform) {
      stage = this.$stage.css('transform').replace(/.*\(|\)| /g, '').split(',');
      stage = {
        x: stage[stage.length === 16 ? 12 : 4],
        y: stage[stage.length === 16 ? 13 : 5]
      };
    } else {
      stage = this.$stage.position();
      stage = {
        x: this.settings.rtl ?
          stage.left + this.$stage.width() - this.width() + this.settings.margin :
          stage.left,
        y: stage.top
      };
    }

    if (this.is('animating')) {
      $.support.transform ? this.animate(stage.x) : this.$stage.stop()
      this.invalidate('position');
    }

    this.$element.toggleClass(this.options.grabClass, event.type === 'mousedown');

    this.speed(0);

    this._drag.time = new Date().getTime();
    this._drag.target = $(event.target);
    this._drag.stage.start = stage;
    this._drag.stage.current = stage;
    this._drag.pointer = this.pointer(event);

    $(document).on('mouseup.owl.core touchend.owl.core', $.proxy(this.onDragEnd, this));

    $(document).one('mousemove.owl.core touchmove.owl.core', $.proxy(function(event) {
      var delta = this.difference(this._drag.pointer, this.pointer(event));

      $(document).on('mousemove.owl.core touchmove.owl.core', $.proxy(this.onDragMove, this));

      if (Math.abs(delta.x) < Math.abs(delta.y) && this.is('valid')) {
        return;
      }

      event.preventDefault();

      this.enter('dragging');
      this.trigger('drag');
    }, this));
  };

  /**
   * Handles the `touchmove` and `mousemove` events.
   * @todo #261
   * @protected
   * @param {Event} event - The event arguments.
   */
  Owl.prototype.onDragMove = function(event) {
    var minimum = null,
      maximum = null,
      pull = null,
      delta = this.difference(this._drag.pointer, this.pointer(event)),
      stage = this.difference(this._drag.stage.start, delta);

    if (!this.is('dragging')) {
      return;
    }

    event.preventDefault();

    if (this.settings.loop) {
      minimum = this.coordinates(this.minimum());
      maximum = this.coordinates(this.maximum() + 1) - minimum;
      stage.x = (((stage.x - minimum) % maximum + maximum) % maximum) + minimum;
    } else {
      minimum = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum());
      maximum = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum());
      pull = this.settings.pullDrag ? -1 * delta.x / 5 : 0;
      stage.x = Math.max(Math.min(stage.x, minimum + pull), maximum + pull);
    }

    this._drag.stage.current = stage;

    this.animate(stage.x);
  };

  /**
   * Handles the `touchend` and `mouseup` events.
   * @todo #261
   * @todo Threshold for click event
   * @protected
   * @param {Event} event - The event arguments.
   */
  Owl.prototype.onDragEnd = function(event) {
    var delta = this.difference(this._drag.pointer, this.pointer(event)),
      stage = this._drag.stage.current,
      direction = delta.x > 0 ^ this.settings.rtl ? 'left' : 'right';

    $(document).off('.owl.core');

    this.$element.removeClass(this.options.grabClass);

    if (delta.x !== 0 && this.is('dragging') || !this.is('valid')) {
      this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed);
      this.current(this.closest(stage.x, delta.x !== 0 ? direction : this._drag.direction));
      this.invalidate('position');
      this.update();

      this._drag.direction = direction;

      if (Math.abs(delta.x) > 3 || new Date().getTime() - this._drag.time > 300) {
        this._drag.target.one('click.owl.core', function() { return false; });
      }
    }

    if (!this.is('dragging')) {
      return;
    }

    this.leave('dragging');
    this.trigger('dragged');
  };

  /**
   * Gets absolute position of the closest item for a coordinate.
   * @todo Setting `freeDrag` makes `closest` not reusable. See #165.
   * @protected
   * @param {Number} coordinate - The coordinate in pixel.
   * @param {String} direction - The direction to check for the closest item. Ether `left` or `right`.
   * @return {Number} - The absolute position of the closest item.
   */
  Owl.prototype.closest = function(coordinate, direction) {
    var position = -1,
      pull = 30,
      width = this.width(),
      coordinates = this.coordinates();

    if (!this.settings.freeDrag) {
      // check closest item
      $.each(coordinates, $.proxy(function(index, value) {
        // on a left pull, check on current index
        if (direction === 'left' && coordinate > value - pull && coordinate < value + pull) {
          position = index;
        // on a right pull, check on previous index
        // to do so, subtract width from value and set position = index + 1
        } else if (direction === 'right' && coordinate > value - width - pull && coordinate < value - width + pull) {
          position = index + 1;
        } else if (this.op(coordinate, '<', value)
          && this.op(coordinate, '>', coordinates[index + 1] || value - width)) {
          position = direction === 'left' ? index + 1 : index;
        }
        return position === -1;
      }, this));
    }

    if (!this.settings.loop) {
      // non loop boundries
      if (this.op(coordinate, '>', coordinates[this.minimum()])) {
        position = coordinate = this.minimum();
      } else if (this.op(coordinate, '<', coordinates[this.maximum()])) {
        position = coordinate = this.maximum();
      }
    }

    return position;
  };

  /**
   * Animates the stage.
   * @todo #270
   * @public
   * @param {Number} coordinate - The coordinate in pixels.
   */
  Owl.prototype.animate = function(coordinate) {
    var animate = this.speed() > 0;

    this.is('animating') && this.onTransitionEnd();

    if (animate) {
      this.enter('animating');
      this.trigger('translate');
    }

    if ($.support.transform3d && $.support.transition) {
      this.$stage.css({
        transform: 'translate3d(' + coordinate + 'px,0px,0px)',
        transition: (this.speed() / 1000) + 's'
      });
    } else if (animate) {
      this.$stage.animate({
        left: coordinate + 'px'
      }, this.speed(), this.settings.fallbackEasing, $.proxy(this.onTransitionEnd, this));
    } else {
      this.$stage.css({
        left: coordinate + 'px'
      });
    }
  };

  /**
   * Checks whether the carousel is in a specific state or not.
   * @param {String} state - The state to check.
   * @returns {Boolean} - The flag which indicates if the carousel is busy.
   */
  Owl.prototype.is = function(state) {
    return this._states.current[state] && this._states.current[state] > 0;
  };

  /**
   * Sets the absolute position of the current item.
   * @public
   * @param {Number} [position] - The new absolute position or nothing to leave it unchanged.
   * @returns {Number} - The absolute position of the current item.
   */
  Owl.prototype.current = function(position) {
    if (position === undefined) {
      return this._current;
    }

    if (this._items.length === 0) {
      return undefined;
    }

    position = this.normalize(position);

    if (this._current !== position) {
      var event = this.trigger('change', { property: { name: 'position', value: position } });

      if (event.data !== undefined) {
        position = this.normalize(event.data);
      }

      this._current = position;

      this.invalidate('position');

      this.trigger('changed', { property: { name: 'position', value: this._current } });
    }

    return this._current;
  };

  /**
   * Invalidates the given part of the update routine.
   * @param {String} [part] - The part to invalidate.
   * @returns {Array.<String>} - The invalidated parts.
   */
  Owl.prototype.invalidate = function(part) {
    if ($.type(part) === 'string') {
      this._invalidated[part] = true;
      this.is('valid') && this.leave('valid');
    }
    return $.map(this._invalidated, function(v, i) { return i });
  };

  /**
   * Resets the absolute position of the current item.
   * @public
   * @param {Number} position - The absolute position of the new item.
   */
  Owl.prototype.reset = function(position) {
    position = this.normalize(position);

    if (position === undefined) {
      return;
    }

    this._speed = 0;
    this._current = position;

    this.suppress([ 'translate', 'translated' ]);

    this.animate(this.coordinates(position));

    this.release([ 'translate', 'translated' ]);
  };

  /**
   * Normalizes an absolute or a relative position of an item.
   * @public
   * @param {Number} position - The absolute or relative position to normalize.
   * @param {Boolean} [relative=false] - Whether the given position is relative or not.
   * @returns {Number} - The normalized position.
   */
  Owl.prototype.normalize = function(position, relative) {
    var n = this._items.length,
      m = relative ? 0 : this._clones.length;

    if (!this.isNumeric(position) || n < 1) {
      position = undefined;
    } else if (position < 0 || position >= n + m) {
      position = ((position - m / 2) % n + n) % n + m / 2;
    }

    return position;
  };

  /**
   * Converts an absolute position of an item into a relative one.
   * @public
   * @param {Number} position - The absolute position to convert.
   * @returns {Number} - The converted position.
   */
  Owl.prototype.relative = function(position) {
    position -= this._clones.length / 2;
    return this.normalize(position, true);
  };

  /**
   * Gets the maximum position for the current item.
   * @public
   * @param {Boolean} [relative=false] - Whether to return an absolute position or a relative position.
   * @returns {Number}
   */
  Owl.prototype.maximum = function(relative) {
    var settings = this.settings,
      maximum = this._coordinates.length,
      iterator,
      reciprocalItemsWidth,
      elementWidth;

    if (settings.loop) {
      maximum = this._clones.length / 2 + this._items.length - 1;
    } else if (settings.autoWidth || settings.merge) {
      iterator = this._items.length;
      reciprocalItemsWidth = this._items[--iterator].width();
      elementWidth = this.$element.width();
      while (iterator--) {
        reciprocalItemsWidth += this._items[iterator].width() + this.settings.margin;
        if (reciprocalItemsWidth > elementWidth) {
          break;
        }
      }
      maximum = iterator + 1;
    } else if (settings.center) {
      maximum = this._items.length - 1;
    } else {
      maximum = this._items.length - settings.items;
    }

    if (relative) {
      maximum -= this._clones.length / 2;
    }

    return Math.max(maximum, 0);
  };

  /**
   * Gets the minimum position for the current item.
   * @public
   * @param {Boolean} [relative=false] - Whether to return an absolute position or a relative position.
   * @returns {Number}
   */
  Owl.prototype.minimum = function(relative) {
    return relative ? 0 : this._clones.length / 2;
  };

  /**
   * Gets an item at the specified relative position.
   * @public
   * @param {Number} [position] - The relative position of the item.
   * @return {jQuery|Array.<jQuery>} - The item at the given position or all items if no position was given.
   */
  Owl.prototype.items = function(position) {
    if (position === undefined) {
      return this._items.slice();
    }

    position = this.normalize(position, true);
    return this._items[position];
  };

  /**
   * Gets an item at the specified relative position.
   * @public
   * @param {Number} [position] - The relative position of the item.
   * @return {jQuery|Array.<jQuery>} - The item at the given position or all items if no position was given.
   */
  Owl.prototype.mergers = function(position) {
    if (position === undefined) {
      return this._mergers.slice();
    }

    position = this.normalize(position, true);
    return this._mergers[position];
  };

  /**
   * Gets the absolute positions of clones for an item.
   * @public
   * @param {Number} [position] - The relative position of the item.
   * @returns {Array.<Number>} - The absolute positions of clones for the item or all if no position was given.
   */
  Owl.prototype.clones = function(position) {
    var odd = this._clones.length / 2,
      even = odd + this._items.length,
      map = function(index) { return index % 2 === 0 ? even + index / 2 : odd - (index + 1) / 2 };

    if (position === undefined) {
      return $.map(this._clones, function(v, i) { return map(i) });
    }

    return $.map(this._clones, function(v, i) { return v === position ? map(i) : null });
  };

  /**
   * Sets the current animation speed.
   * @public
   * @param {Number} [speed] - The animation speed in milliseconds or nothing to leave it unchanged.
   * @returns {Number} - The current animation speed in milliseconds.
   */
  Owl.prototype.speed = function(speed) {
    if (speed !== undefined) {
      this._speed = speed;
    }

    return this._speed;
  };

  /**
   * Gets the coordinate of an item.
   * @todo The name of this method is missleanding.
   * @public
   * @param {Number} position - The absolute position of the item within `minimum()` and `maximum()`.
   * @returns {Number|Array.<Number>} - The coordinate of the item in pixel or all coordinates.
   */
  Owl.prototype.coordinates = function(position) {
    var multiplier = 1,
      newPosition = position - 1,
      coordinate;

    if (position === undefined) {
      return $.map(this._coordinates, $.proxy(function(coordinate, index) {
        return this.coordinates(index);
      }, this));
    }

    if (this.settings.center) {
      if (this.settings.rtl) {
        multiplier = -1;
        newPosition = position + 1;
      }

      coordinate = this._coordinates[position];
      coordinate += (this.width() - coordinate + (this._coordinates[newPosition] || 0)) / 2 * multiplier;
    } else {
      coordinate = this._coordinates[newPosition] || 0;
    }

    coordinate = Math.ceil(coordinate);

    return coordinate;
  };

  /**
   * Calculates the speed for a translation.
   * @protected
   * @param {Number} from - The absolute position of the start item.
   * @param {Number} to - The absolute position of the target item.
   * @param {Number} [factor=undefined] - The time factor in milliseconds.
   * @returns {Number} - The time in milliseconds for the translation.
   */
  Owl.prototype.duration = function(from, to, factor) {
    if (factor === 0) {
      return 0;
    }

    return Math.min(Math.max(Math.abs(to - from), 1), 6) * Math.abs((factor || this.settings.smartSpeed));
  };

  /**
   * Slides to the specified item.
   * @public
   * @param {Number} position - The position of the item.
   * @param {Number} [speed] - The time in milliseconds for the transition.
   */
  Owl.prototype.to = function(position, speed) {
    var current = this.current(),
      revert = null,
      distance = position - this.relative(current),
      direction = (distance > 0) - (distance < 0),
      items = this._items.length,
      minimum = this.minimum(),
      maximum = this.maximum();

    if (this.settings.loop) {
      if (!this.settings.rewind && Math.abs(distance) > items / 2) {
        distance += direction * -1 * items;
      }

      position = current + distance;
      revert = ((position - minimum) % items + items) % items + minimum;

      if (revert !== position && revert - distance <= maximum && revert - distance > 0) {
        current = revert - distance;
        position = revert;
        this.reset(current);
      }
    } else if (this.settings.rewind) {
      maximum += 1;
      position = (position % maximum + maximum) % maximum;
    } else {
      position = Math.max(minimum, Math.min(maximum, position));
    }

    this.speed(this.duration(current, position, speed));
    this.current(position);

    if (this.$element.is(':visible')) {
      this.update();
    }
  };

  /**
   * Slides to the next item.
   * @public
   * @param {Number} [speed] - The time in milliseconds for the transition.
   */
  Owl.prototype.next = function(speed) {
    speed = speed || false;
    this.to(this.relative(this.current()) + 1, speed);
  };

  /**
   * Slides to the previous item.
   * @public
   * @param {Number} [speed] - The time in milliseconds for the transition.
   */
  Owl.prototype.prev = function(speed) {
    speed = speed || false;
    this.to(this.relative(this.current()) - 1, speed);
  };

  /**
   * Handles the end of an animation.
   * @protected
   * @param {Event} event - The event arguments.
   */
  Owl.prototype.onTransitionEnd = function(event) {

    // if css2 animation then event object is undefined
    if (event !== undefined) {
      event.stopPropagation();

      // Catch only owl-stage transitionEnd event
      if ((event.target || event.srcElement || event.originalTarget) !== this.$stage.get(0)) {
        return false;
      }
    }

    this.leave('animating');
    this.trigger('translated');
  };

  /**
   * Gets viewport width.
   * @protected
   * @return {Number} - The width in pixel.
   */
  Owl.prototype.viewport = function() {
    var width;
    if (this.options.responsiveBaseElement !== window) {
      width = $(this.options.responsiveBaseElement).width();
    } else if (window.innerWidth) {
      width = window.innerWidth;
    } else if (document.documentElement && document.documentElement.clientWidth) {
      width = document.documentElement.clientWidth;
    } else {
      console.warn('Can not detect viewport width.');
    }
    return width;
  };

  /**
   * Replaces the current content.
   * @public
   * @param {HTMLElement|jQuery|String} content - The new content.
   */
  Owl.prototype.replace = function(content) {
    this.$stage.empty();
    this._items = [];

    if (content) {
      content = (content instanceof jQuery) ? content : $(content);
    }

    if (this.settings.nestedItemSelector) {
      content = content.find('.' + this.settings.nestedItemSelector);
    }

    content.filter(function() {
      return this.nodeType === 1;
    }).each($.proxy(function(index, item) {
      item = this.prepare(item);
      this.$stage.append(item);
      this._items.push(item);
      this._mergers.push(item.find('[data-merge]').addBack('[data-merge]').attr('data-merge') * 1 || 1);
    }, this));

    this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0);

    this.invalidate('items');
  };

  /**
   * Adds an item.
   * @todo Use `item` instead of `content` for the event arguments.
   * @public
   * @param {HTMLElement|jQuery|String} content - The item content to add.
   * @param {Number} [position] - The relative position at which to insert the item otherwise the item will be added to the end.
   */
  Owl.prototype.add = function(content, position) {
    var current = this.relative(this._current);

    position = position === undefined ? this._items.length : this.normalize(position, true);
    content = content instanceof jQuery ? content : $(content);

    this.trigger('add', { content: content, position: position });

    content = this.prepare(content);

    if (this._items.length === 0 || position === this._items.length) {
      this._items.length === 0 && this.$stage.append(content);
      this._items.length !== 0 && this._items[position - 1].after(content);
      this._items.push(content);
      this._mergers.push(content.find('[data-merge]').addBack('[data-merge]').attr('data-merge') * 1 || 1);
    } else {
      this._items[position].before(content);
      this._items.splice(position, 0, content);
      this._mergers.splice(position, 0, content.find('[data-merge]').addBack('[data-merge]').attr('data-merge') * 1 || 1);
    }

    this._items[current] && this.reset(this._items[current].index());

    this.invalidate('items');

    this.trigger('added', { content: content, position: position });
  };

  /**
   * Removes an item by its position.
   * @todo Use `item` instead of `content` for the event arguments.
   * @public
   * @param {Number} position - The relative position of the item to remove.
   */
  Owl.prototype.remove = function(position) {
    position = this.normalize(position, true);

    if (position === undefined) {
      return;
    }

    this.trigger('remove', { content: this._items[position], position: position });

    this._items[position].remove();
    this._items.splice(position, 1);
    this._mergers.splice(position, 1);

    this.invalidate('items');

    this.trigger('removed', { content: null, position: position });
  };

  /**
   * Preloads images with auto width.
   * @todo Replace by a more generic approach
   * @protected
   */
  Owl.prototype.preloadAutoWidthImages = function(images) {
    images.each($.proxy(function(i, element) {
      this.enter('pre-loading');
      element = $(element);
      $(new Image()).one('load', $.proxy(function(e) {
        element.attr('src', e.target.src);
        element.css('opacity', 1);
        this.leave('pre-loading');
        !this.is('pre-loading') && !this.is('initializing') && this.refresh();
      }, this)).attr('src', element.attr('src') || element.attr('data-src') || element.attr('data-src-retina'));
    }, this));
  };

  /**
   * Destroys the carousel.
   * @public
   */
  Owl.prototype.destroy = function() {

    this.$element.off('.owl.core');
    this.$stage.off('.owl.core');
    $(document).off('.owl.core');

    if (this.settings.responsive !== false) {
      window.clearTimeout(this.resizeTimer);
      this.off(window, 'resize', this._handlers.onThrottledResize);
    }

    for (var i in this._plugins) {
      this._plugins[i].destroy();
    }

    this.$stage.children('.cloned').remove();

    this.$stage.unwrap();
    this.$stage.children().contents().unwrap();
    this.$stage.children().unwrap();

    this.$element
      .removeClass(this.options.refreshClass)
      .removeClass(this.options.loadingClass)
      .removeClass(this.options.loadedClass)
      .removeClass(this.options.rtlClass)
      .removeClass(this.options.dragClass)
      .removeClass(this.options.grabClass)
      .attr('class', this.$element.attr('class').replace(new RegExp(this.options.responsiveClass + '-\\S+\\s', 'g'), ''))
      .removeData('owl.carousel');
  };

  /**
   * Operators to calculate right-to-left and left-to-right.
   * @protected
   * @param {Number} [a] - The left side operand.
   * @param {String} [o] - The operator.
   * @param {Number} [b] - The right side operand.
   */
  Owl.prototype.op = function(a, o, b) {
    var rtl = this.settings.rtl;
    switch (o) {
      case '<':
        return rtl ? a > b : a < b;
      case '>':
        return rtl ? a < b : a > b;
      case '>=':
        return rtl ? a <= b : a >= b;
      case '<=':
        return rtl ? a >= b : a <= b;
      default:
        break;
    }
  };

  /**
   * Attaches to an internal event.
   * @protected
   * @param {HTMLElement} element - The event source.
   * @param {String} event - The event name.
   * @param {Function} listener - The event handler to attach.
   * @param {Boolean} capture - Wether the event should be handled at the capturing phase or not.
   */
  Owl.prototype.on = function(element, event, listener, capture) {
    if (element.addEventListener) {
      element.addEventListener(event, listener, capture);
    } else if (element.attachEvent) {
      element.attachEvent('on' + event, listener);
    }
  };

  /**
   * Detaches from an internal event.
   * @protected
   * @param {HTMLElement} element - The event source.
   * @param {String} event - The event name.
   * @param {Function} listener - The attached event handler to detach.
   * @param {Boolean} capture - Wether the attached event handler was registered as a capturing listener or not.
   */
  Owl.prototype.off = function(element, event, listener, capture) {
    if (element.removeEventListener) {
      element.removeEventListener(event, listener, capture);
    } else if (element.detachEvent) {
      element.detachEvent('on' + event, listener);
    }
  };

  /**
   * Triggers a public event.
   * @todo Remove `status`, `relatedTarget` should be used instead.
   * @protected
   * @param {String} name - The event name.
   * @param {*} [data=null] - The event data.
   * @param {String} [namespace=carousel] - The event namespace.
   * @param {String} [state] - The state which is associated with the event.
   * @param {Boolean} [enter=false] - Indicates if the call enters the specified state or not.
   * @returns {Event} - The event arguments.
   */
  Owl.prototype.trigger = function(name, data, namespace, state, enter) {
    var status = {
      item: { count: this._items.length, index: this.current() }
    }, handler = $.camelCase(
      $.grep([ 'on', name, namespace ], function(v) { return v })
        .join('-').toLowerCase()
    ), event = $.Event(
      [ name, 'owl', namespace || 'carousel' ].join('.').toLowerCase(),
      $.extend({ relatedTarget: this }, status, data)
    );

    if (!this._supress[name]) {
      $.each(this._plugins, function(name, plugin) {
        if (plugin.onTrigger) {
          plugin.onTrigger(event);
        }
      });

      this.register({ type: Owl.Type.Event, name: name });
      this.$element.trigger(event);

      if (this.settings && typeof this.settings[handler] === 'function') {
        this.settings[handler].call(this, event);
      }
    }

    return event;
  };

  /**
   * Enters a state.
   * @param name - The state name.
   */
  Owl.prototype.enter = function(name) {
    $.each([ name ].concat(this._states.tags[name] || []), $.proxy(function(i, name) {
      if (this._states.current[name] === undefined) {
        this._states.current[name] = 0;
      }

      this._states.current[name]++;
    }, this));
  };

  /**
   * Leaves a state.
   * @param name - The state name.
   */
  Owl.prototype.leave = function(name) {
    $.each([ name ].concat(this._states.tags[name] || []), $.proxy(function(i, name) {
      this._states.current[name]--;
    }, this));
  };

  /**
   * Registers an event or state.
   * @public
   * @param {Object} object - The event or state to register.
   */
  Owl.prototype.register = function(object) {
    if (object.type === Owl.Type.Event) {
      if (!$.event.special[object.name]) {
        $.event.special[object.name] = {};
      }

      if (!$.event.special[object.name].owl) {
        var _default = $.event.special[object.name]._default;
        $.event.special[object.name]._default = function(e) {
          if (_default && _default.apply && (!e.namespace || e.namespace.indexOf('owl') === -1)) {
            return _default.apply(this, arguments);
          }
          return e.namespace && e.namespace.indexOf('owl') > -1;
        };
        $.event.special[object.name].owl = true;
      }
    } else if (object.type === Owl.Type.State) {
      if (!this._states.tags[object.name]) {
        this._states.tags[object.name] = object.tags;
      } else {
        this._states.tags[object.name] = this._states.tags[object.name].concat(object.tags);
      }

      this._states.tags[object.name] = $.grep(this._states.tags[object.name], $.proxy(function(tag, i) {
        return $.inArray(tag, this._states.tags[object.name]) === i;
      }, this));
    }
  };

  /**
   * Suppresses events.
   * @protected
   * @param {Array.<String>} events - The events to suppress.
   */
  Owl.prototype.suppress = function(events) {
    $.each(events, $.proxy(function(index, event) {
      this._supress[event] = true;
    }, this));
  };

  /**
   * Releases suppressed events.
   * @protected
   * @param {Array.<String>} events - The events to release.
   */
  Owl.prototype.release = function(events) {
    $.each(events, $.proxy(function(index, event) {
      delete this._supress[event];
    }, this));
  };

  /**
   * Gets unified pointer coordinates from event.
   * @todo #261
   * @protected
   * @param {Event} - The `mousedown` or `touchstart` event.
   * @returns {Object} - Contains `x` and `y` coordinates of current pointer position.
   */
  Owl.prototype.pointer = function(event) {
    var result = { x: null, y: null };

    event = event.originalEvent || event || window.event;

    event = event.touches && event.touches.length ?
      event.touches[0] : event.changedTouches && event.changedTouches.length ?
        event.changedTouches[0] : event;

    if (event.pageX) {
      result.x = event.pageX;
      result.y = event.pageY;
    } else {
      result.x = event.clientX;
      result.y = event.clientY;
    }

    return result;
  };

  /**
   * Determines if the input is a Number or something that can be coerced to a Number
   * @protected
   * @param {Number|String|Object|Array|Boolean|RegExp|Function|Symbol} - The input to be tested
   * @returns {Boolean} - An indication if the input is a Number or can be coerced to a Number
   */
  Owl.prototype.isNumeric = function(number) {
    return !isNaN(parseFloat(number));
  };

  /**
   * Gets the difference of two vectors.
   * @todo #261
   * @protected
   * @param {Object} - The first vector.
   * @param {Object} - The second vector.
   * @returns {Object} - The difference.
   */
  Owl.prototype.difference = function(first, second) {
    return {
      x: first.x - second.x,
      y: first.y - second.y
    };
  };

  /**
   * The jQuery Plugin for the Owl Carousel
   * @todo Navigation plugin `next` and `prev`
   * @public
   */
  $.fn.owlCarousel = function(option) {
    var args = Array.prototype.slice.call(arguments, 1);

    return this.each(function() {
      var $this = $(this),
        data = $this.data('owl.carousel');

      if (!data) {
        data = new Owl(this, typeof option == 'object' && option);
        $this.data('owl.carousel', data);

        $.each([
          'next', 'prev', 'to', 'destroy', 'refresh', 'replace', 'add', 'remove'
        ], function(i, event) {
          data.register({ type: Owl.Type.Event, name: event });
          data.$element.on(event + '.owl.carousel.core', $.proxy(function(e) {
            if (e.namespace && e.relatedTarget !== this) {
              this.suppress([ event ]);
              data[event].apply(this, [].slice.call(arguments, 1));
              this.release([ event ]);
            }
          }, data));
        });
      }

      if (typeof option == 'string' && option.charAt(0) !== '_') {
        data[option].apply(data, args);
      }
    });
  };

  /**
   * The constructor for the jQuery Plugin
   * @public
   */
  $.fn.owlCarousel.Constructor = Owl;

})(window.Zepto || window.jQuery, window, document);

/**
 * AutoRefresh Plugin
 * @version 2.1.0
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

  /**
   * Creates the auto refresh plugin.
   * @class The Auto Refresh Plugin
   * @param {Owl} carousel - The Owl Carousel
   */
  var AutoRefresh = function(carousel) {
    /**
     * Reference to the core.
     * @protected
     * @type {Owl}
     */
    this._core = carousel;

    /**
     * Refresh interval.
     * @protected
     * @type {number}
     */
    this._interval = null;

    /**
     * Whether the element is currently visible or not.
     * @protected
     * @type {Boolean}
     */
    this._visible = null;

    /**
     * All event handlers.
     * @protected
     * @type {Object}
     */
    this._handlers = {
      'initialized.owl.carousel': $.proxy(function(e) {
        if (e.namespace && this._core.settings.autoRefresh) {
          this.watch();
        }
      }, this)
    };

    // set default options
    this._core.options = $.extend({}, AutoRefresh.Defaults, this._core.options);

    // register event handlers
    this._core.$element.on(this._handlers);
  };

  /**
   * Default options.
   * @public
   */
  AutoRefresh.Defaults = {
    autoRefresh: true,
    autoRefreshInterval: 500
  };

  /**
   * Watches the element.
   */
  AutoRefresh.prototype.watch = function() {
    if (this._interval) {
      return;
    }

    this._visible = this._core.$element.is(':visible');
    this._interval = window.setInterval($.proxy(this.refresh, this), this._core.settings.autoRefreshInterval);
  };

  /**
   * Refreshes the element.
   */
  AutoRefresh.prototype.refresh = function() {
    if (this._core.$element.is(':visible') === this._visible) {
      return;
    }

    this._visible = !this._visible;

    this._core.$element.toggleClass('owl-hidden', !this._visible);

    this._visible && (this._core.invalidate('width') && this._core.refresh());
  };

  /**
   * Destroys the plugin.
   */
  AutoRefresh.prototype.destroy = function() {
    var handler, property;

    window.clearInterval(this._interval);

    for (handler in this._handlers) {
      this._core.$element.off(handler, this._handlers[handler]);
    }
    for (property in Object.getOwnPropertyNames(this)) {
      typeof this[property] != 'function' && (this[property] = null);
    }
  };

  $.fn.owlCarousel.Constructor.Plugins.AutoRefresh = AutoRefresh;

})(window.Zepto || window.jQuery, window, document);

/**
 * Lazy Plugin
 * @version 2.1.0
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

  /**
   * Creates the lazy plugin.
   * @class The Lazy Plugin
   * @param {Owl} carousel - The Owl Carousel
   */
  var Lazy = function(carousel) {

    /**
     * Reference to the core.
     * @protected
     * @type {Owl}
     */
    this._core = carousel;

    /**
     * Already loaded items.
     * @protected
     * @type {Array.<jQuery>}
     */
    this._loaded = [];

    /**
     * Event handlers.
     * @protected
     * @type {Object}
     */
    this._handlers = {
      'initialized.owl.carousel change.owl.carousel resized.owl.carousel': $.proxy(function(e) {
        if (!e.namespace) {
          return;
        }

        if (!this._core.settings || !this._core.settings.lazyLoad) {
          return;
        }

        if ((e.property && e.property.name == 'position') || e.type == 'initialized') {
          var settings = this._core.settings,
            n = (settings.center && Math.ceil(settings.items / 2) || settings.items),
            i = ((settings.center && n * -1) || 0),
            position = (e.property && e.property.value !== undefined ? e.property.value : this._core.current()) + i,
            clones = this._core.clones().length,
            load = $.proxy(function(i, v) { this.load(v) }, this);

          while (i++ < n) {
            this.load(clones / 2 + this._core.relative(position));
            clones && $.each(this._core.clones(this._core.relative(position)), load);
            position++;
          }
        }
      }, this)
    };

    // set the default options
    this._core.options = $.extend({}, Lazy.Defaults, this._core.options);

    // register event handler
    this._core.$element.on(this._handlers);
  };

  /**
   * Default options.
   * @public
   */
  Lazy.Defaults = {
    lazyLoad: false
  };

  /**
   * Loads all resources of an item at the specified position.
   * @param {Number} position - The absolute position of the item.
   * @protected
   */
  Lazy.prototype.load = function(position) {
    var $item = this._core.$stage.children().eq(position),
      $elements = $item && $item.find('.owl-lazy');

    if (!$elements || $.inArray($item.get(0), this._loaded) > -1) {
      return;
    }

    $elements.each($.proxy(function(index, element) {
      var $element = $(element), image,
        url = (window.devicePixelRatio > 1 && $element.attr('data-src-retina')) || $element.attr('data-src');

      this._core.trigger('load', { element: $element, url: url }, 'lazy');

      if ($element.is('img')) {
        $element.one('load.owl.lazy', $.proxy(function() {
          $element.css('opacity', 1);
          this._core.trigger('loaded', { element: $element, url: url }, 'lazy');
        }, this)).attr('src', url);
      } else {
        image = new Image();
        image.onload = $.proxy(function() {
          $element.css({
            'background-image': 'url("' + url + '")',
            'opacity': '1'
          });
          this._core.trigger('loaded', { element: $element, url: url }, 'lazy');
        }, this);
        image.src = url;
      }
    }, this));

    this._loaded.push($item.get(0));
  };

  /**
   * Destroys the plugin.
   * @public
   */
  Lazy.prototype.destroy = function() {
    var handler, property;

    for (handler in this.handlers) {
      this._core.$element.off(handler, this.handlers[handler]);
    }
    for (property in Object.getOwnPropertyNames(this)) {
      typeof this[property] != 'function' && (this[property] = null);
    }
  };

  $.fn.owlCarousel.Constructor.Plugins.Lazy = Lazy;

})(window.Zepto || window.jQuery, window, document);

/**
 * AutoHeight Plugin
 * @version 2.1.0
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

  /**
   * Creates the auto height plugin.
   * @class The Auto Height Plugin
   * @param {Owl} carousel - The Owl Carousel
   */
  var AutoHeight = function(carousel) {
    /**
     * Reference to the core.
     * @protected
     * @type {Owl}
     */
    this._core = carousel;

    /**
     * All event handlers.
     * @protected
     * @type {Object}
     */
    this._handlers = {
      'initialized.owl.carousel refreshed.owl.carousel': $.proxy(function(e) {
        if (e.namespace && this._core.settings.autoHeight) {
          this.update();
        }
      }, this),
      'changed.owl.carousel': $.proxy(function(e) {
        if (e.namespace && this._core.settings.autoHeight && e.property.name == 'position'){
          this.update();
        }
      }, this),
      'loaded.owl.lazy': $.proxy(function(e) {
        if (e.namespace && this._core.settings.autoHeight
          && e.element.closest('.' + this._core.settings.itemClass).index() === this._core.current()) {
          this.update();
        }
      }, this)
    };

    // set default options
    this._core.options = $.extend({}, AutoHeight.Defaults, this._core.options);

    // register event handlers
    this._core.$element.on(this._handlers);
  };

  /**
   * Default options.
   * @public
   */
  AutoHeight.Defaults = {
    autoHeight: false,
    autoHeightClass: 'owl-height'
  };

  /**
   * Updates the view.
   */
  AutoHeight.prototype.update = function() {
    var start = this._core._current,
      end = start + this._core.settings.items,
      visible = this._core.$stage.children().toArray().slice(start, end),
      heights = [],
      maxheight = 0;

    $.each(visible, function(index, item) {
      heights.push($(item).height());
    });

    maxheight = Math.max.apply(null, heights);

    this._core.$stage.parent()
      .height(maxheight)
      .addClass(this._core.settings.autoHeightClass);
  };

  AutoHeight.prototype.destroy = function() {
    var handler, property;

    for (handler in this._handlers) {
      this._core.$element.off(handler, this._handlers[handler]);
    }
    for (property in Object.getOwnPropertyNames(this)) {
      typeof this[property] != 'function' && (this[property] = null);
    }
  };

  $.fn.owlCarousel.Constructor.Plugins.AutoHeight = AutoHeight;

})(window.Zepto || window.jQuery, window, document);

/**
 * Video Plugin
 * @version 2.1.0
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

  /**
   * Creates the video plugin.
   * @class The Video Plugin
   * @param {Owl} carousel - The Owl Carousel
   */
  var Video = function(carousel) {
    /**
     * Reference to the core.
     * @protected
     * @type {Owl}
     */
    this._core = carousel;

    /**
     * Cache all video URLs.
     * @protected
     * @type {Object}
     */
    this._videos = {};

    /**
     * Current playing item.
     * @protected
     * @type {jQuery}
     */
    this._playing = null;

    /**
     * All event handlers.
     * @todo The cloned content removale is too late
     * @protected
     * @type {Object}
     */
    this._handlers = {
      'initialized.owl.carousel': $.proxy(function(e) {
        if (e.namespace) {
          this._core.register({ type: 'state', name: 'playing', tags: [ 'interacting' ] });
        }
      }, this),
      'resize.owl.carousel': $.proxy(function(e) {
        if (e.namespace && this._core.settings.video && this.isInFullScreen()) {
          e.preventDefault();
        }
      }, this),
      'refreshed.owl.carousel': $.proxy(function(e) {
        if (e.namespace && this._core.is('resizing')) {
          this._core.$stage.find('.cloned .owl-video-frame').remove();
        }
      }, this),
      'changed.owl.carousel': $.proxy(function(e) {
        if (e.namespace && e.property.name === 'position' && this._playing) {
          this.stop();
        }
      }, this),
      'prepared.owl.carousel': $.proxy(function(e) {
        if (!e.namespace) {
          return;
        }

        var $element = $(e.content).find('.owl-video');

        if ($element.length) {
          $element.css('display', 'none');
          this.fetch($element, $(e.content));
        }
      }, this)
    };

    // set default options
    this._core.options = $.extend({}, Video.Defaults, this._core.options);

    // register event handlers
    this._core.$element.on(this._handlers);

    this._core.$element.on('click.owl.video', '.owl-video-play-icon', $.proxy(function(e) {
      this.play(e);
    }, this));
  };

  /**
   * Default options.
   * @public
   */
  Video.Defaults = {
    video: false,
    videoHeight: false,
    videoWidth: false
  };

  /**
   * Gets the video ID and the type (YouTube/Vimeo/vzaar only).
   * @protected
   * @param {jQuery} target - The target containing the video data.
   * @param {jQuery} item - The item containing the video.
   */
  Video.prototype.fetch = function(target, item) {
      var type = (function() {
          if (target.attr('data-vimeo-id')) {
            return 'vimeo';
          } else if (target.attr('data-vzaar-id')) {
            return 'vzaar'
          } else {
            return 'youtube';
          }
        })(),
        id = target.attr('data-vimeo-id') || target.attr('data-youtube-id') || target.attr('data-vzaar-id'),
        width = target.attr('data-width') || this._core.settings.videoWidth,
        height = target.attr('data-height') || this._core.settings.videoHeight,
        url = target.attr('href');

    if (url) {

      /*
          Parses the id's out of the following urls (and probably more):
          https://www.youtube.com/watch?v=:id
          https://youtu.be/:id
          https://vimeo.com/:id
          https://vimeo.com/channels/:channel/:id
          https://vimeo.com/groups/:group/videos/:id
          https://app.vzaar.com/videos/:id

          Visual example: https://regexper.com/#(http%3A%7Chttps%3A%7C)%5C%2F%5C%2F(player.%7Cwww.%7Capp.)%3F(vimeo%5C.com%7Cyoutu(be%5C.com%7C%5C.be%7Cbe%5C.googleapis%5C.com)%7Cvzaar%5C.com)%5C%2F(video%5C%2F%7Cvideos%5C%2F%7Cembed%5C%2F%7Cchannels%5C%2F.%2B%5C%2F%7Cgroups%5C%2F.%2B%5C%2F%7Cwatch%5C%3Fv%3D%7Cv%5C%2F)%3F(%5BA-Za-z0-9._%25-%5D*)(%5C%26%5CS%2B)%3F
      */

      id = url.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);

      if (id[3].indexOf('youtu') > -1) {
        type = 'youtube';
      } else if (id[3].indexOf('vimeo') > -1) {
        type = 'vimeo';
      } else if (id[3].indexOf('vzaar') > -1) {
        type = 'vzaar';
      } else {
        throw new Error('Video URL not supported.');
      }
      id = id[6];
    } else {
      throw new Error('Missing video URL.');
    }

    this._videos[url] = {
      type: type,
      id: id,
      width: width,
      height: height
    };

    item.attr('data-video', url);

    this.thumbnail(target, this._videos[url]);
  };

  /**
   * Creates video thumbnail.
   * @protected
   * @param {jQuery} target - The target containing the video data.
   * @param {Object} info - The video info object.
   * @see `fetch`
   */
  Video.prototype.thumbnail = function(target, video) {
    var tnLink,
      icon,
      path,
      dimensions = video.width && video.height ? 'style="width:' + video.width + 'px;height:' + video.height + 'px;"' : '',
      customTn = target.find('img'),
      srcType = 'src',
      lazyClass = '',
      settings = this._core.settings,
      create = function(path) {
        icon = '<div class="owl-video-play-icon"></div>';

        if (settings.lazyLoad) {
          tnLink = '<div class="owl-video-tn ' + lazyClass + '" ' + srcType + '="' + path + '"></div>';
        } else {
          tnLink = '<div class="owl-video-tn" style="opacity:1;background-image:url(' + path + ')"></div>';
        }
        target.after(tnLink);
        target.after(icon);
      };

    // wrap video content into owl-video-wrapper div
    target.wrap('<div class="owl-video-wrapper"' + dimensions + '></div>');

    if (this._core.settings.lazyLoad) {
      srcType = 'data-src';
      lazyClass = 'owl-lazy';
    }

    // custom thumbnail
    if (customTn.length) {
      create(customTn.attr(srcType));
      customTn.remove();
      return false;
    }

    if (video.type === 'youtube') {
      path = "//img.youtube.com/vi/" + video.id + "/hqdefault.jpg";
      create(path);
    } else if (video.type === 'vimeo') {
      $.ajax({
        type: 'GET',
        url: '//vimeo.com/api/v2/video/' + video.id + '.json',
        jsonp: 'callback',
        dataType: 'jsonp',
        success: function(data) {
          path = data[0].thumbnail_large;
          create(path);
        }
      });
    } else if (video.type === 'vzaar') {
      $.ajax({
        type: 'GET',
        url: '//vzaar.com/api/videos/' + video.id + '.json',
        jsonp: 'callback',
        dataType: 'jsonp',
        success: function(data) {
          path = data.framegrab_url;
          create(path);
        }
      });
    }
  };

  /**
   * Stops the current video.
   * @public
   */
  Video.prototype.stop = function() {
    this._core.trigger('stop', null, 'video');
    this._playing.find('.owl-video-frame').remove();
    this._playing.removeClass('owl-video-playing');
    this._playing = null;
    this._core.leave('playing');
    this._core.trigger('stopped', null, 'video');
  };

  /**
   * Starts the current video.
   * @public
   * @param {Event} event - The event arguments.
   */
  Video.prototype.play = function(event) {
    var target = $(event.target),
      item = target.closest('.' + this._core.settings.itemClass),
      video = this._videos[item.attr('data-video')],
      width = video.width || '100%',
      height = video.height || this._core.$stage.height(),
      html;

    if (this._playing) {
      return;
    }

    this._core.enter('playing');
    this._core.trigger('play', null, 'video');

    item = this._core.items(this._core.relative(item.index()));

    this._core.reset(item.index());

    if (video.type === 'youtube') {
      html = '<iframe width="' + width + '" height="' + height + '" src="//www.youtube.com/embed/' +
        video.id + '?autoplay=1&rel=0&v=' + video.id + '" frameborder="0" allowfullscreen></iframe>';
    } else if (video.type === 'vimeo') {
      html = '<iframe src="//player.vimeo.com/video/' + video.id +
        '?autoplay=1" width="' + width + '" height="' + height +
        '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    } else if (video.type === 'vzaar') {
      html = '<iframe frameborder="0"' + 'height="' + height + '"' + 'width="' + width +
        '" allowfullscreen mozallowfullscreen webkitAllowFullScreen ' +
        'src="//view.vzaar.com/' + video.id + '/player?autoplay=true"></iframe>';
    }

    $('<div class="owl-video-frame">' + html + '</div>').insertAfter(item.find('.owl-video'));

    this._playing = item.addClass('owl-video-playing');
  };

  /**
   * Checks whether an video is currently in full screen mode or not.
   * @todo Bad style because looks like a readonly method but changes members.
   * @protected
   * @returns {Boolean}
   */
  Video.prototype.isInFullScreen = function() {
    var element = document.fullscreenElement || document.mozFullScreenElement ||
        document.webkitFullscreenElement;

    return element && $(element).parent().hasClass('owl-video-frame');
  };

  /**
   * Destroys the plugin.
   */
  Video.prototype.destroy = function() {
    var handler, property;

    this._core.$element.off('click.owl.video');

    for (handler in this._handlers) {
      this._core.$element.off(handler, this._handlers[handler]);
    }
    for (property in Object.getOwnPropertyNames(this)) {
      typeof this[property] != 'function' && (this[property] = null);
    }
  };

  $.fn.owlCarousel.Constructor.Plugins.Video = Video;

})(window.Zepto || window.jQuery, window, document);

/**
 * Animate Plugin
 * @version 2.1.0
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

  /**
   * Creates the animate plugin.
   * @class The Navigation Plugin
   * @param {Owl} scope - The Owl Carousel
   */
  var Animate = function(scope) {
    this.core = scope;
    this.core.options = $.extend({}, Animate.Defaults, this.core.options);
    this.swapping = true;
    this.previous = undefined;
    this.next = undefined;

    this.handlers = {
      'change.owl.carousel': $.proxy(function(e) {
        if (e.namespace && e.property.name == 'position') {
          this.previous = this.core.current();
          this.next = e.property.value;
        }
      }, this),
      'drag.owl.carousel dragged.owl.carousel translated.owl.carousel': $.proxy(function(e) {
        if (e.namespace) {
          this.swapping = e.type == 'translated';
        }
      }, this),
      'translate.owl.carousel': $.proxy(function(e) {
        if (e.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn)) {
          this.swap();
        }
      }, this)
    };

    this.core.$element.on(this.handlers);
  };

  /**
   * Default options.
   * @public
   */
  Animate.Defaults = {
    animateOut: false,
    animateIn: false
  };

  /**
   * Toggles the animation classes whenever an translations starts.
   * @protected
   * @returns {Boolean|undefined}
   */
  Animate.prototype.swap = function() {

    if (this.core.settings.items !== 1) {
      return;
    }

    if (!$.support.animation || !$.support.transition) {
      return;
    }

    this.core.speed(0);

    var left,
      clear = $.proxy(this.clear, this),
      previous = this.core.$stage.children().eq(this.previous),
      next = this.core.$stage.children().eq(this.next),
      incoming = this.core.settings.animateIn,
      outgoing = this.core.settings.animateOut;

    if (this.core.current() === this.previous) {
      return;
    }

    if (outgoing) {
      left = this.core.coordinates(this.previous) - this.core.coordinates(this.next);
      previous.one($.support.animation.end, clear)
        .css( { 'left': left + 'px' } )
        .addClass('animated owl-animated-out')
        .addClass(outgoing);
    }

    if (incoming) {
      next.one($.support.animation.end, clear)
        .addClass('animated owl-animated-in')
        .addClass(incoming);
    }
  };

  Animate.prototype.clear = function(e) {
    $(e.target).css( { 'left': '' } )
      .removeClass('animated owl-animated-out owl-animated-in')
      .removeClass(this.core.settings.animateIn)
      .removeClass(this.core.settings.animateOut);
    this.core.onTransitionEnd();
  };

  /**
   * Destroys the plugin.
   * @public
   */
  Animate.prototype.destroy = function() {
    var handler, property;

    for (handler in this.handlers) {
      this.core.$element.off(handler, this.handlers[handler]);
    }
    for (property in Object.getOwnPropertyNames(this)) {
      typeof this[property] != 'function' && (this[property] = null);
    }
  };

  $.fn.owlCarousel.Constructor.Plugins.Animate = Animate;

})(window.Zepto || window.jQuery, window, document);

/**
 * Autoplay Plugin
 * @version 2.1.0
 * @author Bartosz Wojciechowski
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

  /**
   * Creates the autoplay plugin.
   * @class The Autoplay Plugin
   * @param {Owl} scope - The Owl Carousel
   */
  var Autoplay = function(carousel) {
    /**
     * Reference to the core.
     * @protected
     * @type {Owl}
     */
    this._core = carousel;

    /**
     * The autoplay timeout.
     * @type {Timeout}
     */
    this._timeout = null;

    /**
     * Indicates whenever the autoplay is paused.
     * @type {Boolean}
     */
    this._paused = false;

    /**
     * All event handlers.
     * @protected
     * @type {Object}
     */
    this._handlers = {
      'changed.owl.carousel': $.proxy(function(e) {
        if (e.namespace && e.property.name === 'settings') {
          if (this._core.settings.autoplay) {
            this.play();
          } else {
            this.stop();
          }
        } else if (e.namespace && e.property.name === 'position') {
          //console.log('play?', e);
          if (this._core.settings.autoplay) {
            this._setAutoPlayInterval();
          }
        }
      }, this),
      'initialized.owl.carousel': $.proxy(function(e) {
        if (e.namespace && this._core.settings.autoplay) {
          this.play();
        }
      }, this),
      'play.owl.autoplay': $.proxy(function(e, t, s) {
        if (e.namespace) {
          this.play(t, s);
        }
      }, this),
      'stop.owl.autoplay': $.proxy(function(e) {
        if (e.namespace) {
          this.stop();
        }
      }, this),
      'mouseover.owl.autoplay': $.proxy(function() {
        if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
          this.pause();
        }
      }, this),
      'mouseleave.owl.autoplay': $.proxy(function() {
        if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
          this.play();
        }
      }, this),
      'touchstart.owl.core': $.proxy(function() {
        if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
          this.pause();
        }
      }, this),
      'touchend.owl.core': $.proxy(function() {
        if (this._core.settings.autoplayHoverPause) {
          this.play();
        }
      }, this)
    };

    // register event handlers
    this._core.$element.on(this._handlers);

    // set default options
    this._core.options = $.extend({}, Autoplay.Defaults, this._core.options);
  };

  /**
   * Default options.
   * @public
   */
  Autoplay.Defaults = {
    autoplay: false,
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
    autoplaySpeed: false
  };

  /**
   * Starts the autoplay.
   * @public
   * @param {Number} [timeout] - The interval before the next animation starts.
   * @param {Number} [speed] - The animation speed for the animations.
   */
  Autoplay.prototype.play = function(timeout, speed) {
    this._paused = false;

    if (this._core.is('rotating')) {
      return;
    }

    this._core.enter('rotating');

    this._setAutoPlayInterval();
  };

  /**
   * Gets a new timeout
   * @private
   * @param {Number} [timeout] - The interval before the next animation starts.
   * @param {Number} [speed] - The animation speed for the animations.
   * @return {Timeout}
   */
  Autoplay.prototype._getNextTimeout = function(timeout, speed) {
    if ( this._timeout ) {
      window.clearTimeout(this._timeout);
    }
    return window.setTimeout($.proxy(function() {
      if (this._paused || this._core.is('busy') || this._core.is('interacting') || document.hidden) {
        return;
      }
      this._core.next(speed || this._core.settings.autoplaySpeed);
    }, this), timeout || this._core.settings.autoplayTimeout);
  };

  /**
   * Sets autoplay in motion.
   * @private
   */
  Autoplay.prototype._setAutoPlayInterval = function() {
    this._timeout = this._getNextTimeout();
  };

  /**
   * Stops the autoplay.
   * @public
   */
  Autoplay.prototype.stop = function() {
    if (!this._core.is('rotating')) {
      return;
    }

    window.clearTimeout(this._timeout);
    this._core.leave('rotating');
  };

  /**
   * Stops the autoplay.
   * @public
   */
  Autoplay.prototype.pause = function() {
    if (!this._core.is('rotating')) {
      return;
    }

    this._paused = true;
  };

  /**
   * Destroys the plugin.
   */
  Autoplay.prototype.destroy = function() {
    var handler, property;

    this.stop();

    for (handler in this._handlers) {
      this._core.$element.off(handler, this._handlers[handler]);
    }
    for (property in Object.getOwnPropertyNames(this)) {
      typeof this[property] != 'function' && (this[property] = null);
    }
  };

  $.fn.owlCarousel.Constructor.Plugins.autoplay = Autoplay;

})(window.Zepto || window.jQuery, window, document);

/**
 * Navigation Plugin
 * @version 2.1.0
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {
  'use strict';

  /**
   * Creates the navigation plugin.
   * @class The Navigation Plugin
   * @param {Owl} carousel - The Owl Carousel.
   */
  var Navigation = function(carousel) {
    /**
     * Reference to the core.
     * @protected
     * @type {Owl}
     */
    this._core = carousel;

    /**
     * Indicates whether the plugin is initialized or not.
     * @protected
     * @type {Boolean}
     */
    this._initialized = false;

    /**
     * The current paging indexes.
     * @protected
     * @type {Array}
     */
    this._pages = [];

    /**
     * All DOM elements of the user interface.
     * @protected
     * @type {Object}
     */
    this._controls = {};

    /**
     * Markup for an indicator.
     * @protected
     * @type {Array.<String>}
     */
    this._templates = [];

    /**
     * The carousel element.
     * @type {jQuery}
     */
    this.$element = this._core.$element;

    /**
     * Overridden methods of the carousel.
     * @protected
     * @type {Object}
     */
    this._overrides = {
      next: this._core.next,
      prev: this._core.prev,
      to: this._core.to
    };

    /**
     * All event handlers.
     * @protected
     * @type {Object}
     */
    this._handlers = {
      'prepared.owl.carousel': $.proxy(function(e) {
        if (e.namespace && this._core.settings.dotsData) {
          this._templates.push('<div class="' + this._core.settings.dotClass + '">' +
            $(e.content).find('[data-dot]').addBack('[data-dot]').attr('data-dot') + '</div>');
        }
      }, this),
      'added.owl.carousel': $.proxy(function(e) {
        if (e.namespace && this._core.settings.dotsData) {
          this._templates.splice(e.position, 0, this._templates.pop());
        }
      }, this),
      'remove.owl.carousel': $.proxy(function(e) {
        if (e.namespace && this._core.settings.dotsData) {
          this._templates.splice(e.position, 1);
        }
      }, this),
      'changed.owl.carousel': $.proxy(function(e) {
        if (e.namespace && e.property.name == 'position') {
          this.draw();
        }
      }, this),
      'initialized.owl.carousel': $.proxy(function(e) {
        if (e.namespace && !this._initialized) {
          this._core.trigger('initialize', null, 'navigation');
          this.initialize();
          this.update();
          this.draw();
          this._initialized = true;
          this._core.trigger('initialized', null, 'navigation');
        }
      }, this),
      'refreshed.owl.carousel': $.proxy(function(e) {
        if (e.namespace && this._initialized) {
          this._core.trigger('refresh', null, 'navigation');
          this.update();
          this.draw();
          this._core.trigger('refreshed', null, 'navigation');
        }
      }, this)
    };

    // set default options
    this._core.options = $.extend({}, Navigation.Defaults, this._core.options);

    // register event handlers
    this.$element.on(this._handlers);
  };

  /**
   * Default options.
   * @public
   * @todo Rename `slideBy` to `navBy`
   */
  Navigation.Defaults = {
    nav: false,
    navText: [ 'prev', 'next' ],
    navSpeed: false,
    navElement: 'div',
    navContainer: false,
    navContainerClass: 'owl-nav',
    navClass: [ 'owl-prev', 'owl-next' ],
    slideBy: 1,
    dotClass: 'owl-dot',
    dotsClass: 'owl-dots',
    dots: true,
    dotsEach: false,
    dotsData: false,
    dotsSpeed: false,
    dotsContainer: false
  };

  /**
   * Initializes the layout of the plugin and extends the carousel.
   * @protected
   */
  Navigation.prototype.initialize = function() {
    var override,
      settings = this._core.settings;

    // create DOM structure for relative navigation
    this._controls.$relative = (settings.navContainer ? $(settings.navContainer)
      : $('<div>').addClass(settings.navContainerClass).appendTo(this.$element)).addClass('disabled');

    this._controls.$previous = $('<' + settings.navElement + '>')
      .addClass(settings.navClass[0])
      .html(settings.navText[0])
      .prependTo(this._controls.$relative)
      .on('click', $.proxy(function(e) {
        this.prev(settings.navSpeed);
      }, this));
    this._controls.$next = $('<' + settings.navElement + '>')
      .addClass(settings.navClass[1])
      .html(settings.navText[1])
      .appendTo(this._controls.$relative)
      .on('click', $.proxy(function(e) {
        this.next(settings.navSpeed);
      }, this));

    // create DOM structure for absolute navigation
    if (!settings.dotsData) {
      this._templates = [ $('<div>')
        .addClass(settings.dotClass)
        .append($('<span>'))
        .prop('outerHTML') ];
    }

    this._controls.$absolute = (settings.dotsContainer ? $(settings.dotsContainer)
      : $('<div>').addClass(settings.dotsClass).appendTo(this.$element)).addClass('disabled');

    this._controls.$absolute.on('click', 'div', $.proxy(function(e) {
      var index = $(e.target).parent().is(this._controls.$absolute)
        ? $(e.target).index() : $(e.target).parent().index();

      e.preventDefault();

      this.to(index, settings.dotsSpeed);
    }, this));

    // override public methods of the carousel
    for (override in this._overrides) {
      this._core[override] = $.proxy(this[override], this);
    }
  };

  /**
   * Destroys the plugin.
   * @protected
   */
  Navigation.prototype.destroy = function() {
    var handler, control, property, override;

    for (handler in this._handlers) {
      this.$element.off(handler, this._handlers[handler]);
    }
    for (control in this._controls) {
      this._controls[control].remove();
    }
    for (override in this.overides) {
      this._core[override] = this._overrides[override];
    }
    for (property in Object.getOwnPropertyNames(this)) {
      typeof this[property] != 'function' && (this[property] = null);
    }
  };

  /**
   * Updates the internal state.
   * @protected
   */
  Navigation.prototype.update = function() {
    var i, j, k,
      lower = this._core.clones().length / 2,
      upper = lower + this._core.items().length,
      maximum = this._core.maximum(true),
      settings = this._core.settings,
      size = settings.center || settings.autoWidth || settings.dotsData
        ? 1 : settings.dotsEach || settings.items;

    if (settings.slideBy !== 'page') {
      settings.slideBy = Math.min(settings.slideBy, settings.items);
    }

    if (settings.dots || settings.slideBy == 'page') {
      this._pages = [];

      for (i = lower, j = 0, k = 0; i < upper; i++) {
        if (j >= size || j === 0) {
          this._pages.push({
            start: Math.min(maximum, i - lower),
            end: i - lower + size - 1
          });
          if (Math.min(maximum, i - lower) === maximum) {
            break;
          }
          j = 0, ++k;
        }
        j += this._core.mergers(this._core.relative(i));
      }
    }
  };

  /**
   * Draws the user interface.
   * @todo The option `dotsData` wont work.
   * @protected
   */
  Navigation.prototype.draw = function() {
    var difference,
      settings = this._core.settings,
      disabled = this._core.items().length <= settings.items,
      index = this._core.relative(this._core.current()),
      loop = settings.loop || settings.rewind;

    this._controls.$relative.toggleClass('disabled', !settings.nav || disabled);

    if (settings.nav) {
      this._controls.$previous.toggleClass('disabled', !loop && index <= this._core.minimum(true));
      this._controls.$next.toggleClass('disabled', !loop && index >= this._core.maximum(true));
    }

    this._controls.$absolute.toggleClass('disabled', !settings.dots || disabled);

    if (settings.dots) {
      difference = this._pages.length - this._controls.$absolute.children().length;

      if (settings.dotsData && difference !== 0) {
        this._controls.$absolute.html(this._templates.join(''));
      } else if (difference > 0) {
        this._controls.$absolute.append(new Array(difference + 1).join(this._templates[0]));
      } else if (difference < 0) {
        this._controls.$absolute.children().slice(difference).remove();
      }

      this._controls.$absolute.find('.active').removeClass('active');
      this._controls.$absolute.children().eq($.inArray(this.current(), this._pages)).addClass('active');
    }
  };

  /**
   * Extends event data.
   * @protected
   * @param {Event} event - The event object which gets thrown.
   */
  Navigation.prototype.onTrigger = function(event) {
    var settings = this._core.settings;

    event.page = {
      index: $.inArray(this.current(), this._pages),
      count: this._pages.length,
      size: settings && (settings.center || settings.autoWidth || settings.dotsData
        ? 1 : settings.dotsEach || settings.items)
    };
  };

  /**
   * Gets the current page position of the carousel.
   * @protected
   * @returns {Number}
   */
  Navigation.prototype.current = function() {
    var current = this._core.relative(this._core.current());
    return $.grep(this._pages, $.proxy(function(page, index) {
      return page.start <= current && page.end >= current;
    }, this)).pop();
  };

  /**
   * Gets the current succesor/predecessor position.
   * @protected
   * @returns {Number}
   */
  Navigation.prototype.getPosition = function(successor) {
    var position, length,
      settings = this._core.settings;

    if (settings.slideBy == 'page') {
      position = $.inArray(this.current(), this._pages);
      length = this._pages.length;
      successor ? ++position : --position;
      position = this._pages[((position % length) + length) % length].start;
    } else {
      position = this._core.relative(this._core.current());
      length = this._core.items().length;
      successor ? position += settings.slideBy : position -= settings.slideBy;
    }

    return position;
  };

  /**
   * Slides to the next item or page.
   * @public
   * @param {Number} [speed=false] - The time in milliseconds for the transition.
   */
  Navigation.prototype.next = function(speed) {
    $.proxy(this._overrides.to, this._core)(this.getPosition(true), speed);
  };

  /**
   * Slides to the previous item or page.
   * @public
   * @param {Number} [speed=false] - The time in milliseconds for the transition.
   */
  Navigation.prototype.prev = function(speed) {
    $.proxy(this._overrides.to, this._core)(this.getPosition(false), speed);
  };

  /**
   * Slides to the specified item or page.
   * @public
   * @param {Number} position - The position of the item or page.
   * @param {Number} [speed] - The time in milliseconds for the transition.
   * @param {Boolean} [standard=false] - Whether to use the standard behaviour or not.
   */
  Navigation.prototype.to = function(position, speed, standard) {
    var length;

    if (!standard && this._pages.length) {
      length = this._pages.length;
      $.proxy(this._overrides.to, this._core)(this._pages[((position % length) + length) % length].start, speed);
    } else {
      $.proxy(this._overrides.to, this._core)(position, speed);
    }
  };

  $.fn.owlCarousel.Constructor.Plugins.Navigation = Navigation;

})(window.Zepto || window.jQuery, window, document);

/**
 * Hash Plugin
 * @version 2.1.0
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {
  'use strict';

  /**
   * Creates the hash plugin.
   * @class The Hash Plugin
   * @param {Owl} carousel - The Owl Carousel
   */
  var Hash = function(carousel) {
    /**
     * Reference to the core.
     * @protected
     * @type {Owl}
     */
    this._core = carousel;

    /**
     * Hash index for the items.
     * @protected
     * @type {Object}
     */
    this._hashes = {};

    /**
     * The carousel element.
     * @type {jQuery}
     */
    this.$element = this._core.$element;

    /**
     * All event handlers.
     * @protected
     * @type {Object}
     */
    this._handlers = {
      'initialized.owl.carousel': $.proxy(function(e) {
        if (e.namespace && this._core.settings.startPosition === 'URLHash') {
          $(window).trigger('hashchange.owl.navigation');
        }
      }, this),
      'prepared.owl.carousel': $.proxy(function(e) {
        if (e.namespace) {
          var hash = $(e.content).find('[data-hash]').addBack('[data-hash]').attr('data-hash');

          if (!hash) {
            return;
          }

          this._hashes[hash] = e.content;
        }
      }, this),
      'changed.owl.carousel': $.proxy(function(e) {
        if (e.namespace && e.property.name === 'position') {
          var current = this._core.items(this._core.relative(this._core.current())),
            hash = $.map(this._hashes, function(item, hash) {
              return item === current ? hash : null;
            }).join();

          if (!hash || window.location.hash.slice(1) === hash) {
            return;
          }

          window.location.hash = hash;
        }
      }, this)
    };

    // set default options
    this._core.options = $.extend({}, Hash.Defaults, this._core.options);

    // register the event handlers
    this.$element.on(this._handlers);

    // register event listener for hash navigation
    $(window).on('hashchange.owl.navigation', $.proxy(function(e) {
      var hash = window.location.hash.substring(1),
        items = this._core.$stage.children(),
        position = this._hashes[hash] && items.index(this._hashes[hash]);

      if (position === undefined || position === this._core.current()) {
        return;
      }

      this._core.to(this._core.relative(position), false, true);
    }, this));
  };

  /**
   * Default options.
   * @public
   */
  Hash.Defaults = {
    URLhashListener: false
  };

  /**
   * Destroys the plugin.
   * @public
   */
  Hash.prototype.destroy = function() {
    var handler, property;

    $(window).off('hashchange.owl.navigation');

    for (handler in this._handlers) {
      this._core.$element.off(handler, this._handlers[handler]);
    }
    for (property in Object.getOwnPropertyNames(this)) {
      typeof this[property] != 'function' && (this[property] = null);
    }
  };

  $.fn.owlCarousel.Constructor.Plugins.Hash = Hash;

})(window.Zepto || window.jQuery, window, document);

/**
 * Support Plugin
 *
 * @version 2.1.0
 * @author Vivid Planet Software GmbH
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

  var style = $('<support>').get(0).style,
    prefixes = 'Webkit Moz O ms'.split(' '),
    events = {
      transition: {
        end: {
          WebkitTransition: 'webkitTransitionEnd',
          MozTransition: 'transitionend',
          OTransition: 'oTransitionEnd',
          transition: 'transitionend'
        }
      },
      animation: {
        end: {
          WebkitAnimation: 'webkitAnimationEnd',
          MozAnimation: 'animationend',
          OAnimation: 'oAnimationEnd',
          animation: 'animationend'
        }
      }
    },
    tests = {
      csstransforms: function() {
        return !!test('transform');
      },
      csstransforms3d: function() {
        return !!test('perspective');
      },
      csstransitions: function() {
        return !!test('transition');
      },
      cssanimations: function() {
        return !!test('animation');
      }
    };

  function test(property, prefixed) {
    var result = false,
      upper = property.charAt(0).toUpperCase() + property.slice(1);

    $.each((property + ' ' + prefixes.join(upper + ' ') + upper).split(' '), function(i, property) {
      if (style[property] !== undefined) {
        result = prefixed ? property : true;
        return false;
      }
    });

    return result;
  }

  function prefixed(property) {
    return test(property, true);
  }

  if (tests.csstransitions()) {
    /* jshint -W053 */
    $.support.transition = new String(prefixed('transition'))
    $.support.transition.end = events.transition.end[ $.support.transition ];
  }

  if (tests.cssanimations()) {
    /* jshint -W053 */
    $.support.animation = new String(prefixed('animation'))
    $.support.animation.end = events.animation.end[ $.support.animation ];
  }

  if (tests.csstransforms()) {
    /* jshint -W053 */
    $.support.transform = new String(prefixed('transform'));
    $.support.transform3d = tests.csstransforms3d();
  }

})(window.Zepto || window.jQuery, window, document);

;'use strict';

(function ($) {

    $.fn.endlessPaginate = function(options) {
        var defaults = {
            // Twitter-style pagination container selector.
            containerSelector: '.endless_container',
            // Twitter-style pagination loading selector.
            loadingSelector: '.endless_loading',
            // Twitter-style pagination link selector.
            moreSelector: 'a.endless_more',
            // Twitter-style pagination content wrapper selector.
            contentSelector: null,
            // Digg-style pagination page template selector.
            pageSelector: '.endless_page_template',
            // Digg-style pagination link selector.
            pagesSelector: 'a.endless_page_link',
            // Callback called when the user clicks to get another page.
            onClick: function() {},
            // Callback called when the new page is correctly displayed.
            onCompleted: function() {},
            // Set this to true to use the paginate-on-scroll feature.
            paginateOnScroll: false,
            // If paginate-on-scroll is on, this margin will be used.
            paginateOnScrollMargin : 1,
            // If paginate-on-scroll is on, it is possible to define chunks.
            paginateOnScrollChunkSize: 0
        },
            settings = $.extend(defaults, options);

        var getContext = function(link) {
            return {
                key: link.data("el-querystring-key").split(' ')[0],
                url: link.attr('href')
            };
        };

        return this.each(function() {
            var element = $(this),
                loadedPages = 1;

            // Twitter-style pagination.
            element.on('click', settings.moreSelector, function() {
                var link = $(this),
                    html_link = link.get(0),
                    content_wrapper = element.find(settings.contentSelector),
                    container = link.closest(settings.containerSelector),
                    loading = container.find(settings.loadingSelector);
                // Avoid multiple Ajax calls.
                if (loading.is(':visible')) {
                    return false;
                }
                link.hide();
                loading.show();
                var context = getContext(link);
                // Fire onClick callback.
                if (settings.onClick.apply(html_link, [context]) !== false) {
                    var data = 'querystring_key=' + context.key;
                    // Send the Ajax request.
                    $.get(context.url, data, function (fragment) {
                        // Increase the number of loaded pages.
                        loadedPages += 1;

                        if (!content_wrapper.length) {
                            // Replace pagination container (the default behavior)
                            container.before(fragment);
                            container.remove();
                        } else {
                            // Insert the content in the specified wrapper and increment link
                            content_wrapper.append(fragment);
                            var nextPage = 'page=' + (loadedPages + 1);
                            link.attr('href', link.attr('href').replace(/page=\d+/, nextPage));
                            link.show();
                            loading.hide();
                        }

                        // Fire onCompleted callback.
                        settings.onCompleted.apply(
                            html_link, [context, $.trim(fragment)]);
                    }).fail(function (xhr, textStatus, error) {
                        // Remove the container left if any
                        container.remove();
                    });
                }
                return false;
            });

            // On scroll pagination.
            if (settings.paginateOnScroll) {
                var win = $(window),
                    doc = $(document);
                doc.on('scroll', function () {
                    if (doc.height() - win.height() -
                        win.scrollTop() <= settings.paginateOnScrollMargin) {
                        // Do not paginate on scroll if chunks are used and
                        // the current chunk is complete.
                        var chunckSize = settings.paginateOnScrollChunkSize;
                        if (!chunckSize || loadedPages % chunckSize) {
                            element.find(settings.moreSelector).trigger('click');
                        } else {
                            element.find(settings.moreSelector).addClass('endless_chunk_complete');
                        }
                    }
                });
            }

            // Digg-style pagination.
            element.on('click', settings.pagesSelector, function() {
                var link = $(this),
                    html_link = link.get(0),
                    context = getContext(link);
                // Fire onClick callback.
                if (settings.onClick.apply(html_link, [context]) !== false) {
                    var page_template = link.closest(settings.pageSelector),
                        data = 'querystring_key=' + context.key;
                    // Send the Ajax request.
                    page_template.load(context.url, data, function(fragment) {
                        // Fire onCompleted callback.
                        settings.onCompleted.apply(
                            html_link, [context, $.trim(fragment)]);
                    });
                }
                return false;
            });
        });
    };

    $.endlessPaginate = function(options) {
        return $('body').endlessPaginate(options);
    };

})(jQuery);

;/*!
* jquery.inputmask.bundle.js
* https://github.com/RobinHerbots/Inputmask
* Copyright (c) 2010 - 2017 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 3.3.11
*/

!function(modules) {
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: !1,
            exports: {}
        };
        return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
        module.l = !0, module.exports;
    }
    var installedModules = {};
    __webpack_require__.m = modules, __webpack_require__.c = installedModules, __webpack_require__.d = function(exports, name, getter) {
        __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
            configurable: !1,
            enumerable: !0,
            get: getter
        });
    }, __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function() {
            return module.default;
        } : function() {
            return module;
        };
        return __webpack_require__.d(getter, "a", getter), getter;
    }, __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 3);
}([ function(module, exports, __webpack_require__) {
    "use strict";
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    "function" == typeof Symbol && Symbol.iterator;
    !function(factory) {
        __WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(2) ], void 0 !== (__WEBPACK_AMD_DEFINE_RESULT__ = "function" == typeof (__WEBPACK_AMD_DEFINE_FACTORY__ = factory) ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__) && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__);
    }(function($) {
        return $;
    });
}, function(module, exports, __webpack_require__) {
    "use strict";
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    !function(factory) {
        __WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(0), __webpack_require__(10), __webpack_require__(11) ], 
        void 0 !== (__WEBPACK_AMD_DEFINE_RESULT__ = "function" == typeof (__WEBPACK_AMD_DEFINE_FACTORY__ = factory) ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__) && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__);
    }(function($, window, document, undefined) {
        function Inputmask(alias, options, internal) {
            if (!(this instanceof Inputmask)) return new Inputmask(alias, options, internal);
            this.el = undefined, this.events = {}, this.maskset = undefined, this.refreshValue = !1, 
            !0 !== internal && ($.isPlainObject(alias) ? options = alias : (options = options || {}).alias = alias, 
            this.opts = $.extend(!0, {}, this.defaults, options), this.noMasksCache = options && options.definitions !== undefined, 
            this.userOptions = options || {}, this.isRTL = this.opts.numericInput, resolveAlias(this.opts.alias, options, this.opts));
        }
        function resolveAlias(aliasStr, options, opts) {
            var aliasDefinition = Inputmask.prototype.aliases[aliasStr];
            return aliasDefinition ? (aliasDefinition.alias && resolveAlias(aliasDefinition.alias, undefined, opts), 
            $.extend(!0, opts, aliasDefinition), $.extend(!0, opts, options), !0) : (null === opts.mask && (opts.mask = aliasStr), 
            !1);
        }
        function generateMaskSet(opts, nocache) {
            function generateMask(mask, metadata, opts) {
                var regexMask = !1;
                if (null !== mask && "" !== mask || ((regexMask = null !== opts.regex) ? mask = (mask = opts.regex).replace(/^(\^)(.*)(\$)$/, "$2") : (regexMask = !0, 
                mask = ".*")), 1 === mask.length && !1 === opts.greedy && 0 !== opts.repeat && (opts.placeholder = ""), 
                opts.repeat > 0 || "*" === opts.repeat || "+" === opts.repeat) {
                    var repeatStart = "*" === opts.repeat ? 0 : "+" === opts.repeat ? 1 : opts.repeat;
                    mask = opts.groupmarker.start + mask + opts.groupmarker.end + opts.quantifiermarker.start + repeatStart + "," + opts.repeat + opts.quantifiermarker.end;
                }
                var masksetDefinition, maskdefKey = regexMask ? "regex_" + opts.regex : opts.numericInput ? mask.split("").reverse().join("") : mask;
                return Inputmask.prototype.masksCache[maskdefKey] === undefined || !0 === nocache ? (masksetDefinition = {
                    mask: mask,
                    maskToken: Inputmask.prototype.analyseMask(mask, regexMask, opts),
                    validPositions: {},
                    _buffer: undefined,
                    buffer: undefined,
                    tests: {},
                    metadata: metadata,
                    maskLength: undefined
                }, !0 !== nocache && (Inputmask.prototype.masksCache[maskdefKey] = masksetDefinition, 
                masksetDefinition = $.extend(!0, {}, Inputmask.prototype.masksCache[maskdefKey]))) : masksetDefinition = $.extend(!0, {}, Inputmask.prototype.masksCache[maskdefKey]), 
                masksetDefinition;
            }
            if ($.isFunction(opts.mask) && (opts.mask = opts.mask(opts)), $.isArray(opts.mask)) {
                if (opts.mask.length > 1) {
                    opts.keepStatic = null === opts.keepStatic || opts.keepStatic;
                    var altMask = opts.groupmarker.start;
                    return $.each(opts.numericInput ? opts.mask.reverse() : opts.mask, function(ndx, msk) {
                        altMask.length > 1 && (altMask += opts.groupmarker.end + opts.alternatormarker + opts.groupmarker.start), 
                        msk.mask === undefined || $.isFunction(msk.mask) ? altMask += msk : altMask += msk.mask;
                    }), altMask += opts.groupmarker.end, generateMask(altMask, opts.mask, opts);
                }
                opts.mask = opts.mask.pop();
            }
            return opts.mask && opts.mask.mask !== undefined && !$.isFunction(opts.mask.mask) ? generateMask(opts.mask.mask, opts.mask, opts) : generateMask(opts.mask, opts.mask, opts);
        }
        function maskScope(actionObj, maskset, opts) {
            function getMaskTemplate(baseOnInput, minimalPos, includeMode) {
                minimalPos = minimalPos || 0;
                var ndxIntlzr, test, testPos, maskTemplate = [], pos = 0, lvp = getLastValidPosition();
                do {
                    !0 === baseOnInput && getMaskSet().validPositions[pos] ? (test = (testPos = getMaskSet().validPositions[pos]).match, 
                    ndxIntlzr = testPos.locator.slice(), maskTemplate.push(!0 === includeMode ? testPos.input : !1 === includeMode ? test.nativeDef : getPlaceholder(pos, test))) : (test = (testPos = getTestTemplate(pos, ndxIntlzr, pos - 1)).match, 
                    ndxIntlzr = testPos.locator.slice(), (!1 === opts.jitMasking || pos < lvp || "number" == typeof opts.jitMasking && isFinite(opts.jitMasking) && opts.jitMasking > pos) && maskTemplate.push(!1 === includeMode ? test.nativeDef : getPlaceholder(pos, test))), 
                    pos++;
                } while ((maxLength === undefined || pos < maxLength) && (null !== test.fn || "" !== test.def) || minimalPos > pos);
                return "" === maskTemplate[maskTemplate.length - 1] && maskTemplate.pop(), getMaskSet().maskLength = pos + 1, 
                maskTemplate;
            }
            function getMaskSet() {
                return maskset;
            }
            function resetMaskSet(soft) {
                var maskset = getMaskSet();
                maskset.buffer = undefined, !0 !== soft && (maskset.validPositions = {}, maskset.p = 0);
            }
            function getLastValidPosition(closestTo, strict, validPositions) {
                var before = -1, after = -1, valids = validPositions || getMaskSet().validPositions;
                closestTo === undefined && (closestTo = -1);
                for (var posNdx in valids) {
                    var psNdx = parseInt(posNdx);
                    valids[psNdx] && (strict || !0 !== valids[psNdx].generatedInput) && (psNdx <= closestTo && (before = psNdx), 
                    psNdx >= closestTo && (after = psNdx));
                }
                return -1 !== before && closestTo - before > 1 || after < closestTo ? before : after;
            }
            function stripValidPositions(start, end, nocheck, strict) {
                var i, startPos = start, positionsClone = $.extend(!0, {}, getMaskSet().validPositions), needsValidation = !1;
                for (getMaskSet().p = start, i = end - 1; i >= startPos; i--) getMaskSet().validPositions[i] !== undefined && (!0 !== nocheck && (!getMaskSet().validPositions[i].match.optionality && function(pos) {
                    var posMatch = getMaskSet().validPositions[pos];
                    if (posMatch !== undefined && null === posMatch.match.fn) {
                        var prevMatch = getMaskSet().validPositions[pos - 1], nextMatch = getMaskSet().validPositions[pos + 1];
                        return prevMatch !== undefined && nextMatch !== undefined;
                    }
                    return !1;
                }(i) || !1 === opts.canClearPosition(getMaskSet(), i, getLastValidPosition(), strict, opts)) || delete getMaskSet().validPositions[i]);
                for (resetMaskSet(!0), i = startPos + 1; i <= getLastValidPosition(); ) {
                    for (;getMaskSet().validPositions[startPos] !== undefined; ) startPos++;
                    if (i < startPos && (i = startPos + 1), getMaskSet().validPositions[i] === undefined && isMask(i)) i++; else {
                        var t = getTestTemplate(i);
                        !1 === needsValidation && positionsClone[startPos] && positionsClone[startPos].match.def === t.match.def ? (getMaskSet().validPositions[startPos] = $.extend(!0, {}, positionsClone[startPos]), 
                        getMaskSet().validPositions[startPos].input = t.input, delete getMaskSet().validPositions[i], 
                        i++) : positionCanMatchDefinition(startPos, t.match.def) ? !1 !== isValid(startPos, t.input || getPlaceholder(i), !0) && (delete getMaskSet().validPositions[i], 
                        i++, needsValidation = !0) : isMask(i) || (i++, startPos--), startPos++;
                    }
                }
                resetMaskSet(!0);
            }
            function determineTestTemplate(tests, guessNextBest) {
                for (var testPos, testPositions = tests, lvp = getLastValidPosition(), lvTest = getMaskSet().validPositions[lvp] || getTests(0)[0], lvTestAltArr = lvTest.alternation !== undefined ? lvTest.locator[lvTest.alternation].toString().split(",") : [], ndx = 0; ndx < testPositions.length && (!((testPos = testPositions[ndx]).match && (opts.greedy && !0 !== testPos.match.optionalQuantifier || (!1 === testPos.match.optionality || !1 === testPos.match.newBlockMarker) && !0 !== testPos.match.optionalQuantifier) && (lvTest.alternation === undefined || lvTest.alternation !== testPos.alternation || testPos.locator[lvTest.alternation] !== undefined && checkAlternationMatch(testPos.locator[lvTest.alternation].toString().split(","), lvTestAltArr))) || !0 === guessNextBest && (null !== testPos.match.fn || /[0-9a-bA-Z]/.test(testPos.match.def))); ndx++) ;
                return testPos;
            }
            function getTestTemplate(pos, ndxIntlzr, tstPs) {
                return getMaskSet().validPositions[pos] || determineTestTemplate(getTests(pos, ndxIntlzr ? ndxIntlzr.slice() : ndxIntlzr, tstPs));
            }
            function getTest(pos) {
                return getMaskSet().validPositions[pos] ? getMaskSet().validPositions[pos] : getTests(pos)[0];
            }
            function positionCanMatchDefinition(pos, def) {
                for (var valid = !1, tests = getTests(pos), tndx = 0; tndx < tests.length; tndx++) if (tests[tndx].match && tests[tndx].match.def === def) {
                    valid = !0;
                    break;
                }
                return valid;
            }
            function getTests(pos, ndxIntlzr, tstPs) {
                function resolveTestFromToken(maskToken, ndxInitializer, loopNdx, quantifierRecurse) {
                    function handleMatch(match, loopNdx, quantifierRecurse) {
                        function isFirstMatch(latestMatch, tokenGroup) {
                            var firstMatch = 0 === $.inArray(latestMatch, tokenGroup.matches);
                            return firstMatch || $.each(tokenGroup.matches, function(ndx, match) {
                                if (!0 === match.isQuantifier && (firstMatch = isFirstMatch(latestMatch, tokenGroup.matches[ndx - 1]))) return !1;
                            }), firstMatch;
                        }
                        function resolveNdxInitializer(pos, alternateNdx, targetAlternation) {
                            var bestMatch, indexPos;
                            if (getMaskSet().validPositions[pos - 1] && targetAlternation && getMaskSet().tests[pos]) for (var vpAlternation = getMaskSet().validPositions[pos - 1].locator, tpAlternation = getMaskSet().tests[pos][0].locator, i = 0; i < targetAlternation; i++) if (vpAlternation[i] !== tpAlternation[i]) return vpAlternation.slice(targetAlternation + 1);
                            return (getMaskSet().tests[pos] || getMaskSet().validPositions[pos]) && $.each(getMaskSet().tests[pos] || [ getMaskSet().validPositions[pos] ], function(ndx, lmnt) {
                                var alternation = targetAlternation !== undefined ? targetAlternation : lmnt.alternation, ndxPos = lmnt.locator[alternation] !== undefined ? lmnt.locator[alternation].toString().indexOf(alternateNdx) : -1;
                                (indexPos === undefined || ndxPos < indexPos) && -1 !== ndxPos && (bestMatch = lmnt, 
                                indexPos = ndxPos);
                            }), bestMatch ? bestMatch.locator.slice((targetAlternation !== undefined ? targetAlternation : bestMatch.alternation) + 1) : targetAlternation !== undefined ? resolveNdxInitializer(pos, alternateNdx) : undefined;
                        }
                        if (testPos > 1e4) throw "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + getMaskSet().mask;
                        if (testPos === pos && match.matches === undefined) return matches.push({
                            match: match,
                            locator: loopNdx.reverse(),
                            cd: cacheDependency
                        }), !0;
                        if (match.matches !== undefined) {
                            if (match.isGroup && quantifierRecurse !== match) {
                                if (match = handleMatch(maskToken.matches[$.inArray(match, maskToken.matches) + 1], loopNdx)) return !0;
                            } else if (match.isOptional) {
                                var optionalToken = match;
                                if (match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse)) {
                                    if (latestMatch = matches[matches.length - 1].match, !isFirstMatch(latestMatch, optionalToken)) return !0;
                                    insertStop = !0, testPos = pos;
                                }
                            } else if (match.isAlternator) {
                                var maltMatches, alternateToken = match, malternateMatches = [], currentMatches = matches.slice(), loopNdxCnt = loopNdx.length, altIndex = ndxInitializer.length > 0 ? ndxInitializer.shift() : -1;
                                if (-1 === altIndex || "string" == typeof altIndex) {
                                    var amndx, currentPos = testPos, ndxInitializerClone = ndxInitializer.slice(), altIndexArr = [];
                                    if ("string" == typeof altIndex) altIndexArr = altIndex.split(","); else for (amndx = 0; amndx < alternateToken.matches.length; amndx++) altIndexArr.push(amndx);
                                    for (var ndx = 0; ndx < altIndexArr.length; ndx++) {
                                        if (amndx = parseInt(altIndexArr[ndx]), matches = [], ndxInitializer = resolveNdxInitializer(testPos, amndx, loopNdxCnt) || ndxInitializerClone.slice(), 
                                        !0 !== (match = handleMatch(alternateToken.matches[amndx] || maskToken.matches[amndx], [ amndx ].concat(loopNdx), quantifierRecurse) || match) && match !== undefined && altIndexArr[altIndexArr.length - 1] < alternateToken.matches.length) {
                                            var ntndx = $.inArray(match, maskToken.matches) + 1;
                                            maskToken.matches.length > ntndx && (match = handleMatch(maskToken.matches[ntndx], [ ntndx ].concat(loopNdx.slice(1, loopNdx.length)), quantifierRecurse)) && (altIndexArr.push(ntndx.toString()), 
                                            $.each(matches, function(ndx, lmnt) {
                                                lmnt.alternation = loopNdx.length - 1;
                                            }));
                                        }
                                        maltMatches = matches.slice(), testPos = currentPos, matches = [];
                                        for (var ndx1 = 0; ndx1 < maltMatches.length; ndx1++) {
                                            var altMatch = maltMatches[ndx1], dropMatch = !1;
                                            altMatch.alternation = altMatch.alternation || loopNdxCnt;
                                            for (var ndx2 = 0; ndx2 < malternateMatches.length; ndx2++) {
                                                var altMatch2 = malternateMatches[ndx2];
                                                if ("string" != typeof altIndex || -1 !== $.inArray(altMatch.locator[altMatch.alternation].toString(), altIndexArr)) {
                                                    if (function(source, target) {
                                                        return source.match.nativeDef === target.match.nativeDef || source.match.def === target.match.nativeDef || source.match.nativeDef === target.match.def;
                                                    }(altMatch, altMatch2)) {
                                                        dropMatch = !0, altMatch.alternation === altMatch2.alternation && -1 === altMatch2.locator[altMatch2.alternation].toString().indexOf(altMatch.locator[altMatch.alternation]) && (altMatch2.locator[altMatch2.alternation] = altMatch2.locator[altMatch2.alternation] + "," + altMatch.locator[altMatch.alternation], 
                                                        altMatch2.alternation = altMatch.alternation), altMatch.match.nativeDef === altMatch2.match.def && (altMatch.locator[altMatch.alternation] = altMatch2.locator[altMatch2.alternation], 
                                                        malternateMatches.splice(malternateMatches.indexOf(altMatch2), 1, altMatch));
                                                        break;
                                                    }
                                                    if (altMatch.match.def === altMatch2.match.def) {
                                                        dropMatch = !1;
                                                        break;
                                                    }
                                                    if (function(source, target) {
                                                        return null === source.match.fn && null !== target.match.fn && target.match.fn.test(source.match.def, getMaskSet(), pos, !1, opts, !1);
                                                    }(altMatch, altMatch2) || function(source, target) {
                                                        return null !== source.match.fn && null !== target.match.fn && target.match.fn.test(source.match.def.replace(/[\[\]]/g, ""), getMaskSet(), pos, !1, opts, !1);
                                                    }(altMatch, altMatch2)) {
                                                        altMatch.alternation === altMatch2.alternation && -1 === altMatch.locator[altMatch.alternation].toString().indexOf(altMatch2.locator[altMatch2.alternation].toString().split("")[0]) && (altMatch.na = altMatch.na || altMatch.locator[altMatch.alternation].toString(), 
                                                        -1 === altMatch.na.indexOf(altMatch.locator[altMatch.alternation].toString().split("")[0]) && (altMatch.na = altMatch.na + "," + altMatch.locator[altMatch2.alternation].toString().split("")[0]), 
                                                        dropMatch = !0, altMatch.locator[altMatch.alternation] = altMatch2.locator[altMatch2.alternation].toString().split("")[0] + "," + altMatch.locator[altMatch.alternation], 
                                                        malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch));
                                                        break;
                                                    }
                                                }
                                            }
                                            dropMatch || malternateMatches.push(altMatch);
                                        }
                                    }
                                    "string" == typeof altIndex && (malternateMatches = $.map(malternateMatches, function(lmnt, ndx) {
                                        if (isFinite(ndx)) {
                                            var alternation = lmnt.alternation, altLocArr = lmnt.locator[alternation].toString().split(",");
                                            lmnt.locator[alternation] = undefined, lmnt.alternation = undefined;
                                            for (var alndx = 0; alndx < altLocArr.length; alndx++) -1 !== $.inArray(altLocArr[alndx], altIndexArr) && (lmnt.locator[alternation] !== undefined ? (lmnt.locator[alternation] += ",", 
                                            lmnt.locator[alternation] += altLocArr[alndx]) : lmnt.locator[alternation] = parseInt(altLocArr[alndx]), 
                                            lmnt.alternation = alternation);
                                            if (lmnt.locator[alternation] !== undefined) return lmnt;
                                        }
                                    })), matches = currentMatches.concat(malternateMatches), testPos = pos, insertStop = matches.length > 0, 
                                    match = malternateMatches.length > 0, ndxInitializer = ndxInitializerClone.slice();
                                } else match = handleMatch(alternateToken.matches[altIndex] || maskToken.matches[altIndex], [ altIndex ].concat(loopNdx), quantifierRecurse);
                                if (match) return !0;
                            } else if (match.isQuantifier && quantifierRecurse !== maskToken.matches[$.inArray(match, maskToken.matches) - 1]) for (var qt = match, qndx = ndxInitializer.length > 0 ? ndxInitializer.shift() : 0; qndx < (isNaN(qt.quantifier.max) ? qndx + 1 : qt.quantifier.max) && testPos <= pos; qndx++) {
                                var tokenGroup = maskToken.matches[$.inArray(qt, maskToken.matches) - 1];
                                if (match = handleMatch(tokenGroup, [ qndx ].concat(loopNdx), tokenGroup)) {
                                    if (latestMatch = matches[matches.length - 1].match, latestMatch.optionalQuantifier = qndx > qt.quantifier.min - 1, 
                                    isFirstMatch(latestMatch, tokenGroup)) {
                                        if (qndx > qt.quantifier.min - 1) {
                                            insertStop = !0, testPos = pos;
                                            break;
                                        }
                                        return !0;
                                    }
                                    return !0;
                                }
                            } else if (match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse)) return !0;
                        } else testPos++;
                    }
                    for (var tndx = ndxInitializer.length > 0 ? ndxInitializer.shift() : 0; tndx < maskToken.matches.length; tndx++) if (!0 !== maskToken.matches[tndx].isQuantifier) {
                        var match = handleMatch(maskToken.matches[tndx], [ tndx ].concat(loopNdx), quantifierRecurse);
                        if (match && testPos === pos) return match;
                        if (testPos > pos) break;
                    }
                }
                function filterTests(tests) {
                    if (opts.keepStatic && pos > 0 && tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0) && !0 !== tests[0].match.optionality && !0 !== tests[0].match.optionalQuantifier && null === tests[0].match.fn && !/[0-9a-bA-Z]/.test(tests[0].match.def)) {
                        if (getMaskSet().validPositions[pos - 1] === undefined) return [ determineTestTemplate(tests) ];
                        if (getMaskSet().validPositions[pos - 1].alternation === tests[0].alternation) return [ determineTestTemplate(tests) ];
                        if (getMaskSet().validPositions[pos - 1]) return [ determineTestTemplate(tests) ];
                    }
                    return tests;
                }
                var latestMatch, maskTokens = getMaskSet().maskToken, testPos = ndxIntlzr ? tstPs : 0, ndxInitializer = ndxIntlzr ? ndxIntlzr.slice() : [ 0 ], matches = [], insertStop = !1, cacheDependency = ndxIntlzr ? ndxIntlzr.join("") : "";
                if (pos > -1) {
                    if (ndxIntlzr === undefined) {
                        for (var test, previousPos = pos - 1; (test = getMaskSet().validPositions[previousPos] || getMaskSet().tests[previousPos]) === undefined && previousPos > -1; ) previousPos--;
                        test !== undefined && previousPos > -1 && (ndxInitializer = function(tests) {
                            var locator = [];
                            return $.isArray(tests) || (tests = [ tests ]), tests.length > 0 && (tests[0].alternation === undefined ? 0 === (locator = determineTestTemplate(tests.slice()).locator.slice()).length && (locator = tests[0].locator.slice()) : $.each(tests, function(ndx, tst) {
                                if ("" !== tst.def) if (0 === locator.length) locator = tst.locator.slice(); else for (var i = 0; i < locator.length; i++) tst.locator[i] && -1 === locator[i].toString().indexOf(tst.locator[i]) && (locator[i] += "," + tst.locator[i]);
                            })), locator;
                        }(test), cacheDependency = ndxInitializer.join(""), testPos = previousPos);
                    }
                    if (getMaskSet().tests[pos] && getMaskSet().tests[pos][0].cd === cacheDependency) return filterTests(getMaskSet().tests[pos]);
                    for (var mtndx = ndxInitializer.shift(); mtndx < maskTokens.length && !(resolveTestFromToken(maskTokens[mtndx], ndxInitializer, [ mtndx ]) && testPos === pos || testPos > pos); mtndx++) ;
                }
                return (0 === matches.length || insertStop) && matches.push({
                    match: {
                        fn: null,
                        cardinality: 0,
                        optionality: !0,
                        casing: null,
                        def: "",
                        placeholder: ""
                    },
                    locator: [],
                    cd: cacheDependency
                }), ndxIntlzr !== undefined && getMaskSet().tests[pos] ? filterTests($.extend(!0, [], matches)) : (getMaskSet().tests[pos] = $.extend(!0, [], matches), 
                filterTests(getMaskSet().tests[pos]));
            }
            function getBufferTemplate() {
                return getMaskSet()._buffer === undefined && (getMaskSet()._buffer = getMaskTemplate(!1, 1), 
                getMaskSet().buffer === undefined && (getMaskSet().buffer = getMaskSet()._buffer.slice())), 
                getMaskSet()._buffer;
            }
            function getBuffer(noCache) {
                return getMaskSet().buffer !== undefined && !0 !== noCache || (getMaskSet().buffer = getMaskTemplate(!0, getLastValidPosition(), !0)), 
                getMaskSet().buffer;
            }
            function refreshFromBuffer(start, end, buffer) {
                var i, p;
                if (!0 === start) resetMaskSet(), start = 0, end = buffer.length; else for (i = start; i < end; i++) delete getMaskSet().validPositions[i];
                for (p = start, i = start; i < end; i++) if (resetMaskSet(!0), buffer[i] !== opts.skipOptionalPartCharacter) {
                    var valResult = isValid(p, buffer[i], !0, !0);
                    !1 !== valResult && (resetMaskSet(!0), p = valResult.caret !== undefined ? valResult.caret : valResult.pos + 1);
                }
            }
            function casing(elem, test, pos) {
                switch (opts.casing || test.casing) {
                  case "upper":
                    elem = elem.toUpperCase();
                    break;

                  case "lower":
                    elem = elem.toLowerCase();
                    break;

                  case "title":
                    var posBefore = getMaskSet().validPositions[pos - 1];
                    elem = 0 === pos || posBefore && posBefore.input === String.fromCharCode(Inputmask.keyCode.SPACE) ? elem.toUpperCase() : elem.toLowerCase();
                    break;

                  default:
                    if ($.isFunction(opts.casing)) {
                        var args = Array.prototype.slice.call(arguments);
                        args.push(getMaskSet().validPositions), elem = opts.casing.apply(this, args);
                    }
                }
                return elem;
            }
            function checkAlternationMatch(altArr1, altArr2, na) {
                for (var naNdx, altArrC = opts.greedy ? altArr2 : altArr2.slice(0, 1), isMatch = !1, naArr = na !== undefined ? na.split(",") : [], i = 0; i < naArr.length; i++) -1 !== (naNdx = altArr1.indexOf(naArr[i])) && altArr1.splice(naNdx, 1);
                for (var alndx = 0; alndx < altArr1.length; alndx++) if (-1 !== $.inArray(altArr1[alndx], altArrC)) {
                    isMatch = !0;
                    break;
                }
                return isMatch;
            }
            function isValid(pos, c, strict, fromSetValid, fromAlternate, validateOnly) {
                function isSelection(posObj) {
                    var selection = isRTL ? posObj.begin - posObj.end > 1 || posObj.begin - posObj.end == 1 : posObj.end - posObj.begin > 1 || posObj.end - posObj.begin == 1;
                    return selection && 0 === posObj.begin && posObj.end === getMaskSet().maskLength ? "full" : selection;
                }
                function _isValid(position, c, strict) {
                    var rslt = !1;
                    return $.each(getTests(position), function(ndx, tst) {
                        for (var test = tst.match, loopend = c ? 1 : 0, chrs = "", i = test.cardinality; i > loopend; i--) chrs += getBufferElement(position - (i - 1));
                        if (c && (chrs += c), getBuffer(!0), !1 !== (rslt = null != test.fn ? test.fn.test(chrs, getMaskSet(), position, strict, opts, isSelection(pos)) : (c === test.def || c === opts.skipOptionalPartCharacter) && "" !== test.def && {
                            c: getPlaceholder(position, test, !0) || test.def,
                            pos: position
                        })) {
                            var elem = rslt.c !== undefined ? rslt.c : c;
                            elem = elem === opts.skipOptionalPartCharacter && null === test.fn ? getPlaceholder(position, test, !0) || test.def : elem;
                            var validatedPos = position, possibleModifiedBuffer = getBuffer();
                            if (rslt.remove !== undefined && ($.isArray(rslt.remove) || (rslt.remove = [ rslt.remove ]), 
                            $.each(rslt.remove.sort(function(a, b) {
                                return b - a;
                            }), function(ndx, lmnt) {
                                stripValidPositions(lmnt, lmnt + 1, !0);
                            })), rslt.insert !== undefined && ($.isArray(rslt.insert) || (rslt.insert = [ rslt.insert ]), 
                            $.each(rslt.insert.sort(function(a, b) {
                                return a - b;
                            }), function(ndx, lmnt) {
                                isValid(lmnt.pos, lmnt.c, !0, fromSetValid);
                            })), rslt.refreshFromBuffer) {
                                var refresh = rslt.refreshFromBuffer;
                                if (refreshFromBuffer(!0 === refresh ? refresh : refresh.start, refresh.end, possibleModifiedBuffer), 
                                rslt.pos === undefined && rslt.c === undefined) return rslt.pos = getLastValidPosition(), 
                                !1;
                                if ((validatedPos = rslt.pos !== undefined ? rslt.pos : position) !== position) return rslt = $.extend(rslt, isValid(validatedPos, elem, !0, fromSetValid)), 
                                !1;
                            } else if (!0 !== rslt && rslt.pos !== undefined && rslt.pos !== position && (validatedPos = rslt.pos, 
                            refreshFromBuffer(position, validatedPos, getBuffer().slice()), validatedPos !== position)) return rslt = $.extend(rslt, isValid(validatedPos, elem, !0)), 
                            !1;
                            return (!0 === rslt || rslt.pos !== undefined || rslt.c !== undefined) && (ndx > 0 && resetMaskSet(!0), 
                            setValidPosition(validatedPos, $.extend({}, tst, {
                                input: casing(elem, test, validatedPos)
                            }), fromSetValid, isSelection(pos)) || (rslt = !1), !1);
                        }
                    }), rslt;
                }
                function setValidPosition(pos, validTest, fromSetValid, isSelection) {
                    if (isSelection || opts.insertMode && getMaskSet().validPositions[pos] !== undefined && fromSetValid === undefined) {
                        var i, positionsClone = $.extend(!0, {}, getMaskSet().validPositions), lvp = getLastValidPosition(undefined, !0);
                        for (i = pos; i <= lvp; i++) delete getMaskSet().validPositions[i];
                        getMaskSet().validPositions[pos] = $.extend(!0, {}, validTest);
                        var j, valid = !0, vps = getMaskSet().validPositions, needsValidation = !1, initialLength = getMaskSet().maskLength;
                        for (i = j = pos; i <= lvp; i++) {
                            var t = positionsClone[i];
                            if (t !== undefined) for (var posMatch = j; posMatch < getMaskSet().maskLength && (null === t.match.fn && vps[i] && (!0 === vps[i].match.optionalQuantifier || !0 === vps[i].match.optionality) || null != t.match.fn); ) {
                                if (posMatch++, !1 === needsValidation && positionsClone[posMatch] && positionsClone[posMatch].match.def === t.match.def) getMaskSet().validPositions[posMatch] = $.extend(!0, {}, positionsClone[posMatch]), 
                                getMaskSet().validPositions[posMatch].input = t.input, fillMissingNonMask(posMatch), 
                                j = posMatch, valid = !0; else if (positionCanMatchDefinition(posMatch, t.match.def)) {
                                    var result = isValid(posMatch, t.input, !0, !0);
                                    valid = !1 !== result, j = result.caret || result.insert ? getLastValidPosition() : posMatch, 
                                    needsValidation = !0;
                                } else if (!(valid = !0 === t.generatedInput) && posMatch >= getMaskSet().maskLength - 1) break;
                                if (getMaskSet().maskLength < initialLength && (getMaskSet().maskLength = initialLength), 
                                valid) break;
                            }
                            if (!valid) break;
                        }
                        if (!valid) return getMaskSet().validPositions = $.extend(!0, {}, positionsClone), 
                        resetMaskSet(!0), !1;
                    } else getMaskSet().validPositions[pos] = $.extend(!0, {}, validTest);
                    return resetMaskSet(!0), !0;
                }
                function fillMissingNonMask(maskPos) {
                    for (var pndx = maskPos - 1; pndx > -1 && !getMaskSet().validPositions[pndx]; pndx--) ;
                    var testTemplate, testsFromPos;
                    for (pndx++; pndx < maskPos; pndx++) getMaskSet().validPositions[pndx] === undefined && (!1 === opts.jitMasking || opts.jitMasking > pndx) && ("" === (testsFromPos = getTests(pndx, getTestTemplate(pndx - 1).locator, pndx - 1).slice())[testsFromPos.length - 1].match.def && testsFromPos.pop(), 
                    (testTemplate = determineTestTemplate(testsFromPos)) && (testTemplate.match.def === opts.radixPointDefinitionSymbol || !isMask(pndx, !0) || $.inArray(opts.radixPoint, getBuffer()) < pndx && testTemplate.match.fn && testTemplate.match.fn.test(getPlaceholder(pndx), getMaskSet(), pndx, !1, opts)) && !1 !== (result = _isValid(pndx, getPlaceholder(pndx, testTemplate.match, !0) || (null == testTemplate.match.fn ? testTemplate.match.def : "" !== getPlaceholder(pndx) ? getPlaceholder(pndx) : getBuffer()[pndx]), !0)) && (getMaskSet().validPositions[result.pos || pndx].generatedInput = !0));
                }
                strict = !0 === strict;
                var maskPos = pos;
                pos.begin !== undefined && (maskPos = isRTL && !isSelection(pos) ? pos.end : pos.begin);
                var result = !0, positionsClone = $.extend(!0, {}, getMaskSet().validPositions);
                if ($.isFunction(opts.preValidation) && !strict && !0 !== fromSetValid && !0 !== validateOnly && (result = opts.preValidation(getBuffer(), maskPos, c, isSelection(pos), opts)), 
                !0 === result) {
                    if (fillMissingNonMask(maskPos), isSelection(pos) && (handleRemove(undefined, Inputmask.keyCode.DELETE, pos, !0, !0), 
                    maskPos = getMaskSet().p), maskPos < getMaskSet().maskLength && (maxLength === undefined || maskPos < maxLength) && (result = _isValid(maskPos, c, strict), 
                    (!strict || !0 === fromSetValid) && !1 === result && !0 !== validateOnly)) {
                        var currentPosValid = getMaskSet().validPositions[maskPos];
                        if (!currentPosValid || null !== currentPosValid.match.fn || currentPosValid.match.def !== c && c !== opts.skipOptionalPartCharacter) {
                            if ((opts.insertMode || getMaskSet().validPositions[seekNext(maskPos)] === undefined) && !isMask(maskPos, !0)) for (var nPos = maskPos + 1, snPos = seekNext(maskPos); nPos <= snPos; nPos++) if (!1 !== (result = _isValid(nPos, c, strict))) {
                                !function(originalPos, newPos) {
                                    var vp = getMaskSet().validPositions[newPos];
                                    if (vp) for (var targetLocator = vp.locator, tll = targetLocator.length, ps = originalPos; ps < newPos; ps++) if (getMaskSet().validPositions[ps] === undefined && !isMask(ps, !0)) {
                                        var tests = getTests(ps).slice(), bestMatch = determineTestTemplate(tests, !0), equality = -1;
                                        "" === tests[tests.length - 1].match.def && tests.pop(), $.each(tests, function(ndx, tst) {
                                            for (var i = 0; i < tll; i++) {
                                                if (tst.locator[i] === undefined || !checkAlternationMatch(tst.locator[i].toString().split(","), targetLocator[i].toString().split(","), tst.na)) {
                                                    var targetAI = targetLocator[i], bestMatchAI = bestMatch.locator[i], tstAI = tst.locator[i];
                                                    targetAI - bestMatchAI > Math.abs(targetAI - tstAI) && (bestMatch = tst);
                                                    break;
                                                }
                                                equality < i && (equality = i, bestMatch = tst);
                                            }
                                        }), (bestMatch = $.extend({}, bestMatch, {
                                            input: getPlaceholder(ps, bestMatch.match, !0) || bestMatch.match.def
                                        })).generatedInput = !0, setValidPosition(ps, bestMatch, !0), getMaskSet().validPositions[newPos] = undefined, 
                                        _isValid(newPos, vp.input, !0);
                                    }
                                }(maskPos, result.pos !== undefined ? result.pos : nPos), maskPos = nPos;
                                break;
                            }
                        } else result = {
                            caret: seekNext(maskPos)
                        };
                    }
                    !1 === result && opts.keepStatic && !strict && !0 !== fromAlternate && (result = function(pos, c, strict) {
                        var lastAlt, alternation, altPos, prevAltPos, i, validPos, altNdxs, decisionPos, validPsClone = $.extend(!0, {}, getMaskSet().validPositions), isValidRslt = !1, lAltPos = getLastValidPosition();
                        for (prevAltPos = getMaskSet().validPositions[lAltPos]; lAltPos >= 0; lAltPos--) if ((altPos = getMaskSet().validPositions[lAltPos]) && altPos.alternation !== undefined) {
                            if (lastAlt = lAltPos, alternation = getMaskSet().validPositions[lastAlt].alternation, 
                            prevAltPos.locator[altPos.alternation] !== altPos.locator[altPos.alternation]) break;
                            prevAltPos = altPos;
                        }
                        if (alternation !== undefined) {
                            decisionPos = parseInt(lastAlt);
                            var decisionTaker = prevAltPos.locator[prevAltPos.alternation || alternation] !== undefined ? prevAltPos.locator[prevAltPos.alternation || alternation] : altNdxs[0];
                            decisionTaker.length > 0 && (decisionTaker = decisionTaker.split(",")[0]);
                            var possibilityPos = getMaskSet().validPositions[decisionPos], prevPos = getMaskSet().validPositions[decisionPos - 1];
                            $.each(getTests(decisionPos, prevPos ? prevPos.locator : undefined, decisionPos - 1), function(ndx, test) {
                                altNdxs = test.locator[alternation] ? test.locator[alternation].toString().split(",") : [];
                                for (var mndx = 0; mndx < altNdxs.length; mndx++) {
                                    var validInputs = [], staticInputsBeforePos = 0, staticInputsBeforePosAlternate = 0, verifyValidInput = !1;
                                    if (decisionTaker < altNdxs[mndx] && (test.na === undefined || -1 === $.inArray(altNdxs[mndx], test.na.split(",")) || -1 === $.inArray(decisionTaker.toString(), altNdxs))) {
                                        getMaskSet().validPositions[decisionPos] = $.extend(!0, {}, test);
                                        var possibilities = getMaskSet().validPositions[decisionPos].locator;
                                        for (getMaskSet().validPositions[decisionPos].locator[alternation] = parseInt(altNdxs[mndx]), 
                                        null == test.match.fn ? (possibilityPos.input !== test.match.def && (verifyValidInput = !0, 
                                        !0 !== possibilityPos.generatedInput && validInputs.push(possibilityPos.input)), 
                                        staticInputsBeforePosAlternate++, getMaskSet().validPositions[decisionPos].generatedInput = !/[0-9a-bA-Z]/.test(test.match.def), 
                                        getMaskSet().validPositions[decisionPos].input = test.match.def) : getMaskSet().validPositions[decisionPos].input = possibilityPos.input, 
                                        i = decisionPos + 1; i < getLastValidPosition(undefined, !0) + 1; i++) (validPos = getMaskSet().validPositions[i]) && !0 !== validPos.generatedInput && /[0-9a-bA-Z]/.test(validPos.input) ? validInputs.push(validPos.input) : i < pos && staticInputsBeforePos++, 
                                        delete getMaskSet().validPositions[i];
                                        for (verifyValidInput && validInputs[0] === test.match.def && validInputs.shift(), 
                                        resetMaskSet(!0), isValidRslt = !0; validInputs.length > 0; ) {
                                            var input = validInputs.shift();
                                            if (input !== opts.skipOptionalPartCharacter && !(isValidRslt = isValid(getLastValidPosition(undefined, !0) + 1, input, !1, fromSetValid, !0))) break;
                                        }
                                        if (isValidRslt) {
                                            getMaskSet().validPositions[decisionPos].locator = possibilities;
                                            var targetLvp = getLastValidPosition(pos) + 1;
                                            for (i = decisionPos + 1; i < getLastValidPosition() + 1; i++) ((validPos = getMaskSet().validPositions[i]) === undefined || null == validPos.match.fn) && i < pos + (staticInputsBeforePosAlternate - staticInputsBeforePos) && staticInputsBeforePosAlternate++;
                                            isValidRslt = isValid((pos += staticInputsBeforePosAlternate - staticInputsBeforePos) > targetLvp ? targetLvp : pos, c, strict, fromSetValid, !0);
                                        }
                                        if (isValidRslt) return !1;
                                        resetMaskSet(), getMaskSet().validPositions = $.extend(!0, {}, validPsClone);
                                    }
                                }
                            });
                        }
                        return isValidRslt;
                    }(maskPos, c, strict)), !0 === result && (result = {
                        pos: maskPos
                    });
                }
                if ($.isFunction(opts.postValidation) && !1 !== result && !strict && !0 !== fromSetValid && !0 !== validateOnly) {
                    var postResult = opts.postValidation(getBuffer(!0), result, opts);
                    if (postResult.refreshFromBuffer && postResult.buffer) {
                        var refresh = postResult.refreshFromBuffer;
                        refreshFromBuffer(!0 === refresh ? refresh : refresh.start, refresh.end, postResult.buffer);
                    }
                    result = !0 === postResult ? result : postResult;
                }
                return result && result.pos === undefined && (result.pos = maskPos), !1 !== result && !0 !== validateOnly || (resetMaskSet(!0), 
                getMaskSet().validPositions = $.extend(!0, {}, positionsClone)), result;
            }
            function isMask(pos, strict) {
                var test = getTestTemplate(pos).match;
                if ("" === test.def && (test = getTest(pos).match), null != test.fn) return test.fn;
                if (!0 !== strict && pos > -1) {
                    var tests = getTests(pos);
                    return tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0);
                }
                return !1;
            }
            function seekNext(pos, newBlock) {
                var maskL = getMaskSet().maskLength;
                if (pos >= maskL) return maskL;
                var position = pos;
                for (getTests(maskL + 1).length > 1 && (getMaskTemplate(!0, maskL + 1, !0), maskL = getMaskSet().maskLength); ++position < maskL && (!0 === newBlock && (!0 !== getTest(position).match.newBlockMarker || !isMask(position)) || !0 !== newBlock && !isMask(position)); ) ;
                return position;
            }
            function seekPrevious(pos, newBlock) {
                var tests, position = pos;
                if (position <= 0) return 0;
                for (;--position > 0 && (!0 === newBlock && !0 !== getTest(position).match.newBlockMarker || !0 !== newBlock && !isMask(position) && ((tests = getTests(position)).length < 2 || 2 === tests.length && "" === tests[1].match.def)); ) ;
                return position;
            }
            function getBufferElement(position) {
                return getMaskSet().validPositions[position] === undefined ? getPlaceholder(position) : getMaskSet().validPositions[position].input;
            }
            function writeBuffer(input, buffer, caretPos, event, triggerInputEvent) {
                if (event && $.isFunction(opts.onBeforeWrite)) {
                    var result = opts.onBeforeWrite.call(inputmask, event, buffer, caretPos, opts);
                    if (result) {
                        if (result.refreshFromBuffer) {
                            var refresh = result.refreshFromBuffer;
                            refreshFromBuffer(!0 === refresh ? refresh : refresh.start, refresh.end, result.buffer || buffer), 
                            buffer = getBuffer(!0);
                        }
                        caretPos !== undefined && (caretPos = result.caret !== undefined ? result.caret : caretPos);
                    }
                }
                input !== undefined && (input.inputmask._valueSet(buffer.join("")), caretPos === undefined || event !== undefined && "blur" === event.type ? renderColorMask(input, caretPos, 0 === buffer.length) : android && event && "input" === event.type ? setTimeout(function() {
                    caret(input, caretPos);
                }, 0) : caret(input, caretPos), !0 === triggerInputEvent && (skipInputEvent = !0, 
                $(input).trigger("input")));
            }
            function getPlaceholder(pos, test, returnPL) {
                if ((test = test || getTest(pos).match).placeholder !== undefined || !0 === returnPL) return $.isFunction(test.placeholder) ? test.placeholder(opts) : test.placeholder;
                if (null === test.fn) {
                    if (pos > -1 && getMaskSet().validPositions[pos] === undefined) {
                        var prevTest, tests = getTests(pos), staticAlternations = [];
                        if (tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0)) for (var i = 0; i < tests.length; i++) if (!0 !== tests[i].match.optionality && !0 !== tests[i].match.optionalQuantifier && (null === tests[i].match.fn || prevTest === undefined || !1 !== tests[i].match.fn.test(prevTest.match.def, getMaskSet(), pos, !0, opts)) && (staticAlternations.push(tests[i]), 
                        null === tests[i].match.fn && (prevTest = tests[i]), staticAlternations.length > 1 && /[0-9a-bA-Z]/.test(staticAlternations[0].match.def))) return opts.placeholder.charAt(pos % opts.placeholder.length);
                    }
                    return test.def;
                }
                return opts.placeholder.charAt(pos % opts.placeholder.length);
            }
            function checkVal(input, writeOut, strict, nptvl, initiatingEvent) {
                function isTemplateMatch(ndx, charCodes) {
                    return -1 !== getBufferTemplate().slice(ndx, seekNext(ndx)).join("").indexOf(charCodes) && !isMask(ndx) && getTest(ndx).match.nativeDef === charCodes.charAt(charCodes.length - 1);
                }
                var inputValue = nptvl.slice(), charCodes = "", initialNdx = -1, result = undefined;
                if (resetMaskSet(), strict || !0 === opts.autoUnmask) initialNdx = seekNext(initialNdx); else {
                    var staticInput = getBufferTemplate().slice(0, seekNext(-1)).join(""), matches = inputValue.join("").match(new RegExp("^" + Inputmask.escapeRegex(staticInput), "g"));
                    matches && matches.length > 0 && (inputValue.splice(0, matches.length * staticInput.length), 
                    initialNdx = seekNext(initialNdx));
                }
                if (-1 === initialNdx ? (getMaskSet().p = seekNext(initialNdx), initialNdx = 0) : getMaskSet().p = initialNdx, 
                $.each(inputValue, function(ndx, charCode) {
                    if (charCode !== undefined) if (getMaskSet().validPositions[ndx] === undefined && inputValue[ndx] === getPlaceholder(ndx) && isMask(ndx, !0) && !1 === isValid(ndx, inputValue[ndx], !0, undefined, undefined, !0)) getMaskSet().p++; else {
                        var keypress = new $.Event("_checkval");
                        keypress.which = charCode.charCodeAt(0), charCodes += charCode;
                        var lvp = getLastValidPosition(undefined, !0), lvTest = getMaskSet().validPositions[lvp], nextTest = getTestTemplate(lvp + 1, lvTest ? lvTest.locator.slice() : undefined, lvp);
                        if (!isTemplateMatch(initialNdx, charCodes) || strict || opts.autoUnmask) {
                            var pos = strict ? ndx : null == nextTest.match.fn && nextTest.match.optionality && lvp + 1 < getMaskSet().p ? lvp + 1 : getMaskSet().p;
                            result = EventHandlers.keypressEvent.call(input, keypress, !0, !1, strict, pos), 
                            initialNdx = pos + 1, charCodes = "";
                        } else result = EventHandlers.keypressEvent.call(input, keypress, !0, !1, !0, lvp + 1);
                        if (!1 !== result && !strict && $.isFunction(opts.onBeforeWrite)) {
                            var origResult = result;
                            if (result = opts.onBeforeWrite.call(inputmask, keypress, getBuffer(), result.forwardPosition, opts), 
                            (result = $.extend(origResult, result)) && result.refreshFromBuffer) {
                                var refresh = result.refreshFromBuffer;
                                refreshFromBuffer(!0 === refresh ? refresh : refresh.start, refresh.end, result.buffer), 
                                resetMaskSet(!0), result.caret && (getMaskSet().p = result.caret, result.forwardPosition = result.caret);
                            }
                        }
                    }
                }), writeOut) {
                    var caretPos = undefined;
                    document.activeElement === input && result && (caretPos = opts.numericInput ? seekPrevious(result.forwardPosition) : result.forwardPosition), 
                    writeBuffer(input, getBuffer(), caretPos, initiatingEvent || new $.Event("checkval"), initiatingEvent && "input" === initiatingEvent.type);
                }
            }
            function unmaskedvalue(input) {
                if (input) {
                    if (input.inputmask === undefined) return input.value;
                    input.inputmask && input.inputmask.refreshValue && EventHandlers.setValueEvent.call(input);
                }
                var umValue = [], vps = getMaskSet().validPositions;
                for (var pndx in vps) vps[pndx].match && null != vps[pndx].match.fn && umValue.push(vps[pndx].input);
                var unmaskedValue = 0 === umValue.length ? "" : (isRTL ? umValue.reverse() : umValue).join("");
                if ($.isFunction(opts.onUnMask)) {
                    var bufferValue = (isRTL ? getBuffer().slice().reverse() : getBuffer()).join("");
                    unmaskedValue = opts.onUnMask.call(inputmask, bufferValue, unmaskedValue, opts);
                }
                return unmaskedValue;
            }
            function caret(input, begin, end, notranslate) {
                function translatePosition(pos) {
                    return !0 === notranslate || !isRTL || "number" != typeof pos || opts.greedy && "" === opts.placeholder || (pos = getBuffer().join("").length - pos), 
                    pos;
                }
                var range;
                if (begin === undefined) return input.setSelectionRange ? (begin = input.selectionStart, 
                end = input.selectionEnd) : window.getSelection ? (range = window.getSelection().getRangeAt(0)).commonAncestorContainer.parentNode !== input && range.commonAncestorContainer !== input || (begin = range.startOffset, 
                end = range.endOffset) : document.selection && document.selection.createRange && (end = (begin = 0 - (range = document.selection.createRange()).duplicate().moveStart("character", -input.inputmask._valueGet().length)) + range.text.length), 
                {
                    begin: translatePosition(begin),
                    end: translatePosition(end)
                };
                if (begin.begin !== undefined && (end = begin.end, begin = begin.begin), "number" == typeof begin) {
                    begin = translatePosition(begin), end = "number" == typeof (end = translatePosition(end)) ? end : begin;
                    var scrollCalc = parseInt(((input.ownerDocument.defaultView || window).getComputedStyle ? (input.ownerDocument.defaultView || window).getComputedStyle(input, null) : input.currentStyle).fontSize) * end;
                    if (input.scrollLeft = scrollCalc > input.scrollWidth ? scrollCalc : 0, mobile || !1 !== opts.insertMode || begin !== end || end++, 
                    input.setSelectionRange) input.selectionStart = begin, input.selectionEnd = end; else if (window.getSelection) {
                        if (range = document.createRange(), input.firstChild === undefined || null === input.firstChild) {
                            var textNode = document.createTextNode("");
                            input.appendChild(textNode);
                        }
                        range.setStart(input.firstChild, begin < input.inputmask._valueGet().length ? begin : input.inputmask._valueGet().length), 
                        range.setEnd(input.firstChild, end < input.inputmask._valueGet().length ? end : input.inputmask._valueGet().length), 
                        range.collapse(!0);
                        var sel = window.getSelection();
                        sel.removeAllRanges(), sel.addRange(range);
                    } else input.createTextRange && ((range = input.createTextRange()).collapse(!0), 
                    range.moveEnd("character", end), range.moveStart("character", begin), range.select());
                    renderColorMask(input, {
                        begin: begin,
                        end: end
                    });
                }
            }
            function determineLastRequiredPosition(returnDefinition) {
                var pos, testPos, buffer = getBuffer(), bl = buffer.length, lvp = getLastValidPosition(), positions = {}, lvTest = getMaskSet().validPositions[lvp], ndxIntlzr = lvTest !== undefined ? lvTest.locator.slice() : undefined;
                for (pos = lvp + 1; pos < buffer.length; pos++) ndxIntlzr = (testPos = getTestTemplate(pos, ndxIntlzr, pos - 1)).locator.slice(), 
                positions[pos] = $.extend(!0, {}, testPos);
                var lvTestAlt = lvTest && lvTest.alternation !== undefined ? lvTest.locator[lvTest.alternation] : undefined;
                for (pos = bl - 1; pos > lvp && (((testPos = positions[pos]).match.optionality || testPos.match.optionalQuantifier && testPos.match.newBlockMarker || lvTestAlt && (lvTestAlt !== positions[pos].locator[lvTest.alternation] && null != testPos.match.fn || null === testPos.match.fn && testPos.locator[lvTest.alternation] && checkAlternationMatch(testPos.locator[lvTest.alternation].toString().split(","), lvTestAlt.toString().split(",")) && "" !== getTests(pos)[0].def)) && buffer[pos] === getPlaceholder(pos, testPos.match)); pos--) bl--;
                return returnDefinition ? {
                    l: bl,
                    def: positions[bl] ? positions[bl].match : undefined
                } : bl;
            }
            function clearOptionalTail(buffer) {
                for (var validPos, rl = determineLastRequiredPosition(), bl = buffer.length, lv = getMaskSet().validPositions[getLastValidPosition()]; rl < bl && !isMask(rl, !0) && (validPos = lv !== undefined ? getTestTemplate(rl, lv.locator.slice(""), lv) : getTest(rl)) && !0 !== validPos.match.optionality && (!0 !== validPos.match.optionalQuantifier && !0 !== validPos.match.newBlockMarker || rl + 1 === bl && "" === (lv !== undefined ? getTestTemplate(rl + 1, lv.locator.slice(""), lv) : getTest(rl + 1)).match.def); ) rl++;
                for (;(validPos = getMaskSet().validPositions[rl - 1]) && validPos && validPos.match.optionality && validPos.input === opts.skipOptionalPartCharacter; ) rl--;
                return buffer.splice(rl), buffer;
            }
            function isComplete(buffer) {
                if ($.isFunction(opts.isComplete)) return opts.isComplete(buffer, opts);
                if ("*" === opts.repeat) return undefined;
                var complete = !1, lrp = determineLastRequiredPosition(!0), aml = seekPrevious(lrp.l);
                if (lrp.def === undefined || lrp.def.newBlockMarker || lrp.def.optionality || lrp.def.optionalQuantifier) {
                    complete = !0;
                    for (var i = 0; i <= aml; i++) {
                        var test = getTestTemplate(i).match;
                        if (null !== test.fn && getMaskSet().validPositions[i] === undefined && !0 !== test.optionality && !0 !== test.optionalQuantifier || null === test.fn && buffer[i] !== getPlaceholder(i, test)) {
                            complete = !1;
                            break;
                        }
                    }
                }
                return complete;
            }
            function handleRemove(input, k, pos, strict, fromIsValid) {
                if ((opts.numericInput || isRTL) && (k === Inputmask.keyCode.BACKSPACE ? k = Inputmask.keyCode.DELETE : k === Inputmask.keyCode.DELETE && (k = Inputmask.keyCode.BACKSPACE), 
                isRTL)) {
                    var pend = pos.end;
                    pos.end = pos.begin, pos.begin = pend;
                }
                k === Inputmask.keyCode.BACKSPACE && (pos.end - pos.begin < 1 || !1 === opts.insertMode) ? (pos.begin = seekPrevious(pos.begin), 
                getMaskSet().validPositions[pos.begin] !== undefined && getMaskSet().validPositions[pos.begin].input === opts.groupSeparator && pos.begin--) : k === Inputmask.keyCode.DELETE && pos.begin === pos.end && (pos.end = isMask(pos.end, !0) && getMaskSet().validPositions[pos.end] && getMaskSet().validPositions[pos.end].input !== opts.radixPoint ? pos.end + 1 : seekNext(pos.end) + 1, 
                getMaskSet().validPositions[pos.begin] !== undefined && getMaskSet().validPositions[pos.begin].input === opts.groupSeparator && pos.end++), 
                stripValidPositions(pos.begin, pos.end, !1, strict), !0 !== strict && function() {
                    if (opts.keepStatic) {
                        for (var validInputs = [], lastAlt = getLastValidPosition(-1, !0), positionsClone = $.extend(!0, {}, getMaskSet().validPositions), prevAltPos = getMaskSet().validPositions[lastAlt]; lastAlt >= 0; lastAlt--) {
                            var altPos = getMaskSet().validPositions[lastAlt];
                            if (altPos) {
                                if (!0 !== altPos.generatedInput && /[0-9a-bA-Z]/.test(altPos.input) && validInputs.push(altPos.input), 
                                delete getMaskSet().validPositions[lastAlt], altPos.alternation !== undefined && altPos.locator[altPos.alternation] !== prevAltPos.locator[altPos.alternation]) break;
                                prevAltPos = altPos;
                            }
                        }
                        if (lastAlt > -1) for (getMaskSet().p = seekNext(getLastValidPosition(-1, !0)); validInputs.length > 0; ) {
                            var keypress = new $.Event("keypress");
                            keypress.which = validInputs.pop().charCodeAt(0), EventHandlers.keypressEvent.call(input, keypress, !0, !1, !1, getMaskSet().p);
                        } else getMaskSet().validPositions = $.extend(!0, {}, positionsClone);
                    }
                }();
                var lvp = getLastValidPosition(pos.begin, !0);
                if (lvp < pos.begin) getMaskSet().p = seekNext(lvp); else if (!0 !== strict && (getMaskSet().p = pos.begin, 
                !0 !== fromIsValid)) for (;getMaskSet().p < lvp && getMaskSet().validPositions[getMaskSet().p] === undefined; ) getMaskSet().p++;
            }
            function initializeColorMask(input) {
                function findCaretPos(clientx) {
                    var caretPos, e = document.createElement("span");
                    for (var style in computedStyle) isNaN(style) && -1 !== style.indexOf("font") && (e.style[style] = computedStyle[style]);
                    e.style.textTransform = computedStyle.textTransform, e.style.letterSpacing = computedStyle.letterSpacing, 
                    e.style.position = "absolute", e.style.height = "auto", e.style.width = "auto", 
                    e.style.visibility = "hidden", e.style.whiteSpace = "nowrap", document.body.appendChild(e);
                    var itl, inputText = input.inputmask._valueGet(), previousWidth = 0;
                    for (caretPos = 0, itl = inputText.length; caretPos <= itl; caretPos++) {
                        if (e.innerHTML += inputText.charAt(caretPos) || "_", e.offsetWidth >= clientx) {
                            var offset1 = clientx - previousWidth, offset2 = e.offsetWidth - clientx;
                            e.innerHTML = inputText.charAt(caretPos), caretPos = (offset1 -= e.offsetWidth / 3) < offset2 ? caretPos - 1 : caretPos;
                            break;
                        }
                        previousWidth = e.offsetWidth;
                    }
                    return document.body.removeChild(e), caretPos;
                }
                var computedStyle = (input.ownerDocument.defaultView || window).getComputedStyle(input, null), template = document.createElement("div");
                template.style.width = computedStyle.width, template.style.textAlign = computedStyle.textAlign, 
                (colorMask = document.createElement("div")).className = "im-colormask", input.parentNode.insertBefore(colorMask, input), 
                input.parentNode.removeChild(input), colorMask.appendChild(template), colorMask.appendChild(input), 
                input.style.left = template.offsetLeft + "px", $(input).on("click", function(e) {
                    return caret(input, findCaretPos(e.clientX)), EventHandlers.clickEvent.call(input, [ e ]);
                }), $(input).on("keydown", function(e) {
                    e.shiftKey || !1 === opts.insertMode || setTimeout(function() {
                        renderColorMask(input);
                    }, 0);
                });
            }
            function renderColorMask(input, caretPos, clear) {
                function handleStatic() {
                    isStatic || null !== test.fn && testPos.input !== undefined ? isStatic && (null !== test.fn && testPos.input !== undefined || "" === test.def) && (isStatic = !1, 
                    maskTemplate += "</span>") : (isStatic = !0, maskTemplate += "<span class='im-static'>");
                }
                function handleCaret(force) {
                    !0 !== force && pos !== caretPos.begin || document.activeElement !== input || (maskTemplate += "<span class='im-caret' style='border-right-width: 1px;border-right-style: solid;'></span>");
                }
                var test, testPos, ndxIntlzr, maskTemplate = "", isStatic = !1, pos = 0;
                if (colorMask !== undefined) {
                    var buffer = getBuffer();
                    if (caretPos === undefined ? caretPos = caret(input) : caretPos.begin === undefined && (caretPos = {
                        begin: caretPos,
                        end: caretPos
                    }), !0 !== clear) {
                        var lvp = getLastValidPosition();
                        do {
                            handleCaret(), getMaskSet().validPositions[pos] ? (testPos = getMaskSet().validPositions[pos], 
                            test = testPos.match, ndxIntlzr = testPos.locator.slice(), handleStatic(), maskTemplate += buffer[pos]) : (testPos = getTestTemplate(pos, ndxIntlzr, pos - 1), 
                            test = testPos.match, ndxIntlzr = testPos.locator.slice(), (!1 === opts.jitMasking || pos < lvp || "number" == typeof opts.jitMasking && isFinite(opts.jitMasking) && opts.jitMasking > pos) && (handleStatic(), 
                            maskTemplate += getPlaceholder(pos, test))), pos++;
                        } while ((maxLength === undefined || pos < maxLength) && (null !== test.fn || "" !== test.def) || lvp > pos || isStatic);
                        -1 === maskTemplate.indexOf("im-caret") && handleCaret(!0), isStatic && handleStatic();
                    }
                    var template = colorMask.getElementsByTagName("div")[0];
                    template.innerHTML = maskTemplate, input.inputmask.positionColorMask(input, template);
                }
            }
            maskset = maskset || this.maskset, opts = opts || this.opts;
            var undoValue, $el, maxLength, colorMask, inputmask = this, el = this.el, isRTL = this.isRTL, skipKeyPressEvent = !1, skipInputEvent = !1, ignorable = !1, mouseEnter = !1, EventRuler = {
                on: function(input, eventName, eventHandler) {
                    var ev = function(e) {
                        if (this.inputmask === undefined && "FORM" !== this.nodeName) {
                            var imOpts = $.data(this, "_inputmask_opts");
                            imOpts ? new Inputmask(imOpts).mask(this) : EventRuler.off(this);
                        } else {
                            if ("setvalue" === e.type || "FORM" === this.nodeName || !(this.disabled || this.readOnly && !("keydown" === e.type && e.ctrlKey && 67 === e.keyCode || !1 === opts.tabThrough && e.keyCode === Inputmask.keyCode.TAB))) {
                                switch (e.type) {
                                  case "input":
                                    if (!0 === skipInputEvent) return skipInputEvent = !1, e.preventDefault();
                                    break;

                                  case "keydown":
                                    skipKeyPressEvent = !1, skipInputEvent = !1;
                                    break;

                                  case "keypress":
                                    if (!0 === skipKeyPressEvent) return e.preventDefault();
                                    skipKeyPressEvent = !0;
                                    break;

                                  case "click":
                                    if (iemobile || iphone) {
                                        var that = this, args = arguments;
                                        return setTimeout(function() {
                                            eventHandler.apply(that, args);
                                        }, 0), !1;
                                    }
                                }
                                var returnVal = eventHandler.apply(this, arguments);
                                return !1 === returnVal && (e.preventDefault(), e.stopPropagation()), returnVal;
                            }
                            e.preventDefault();
                        }
                    };
                    input.inputmask.events[eventName] = input.inputmask.events[eventName] || [], input.inputmask.events[eventName].push(ev), 
                    -1 !== $.inArray(eventName, [ "submit", "reset" ]) ? null !== input.form && $(input.form).on(eventName, ev) : $(input).on(eventName, ev);
                },
                off: function(input, event) {
                    if (input.inputmask && input.inputmask.events) {
                        var events;
                        event ? (events = [])[event] = input.inputmask.events[event] : events = input.inputmask.events, 
                        $.each(events, function(eventName, evArr) {
                            for (;evArr.length > 0; ) {
                                var ev = evArr.pop();
                                -1 !== $.inArray(eventName, [ "submit", "reset" ]) ? null !== input.form && $(input.form).off(eventName, ev) : $(input).off(eventName, ev);
                            }
                            delete input.inputmask.events[eventName];
                        });
                    }
                }
            }, EventHandlers = {
                keydownEvent: function(e) {
                    var input = this, $input = $(input), k = e.keyCode, pos = caret(input);
                    if (k === Inputmask.keyCode.BACKSPACE || k === Inputmask.keyCode.DELETE || iphone && k === Inputmask.keyCode.BACKSPACE_SAFARI || e.ctrlKey && k === Inputmask.keyCode.X && !function(eventName) {
                        var el = document.createElement("input"), evName = "on" + eventName, isSupported = evName in el;
                        return isSupported || (el.setAttribute(evName, "return;"), isSupported = "function" == typeof el[evName]), 
                        el = null, isSupported;
                    }("cut")) e.preventDefault(), handleRemove(input, k, pos), writeBuffer(input, getBuffer(!0), getMaskSet().p, e, input.inputmask._valueGet() !== getBuffer().join("")), 
                    input.inputmask._valueGet() === getBufferTemplate().join("") ? $input.trigger("cleared") : !0 === isComplete(getBuffer()) && $input.trigger("complete"); else if (k === Inputmask.keyCode.END || k === Inputmask.keyCode.PAGE_DOWN) {
                        e.preventDefault();
                        var caretPos = seekNext(getLastValidPosition());
                        opts.insertMode || caretPos !== getMaskSet().maskLength || e.shiftKey || caretPos--, 
                        caret(input, e.shiftKey ? pos.begin : caretPos, caretPos, !0);
                    } else k === Inputmask.keyCode.HOME && !e.shiftKey || k === Inputmask.keyCode.PAGE_UP ? (e.preventDefault(), 
                    caret(input, 0, e.shiftKey ? pos.begin : 0, !0)) : (opts.undoOnEscape && k === Inputmask.keyCode.ESCAPE || 90 === k && e.ctrlKey) && !0 !== e.altKey ? (checkVal(input, !0, !1, undoValue.split("")), 
                    $input.trigger("click")) : k !== Inputmask.keyCode.INSERT || e.shiftKey || e.ctrlKey ? !0 === opts.tabThrough && k === Inputmask.keyCode.TAB ? (!0 === e.shiftKey ? (null === getTest(pos.begin).match.fn && (pos.begin = seekNext(pos.begin)), 
                    pos.end = seekPrevious(pos.begin, !0), pos.begin = seekPrevious(pos.end, !0)) : (pos.begin = seekNext(pos.begin, !0), 
                    pos.end = seekNext(pos.begin, !0), pos.end < getMaskSet().maskLength && pos.end--), 
                    pos.begin < getMaskSet().maskLength && (e.preventDefault(), caret(input, pos.begin, pos.end))) : e.shiftKey || !1 === opts.insertMode && (k === Inputmask.keyCode.RIGHT ? setTimeout(function() {
                        var caretPos = caret(input);
                        caret(input, caretPos.begin);
                    }, 0) : k === Inputmask.keyCode.LEFT && setTimeout(function() {
                        var caretPos = caret(input);
                        caret(input, isRTL ? caretPos.begin + 1 : caretPos.begin - 1);
                    }, 0)) : (opts.insertMode = !opts.insertMode, caret(input, opts.insertMode || pos.begin !== getMaskSet().maskLength ? pos.begin : pos.begin - 1));
                    opts.onKeyDown.call(this, e, getBuffer(), caret(input).begin, opts), ignorable = -1 !== $.inArray(k, opts.ignorables);
                },
                keypressEvent: function(e, checkval, writeOut, strict, ndx) {
                    var input = this, $input = $(input), k = e.which || e.charCode || e.keyCode;
                    if (!(!0 === checkval || e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || ignorable)) return k === Inputmask.keyCode.ENTER && undoValue !== getBuffer().join("") && (undoValue = getBuffer().join(""), 
                    setTimeout(function() {
                        $input.trigger("change");
                    }, 0)), !0;
                    if (k) {
                        46 === k && !1 === e.shiftKey && "" !== opts.radixPoint && (k = opts.radixPoint.charCodeAt(0));
                        var forwardPosition, pos = checkval ? {
                            begin: ndx,
                            end: ndx
                        } : caret(input), c = String.fromCharCode(k);
                        getMaskSet().writeOutBuffer = !0;
                        var valResult = isValid(pos, c, strict);
                        if (!1 !== valResult && (resetMaskSet(!0), forwardPosition = valResult.caret !== undefined ? valResult.caret : checkval ? valResult.pos + 1 : seekNext(valResult.pos), 
                        getMaskSet().p = forwardPosition), !1 !== writeOut && (setTimeout(function() {
                            opts.onKeyValidation.call(input, k, valResult, opts);
                        }, 0), getMaskSet().writeOutBuffer && !1 !== valResult)) {
                            var buffer = getBuffer();
                            writeBuffer(input, buffer, opts.numericInput && valResult.caret === undefined ? seekPrevious(forwardPosition) : forwardPosition, e, !0 !== checkval), 
                            !0 !== checkval && setTimeout(function() {
                                !0 === isComplete(buffer) && $input.trigger("complete");
                            }, 0);
                        }
                        if (e.preventDefault(), checkval) return !1 !== valResult && (valResult.forwardPosition = forwardPosition), 
                        valResult;
                    }
                },
                pasteEvent: function(e) {
                    var tempValue, input = this, ev = e.originalEvent || e, $input = $(input), inputValue = input.inputmask._valueGet(!0), caretPos = caret(input);
                    isRTL && (tempValue = caretPos.end, caretPos.end = caretPos.begin, caretPos.begin = tempValue);
                    var valueBeforeCaret = inputValue.substr(0, caretPos.begin), valueAfterCaret = inputValue.substr(caretPos.end, inputValue.length);
                    if (valueBeforeCaret === (isRTL ? getBufferTemplate().reverse() : getBufferTemplate()).slice(0, caretPos.begin).join("") && (valueBeforeCaret = ""), 
                    valueAfterCaret === (isRTL ? getBufferTemplate().reverse() : getBufferTemplate()).slice(caretPos.end).join("") && (valueAfterCaret = ""), 
                    isRTL && (tempValue = valueBeforeCaret, valueBeforeCaret = valueAfterCaret, valueAfterCaret = tempValue), 
                    window.clipboardData && window.clipboardData.getData) inputValue = valueBeforeCaret + window.clipboardData.getData("Text") + valueAfterCaret; else {
                        if (!ev.clipboardData || !ev.clipboardData.getData) return !0;
                        inputValue = valueBeforeCaret + ev.clipboardData.getData("text/plain") + valueAfterCaret;
                    }
                    var pasteValue = inputValue;
                    if ($.isFunction(opts.onBeforePaste)) {
                        if (!1 === (pasteValue = opts.onBeforePaste.call(inputmask, inputValue, opts))) return e.preventDefault();
                        pasteValue || (pasteValue = inputValue);
                    }
                    return checkVal(input, !1, !1, isRTL ? pasteValue.split("").reverse() : pasteValue.toString().split("")), 
                    writeBuffer(input, getBuffer(), seekNext(getLastValidPosition()), e, undoValue !== getBuffer().join("")), 
                    !0 === isComplete(getBuffer()) && $input.trigger("complete"), e.preventDefault();
                },
                inputFallBackEvent: function(e) {
                    var input = this, inputValue = input.inputmask._valueGet();
                    if (getBuffer().join("") !== inputValue) {
                        var caretPos = caret(input);
                        if (!1 === function(input, inputValue, caretPos) {
                            if ("." === inputValue.charAt(caretPos.begin - 1) && "" !== opts.radixPoint && ((inputValue = inputValue.split(""))[caretPos.begin - 1] = opts.radixPoint.charAt(0), 
                            inputValue = inputValue.join("")), inputValue.charAt(caretPos.begin - 1) === opts.radixPoint && inputValue.length > getBuffer().length) {
                                var keypress = new $.Event("keypress");
                                return keypress.which = opts.radixPoint.charCodeAt(0), EventHandlers.keypressEvent.call(input, keypress, !0, !0, !1, caretPos.begin - 1), 
                                !1;
                            }
                        }(input, inputValue, caretPos)) return !1;
                        if (inputValue = inputValue.replace(new RegExp("(" + Inputmask.escapeRegex(getBufferTemplate().join("")) + ")*"), ""), 
                        !1 === function(input, inputValue, caretPos) {
                            if (iemobile) {
                                var inputChar = inputValue.replace(getBuffer().join(""), "");
                                if (1 === inputChar.length) {
                                    var keypress = new $.Event("keypress");
                                    return keypress.which = inputChar.charCodeAt(0), EventHandlers.keypressEvent.call(input, keypress, !0, !0, !1, getMaskSet().validPositions[caretPos.begin - 1] ? caretPos.begin : caretPos.begin - 1), 
                                    !1;
                                }
                            }
                        }(input, inputValue, caretPos)) return !1;
                        caretPos.begin > inputValue.length && (caret(input, inputValue.length), caretPos = caret(input));
                        var buffer = getBuffer().join(""), frontPart = inputValue.substr(0, caretPos.begin), backPart = inputValue.substr(caretPos.begin), frontBufferPart = buffer.substr(0, caretPos.begin), backBufferPart = buffer.substr(caretPos.begin), selection = caretPos, entries = "", isEntry = !1;
                        if (frontPart !== frontBufferPart) {
                            selection.begin = 0;
                            for (var fpl = (isEntry = frontPart.length >= frontBufferPart.length) ? frontPart.length : frontBufferPart.length, i = 0; frontPart.charAt(i) === frontBufferPart.charAt(i) && i < fpl; i++) selection.begin++;
                            isEntry && (entries += frontPart.slice(selection.begin, selection.end));
                        }
                        backPart !== backBufferPart && (backPart.length > backBufferPart.length ? isEntry && (selection.end = selection.begin) : backPart.length < backBufferPart.length ? selection.end += backBufferPart.length - backPart.length : backPart.charAt(0) !== backBufferPart.charAt(0) && selection.end++), 
                        writeBuffer(input, getBuffer(), selection), entries.length > 0 ? $.each(entries.split(""), function(ndx, entry) {
                            var keypress = new $.Event("keypress");
                            keypress.which = entry.charCodeAt(0), ignorable = !1, EventHandlers.keypressEvent.call(input, keypress);
                        }) : (selection.begin === selection.end - 1 && caret(input, seekPrevious(selection.begin + 1), selection.end), 
                        e.keyCode = Inputmask.keyCode.DELETE, EventHandlers.keydownEvent.call(input, e)), 
                        e.preventDefault();
                    }
                },
                setValueEvent: function(e) {
                    this.inputmask.refreshValue = !1;
                    var input = this, value = input.inputmask._valueGet(!0);
                    $.isFunction(opts.onBeforeMask) && (value = opts.onBeforeMask.call(inputmask, value, opts) || value), 
                    value = value.split(""), checkVal(input, !0, !1, isRTL ? value.reverse() : value), 
                    undoValue = getBuffer().join(""), (opts.clearMaskOnLostFocus || opts.clearIncomplete) && input.inputmask._valueGet() === getBufferTemplate().join("") && input.inputmask._valueSet("");
                },
                focusEvent: function(e) {
                    var input = this, nptValue = input.inputmask._valueGet();
                    opts.showMaskOnFocus && (!opts.showMaskOnHover || opts.showMaskOnHover && "" === nptValue) && (input.inputmask._valueGet() !== getBuffer().join("") ? writeBuffer(input, getBuffer(), seekNext(getLastValidPosition())) : !1 === mouseEnter && caret(input, seekNext(getLastValidPosition()))), 
                    !0 === opts.positionCaretOnTab && !1 === mouseEnter && "" !== nptValue && (writeBuffer(input, getBuffer(), caret(input)), 
                    EventHandlers.clickEvent.apply(input, [ e, !0 ])), undoValue = getBuffer().join("");
                },
                mouseleaveEvent: function(e) {
                    var input = this;
                    if (mouseEnter = !1, opts.clearMaskOnLostFocus && document.activeElement !== input) {
                        var buffer = getBuffer().slice(), nptValue = input.inputmask._valueGet();
                        nptValue !== input.getAttribute("placeholder") && "" !== nptValue && (-1 === getLastValidPosition() && nptValue === getBufferTemplate().join("") ? buffer = [] : clearOptionalTail(buffer), 
                        writeBuffer(input, buffer));
                    }
                },
                clickEvent: function(e, tabbed) {
                    function doRadixFocus(clickPos) {
                        if ("" !== opts.radixPoint) {
                            var vps = getMaskSet().validPositions;
                            if (vps[clickPos] === undefined || vps[clickPos].input === getPlaceholder(clickPos)) {
                                if (clickPos < seekNext(-1)) return !0;
                                var radixPos = $.inArray(opts.radixPoint, getBuffer());
                                if (-1 !== radixPos) {
                                    for (var vp in vps) if (radixPos < vp && vps[vp].input !== getPlaceholder(vp)) return !1;
                                    return !0;
                                }
                            }
                        }
                        return !1;
                    }
                    var input = this;
                    setTimeout(function() {
                        if (document.activeElement === input) {
                            var selectedCaret = caret(input);
                            if (tabbed && (isRTL ? selectedCaret.end = selectedCaret.begin : selectedCaret.begin = selectedCaret.end), 
                            selectedCaret.begin === selectedCaret.end) switch (opts.positionCaretOnClick) {
                              case "none":
                                break;

                              case "radixFocus":
                                if (doRadixFocus(selectedCaret.begin)) {
                                    var radixPos = getBuffer().join("").indexOf(opts.radixPoint);
                                    caret(input, opts.numericInput ? seekNext(radixPos) : radixPos);
                                    break;
                                }

                              default:
                                var clickPosition = selectedCaret.begin, lvclickPosition = getLastValidPosition(clickPosition, !0), lastPosition = seekNext(lvclickPosition);
                                if (clickPosition < lastPosition) caret(input, isMask(clickPosition, !0) || isMask(clickPosition - 1, !0) ? clickPosition : seekNext(clickPosition)); else {
                                    var lvp = getMaskSet().validPositions[lvclickPosition], tt = getTestTemplate(lastPosition, lvp ? lvp.match.locator : undefined, lvp), placeholder = getPlaceholder(lastPosition, tt.match);
                                    if ("" !== placeholder && getBuffer()[lastPosition] !== placeholder && !0 !== tt.match.optionalQuantifier && !0 !== tt.match.newBlockMarker || !isMask(lastPosition, !0) && tt.match.def === placeholder) {
                                        var newPos = seekNext(lastPosition);
                                        (clickPosition >= newPos || clickPosition === lastPosition) && (lastPosition = newPos);
                                    }
                                    caret(input, lastPosition);
                                }
                            }
                        }
                    }, 0);
                },
                dblclickEvent: function(e) {
                    var input = this;
                    setTimeout(function() {
                        caret(input, 0, seekNext(getLastValidPosition()));
                    }, 0);
                },
                cutEvent: function(e) {
                    var input = this, $input = $(input), pos = caret(input), ev = e.originalEvent || e, clipboardData = window.clipboardData || ev.clipboardData, clipData = isRTL ? getBuffer().slice(pos.end, pos.begin) : getBuffer().slice(pos.begin, pos.end);
                    clipboardData.setData("text", isRTL ? clipData.reverse().join("") : clipData.join("")), 
                    document.execCommand && document.execCommand("copy"), handleRemove(input, Inputmask.keyCode.DELETE, pos), 
                    writeBuffer(input, getBuffer(), getMaskSet().p, e, undoValue !== getBuffer().join("")), 
                    input.inputmask._valueGet() === getBufferTemplate().join("") && $input.trigger("cleared");
                },
                blurEvent: function(e) {
                    var $input = $(this), input = this;
                    if (input.inputmask) {
                        var nptValue = input.inputmask._valueGet(), buffer = getBuffer().slice();
                        "" !== nptValue && (opts.clearMaskOnLostFocus && (-1 === getLastValidPosition() && nptValue === getBufferTemplate().join("") ? buffer = [] : clearOptionalTail(buffer)), 
                        !1 === isComplete(buffer) && (setTimeout(function() {
                            $input.trigger("incomplete");
                        }, 0), opts.clearIncomplete && (resetMaskSet(), buffer = opts.clearMaskOnLostFocus ? [] : getBufferTemplate().slice())), 
                        writeBuffer(input, buffer, undefined, e)), undoValue !== getBuffer().join("") && (undoValue = buffer.join(""), 
                        $input.trigger("change"));
                    }
                },
                mouseenterEvent: function(e) {
                    var input = this;
                    mouseEnter = !0, document.activeElement !== input && opts.showMaskOnHover && input.inputmask._valueGet() !== getBuffer().join("") && writeBuffer(input, getBuffer());
                },
                submitEvent: function(e) {
                    undoValue !== getBuffer().join("") && $el.trigger("change"), opts.clearMaskOnLostFocus && -1 === getLastValidPosition() && el.inputmask._valueGet && el.inputmask._valueGet() === getBufferTemplate().join("") && el.inputmask._valueSet(""), 
                    opts.removeMaskOnSubmit && (el.inputmask._valueSet(el.inputmask.unmaskedvalue(), !0), 
                    setTimeout(function() {
                        writeBuffer(el, getBuffer());
                    }, 0));
                },
                resetEvent: function(e) {
                    el.inputmask.refreshValue = !0, setTimeout(function() {
                        $el.trigger("setvalue");
                    }, 0);
                }
            };
            Inputmask.prototype.positionColorMask = function(input, template) {
                input.style.left = template.offsetLeft + "px";
            };
            var valueBuffer;
            if (actionObj !== undefined) switch (actionObj.action) {
              case "isComplete":
                return el = actionObj.el, isComplete(getBuffer());

              case "unmaskedvalue":
                return el !== undefined && actionObj.value === undefined || (valueBuffer = actionObj.value, 
                valueBuffer = ($.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(inputmask, valueBuffer, opts) || valueBuffer : valueBuffer).split(""), 
                checkVal(undefined, !1, !1, isRTL ? valueBuffer.reverse() : valueBuffer), $.isFunction(opts.onBeforeWrite) && opts.onBeforeWrite.call(inputmask, undefined, getBuffer(), 0, opts)), 
                unmaskedvalue(el);

              case "mask":
                !function(elem) {
                    EventRuler.off(elem);
                    var isSupported = function(input, opts) {
                        var elementType = input.getAttribute("type"), isSupported = "INPUT" === input.tagName && -1 !== $.inArray(elementType, opts.supportsInputType) || input.isContentEditable || "TEXTAREA" === input.tagName;
                        if (!isSupported) if ("INPUT" === input.tagName) {
                            var el = document.createElement("input");
                            el.setAttribute("type", elementType), isSupported = "text" === el.type, el = null;
                        } else isSupported = "partial";
                        return !1 !== isSupported ? function(npt) {
                            function getter() {
                                return this.inputmask ? this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : -1 !== getLastValidPosition() || !0 !== opts.nullable ? document.activeElement === this && opts.clearMaskOnLostFocus ? (isRTL ? clearOptionalTail(getBuffer().slice()).reverse() : clearOptionalTail(getBuffer().slice())).join("") : valueGet.call(this) : "" : valueGet.call(this);
                            }
                            function setter(value) {
                                valueSet.call(this, value), this.inputmask && $(this).trigger("setvalue");
                            }
                            var valueGet, valueSet;
                            if (!npt.inputmask.__valueGet) {
                                if (!0 !== opts.noValuePatching) {
                                    if (Object.getOwnPropertyDescriptor) {
                                        "function" != typeof Object.getPrototypeOf && (Object.getPrototypeOf = "object" === _typeof("test".__proto__) ? function(object) {
                                            return object.__proto__;
                                        } : function(object) {
                                            return object.constructor.prototype;
                                        });
                                        var valueProperty = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(npt), "value") : undefined;
                                        valueProperty && valueProperty.get && valueProperty.set ? (valueGet = valueProperty.get, 
                                        valueSet = valueProperty.set, Object.defineProperty(npt, "value", {
                                            get: getter,
                                            set: setter,
                                            configurable: !0
                                        })) : "INPUT" !== npt.tagName && (valueGet = function() {
                                            return this.textContent;
                                        }, valueSet = function(value) {
                                            this.textContent = value;
                                        }, Object.defineProperty(npt, "value", {
                                            get: getter,
                                            set: setter,
                                            configurable: !0
                                        }));
                                    } else document.__lookupGetter__ && npt.__lookupGetter__("value") && (valueGet = npt.__lookupGetter__("value"), 
                                    valueSet = npt.__lookupSetter__("value"), npt.__defineGetter__("value", getter), 
                                    npt.__defineSetter__("value", setter));
                                    npt.inputmask.__valueGet = valueGet, npt.inputmask.__valueSet = valueSet;
                                }
                                npt.inputmask._valueGet = function(overruleRTL) {
                                    return isRTL && !0 !== overruleRTL ? valueGet.call(this.el).split("").reverse().join("") : valueGet.call(this.el);
                                }, npt.inputmask._valueSet = function(value, overruleRTL) {
                                    valueSet.call(this.el, null === value || value === undefined ? "" : !0 !== overruleRTL && isRTL ? value.split("").reverse().join("") : value);
                                }, valueGet === undefined && (valueGet = function() {
                                    return this.value;
                                }, valueSet = function(value) {
                                    this.value = value;
                                }, function(type) {
                                    if ($.valHooks && ($.valHooks[type] === undefined || !0 !== $.valHooks[type].inputmaskpatch)) {
                                        var valhookGet = $.valHooks[type] && $.valHooks[type].get ? $.valHooks[type].get : function(elem) {
                                            return elem.value;
                                        }, valhookSet = $.valHooks[type] && $.valHooks[type].set ? $.valHooks[type].set : function(elem, value) {
                                            return elem.value = value, elem;
                                        };
                                        $.valHooks[type] = {
                                            get: function(elem) {
                                                if (elem.inputmask) {
                                                    if (elem.inputmask.opts.autoUnmask) return elem.inputmask.unmaskedvalue();
                                                    var result = valhookGet(elem);
                                                    return -1 !== getLastValidPosition(undefined, undefined, elem.inputmask.maskset.validPositions) || !0 !== opts.nullable ? result : "";
                                                }
                                                return valhookGet(elem);
                                            },
                                            set: function(elem, value) {
                                                var result, $elem = $(elem);
                                                return result = valhookSet(elem, value), elem.inputmask && $elem.trigger("setvalue"), 
                                                result;
                                            },
                                            inputmaskpatch: !0
                                        };
                                    }
                                }(npt.type), function(npt) {
                                    EventRuler.on(npt, "mouseenter", function(event) {
                                        var $input = $(this);
                                        this.inputmask._valueGet() !== getBuffer().join("") && $input.trigger("setvalue");
                                    });
                                }(npt));
                            }
                        }(input) : input.inputmask = undefined, isSupported;
                    }(elem, opts);
                    if (!1 !== isSupported && (el = elem, $el = $(el), -1 === (maxLength = el !== undefined ? el.maxLength : undefined) && (maxLength = undefined), 
                    !0 === opts.colorMask && initializeColorMask(el), android && (el.hasOwnProperty("inputmode") && (el.inputmode = opts.inputmode, 
                    el.setAttribute("inputmode", opts.inputmode)), "rtfm" === opts.androidHack && (!0 !== opts.colorMask && initializeColorMask(el), 
                    el.type = "password")), !0 === isSupported && (EventRuler.on(el, "submit", EventHandlers.submitEvent), 
                    EventRuler.on(el, "reset", EventHandlers.resetEvent), EventRuler.on(el, "mouseenter", EventHandlers.mouseenterEvent), 
                    EventRuler.on(el, "blur", EventHandlers.blurEvent), EventRuler.on(el, "focus", EventHandlers.focusEvent), 
                    EventRuler.on(el, "mouseleave", EventHandlers.mouseleaveEvent), !0 !== opts.colorMask && EventRuler.on(el, "click", EventHandlers.clickEvent), 
                    EventRuler.on(el, "dblclick", EventHandlers.dblclickEvent), EventRuler.on(el, "paste", EventHandlers.pasteEvent), 
                    EventRuler.on(el, "dragdrop", EventHandlers.pasteEvent), EventRuler.on(el, "drop", EventHandlers.pasteEvent), 
                    EventRuler.on(el, "cut", EventHandlers.cutEvent), EventRuler.on(el, "complete", opts.oncomplete), 
                    EventRuler.on(el, "incomplete", opts.onincomplete), EventRuler.on(el, "cleared", opts.oncleared), 
                    android || !0 === opts.inputEventOnly ? el.removeAttribute("maxLength") : (EventRuler.on(el, "keydown", EventHandlers.keydownEvent), 
                    EventRuler.on(el, "keypress", EventHandlers.keypressEvent)), EventRuler.on(el, "compositionstart", $.noop), 
                    EventRuler.on(el, "compositionupdate", $.noop), EventRuler.on(el, "compositionend", $.noop), 
                    EventRuler.on(el, "keyup", $.noop), EventRuler.on(el, "input", EventHandlers.inputFallBackEvent), 
                    EventRuler.on(el, "beforeinput", $.noop)), EventRuler.on(el, "setvalue", EventHandlers.setValueEvent), 
                    undoValue = getBufferTemplate().join(""), "" !== el.inputmask._valueGet(!0) || !1 === opts.clearMaskOnLostFocus || document.activeElement === el)) {
                        var initialValue = $.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(inputmask, el.inputmask._valueGet(!0), opts) || el.inputmask._valueGet(!0) : el.inputmask._valueGet(!0);
                        "" !== initialValue && checkVal(el, !0, !1, isRTL ? initialValue.split("").reverse() : initialValue.split(""));
                        var buffer = getBuffer().slice();
                        undoValue = buffer.join(""), !1 === isComplete(buffer) && opts.clearIncomplete && resetMaskSet(), 
                        opts.clearMaskOnLostFocus && document.activeElement !== el && (-1 === getLastValidPosition() ? buffer = [] : clearOptionalTail(buffer)), 
                        writeBuffer(el, buffer), document.activeElement === el && caret(el, seekNext(getLastValidPosition()));
                    }
                }(el);
                break;

              case "format":
                return valueBuffer = ($.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(inputmask, actionObj.value, opts) || actionObj.value : actionObj.value).split(""), 
                checkVal(undefined, !0, !1, isRTL ? valueBuffer.reverse() : valueBuffer), actionObj.metadata ? {
                    value: isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join(""),
                    metadata: maskScope.call(this, {
                        action: "getmetadata"
                    }, maskset, opts)
                } : isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join("");

              case "isValid":
                actionObj.value ? (valueBuffer = actionObj.value.split(""), checkVal(undefined, !0, !0, isRTL ? valueBuffer.reverse() : valueBuffer)) : actionObj.value = getBuffer().join("");
                for (var buffer = getBuffer(), rl = determineLastRequiredPosition(), lmib = buffer.length - 1; lmib > rl && !isMask(lmib); lmib--) ;
                return buffer.splice(rl, lmib + 1 - rl), isComplete(buffer) && actionObj.value === getBuffer().join("");

              case "getemptymask":
                return getBufferTemplate().join("");

              case "remove":
                if (el && el.inputmask) {
                    $el = $(el), el.inputmask._valueSet(opts.autoUnmask ? unmaskedvalue(el) : el.inputmask._valueGet(!0)), 
                    EventRuler.off(el);
                    Object.getOwnPropertyDescriptor && Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), "value") && el.inputmask.__valueGet && Object.defineProperty(el, "value", {
                        get: el.inputmask.__valueGet,
                        set: el.inputmask.__valueSet,
                        configurable: !0
                    }) : document.__lookupGetter__ && el.__lookupGetter__("value") && el.inputmask.__valueGet && (el.__defineGetter__("value", el.inputmask.__valueGet), 
                    el.__defineSetter__("value", el.inputmask.__valueSet)), el.inputmask = undefined;
                }
                return el;

              case "getmetadata":
                if ($.isArray(maskset.metadata)) {
                    var maskTarget = getMaskTemplate(!0, 0, !1).join("");
                    return $.each(maskset.metadata, function(ndx, mtdt) {
                        if (mtdt.mask === maskTarget) return maskTarget = mtdt, !1;
                    }), maskTarget;
                }
                return maskset.metadata;
            }
        }
        var ua = navigator.userAgent, mobile = /mobile/i.test(ua), iemobile = /iemobile/i.test(ua), iphone = /iphone/i.test(ua) && !iemobile, android = /android/i.test(ua) && !iemobile;
        return Inputmask.prototype = {
            dataAttribute: "data-inputmask",
            defaults: {
                placeholder: "_",
                optionalmarker: {
                    start: "[",
                    end: "]"
                },
                quantifiermarker: {
                    start: "{",
                    end: "}"
                },
                groupmarker: {
                    start: "(",
                    end: ")"
                },
                alternatormarker: "|",
                escapeChar: "\\",
                mask: null,
                regex: null,
                oncomplete: $.noop,
                onincomplete: $.noop,
                oncleared: $.noop,
                repeat: 0,
                greedy: !0,
                autoUnmask: !1,
                removeMaskOnSubmit: !1,
                clearMaskOnLostFocus: !0,
                insertMode: !0,
                clearIncomplete: !1,
                alias: null,
                onKeyDown: $.noop,
                onBeforeMask: null,
                onBeforePaste: function(pastedValue, opts) {
                    return $.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(this, pastedValue, opts) : pastedValue;
                },
                onBeforeWrite: null,
                onUnMask: null,
                showMaskOnFocus: !0,
                showMaskOnHover: !0,
                onKeyValidation: $.noop,
                skipOptionalPartCharacter: " ",
                numericInput: !1,
                rightAlign: !1,
                undoOnEscape: !0,
                radixPoint: "",
                radixPointDefinitionSymbol: undefined,
                groupSeparator: "",
                keepStatic: null,
                positionCaretOnTab: !0,
                tabThrough: !1,
                supportsInputType: [ "text", "tel", "password" ],
                ignorables: [ 8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 0, 229 ],
                isComplete: null,
                canClearPosition: $.noop,
                preValidation: null,
                postValidation: null,
                staticDefinitionSymbol: undefined,
                jitMasking: !1,
                nullable: !0,
                inputEventOnly: !1,
                noValuePatching: !1,
                positionCaretOnClick: "lvp",
                casing: null,
                inputmode: "verbatim",
                colorMask: !1,
                androidHack: !1,
                importDataAttributes: !0
            },
            definitions: {
                "9": {
                    validator: "[0-9１-９]",
                    cardinality: 1,
                    definitionSymbol: "*"
                },
                a: {
                    validator: "[A-Za-zА-яЁёÀ-ÿµ]",
                    cardinality: 1,
                    definitionSymbol: "*"
                },
                "*": {
                    validator: "[0-9１-９A-Za-zА-яЁёÀ-ÿµ]",
                    cardinality: 1
                }
            },
            aliases: {},
            masksCache: {},
            mask: function(elems) {
                function importAttributeOptions(npt, opts, userOptions, dataAttribute) {
                    if (!0 === opts.importDataAttributes) {
                        var option, dataoptions, optionData, p, importOption = function(option, optionData) {
                            null !== (optionData = optionData !== undefined ? optionData : npt.getAttribute(dataAttribute + "-" + option)) && ("string" == typeof optionData && (0 === option.indexOf("on") ? optionData = window[optionData] : "false" === optionData ? optionData = !1 : "true" === optionData && (optionData = !0)), 
                            userOptions[option] = optionData);
                        }, attrOptions = npt.getAttribute(dataAttribute);
                        if (attrOptions && "" !== attrOptions && (attrOptions = attrOptions.replace(new RegExp("'", "g"), '"'), 
                        dataoptions = JSON.parse("{" + attrOptions + "}")), dataoptions) {
                            optionData = undefined;
                            for (p in dataoptions) if ("alias" === p.toLowerCase()) {
                                optionData = dataoptions[p];
                                break;
                            }
                        }
                        importOption("alias", optionData), userOptions.alias && resolveAlias(userOptions.alias, userOptions, opts);
                        for (option in opts) {
                            if (dataoptions) {
                                optionData = undefined;
                                for (p in dataoptions) if (p.toLowerCase() === option.toLowerCase()) {
                                    optionData = dataoptions[p];
                                    break;
                                }
                            }
                            importOption(option, optionData);
                        }
                    }
                    return $.extend(!0, opts, userOptions), ("rtl" === npt.dir || opts.rightAlign) && (npt.style.textAlign = "right"), 
                    ("rtl" === npt.dir || opts.numericInput) && (npt.dir = "ltr", npt.removeAttribute("dir"), 
                    opts.isRTL = !0), opts;
                }
                var that = this;
                return "string" == typeof elems && (elems = document.getElementById(elems) || document.querySelectorAll(elems)), 
                elems = elems.nodeName ? [ elems ] : elems, $.each(elems, function(ndx, el) {
                    var scopedOpts = $.extend(!0, {}, that.opts);
                    importAttributeOptions(el, scopedOpts, $.extend(!0, {}, that.userOptions), that.dataAttribute);
                    var maskset = generateMaskSet(scopedOpts, that.noMasksCache);
                    maskset !== undefined && (el.inputmask !== undefined && (el.inputmask.opts.autoUnmask = !0, 
                    el.inputmask.remove()), el.inputmask = new Inputmask(undefined, undefined, !0), 
                    el.inputmask.opts = scopedOpts, el.inputmask.noMasksCache = that.noMasksCache, el.inputmask.userOptions = $.extend(!0, {}, that.userOptions), 
                    el.inputmask.isRTL = scopedOpts.isRTL || scopedOpts.numericInput, el.inputmask.el = el, 
                    el.inputmask.maskset = maskset, $.data(el, "_inputmask_opts", scopedOpts), maskScope.call(el.inputmask, {
                        action: "mask"
                    }));
                }), elems && elems[0] ? elems[0].inputmask || this : this;
            },
            option: function(options, noremask) {
                return "string" == typeof options ? this.opts[options] : "object" === (void 0 === options ? "undefined" : _typeof(options)) ? ($.extend(this.userOptions, options), 
                this.el && !0 !== noremask && this.mask(this.el), this) : void 0;
            },
            unmaskedvalue: function(value) {
                return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), 
                maskScope.call(this, {
                    action: "unmaskedvalue",
                    value: value
                });
            },
            remove: function() {
                return maskScope.call(this, {
                    action: "remove"
                });
            },
            getemptymask: function() {
                return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), 
                maskScope.call(this, {
                    action: "getemptymask"
                });
            },
            hasMaskedValue: function() {
                return !this.opts.autoUnmask;
            },
            isComplete: function() {
                return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), 
                maskScope.call(this, {
                    action: "isComplete"
                });
            },
            getmetadata: function() {
                return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), 
                maskScope.call(this, {
                    action: "getmetadata"
                });
            },
            isValid: function(value) {
                return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), 
                maskScope.call(this, {
                    action: "isValid",
                    value: value
                });
            },
            format: function(value, metadata) {
                return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), 
                maskScope.call(this, {
                    action: "format",
                    value: value,
                    metadata: metadata
                });
            },
            analyseMask: function(mask, regexMask, opts) {
                function MaskToken(isGroup, isOptional, isQuantifier, isAlternator) {
                    this.matches = [], this.openGroup = isGroup || !1, this.alternatorGroup = !1, this.isGroup = isGroup || !1, 
                    this.isOptional = isOptional || !1, this.isQuantifier = isQuantifier || !1, this.isAlternator = isAlternator || !1, 
                    this.quantifier = {
                        min: 1,
                        max: 1
                    };
                }
                function insertTestDefinition(mtoken, element, position) {
                    position = position !== undefined ? position : mtoken.matches.length;
                    var prevMatch = mtoken.matches[position - 1];
                    if (regexMask) 0 === element.indexOf("[") || escaped && /\\d|\\s|\\w]/i.test(element) || "." === element ? mtoken.matches.splice(position++, 0, {
                        fn: new RegExp(element, opts.casing ? "i" : ""),
                        cardinality: 1,
                        optionality: mtoken.isOptional,
                        newBlockMarker: prevMatch === undefined || prevMatch.def !== element,
                        casing: null,
                        def: element,
                        placeholder: undefined,
                        nativeDef: element
                    }) : (escaped && (element = element[element.length - 1]), $.each(element.split(""), function(ndx, lmnt) {
                        prevMatch = mtoken.matches[position - 1], mtoken.matches.splice(position++, 0, {
                            fn: null,
                            cardinality: 0,
                            optionality: mtoken.isOptional,
                            newBlockMarker: prevMatch === undefined || prevMatch.def !== lmnt && null !== prevMatch.fn,
                            casing: null,
                            def: opts.staticDefinitionSymbol || lmnt,
                            placeholder: opts.staticDefinitionSymbol !== undefined ? lmnt : undefined,
                            nativeDef: lmnt
                        });
                    })), escaped = !1; else {
                        var maskdef = (opts.definitions ? opts.definitions[element] : undefined) || Inputmask.prototype.definitions[element];
                        if (maskdef && !escaped) {
                            for (var prevalidators = maskdef.prevalidator, prevalidatorsL = prevalidators ? prevalidators.length : 0, i = 1; i < maskdef.cardinality; i++) {
                                var prevalidator = prevalidatorsL >= i ? prevalidators[i - 1] : [], validator = prevalidator.validator, cardinality = prevalidator.cardinality;
                                mtoken.matches.splice(position++, 0, {
                                    fn: validator ? "string" == typeof validator ? new RegExp(validator, opts.casing ? "i" : "") : new function() {
                                        this.test = validator;
                                    }() : new RegExp("."),
                                    cardinality: cardinality || 1,
                                    optionality: mtoken.isOptional,
                                    newBlockMarker: prevMatch === undefined || prevMatch.def !== (maskdef.definitionSymbol || element),
                                    casing: maskdef.casing,
                                    def: maskdef.definitionSymbol || element,
                                    placeholder: maskdef.placeholder,
                                    nativeDef: element
                                }), prevMatch = mtoken.matches[position - 1];
                            }
                            mtoken.matches.splice(position++, 0, {
                                fn: maskdef.validator ? "string" == typeof maskdef.validator ? new RegExp(maskdef.validator, opts.casing ? "i" : "") : new function() {
                                    this.test = maskdef.validator;
                                }() : new RegExp("."),
                                cardinality: maskdef.cardinality,
                                optionality: mtoken.isOptional,
                                newBlockMarker: prevMatch === undefined || prevMatch.def !== (maskdef.definitionSymbol || element),
                                casing: maskdef.casing,
                                def: maskdef.definitionSymbol || element,
                                placeholder: maskdef.placeholder,
                                nativeDef: element
                            });
                        } else mtoken.matches.splice(position++, 0, {
                            fn: null,
                            cardinality: 0,
                            optionality: mtoken.isOptional,
                            newBlockMarker: prevMatch === undefined || prevMatch.def !== element && null !== prevMatch.fn,
                            casing: null,
                            def: opts.staticDefinitionSymbol || element,
                            placeholder: opts.staticDefinitionSymbol !== undefined ? element : undefined,
                            nativeDef: element
                        }), escaped = !1;
                    }
                }
                function verifyGroupMarker(maskToken) {
                    maskToken && maskToken.matches && $.each(maskToken.matches, function(ndx, token) {
                        var nextToken = maskToken.matches[ndx + 1];
                        (nextToken === undefined || nextToken.matches === undefined || !1 === nextToken.isQuantifier) && token && token.isGroup && (token.isGroup = !1, 
                        regexMask || (insertTestDefinition(token, opts.groupmarker.start, 0), !0 !== token.openGroup && insertTestDefinition(token, opts.groupmarker.end))), 
                        verifyGroupMarker(token);
                    });
                }
                function defaultCase() {
                    if (openenings.length > 0) {
                        if (currentOpeningToken = openenings[openenings.length - 1], insertTestDefinition(currentOpeningToken, m), 
                        currentOpeningToken.isAlternator) {
                            alternator = openenings.pop();
                            for (var mndx = 0; mndx < alternator.matches.length; mndx++) alternator.matches[mndx].isGroup = !1;
                            openenings.length > 0 ? (currentOpeningToken = openenings[openenings.length - 1]).matches.push(alternator) : currentToken.matches.push(alternator);
                        }
                    } else insertTestDefinition(currentToken, m);
                }
                function reverseTokens(maskToken) {
                    maskToken.matches = maskToken.matches.reverse();
                    for (var match in maskToken.matches) if (maskToken.matches.hasOwnProperty(match)) {
                        var intMatch = parseInt(match);
                        if (maskToken.matches[match].isQuantifier && maskToken.matches[intMatch + 1] && maskToken.matches[intMatch + 1].isGroup) {
                            var qt = maskToken.matches[match];
                            maskToken.matches.splice(match, 1), maskToken.matches.splice(intMatch + 1, 0, qt);
                        }
                        maskToken.matches[match].matches !== undefined ? maskToken.matches[match] = reverseTokens(maskToken.matches[match]) : maskToken.matches[match] = function(st) {
                            return st === opts.optionalmarker.start ? st = opts.optionalmarker.end : st === opts.optionalmarker.end ? st = opts.optionalmarker.start : st === opts.groupmarker.start ? st = opts.groupmarker.end : st === opts.groupmarker.end && (st = opts.groupmarker.start), 
                            st;
                        }(maskToken.matches[match]);
                    }
                    return maskToken;
                }
                var match, m, openingToken, currentOpeningToken, alternator, lastMatch, groupToken, tokenizer = /(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?\})|[^.?*+^${[]()|\\]+|./g, regexTokenizer = /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g, escaped = !1, currentToken = new MaskToken(), openenings = [], maskTokens = [];
                for (regexMask && (opts.optionalmarker.start = undefined, opts.optionalmarker.end = undefined); match = regexMask ? regexTokenizer.exec(mask) : tokenizer.exec(mask); ) {
                    if (m = match[0], regexMask) switch (m.charAt(0)) {
                      case "?":
                        m = "{0,1}";
                        break;

                      case "+":
                      case "*":
                        m = "{" + m + "}";
                    }
                    if (escaped) defaultCase(); else switch (m.charAt(0)) {
                      case opts.escapeChar:
                        escaped = !0, regexMask && defaultCase();
                        break;

                      case opts.optionalmarker.end:
                      case opts.groupmarker.end:
                        if (openingToken = openenings.pop(), openingToken.openGroup = !1, openingToken !== undefined) if (openenings.length > 0) {
                            if ((currentOpeningToken = openenings[openenings.length - 1]).matches.push(openingToken), 
                            currentOpeningToken.isAlternator) {
                                alternator = openenings.pop();
                                for (var mndx = 0; mndx < alternator.matches.length; mndx++) alternator.matches[mndx].isGroup = !1, 
                                alternator.matches[mndx].alternatorGroup = !1;
                                openenings.length > 0 ? (currentOpeningToken = openenings[openenings.length - 1]).matches.push(alternator) : currentToken.matches.push(alternator);
                            }
                        } else currentToken.matches.push(openingToken); else defaultCase();
                        break;

                      case opts.optionalmarker.start:
                        openenings.push(new MaskToken(!1, !0));
                        break;

                      case opts.groupmarker.start:
                        openenings.push(new MaskToken(!0));
                        break;

                      case opts.quantifiermarker.start:
                        var quantifier = new MaskToken(!1, !1, !0), mq = (m = m.replace(/[{}]/g, "")).split(","), mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]), mq1 = 1 === mq.length ? mq0 : isNaN(mq[1]) ? mq[1] : parseInt(mq[1]);
                        if ("*" !== mq1 && "+" !== mq1 || (mq0 = "*" === mq1 ? 0 : 1), quantifier.quantifier = {
                            min: mq0,
                            max: mq1
                        }, openenings.length > 0) {
                            var matches = openenings[openenings.length - 1].matches;
                            (match = matches.pop()).isGroup || ((groupToken = new MaskToken(!0)).matches.push(match), 
                            match = groupToken), matches.push(match), matches.push(quantifier);
                        } else (match = currentToken.matches.pop()).isGroup || (regexMask && null === match.fn && "." === match.def && (match.fn = new RegExp(match.def, opts.casing ? "i" : "")), 
                        (groupToken = new MaskToken(!0)).matches.push(match), match = groupToken), currentToken.matches.push(match), 
                        currentToken.matches.push(quantifier);
                        break;

                      case opts.alternatormarker:
                        if (openenings.length > 0) {
                            var subToken = (currentOpeningToken = openenings[openenings.length - 1]).matches[currentOpeningToken.matches.length - 1];
                            lastMatch = currentOpeningToken.openGroup && (subToken.matches === undefined || !1 === subToken.isGroup && !1 === subToken.isAlternator) ? openenings.pop() : currentOpeningToken.matches.pop();
                        } else lastMatch = currentToken.matches.pop();
                        if (lastMatch.isAlternator) openenings.push(lastMatch); else if (lastMatch.alternatorGroup ? (alternator = openenings.pop(), 
                        lastMatch.alternatorGroup = !1) : alternator = new MaskToken(!1, !1, !1, !0), alternator.matches.push(lastMatch), 
                        openenings.push(alternator), lastMatch.openGroup) {
                            lastMatch.openGroup = !1;
                            var alternatorGroup = new MaskToken(!0);
                            alternatorGroup.alternatorGroup = !0, openenings.push(alternatorGroup);
                        }
                        break;

                      default:
                        defaultCase();
                    }
                }
                for (;openenings.length > 0; ) openingToken = openenings.pop(), currentToken.matches.push(openingToken);
                return currentToken.matches.length > 0 && (verifyGroupMarker(currentToken), maskTokens.push(currentToken)), 
                (opts.numericInput || opts.isRTL) && reverseTokens(maskTokens[0]), maskTokens;
            }
        }, Inputmask.extendDefaults = function(options) {
            $.extend(!0, Inputmask.prototype.defaults, options);
        }, Inputmask.extendDefinitions = function(definition) {
            $.extend(!0, Inputmask.prototype.definitions, definition);
        }, Inputmask.extendAliases = function(alias) {
            $.extend(!0, Inputmask.prototype.aliases, alias);
        }, Inputmask.format = function(value, options, metadata) {
            return Inputmask(options).format(value, metadata);
        }, Inputmask.unmask = function(value, options) {
            return Inputmask(options).unmaskedvalue(value);
        }, Inputmask.isValid = function(value, options) {
            return Inputmask(options).isValid(value);
        }, Inputmask.remove = function(elems) {
            $.each(elems, function(ndx, el) {
                el.inputmask && el.inputmask.remove();
            });
        }, Inputmask.escapeRegex = function(str) {
            var specials = [ "/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^" ];
            return str.replace(new RegExp("(\\" + specials.join("|\\") + ")", "gim"), "\\$1");
        }, Inputmask.keyCode = {
            ALT: 18,
            BACKSPACE: 8,
            BACKSPACE_SAFARI: 127,
            CAPS_LOCK: 20,
            COMMA: 188,
            COMMAND: 91,
            COMMAND_LEFT: 91,
            COMMAND_RIGHT: 93,
            CONTROL: 17,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            INSERT: 45,
            LEFT: 37,
            MENU: 93,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SHIFT: 16,
            SPACE: 32,
            TAB: 9,
            UP: 38,
            WINDOWS: 91,
            X: 88
        }, Inputmask;
    });
}, function(module, exports) {
    module.exports = jQuery;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    __webpack_require__(4), __webpack_require__(9), __webpack_require__(12), __webpack_require__(13), 
    __webpack_require__(14), __webpack_require__(15);
    var _inputmask2 = _interopRequireDefault(__webpack_require__(1)), _inputmask4 = _interopRequireDefault(__webpack_require__(0)), _jquery2 = _interopRequireDefault(__webpack_require__(2));
    _inputmask4.default === _jquery2.default && __webpack_require__(16), window.Inputmask = _inputmask2.default;
}, function(module, exports, __webpack_require__) {
    var content = __webpack_require__(5);
    "string" == typeof content && (content = [ [ module.i, content, "" ] ]);
    var options = {
        hmr: !0
    };
    options.transform = void 0;
    __webpack_require__(7)(content, options);
    content.locals && (module.exports = content.locals);
}, function(module, exports, __webpack_require__) {
    (module.exports = __webpack_require__(6)(void 0)).push([ module.i, "span.im-caret {\r\n    -webkit-animation: 1s blink step-end infinite;\r\n    animation: 1s blink step-end infinite;\r\n}\r\n\r\n@keyframes blink {\r\n    from, to {\r\n        border-right-color: black;\r\n    }\r\n    50% {\r\n        border-right-color: transparent;\r\n    }\r\n}\r\n\r\n@-webkit-keyframes blink {\r\n    from, to {\r\n        border-right-color: black;\r\n    }\r\n    50% {\r\n        border-right-color: transparent;\r\n    }\r\n}\r\n\r\nspan.im-static {\r\n    color: grey;\r\n}\r\n\r\ndiv.im-colormask {\r\n    display: inline-block;\r\n    border-style: inset;\r\n    border-width: 2px;\r\n    -webkit-appearance: textfield;\r\n    -moz-appearance: textfield;\r\n    appearance: textfield;\r\n}\r\n\r\ndiv.im-colormask > input {\r\n    position: absolute;\r\n    display: inline-block;\r\n    background-color: transparent;\r\n    color: transparent;\r\n    -webkit-appearance: caret;\r\n    -moz-appearance: caret;\r\n    appearance: caret;\r\n    border-style: none;\r\n    left: 0; /*calculated*/\r\n}\r\n\r\ndiv.im-colormask > input:focus {\r\n    outline: none;\r\n}\r\n\r\ndiv.im-colormask > input::-moz-selection{\r\n    background: none;\r\n}\r\n\r\ndiv.im-colormask > input::selection{\r\n    background: none;\r\n}\r\ndiv.im-colormask > input::-moz-selection{\r\n    background: none;\r\n}\r\n\r\ndiv.im-colormask > div {\r\n    color: black;\r\n    display: inline-block;\r\n    width: 100px; /*calculated*/\r\n}", "" ]);
}, function(module, exports) {
    function cssWithMappingToString(item, useSourceMap) {
        var content = item[1] || "", cssMapping = item[3];
        if (!cssMapping) return content;
        if (useSourceMap && "function" == typeof btoa) {
            var sourceMapping = toComment(cssMapping), sourceURLs = cssMapping.sources.map(function(source) {
                return "/*# sourceURL=" + cssMapping.sourceRoot + source + " */";
            });
            return [ content ].concat(sourceURLs).concat([ sourceMapping ]).join("\n");
        }
        return [ content ].join("\n");
    }
    function toComment(sourceMap) {
        return "/*# " + ("sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))))) + " */";
    }
    module.exports = function(useSourceMap) {
        var list = [];
        return list.toString = function() {
            return this.map(function(item) {
                var content = cssWithMappingToString(item, useSourceMap);
                return item[2] ? "@media " + item[2] + "{" + content + "}" : content;
            }).join("");
        }, list.i = function(modules, mediaQuery) {
            "string" == typeof modules && (modules = [ [ null, modules, "" ] ]);
            for (var alreadyImportedModules = {}, i = 0; i < this.length; i++) {
                var id = this[i][0];
                "number" == typeof id && (alreadyImportedModules[id] = !0);
            }
            for (i = 0; i < modules.length; i++) {
                var item = modules[i];
                "number" == typeof item[0] && alreadyImportedModules[item[0]] || (mediaQuery && !item[2] ? item[2] = mediaQuery : mediaQuery && (item[2] = "(" + item[2] + ") and (" + mediaQuery + ")"), 
                list.push(item));
            }
        }, list;
    };
}, function(module, exports, __webpack_require__) {
    function addStylesToDom(styles, options) {
        for (var i = 0; i < styles.length; i++) {
            var item = styles[i], domStyle = stylesInDom[item.id];
            if (domStyle) {
                domStyle.refs++;
                for (j = 0; j < domStyle.parts.length; j++) domStyle.parts[j](item.parts[j]);
                for (;j < item.parts.length; j++) domStyle.parts.push(addStyle(item.parts[j], options));
            } else {
                for (var parts = [], j = 0; j < item.parts.length; j++) parts.push(addStyle(item.parts[j], options));
                stylesInDom[item.id] = {
                    id: item.id,
                    refs: 1,
                    parts: parts
                };
            }
        }
    }
    function listToStyles(list, options) {
        for (var styles = [], newStyles = {}, i = 0; i < list.length; i++) {
            var item = list[i], id = options.base ? item[0] + options.base : item[0], part = {
                css: item[1],
                media: item[2],
                sourceMap: item[3]
            };
            newStyles[id] ? newStyles[id].parts.push(part) : styles.push(newStyles[id] = {
                id: id,
                parts: [ part ]
            });
        }
        return styles;
    }
    function insertStyleElement(options, style) {
        var target = getElement(options.insertInto);
        if (!target) throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
        var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];
        if ("top" === options.insertAt) lastStyleElementInsertedAtTop ? lastStyleElementInsertedAtTop.nextSibling ? target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling) : target.appendChild(style) : target.insertBefore(style, target.firstChild), 
        stylesInsertedAtTop.push(style); else if ("bottom" === options.insertAt) target.appendChild(style); else {
            if ("object" != typeof options.insertAt || !options.insertAt.before) throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
            var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
            target.insertBefore(style, nextSibling);
        }
    }
    function removeStyleElement(style) {
        if (null === style.parentNode) return !1;
        style.parentNode.removeChild(style);
        var idx = stylesInsertedAtTop.indexOf(style);
        idx >= 0 && stylesInsertedAtTop.splice(idx, 1);
    }
    function createStyleElement(options) {
        var style = document.createElement("style");
        return options.attrs.type = "text/css", addAttrs(style, options.attrs), insertStyleElement(options, style), 
        style;
    }
    function createLinkElement(options) {
        var link = document.createElement("link");
        return options.attrs.type = "text/css", options.attrs.rel = "stylesheet", addAttrs(link, options.attrs), 
        insertStyleElement(options, link), link;
    }
    function addAttrs(el, attrs) {
        Object.keys(attrs).forEach(function(key) {
            el.setAttribute(key, attrs[key]);
        });
    }
    function addStyle(obj, options) {
        var style, update, remove, result;
        if (options.transform && obj.css) {
            if (!(result = options.transform(obj.css))) return function() {};
            obj.css = result;
        }
        if (options.singleton) {
            var styleIndex = singletonCounter++;
            style = singleton || (singleton = createStyleElement(options)), update = applyToSingletonTag.bind(null, style, styleIndex, !1), 
            remove = applyToSingletonTag.bind(null, style, styleIndex, !0);
        } else obj.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (style = createLinkElement(options), 
        update = updateLink.bind(null, style, options), remove = function() {
            removeStyleElement(style), style.href && URL.revokeObjectURL(style.href);
        }) : (style = createStyleElement(options), update = applyToTag.bind(null, style), 
        remove = function() {
            removeStyleElement(style);
        });
        return update(obj), function(newObj) {
            if (newObj) {
                if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) return;
                update(obj = newObj);
            } else remove();
        };
    }
    function applyToSingletonTag(style, index, remove, obj) {
        var css = remove ? "" : obj.css;
        if (style.styleSheet) style.styleSheet.cssText = replaceText(index, css); else {
            var cssNode = document.createTextNode(css), childNodes = style.childNodes;
            childNodes[index] && style.removeChild(childNodes[index]), childNodes.length ? style.insertBefore(cssNode, childNodes[index]) : style.appendChild(cssNode);
        }
    }
    function applyToTag(style, obj) {
        var css = obj.css, media = obj.media;
        if (media && style.setAttribute("media", media), style.styleSheet) style.styleSheet.cssText = css; else {
            for (;style.firstChild; ) style.removeChild(style.firstChild);
            style.appendChild(document.createTextNode(css));
        }
    }
    function updateLink(link, options, obj) {
        var css = obj.css, sourceMap = obj.sourceMap, autoFixUrls = void 0 === options.convertToAbsoluteUrls && sourceMap;
        (options.convertToAbsoluteUrls || autoFixUrls) && (css = fixUrls(css)), sourceMap && (css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */");
        var blob = new Blob([ css ], {
            type: "text/css"
        }), oldSrc = link.href;
        link.href = URL.createObjectURL(blob), oldSrc && URL.revokeObjectURL(oldSrc);
    }
    var stylesInDom = {}, isOldIE = function(fn) {
        var memo;
        return function() {
            return void 0 === memo && (memo = fn.apply(this, arguments)), memo;
        };
    }(function() {
        return window && document && document.all && !window.atob;
    }), getElement = function(fn) {
        var memo = {};
        return function(selector) {
            if (void 0 === memo[selector]) {
                var styleTarget = fn.call(this, selector);
                if (styleTarget instanceof window.HTMLIFrameElement) try {
                    styleTarget = styleTarget.contentDocument.head;
                } catch (e) {
                    styleTarget = null;
                }
                memo[selector] = styleTarget;
            }
            return memo[selector];
        };
    }(function(target) {
        return document.querySelector(target);
    }), singleton = null, singletonCounter = 0, stylesInsertedAtTop = [], fixUrls = __webpack_require__(8);
    module.exports = function(list, options) {
        if ("undefined" != typeof DEBUG && DEBUG && "object" != typeof document) throw new Error("The style-loader cannot be used in a non-browser environment");
        (options = options || {}).attrs = "object" == typeof options.attrs ? options.attrs : {}, 
        options.singleton || (options.singleton = isOldIE()), options.insertInto || (options.insertInto = "head"), 
        options.insertAt || (options.insertAt = "bottom");
        var styles = listToStyles(list, options);
        return addStylesToDom(styles, options), function(newList) {
            for (var mayRemove = [], i = 0; i < styles.length; i++) {
                var item = styles[i];
                (domStyle = stylesInDom[item.id]).refs--, mayRemove.push(domStyle);
            }
            newList && addStylesToDom(listToStyles(newList, options), options);
            for (i = 0; i < mayRemove.length; i++) {
                var domStyle = mayRemove[i];
                if (0 === domStyle.refs) {
                    for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();
                    delete stylesInDom[domStyle.id];
                }
            }
        };
    };
    var replaceText = function() {
        var textStore = [];
        return function(index, replacement) {
            return textStore[index] = replacement, textStore.filter(Boolean).join("\n");
        };
    }();
}, function(module, exports) {
    module.exports = function(css) {
        var location = "undefined" != typeof window && window.location;
        if (!location) throw new Error("fixUrls requires window.location");
        if (!css || "string" != typeof css) return css;
        var baseUrl = location.protocol + "//" + location.host, currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");
        return css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
            var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function(o, $1) {
                return $1;
            }).replace(/^'(.*)'$/, function(o, $1) {
                return $1;
            });
            if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) return fullMatch;
            var newUrl;
            return newUrl = 0 === unquotedOrigUrl.indexOf("//") ? unquotedOrigUrl : 0 === unquotedOrigUrl.indexOf("/") ? baseUrl + unquotedOrigUrl : currentDir + unquotedOrigUrl.replace(/^\.\//, ""), 
            "url(" + JSON.stringify(newUrl) + ")";
        });
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    "function" == typeof Symbol && Symbol.iterator;
    !function(factory) {
        __WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(0), __webpack_require__(1) ], 
        void 0 !== (__WEBPACK_AMD_DEFINE_RESULT__ = "function" == typeof (__WEBPACK_AMD_DEFINE_FACTORY__ = factory) ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__) && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__);
    }(function($, Inputmask) {
        function isLeapYear(year) {
            return isNaN(year) || 29 === new Date(year, 2, 0).getDate();
        }
        return Inputmask.extendAliases({
            "dd/mm/yyyy": {
                mask: "1/2/y",
                placeholder: "dd/mm/yyyy",
                regex: {
                    val1pre: new RegExp("[0-3]"),
                    val1: new RegExp("0[1-9]|[12][0-9]|3[01]"),
                    val2pre: function(separator) {
                        var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                        return new RegExp("((0[1-9]|[12][0-9]|3[01])" + escapedSeparator + "[01])");
                    },
                    val2: function(separator) {
                        var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                        return new RegExp("((0[1-9]|[12][0-9])" + escapedSeparator + "(0[1-9]|1[012]))|(30" + escapedSeparator + "(0[13-9]|1[012]))|(31" + escapedSeparator + "(0[13578]|1[02]))");
                    }
                },
                leapday: "29/02/",
                separator: "/",
                yearrange: {
                    minyear: 1900,
                    maxyear: 2099
                },
                isInYearRange: function(chrs, minyear, maxyear) {
                    if (isNaN(chrs)) return !1;
                    var enteredyear = parseInt(chrs.concat(minyear.toString().slice(chrs.length))), enteredyear2 = parseInt(chrs.concat(maxyear.toString().slice(chrs.length)));
                    return !isNaN(enteredyear) && (minyear <= enteredyear && enteredyear <= maxyear) || !isNaN(enteredyear2) && (minyear <= enteredyear2 && enteredyear2 <= maxyear);
                },
                determinebaseyear: function(minyear, maxyear, hint) {
                    var currentyear = new Date().getFullYear();
                    if (minyear > currentyear) return minyear;
                    if (maxyear < currentyear) {
                        for (var maxYearPrefix = maxyear.toString().slice(0, 2), maxYearPostfix = maxyear.toString().slice(2, 4); maxyear < maxYearPrefix + hint; ) maxYearPrefix--;
                        var maxxYear = maxYearPrefix + maxYearPostfix;
                        return minyear > maxxYear ? minyear : maxxYear;
                    }
                    if (minyear <= currentyear && currentyear <= maxyear) {
                        for (var currentYearPrefix = currentyear.toString().slice(0, 2); maxyear < currentYearPrefix + hint; ) currentYearPrefix--;
                        var currentYearAndHint = currentYearPrefix + hint;
                        return currentYearAndHint < minyear ? minyear : currentYearAndHint;
                    }
                    return currentyear;
                },
                onKeyDown: function(e, buffer, caretPos, opts) {
                    var $input = $(this);
                    if (e.ctrlKey && e.keyCode === Inputmask.keyCode.RIGHT) {
                        var today = new Date();
                        $input.val(today.getDate().toString() + (today.getMonth() + 1).toString() + today.getFullYear().toString()), 
                        $input.trigger("setvalue");
                    }
                },
                getFrontValue: function(mask, buffer, opts) {
                    for (var start = 0, length = 0, i = 0; i < mask.length && "2" !== mask.charAt(i); i++) {
                        var definition = opts.definitions[mask.charAt(i)];
                        definition ? (start += length, length = definition.cardinality) : length++;
                    }
                    return buffer.join("").substr(start, length);
                },
                postValidation: function(buffer, currentResult, opts) {
                    var dayMonthValue, year, bufferStr = buffer.join("");
                    return 0 === opts.mask.indexOf("y") ? (year = bufferStr.substr(0, 4), dayMonthValue = bufferStr.substring(4, 10)) : (year = bufferStr.substring(6, 10), 
                    dayMonthValue = bufferStr.substr(0, 6)), currentResult && (dayMonthValue !== opts.leapday || isLeapYear(year));
                },
                definitions: {
                    "1": {
                        validator: function(chrs, maskset, pos, strict, opts) {
                            var isValid = opts.regex.val1.test(chrs);
                            return strict || isValid || chrs.charAt(1) !== opts.separator && -1 === "-./".indexOf(chrs.charAt(1)) || !(isValid = opts.regex.val1.test("0" + chrs.charAt(0))) ? isValid : (maskset.buffer[pos - 1] = "0", 
                            {
                                refreshFromBuffer: {
                                    start: pos - 1,
                                    end: pos
                                },
                                pos: pos,
                                c: chrs.charAt(0)
                            });
                        },
                        cardinality: 2,
                        prevalidator: [ {
                            validator: function(chrs, maskset, pos, strict, opts) {
                                var pchrs = chrs;
                                isNaN(maskset.buffer[pos + 1]) || (pchrs += maskset.buffer[pos + 1]);
                                var isValid = 1 === pchrs.length ? opts.regex.val1pre.test(pchrs) : opts.regex.val1.test(pchrs);
                                if (isValid && maskset.validPositions[pos] && (opts.regex.val2(opts.separator).test(chrs + maskset.validPositions[pos].input) || (maskset.validPositions[pos].input = "0" === chrs ? "1" : "0")), 
                                !strict && !isValid) {
                                    if (isValid = opts.regex.val1.test(chrs + "0")) return maskset.buffer[pos] = chrs, 
                                    maskset.buffer[++pos] = "0", {
                                        pos: pos,
                                        c: "0"
                                    };
                                    if (isValid = opts.regex.val1.test("0" + chrs)) return maskset.buffer[pos] = "0", 
                                    pos++, {
                                        pos: pos
                                    };
                                }
                                return isValid;
                            },
                            cardinality: 1
                        } ]
                    },
                    "2": {
                        validator: function(chrs, maskset, pos, strict, opts) {
                            var frontValue = opts.getFrontValue(maskset.mask, maskset.buffer, opts);
                            -1 !== frontValue.indexOf(opts.placeholder[0]) && (frontValue = "01" + opts.separator);
                            var isValid = opts.regex.val2(opts.separator).test(frontValue + chrs);
                            return strict || isValid || chrs.charAt(1) !== opts.separator && -1 === "-./".indexOf(chrs.charAt(1)) || !(isValid = opts.regex.val2(opts.separator).test(frontValue + "0" + chrs.charAt(0))) ? isValid : (maskset.buffer[pos - 1] = "0", 
                            {
                                refreshFromBuffer: {
                                    start: pos - 1,
                                    end: pos
                                },
                                pos: pos,
                                c: chrs.charAt(0)
                            });
                        },
                        cardinality: 2,
                        prevalidator: [ {
                            validator: function(chrs, maskset, pos, strict, opts) {
                                isNaN(maskset.buffer[pos + 1]) || (chrs += maskset.buffer[pos + 1]);
                                var frontValue = opts.getFrontValue(maskset.mask, maskset.buffer, opts);
                                -1 !== frontValue.indexOf(opts.placeholder[0]) && (frontValue = "01" + opts.separator);
                                var isValid = 1 === chrs.length ? opts.regex.val2pre(opts.separator).test(frontValue + chrs) : opts.regex.val2(opts.separator).test(frontValue + chrs);
                                return isValid && maskset.validPositions[pos] && (opts.regex.val2(opts.separator).test(chrs + maskset.validPositions[pos].input) || (maskset.validPositions[pos].input = "0" === chrs ? "1" : "0")), 
                                strict || isValid || !(isValid = opts.regex.val2(opts.separator).test(frontValue + "0" + chrs)) ? isValid : (maskset.buffer[pos] = "0", 
                                pos++, {
                                    pos: pos
                                });
                            },
                            cardinality: 1
                        } ]
                    },
                    y: {
                        validator: function(chrs, maskset, pos, strict, opts) {
                            return opts.isInYearRange(chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
                        },
                        cardinality: 4,
                        prevalidator: [ {
                            validator: function(chrs, maskset, pos, strict, opts) {
                                var isValid = opts.isInYearRange(chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
                                if (!strict && !isValid) {
                                    var yearPrefix = opts.determinebaseyear(opts.yearrange.minyear, opts.yearrange.maxyear, chrs + "0").toString().slice(0, 1);
                                    if (isValid = opts.isInYearRange(yearPrefix + chrs, opts.yearrange.minyear, opts.yearrange.maxyear)) return maskset.buffer[pos++] = yearPrefix.charAt(0), 
                                    {
                                        pos: pos
                                    };
                                    if (yearPrefix = opts.determinebaseyear(opts.yearrange.minyear, opts.yearrange.maxyear, chrs + "0").toString().slice(0, 2), 
                                    isValid = opts.isInYearRange(yearPrefix + chrs, opts.yearrange.minyear, opts.yearrange.maxyear)) return maskset.buffer[pos++] = yearPrefix.charAt(0), 
                                    maskset.buffer[pos++] = yearPrefix.charAt(1), {
                                        pos: pos
                                    };
                                }
                                return isValid;
                            },
                            cardinality: 1
                        }, {
                            validator: function(chrs, maskset, pos, strict, opts) {
                                var isValid = opts.isInYearRange(chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
                                if (!strict && !isValid) {
                                    var yearPrefix = opts.determinebaseyear(opts.yearrange.minyear, opts.yearrange.maxyear, chrs).toString().slice(0, 2);
                                    if (isValid = opts.isInYearRange(chrs[0] + yearPrefix[1] + chrs[1], opts.yearrange.minyear, opts.yearrange.maxyear)) return maskset.buffer[pos++] = yearPrefix.charAt(1), 
                                    {
                                        pos: pos
                                    };
                                    if (yearPrefix = opts.determinebaseyear(opts.yearrange.minyear, opts.yearrange.maxyear, chrs).toString().slice(0, 2), 
                                    isValid = opts.isInYearRange(yearPrefix + chrs, opts.yearrange.minyear, opts.yearrange.maxyear)) return maskset.buffer[pos - 1] = yearPrefix.charAt(0), 
                                    maskset.buffer[pos++] = yearPrefix.charAt(1), maskset.buffer[pos++] = chrs.charAt(0), 
                                    {
                                        refreshFromBuffer: {
                                            start: pos - 3,
                                            end: pos
                                        },
                                        pos: pos
                                    };
                                }
                                return isValid;
                            },
                            cardinality: 2
                        }, {
                            validator: function(chrs, maskset, pos, strict, opts) {
                                return opts.isInYearRange(chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
                            },
                            cardinality: 3
                        } ]
                    }
                },
                insertMode: !1,
                autoUnmask: !1
            },
            "mm/dd/yyyy": {
                placeholder: "mm/dd/yyyy",
                alias: "dd/mm/yyyy",
                regex: {
                    val2pre: function(separator) {
                        var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                        return new RegExp("((0[13-9]|1[012])" + escapedSeparator + "[0-3])|(02" + escapedSeparator + "[0-2])");
                    },
                    val2: function(separator) {
                        var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                        return new RegExp("((0[1-9]|1[012])" + escapedSeparator + "(0[1-9]|[12][0-9]))|((0[13-9]|1[012])" + escapedSeparator + "30)|((0[13578]|1[02])" + escapedSeparator + "31)");
                    },
                    val1pre: new RegExp("[01]"),
                    val1: new RegExp("0[1-9]|1[012]")
                },
                leapday: "02/29/",
                onKeyDown: function(e, buffer, caretPos, opts) {
                    var $input = $(this);
                    if (e.ctrlKey && e.keyCode === Inputmask.keyCode.RIGHT) {
                        var today = new Date();
                        $input.val((today.getMonth() + 1).toString() + today.getDate().toString() + today.getFullYear().toString()), 
                        $input.trigger("setvalue");
                    }
                }
            },
            "yyyy/mm/dd": {
                mask: "y/1/2",
                placeholder: "yyyy/mm/dd",
                alias: "mm/dd/yyyy",
                leapday: "/02/29",
                onKeyDown: function(e, buffer, caretPos, opts) {
                    var $input = $(this);
                    if (e.ctrlKey && e.keyCode === Inputmask.keyCode.RIGHT) {
                        var today = new Date();
                        $input.val(today.getFullYear().toString() + (today.getMonth() + 1).toString() + today.getDate().toString()), 
                        $input.trigger("setvalue");
                    }
                }
            },
            "dd.mm.yyyy": {
                mask: "1.2.y",
                placeholder: "dd.mm.yyyy",
                leapday: "29.02.",
                separator: ".",
                alias: "dd/mm/yyyy"
            },
            "dd-mm-yyyy": {
                mask: "1-2-y",
                placeholder: "dd-mm-yyyy",
                leapday: "29-02-",
                separator: "-",
                alias: "dd/mm/yyyy"
            },
            "mm.dd.yyyy": {
                mask: "1.2.y",
                placeholder: "mm.dd.yyyy",
                leapday: "02.29.",
                separator: ".",
                alias: "mm/dd/yyyy"
            },
            "mm-dd-yyyy": {
                mask: "1-2-y",
                placeholder: "mm-dd-yyyy",
                leapday: "02-29-",
                separator: "-",
                alias: "mm/dd/yyyy"
            },
            "yyyy.mm.dd": {
                mask: "y.1.2",
                placeholder: "yyyy.mm.dd",
                leapday: ".02.29",
                separator: ".",
                alias: "yyyy/mm/dd"
            },
            "yyyy-mm-dd": {
                mask: "y-1-2",
                placeholder: "yyyy-mm-dd",
                leapday: "-02-29",
                separator: "-",
                alias: "yyyy/mm/dd"
            },
            datetime: {
                mask: "1/2/y h:s",
                placeholder: "dd/mm/yyyy hh:mm",
                alias: "dd/mm/yyyy",
                regex: {
                    hrspre: new RegExp("[012]"),
                    hrs24: new RegExp("2[0-4]|1[3-9]"),
                    hrs: new RegExp("[01][0-9]|2[0-4]"),
                    ampm: new RegExp("^[a|p|A|P][m|M]"),
                    mspre: new RegExp("[0-5]"),
                    ms: new RegExp("[0-5][0-9]")
                },
                timeseparator: ":",
                hourFormat: "24",
                definitions: {
                    h: {
                        validator: function(chrs, maskset, pos, strict, opts) {
                            if ("24" === opts.hourFormat && 24 === parseInt(chrs, 10)) return maskset.buffer[pos - 1] = "0", 
                            maskset.buffer[pos] = "0", {
                                refreshFromBuffer: {
                                    start: pos - 1,
                                    end: pos
                                },
                                c: "0"
                            };
                            var isValid = opts.regex.hrs.test(chrs);
                            if (!strict && !isValid && (chrs.charAt(1) === opts.timeseparator || -1 !== "-.:".indexOf(chrs.charAt(1))) && (isValid = opts.regex.hrs.test("0" + chrs.charAt(0)))) return maskset.buffer[pos - 1] = "0", 
                            maskset.buffer[pos] = chrs.charAt(0), pos++, {
                                refreshFromBuffer: {
                                    start: pos - 2,
                                    end: pos
                                },
                                pos: pos,
                                c: opts.timeseparator
                            };
                            if (isValid && "24" !== opts.hourFormat && opts.regex.hrs24.test(chrs)) {
                                var tmp = parseInt(chrs, 10);
                                return 24 === tmp ? (maskset.buffer[pos + 5] = "a", maskset.buffer[pos + 6] = "m") : (maskset.buffer[pos + 5] = "p", 
                                maskset.buffer[pos + 6] = "m"), (tmp -= 12) < 10 ? (maskset.buffer[pos] = tmp.toString(), 
                                maskset.buffer[pos - 1] = "0") : (maskset.buffer[pos] = tmp.toString().charAt(1), 
                                maskset.buffer[pos - 1] = tmp.toString().charAt(0)), {
                                    refreshFromBuffer: {
                                        start: pos - 1,
                                        end: pos + 6
                                    },
                                    c: maskset.buffer[pos]
                                };
                            }
                            return isValid;
                        },
                        cardinality: 2,
                        prevalidator: [ {
                            validator: function(chrs, maskset, pos, strict, opts) {
                                var isValid = opts.regex.hrspre.test(chrs);
                                return strict || isValid || !(isValid = opts.regex.hrs.test("0" + chrs)) ? isValid : (maskset.buffer[pos] = "0", 
                                pos++, {
                                    pos: pos
                                });
                            },
                            cardinality: 1
                        } ]
                    },
                    s: {
                        validator: "[0-5][0-9]",
                        cardinality: 2,
                        prevalidator: [ {
                            validator: function(chrs, maskset, pos, strict, opts) {
                                var isValid = opts.regex.mspre.test(chrs);
                                return strict || isValid || !(isValid = opts.regex.ms.test("0" + chrs)) ? isValid : (maskset.buffer[pos] = "0", 
                                pos++, {
                                    pos: pos
                                });
                            },
                            cardinality: 1
                        } ]
                    },
                    t: {
                        validator: function(chrs, maskset, pos, strict, opts) {
                            return opts.regex.ampm.test(chrs + "m");
                        },
                        casing: "lower",
                        cardinality: 1
                    }
                },
                insertMode: !1,
                autoUnmask: !1
            },
            datetime12: {
                mask: "1/2/y h:s t\\m",
                placeholder: "dd/mm/yyyy hh:mm xm",
                alias: "datetime",
                hourFormat: "12"
            },
            "mm/dd/yyyy hh:mm xm": {
                mask: "1/2/y h:s t\\m",
                placeholder: "mm/dd/yyyy hh:mm xm",
                alias: "datetime12",
                regex: {
                    val2pre: function(separator) {
                        var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                        return new RegExp("((0[13-9]|1[012])" + escapedSeparator + "[0-3])|(02" + escapedSeparator + "[0-2])");
                    },
                    val2: function(separator) {
                        var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                        return new RegExp("((0[1-9]|1[012])" + escapedSeparator + "(0[1-9]|[12][0-9]))|((0[13-9]|1[012])" + escapedSeparator + "30)|((0[13578]|1[02])" + escapedSeparator + "31)");
                    },
                    val1pre: new RegExp("[01]"),
                    val1: new RegExp("0[1-9]|1[012]")
                },
                leapday: "02/29/",
                onKeyDown: function(e, buffer, caretPos, opts) {
                    var $input = $(this);
                    if (e.ctrlKey && e.keyCode === Inputmask.keyCode.RIGHT) {
                        var today = new Date();
                        $input.val((today.getMonth() + 1).toString() + today.getDate().toString() + today.getFullYear().toString()), 
                        $input.trigger("setvalue");
                    }
                }
            },
            "hh:mm t": {
                mask: "h:s t\\m",
                placeholder: "hh:mm xm",
                alias: "datetime",
                hourFormat: "12"
            },
            "h:s t": {
                mask: "h:s t\\m",
                placeholder: "hh:mm xm",
                alias: "datetime",
                hourFormat: "12"
            },
            "hh:mm:ss": {
                mask: "h:s:s",
                placeholder: "hh:mm:ss",
                alias: "datetime",
                autoUnmask: !1
            },
            "hh:mm": {
                mask: "h:s",
                placeholder: "hh:mm",
                alias: "datetime",
                autoUnmask: !1
            },
            date: {
                alias: "dd/mm/yyyy"
            },
            "mm/yyyy": {
                mask: "1/y",
                placeholder: "mm/yyyy",
                leapday: "donotuse",
                separator: "/",
                alias: "mm/dd/yyyy"
            },
            shamsi: {
                regex: {
                    val2pre: function(separator) {
                        var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                        return new RegExp("((0[1-9]|1[012])" + escapedSeparator + "[0-3])");
                    },
                    val2: function(separator) {
                        var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                        return new RegExp("((0[1-9]|1[012])" + escapedSeparator + "(0[1-9]|[12][0-9]))|((0[1-9]|1[012])" + escapedSeparator + "30)|((0[1-6])" + escapedSeparator + "31)");
                    },
                    val1pre: new RegExp("[01]"),
                    val1: new RegExp("0[1-9]|1[012]")
                },
                yearrange: {
                    minyear: 1300,
                    maxyear: 1499
                },
                mask: "y/1/2",
                leapday: "/12/30",
                placeholder: "yyyy/mm/dd",
                alias: "mm/dd/yyyy",
                clearIncomplete: !0
            },
            "yyyy-mm-dd hh:mm:ss": {
                mask: "y-1-2 h:s:s",
                placeholder: "yyyy-mm-dd hh:mm:ss",
                alias: "datetime",
                separator: "-",
                leapday: "-02-29",
                regex: {
                    val2pre: function(separator) {
                        var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                        return new RegExp("((0[13-9]|1[012])" + escapedSeparator + "[0-3])|(02" + escapedSeparator + "[0-2])");
                    },
                    val2: function(separator) {
                        var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
                        return new RegExp("((0[1-9]|1[012])" + escapedSeparator + "(0[1-9]|[12][0-9]))|((0[13-9]|1[012])" + escapedSeparator + "30)|((0[13578]|1[02])" + escapedSeparator + "31)");
                    },
                    val1pre: new RegExp("[01]"),
                    val1: new RegExp("0[1-9]|1[012]")
                },
                onKeyDown: function(e, buffer, caretPos, opts) {}
            }
        }), Inputmask;
    });
}, function(module, exports, __webpack_require__) {
    "use strict";
    var __WEBPACK_AMD_DEFINE_RESULT__;
    "function" == typeof Symbol && Symbol.iterator;
    void 0 !== (__WEBPACK_AMD_DEFINE_RESULT__ = function() {
        return window;
    }.call(exports, __webpack_require__, exports, module)) && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__);
}, function(module, exports, __webpack_require__) {
    "use strict";
    var __WEBPACK_AMD_DEFINE_RESULT__;
    "function" == typeof Symbol && Symbol.iterator;
    void 0 !== (__WEBPACK_AMD_DEFINE_RESULT__ = function() {
        return document;
    }.call(exports, __webpack_require__, exports, module)) && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__);
}, function(module, exports, __webpack_require__) {
    "use strict";
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    "function" == typeof Symbol && Symbol.iterator;
    !function(factory) {
        __WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(0), __webpack_require__(1) ], 
        void 0 !== (__WEBPACK_AMD_DEFINE_RESULT__ = "function" == typeof (__WEBPACK_AMD_DEFINE_FACTORY__ = factory) ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__) && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__);
    }(function($, Inputmask) {
        return Inputmask.extendDefinitions({
            A: {
                validator: "[A-Za-zА-яЁёÀ-ÿµ]",
                cardinality: 1,
                casing: "upper"
            },
            "&": {
                validator: "[0-9A-Za-zА-яЁёÀ-ÿµ]",
                cardinality: 1,
                casing: "upper"
            },
            "#": {
                validator: "[0-9A-Fa-f]",
                cardinality: 1,
                casing: "upper"
            }
        }), Inputmask.extendAliases({
            url: {
                definitions: {
                    i: {
                        validator: ".",
                        cardinality: 1
                    }
                },
                mask: "(\\http://)|(\\http\\s://)|(ftp://)|(ftp\\s://)i{+}",
                insertMode: !1,
                autoUnmask: !1,
                inputmode: "url"
            },
            ip: {
                mask: "i[i[i]].i[i[i]].i[i[i]].i[i[i]]",
                definitions: {
                    i: {
                        validator: function(chrs, maskset, pos, strict, opts) {
                            return pos - 1 > -1 && "." !== maskset.buffer[pos - 1] ? (chrs = maskset.buffer[pos - 1] + chrs, 
                            chrs = pos - 2 > -1 && "." !== maskset.buffer[pos - 2] ? maskset.buffer[pos - 2] + chrs : "0" + chrs) : chrs = "00" + chrs, 
                            new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]").test(chrs);
                        },
                        cardinality: 1
                    }
                },
                onUnMask: function(maskedValue, unmaskedValue, opts) {
                    return maskedValue;
                },
                inputmode: "numeric"
            },
            email: {
                mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
                greedy: !1,
                onBeforePaste: function(pastedValue, opts) {
                    return (pastedValue = pastedValue.toLowerCase()).replace("mailto:", "");
                },
                definitions: {
                    "*": {
                        validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]",
                        cardinality: 1,
                        casing: "lower"
                    },
                    "-": {
                        validator: "[0-9A-Za-z-]",
                        cardinality: 1,
                        casing: "lower"
                    }
                },
                onUnMask: function(maskedValue, unmaskedValue, opts) {
                    return maskedValue;
                },
                inputmode: "email"
            },
            mac: {
                mask: "##:##:##:##:##:##"
            },
            vin: {
                mask: "V{13}9{4}",
                definitions: {
                    V: {
                        validator: "[A-HJ-NPR-Za-hj-npr-z\\d]",
                        cardinality: 1,
                        casing: "upper"
                    }
                },
                clearIncomplete: !0,
                autoUnmask: !0
            }
        }), Inputmask;
    });
}, function(module, exports, __webpack_require__) {
    "use strict";
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    "function" == typeof Symbol && Symbol.iterator;
    !function(factory) {
        __WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(0), __webpack_require__(1) ], 
        void 0 !== (__WEBPACK_AMD_DEFINE_RESULT__ = "function" == typeof (__WEBPACK_AMD_DEFINE_FACTORY__ = factory) ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__) && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__);
    }(function($, Inputmask, undefined) {
        function autoEscape(txt, opts) {
            for (var escapedTxt = "", i = 0; i < txt.length; i++) Inputmask.prototype.definitions[txt.charAt(i)] || opts.definitions[txt.charAt(i)] || opts.optionalmarker.start === txt.charAt(i) || opts.optionalmarker.end === txt.charAt(i) || opts.quantifiermarker.start === txt.charAt(i) || opts.quantifiermarker.end === txt.charAt(i) || opts.groupmarker.start === txt.charAt(i) || opts.groupmarker.end === txt.charAt(i) || opts.alternatormarker === txt.charAt(i) ? escapedTxt += "\\" + txt.charAt(i) : escapedTxt += txt.charAt(i);
            return escapedTxt;
        }
        return Inputmask.extendAliases({
            numeric: {
                mask: function(opts) {
                    if (0 !== opts.repeat && isNaN(opts.integerDigits) && (opts.integerDigits = opts.repeat), 
                    opts.repeat = 0, opts.groupSeparator === opts.radixPoint && ("." === opts.radixPoint ? opts.groupSeparator = "," : "," === opts.radixPoint ? opts.groupSeparator = "." : opts.groupSeparator = ""), 
                    " " === opts.groupSeparator && (opts.skipOptionalPartCharacter = undefined), opts.autoGroup = opts.autoGroup && "" !== opts.groupSeparator, 
                    opts.autoGroup && ("string" == typeof opts.groupSize && isFinite(opts.groupSize) && (opts.groupSize = parseInt(opts.groupSize)), 
                    isFinite(opts.integerDigits))) {
                        var seps = Math.floor(opts.integerDigits / opts.groupSize), mod = opts.integerDigits % opts.groupSize;
                        opts.integerDigits = parseInt(opts.integerDigits) + (0 === mod ? seps - 1 : seps), 
                        opts.integerDigits < 1 && (opts.integerDigits = "*");
                    }
                    opts.placeholder.length > 1 && (opts.placeholder = opts.placeholder.charAt(0)), 
                    "radixFocus" === opts.positionCaretOnClick && "" === opts.placeholder && !1 === opts.integerOptional && (opts.positionCaretOnClick = "lvp"), 
                    opts.definitions[";"] = opts.definitions["~"], opts.definitions[";"].definitionSymbol = "~", 
                    !0 === opts.numericInput && (opts.positionCaretOnClick = "radixFocus" === opts.positionCaretOnClick ? "lvp" : opts.positionCaretOnClick, 
                    opts.digitsOptional = !1, isNaN(opts.digits) && (opts.digits = 2), opts.decimalProtect = !1);
                    var mask = "[+]";
                    if (mask += autoEscape(opts.prefix, opts), !0 === opts.integerOptional ? mask += "~{1," + opts.integerDigits + "}" : mask += "~{" + opts.integerDigits + "}", 
                    opts.digits !== undefined) {
                        opts.radixPointDefinitionSymbol = opts.decimalProtect ? ":" : opts.radixPoint;
                        var dq = opts.digits.toString().split(",");
                        isFinite(dq[0] && dq[1] && isFinite(dq[1])) ? mask += opts.radixPointDefinitionSymbol + ";{" + opts.digits + "}" : (isNaN(opts.digits) || parseInt(opts.digits) > 0) && (opts.digitsOptional ? mask += "[" + opts.radixPointDefinitionSymbol + ";{1," + opts.digits + "}]" : mask += opts.radixPointDefinitionSymbol + ";{" + opts.digits + "}");
                    }
                    return mask += autoEscape(opts.suffix, opts), mask += "[-]", opts.greedy = !1, mask;
                },
                placeholder: "",
                greedy: !1,
                digits: "*",
                digitsOptional: !0,
                enforceDigitsOnBlur: !1,
                radixPoint: ".",
                positionCaretOnClick: "radixFocus",
                groupSize: 3,
                groupSeparator: "",
                autoGroup: !1,
                allowMinus: !0,
                negationSymbol: {
                    front: "-",
                    back: ""
                },
                integerDigits: "+",
                integerOptional: !0,
                prefix: "",
                suffix: "",
                rightAlign: !0,
                decimalProtect: !0,
                min: null,
                max: null,
                step: 1,
                insertMode: !0,
                autoUnmask: !1,
                unmaskAsNumber: !1,
                inputmode: "numeric",
                preValidation: function(buffer, pos, c, isSelection, opts) {
                    if ("-" === c || c === opts.negationSymbol.front) return !0 === opts.allowMinus && (opts.isNegative = opts.isNegative === undefined || !opts.isNegative, 
                    "" === buffer.join("") || {
                        caret: pos,
                        dopost: !0
                    });
                    if (!1 === isSelection && c === opts.radixPoint && opts.digits !== undefined && (isNaN(opts.digits) || parseInt(opts.digits) > 0)) {
                        var radixPos = $.inArray(opts.radixPoint, buffer);
                        if (-1 !== radixPos) return !0 === opts.numericInput ? pos === radixPos : {
                            caret: radixPos + 1
                        };
                    }
                    return !0;
                },
                postValidation: function(buffer, currentResult, opts) {
                    var suffix = opts.suffix.split(""), prefix = opts.prefix.split("");
                    if (currentResult.pos === undefined && currentResult.caret !== undefined && !0 !== currentResult.dopost) return currentResult;
                    var caretPos = currentResult.caret !== undefined ? currentResult.caret : currentResult.pos, maskedValue = buffer.slice();
                    opts.numericInput && (caretPos = maskedValue.length - caretPos - 1, maskedValue = maskedValue.reverse());
                    var charAtPos = maskedValue[caretPos];
                    if (charAtPos === opts.groupSeparator && (charAtPos = maskedValue[caretPos += 1]), 
                    caretPos === maskedValue.length - opts.suffix.length - 1 && charAtPos === opts.radixPoint) return currentResult;
                    charAtPos !== undefined && charAtPos !== opts.radixPoint && charAtPos !== opts.negationSymbol.front && charAtPos !== opts.negationSymbol.back && (maskedValue[caretPos] = "?", 
                    opts.prefix.length > 0 && caretPos >= (!1 === opts.isNegative ? 1 : 0) && caretPos < opts.prefix.length - 1 + (!1 === opts.isNegative ? 1 : 0) ? prefix[caretPos - (!1 === opts.isNegative ? 1 : 0)] = "?" : opts.suffix.length > 0 && caretPos >= maskedValue.length - opts.suffix.length - (!1 === opts.isNegative ? 1 : 0) && (suffix[caretPos - (maskedValue.length - opts.suffix.length - (!1 === opts.isNegative ? 1 : 0))] = "?")), 
                    prefix = prefix.join(""), suffix = suffix.join("");
                    var processValue = maskedValue.join("").replace(prefix, "");
                    if (processValue = processValue.replace(suffix, ""), processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), 
                    processValue = processValue.replace(new RegExp("[-" + Inputmask.escapeRegex(opts.negationSymbol.front) + "]", "g"), ""), 
                    processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), ""), 
                    isNaN(opts.placeholder) && (processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.placeholder), "g"), "")), 
                    processValue.length > 1 && 1 !== processValue.indexOf(opts.radixPoint) && ("0" === charAtPos && (processValue = processValue.replace(/^\?/g, "")), 
                    processValue = processValue.replace(/^0/g, "")), processValue.charAt(0) === opts.radixPoint && "" !== opts.radixPoint && !0 !== opts.numericInput && (processValue = "0" + processValue), 
                    "" !== processValue) {
                        if (processValue = processValue.split(""), (!opts.digitsOptional || opts.enforceDigitsOnBlur && "blur" === currentResult.event) && isFinite(opts.digits)) {
                            var radixPosition = $.inArray(opts.radixPoint, processValue), rpb = $.inArray(opts.radixPoint, maskedValue);
                            -1 === radixPosition && (processValue.push(opts.radixPoint), radixPosition = processValue.length - 1);
                            for (var i = 1; i <= opts.digits; i++) opts.digitsOptional && (!opts.enforceDigitsOnBlur || "blur" !== currentResult.event) || processValue[radixPosition + i] !== undefined && processValue[radixPosition + i] !== opts.placeholder.charAt(0) ? -1 !== rpb && maskedValue[rpb + i] !== undefined && (processValue[radixPosition + i] = processValue[radixPosition + i] || maskedValue[rpb + i]) : processValue[radixPosition + i] = currentResult.placeholder || opts.placeholder.charAt(0);
                        }
                        if (!0 !== opts.autoGroup || "" === opts.groupSeparator || charAtPos === opts.radixPoint && currentResult.pos === undefined && !currentResult.dopost) processValue = processValue.join(""); else {
                            var addRadix = processValue[processValue.length - 1] === opts.radixPoint && currentResult.c === opts.radixPoint;
                            processValue = Inputmask(function(buffer, opts) {
                                var postMask = "";
                                if (postMask += "(" + opts.groupSeparator + "*{" + opts.groupSize + "}){*}", "" !== opts.radixPoint) {
                                    var radixSplit = buffer.join("").split(opts.radixPoint);
                                    radixSplit[1] && (postMask += opts.radixPoint + "*{" + radixSplit[1].match(/^\d*\??\d*/)[0].length + "}");
                                }
                                return postMask;
                            }(processValue, opts), {
                                numericInput: !0,
                                jitMasking: !0,
                                definitions: {
                                    "*": {
                                        validator: "[0-9?]",
                                        cardinality: 1
                                    }
                                }
                            }).format(processValue.join("")), addRadix && (processValue += opts.radixPoint), 
                            processValue.charAt(0) === opts.groupSeparator && processValue.substr(1);
                        }
                    }
                    if (opts.isNegative && "blur" === currentResult.event && (opts.isNegative = "0" !== processValue), 
                    processValue = prefix + processValue, processValue += suffix, opts.isNegative && (processValue = opts.negationSymbol.front + processValue, 
                    processValue += opts.negationSymbol.back), processValue = processValue.split(""), 
                    charAtPos !== undefined) if (charAtPos !== opts.radixPoint && charAtPos !== opts.negationSymbol.front && charAtPos !== opts.negationSymbol.back) (caretPos = $.inArray("?", processValue)) > -1 ? processValue[caretPos] = charAtPos : caretPos = currentResult.caret || 0; else if (charAtPos === opts.radixPoint || charAtPos === opts.negationSymbol.front || charAtPos === opts.negationSymbol.back) {
                        var newCaretPos = $.inArray(charAtPos, processValue);
                        -1 !== newCaretPos && (caretPos = newCaretPos);
                    }
                    opts.numericInput && (caretPos = processValue.length - caretPos - 1, processValue = processValue.reverse());
                    var rslt = {
                        caret: charAtPos === undefined || currentResult.pos !== undefined ? caretPos + (opts.numericInput ? -1 : 1) : caretPos,
                        buffer: processValue,
                        refreshFromBuffer: currentResult.dopost || buffer.join("") !== processValue.join("")
                    };
                    return rslt.refreshFromBuffer ? rslt : currentResult;
                },
                onBeforeWrite: function(e, buffer, caretPos, opts) {
                    if (e) switch (e.type) {
                      case "keydown":
                        return opts.postValidation(buffer, {
                            caret: caretPos,
                            dopost: !0
                        }, opts);

                      case "blur":
                      case "checkval":
                        var unmasked;
                        if (function(opts) {
                            opts.parseMinMaxOptions === undefined && (null !== opts.min && (opts.min = opts.min.toString().replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), 
                            "," === opts.radixPoint && (opts.min = opts.min.replace(opts.radixPoint, ".")), 
                            opts.min = isFinite(opts.min) ? parseFloat(opts.min) : NaN, isNaN(opts.min) && (opts.min = Number.MIN_VALUE)), 
                            null !== opts.max && (opts.max = opts.max.toString().replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), 
                            "," === opts.radixPoint && (opts.max = opts.max.replace(opts.radixPoint, ".")), 
                            opts.max = isFinite(opts.max) ? parseFloat(opts.max) : NaN, isNaN(opts.max) && (opts.max = Number.MAX_VALUE)), 
                            opts.parseMinMaxOptions = "done");
                        }(opts), null !== opts.min || null !== opts.max) {
                            if (unmasked = opts.onUnMask(buffer.join(""), undefined, $.extend({}, opts, {
                                unmaskAsNumber: !0
                            })), null !== opts.min && unmasked < opts.min) return opts.isNegative = opts.min < 0, 
                            opts.postValidation(opts.min.toString().replace(".", opts.radixPoint).split(""), {
                                caret: caretPos,
                                dopost: !0,
                                placeholder: "0"
                            }, opts);
                            if (null !== opts.max && unmasked > opts.max) return opts.isNegative = opts.max < 0, 
                            opts.postValidation(opts.max.toString().replace(".", opts.radixPoint).split(""), {
                                caret: caretPos,
                                dopost: !0,
                                placeholder: "0"
                            }, opts);
                        }
                        return opts.postValidation(buffer, {
                            caret: caretPos,
                            placeholder: "0",
                            event: "blur"
                        }, opts);

                      case "_checkval":
                        return {
                            caret: caretPos
                        };
                    }
                },
                regex: {
                    integerPart: function(opts, emptyCheck) {
                        return emptyCheck ? new RegExp("[" + Inputmask.escapeRegex(opts.negationSymbol.front) + "+]?") : new RegExp("[" + Inputmask.escapeRegex(opts.negationSymbol.front) + "+]?\\d+");
                    },
                    integerNPart: function(opts) {
                        return new RegExp("[\\d" + Inputmask.escapeRegex(opts.groupSeparator) + Inputmask.escapeRegex(opts.placeholder.charAt(0)) + "]+");
                    }
                },
                definitions: {
                    "~": {
                        validator: function(chrs, maskset, pos, strict, opts, isSelection) {
                            var isValid = strict ? new RegExp("[0-9" + Inputmask.escapeRegex(opts.groupSeparator) + "]").test(chrs) : new RegExp("[0-9]").test(chrs);
                            if (!0 === isValid) {
                                if (!0 !== opts.numericInput && maskset.validPositions[pos] !== undefined && "~" === maskset.validPositions[pos].match.def && !isSelection) {
                                    var processValue = maskset.buffer.join(""), pvRadixSplit = (processValue = (processValue = processValue.replace(new RegExp("[-" + Inputmask.escapeRegex(opts.negationSymbol.front) + "]", "g"), "")).replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), "")).split(opts.radixPoint);
                                    pvRadixSplit.length > 1 && (pvRadixSplit[1] = pvRadixSplit[1].replace(/0/g, opts.placeholder.charAt(0))), 
                                    "0" === pvRadixSplit[0] && (pvRadixSplit[0] = pvRadixSplit[0].replace(/0/g, opts.placeholder.charAt(0))), 
                                    processValue = pvRadixSplit[0] + opts.radixPoint + pvRadixSplit[1] || "";
                                    var bufferTemplate = maskset._buffer.join("");
                                    for (processValue === opts.radixPoint && (processValue = bufferTemplate); null === processValue.match(Inputmask.escapeRegex(bufferTemplate) + "$"); ) bufferTemplate = bufferTemplate.slice(1);
                                    isValid = (processValue = (processValue = processValue.replace(bufferTemplate, "")).split(""))[pos] === undefined ? {
                                        pos: pos,
                                        remove: pos
                                    } : {
                                        pos: pos
                                    };
                                }
                            } else strict || chrs !== opts.radixPoint || maskset.validPositions[pos - 1] !== undefined || (maskset.buffer[pos] = "0", 
                            isValid = {
                                pos: pos + 1
                            });
                            return isValid;
                        },
                        cardinality: 1
                    },
                    "+": {
                        validator: function(chrs, maskset, pos, strict, opts) {
                            return opts.allowMinus && ("-" === chrs || chrs === opts.negationSymbol.front);
                        },
                        cardinality: 1,
                        placeholder: ""
                    },
                    "-": {
                        validator: function(chrs, maskset, pos, strict, opts) {
                            return opts.allowMinus && chrs === opts.negationSymbol.back;
                        },
                        cardinality: 1,
                        placeholder: ""
                    },
                    ":": {
                        validator: function(chrs, maskset, pos, strict, opts) {
                            var radix = "[" + Inputmask.escapeRegex(opts.radixPoint) + "]", isValid = new RegExp(radix).test(chrs);
                            return isValid && maskset.validPositions[pos] && maskset.validPositions[pos].match.placeholder === opts.radixPoint && (isValid = {
                                caret: pos + 1
                            }), isValid;
                        },
                        cardinality: 1,
                        placeholder: function(opts) {
                            return opts.radixPoint;
                        }
                    }
                },
                onUnMask: function(maskedValue, unmaskedValue, opts) {
                    if ("" === unmaskedValue && !0 === opts.nullable) return unmaskedValue;
                    var processValue = maskedValue.replace(opts.prefix, "");
                    return processValue = processValue.replace(opts.suffix, ""), processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), 
                    "" !== opts.placeholder.charAt(0) && (processValue = processValue.replace(new RegExp(opts.placeholder.charAt(0), "g"), "0")), 
                    opts.unmaskAsNumber ? ("" !== opts.radixPoint && -1 !== processValue.indexOf(opts.radixPoint) && (processValue = processValue.replace(Inputmask.escapeRegex.call(this, opts.radixPoint), ".")), 
                    processValue = processValue.replace(new RegExp("^" + Inputmask.escapeRegex(opts.negationSymbol.front)), "-"), 
                    processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), ""), 
                    Number(processValue)) : processValue;
                },
                isComplete: function(buffer, opts) {
                    var maskedValue = buffer.join("");
                    if (buffer.slice().join("") !== maskedValue) return !1;
                    var processValue = maskedValue.replace(opts.prefix, "");
                    return processValue = processValue.replace(opts.suffix, ""), processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), 
                    "," === opts.radixPoint && (processValue = processValue.replace(Inputmask.escapeRegex(opts.radixPoint), ".")), 
                    isFinite(processValue);
                },
                onBeforeMask: function(initialValue, opts) {
                    if (opts.isNegative = undefined, initialValue = initialValue.toString().charAt(initialValue.length - 1) === opts.radixPoint ? initialValue.toString().substr(0, initialValue.length - 1) : initialValue.toString(), 
                    "" !== opts.radixPoint && isFinite(initialValue)) {
                        var vs = initialValue.split("."), groupSize = "" !== opts.groupSeparator ? parseInt(opts.groupSize) : 0;
                        2 === vs.length && (vs[0].length > groupSize || vs[1].length > groupSize || vs[0].length <= groupSize && vs[1].length < groupSize) && (initialValue = initialValue.replace(".", opts.radixPoint));
                    }
                    var kommaMatches = initialValue.match(/,/g), dotMatches = initialValue.match(/\./g);
                    if (initialValue = dotMatches && kommaMatches ? dotMatches.length > kommaMatches.length ? (initialValue = initialValue.replace(/\./g, "")).replace(",", opts.radixPoint) : kommaMatches.length > dotMatches.length ? (initialValue = initialValue.replace(/,/g, "")).replace(".", opts.radixPoint) : initialValue.indexOf(".") < initialValue.indexOf(",") ? initialValue.replace(/\./g, "") : initialValue.replace(/,/g, "") : initialValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), 
                    0 === opts.digits && (-1 !== initialValue.indexOf(".") ? initialValue = initialValue.substring(0, initialValue.indexOf(".")) : -1 !== initialValue.indexOf(",") && (initialValue = initialValue.substring(0, initialValue.indexOf(",")))), 
                    "" !== opts.radixPoint && isFinite(opts.digits) && -1 !== initialValue.indexOf(opts.radixPoint)) {
                        var decPart = initialValue.split(opts.radixPoint)[1].match(new RegExp("\\d*"))[0];
                        if (parseInt(opts.digits) < decPart.toString().length) {
                            var digitsFactor = Math.pow(10, parseInt(opts.digits));
                            initialValue = initialValue.replace(Inputmask.escapeRegex(opts.radixPoint), "."), 
                            initialValue = (initialValue = Math.round(parseFloat(initialValue) * digitsFactor) / digitsFactor).toString().replace(".", opts.radixPoint);
                        }
                    }
                    return initialValue;
                },
                canClearPosition: function(maskset, position, lvp, strict, opts) {
                    var vp = maskset.validPositions[position], canClear = vp.input !== opts.radixPoint || null !== maskset.validPositions[position].match.fn && !1 === opts.decimalProtect || vp.input === opts.radixPoint && maskset.validPositions[position + 1] && null === maskset.validPositions[position + 1].match.fn || isFinite(vp.input) || position === lvp || vp.input === opts.groupSeparator || vp.input === opts.negationSymbol.front || vp.input === opts.negationSymbol.back;
                    return !canClear || "+" !== vp.match.nativeDef && "-" !== vp.match.nativeDef || (opts.isNegative = !1), 
                    canClear;
                },
                onKeyDown: function(e, buffer, caretPos, opts) {
                    var $input = $(this);
                    if (e.ctrlKey) switch (e.keyCode) {
                      case Inputmask.keyCode.UP:
                        $input.val(parseFloat(this.inputmask.unmaskedvalue()) + parseInt(opts.step)), $input.trigger("setvalue");
                        break;

                      case Inputmask.keyCode.DOWN:
                        $input.val(parseFloat(this.inputmask.unmaskedvalue()) - parseInt(opts.step)), $input.trigger("setvalue");
                    }
                }
            },
            currency: {
                prefix: "$ ",
                groupSeparator: ",",
                alias: "numeric",
                placeholder: "0",
                autoGroup: !0,
                digits: 2,
                digitsOptional: !1,
                clearMaskOnLostFocus: !1
            },
            decimal: {
                alias: "numeric"
            },
            integer: {
                alias: "numeric",
                digits: 0,
                radixPoint: ""
            },
            percentage: {
                alias: "numeric",
                digits: 2,
                digitsOptional: !0,
                radixPoint: ".",
                placeholder: "0",
                autoGroup: !1,
                min: 0,
                max: 100,
                suffix: " %",
                allowMinus: !1
            }
        }), Inputmask;
    });
}, function(module, exports, __webpack_require__) {
    "use strict";
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    "function" == typeof Symbol && Symbol.iterator;
    !function(factory) {
        __WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(0), __webpack_require__(1) ], 
        void 0 !== (__WEBPACK_AMD_DEFINE_RESULT__ = "function" == typeof (__WEBPACK_AMD_DEFINE_FACTORY__ = factory) ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__) && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__);
    }(function($, Inputmask) {
        function maskSort(a, b) {
            var maska = (a.mask || a).replace(/#/g, "9").replace(/\)/, "9").replace(/[+()#-]/g, ""), maskb = (b.mask || b).replace(/#/g, "9").replace(/\)/, "9").replace(/[+()#-]/g, ""), maskas = (a.mask || a).split("#")[0], maskbs = (b.mask || b).split("#")[0];
            return 0 === maskbs.indexOf(maskas) ? -1 : 0 === maskas.indexOf(maskbs) ? 1 : maska.localeCompare(maskb);
        }
        var analyseMaskBase = Inputmask.prototype.analyseMask;
        return Inputmask.prototype.analyseMask = function(mask, regexMask, opts) {
            function reduceVariations(masks, previousVariation, previousmaskGroup) {
                previousVariation = previousVariation || "", previousmaskGroup = previousmaskGroup || maskGroups, 
                "" !== previousVariation && (previousmaskGroup[previousVariation] = {});
                for (var variation = "", maskGroup = previousmaskGroup[previousVariation] || previousmaskGroup, i = masks.length - 1; i >= 0; i--) maskGroup[variation = (mask = masks[i].mask || masks[i]).substr(0, 1)] = maskGroup[variation] || [], 
                maskGroup[variation].unshift(mask.substr(1)), masks.splice(i, 1);
                for (var ndx in maskGroup) maskGroup[ndx].length > 500 && reduceVariations(maskGroup[ndx].slice(), ndx, maskGroup);
            }
            function rebuild(maskGroup) {
                var mask = "", submasks = [];
                for (var ndx in maskGroup) $.isArray(maskGroup[ndx]) ? 1 === maskGroup[ndx].length ? submasks.push(ndx + maskGroup[ndx]) : submasks.push(ndx + opts.groupmarker.start + maskGroup[ndx].join(opts.groupmarker.end + opts.alternatormarker + opts.groupmarker.start) + opts.groupmarker.end) : submasks.push(ndx + rebuild(maskGroup[ndx]));
                return 1 === submasks.length ? mask += submasks[0] : mask += opts.groupmarker.start + submasks.join(opts.groupmarker.end + opts.alternatormarker + opts.groupmarker.start) + opts.groupmarker.end, 
                mask;
            }
            var maskGroups = {};
            return opts.phoneCodes && (opts.phoneCodes && opts.phoneCodes.length > 1e3 && (reduceVariations((mask = mask.substr(1, mask.length - 2)).split(opts.groupmarker.end + opts.alternatormarker + opts.groupmarker.start)), 
            mask = rebuild(maskGroups)), mask = mask.replace(/9/g, "\\9")), analyseMaskBase.call(this, mask, regexMask, opts);
        }, Inputmask.extendAliases({
            abstractphone: {
                groupmarker: {
                    start: "<",
                    end: ">"
                },
                countrycode: "",
                phoneCodes: [],
                mask: function(opts) {
                    return opts.definitions = {
                        "#": Inputmask.prototype.definitions[9]
                    }, opts.phoneCodes.sort(maskSort);
                },
                keepStatic: !0,
                onBeforeMask: function(value, opts) {
                    var processedValue = value.replace(/^0{1,2}/, "").replace(/[\s]/g, "");
                    return (processedValue.indexOf(opts.countrycode) > 1 || -1 === processedValue.indexOf(opts.countrycode)) && (processedValue = "+" + opts.countrycode + processedValue), 
                    processedValue;
                },
                onUnMask: function(maskedValue, unmaskedValue, opts) {
                    return maskedValue.replace(/[()#-]/g, "");
                },
                inputmode: "tel"
            }
        }), Inputmask;
    });
}, function(module, exports, __webpack_require__) {
    "use strict";
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    "function" == typeof Symbol && Symbol.iterator;
    !function(factory) {
        __WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(0), __webpack_require__(1) ], 
        void 0 !== (__WEBPACK_AMD_DEFINE_RESULT__ = "function" == typeof (__WEBPACK_AMD_DEFINE_FACTORY__ = factory) ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__) && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__);
    }(function($, Inputmask) {
        return Inputmask.extendAliases({
            Regex: {
                mask: "r",
                greedy: !1,
                repeat: "*",
                regex: null,
                regexTokens: null,
                tokenizer: /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,
                quantifierFilter: /[0-9]+[^,]/,
                isComplete: function(buffer, opts) {
                    return new RegExp(opts.regex, opts.casing ? "i" : "").test(buffer.join(""));
                },
                definitions: {
                    r: {
                        validator: function(chrs, maskset, pos, strict, opts) {
                            function RegexToken(isGroup, isQuantifier) {
                                this.matches = [], this.isGroup = isGroup || !1, this.isQuantifier = isQuantifier || !1, 
                                this.quantifier = {
                                    min: 1,
                                    max: 1
                                }, this.repeaterPart = void 0;
                            }
                            function validateRegexToken(token, fromGroup) {
                                var isvalid = !1;
                                fromGroup && (regexPart += "(", openGroupCount++);
                                for (var mndx = 0; mndx < token.matches.length; mndx++) {
                                    var matchToken = token.matches[mndx];
                                    if (!0 === matchToken.isGroup) isvalid = validateRegexToken(matchToken, !0); else if (!0 === matchToken.isQuantifier) {
                                        var crrntndx = $.inArray(matchToken, token.matches), matchGroup = token.matches[crrntndx - 1], regexPartBak = regexPart;
                                        if (isNaN(matchToken.quantifier.max)) {
                                            for (;matchToken.repeaterPart && matchToken.repeaterPart !== regexPart && matchToken.repeaterPart.length > regexPart.length && !(isvalid = validateRegexToken(matchGroup, !0)); ) ;
                                            (isvalid = isvalid || validateRegexToken(matchGroup, !0)) && (matchToken.repeaterPart = regexPart), 
                                            regexPart = regexPartBak + matchToken.quantifier.max;
                                        } else {
                                            for (var i = 0, qm = matchToken.quantifier.max - 1; i < qm && !(isvalid = validateRegexToken(matchGroup, !0)); i++) ;
                                            regexPart = regexPartBak + "{" + matchToken.quantifier.min + "," + matchToken.quantifier.max + "}";
                                        }
                                    } else if (void 0 !== matchToken.matches) for (var k = 0; k < matchToken.length && !(isvalid = validateRegexToken(matchToken[k], fromGroup)); k++) ; else {
                                        var testExp;
                                        if ("[" == matchToken.charAt(0)) {
                                            testExp = regexPart, testExp += matchToken;
                                            for (j = 0; j < openGroupCount; j++) testExp += ")";
                                            isvalid = (exp = new RegExp("^(" + testExp + ")$", opts.casing ? "i" : "")).test(bufferStr);
                                        } else for (var l = 0, tl = matchToken.length; l < tl; l++) if ("\\" !== matchToken.charAt(l)) {
                                            testExp = regexPart, testExp = (testExp += matchToken.substr(0, l + 1)).replace(/\|$/, "");
                                            for (var j = 0; j < openGroupCount; j++) testExp += ")";
                                            var exp = new RegExp("^(" + testExp + ")$", opts.casing ? "i" : "");
                                            if (isvalid = exp.test(bufferStr)) break;
                                        }
                                        regexPart += matchToken;
                                    }
                                    if (isvalid) break;
                                }
                                return fromGroup && (regexPart += ")", openGroupCount--), isvalid;
                            }
                            var bufferStr, groupToken, cbuffer = maskset.buffer.slice(), regexPart = "", isValid = !1, openGroupCount = 0;
                            null === opts.regexTokens && function() {
                                var match, m, currentToken = new RegexToken(), opengroups = [];
                                for (opts.regexTokens = []; match = opts.tokenizer.exec(opts.regex); ) switch ((m = match[0]).charAt(0)) {
                                  case "(":
                                    opengroups.push(new RegexToken(!0));
                                    break;

                                  case ")":
                                    groupToken = opengroups.pop(), opengroups.length > 0 ? opengroups[opengroups.length - 1].matches.push(groupToken) : currentToken.matches.push(groupToken);
                                    break;

                                  case "{":
                                  case "+":
                                  case "*":
                                    var quantifierToken = new RegexToken(!1, !0), mq = (m = m.replace(/[{}]/g, "")).split(","), mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]), mq1 = 1 === mq.length ? mq0 : isNaN(mq[1]) ? mq[1] : parseInt(mq[1]);
                                    if (quantifierToken.quantifier = {
                                        min: mq0,
                                        max: mq1
                                    }, opengroups.length > 0) {
                                        var matches = opengroups[opengroups.length - 1].matches;
                                        (match = matches.pop()).isGroup || ((groupToken = new RegexToken(!0)).matches.push(match), 
                                        match = groupToken), matches.push(match), matches.push(quantifierToken);
                                    } else (match = currentToken.matches.pop()).isGroup || ((groupToken = new RegexToken(!0)).matches.push(match), 
                                    match = groupToken), currentToken.matches.push(match), currentToken.matches.push(quantifierToken);
                                    break;

                                  default:
                                    opengroups.length > 0 ? opengroups[opengroups.length - 1].matches.push(m) : currentToken.matches.push(m);
                                }
                                currentToken.matches.length > 0 && opts.regexTokens.push(currentToken);
                            }(), cbuffer.splice(pos, 0, chrs), bufferStr = cbuffer.join("");
                            for (var i = 0; i < opts.regexTokens.length; i++) {
                                var regexToken = opts.regexTokens[i];
                                if (isValid = validateRegexToken(regexToken, regexToken.isGroup)) break;
                            }
                            return isValid;
                        },
                        cardinality: 1
                    }
                }
            }
        }), Inputmask;
    });
}, function(module, exports, __webpack_require__) {
    "use strict";
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    !function(factory) {
        __WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(2), __webpack_require__(1) ], 
        void 0 !== (__WEBPACK_AMD_DEFINE_RESULT__ = "function" == typeof (__WEBPACK_AMD_DEFINE_FACTORY__ = factory) ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__) && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__);
    }(function($, Inputmask) {
        return void 0 === $.fn.inputmask && ($.fn.inputmask = function(fn, options) {
            var nptmask, input = this[0];
            if (void 0 === options && (options = {}), "string" == typeof fn) switch (fn) {
              case "unmaskedvalue":
                return input && input.inputmask ? input.inputmask.unmaskedvalue() : $(input).val();

              case "remove":
                return this.each(function() {
                    this.inputmask && this.inputmask.remove();
                });

              case "getemptymask":
                return input && input.inputmask ? input.inputmask.getemptymask() : "";

              case "hasMaskedValue":
                return !(!input || !input.inputmask) && input.inputmask.hasMaskedValue();

              case "isComplete":
                return !input || !input.inputmask || input.inputmask.isComplete();

              case "getmetadata":
                return input && input.inputmask ? input.inputmask.getmetadata() : void 0;

              case "setvalue":
                $(input).val(options), input && void 0 === input.inputmask && $(input).triggerHandler("setvalue");
                break;

              case "option":
                if ("string" != typeof options) return this.each(function() {
                    if (void 0 !== this.inputmask) return this.inputmask.option(options);
                });
                if (input && void 0 !== input.inputmask) return input.inputmask.option(options);
                break;

              default:
                return options.alias = fn, nptmask = new Inputmask(options), this.each(function() {
                    nptmask.mask(this);
                });
            } else {
                if ("object" == (void 0 === fn ? "undefined" : _typeof(fn))) return nptmask = new Inputmask(fn), 
                void 0 === fn.mask && void 0 === fn.alias ? this.each(function() {
                    if (void 0 !== this.inputmask) return this.inputmask.option(fn);
                    nptmask.mask(this);
                }) : this.each(function() {
                    nptmask.mask(this);
                });
                if (void 0 === fn) return this.each(function() {
                    (nptmask = new Inputmask(options)).mask(this);
                });
            }
        }), $.fn.inputmask;
    });
} ]);
;function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

;
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