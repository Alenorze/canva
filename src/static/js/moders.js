$(function () {
   // When we're using HTTPS, use WSS too.
   var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
   var ws_path = ws_scheme + '://' + window.location.host + '/ws/moders/';
   console.log("Connecting to " + ws_path)

    const modersWSB = new channels.WebSocketBridge();

   	modersWSB.connect(ws_path);
    console.log("Connected ");
    ///webSocketBridge.listen() ;
    modersWSB.listen(function(action, stream) {
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
            if (action.run=='chatroom.refresh'){
                //To send messages, use the send method
                //console.log("SEND sysnotice.refresh");
            	modersWSB.send({
                    type: 'chatroom.refresh',
                    //prop2: 'value1'
                });
                return;
            }

            if (action.run=='moders.count'){
//                if (action.count==0) { action.count = ""; }
//                $('.js-pro-requests-count-new').html(action.count);
            	var keys = [
            	            "tender_count",
            	            "profile_count",
            	            "license_count",
            	            "ticket_count",
            	            "profile_ticket_count",
            	            "review_count"
            	            ]
            	$.each(keys, function(k, v){
            		var count = action[v], badge_class = '.js-'+v.replace('_', '-')+'-new';
//            		alert(badge_class)
            		if(count==0)count = '';
            		$(badge_class).html(count).closest('li').addClass(count!=0?'alerted':'');
            	})
                return;
            }
        }
        console.log("Cannot handle action!");
    });

    // // Helpful debugging
    modersWSB.socket.addEventListener('open', function() {
        console.log("Connected to moders socket");
    });

    modersWSB.socket.addEventListener('close', function() {
        console.log("Disconnected to moders socket");
    });
});
