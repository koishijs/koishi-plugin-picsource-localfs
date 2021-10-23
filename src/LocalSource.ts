import { PicResult, PicSource } from 'koishi-plugin-pics';
import { Context, Random } from 'koishi';
import path from 'path';
import { readDirDeep } from 'read-dir-deep';
import fs from 'fs';
import { LocalSourceConfig } from './config';

export class LocalSource extends PicSource {
  constructor(ctx: Context, private config: LocalSourceConfig) {
    super(ctx);
    config.applyTo(this);
  }

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
