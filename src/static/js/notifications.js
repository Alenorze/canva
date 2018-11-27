

$('.js-notification-mark-all-as-read').on('click', function () {

    var goto_link = $(this).data('url');

    $.confirm({
        title: 'Are you sure?',
        content: 'Are you sure you want to mark all unread notifications as read?',
        closeIcon: true,
        closeIconClass: 'fas fa-xs fa-fw fa-times',
        buttons: {
            confirm: {
                text: 'Mark all notification as read',
                btnClass: 'btn-blue',
                keys: [
                    'enter',
                ],
                action: function () {
                    location.replace(goto_link);
                }
            },
        }
    });
});


$(function () {
   // When we're using HTTPS, use WSS too.
   var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
   var ws_path = ws_scheme + '://' + window.location.host + '/ws/notifications/';
   var ws_notice = "notices-user-" + SITE.userId;
   console.log("Connecting to " + ws_path)

    const notificationsWSB = new channels.WebSocketBridge();

    notificationsWSB.connect(ws_path);
    console.log("Connected ");
    ///webSocketBridge.listen() ;
    notificationsWSB.listen(function(action, stream) {
        //console.log(action, stream);
        // Decode the JSON
        //console.log("Got websocket stream", stream);
        console.log("Got websocket message", action);
        // console.log(action, stream);

        // Handle errors
        if (action.error) {
            alert(action.error);
            return;
        }
        // Handle run
        if (action.run) {
            if (action.run=='sysnotice.refresh'){
                //To send messages, use the send method
                //console.log("SEND sysnotice.refresh");
                notificationsWSB.send({
                    type: 'sysnotice.refresh',
                    //prop2: 'value1'
                });
                return;
            }

            if (action.run=='refresh.count'){
                if (action.count==0) { action.count = ""; }
                $('.js-notifications-count-new').html(action.count).closest('li').addClass(action.count!=0?'alerted':'');
                return;
            }
        }

        console.log("Cannot handle action!");

    });


    // // Helpful debugging
    notificationsWSB.socket.addEventListener('open', function() {
        console.log("Connected to notification socket");
    });
    notificationsWSB.socket.addEventListener('close', function() {
        console.log("Disconnected to notification socket");
    });
});


// // Add new notifications
// function addNotification(notification) {
//   // If we have permission to show browser notifications
//   // we can show the notification
//   if (window.Notification && Notification.permission === 'granted') {
//     data = {
//       body: notification.message,
//       icon: notification.icon,
//       tag: 'notifications_' + notification.language,
//       url: notification.url
//     };
//     var note = new Notification(notification.title, data);
//     note.onclick = function () {
//       document.location = notification.url;
//     }
//   }
// }
