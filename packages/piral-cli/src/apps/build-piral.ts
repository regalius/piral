import * as Bundler from 'parcel-bundler';
import { join, dirname, basename } from 'path';
import { extendConfig } from './common';

export interface BuildPiralOptions {
  entry?: string;
  target?: string;
}

export const buildPiralDefaults = {
  entry: './src/index.html',
  target: './dist/index.html',
};

export function buildPiral(baseDir = process.cwd(), options: BuildPiralOptions = {}) {
  const { entry = buildPiralDefaults.entry, target = buildPiralDefaults.target } = options;
  const entryFiles = join(baseDir, entry);

  process.env.NODE_ENV = 'production';

  (async function() {
    const bundler = new Bundler(
      entryFiles,
      extendConfig({
        outDir: dirname(target),
        outFile: basename(target),
        watch: false,
        minify: true,
        scopeHoist: false,
        contentHash: true,
      }),
    );

    await bundler.bundle();
  })();
}
