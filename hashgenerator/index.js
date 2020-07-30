randomNumber = () => {
    return Math.floor(Math.random() * 10) + 1;
}

var i = 0
var hash = ""

while (i < 20) {
    var random = randomNumber()
    hash = hash + random
    i++
}
console.log(hash)