const fs = require('fs');
const input = require('./input.json');
const output = [];

for (k in input.features) {
    obj = {}
    obj.category = input.features[k].properties.theme_title || '';
    obj.description = input.features[k].properties.name_complement || '';
    obj.code = input.features[k].properties.code_article || '';
    date = new Date(input.features[k].properties.updated_at)
    obj.editDate = date.getFullYear();
    obj.date = date.getTime();
    bbox = input.features[k].properties.bbox
    x = [bbox[0], bbox[2]]
    y = [bbox[1], bbox[3]]
    x_min = Math.min(...x)
    x_max = Math.max(...x)
    y_min = Math.min(...y)
    y_max = Math.max(...y)
    obj.coordinates = [[x_min,y_max],[x_max,y_max], [x_max,y_min], [x_min,y_min], [x_min,y_max]]
    output.push(obj)
}
fs.writeFileSync('./output.json', JSON.stringify(output), 'utf8');
/**
[[4.676646301172022,44.81999064106767],[4.856653149055983,44.819991554355965],[4.856654932819804,44.63999470987564],[4.676648106141753,44.63999379945035],[4.676646301172022,44.81999064106767]]
{
    "code":"2226O",
    "description":"ARDENTES",
    "editDate":2006,
    "category":"Série Bleue",
    "date":1171411200000,
    "coordinates":
        [[1.796512613751144,46.79994545114613],[1.976519604935038,46.799946572578534],[1.976521959864934,46.61994874783862],[1.796514991883651,46.6199476296849],[1.796512613751144,46.79994545114613]]
}
**/