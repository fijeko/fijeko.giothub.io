



$(document).ready(function() {

    $("#ask").click(userSearch);
    $('#srci').change(userSearch);

    function userSearch(){
        var userAsk = $('#srci').val();
        if(userAsk != "") {
            var userStop = userGet(userAsk);
            $('#srci').val("");
            loadWiki(userAsk,userStop);
        } else {
            document.getElementById('wiki').innerHTML = "";
        }
    }

    function userGet (userStr) { 
        return userStr.replace(/.$/, function(x){
            return String.fromCharCode(x.charCodeAt(0)+1);
        });
    };

    function loadWiki(srFromTxt,srToTxt) {
        $.ajax({
            data: {
                action: 'query',
                format: 'json',
                prop: 'revisions\|extracts',
                exintro: '1',
                exlimit: '10',
                generator: 'allpages',
                gapfilterredir: 'nonredirects',
                gaplimit: '10',
                gapfrom: srFromTxt,
                gapto: srToTxt
            },
        });
    };
  
    $(document).ajaxSuccess(function(event,jqxhr,options,response) {
        if(response.query) {
            var needThis = Object.keys(response.query.pages);
            needThis.forEach(function(elem,index){
                $('#wiki').append( responseParagraf(
                    response.query.pages[elem]['title'],
                    response.query.pages[elem]['pageid'],
                    response.query.pages[elem]['extract'])
                );
            });
        } else {
            $('#wiki').append(
                '<p class="text-info">No matched titles</p><hr>');
        }
    });

    $(document).ajaxSend(function() {
        $("body").css("cursor", "wait");
        var x = document.getElementById('wiki').innerHTML = "";
    });

    $(document).ajaxComplete(function(){
        $("body").css("cursor","default");
    });
    
    $.ajaxSetup({
        url: "https://en.wikipedia.org/w/api.php",
        dataType: "jsonp",
    });

    function responseParagraf(title,id,extract) {
        return '<h4>' + title +
            ' <a class="button" target="_blank"' +
            'href="http://en.wikipedia.org/w/index.php?curid=' + 
            id + '">-&gt;</a></h4><p>' + extract + '</p><hr>';
    };
    
});
