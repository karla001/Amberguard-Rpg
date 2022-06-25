const readline = require("readline-sync")

var monster = {};
var userHp = 10;
var inventory = [];

console.log('**** The *********************************');
console.log('*********** Road *************************');
console.log('****************** To ********************');
console.log('*********************----------***********');
console.log('*********************** Amberguard *******');
console.log('************************------------******');


console.log('*--------------------------------------*');
console.log('Welcome brave adventurer!');
const userName = readline.question('What do they call you adventurer?');

console.log('*--------------------------------------*');
console.log('We are glad you have arrived.');
console.log('Though we have little to pay you,');
console.log('our town will be greatly in your debt.');
console.log('The path to the city of Amberguard is taken over by beasts.');
console.log('Our sick are unable to get medical attention there.');
console.log('Our farmers are unable to sell their crops in the Amberguard market.');
console.log('Please help us ' + userName +'!');
console.log('Press W to begin walking the path to Amberguard...');

walking();

function doesEnemyAppear(){
    let probability = getRandomInt(3);

    if(probability == 1){
        enemyAppears();
    }else{
        message = setSafeMessage();
        console.log(message);
        console.log('Press W to continue walking the path to Amberguard...');
        walking();
    }
};

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function setSafeMessage(){
    let probability = getRandomInt(3);
    if(probability == 0){
        return 'The coast is clear. They probably got word you were coming.';
    }else if(probability ==1){
        return 'Nothing stirs.';
    }else{
        return '...';
    }
};

function walking(){

    var key = readline.keyIn('',
    {hideEchoBack: true, mask: '', limit: 'wpq'});
    console.log('*--------------------------------------*');
    console.log('Press p for inventory and q to quit game.');
    console.log('*--------------------------------------*');

    if (key === 'w'){
        console.log('walking...');
        doesEnemyAppear();
    } else if(key === 'p'){
        checkInventory();
    }else if(key === 'q'){
        console.log('Bye bye!')
        process.exit(0);
    }else {
        console.log('That\'s not a w !');
    }
};

function enemyAppears(){
    let probability = getRandomInt(3);
    let beasts = ['ghoul','troll', 'goblin'];

    monster.name = beasts[probability];
    monster.hp = 5;
    console.log("A wild " + monster.name +" appears!");
    describeEnemy();
    attackOrRun();
};

function describeEnemy(){
    let probability = getRandomInt(3);
    let descriptions = ['It smells horrible!','It cackles and steps toward you.', 'It appears to be hungry...'];

    return descriptions[probability];
};

function attackOrRun(){
    if(readline.keyInYN('Do you wish to attack?')){
        console.log('You prepare to attack...');
        battle();
    }else {
        console.log('You flee..');
        console.log('Good choice! This guy looks way too big.');
        run();
    }
};

function run(){
    let probability = getRandomInt(2);
    if(probability == 0){
        let message = youSuck();
        console.log(message);
        enemyAttacks();
        if(userHp >0){
            attackOrRun();
        }else{
            theEnd();
        }
    }else{
        console.log('You manage to escape!');
        console.log('Press W to continue walking the path to Amberguard...');
        walking();
    }
};

function youSuck(){
    let probability = getRandomInt(3);
    let whyNoRun = ['You trip on a small pebble.', 'You are too slow and the '+monster.name+' laughs at you!', 'Oh no! Somebody tied your shoelaces while you weren\'t looking.'];
    return whyNoRun[probability];
};

function enemyAttacks(){
    let damage = getRandomInt(6);
    let hp = userHp - damage;
    userHp = hp;
    console.log('The '+ monster.name + ' headbutts you!');

    if(damage == 0){
        console.log('You manage to evade the attack...');
    }else{
        if(userHp == 0 || userHp < 0){
            console.log('Your life flashes before your eyes....');
            console.log('......................................')
        }else{
            console.log('The '+monster.name+'\'s attack dealt '+ damage +' damage.');
            console.log('Your HP is now '+ userHp)
        }
    }
};

function youAttack(){
    let damage = getRandomInt(6);
    let hp = monster.hp - damage;
    monster.hp = hp; 
    console.log('You charge at the '+ monster.name );

    if(damage == 0){
        console.log('Your attack misses...Darn!');
    }else{
        if(monster.hp == 0 || monster.hp < 0){
            console.log('The '+monster.name+" is no more!")
        }else{
            console.log('The '+monster.name+' loses '+ damage +' HP');
            console.log('The '+monster.name+' now has '+monster.hp+' HP');
        }
    }
};

function battle(){

    while(userHp > 0 && monster.hp > 0){
        youAttack();
        if(monster.hp > 0){
            enemyAttacks();
        }
    }

    if(userHp == 0 || userHp < 0 ){
        theEnd();
    }else if(monster.hp == 0 || monster.hp < 0){
        youWon();
    }

};

function youWon(){
    let shortRest = getRandomInt(6);
    let hp = userHp + shortRest;
    userHp = hp;

    if(userHp>10){
        userHp = 10;
    }

    console.log('You have bested the beast!');
    console.log('They should have known better than to mess with you.');
    console.log('After a short rest your HP returns to '+ userHp);
    foundItem();
    console.log('Press W to continue walking the path to Amberguard...');
    walking();
};

function foundItem(){
    let probability = getRandomInt(5);
    let items = ['a dagger','a mysterious glowing ring','some funny looking boots','a rotten tomato','a cute stuffed animal'];
    let item = items[probability];
    inventory.push(item);

    console.log('You find a '+ item + ' you decide to keep it.');
    console.log('It could come in handy.');
};

function checkInventory(){
    console.log('**************************************')
    console.log(userName);
    console.log('Your HP is '+ userHp);

    console.log('Your inventory contains:')
    if(inventory.length > 0){
        inventory.forEach(item => console.log(item+','))
        console.log('These will definetly be useful!');
    }else{
        console.log('...a lint bunny and a spare button...');
    }
    console.log('**************************************')

    console.log('Press W to continue walking the path to Amberguard...');
    walking();
};

function theEnd(){
    console.log('**************************************')
    console.log('********You\'ve been bested!**********');
    console.log('****** In truth you never had ********')
    console.log('** what it takes to be an adventurer **');
    console.log('***** You become a farmer instead *****');
    console.log('**************************************');
    process.exit(0);
};