#!/usr/bin/env node

var executable = {
  'darwin': 'binaries/Atom.app/Contents/MacOS/Atom',
  'win32': 'binaries\\atom.exe',
  'linux': 'binaries/atom'
}[process.platform];

require('child_process').spawn(executable, ['build'], {stdio: 'inherit'});