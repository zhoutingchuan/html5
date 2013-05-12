/**
 * Basic event handling object
 * @type {Object}
 * @date 2012-03-15
 * @author Eyson
 */

$(document).ready(function(){


var eventjs = {
    //添加事件
    bind: function(elem, type, handler){
        if (elem.addEventListener) {
            elem.addEventListener(type, handler, false);
        } else if(elem.attachEvent){
            //IE
            elem.attachEvent("on" + type, handler);
        }else{
            elem["on" + type] = handler;
        };
    },
    getDirection: function(event){
        var keyCode = event.which || event.keyCode;
        switch(keyCode){
            case 37:
                return 'left';
                break;
            case 39:
                return 'right';
                break;
        }
    }
};
(function(){
    // canvas
    var canvas = document.getElementById('demo');
    var ctx = canvas.getContext('2d');

    //player base
    var playerImage = new Image();
    playerImage.src = 'img/go.png';
    var player = {
        x: 50,       // 在canvas中的坐标
        y: 0,
        imageX: 0,  // 图像定位坐标
        imageY: 0,
        width: 50,  // 图像显示区域大小
        height: 60,
        stop: true  // 是否停止
    };

    function clean () {
        // clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function playerInit () {
        // init player
        playerImage.onload = _drawPlayer;
    }

    function playerMove (value) {
        if('right' === value){
            // move right
            if (player.stop) {
                player.imageX += 50;
            }else{
                player.imageX = 0;
            }
            if (player.imageX >= 150) {
                player.imageX = 0;
            };
            // player move speed
            player.x += 5;
            player.imageY = 0;

        } else if ('left' === value){
            // move left
            if (player.stop) {
                player.imageX += 50;
            }else{
                player.imageX = 0;
            }
            if (player.imageX >= 150) {
                player.imageX = 0;
            };
            // player move speed
            player.x -= 5;
            player.imageY = 60;
        };

        clean();
        _drawPlayer();
    }

    function playerJump (value) {
        // player jump
    }

    function _drawPlayer () {
        // draw player image
        ctx.drawImage(playerImage, player.imageX, player.imageY, player.width, player.height, player.x, canvas.height - player.height, player.width, player.height);
    }

    function playerAction (value) {
        var posX = 0;
        var posY = 0;
        // console.log(player.x);
        switch(value){
            case 'up':
                playerJump();
                break;
            case 'right':
                posX = player.x + player.width;
                if (posX >= canvas.width) {
                    return;
                };
                //player.x += 5;
                playerMove(value);
                break;
            case 'down':
                break;
            case 'left':
                if (player.x < 5) {
                    return;
                };
                //player.x -= 5;
                playerMove(value);
                break;
        };
        // console.log(player.x);
        return {x: player.x, y: player.y};
    }

    //init canvas
    var init = (function(options){
        options = options || {};
        canvas.width = options.width || 500;
        canvas.height = options.height || 300;

        //init draw rect
        playerInit();

        //bind user event
        eventjs.bind(document, 'keydown', function(event){
            var d = eventjs.getDirection(event);
            player.stop = true;
            playerAction(d);
        });
        eventjs.bind(document, 'keyup', function(event){
            var d = eventjs.getDirection(event);
            player.stop = false;
            playerAction(d);
        });
    })({width:800, height:400});

})();

});
