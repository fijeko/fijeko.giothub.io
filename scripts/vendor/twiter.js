<script src="../scripts/vendor/twiter.js"></script>
            <script async
    src="https://platform.twitter.com/widgets.js"
    charset="utf-8"
    type="text/javascript" >
</script>    

(function() {
  if (window.__twitterIntentHandler) return;
  var intentRegex = /twitter\.com\/intent\/(\w+)/,
      windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes',
      width = 550,
      height = 420,
      winHeight = screen.height,
      winWidth = screen.width;

  function handleIntent(e) {
    e = e || window.event;
    var target = e.target || e.srcElement,
        m, left, top;

    while (target && target.nodeName.toLowerCase() !== 'a') {
      target = target.parentNode;
    }

    if (target && target.nodeName.toLowerCase() === 'a' && target.href) {
      m = target.href.match(intentRegex);
      if (m) {
        left = Math.round((winWidth / 2) - (width / 2));
        top = 0;

        if (winHeight > height) {
          top = Math.round((winHeight / 2) - (height / 2));
        }

        window.open(target.href,
            'intent', windowOptions +
            ',width=' + width + ',height=' + height +
            ',left=' + left + ',top=' + top);
        e.returnValue = false;
        e.preventDefault && e.preventDefault();
      }
    }
  }

  if (document.addEventListener) {
    document.addEventListener('click', handleIntent, false);
  } else if (document.attachEvent) {
    document.attachEvent('onclick', handleIntent);
  }
  window.__twitterIntentHandler = true;
}());

window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);

  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };

  return t;
}(document, "script", "twitter-wjs"));

//~ twttr.widgets.load( element );

//~ twttr.widgets.createShareButton(
    //~ '/',
    //~ document.getElementById('twit'),
    //~ {
        //~ count: 'none',
        //~ text: 'FreeCodeCamp project',
        //~ size: 'large',
        //~ url: 'https://fijeko.github.io',
        //~ hashtags : 'FreeCodeCamp',
        //~ dnt: true,
        //~ 'show-count': false
    //~ }
//~ )
//~ .then(function(el){
    //~ console.log("Button created.")
//~ });

//~ 
//~ <a href="https://twitter.com/share" class="twitter-share-button" data-show-count="false">Tweet</a><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
//~ 
//~ <a href="https://twitter.com/undefined" class="twitter-follow-button" data-show-count="false">Follow @undefined</a><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
