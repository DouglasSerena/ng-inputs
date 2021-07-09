var exec = require("child_process").exec;

exports.publishInputs = function (cb) {
  exec(
    "yarn build ng-inputs && cd dist/ng-inputs && npm publish --access public",
    function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    }
  );
};
exports.publishMasks = function (cb) {
  exec(
    "yarn build ng-masks && cd dist/ng-masks && npm publish --access public",
    function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    }
  );
};
exports.publishMaterial = function (cb) {
  exec(
    "yarn build ng-inputs-material && cd dist/ng-inputs-material && npm publish --access public",
    function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    }
  );
};
exports.publishBootstrap = function (cb) {
  exec(
    "yarn build ng-inputs-bootstrap && cd dist/ng-inputs-bootstrap && npm publish --access public",
    function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    }
  );
};
exports.publishUtils = function (cb) {
  exec(
    "yarn build ng-utils && cd dist/ng-utils && npm publish --access public",
    function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    }
  );
};
