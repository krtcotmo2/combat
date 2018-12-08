let theGame = {
    numAtt : 1,
    numWins:0,
    myFighter: {},
    opponent:{},
    fighters:[],

    start: function(){
        this.fighters = this.setFighters();
    },
    setFighters: function(){
        let temp = [];
        temp.push(new Fighter(150, "Luke", $("#player1")[0]));
        temp.push(new Fighter(190, "Darth Vader", $("#player2")[0]));
        temp.push(new Fighter(210, "Darth Maul", $("#player3")[0]));
        temp.push(new Fighter(300, "Yoda", $("#player4")[0]));      
        return temp;
    },
    setMyFighter: function(obj, str){
        this[obj] = this.fighters.filter(function (o, i) {            
              return str == o.name;           
          })[0];
    },
    resetGame: function(){
        this.numWins = 0;
        this.myFighter = undefined;
        this.opponent = undefined;
        this.numAttacks = 1;
    }
}