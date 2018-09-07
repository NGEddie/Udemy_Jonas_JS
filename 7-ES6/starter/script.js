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

let park = [3];
park[0] = new Parks('park1',1000,54,756);
park[1] = new Parks('park2', 340, 31,420);
park[2] = new Parks('park3',1500, 103, 1212);

function averageAge(arr) {
    let agesTotal = arr.map(el => el.age).reduce((sum,a)=>(sum+a));
    // let averageAge = ages.reduce((sum, a) => (sum + a))/ages.length;
    return `The average age of our ${arr.length} parks is ${agesTotal/arr.length} years`;
}

console.log(averageAge(park));
// console.log(averag;

