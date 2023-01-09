import { PicSourceConfig } from 'koishi-plugin-pics';
import { DefineSchema, RegisterSchema } from 'schemastery-gen';

@RegisterSchema()
export class LocalSourceConfig {
  constructor(config: Partial<LocalSourceConfig>) {}

  @DefineSchema({ description: '目录路径', required: true })
  path: string;
  @DefineSchema({
    description:
      '允许的文件后缀。使用 `*` 表示当前目录，`**` 表示递归所有子目录。',
    type: 'string',
    default: ['**.jpg', '**.png'],
  })
  patterns: string[];
  @DefineSchema({
    description: '排除的路径',
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
  @DefineSchema({ description: '是否显示文件名', default: true })
  displayFilename: boolean;
}
