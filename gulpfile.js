var exec = require("child_process").exec;

exports.publishInputs = function (cb) {
  exec(
    "yarn build ng-inputs --prod && cd dist/ng-inputs && npm publish",
    function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    }
  );
};
exports.publishMasks = function (cb) {
  exec(
    "yarn build ng-masks --prod && cd dist/ng-masks && npm publish",
    function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    }
  );
};
exports.publishMaterial = function (cb) {
  exec(
    "yarn build ng-inputs-material --prod && cd dist/ng-inputs-material && npm publish",
    function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    }
  );
};
exports.publishBootstrap = function (cb) {
  exec(
    "yarn build ng-inputs-bootstrap --prod && cd dist/ng-inputs-bootstrap && npm publish",
    function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    }
  );
};
