;
    var SITE = {
        isAnonymous: false,
        userId: 8,
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

  if (current_index == (sections.length - 1)) {
    $(this).prop('disabled', true);
    $('.js-tender-form').submit();
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
          "<li class='js-item-remove'><span>" + $.trim(multi_question) + ":</span>" + multi_answers + "</li>"
        );
      } else {
        for (var y = 0; y < inputs.length; y++) {
          var current_input = inputs[y];
          if (current_input.type == 'radio' && $(current_input).is(':checked')) {
            var text = $(current_input).parent().text();
            var name = current_input.name.split('__')[0]
            result_container.append(
              "<li class='js-item-remove'><span>" + $.trim(name) + ":</span> " + text + "</li>"
            );
          } else if ($(current_input).is('textarea') && $.trim($(current_input).val())) {
            var name = 'Comment';
            result_container.append(
              "<li><span>" + $.trim(name) + ":</span> " + $(current_input).val() + "</li>"
            );
          } else if (current_input.type == 'text' && $.trim($(current_input).val())) {
            var name = current_input.name.split('__')[0]
            result_container.append(
              "<li class='js-item-remove'><span>" + $.trim(name) + ":</span> " + $(current_input).val() + "</li>"
            );
          } else if (current_input.type == 'checkbox' && $(current_input).is(':checked')) {
            var text = $(current_input).parent().text();
            result_container.append(
              "<li class='js-item-remove'><span>" + $.trim(text) + ":</span> " + 'Yes' + "</li>"
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
var autocomplete;
function initAutocomplete(ids) {
	if(!ids)
		ids = ['js-location', 'id_latitude', 'id_longitude'];
	var types = 'geocode';
	if($('.js-tender-form tender-form').length)
		types = '(cities)';
  // Create the autocomplete object, restricting the search to geographical
  // location types.
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
})
/*==========================================================================*/
/*============= DISPLAY TENDER DETAILS =====================================*/
/*==========================================================================*/
$('body').on('click', '.js-tender-detail-btn', function(event) {
  event.preventDefault();
  $.ajax({
    type: "GET",
    url: this.href,

    success: function(data) {
        $('#js-modal-lg .modal-body').html(data.html);
        $('#js-modal-lg #js-modal-lg-label').text('Request information');
        $('#js-modal-lg').modal('show')
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
  $.ajax({
    type: "GET",
    url: this.href,

    success: function(data) {
        $('#js-modal .modal-body').html(data.html);
        $('#js-modal #js-modal-label').text('Remove professional from my team');
        $('#js-modal').modal('show')
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
        $this.closest('.js-team-client-item').remove();

        if ($this.closest('.js-team-container:empty')) {
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
      'timepicker': false
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
		}
}

window.after_callbacks = {
		'.js-location-form':function(frm, html){
			$('.js-locations').html(html);
		},
		'.js-reject-form':function(frm){
			$('.js-list-item[data-id='+frm.data('id')+']').remove();
		},
		'js-ticket-answer-form, js-ticket-resend-form, .js-report-approve-form, .js-suspend-review, .js-mark-complete, .js-correct-form, .js-license-form, .js-profile-approve':function(frm){
			$('.js-list-item[data-id='+frm.data('id')+']').remove();
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
			var item = $('.js-list-item[data-id='+frm.data('id')+']');
			$.get(item.data('list-url'), function(d){
				item.replaceWith($(d))
			})
		},
		'.js-code-verify-form':function(frm){
			$.alert('Your phone successfully verified');
			$('.js-verify-phone').attr('disabled', 'disabled');
		},
		'.js-password-form':function(frm){
//			location.reload()
		}
}

window.spin = '<i class="fa fa-spinner fa-spin" id="spinner" style="font-size:24px"></i>';

$(document).on('click', '.js-form-modal', function(){
	var t = $(this);
	$('#js-modal-lg .modal-body')
		.html('<div class="text-center">'+window.spin+'</div>');
	$('#js-modal-lg .modal-title').html('');
	$('#js-modal-lg').modal('show');
	$.ajax({
		type:'GET',
		url:$(this).data('url'),
		success:function(data){
			$('#js-modal-lg .modal-title').html(
				$(data).find('legend').html()
			);
			$('#js-modal-lg .modal-body').html(data);
			$('#js-modal-lg .modal-body').find('legend').remove();
			if(t.data('id'))
				$('#js-modal-lg .modal-body form').attr('data-id', t.data('id'));
			$.each(window.callbacks, function(i,v){
				if($('#js-modal-lg .modal-body form').is(i))
					v();
			});
		}
	});
	return false;
});

$(document).on('submit', '#js-modal-lg .modal-body .js-ajax-form', function() {
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
			$(window.spin).insertBefore(t.find('button[type=submit]'));
			$('<input type="hidden" name="csrfmiddlewaretoken" value="'+cs+'">')
			.appendTo('#js-modal-lg .modal-body .js-ajax-form');
		},
		success:function(data){
			if(!data['success']){
				$('#js-modal-lg .modal-body').html(data['html']);
				$('#js-modal-lg .modal-body').find('legend').remove();
				$.each(window.callbacks, function(i,v){
					if($('#js-modal-lg .modal-body form').is(i))
						v();
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
			$(window.spin).insertBefore(t.find('button[type=submit]'));
			$('<input type="hidden" name="csrfmiddlewaretoken" value="'+cs+'">')
			.appendTo('.js-ajax-inline-form');
		},
		success:function(data){
			if(!data['success']){
				t.closest('.js-inline-container').html(data['html']);
			}
			else{
				t.find('fieldset').removeAttr('disabled');
				$('#spinner').remove();
				t.resetForm();
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
		data:frm.serialize(),
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
	        			if(t.is('.js-delete-link'))
	        				t.closest('.js-list-item').remove();
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
        if (!$('div[id*="js-transaction-item-"').length) {
          $('.js-transactions').html(
            "<p>You have no transactions yet.</p>"
          )
        };
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
        $('#js-modal-lg .modal-body').html(data.html);
        $('#js-modal-lg #js-modal-lg-label').text('Role details');
        $('#js-modal-lg').modal('show');
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
        $('#js-modal-lg #js-modal-lg-label').text('Attach new role');
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
      'timepicker': false
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
        $('#js-modal-lg #js-modal-lg-label').text('Edit role');
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
        $('#js-modal #js-modal-label').text('Delete role');
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

        if ($('.js-contacts-container').is(':empty')) {
          $('.js-contacts-container').prepend(
            '<div>You have not added any contact yet.</div>'
          )
        };
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
        $('#js-modal-lg #js-modal-lg-label').text('Add new diary event');
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

        $this.closest('.js-team-client-item').remove();
        if ($this.closest('.js-team-container:empty')) {
          $('.js-team-container').html(
              '<p>You have no clients yet</p>'
          )
        }
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
        $('#js-modal-lg #js-modal-lg-label').text('Add new log');
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
  $(this).prop('disabled', true);
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
        $('#js-modal .modal-body').html(data.html);
        $('#js-modal #js-modal-label').text('My review');
        $('#js-modal').modal('show');
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
        $('#js-modal #js-modal-label').text('Update diary log');
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
        $('#js-modal #js-modal-label').text('Delete diary log');
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
  $(this).prop('disabled', true);
});
/*==========================================================================*/
/*========== PROBLEM REVIEW BTN ============================================*/
/*==========================================================================*/
$('body').on('click', '.js-problem-review-btn', function(event) {
  event.preventDefault();

  $.ajax({
    type: "GET",
    url: $(this).data('url'),

    success: function(data) {
        $('#js-modal .modal-body').html(data.html)
        $('#js-modal #js-modal-label').text('Start dispute');
        $('#js-modal').modal('show');
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});

$('body').on('submit', '.js-problem-review-form', function(event) {
  event.preventDefault();
  $('.js-problem-review-form button[type="submit"]').prop('disabled', true);

  $.ajax({
    type: this.method,
    url: this.action,
    data: $(this).serializeArray(),

    success: function(data) {
        $('#js-modal .modal-body').html(data.html);
    },

    error: function(xhr) {
        console.log('d"oh');
    }
  });
});
