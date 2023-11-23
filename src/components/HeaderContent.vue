<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="header d-flex">
    <!-- 
      统一使用antd下拉菜单组件 -->
      <!-- 首页 -->
    <a-dropdown>
      <a class="ant-dropdown-link" @click.prevent>
        首页
        <DownOutlined />
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <a href="javascript:;">1st menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">2nd menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">3rd menu item</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <!-- 云现场 -->
    <a-dropdown>
      <a class="ant-dropdown-link" @click.prevent>
        云现场
        <DownOutlined />
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <a href="javascript:;">1st menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">2nd menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">3rd menu item</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <!-- 高端测试 -->
    <a-dropdown>
      <a class="ant-dropdown-link" @click.prevent>
        高端测试
        <DownOutlined />
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <a href="javascript:;">1st menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">2nd menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">3rd menu item</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <!-- 材料测试 -->
    <a-dropdown>
      <a class="ant-dropdown-link" @click.prevent>
        材料测试
        <DownOutlined />
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <a href="javascript:;">1st menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">2nd menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">3rd menu item</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <!-- 生物服务 -->
    <a-dropdown>
      <a class="ant-dropdown-link" @click.prevent>
        生物服务
        <DownOutlined />
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <a href="javascript:;">1st menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">2nd menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">3rd menu item</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <!-- 环境监测 -->
    <a-dropdown>
      <a class="ant-dropdown-link" @click.prevent>
        环境监测
        <DownOutlined />
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <a href="javascript:;">1st menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">2nd menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">3rd menu item</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <!-- 环境监测 -->
    <a-dropdown>
      <a class="ant-dropdown-link" @click.prevent>
        环境监测
        <DownOutlined />
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <a href="javascript:;">1st menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">2nd menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">3rd menu item</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <!-- 行业服务 -->
    <a-dropdown>
      <a class="ant-dropdown-link" @click.prevent>
        行业服务
        <DownOutlined />
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <a href="javascript:;">1st menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">2nd menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">3rd menu item</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <!-- 科研绘图 -->
    <a-dropdown>
      <a class="ant-dropdown-link" @click.prevent>
        科研绘图
        <DownOutlined />
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <a href="javascript:;">1st menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">2nd menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">3rd menu item</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <!-- 模拟计算 -->
    <a-dropdown>
      <a class="ant-dropdown-link" @click.prevent>
        模拟计算
        <DownOutlined />
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <a href="javascript:;">1st menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">2nd menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">3rd menu item</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <!-- 数据分析 -->
    <a-dropdown>
      <a class="ant-dropdown-link" @click.prevent>
        数据分析
        <DownOutlined />
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <a href="javascript:;">1st menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">2nd menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">3rd menu item</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <!-- 论文服务 -->
    <a-dropdown>
      <a class="ant-dropdown-link" @click.prevent>
        论文服务
        <DownOutlined />
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <a href="javascript:;">1st menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">2nd menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">3rd menu item</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <!-- 试剂耗材 -->
    <a-dropdown>
      <a class="ant-dropdown-link" @click.prevent>
        试剂耗材
        <DownOutlined />
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <a href="javascript:;">1st menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">2nd menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">3rd menu item</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <!-- <ul class="u-header">
      <li class="l-header">
        <a href="">云现场</a>
      </li>
      <li class="l-header">
        <a href="">高端测试</a>
      </li>
      <li class="l-header">
        <a href="">材料测试</a>
      </li>
      <li class="l-header">
        <a href="">生物服务</a>
      </li>
      <li class="l-header">
        <a href="">环境监测</a>
      </li>
      <li class="l-header">
        <a href="">行业服务</a>
      </li>
      <li class="l-header">
        <a href="">科研绘图</a>
      </li>
      <li class="l-header">
        <a href="">模拟计算</a>
      </li>
      <li class="l-header">
        <a href="">数据分析</a>
      </li>
      <li class="l-header">
        <a href="">论文服务</a>
      </li>
      <li class="l-header">
        <a href="">试剂耗材</a>
      </li>
      <li class="l-header">
        <a href="">指南针学院</a>
      </li>
    </ul> -->
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}
.ant-dropdown-link{
  /* display: inline-block;
    height: 30px;
    line-height: 22px;
    padding: 0 0 8px; */
  margin-right: 20px;
  font-size: 16px;
    color: #424242 !important;
    font-weight: bold;
}
@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
