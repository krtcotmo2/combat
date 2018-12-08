let fighters =[],myFighter, opponent, numAttacks;
       
  let startGame = function(){
      myFighter = undefined;
      opponent = undefined;
      numAttacks = 1;
      $("#btnAttack").addClass("d-none");
      fighters=[]
      fighters.push(new Fighter(150, "Luke", $("#player1")[0]));
      fighters.push(new Fighter(190, "Darth Vader", $("#player2")[0]));
      fighters.push(new Fighter(210, "Darth Maul", $("#player3")[0]));
      fighters.push(new Fighter(300, "Yoda", $("#player4")[0]));
      $(".leftPerson").text("");
      $(".rightPerson").text(""); 
      $(".card").removeClass("defeated").find(".card-text").text("");
      $(".myAttack").text("");
      $(".oppAttack").text("");  
  }

  let counterAttack = function(opp, me){
      me.hp -= opp.counterP;
      $(me.myCard).find(".card-text").text(me.hp);
      $(".oppAttack").text(opp.name + " struck you for "+opp.counterP +" points of damage.");
      if(me.hp<1){
          $(myFighter.myCard).find(".card-text").text("");
          $(".myAttack").text(opponent.name + ` has defeated you.`); 
          $("#btnAttack").addClass("d-none");
          $("#btnReplay").removeClass("d-none");
      }
  }

  let calcCounterValue = function(myFHp, ranking){
      let val =myFHp/8;
      switch(ranking){
          case 0:
              val = val*0.65;
              break;
          case 2:
              val = val*1.5;
              break;
          default:
              break;
      }
      return Math.round(val);
  }
  
  let calcMyAP = function(){
      let potentialAP = [fighters[0].hp/15, fighters[1].hp/21, fighters[2].hp/30];
      return Math.round(Math.max.apply(Math, potentialAP));
  }

  $("#btnAttack").on("click", function(){
      $(".myAttack").text("");
      $(".oppAttack").text("");
      opponent.hp -= (myFighter.attackP*numAttacks);   
      $(".myAttack").text(`You struck `+ opponent.name + ` for `+(myFighter.attackP*numAttacks)+ ` points of damage.`);         
      if(opponent.hp>0){
          $(opponent.myCard).find(".card-text").text(opponent.hp);
          counterAttack(opponent, myFighter);
      }else{
          $(opponent.myCard).addClass("defeated");
          $(opponent.myCard).find(".card-text").text("");
          $(".oppAttack").text(`You have defeated `+opponent.name + `. Choose your next opponent.`);
          $(".rightPerson").text("");
          opponent.defeated = true;
          opponent = undefined;
          $("#btnAttack").addClass("d-none");
      }
                  
      numAttacks++;
  });        
  
  $("#btnReplay").on("click", function(){
      $(myFighter.myCard).fadeIn(1);
      startGame();
      $(this).addClass("d-none");
  })

  $(".card").on("click", function(){                      
      let charName = this.attributes["data-charName"].value;
      if(myFighter == undefined || myFighter.length ==0){
          myFighter = fighters.filter(function(o,i){
              if(charName == o.name){
                  fighters.splice(i,1);
              }
              return charName == o.name;
          })[0];
          $(".leftPerson").text(myFighter.name);
          myFighter.attackP = calcMyAP();
          myFighter.currentP = calcMyAP();
          $(myFighter.myCard).fadeOut("slow");
          fighters.forEach(function(obj, i){
              obj.counterP = calcCounterValue(myFighter.hp, i);
          });
      }else if(opponent == undefined || opponent.length ==0){
          opponent = fighters.filter(function(o,i){
              if(charName == o.name && !o.defeated){
                  return charName == o.name;
              }
          })[0];
          $(opponent.myCard).find(".card-text").text(opponent.hp);
          $(".rightPerson").text(opponent.name);
          $("#btnAttack").removeClass("d-none");
      }
  })

  startGame();