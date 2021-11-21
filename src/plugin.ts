import 'source-map-support/register';
import { Context, Schema } from 'koishi';
import {
  PicSourceLocalFSPluginConfig,
  PicSourceLocalFSPluginConfigLike,
} from './config';

export class PicSourceLocalFSPlugin {
  private config: PicSourceLocalFSPluginConfig;
  private ctx: Context;
  name = 'picsource-localfs-main';
  schema: Schema<PicSourceLocalFSPluginConfigLike> = schemaFromClass(
    PicSourceLocalFSPluginConfig,
  );
  apply(ctx: Context, config: PicSourceLocalFSPluginConfig) {
    this.ctx = ctx;
    this.config = config;
    this.config.sources.forEach((s) => s.registerInstance(ctx));
  }
}
