$(document).ready(function(){
    $('#btnSixth').click(function(){
        $('#btnSixth > .glyphicon-plus-sign').toggleClass('hide');
        $('#btnSixth > .glyphicon-minus-sign').toggleClass('hide');
        $('#sixthList').slideToggle();
    });
    $('#btnDorm').click(function(){
        $('#btnDorm > .glyphicon-plus-sign').toggleClass('hide');
        $('#btnDorm > .glyphicon-minus-sign').toggleClass('hide');
        $('#dormList').slideToggle();
    });
    $('#btnLove').click(function(){
        $(this).toggleClass('glyphicon-heart-empty');
        $(this).toggleClass('glyphicon-heart');
    });
});