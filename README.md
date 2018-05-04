# Telegram Bot API typings for Flow, TypeScript and Rust

This repository contains [Telegram Bot API](https://core.telegram.org/bots/api) typings for [Flow](https://flow.org/), [TypeScript](https://www.typescriptlang.org/) and [Rust](https://www.rust-lang.org/).

The types are automatically generated for all supported languages from the Telegram Bot API website.

## Flow and TypeScript typings

See [javascript/](javascript/) folder.

## Rust typings

See [rust](rust/) folder.

## Contributing

Source code for the type generation lives under [lib/](lib/) folder.

### Setting up local development environment

To contribute to this project, you will need to have the following tools installed:

* Rust
* Node v8.x or higher
* npm v5.7.1 or higher

Once these tools are installed, you can install the required dependencies:

```
npm install
cargo install rustfmt --version 0.9.0
```

### Generating new typings

To generate new types, run the following:

```
npm run build
```

If the [Telegram Bot API](https://core.telegram.org/bots/api) documentation has not changed, and you haven't done any changes to code, you should not get any diff.
