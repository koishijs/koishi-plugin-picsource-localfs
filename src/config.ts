import 'source-map-support/register';
import { DefineSchema } from 'koishi-utils-schemagen';
import {
  PicResult,
  PicSource,
  PicSourceConfig,
  PicSourceInfo,
} from 'koishi-plugin-pics';
import { Context } from 'koishi';
import { LocalSource } from './LocalSource';

export interface LocalSourceConfigLike extends PicSourceInfo {
  path: string;
  patterns?: string[];
  exclude?: string[];
  displayFilename?: boolean;
}

export class LocalSourceConfig
  extends PicSourceConfig
  implements LocalSourceConfigLike {
  @DefineSchema({ desc: '目录路径', required: true })
  path: string;
  @DefineSchema({
    desc: '允许的文件后缀。使用 `*` 表示当前目录，`**` 表示递归所有子目录。',
    type: 'string',
    default: ['**.jpg', '**.png'],
  })
  patterns: string[];
  @DefineSchema({
    desc: '排除的路径',
    type: 'string',
    default: [
      '**/.DS_Store',
      '**/node_modules/**',
      '**/.git/**',
      '**/.vscode/**',
      '**/.idea/**',
    ],
    hidden: true,
  })
  exclude: string[];
  @DefineSchema({ desc: '是否显示文件名', default: true })
  displayFilename: boolean;

  registerInstance(ctx: Context) {
    const instance = new LocalSource(ctx, this);
    ctx.on('service/pics', () => {
      if (!ctx.pics) {
        return;
      }
      ctx.pics.addSource(instance, ctx);
    });
  }
}

export interface PicSourceLocalFSPluginConfigLike {
  sources: LocalSourceConfigLike[];
}

export class PicSourceLocalFSPluginConfig
  implements PicSourceLocalFSPluginConfigLike {
  @DefineSchema({ desc: '目录定义', type: LocalSourceConfig, required: true })
  sources: LocalSourceConfig[];
}
