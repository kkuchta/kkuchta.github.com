// Inject jquery if it's not present already.
if( typeof $ === 'undefined' && typeof jQuery === 'undefined' ){
    var script=document.createElement('script');
    script.setAttribute( 'src', 'http://code.jquery.com/jquery-latest.min.js' );
    script.setAttribute( 'onload', 'jQuery(function(){init(jQuery)});' );
    var head=document.getElementsByTagName('head')[0];
    head.appendChild(script);
    console.log("added");
}
else{
    jQuery(function(){init(jQuery)});
}

// Called after jquery is loaded
function init(){
    console.log("Initializing");

    $(function(){
        $('body').spSwitcher('http://freezing-mountain-6233.heroku.com/');
    });

    /****************** Plugin Code *****************/
    (function( $ ) { $.fn.spSwitcher = function( url ) {
        var setBackground = function(i){
            var item = $(spSwitcher.items[i]);
            var content = item.find('encoded').first();
            var contentDocument = $(content.text());

            // New format
            var url = contentDocument.find('img').attr('src');
            
            // Old format
            if( !url ){
                url = 'http://subtlepatterns.com/' + contentDocument.find('a.download').attr('href');
            }
            console.log("url=", url );
            window.spSwitcher.target.css('background','url(' + url + ')' );
        };
        window.spSwitcher = {
            target: this,
            next: function(){
                spSwitcher.index++;
                if( spSwitcher.index >= spSwitcher.items.length ){
                    console.log("wrapping around");
                    spSwitcher.index = 0;
                }
                console.log( "index = " + spSwitcher.index );
                setBackground(spSwitcher.index);
            },
            previous: function(){
                spSwitcher.index--;
                if( spSwitcher.index < 0 ){
                    console.log("wrapping around");
                    spSwitcher.index = spSwitcher.items.length-1;
                }
                console.log( "index = " + spSwitcher.index );
                setBackground(spSwitcher.index);
            }
        };
        $(document).keyup( function(e){
            if( e.which == 37 ){
                spSwitcher.previous();
            }
            else if( e.which == 39 ){
                spSwitcher.next();
            }
        });
        $.ajax({
            url: url,
            success: function(data){
                var items = $(data).find('item');
                window.spSwitcher.items= items.toArray();
                window.spSwitcher.index= 0;
                //window.spSwitcher.next();
            },
            error: function(){
                console.log( "Failed to load subtle patterns xml." );
            }
        });
        //$(this).css('background','url(http://subtlepatterns.com/patterns/tex2res3.png)');

    };})( jQuery );
}

