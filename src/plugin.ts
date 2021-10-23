import 'source-map-support/register';
import { Context, Schema } from 'koishi';
import {
  PicSourceLocalFSPluginConfig,
  PicSourceLocalFSPluginConfigLike,
} from './config';
import { schemaFromClass, schemaTransform } from 'koishi-utils-schemagen';

export class PicSourceLocalFSPlugin {
  private config: PicSourceLocalFSPluginConfig;
  private ctx: Context;
  name = 'picsource-localfs-main';
  schema: Schema<PicSourceLocalFSPluginConfigLike> = schemaFromClass(
    PicSourceLocalFSPluginConfig,
  );
  apply(ctx: Context, config: PicSourceLocalFSPluginConfigLike) {
    this.ctx = ctx;
    this.config = schemaTransform(PicSourceLocalFSPluginConfig, config);
    this.config.sources.forEach((s) => s.registerInstance(ctx));
  }
}
