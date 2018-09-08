class Parks{
    constructor(name, size, age, noOfTrees,) {
        this.name = name;
        this.size = size;
        this.age = age;
        this.noOfTrees = noOfTrees;
    }

    treeDensity(){
        return this.noOfTrees / this.size;
    }
}

class Streets{
    constructor(name = 'noName', streetLength = 1, type = 'normal', yearOfBuild = 1900){
        this.name = name;
        this.streetLength = streetLength;
        this.type = type;
        this.yearOfBuild= yearOfBuild;
    }
}


let park = [3];
park[0] = new Parks('park1',1000,54,756);
park[1] = new Parks('park2', 340, 31,420);
park[2] = new Parks('park3',1500, 103, 1212);

let street = [new Streets('street1',50,'small',1990),new Streets('street2',123,'big', 1986), new Streets(name = 'street3', streetLength = 75 ,yearOfBuild = 1984), new Streets('street4',234,'huge',1963)];

function averageAge(arr) {
    let agesTotal = arr.map(el => el.age).reduce((sum,a)=>(sum+a));
    return `The average age of our ${arr.length} parks is ${agesTotal/arr.length} years`;
}

function densityOfTrees(arr) {
    for (const apark of arr) {
        console.log(`${apark.name} has a tree density of ${apark.treeDensity()} trees per unit`);
    }
}

console.log('<<<<<<<<<< Park Report >>>>>>>>>>>>');

console.log(averageAge(park));
densityOfTrees(park);

park.map(el => { if(el.noOfTrees > 1000)  console.log(`${el.name} has over a 1000 trees with ${el.noOfTrees} in total`)}) ;

console.log('<<<<<<<<<< Street Report >>>>>>>>>>>>');

function streetInfo(arr) {
    let totalLength = 0
    for (const i of arr) {       
        totalLength += i.streetLength;
    }
    return console.log(`Our ${arr.length} parks have a total length of ${totalLength}, with an average length of ${totalLength/arr.length}m`);
}

streetInfo(street);
street.map(el=> console.log(`${el.name}, built in ${el.yearOfBuild}, is a ${el.type} street`));
