// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const packageJson = require('../../../../package.json');
export const assetsPath = 'assets/';

export const environment = {
  appName: 'Fleet Management Service',
  envName: 'DEV',
  production: false,
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
  baseFileServer: 'http://localhost:4200/fms-api/document/',
  baseLoginApiUrl: 'http://localhost:4200/fms-api/',
  baseApiUrl: 'http://localhost:4200/fms-api/'
  // baseLoginApiUrl: 'https://uat.jointscope.ai/fms-api-revamp/v1/',
  // baseApiUrl: 'https://uat.jointscope.ai/fms-api-revamp/v1/'
};
