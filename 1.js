'use strict';

const fs = require('fs');
const path = require('path');

const validExtensions = ['.js', '.jsx', '.ts', '.tsx'];
const directory = process.cwd();
const ignored = /node_modules/;
const filelist = [];

function getFiles(dir) {
  const directory = dir + '/';
  fs.readdir(directory, (err, files) => {
    files.forEach(file => {
      const fileName = directory + file;
      fs.stat(fileName, (err, stats) => {
        // console.log('FILE: ', file);
        if (!err && stats.isDirectory() && !ignored.exec(file)) {
          getFiles(fileName);
        } else {
          if (validExtensions.includes(path.extname(file))) {
            // fixPropTypes
            // log files to be changed
            fixPropTypes(fileName);
            filelist.push(fileName);
          }
        }
        // console.log('---', filelist);
      });
    });
  });
}

function parseGroups(p1, p2) {
  const g1 = p1.trim();
  const g2 = p2.trim();
  if (!g1.length && !g2.length) {
    return '';
  }
  const replacement = [].concat(g1.split(/ *, */), g2.split(/ *, */)).filter(Boolean).join(', ');
  return ', { ' + replacement + ' }';
}

const pattern = /\, *\{(.*)PropTypes(.*)\}/;
const pattern2 = /React\.PropTypes/g;
const validPropTypes = /import +PropTypes +from +'prop-types'/;
const propTypesImportString = 'import PropTypes from \'prop-types\';';

function fixPropTypes(fileName) {
  let modifiedData = '';

  fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    modifiedData = data
    .replace(pattern2, function(match, p1, offset, string) {
      const replacement = 'PropTypes';
      return replacement;
    })
    .replace(pattern, function(match, p1, p2, offset, string) {
      const replacement = parseGroups(p1, p2);
      return replacement;
    });

    const hasValidPropTypes = validPropTypes.exec(modifiedData);

    if (data !== modifiedData) {
      fs.writeFile(fileName, modifiedData, (err) => {
        if (err) {
          throw err;
        }

        if (!hasValidPropTypes) {
          const dataArray = modifiedData.split(/\n/);
          dataArray.splice(1, 0, propTypesImportString );
          modifiedData = dataArray.join('\n');
          fs.writeFile(fileName, modifiedData, (err) => {
            if (err) {
              throw err;
            }
          });
        }

        console.log(`\nThe file ${fileName} has been modified`);
      });
    }

  });
}

getFiles(directory);
// fixPropTypes('./test.js');
