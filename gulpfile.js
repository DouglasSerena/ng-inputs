var exec = require("child_process").exec;

exports.publishInputs = function (cb) {
  exec(
    "yarn build ng-inputs --prod && cd dist/ng-inputs && npm publish --access public",
    function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    }
  );
};
exports.publishMasks = function (cb) {
  exec(
    "yarn build ng-masks --prod && cd dist/ng-masks && npm publish --access public",
    function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    }
  );
};
exports.publishMaterial = function (cb) {
  exec(
    "yarn build ng-inputs-material --prod && cd dist/ng-inputs-material && npm publish --access public",
    function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    }
  );
};
exports.publishBootstrap = function (cb) {
  exec(
    "yarn build ng-inputs-bootstrap --prod && cd dist/ng-inputs-bootstrap && npm publish --access public",
    function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    }
  );
};
exports.publishUtils = function (cb) {
  exec(
    "yarn build ng-utils --prod && cd dist/ng-utils && npm publish --access public",
    function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    }
  );
};
