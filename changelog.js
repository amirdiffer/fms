var Changelog = require('generate-changelog');
var Fs = require('fs');

return Changelog.generate({ patch: false }) //repoUrl: 'https://git.jointscope.ai/dp/fms-frontend-revamp'
  .then(function (changelog) {
    Fs.writeFileSync('./CHANGELOG.md', changelog);
  });
