# find-ign-map
A tool to get linked IGN map for a GPS point.

You can search a map code in the IGN shop here: `https://ignrando.fr/boutique/catalogsearch/result/?q={code}`

```javascript
var findIgnMap = require('find-ign-map');
findIgnMap([long,lat]);
```