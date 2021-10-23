# koishi-plugin-picsource-localfs

Koishi 的本地图源插件。

## 安装

### npm

```bash
npm install koishi-plugin-picsource-localfs
```

## 配置

* `sources` 图源实例列表。共通实例属性见 [`koishi-plugin-pics`](https://code.mycard.moe/3rdeye/koishi-plugin-pics) 的 `PicSourceInfo` 定义。
  * `name` 实例名称。
  * `path` 图片路径。必填。
  * `patterns` 允许的文件后缀。使用 `*` 表示当前目录，`**` 表示递归所有子目录。
  * `exclude` 排除的路径。
  * `displayFilename` 是否显示文件名。默认 `true` 。