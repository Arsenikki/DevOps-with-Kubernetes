const uuid = require('uuid');
savedUuid = uuid.v4()

var hasher = () => {
    currentTime = new Date().toISOString()
    console.log(currentTime, savedUuid );
    setTimeout(hasher, 5000);
}
hasher();