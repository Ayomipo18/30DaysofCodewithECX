class Car{
	constructor(tyres){
		this.carTyres = tyres;
	}
	getTyres(){
		return this.carTyres;
	}
}

let mycar = new Car(4);

console.log(mycar.getTyres());