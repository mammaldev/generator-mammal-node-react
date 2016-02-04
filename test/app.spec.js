import path from 'path';
import assert from 'yeoman-assert';
import { test as helpers } from 'yeoman-generator';

describe('generator-mammal-node-react:app', () => {

  before(( done ) => {
    helpers
      .run(path.join(__dirname, '../src/app'))
      .withPrompts({
        gitInit: false,
      })
      .on('end', done);
  });

  it('creates files', () => {
    assert.file([
      '.babelrc',
      '.editorconfig',
      '.env.example',
      '.env',
      '.eslintrc',
      '.gitignore',
      'entry.json',
      'gulpfile.js',
      'package.json',
      'README.md',
      'src/client/styles/app.scss',
      'src/client/.eslintrc',
      'src/client/app.jsx',
      'src/server/server.jsx',
      'src/universal/components/app.jsx',
      'src/universal/reducers.js',
      'src/universal/routes.jsx',
    ]);
  });
});
