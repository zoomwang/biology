# Custom Materials

[Docs](https://appworks.site/materials/about.html).

## 物料命名规范：@ice/功能-类型 
- 1.示例：@ice/dialog-table-block
- 2.类型分为block、component、scaffold

## 开发流程
- 1.执行ice命令创建物料项目
- 2.对应项目执行npm publish
- 3.项目根目录执行iceworks generate
- 4.项目根目录执行npm publish

## 区块开发流程

1. 根目录下,执行 iceworks add block命令
  - 区块的命名为[组件名称+Block]，例如：DialogTableBlock
  - 区块title为展示在物料可视化界面的区块标题，尽量短小精悍
  - 区块描述
2. 进入blocks/[你的区块], 执行npm install，然后npm start开始开发

3. 开发完成后，需生成区块截图，便于物料可视化展示，可以手动截图存放于区块根目录下的screenshot.png，也可以使用脚本生成

## Install Iceworks CLI

```bash
$ npm i -g iceworks
$ iceworks --help
```

## Install Deps

```bash
$ npm install
```

## Develop materials

```bash
# block
$ cd blocks/ExampleBlock
$ npm install
$ npm run start

# component
$ cd blocks/ExampleBlock
$ npm install
$ npm run start

# page
$ cd pages/ExamplePage
$ npm install
$ npm run start
```

## Add new material

```bash
$ iceworks add  # select block|component|scaffold|page
```

## Generate materials data

```bash
$ iceworks generate
```

## Publish materials data

```bash
# sync to fusion material center
$ iceworks sync
```

## Use materials in AppWorks

Add the materials data url to [AppWorks](https://appworks.site/pack/basic/materials.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%89%A9%E6%96%99%E6%BA%90).


## Block开发原则
* ui展示和数据来源尽量分开
* 要包括、并统一接口异常处理
* 要写mock数据

