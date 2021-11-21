import 'source-map-support/register';
import { Context } from 'koishi';
import { PicSourceLocalFSPlugin } from './plugin';
import { PicSourceLocalFSPluginConfig, PicSourceLocalFSPluginConfigLike } from './config';
export * from './config';
export * from './plugin';
export * from './LocalSource';

export const name = 'picsource-localfs';
const plugin = new PicSourceLocalFSPlugin();
export const schema = plugin.schema;
export function apply(ctx: Context, config: PicSourceLocalFSPluginConfig) {
  ctx.plugin(plugin, config);
}
