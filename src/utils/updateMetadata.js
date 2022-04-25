let fs = require('fs');

for(let i = 1; i <= 2; i++) {
    var name = './public/nft/api/' + i + '.json';
    var m = JSON.parse(fs.readFileSync(name).toString());
    m.image = 'ipfs://QmVkbWgNadsKVX1eYRj3EmbjHM3TdDqidMy6T4hoC2SJJR/' + i + '.png';
    fs.writeFileSync(name, JSON.stringify(m));
}

for(let i = 3; i <= 3; i++) {
    var name = './public/nft/api/' + i + '.json';
    var m = JSON.parse(fs.readFileSync(name).toString());
    m.image = 'ipfs://QmY28DMHo2uc1KVDT1yke4Ugj9r9H8qEPgoLjZPSfjdBo2/' + i + '.png';
    fs.writeFileSync(name, JSON.stringify(m));
}