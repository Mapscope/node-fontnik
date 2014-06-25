var cjk = {
    'none': {},
    'cjk-osm': require('./expected/cjk-common.json'),
    'cjk-modern': require('./expected/cjk-modern.json'),
    'hangul-osm': require('./expected/hangul-common.json')
};

var tiles = {
    'china': [
        require('./fixtures/china/14.13718.6692.json'),
        require('./fixtures/china/14.13718.6693.json'),
        require('./fixtures/china/14.13719.6692.json'),
        require('./fixtures/china/14.13719.6693.json'),
        require('./fixtures/china/14.13345.7109.json'),
        require('./fixtures/china/14.13346.7109.json'),
        require('./fixtures/china/14.13345.7110.json'),
        require('./fixtures/china/14.13346.7110.json'),
        require('./fixtures/china/14.13486.6207.json'),
        require('./fixtures/china/14.13487.6207.json'),
        require('./fixtures/china/14.13486.6208.json'),
        require('./fixtures/china/14.13487.6208.json')
    ],
    'taiwan': [
        require('./fixtures/taiwan/14.13662.7116.json'),
        require('./fixtures/taiwan/14.13722.7014.json'),
        require('./fixtures/taiwan/14.13723.7013.json'),
        require('./fixtures/taiwan/14.13723.7015.json'),
        require('./fixtures/taiwan/14.13723.7017.json'),
    ],
    'hong-kong': [
        require('./fixtures/hong-kong/14.13387.7151.json'),
        require('./fixtures/hong-kong/14.13388.7150.json'),
        require('./fixtures/hong-kong/14.13388.7151.json'),
        require('./fixtures/hong-kong/14.13389.7148.json'),
    ],
    'macau': [
        require('./fixtures/macau/14.13359.7155.json')
    ],
    'north-korea': [
        require('./fixtures/north-korea/14.13915.6259.json'),
        require('./fixtures/north-korea/14.13915.6260.json'),
        require('./fixtures/north-korea/14.13916.6260.json'),
    ],
    'south-korea': [
        require('./fixtures/south-korea/14.13968.6481.json'),
        require('./fixtures/south-korea/14.13971.6344.json'),
        require('./fixtures/south-korea/14.13974.6343.json'),
        require('./fixtures/south-korea/14.13977.6388.json'),
        require('./fixtures/south-korea/14.13989.6414.json'),
        require('./fixtures/south-korea/14.13991.6415.json'),
        require('./fixtures/south-korea/14.14044.6441.json')
    ]
};

Object.keys(tiles).forEach(function(locale) {
    var ranges = Object.keys(cjk).reduce(function(prev, key) {
        prev[key] = {};
        return prev;
    }, {});

    tiles[locale].forEach(function(layers) {
        layers.forEach(function(l) {
            l.features.forEach(function(f) {
                if (!f.properties.name) return;
                var name = f.properties.name;
                for (var i = 0; i < name.length; i++) {
                    var char = name.charCodeAt(i);
                    Object.keys(cjk).forEach(function(type) {
                        if (cjk[type][char]) {
                            ranges[type][cjk[type][char]] = true;
                        } else {
                            var start = Math.floor(char/256) * 256;
                            var range = start + '-' + (start + 255);
                            ranges[type][range] = true;
                        }
                    });
                }
            });
        });
    });

    console.log('\n' + locale);

    Object.keys(cjk).forEach(function(type) {
        console.log(type + ' (%s ranges)', Object.keys(ranges[type]).length);
        // console.log(Object.keys(ranges[type]).sort());
    });
});
