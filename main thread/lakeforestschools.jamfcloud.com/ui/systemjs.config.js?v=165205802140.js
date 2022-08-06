SystemJS.config({
    packages: {
        '.': {
            warnings: true,
            map: {
                'angular': 'node_modules/angular/angular.js',
                'angular-translate': 'node_modules/angular-translate/dist/angular-translate.js',
                'angular-translate-interpolation-messageformat': 'node_modules/angular-translate-interpolation-messageformat/angular-translate-interpolation-messageformat.js',
                'angular-translate-loader-static-files': 'node_modules/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
                'messageformat': 'node_modules/messageformat/messageformat.js',
                'rxjs': 'node_modules/rxjs/bundles/rxjs.umd.js',
                'luxon': 'node_modules/luxon/build/global/luxon.js',
                'angular-ui-router': 'node_modules/angular-ui-router/release/angular-ui-router.js',
                'tslib': 'node_modules/tslib/tslib.js'
            },
            // Meta solves library-to-library dependencies
            meta: {
                'node_modules/angular/angular.js': {
                    format: 'global'
                }
            }
        }
    }
});
