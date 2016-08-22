#Simon Game:

##Wireframe

###Buttons
- **[StartButton]**   -->  onClick *startgame*
- **[ResetButton]**   -->  onClick *stopgame* *clearvars* *startgame*
- **[StopButton]**    -->  onClick *stopgame* *clearvars* 
- **[ColoredSoundButtons]**  * 4

###Output
- **[n-step]**  
- **[status]** win : lose : listen : repeat

###Other
- 4 sounds

##Context
###Constatns
- *win_step* 20

###Variable
- *pattern* array of random sounds
- *user_choose* number of user sound
- *n-step* count of turns
- *mode* play : repeat : stop : pause 

##Mode
###Stop
- *mode* = stop
- *n-step* = 0
- *user_choose* = undefined
- *pattern* = []

###Pause
- *mode* = pause
- *n-step* = x
- *user_choose* = undefined
- *pattern* = [a,b,c,d]

###Play
- *mode* = play
- *n-step* = x
- *user_choose* = 1 2 3 4
- *pattern* = [a b c d]
	
##Pseudo code
###Loop
- **[StartButton]**
- ***while***
	- user fail to repeat
	- user press reset or stop
	- game reach 20 sounds
		- choose random sound, add it to pattern, play it
		- ***wait user event***
		- ***for pattern length*** compare user sound with pattern
		- ***stop wait for user input***
- **[StopButton]**
	- reset all variable
	- reset output
	- ***stop wait for user input***
- **[PauseButton]**
	- ***stop wait for user input***
- **[ColoredSoundButton]**
	- ***if*** wait for user input
		- play sound and change shade of color
		- and compare with pattern
	- ***else***
		- play sound and change shade of color


		

