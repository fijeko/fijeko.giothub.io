$(document).ready(function(){

    var quotes;
    var urlId = 'https://api.myjson.com/bins/30ub2';

    !function(d,s,id){
        var js;
        var fjs=d.getElementsByTagName(s)[0];
        var p = /^http:/.test(d.location) ? 'http' : 'https';
        if(!d.getElementById(id)){
            js=d.createElement(s);
            js.id=id;
            js.src=p+'://platform.twitter.com/widgets.js';
            fjs.parentNode.insertBefore(js,fjs);
        }
    }(document, 'script', 'twitter-wjs'); 


    $.get(urlId, function(json,textStatus,jqXHR){
        quotes = json;
    });

    $('#d_msg,#b_msg').click(rqGetJson);

    function rqGetJson(e){
        var rnum = Math.floor(Math.random() * quotes.length);
        console.log(rnum);
        $("#p_msg").html(quotes[rnum].quote);
        $("#s_msg").html(quotes[rnum].author);
    };
})
