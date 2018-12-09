let theGame = {
    numAtt: 1,
    numWins: 0,
    myFighter: {},
    opponent: {},
    fighters: [],
    sbClashAudio: document.createElement("audio"),

    start: function () {
        this.numAtt=1;
        this.numWins =0;
        this.fighters = this.setFighters();
        this.setInstBlock("warrior");
        this.setSaberWidth();
        this.myFighter = undefined;
        this.opponent = undefined;
        this.setInstBlock("warrior");
        $(".card").removeClass("defeated");
        $(".rtF.fighterImg").css("background","none");
        $(".ltF.fighterImg").css("background","none");
        theGame.setSaberWidth(false);        
    },
    setFighters: function () {
        let temp = [];
        temp.push(new Fighter(150, "Luke", $("#player1")[0]));
        temp.push(new Fighter(190, "Darth Vader", $("#player2")[0]));
        temp.push(new Fighter(210, "Darth Maul", $("#player3")[0]));
        temp.push(new Fighter(300, "Yoda", $("#player4")[0]));
        return temp;
    },
    setMyFighter: function (obj, str, idStr) {
        let ind = 0;
        this[obj] = this.fighters.filter(function (o, i) {
            if (str == o.name) {
                ind=i;
                return true;
            }
        })[0];
        
        this[obj].myCard = idStr;
        if (obj === "myFighter") {
            this.fighters.splice(ind,1);
            $("#" + idStr).fadeOut("slow");
            this.calcCounterP();
        }  
        this[obj].attackP = this.calcMyAP();
        this[obj].currentP = this.calcMyAP();     
    },
    resetGame: function () {
        this.numWins = 0;
        this.myFighter = undefined;
        this.opponent = undefined;
        this.numAttacks = 1;
    },
    setCharBk: function (pos, fig) {
        let imgName = "darthLeft.png";
        switch (this[fig].name) {
            case "Luke":
                imgName = pos == "l" ? "lukeLeft.png" : "lukeRight.png";
                break;
            case "Darth Vader":
                imgName = pos == "l" ? "vaderLeft.png" : "vader-Right.png";
                break;
            case "Darth Maul":
                imgName = pos == "l" ? "darthLeft.png" : "darthRight.png";
                break;
            case "Yoda":
                imgName = pos == "l" ? "yodaLeft.png" : "yodaRight.png";
                break;
            default:
                break;
        }
        if (pos == "l") {
            $(".ltF.fighterImg").css("background", "no-repeat url(./assets/images/" + imgName);
        } else {
            $(".rtF.fighterImg").css("background", "no-repeat url(./assets/images/" + imgName);
        }
    },
    setInstBlock(str) {
        let tempStr = "";
        switch (str) {
            case "warrior":
                tempStr = `Choose your champion by clicking on their name`;
                break;
            case "opponent":
                tempStr = `Choose your opponent by clicking on their name`;
                break;
            case "winner":
                tempStr = `You have defeated all your enemies.`;
                break;
            case "loser":
                tempStr = `You have defeated by `+this.opponent.name+`.`;
                break;
            default:
                break;
        }
        $(".inst").text(tempStr);
    },
    setSaberWidth: function (playSound) {
        $(".oppHealth .healthBar").width((jQuery.isEmptyObject(this.opponent) ? 0 : this.opponent.hp / this.opponent.maxHealth) * 197);
        $(".myHealth .healthBar").width((jQuery.isEmptyObject(this.myFighter) ? 0 : this.myFighter.hp / this.myFighter.maxHealth) * 197);
        if (playSound) {
            $("#saberOn").trigger("play");
        }
    },
    calcMyAP: function () {
        let potentialAP = [this.fighters[0].hp / 15, this.fighters[1].hp / 21, this.fighters[2].hp / 30];
        return Math.round(Math.max.apply(Math, potentialAP));
    },
    calcCounterP: function () {
        for (let d = 0; d < this.fighters.length; d++) {
            let val = this.myFighter.hp/8;
            switch (d) {
                case 0:
                  val = val * 0.65;
                  break;
                case 2:
                  val = val * 1.5;
                  break;
                default:
                  break;
            }
            this.fighters[d].counterP = Math.round(val);
        }
    },
    doAttack: function () {
        $("#saberClash").trigger("play");
        this.opponent.hp -= (this.myFighter.attackP * this.numAtt);
        this.setSaberWidth(false);
        this.numAtt++;
        if (this.opponent.hp > 1) {
            this.couterAttack();
        } else {
            this.killOpponent();
        }
    },
    couterAttack: function () {
        this.myFighter.hp -= this.opponent.counterP;
        this.setSaberWidth(false);
        if(this.myFighter.hp<1){
            $(".myHealth .healthBar").width(0);
            $("#btnAttack").addClass("d-none");
            $("#btnReplay").removeClass("d-none");
            $(".ltF.fighterImg").css("background","none");
            $(".bkImg").fadeOut(1500,function(){
                $(".bkImg").css(`background`, `url(./assets/images/portalWindow.png)`);
                $(".bkImg").fadeIn(1500);
            })
            this.setInstBlock("loser");
        }
    },
    killOpponent: function () {
        this.numWins++;
        $(".oppHealth .healthBar").width(0);
        $(".oppAttack").text(`You have defeated ` + this.opponent.name + `. Choose your next opponent.`);
        $("#"+this.opponent.myCard).addClass("defeated");
        this.opponent.defeated=true;
        this.opponent = null;
        $("#btnAttack").addClass("d-none");
        $(".rtF.fighterImg").css("background","none");
        $(".bkImg").fadeOut(1500,function(){
            $(".bkImg").css(`background`, `url(./assets/images/portalWindow.png)`);
            $(".bkImg").fadeIn(1500);
        })
        if(this.numWins==this.fighters.length){
            // this.start();
            // $("#"+this.myFighter.myCard).fadeIn();
            this.setInstBlock("winner");
            $("#btnReplay").removeClass("d-none");
        }else{
            this.setInstBlock("opponent");
        }
        
    },
    setFightImage:function(){  
        $(".bkImg").fadeOut(1500,function(){
            $(".bkImg").css(`background`, `url(./assets/images/port`+theGame.evalName(theGame.myFighter.name)+theGame.evalName(theGame.opponent.name)+`.png)`);
            $(".bkImg").fadeIn(1500);
        }); 
    },
    evalName : function(str){
        switch(str){
          case "Luke":
            return "Luk";
          case "Darth Vader":
            return "Vad";
          case "Darth Maul":
            return "Dar";
          case "Yoda":
            return "Yod";
          default:
            break;
        }
    }
    
}