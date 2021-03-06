import * as tar from 'tar';
import { createGunzip } from 'zlib';
import { mkdirSync, existsSync, writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import { deepMerge } from './merge';
import { TarFiles, ReadEntry } from './types';

export function createDirectory(targetDir: string) {
  try {
    mkdirSync(targetDir, { recursive: true });
    return true;
  } catch (e) {
    console.error(`Error while creating ${targetDir}: `, e);
    return false;
  }
}

export function createFileIfNotExists(targetDir: string, fileName: string, content: string) {
  const targetFile = join(targetDir, fileName);

  if (!existsSync(targetFile)) {
    writeFileSync(targetFile, content, 'utf8');
  }
}

export function updateExistingFile(targetDir: string, fileName: string, content: string) {
  const targetFile = join(targetDir, fileName);

  if (existsSync(targetFile)) {
    writeFileSync(targetFile, content, 'utf8');
  }
}

export function mergeWithJson<T>(targetDir: string, fileName: string, newContent: T) {
  const targetFile = join(targetDir, fileName);
  const content = readFileSync(targetFile, 'utf8');
  const originalContent = JSON.parse(content);
  return deepMerge(originalContent, newContent);
}

export function updateExistingJson<T>(targetDir: string, fileName: string, newContent: T) {
  const content = mergeWithJson(targetDir, fileName, newContent);
  updateExistingFile(targetDir, fileName, JSON.stringify(content, undefined, 2));
}

export function untarPackage(stream: NodeJS.ReadableStream): Promise<TarFiles> {
  return new Promise((resolve, reject) => {
    const files: TarFiles = {};
    stream
      .on('error', reject)
      .pipe(createGunzip())
      .on('error', reject)
      .pipe(new (tar.Parse as any)())
      .on('error', reject)
      .on('entry', (e: ReadEntry) => {
        const content: Array<Buffer> = [];
        const p = e.path;
        e.on('error', reject);
        e.on('data', (c: Buffer) => content.push(c));
        e.on('end', () => {
          files[p] = Buffer.concat(content).toString();
        });
      })
      .on('end', () => resolve(files));
  });
}
