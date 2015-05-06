# postcss-generate-preset [![Build Status][ci-img]][ci]

[PostCSS] plugin that allows quick generation of rules. Useful for quickly creating repetitive utilities.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/simonsmith/postcss-generate-preset.svg
[ci]:      https://travis-ci.org/simonsmith/postcss-generate-preset

## Installation

``` console
$ npm install postcss-generate-preset
```

## Usage

**input.css**

``` css
@generate-preset .u-mp margin padding 0 10px;
@generate-preset .u-mt margin-top 10px 20px;
```

**output.css**

``` css
.u-mp0 {
  margin: 0;
  padding: 0;
}

.u-mp10 {
  margin: 10px;
  padding: 10px;
}

.u-mt10 {
  margin-top: 10px;
}

.u-mt20 {
  margin-top: 20px;
}
```

``` js
var presets = require('postcss-generate-preset');
postcss([ presets() ])
```

### Options

#### `useImportant` (default: `false`)

When set to `true` all declarations will use `!important`. Often useful when utility classes need to override component styles

#### `zeroValue` (default): `false`)

The default is to add zero to a selector. In some cases it might be desirable to display it differently

``` js
presets({ zeroValue: 'Z' });
```

``` css
@generate-preset .u-m margin 0;

/* becomes */

.u-mZ {
  margin: 0;
}
```


See [PostCSS] docs for examples for your environment.
