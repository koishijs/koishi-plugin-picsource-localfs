import 'source-map-support/register';
import {
  PicSourceLocalFSPluginConfig,
  PicSourceLocalFSPluginConfigLike,
} from './config';
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
  extends BasePlugin<
    PicSourceLocalFSPluginConfig,
    PicSourceLocalFSPluginConfigLike
  >
  implements LifecycleEvents
{
  onApply() {
    this.config.sources.forEach((s) => s.registerInstance(this.ctx));
  }
}
