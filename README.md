<img src="https://jungsoft.io/static/media/jungsoft_logo.c44eaf52.png" width="300px"/>

[![NPM](https://img.shields.io/npm/v/apollo-sentry-helper.svg?style=flat-square)](https://www.npmjs.com/jungsoft/apollo-sentry-helper)
[![Languages](https://img.shields.io/github/languages/count/jungsoft/apollo-sentry-helper?style=flat-square)](#)
[![Stars](https://img.shields.io/github/stars/jungsoft/apollo-sentry-helper?style=flat-square)](https://github.com/jungsoft/apollo-sentry-helper/stargazers)
[![Forks](https://img.shields.io/github/forks/jungsoft/apollo-sentry-helper?style=flat-square)](https://github.com/jungsoft/apollo-sentry-helper/network/members)
[![Contributors](https://img.shields.io/github/contributors/jungsoft/apollo-sentry-helper?style=flat-square)](https://github.com/jungsoft/apollo-sentry-helper/graphs/contributors)

> ⚠️ Capture your Apollo GraphQL exceptions into Sentry, in a meaningful way.

# Apollo Sentry Helper

This package provides a new link to connect Sentry with Apollo Client, in order to automatically report GraphQL errors to Sentry in a meaningful way.

## Installation

With NPM
```
npm install apollo-sentry-helper
```

With Yarn

```
yarn add apollo-sentry-helper
```

## Usage

Initialize Sentry as you would normally. Then, build the error link with your settings and add it to your Apollo Client's `link` array:

```jsx
import { buildSentryErrorLink } from "apollo-sentry-helper";

const sentryErrorLink = buildSentryErrorLink();

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    sentryErrorLink,
    // Other links here
  ]),
});
```

## Options

You can customize what is going to be included in the error report, and which errors should be reported.

```jsx
const sentryErrorLink = buildSentryErrorLink({
  // Defines if the operation body is going to be included in the error report.
  // Defaults to true.
  includeBody: true,

  // Defines if the response is going to be included in the error report.
  // Defaults to true.
  includeResponse: true,

  // Defines if variables are going to be included in the error report.
  // Defaults to true.
  includeVariables: true,

  // Allows the user to filter errors that should be included in the error report.

  // By default errors will only be reported if there was a network error, or if
  // the operation hasn't returned any data, meaning that the server processed the request,
  // but it was invalid. You can override this behavior by setting the "filter" option.
  filter: (error: ErrorResponse) => boolean,
});
```

### Be careful what you include

Please note that Sentry sets some limits to how big events can be. For instance, **events greater than 200KiB are immediately dropped (pre decompression)**. More information on that [here](https://docs.sentry.io/accounts/quotas/#attributes-limits).

Furthermore, much of the data you are sending to Sentry can include (sensitive) personal information. This might lead you to violating the terms of the GDPR, so you'll need to be careful here.

## Contributing

Pull requests are welcome! If you have any feedback, issue or suggestion, feel free to open [a new issue](https://github.com/jungsoft/apollo-sentry-helper/issues/new) so we can talk about it 💬.

## Made possible by

<a href="https://github.com/jungsoft/apollo-sentry-helper/graphs/contributors">
  <img src="https://contributors-img.web.app/image?repo=jungsoft/apollo-sentry-helper" />
</a>

## License

MIT © [Jungsoft](https://github.com/jungsoft)
