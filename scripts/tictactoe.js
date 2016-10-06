var tictactoe = {

	boardState : (function(){ return new Array(9).fill(null)})(),
	boardCount : 4,

	o : '<svg><circle cx="30" cy="30" r="25" /></svg>',
	x : '<svg><line x1=5 y1=5 x2=55 y2=55 /> \
			 <line x1=5 y1=55 x2=55 y2=5 /></svg>',
	user : 'x',
	comp : 'o',
	
	onWindowLoad : function(){
		tictactoe.stop();
	},

	stop : function() {
		document.getElementById('board').className += ' dimmed'; 
		document.getElementById('display').className =
			document.getElementById('display').className.replace(' dimmed','');

		document.getElementById('radio-x')
			.addEventListener('click',tictactoe.chooseSign,false);
		document.getElementById('radio-o')
			.addEventListener('click',tictactoe.chooseSign,false);
		document.getElementById('board')
			.removeEventListener('click',tictactoe.turn1 ,false);
	},

	start : function() {
		document.getElementById('display').className += ' dimmed';
		document.getElementById('board').className =
			document.getElementById('board').className.replace(' dimmed','');

		document.getElementById('radio-x')
			.removeEventListener('click',tictactoe.chooseSign,false);
		document.getElementById('radio-o')
			.removeEventListener('click',tictactoe.chooseSign,false);
		document.getElementById('board')
			.addEventListener('click',tictactoe.turn1 ,false);
	},

	turn1 : function(e){
		var bs = e.target.id.slice(-1);
		if( tictactoe.boardState[bs] != null )
			return;

		tictactoe.draw(bs, tictactoe[tictactoe.user], tictactoe.user );

		setTimeout(tictactoe.turn2,1000);
		
	},

	turn2 : function(){
		var bs;
		
		while( true ){
			bs = Math.floor(Math.random() * 9);
			if( tictactoe.boardState[bs] == null ){
				break;
			}
		}

		tictactoe.draw(bs, tictactoe[tictactoe.comp], tictactoe.comp);
				
		tictactoe.boardCount--;
		
		if( tictactoe.boardCount == 0 )
			setTimeout(tictactoe.turn3,500);
	},

	turn3 : function() {

		var bs = tictactoe.boardState.findIndex(function(el){
			return el === null;
		});
		
		tictactoe.draw(bs, tictactoe[tictactoe.user], tictactoe.user );
		tictactoe.stop();
	},

	chooseSign : function(e){
		console.log('choose sign');
		var sgn = e.target.id.slice(-1);
		if( sgn == "x" ){
			tictactoe.user = 'x';
			tictactoe.comp = 'o';
		}else if( sgn == "o" ){
			tictactoe.user = 'o';
			tictactoe.comp = 'x';
		}
		tictactoe.redraw();
		tictactoe.start();
	},

		
	draw : function(nr, placeSign, boardSign){
		document.getElementById('place'+ nr ).innerHTML = placeSign
		tictactoe.boardState[nr] = boardSign;
	},
	

	redraw : function(){
		
		for(var i = 0; i < 9; i++){
			document.getElementById('place'+i).innerHTML = "";
		}
		tictactoe.boardState.fill(null);
		tictactoe.boardCount = 4;
	}
	
}
window.onload = tictactoe.onWindowLoad;
