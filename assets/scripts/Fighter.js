class Fighter {
    constructor(hp=0, name, myCard) {
        this.hp = hp,
        this.counterP = 0,
        this.attackP = 0,
        this.name=name,
        this.currentAP = 0,
        this.defeated = false,  
        this.myCard = myCard,
        this.maxHealth = hp
    }

    increaseAttackP(){
        this.currentAP +=this.attackP;
        console.log(this.currentAP)
    }

    takeDamage(arg){
        this.hp -= arg;
        console.log(this.name + " " + this.hp);
    }
}