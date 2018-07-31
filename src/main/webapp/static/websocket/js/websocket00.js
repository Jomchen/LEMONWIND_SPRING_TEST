var sockJsClient = new SockJS("/my_stomp_socket");
var stompClient = Stomp.over(sockJsClient);
stompClient.connect(
    {},
    function(frame) {
        console.log("websocket00 连接打开了。。。" + frame);
        stompClient.subscribe("/topic/subscript00", function(data) {
            $(".text_content").append("<p>/topic/subscript00 接到信息为：" + data.body + "</p>");
        });
    },
    function(frame) {
        console.log("websocket00 连接断开了。。。" + frame);
    }
);

$(function () {
    $(".websocket_anniu").click(function() {
        var sendData = prompt("您要传的信息为：", "websocket00");
        stompClient.send("/app/stomp/handle00", {}, sendData);
    });

    $(".ajax_anniu").click(function() {
        alert("kkkk");
        $.ajax({
            url: "/WebSocketController/ajax/websocket/test00",
            type: "POST",
            dataType: "json",
            data: {
                "name": "有梦的人"
            },
            success: function(data) {
                alert("ajax请求成功，返回数据为：" + data)
            },
            error: function(error) {
                alert("ajax请求错误，错误数据为：" + error)
            }
        });
    });
});