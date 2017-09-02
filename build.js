const fs = require('fs')
const postcss = require('postcss')
const mkdirp = require('mkdirp')

console.info('Started growing a Beard!')

let config = require('./beard')

fs.readFile('resources/css/app.css', (err, css) => {
    postcss([
        require('postcss-import'),
        require('postcss-beard-font-scale')(config),
        require('postcss-beard-colors')(config),
        require('postcss-beard-spacing')(config),
        require('postcss-copy-class')(config),
        require('postcss-beard-responsive')(config),
        require('postcss-custom-media')({extensions: config.breakpoints}),
        require('lost')(config.grid),
        require('autoprefixer'),
    ])
        .process(css, {
            from: 'resources/css/app.css',
            to: 'css/app.css',
            map: {inline: false},
        })
        .then(result => {
            mkdirp('css', function(err) {
                fs.writeFileSync('css/app.css', result.css)
                if (result.map) fs.writeFileSync('css/app.css.map', result.map)
            })
        })
        .catch(error => console.log(error))
})

console.log('Respectable Beard my friend!')
