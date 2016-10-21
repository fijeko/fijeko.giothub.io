var ttt = new TTT();


// remember html element to draw and toggle events on it
function Board(cb, cp, bb) {
  var inboard = this;
  var board;
  var place;
  this.load = function () {
    board = document.getElementById('board');
    place = board.children;
    board.addEventListener('click', cb, false);
    for (var i = 0, j = place.length; i < j; i++) {
      place[i].addEventListener('click', cp, false);
      place[i].hasTTTevent = true;
    }
    document.getElementById('bug').addEventListener('click',bb,true);
  }
  this.paint = function (id,val) {
    place[id-1].classList.remove('clr-normal','clr-win','clr-draw');
    place[id-1].classList.add(val);
  }
  this.sign = function (id, sign) {
    place[id-1].innerHTML = sign;
  }
  this.remove = function (id) {
    if (place[id-1].hasTTTevent){
			place[id-1].removeEventListener('click', cp, false);
			place[id-1].hasTTTevent = false;
		}
  }
  this.add = function (id) {
    if (!(place[id-1].hasTTTevent)){
			place[id-1].addEventListener('click', cp, false);
			place[id-1].hasTTTevent = true;
		}
  }
  this.retBug = function(){
		var str = '';
		for(var i=1,j=place.length; i<j; i++){
			str += ( i + ':' + place[i].innerHTML + ';');
		}
		return str;
	};
}

// main function
function TTT() {
  var that = this;
  var local = {
    turn: [],
    redraw: false,
    draws: false,
    wins: false,
    path: false,
    user: 'X',
    comp: 'O'
  }
  var board = new Board(clickBoard, clickPlace, clickBug);
  
  window.onload = board.load;

  //submit a bug
  function clickBug(e){
		var x = board.retBug();
		document.getElementById('ups').innerHTML = x;
	};

  //  #board event: after #place-i event check and draw if wins draws or new game
  // toggle events on places
  function clickBoard(e) {
    if(local.redraw){
			local.redraw = false;
			local.turn = [];
			local.wins = false;
			local.draws = false;
			local.path = false;
      for(var i = 1,j=10; i<j; i++){
        board.add(i);
        board.paint(i,'clr-normal');
        board.sign(i,'');
      }
		}
		if(local.wins){
			for(var i = 1,j=10; i<j; i++){
        board.remove(i);
        if(local.wins.indexOf(i) != -1) {
					board.paint(i,'clr-win');
				}
      }
			local.redraw = true;
		}else if(local.draws){
			for(var i = 1,j=10; i<j; i++){
        board.remove(i);
        board.paint(i,'clr-draw');
      }
			local.redraw = true;
		}
  };
  
  // #place-i event check user find comp respons in logic() draw 'X' & 'O'
  // toggle events on places
  function clickPlace(e) {
    e = e.target.id.slice(-1);
    board.remove(e);
		board.sign(e,local.user);
		e = logic(e);
    if(e){
			board.sign(e,local.comp);
			board.remove(e);
		}
  }

  function logic(id) {
    id = parseInt(id)
    local.path = local.path || paths;

    local.path = local.path.find(function(val){
			return (val[0] == id) || (val[0] == '?');
		});

		local.turn.push(id);
		local.turn.push(local.path[1]);
		local.path = local.path[2];
		var t = local.turn.length;
		
	  if(local.path == 'W'){
			local.wins = [local.turn[1],local.turn[t-3],local.turn[t-1]];
		}else if(local.path == 'w'){
			local.wins = [local.turn[3],local.turn[t-3],local.turn[t-1]];
		}else if(local.path == 'D'){
			local.draws = true;
		}

		return local.turn[t-1];
  }
}
var paths = 
[
  [5, 7, [[1,9, [[8,2, [[4,6,'D'],['?',4,'D']]],['?',8,'W']]],
          [2,8, [[9,1, [[4,6,'D'],['?',4,'W']]],['?',9,'W']]],
          [3,9, [[8,2, [[4,6,'D'],['?',4,'D']]],['?',8,'W']]],
          
					[4,6, [[9,1, [[8,2,'D'],['?',8,'D']]],
                 [3,9, [[8,2,'D'],['?',8,'W']]],
                 [8,2, [[1,9,'D'],['?',1,'D']]],
                 [2,8, [[9,1,'D'],['?',9,'W']]],
						     [1,9, [[8,3,'w'],['?',8,'W']]]]],//897  ne valja wins bojanje:396
						     
					[6,4, [[1,9, [[8,2,'D'],['?',8,'W']]],['?',1,'W']]],
					
          [8,2, [[1,9, [[4,6,'D'],['?',4,'D']]],
                 [3,1, [[4,6,'D'],['?',4,'W']]],
                 [4,6, [[9,1,'D'],['?',9,'D']]],
                 [6,4, [[1,9,'D'],['?',1,'W']]],
						     [9,1, [[4,3,'w'],['?',4,'W']]]]],//417  ne valja wins bojanje:312
						     
          [9,1, [[4,6, [[2,8,'D'],['?',2,'D']]],['?',4,'W']]]]],
  [1, 5, [[2,3, [[7,4, [[6,9,'D'],['?',6,'W']]],['?',7,'W']]],
          [3,2, [[8,4, [[6,9,'D'],['?',6,'W']]],['?',8,'W']]],
          [4,7, [[3,2, [[8,9,'D'],['?',8,'W']]],['?',3,'W']]],
          [6,3, [[7,4, [[8,9,'D'],['?',8,'D']]],['?',7,'W']]],
          [7,4, [[6,2, [[8,9,'D'],['?',8,'W']]],['?',6,'W']]],
          [8,7, [[3,2, [[6,9,'D'],['?',6,'D']]],['?',3,'W']]],
          [9,8, [[2,3, [[7,4,'D'],['?',7,'W']]],['?',2,'W']]]]],      
  [2, 5, [[1,3, [[7,4, [[6,9,'D'],['?',6,'W']]],['?',7,'W']]],
          [3,1, [[9,6, [[4,7,'D'],['?',4,'W']]],['?',9,'W']]],
					[4,1, [[9,3, [[7,8,'D'],['?',7,'W']]],['?',9,'W']]],
					[6,3, [[7,1, [[9,8,'D'],['?',9,'W']]],['?',7,'W']]],
					[7,1, [[9,8, [[3,6,'D'],['?',3,'D']]],['?',9,'W']]],
					[8,7, [[3,1, [[4,9,'W'],['?',4,'w']]],['?',3,'W']]],
					[9,3, [[7,8, [[1,4,'D'],['?',1,'D']]],['?',7,'W']]]]],
  [3, 5, [[1,2, [[8,4, [[6,9,'D'],['?',6,'W']]],['?',8,'W']]],
          [2,1, [[9,6, [[4,7,'D'],['?',4,'W']]],['?',9,'W']]],
          [4,1, [[9,6, [[7.8,'D'],['?',7,'D']]],['?',9,'W']]],
          [6,9, [[1,2, [[8,7,'D'],['?',8,'W']]],['?',1,'W']]],
          [7,8, [[2,1, [[9,6,'D'],['?',9,'W']]],['?',2,'W']]],
          [8,9, [[1,2, [[4,7,'D'],['?',4,'D']]],['?',1,'W']]],
          [9,6, [[4,2, [[8,7,'D'],['?',8,'W']]],['?',4,'W']]]]],          
  [4, 5, [[1,7, [[3,2, [[8,9,'D'],['?',8,'W']]],['?',3,'W']]],
          [2,1, [[9,3, [[7,8,'D'],['?',7,'W']]],['?',9,'W']]],
          [3,1, [[9,6, [[7.8,'D'],['?',7,'D']]],['?',9,'W']]],
          [6,7, [[3,9, [[8,1,'W'],['?',8,'w']]],['?',3,'W']]],
          [7,1, [[9,8, [[2,3,'D'],['?',2,'W']]],['?',9,'W']]],
          [8,7, [[3,1, [[9,6,'D'],['?',9,'W']]],['?',3,'W']]],
          [9,7, [[3,6, [[1,2,'D'],['?',1,'D']]],['?',3,'W']]]]],
  [6, 5, [[1,3, [[7,4, [[8,9,'D'],['?',8,'W']]],['?',7,'W']]],
          [2,3, [[7,1, [[9,8,'D'],['?',9,'W']]],['?',7,'W']]],
          [3,9, [[1,2, [[8,7,'D'],['?',8,'W']]],['?',1,'W']]],
          [4,7, [[3,9, [[8,1,'W'],['?',8,'w']]],['?',3,'W']]],
          [7,9, [[1,4, [[2,3,'D'],['?',2,'D']]],['?',1,'W']]],
          [8,9, [[1,3, [[7,4,'D'],['?',7,'W']]],['?',1,'W']]],
          [9,3, [[7,8, [[2,1,'D'],['?',2,'W']]],['?',7,'W']]]]],
  [7, 5, [[1,4, [[6,2, [[8,9,'D'],['?',8,'W']]],['?',6,'W']]],
          [2,1, [[9,8, [[3,6,'D'],['?',3,'D']]],['?',9,'W']]],
          [3,8, [[2,1, [[9,6,'D'],['?',9,'W']]],['?',2,'W']]],
          [4,1, [[9,8, [[2,3,'D'],['?',2,'W']]],['?',9,'W']]],
          [6,9, [[1,4, [[2,3,'D'],['?',2,'D']]],['?',1,'W']]],
          [8,9, [[1,4, [[6,3,'D'],['?',6,'W']]],['?',1,'W']]],
          [9,8, [[2,4, [[6,3,'D'],['?',6,'W']]],['?',2,'W']]]]],
  [8, 5, [[1,7, [[3,2, [[6,9,'D'],['?',6,'D']]],['?',3,'W']]],
          [2,7, [[3,1, [[4,9,'W'],['?',4,'w']]],['?',3,'W']]],
          [3,9, [[1,2, [[4,7,'D'],['?',4,'D']]],['?',1,'W']]],
          [4,7, [[3,1, [[9,6,'D'],['?',9,'W']]],['?',3,'W']]],
          [6,9, [[1,3, [[7,4,'D'],['?',7,'W']]],['?',1,'W']]],
          [7,9, [[1,4, [[6,3,'D'],['?',6,'W']]],['?',1,'W']]],
          [9,7, [[3,6, [[4,1,'D'],['?',4,'W']]],['?',3,'W']]]]],
  [9, 5, [[1,8, [[2,3, [[7,4,'D'],['?',7,'W']]],['?',2,'W']]],
          [2,3, [[7,8, [[1,4,'D'],['?',1,'D']]],['?',7,'W']]],
          [3,6, [[4,2, [[8,7,'D'],['?',8,'W']]],['?',4,'W']]],
          [4,7, [[3,6, [[1,2,'D'],['?',1,'D']]],['?',3,'W']]],
          [6,3, [[7,8, [[2,1,'D'],['?',2,'W']]],['?',7,'W']]],
          [7,8, [[2,4, [[6,3,'D'],['?',6,'W']]],['?',2,'W']]],
          [8,7, [[3,6, [[4,1,'D'],['?',4,'W']]],['?',3,'W']]]]]
];

