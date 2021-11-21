import 'source-map-support/register';
import { Context } from 'koishi';
import { PicSourceLocalFSPluginConfig } from './config';

export class PicSourceLocalFSPlugin {
  private config: PicSourceLocalFSPluginConfig;
  private ctx: Context;
  name = 'picsource-localfs-main';
  schema = PicSourceLocalFSPluginConfig;
  apply(ctx: Context, config: PicSourceLocalFSPluginConfig) {
    this.ctx = ctx;
    this.config = config;
    this.config.sources.forEach((s) => s.registerInstance(ctx));
  }
}
