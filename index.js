var postcss = require('postcss');

module.exports = postcss.plugin('postcss-generate-preset', generatePreset);

function generatePreset(opts) {
  opts = opts || {};

  return function(css) {
    css.walkAtRules(function (atRule) {
      if (atRule.name !== 'generate-preset') {
        return;
      }

      /**
       * Parse: `.u-mf margin font-size 5px 10px 15px`
       * Return: `['.u-mf', 'margin font-size', '5px 10px 15px']`
       */
      var matches = /(^\.[a-z-_.]+)\s([a-z-\s]+)\s([a-z0-9\s\.]+)/ig.exec(atRule.params);
      if (!matches) {
        return;
      }

      var root = atRule.parent;
      var selector = matches[1];
      var properties = postcss.list.space(matches[2]);
      var values = postcss.list.space(matches[3]);

      values.forEach(function(value) {
        var numeric = parseFloat(value, 10);

        // Reassign 0 with zeroValue if specified
        // Used for selectors like .u-mZ instead of .u-m0
        if (numeric === 0 && opts.zeroValue) {
          numeric = opts.zeroValue;
        }

        // Can't have decimal values in the selector,
        // so replace dots with dashes
        if (isFloat(numeric)) {
          numeric = (numeric + '').replace('.', '-');
        }

        var rule = postcss.rule({
          selector: selector + numeric
        });

        if (opts.useImportant) {
          value += ' !important';
        }

        properties.forEach(function(prop) {
          rule.append(postcss.decl({
            prop: prop,
            value: value
          }));
        });

        root.insertBefore(atRule, rule);
      });

      atRule.remove();
    });
  };
}

function isFloat(n) {
  return n === +n && n !== (n | 0);
}
