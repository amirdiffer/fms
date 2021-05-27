const packageJson = require('../../../../package.json');
export const assetsPath = 'assets/';

export const environment = {
  appName: 'Fleet Management Service',
  envName: 'PROD',
  production: true,
  test: false,
  i18nPrefix: '',
  versions: {
    app: packageJson.version,
    build: packageJson.build,
    angular: packageJson.dependencies['@angular/core'],
    ngrx: packageJson.dependencies['@ngrx/store'],
    material: packageJson.dependencies['@angular/material'],
    bootstrap: packageJson.dependencies.bootstrap,
    rxjs: packageJson.dependencies.rxjs,
    ngxtranslate: packageJson.dependencies['@ngx-translate/core'],
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript'],
    cypress: packageJson.devDependencies['cypress'],
    eslint: packageJson.devDependencies['eslint']
  },
  baseFileServer: '/fms-api/document/',
  baseLoginApiUrl: '/fms-api/',
  baseApiUrl: '/fms-api/'
};
