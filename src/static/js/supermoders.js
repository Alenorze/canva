$(function () {
   // When we're using HTTPS, use WSS too.
   var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
   var ws_path = ws_scheme + '://' + window.location.host + '/ws/supermoders/';
   console.log("Connecting to " + ws_path)

    const supermodersWSB = new channels.WebSocketBridge();

   supermodersWSB.connect(ws_path);
    console.log("Connected ");
    ///webSocketBridge.listen() ;
    supermodersWSB.listen(function(action, stream) {
        //console.log(action, stream);
        // Decode the JSON
        //console.log("Got websocket stream", stream);
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
            	supermodersWSB.send({
                    type: 'chatroom.refresh',
                    //prop2: 'value1'
                });
                return;
            }

            if (action.run=='supermoders.count'){
//                if (action.count==0) { action.count = ""; }
//                $('.js-pro-requests-count-new').html(action.count);
            	var keys = [
            	            "ticket_super_count",
            	            "review_super_count"
            	            ]
            	$.each(keys, function(k, v){
            		var count = action[v], badge_class = '.js-'+v.replace(/_/g, '-')+'-new';
            		if(count==0)count = '';
            		$(badge_class).html(count).closest('li').addClass(count!=0?'alerted':'');
            	})
                return;
            }
        }
        console.log("Cannot handle action!");
    });

    // // Helpful debugging
    supermodersWSB.socket.addEventListener('open', function() {
        console.log("Connected to supermoders socket");
    });

    supermodersWSB.socket.addEventListener('close', function() {
        console.log("Disconnected to supermoders socket");
    });
});
