

$('body').on('click', '.js-messages-story-mark-as-read', function(event) {
    var $this = $(this);
    var goto_link = $this.data('url');
    $.post(goto_link);
    $this.closest('.messages-story-item').find('.badge-secondary').remove();  
    $this.remove();
});

$('body').on('click', '.js-messages-story-read', function(event) {
    // var $this = $(this);
    // var goto_link = $this.data('url');
    // var message_title = $this.data('title');
    // var message_content = $this.data('content');    
    // $.dialog({
    //     title: message_title,
    //     content: message_content,
    //     closeIcon: true,
    //     closeIconClass: 'fas fa-xs fa-fw fa-times',
    //     onOpen: function () {
    //         // after the modal is displayed.
    //         $.post(goto_link);
    //         $this.closest('.messages-story-item').find('.badge-secondary').remove();
    //     },
    // });
    $('#js-modal .modal-title').text($(this).data('title')||'Message');
        $('#js-modal .modal-body').html('<div class="open-sans-16 margBot30 text-dark-blue">'+$(this).data('content')+'</div>');
        $.post($(this).data('url'));
        $('#js-modal').modal('show');
        $(this).closest('.crm-item').find('.img-wrapper .btn, .team-img-wrapper .btn, .request-badge').remove();
        return false;
});

$('body').on('click', '.js-messages-story-to-archive', function(event) {
    var $this = $(this);
    var goto_link = $(this).data('url');

    $.confirm({
        title: 'Are you sure?',
        content: 'Are you sure you want send message to archive?',
        closeIcon: true,
        closeIconClass: 'fas fa-xs fa-fw fa-times',
        buttons: {
            confirm: {
                text: 'Send to archive',
                btnClass: 'btn-red',
                keys: [
                    'enter',
                ],
                action: function () {
                    $.post(goto_link);
                    $this.closest('.messages-story-item').animate({
                          // "opacity": "0",
                          // "transform": "rotateX(-90deg)",
                          // "transition": "all 0.5s cubic-bezier(.36,-0.64,.34,1.76)",
                          "background-color": "#f8f9fa",
                          "-webkit-animation": "disapear 1s",
                          "-webkit-animation-fill-mode": "forwards",
                          "animation": "disapear 1s",
                          "animation-fill-mode": "forwards",
                        }, 600, function() {
                        /* stuff to do after animation is complete */
                        this.remove();
                        $('.crm-right-content .list-group').ajaxReload();
                    });

                }
            },
            cancel: function () {
            //close
            },
        }
    });
});


$(function () {
   // When we're using HTTPS, use WSS too.
   var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
   var ws_path = ws_scheme + '://' + window.location.host + '/ws/chatmessages/';
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
                $('.js-chatmessages-count-new').html(action.count).closest('li').addClass(action.count!=0?'alerted':'');
                return;
            }
        }

        console.log("Cannot handle action!");

    });


    // // Helpful debugging
    chatmessagesWSB.socket.addEventListener('open', function() {
        console.log("Connected to chatmessages socket");
    });
    chatmessagesWSB.socket.addEventListener('close', function() {
        console.log("Disconnected to chatmessages socket");
    });
});
