let myFighter, myOpponent, fighters = []

let f = new Fighter(150,"Luke");
fighters.push(f);
f = new Fighter(190,"Vader");
fighters.push(f);
f = new Fighter(210,"Darth");
fighters.push(f);
f = new Fighter(300,"Yoda");
fighters.push(f);

let cardClick = function(){
  console.log(this);
  let thisCard = this;
  if(myFighter === undefined || myFighter.length==0){
    myFighter = fighters.filter(function(o,i){
        return o.myCard[0] == thisCard;
    })
    fighters = jQuery.grep(fighters, function(value) {
      return value != myFighter[0];
    });
  }else{

  }
}


fighters.forEach(function(o){
    let aF =$("<div>").addClass("card col-2 m-3").append(`<img class="card-img-top" src="/images/pathToYourImage.png" alt="Card image cap">
    <div class="card-body">
      <h4 class="card-title"></h4>
      <p class="card-text">
        Some quick example text to build on the card title
        and make up the bulk of the card's content.
      </p>
      <a href="#!" class="btn btn-primary">Go somewhere</a>
    </div>`);
    aF.find(".card-title").text(o.name);
    o.myCard = aF;
    $("#fighterPit").append(o.myCard);
   $(o.myCard).on("click", cardClick);
})

fighters[2].myCard.css("opacity", "0.2");