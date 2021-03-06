# `new-pilet`

<!--start:auto-generated-->

Scaffolds a new pilet for a specified Piral instance.

## Syntax

From the command line:

```sh
pb new-pilet [source]
```

## Aliases

Instead of `new-pilet` you can also use:

- `create-pilet`
- `new`
- `create`

## Positionals

### `source`

Sets the source package containing a Piral instance for templating the scaffold process.

- Type: `string`
- Default: `piral`

## Flags

### `--target`

Sets the target directory for scaffolding. By default, the current directory.

- Type: `string`
- Default: `"."`

### `--registry`

Sets the package registry to use for resolving the specified Piral app.

- Type: `string`
- Default: `"https://registry.npmjs.org/"`

### `--base`

Sets the base directory. By default the current directory is used.

- Type: `string`
- Default: `process.cwd()`

<!--end:auto-generated-->
