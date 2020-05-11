const fs = require('fs');
const path = require('path');

const packagesPath = path.resolve(__dirname, '..', 'packages');
const files = fs.readdirSync(packagesPath);

files.forEach((file) => {
  const packagePath = path.join(packagesPath, file);

  if (fs.statSync(packagePath).isDirectory()) {
    const packageJsonPath = path.join(packagePath, 'package.json');

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath));

    if (packageJson.peerDependencies) {
      Object.keys(packageJson.peerDependencies).forEach((key) => {
        if (key.startsWith('@de-re-crud')) {
          packageJson.peerDependencies[key] = packageJson.version;
        }
      });
    }

    let formattedJson = JSON.stringify(packageJson, null, 2);
    formattedJson += '\n';

    fs.writeFileSync(packageJsonPath, formattedJson);
  }
});
