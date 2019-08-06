var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var fs = require('fs');

var dataFile = fs.readFileSync('./ta25k.kml');

var dataJSON = []

parser.parseString(dataFile, function (err, result) {
    if (err) return console.error('Cannot parse string');
    var data = result.kml.Document[0].Folder[0].Placemark;
    data.forEach(function (el) {
        var item = {
            code: el.name[0],
            description: el.description[0]
        }
        var meta = el.ExtendedData[0].SchemaData[0].SimpleData;
        item.editDate = Number(meta[0]._);
        item.category = meta[1]._;
        item.date =  Date.parse(meta[2]._);
        if (el.hasOwnProperty('Polygon')) {
            var coordinates = [];
            
            var parsed = el.Polygon[0].outerBoundaryIs[0].LinearRing[0].coordinates[0].split(' ')
            parsed.forEach(function (k) {
                var j = k.split(',');
                coordinates.push([parseFloat(j[0]), parseFloat(j[1])])
            });
            item.coordinates = coordinates;
            dataJSON.push(item);
        }
    });
    fs.writeFileSync('./ta25k.json', JSON.stringify(dataJSON), 'utf8');
});