import 'source-map-support/register';
import { PicSourceLocalFSPluginConfig } from './config';
import {
  BasePlugin,
  DefinePlugin,
  LifecycleEvents,
  UsingService,
} from 'koishi-thirdeye';

@UsingService('pics')
@DefinePlugin({
  name: 'picsource-localfs',
  schema: PicSourceLocalFSPluginConfig,
})
export default class PicSourceLocal
  extends BasePlugin<PicSourceLocalFSPluginConfig>
  implements LifecycleEvents
{
  onApply() {
    this.config.sources.forEach((s) => s.registerInstance(this.ctx));
  }
}
