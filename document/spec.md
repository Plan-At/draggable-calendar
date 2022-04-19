# Feature Specification

### Feature Information
|||
|---|---|
|Feature Name|Spellshocked|
|Area|Game|
|Related Features|LibGdx|
|Requirement Specs|
|Document Location|https://github.com/SpellShocked/SpellShocked-Game|
|Spec Status|Draft|

### Contact Information
|Role|Name|
|---|---|
|Manager|Chad Magendanz|
|Developer|Lucy Stewart|
|Developer|Roy Pan|
|Developer|Jack Scott|
|Developer|Alex Stedman|
|Developer|David Nicolle|

### Revision Summary
|Author|Date|Version|Comment|
|---|---|---|---|
|-|11/23/2021|Initial Draft|Created this page|
|Roy Pan and Lucy Stewart|1/14/2021|Rough Draft|Created base outline (main componenets)|
|Roy Pan and Lucy Stewart|1/18/2021|Edited Draft|Added more description to headers|
|Roy Pan and Lucy Stewart|1/20/2021|Edited Draft|Included pictures and screenshots of class hierarchies|
|Roy Pan and Lucy Stewart|1/21/2021|Final Version|Polished grammar and added more information|

## Functional Specification
spellshocked is a game developed with libGDX is java. The target audience for this game is people who enjoy fanatsy games. This game includes two main modes, Shock Wave and Pumpkin Rush. Pumpkin Rush is when a player must collect all the pumpkins that are guarded by a skelton, trying to do so in the quickest time as possible. The other mode, ShockWave, is a wave-based game where the player must beat certain amount of monsters that generate next to his location. Thge objective is to survive for as long as possible. 

## Scenario Description

![image](https://user-images.githubusercontent.com/65467897/150017323-0228ec19-cf98-4d15-be79-0749826cc481.png)
Photo of Loading Screen
![image](https://user-images.githubusercontent.com/86680163/150017990-1fcaa019-2bde-4d9e-b95d-7b8351598469.png)
Photo of Shock Wave
![image](https://user-images.githubusercontent.com/86680163/150018090-ada963c6-67f4-4933-9569-231c231675f3.png)
Photo of Pumpkin Rush



#### Title Screen
#### Setting
Includes volume
#### Gamemode
Select one of the three game mode

## Feature Description
Sections of the project:

1. Engine Selection:
    For our engine, we wanted a compromise of an active community, ability to code features largely on your own unlike Unity, and low levelness to essnetially be able to practice our coding skills as much as possible. As a result, we agreed upon LibGx and set up an enviornment and repo to began development.
2. Project Breakdown: Our next step was to break down our project into multiple packages, so each person could work on something else at a time and for better file management. This packages were GUI, entitities,item, world, and input/util. 
3. GUI: Our gui imported a skin found from a skin database and the bult in button and graphs features from LibGdx. We used this to create a master parent GUI, that then had child classes to create different screens for the corresponding screen needed, for example Game Over, Game Choosing Menu, Pause Menu, Title Screen, and more. To make switching between screens possible and effcient, we decided to organize our game with a Scene Manager, making the parent psellShocked class a stage chooser and game mode classes a seperate entitiy rather than combining the two.
4. Entitities: The entitities package was used for all characters in our game. Atttatched is an illustration of our entitiy flowchart/class hierarchy. The hostile enemies were programmed to have unqie aspects such as a target enemy to follow, attacking range, and damage dealt. Player was also included, which required features such as user contorl though WASD, ability to handle inventory, and more. 
![image](https://user-images.githubusercontent.com/86680163/150418151-ae220600-dfe6-47cd-a8a6-85e8ba23d494.png)
5. World: The world package was where we included the features for PERLIN generation, the different game modes and screens, as well as the obstacles. Perlin generation was done so that the map would be different everytime and randomnly generated with varying biomes such as water, sand, rock, lava, and grass. These tiles would effect player movement in a way true to reality, for example, a player's speed is reduced while in sand tiles and dramatically reducded while in water. The obstacles such as rocks were also placed onto seperate tiles, and used collision detection to block player and enemy movement through them, as well as dealing HP damage. 
![image](https://user-images.githubusercontent.com/86680163/150418317-64be532c-2db5-4c36-9bea-b60aa4dbe803.png)
6. Input/Util: The util package was used to make input for other packages easier. This included the input and input scheduler classes that enabled controls, so hitting keys could have actual effects on movement as well as general gameplay.
![image](https://user-images.githubusercontent.com/86680163/150418694-3e33dc9f-681f-4403-bfd1-1e759f48942a.png)
7. Images/Artwork/Sounds: This section was done mainly by David. All character and world art was handmade in paint.Net. For sprites, he would use a sprite sheet of the character in a different positions to mimic animation and movement. Overall, 26 different drawings and frames were completed, ranging from monsters to lava.
8. Item

## gamemode
### Pumpkin Rush: 
- random and set seed
    - We're using Perlin Noise to generate map (basically setting the Tile height) and that requires bunch of random floats. While we could using Math.random to do this, but it just not cool, so we using java.util.Random that create a Random object, then using random.next() to get a number, but the benefit of using this library is can set a "seed", so as long long as using the same seed, every time running this using the same seed will provide same pattern, that will generate identical maps every time run, not only can possible easier to reprocude issues during development, in case we decide to make ranking system we could have everyone having the same map for fairness.

- time based
    - In pumpkin rush, the quicker you collect all the pumpkins, the better your score is. To use this, we have a score calculator and use a built in timer that determines the delta of time depnding on how many frames have been rendered. 
- enemies (range, following based) 
    - For the monsters in this game mode, we use skeletons that are assigned to a specific pumpkin to guard. To do this, w emade a new class called pumpkinentitiy that had a pumpkin object, and by extent could call a inrange function. In doing so, a skelton could only attack a player when they were in nearby proximity to its pumpkin object. When its pumpkin is destroyed, it goes and finds the nearest pumpkin and that becomes the new pumpkin object. When there are no nearby pumpkins, that means the player has destroyed all the pumpkins, and the game is over. 
- pumpkins get picked up
    - Pumpkins randomly generate in the tile map, to a varaible amount. Once generated, they are stored into an array that keeps track of the pumpkins in gameplay, and assigns each pumpkin a new skeleton guardian. A pumpkin can be removed if a player hits the right key and runs away, removing the pumpkin from the array and reassigning its skeleton. 

#### Shockwave (main): 
- Waves
    -Monsters spawn in waves, siginifed by a progress bar for raid. When the progress bar is full, 2 monsters spawn in  a range by the player. The monsters are coded to follow and attack the player until out of range. Each monster has a health system. When monsters are killed, player gains more points and once a set amount of waves is over, the game is 'won.'
- map level
    - For this game mode, the map is randomly generated wiht perlin world, but the different tiles are 'layered' to mimic terrain of the real world. This means the map is leveled, and different tiles have different functionalities such as slowing player and enemy movement and dealing damage.
- Chests


## Boneyard
#### Multiplayer/Servers
Due to some special circumstances we were unable to host the game locally (LAN) and cloud server have too much latency. 
#### Settings
The get prefs built in library for LibGdx was not working well. It was confusing, and the radio button groups were automatically set to be clicked when the person opened up settings. As a result, it was cut from the project.
#### 3 game modes
Rune Run was meant to be the third game mode and similar to Subway Surfers. However, this would require making entirely new world generation and movement, which we simply did not have time for. As a result, it was cut.
#### Online Scoreboard
Tried several online servers, but it did not work. Tried following the tutorials but nothing happened, scores would not be sent to the website. 
