# Versioning in package.json

When installing a package with `npm install --save` or `--save-dev` (or `--save-prod`, which replaces `--save`), you end up with entries in your `package.json` file, that look something like this:

```
"express": "^4.16.3"
```

What does the `^` mean?

You can learn about all available version annotations/ syntaxes here: https://docs.npmjs.com/misc/semver#versions

This post on Stackoverflow provides a great summary: https://stackoverflow.com/a/25861938

# Useful resources:

Official npm Docs: https://docs.npmjs.com/

Learn more about Webpack (a build tool using Node.js): https://academind.com/learn/webpack