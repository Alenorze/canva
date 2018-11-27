$(function () {
   // When we're using HTTPS, use WSS too.
   var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
   var ws_path = ws_scheme + '://' + window.location.host + '/ws/pro-requests/';
   console.log("Connecting to " + ws_path)

    const chatmessagesWSB = new channels.WebSocketBridge();

    chatmessagesWSB.connect(ws_path);
    console.log("Connected ");
    ///webSocketBridge.listen() ;
    chatmessagesWSB.listen(function(action, stream) {
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
                chatmessagesWSB.send({
                    type: 'chatroom.refresh',
                    //prop2: 'value1'
                });
                return;
            }

            if (action.run=='refresh.count'){
                if (action.count==0) { action.count = ""; }
                $('.js-pro-requests-count-new').html(action.count).closest('li').addClass(action.count!=0?'alerted':'');
                return;
            }
        }
        console.log("Cannot handle action!");
    });

    // // Helpful debugging
    chatmessagesWSB.socket.addEventListener('open', function() {
        console.log("Connected to pro-requests socket");
    });

    chatmessagesWSB.socket.addEventListener('close', function() {
        console.log("Disconnected to pro-requests socket");
    });
});
