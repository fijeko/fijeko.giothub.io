var simongame = {
	time_delay : 1000,
	win_steps : 20,
	strict_g : 0,
	
	mode : 'stop',
	pattern : [],
	check_sound : undefined,
	time_increase : 0,
	
	on_window_load : function(){
		document.getElementById('b_start').addEventListener( 'click', simongame.start, false );
		document.getElementById('b_stop'). addEventListener( 'click', simongame.stop, false );
		simongame.stop_mode();
		console.log("window load");
	},

	stop : function(){
		simongame.stop_listen();
		simongame.stop_mode();
	},

	start : function(){
		simongame.stop_mode();
		simongame.play_music();
	},
	
	play_music() {
		simongame.play_mode();
		simongame.pattern.push( Math.floor( ( Math.random() * 1000 ) % 4 ) + 1 );
		
		for(var i = 0; i < simongame.pattern.length + 1; i++){
			var play_latter = simongame.play_sound( i );
			setTimeout( play_latter, simongame.time_increase );
			simongame.time_increase += simongame.time_delay;
		}
	},

	listen_music : function(){
		if( simongame.mode != 'play') return ;
		simongame.start_listen();
		simongame.repeat_mode();
	},

	
	play_sound : function(sound) {
		var s = simongame.pattern[sound];
		if( s === undefined ){
			return simongame.listen_music;
		}
		return function(){
			if( simongame.mode != 'play' )  return;
			document.getElementById( 'b_snd' + s ).className = 'b_funny clr-active-f' + s;
			document.getElementById( 'snd_'  + s ).play();
			setTimeout( function(){
					document.getElementById( 'b_snd' + s ).className = 'b_funny clr-f' + s;
			}, 200);
		}
	},
	

	listen_sound : function(e){
		
		var s = e.target.id.slice(-1);
		document.getElementById( 'b_snd' + s ).className = 'b_funny clr-active-f' + s;
		document.getElementById( 'snd_' + s ).play();
		setTimeout( function(){
					document.getElementById( 'b_snd' + s ).className = 'b_funny clr-f' + s;
			}, 200);

		if( simongame.pattern[simongame.check_sound] != s ) {
			simongame.stop_listen();
			simongame.fail_mode();
			if( simongame.strict_g === 0 )
				return;
		}

		simongame.check_sound += 1;

		if( simongame.check_sound == simongame.win_steps ){
			simongame.stop_listen();
			simongame.winner_mode();
			return;
		}
		
		if( simongame.check_sound == simongame.pattern.length ){
			
			setTimeout( function(){
				simongame.stop_listen();
				simongame.play_music();
			}, 800 );
		}
	},

	start_listen : function(){
console.log('start_listen' );					
		['b_snd1', 'b_snd2', 'b_snd3', 'b_snd4'].forEach(function(val){
			document.getElementById(val).addEventListener(
				'click', simongame.listen_sound, false );
		});
		
	},
	
	stop_listen : function(){
console.log('stop_listen' );
		['b_snd1', 'b_snd2', 'b_snd3', 'b_snd4'].forEach(function(val){
			document.getElementById(val).removeEventListener(
				'click', simongame.listen_sound, false );
		});
	},


	
	stop_mode : function(){
		simongame.mode = 'stop';
		simongame.pattern = [];
		simongame.output();
	},

	play_mode : function(){
		simongame.mode = 'play';
		simongame.time_increase = simongame.time_delay;
		simongame.output();
	},

	repeat_mode : function(){
		simongame.mode = 'repr';
		simongame.check_sound = 0;
		simongame.output();
	},

	winner_mode : function(){
		simongame.mode = 'winn';
		simongame.output();
	},

	fail_mode : function(){
		simongame.mode = 'fail';
		simongame.output();
	},
	
	output : function(){
		switch( simongame.mode ){
			case 'stop' : {
				document.getElementById('p_step').className = 'stop_g';
				document.getElementById('b_start').className = 'clr-bt-of';
				document.getElementById('b_stop').className = 'clr-bt-on';
				break;
			}
			case 'play' : {
				document.getElementById('p_step').className = 'play_g';
				document.getElementById('b_stop').className = 'clr-bt-of';
				document.getElementById('b_start').className = 'clr-bt-on';
				break;
			}
			case 'repr' : {
				document.getElementById('p_step').className = 'repr_g';
				document.getElementById('b_stop').className = 'clr-bt-of';
				document.getElementById('b_start').className = 'clr-bt-on';
				break;
			}
			case 'winn' : {
				document.getElementById('p_step').className = 'winn_g';
				document.getElementById('b_start').className = 'clr-bt-of';
				document.getElementById('b_stop').className = 'clr-bt-on';
				break;
			}
			case 'fail' : {
				document.getElementById('p_step').className = 'fail_g';
				document.getElementById('b_start').className = 'clr-bt-of';
				document.getElementById('b_stop').className = 'clr-bt-on';
				break;
			}
			default : {
				document.getElementById('p_step').className = 'def_g';
				document.getElementById('b_start').className = 'clr-bt-of';
				document.getElementById('b_stop').className = 'clr-bt-on';
				break;
			}
		}
		document.getElementById('p_step').innerHTML = simongame.pattern.length;
	}
}

window.onload = simongame.on_window_load;



