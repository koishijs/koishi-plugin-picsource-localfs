import { Random } from 'koishi';
import { PicResult, PicSourcePlugin } from 'koishi-plugin-pics';
import { DefinePlugin } from 'koishi-thirdeye';
import path from 'path';
import { readDirDeep } from 'read-dir-deep';
import { LocalSourceConfig } from './config';
import fs from 'fs';

@DefinePlugin()
export default class LocalSource extends PicSourcePlugin(LocalSourceConfig) {
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
    const data = await this.pics.urlToBuffer(`file://${filename}`);
    return {
      url: await this.pics.bufferToUrl(data.buffer, data.mime),
      description: this.config.displayFilename
        ? path.basename(filename)
        : undefined,
    };
  }
}
