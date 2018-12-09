let fighters = [], myFighter, opponent, numAttacks, numWins;
var lsOnAudio = document.createElement("audio");
lsOnAudio.setAttribute("src", "./assets/media/lsOn.mp3");
var sbClashAudio = document.createElement("audio");
sbClashAudio.setAttribute("src", "./assets/media/saberClash.mp3");

let startGame = function () {
  numWins = 0;
  myFighter = undefined;
  opponent = undefined;
  numAttacks = 1;
  $("#btnAttack").addClass("d-none");
  fighters = []
  fighters.push(new Fighter(150, "Luke", $("#player1")[0]));
  fighters.push(new Fighter(190, "Darth Vader", $("#player2")[0]));
  fighters.push(new Fighter(210, "Darth Maul", $("#player3")[0]));
  fighters.push(new Fighter(300, "Yoda", $("#player4")[0]));
  $(".leftPerson").text("");
  $(".rightPerson").text("");
  $(".card").removeClass("defeated").find(".card-text").text("");
  $(".myAttack").text("");
  $(".oppAttack").text("");
  $(".ltF.fighterImg").css("background","none");
  $(".rtF.fighterImg").css("background","none");
  $(".oppHealth .healthBar").width(0);
  $(".myHealth .healthBar").width(0);
  $(".inst").text(`Choose your champion by clicking on their name`);
}

let counterAttack = function (opp, me) {
  me.hp -= opp.counterP;
  $(me.myCard).find(".card-text").text(me.hp);
  $(".oppAttack").text(opp.name + " struck you for " + opp.counterP + " points of damage.");
  $(".myHealth .healthBar").width((me.hp/me.maxHealth)*197);
  if (me.hp < 1) {
    $(".myHealth .healthBar").width(0);
    $(myFighter.myCard).find(".card-text").text("");
    $(".myAttack").text(opponent.name + ` has defeated you.`);
    $("#btnAttack").addClass("d-none");
    $("#btnReplay").removeClass("d-none");
    $(".ltF.fighterImg").css("background","none");
  }
}

let calcCounterValue = function (myFHp, ranking) {
  let val = myFHp / 8;
  switch (ranking) {
    case 0:
      val = val * 0.65;
      break;
    case 2:
      val = val * 1.5;
      break;
    default:
      break;
  }
  return Math.round(val);
}

let calcMyAP = function () {
  let potentialAP = [fighters[0].hp / 15, fighters[1].hp / 21, fighters[2].hp / 30];
  return Math.round(Math.max.apply(Math, potentialAP));
}

let setBkImg = function (side, name) {
  let imgName = "darthLeft.png";
  switch (name) {
    case "Luke":
      imgName = side == "l" ? "lukeLeft.png" : "lukeRight.png";
      break;
    case "Darth Vader":
      imgName = side == "l" ? "vaderLeft.png" : "vader-right.png";
      break;
    case "Darth Maul":
      imgName = side == "l" ? "darthLeft.png" : "darthRight.png";
      break;
    case "Yoda":
      imgName = side == "l" ? "yodaLeft.png" : "yodaRight.png";
      break;
    default:
      break;

  }
  if (side == "l") {
    $(".ltF.fighterImg").css("background", "no-repeat url(./assets/images/" + imgName);
  } else {
    $(".rtF.fighterImg").css("background", "no-repeat url(./assets/images/" + imgName);
  }
}

let setCombatants = function(){
  $(".inst").text(``);
  $(".bkImg").fadeOut(1500,function(){
    $(".bkImg").css(`background`, `url(./assets/images/port`+evalName(myFighter.name)+evalName(opponent.name)+`.png)`);
    $(".bkImg").fadeIn(1500, function(){
      $("#btnAttack").removeClass("d-none");
    });
    $(".oppHealth .healthBar").width(197);
    lsOnAudio.play();
  })
    

    let evalName = function(str){
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

$("#btnAttack").on("click", function () {
  sbClashAudio.play();
  $(".myAttack").text("");
  $(".oppAttack").text("");
  opponent.hp -= (myFighter.attackP * numAttacks);
  $(".myAttack").text(`You struck ` + opponent.name + ` for ` + (myFighter.attackP * numAttacks) + ` points of damage.`);
  if (opponent.hp > 0) {
    $(".oppHealth .healthBar").width((opponent.hp/opponent.maxHealth)*197);
    counterAttack(opponent, myFighter);
  } else {
    //OPPONENT IS DEFEATED
    numWins++;
    $(".oppHealth .healthBar").width(0);
    $(opponent.myCard).addClass("defeated");
    $(".oppAttack").text(`You have defeated ` + opponent.name + `. Choose your next opponent.`);
    $(".rightPerson").text("");
    opponent.defeated = true;
    opponent = undefined;
    $("#btnAttack").addClass("d-none");
    $(".rtF.fighterImg").css("background","none");
    $(".bkImg").fadeOut(1500,function(){
      $(".bkImg").css(`background`, `url(./assets/images/portalWindow.png)`);
      $(".bkImg").fadeIn(1500);
    })
    if (numWins == fighters.length) {
      $("#btnReplay").removeClass("d-none");
      $(".inst").text("You have defeated all your enemies.");
    }
  }
  numAttacks++;
});

$("#btnReplay").on("click", function () {
  $(myFighter.myCard).fadeIn(1);
  startGame();
  $(this).addClass("d-none");
})

$(".card").on("click", function () {
  let charName = this.attributes["data-charName"].value;
  if (myFighter == undefined || myFighter.length == 0) {
    myFighter = fighters.filter(function (o, i) {
      if (charName == o.name) {
        fighters.splice(i, 1);
      }
      return charName == o.name;
    })[0];
    
    myFighter.attackP = calcMyAP();
    myFighter.currentP = calcMyAP();
    $(myFighter.myCard).fadeOut("slow");
    fighters.forEach(function (obj, i) {
      obj.counterP = calcCounterValue(myFighter.hp, i);
    });
    setBkImg("l", myFighter.name);
    $(".myHealth .healthBar").width(197);
    lsOnAudio.play();
    $(".inst").text(`Choose your opponent by clicking on their name`);
  } else if (opponent == undefined || opponent.length == 0) {
    opponent = fighters.filter(function (o, i) {
      if (charName == o.name && !o.defeated) {
        return charName == o.name;
      }
    })[0];
   
    
    setBkImg("r", opponent.name);
    setCombatants();
  }
})

startGame();