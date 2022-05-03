import { Random } from 'koishi';
import { PicResult, PicSourcePlugin } from 'koishi-plugin-pics';
import { DefinePlugin, MultiInstancePlugin } from 'koishi-thirdeye';
import path from 'path';
import { readDirDeep } from 'read-dir-deep';
import { LocalSourceConfig } from './config';
import fs from 'fs';

@DefinePlugin()
export class LocalSource extends PicSourcePlugin(LocalSourceConfig) {
  async randomPic(picTags: string[]): Promise<PicResult> {
    const absolutePath = path.resolve(process.cwd(), this.config.path);
    const files = (
      await readDirDeep(absolutePath, {
        absolute: true,
        patterns: this.config.patterns,
        gitignore: false,
        ignore: this.config.exclude,
      })
    ).filter((f) => picTags.every((t) => f.includes(t)));
    if (!files.length) {
      return null;
    }
    const filename = Random.pick(files);
    const fileBase64 = (await fs.promises.readFile(filename)).toString(
      'base64',
    );
    return {
      url: `base64://${fileBase64}`,
      description: this.config.displayFilename
        ? path.basename(filename)
        : undefined,
    };
  }
}

@DefinePlugin()
export default class LocalSourcePlugin extends MultiInstancePlugin(
  LocalSource,
) {}
