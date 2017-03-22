var pomodoro_clock = {
    timer_id : undefined,
    working : true,
    resting : false,
    repeat_mouse : undefined,
    mouse_target : undefined,

    /* adjusting speed */
    interval_second     : 1000,
    interval_span       : 1000,
    mouse_interval_span : 300,


    on_window_load : function(){
        
        [['clock_tgl', 'mouseup',    pomodoro_clock.toggle_clock],
        ['clock_rst', 'mouseup',    pomodoro_clock.reset_clock],
        
        ['break_up',   'mousedown', pomodoro_clock.interval_mousedown],
        ['break_up',   'mouseup',   pomodoro_clock.interval_mouseup],
                       
        ['break_dn',   'mousedown', pomodoro_clock.interval_mousedown],
        ['break_dn',   'mouseup',   pomodoro_clock.interval_mouseup],
        
        ['session_up', 'mousedown', pomodoro_clock.interval_mousedown],
        ['session_up', 'mouseup',   pomodoro_clock.interval_mouseup],
        
        ['session_dn', 'mousedown', pomodoro_clock.interval_mousedown],
        ['session_dn', 'mouseup',   pomodoro_clock.interval_mouseup]]

        .forEach(function(arr){
            document.getElementById(arr[0]).addEventListener(arr[1],arr[2],false);
        });

        pomodoro_clock.time_speed();
        pomodoro_clock.draw_clock({
            min:  25,
            sec:   0,
            rest:  5,
            work: 25,
            mode: undefined});
        
    },

    time_speed : function(e){
        if( pomodoro_clock.timer_id ){
            clearTimeout(pomodoro_clock.timer_id);
            pomodoro_clock.timer_id =
                setInterval(pomodoro_clock.write_clock,pomodoro_clock.interval_span);
        }
    },

    interval_mousedown : function(e){
        pomodoro_clock.mouse_target = e;
        pomodoro_clock.repeat_mouse =
            setInterval( pomodoro_clock.intervals, pomodoro_clock.mouse_interval_span );
    },
    
    interval_mouseup : function(e){
        clearTimeout(pomodoro_clock.repeat_mouse);
        pomodoro_clock.intervals();
        pomodoro_clock.mouse_target = undefined;
        pomodoro_clock.repeat_mouse = undefined;

        if(pomodoro_clock.timer_id !== undefined ){
            clearTimeout(pomodoro_clock.timer_id);
            pomodoro_clock.timer_id = undefined;
        }
        pomodoro_clock.working = true;
        pomodoro_clock.resting = false;

        
        pomodoro_clock.rewrite_clock();
    },

    toggle_clock : function(){
        if( pomodoro_clock.timer_id != undefined ){
            clearTimeout(pomodoro_clock.timer_id);
            pomodoro_clock.timer_id = undefined;
        }else{
            pomodoro_clock.timer_id =
                setInterval(pomodoro_clock.write_clock,pomodoro_clock.interval_span);
        }

        pomodoro_clock.draw_clock( {mode: true} );
    },

    reset_clock : function(){
        if( pomodoro_clock.timer_id !== undefined ){
            clearTimeout(pomodoro_clock.timer_id);
            pomodoro_clock.timer_id = undefined;
        }
        pomodoro_clock.working = true;
        pomodoro_clock.resting = false;
        
        pomodoro_clock.rewrite_clock();
    },


    intervals : function(){
        var e = pomodoro_clock.mouse_target;
        var x = Number(document.getElementById(e.target.id.slice(0,-3)).innerHTML);
        
        if(e.target.id.slice(-2) == 'up'){
            if( (x += 1) == 60 ) x = 0;
        }else if(e.target.id.slice(-2) == 'dn'){
            if( (x -= 1) == -1 ) x = 59;
        }
        document.getElementById(e.target.id.slice(0,-3)).innerHTML = x;
    },


    write_clock : function(){
        var mm = Number(document.getElementById('clock_mm').innerHTML);
        var ss = Number(document.getElementById('clock_ss').innerHTML);
        if ( ss === 0 ){
            mm -= 1;
            if( mm === -1 ){
                clearTimeout( pomodoro_clock.timer_id );
                pomodoro_clock.working = !(pomodoro_clock.working);
                pomodoro_clock.resting = !(pomodoro_clock.resting);
                pomodoro_clock.rewrite_clock();
                pomodoro_clock.timer_id =
                    setInterval(pomodoro_clock.write_clock,pomodoro_clock.interval_span);
                    return;
            }else{
                ss = 59;
            }
        }else{
            ss -= 1;
        }
        pomodoro_clock.draw_clock( { min:mm, sec:ss } );
    },

    rewrite_clock : function(){
        var seq;
        if( pomodoro_clock.working )
            seq = 'session';
        else
            seq = 'break';
        var mm = document.getElementById(seq).innerHTML;
        var ss = 0;
        pomodoro_clock.draw_clock( { min:mm, sec:ss, mode:true } );
    },


    /* options = { min: , sec: , rest: , work: , mode: } */
    draw_clock : function( options ){
        if( options.rest !== undefined )
            document.getElementById('break').innerHTML = options.rest;

        if( options.work !== undefined )
        document.getElementById('session').innerHTML = options.work;

        if( options.min !== undefined )
            document.getElementById('clock_mm').innerHTML = options.min;

        if( options.sec !== undefined )
            document.getElementById('clock_ss').innerHTML =
            (options.sec < 10 ? "0":"") + options.sec;

        if( options.mode !== undefined ){
            document.getElementById('clock_mode_y').innerHTML =
                pomodoro_clock.working ? 'WORK' : 'BREAK';
        }
        if( pomodoro_clock.timer_id === undefined ){
            document.getElementById('clock_tgl').innerHTML =' START';
        }else{
            document.getElementById('clock_tgl').innerHTML =' PAUSE';
        }

    },


}

window.onload = pomodoro_clock.on_window_load;
 
