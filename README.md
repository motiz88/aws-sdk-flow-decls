# aws-sdk-flow-decls
[![circle][circle-image]][circle-url]
[![npm][npm-image]][npm-url]

[![semantic release][semantic-release-image]][semantic-release-url]
[![js-semistandard-style][semistandard-image]][semistandard-url]
[![Apache License, Version 2.0][license-image]][license-url]

Flow type declarations for AWS SDK

## Usage
```sh
npm install --save-dev aws-sdk-flow-decls
```

Then add to [`.flowconfig`](https://flowtype.org/docs/advanced-configuration.html):

```
[libs]
node_modules/aws-sdk-flow-decls
```

## Notes

This is an early release. Use with caution. There will be changes (to be communicated via semver).

Built with [aws-sdk-flow-decls-gen](https://github.com/motiz88/aws-sdk-flow-decls-gen).

[circle-image]: https://img.shields.io/circleci/project/motiz88/aws-sdk-flow-decls.svg?style=flat-square
[circle-url]: https://circleci.com/gh/motiz88/aws-sdk-flow-decls
[npm-image]: https://img.shields.io/npm/v/aws-sdk-flow-decls.svg?style=flat-square
[npm-url]: https://npmjs.org/package/aws-sdk-flow-decls
[semantic-release-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[license-image]: https://img.shields.io/badge/license-Apache2.0-brightgreen.svg?style=flat-square
[license-url]: http://www.apache.org/licenses/LICENSE-2.0
[semistandard-image]: https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square
[semistandard-url]: https://github.com/Flet/semistandard
