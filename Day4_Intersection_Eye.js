function common(first, second){
return first.filter(x => second.includes(x));
}

console.log(common([0, 1, 'z'], ['x', 1, 'y', 'z']))