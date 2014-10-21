# 2014 General Election

**General election coverage for [Lane County](http://en.wikipedia.org/wiki/Lane_County,_Oregon), [Oregon](http://en.wikipedia.org/wiki/Oregon); developed and curated by [The Register-Guard](http://registerguard.com).**

## Jekyll

Install missing gems:

```bash
$ cd repo/
$ bundle install
```

Or, update gems:

```
$ bundle update
```

Execute jekyll and serve:

```bash
$ bundle exec jekyll serve --baseurl ''
```

View drafts:

```bash
$ bundle exec jekyll serve --drafts --baseurl ''
```

View your locally-hosted site at <http://localhost:4000>.

## Bower

After a fresh clone of this repo, run:

```bash
$ npm install
```

This will locally install Bower [npm](https://www.npmjs.org/) modules.

Next, edit [`bower.json`](bower.json).

For Bower documentation, read [this](http://bower.io/) and [this](https://github.com/blittle/bower-installer)).

Finally, install or update Bower dependencies:

```bash
$ npm run bower-installer
```

**Note:** The `gh-pages` gem does not support Bower; it’s up to you to manually update these front-end dependencies, every once in a while (when appropriate), via the command line on your local/development machine.
