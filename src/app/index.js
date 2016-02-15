import { generators } from 'yeoman-generator';
import fs from 'fs';

export default class MammalReact extends generators.Base {

  constructor( ...args ) {

    super(...args);
    this.config = {};
  }

  prompting() {

    const done = this.async();

    this.prompt([
      {
        type: 'input',
        name: 'appName',
        message: 'The name of the project',
        default: this.appname,
      },
      {
        type: 'input',
        name: 'appServerPort',
        message: 'The port on which the Node.js web server will run',
        default: 3000,
      },
      {
        type: 'confirm',
        name: 'npmInstall',
        message: 'Run npm install after scaffolding (may take a few minutes)?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'gitInit',
        message: 'Initialize an empty git repository after scaffolding?',
        default: true,
      },
      {
        type: 'input',
        name: 'gitRemote',
        message: 'The URL for the git "origin" remote (leave blank for none)',
        when: ( res ) => res.gitInit,
      }
    ], ( res ) => {

      this.config = Object.assign({}, this.config, res);
      done();
    });
  }

  writing() {

    // Map of files in ./templates that can be copied directly to their
    // destination.
    const filesToCopy = [
      [ '_babelrc', '.babelrc' ],
      [ '_editorconfig', '.editorconfig' ],
      [ '_eslintrc', '.eslintrc' ],
      [ '_gitignore', '.gitignore' ],
      [ '_entry.json', 'entry.json' ],
      [ '_gulpfile.js', 'gulpfile.js' ],
      [ 'src/**/*', 'src' ],
    ];

    // Map of files in ./templates that need to be processed via fs.copyTpl
    // before being written to their destination.
    const filesToTemplate = [
      [ '_package.json', 'package.json' ],
      [ '_env.example', '.env.example' ],
      [ '_env.example', '.env' ],
      [ '_readme.md', 'README.md' ],
    ];

    // List of extra empty directories to create. If the directory already
    // exists it will not be modified.
    const directoriesToCreate = [
      'resources',
    ];

    // Write files. The "src/" directory is copied as-is. It can contain
    // dotfiles which are meant to end up in the scaffolded app so we need to
    // set the "dot" glob option or they are ignored.
    for ( let [ source, dest ] of filesToCopy ) {
      this.fs.copy(this.templatePath(source), this.destinationPath(dest), {
        globOptions: {
          dot: true,
        },
      });
    }

    for ( let [ source, dest ] of filesToTemplate ) {
      this.fs.copyTpl(
        this.templatePath(source), this.destinationPath(dest), this.config
      );
    }

    for ( let name of directoriesToCreate ) {
      try {
        fs.mkdirSync(name);
      } catch ( e ) {}
    }
  }

  install() {

    // Install all dependencies from npm.
    if ( this.config.npmInstall ) {
      this.npmInstall();
    }

    // Initialize an empty git repository. Making the first commit is left up to
    // the user to provide a chance to edit the default setup.
    if ( this.config.gitInit ) {
      this.spawnCommandSync('git', [
        'init',
      ]);
    }

    // Set the git "origin" remote.
    if ( this.config.gitRemote ) {
      this.spawnCommand('git', [
        'remote',
        'add',
        'origin',
        this.config.gitRemote,
      ]);
    }
  }
}
