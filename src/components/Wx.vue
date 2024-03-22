<script setup>
import wx from "../assets/wx.jpg";
</script>

<template>
  <div class="wx-nav sci-buffet-info-section">
    <h3>技术顾问</h3>
    <div class="one">一对一为您答疑解惑</div>
    <a-image class="sci-buffet-avatar" :width="200" :src="wx" />
    <p class="sci-buffet-phone">立即扫码咨询</p>
  </div>
</template>

<style scoped>
.wx-nav.sci-buffet-info-section{
  position: fixed;
  top: 30%;
  right: 10px;
}
.one {
  text-align: center;
  margin-top: 10px;
}
.sci-buffet-info-section {
  position: relative;
  top: 0px;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.2)
}
/* å³ä¾§ä»ªå™¨ä¿¡æ¯ */
.sci-buffet-right {
  float: right;
  width: 220px;
}

.sci-buffet-info-section {
  width: 220px;
  background: #fff;
  margin-bottom: 10px;
  padding: 16px 10px 20px;
}

.sci-buffet-info-section h3 {
  position: relative;
  line-height: 25px;
  padding-left: 18px;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: bold;
}

.sci-buffet-info-section h3::after {
  position: absolute;
  left: 4px;
  top: 4px;
  content: "";
  display: block;
  width: 4px;
  height: 18px;
  background: #1890ff;
}

.sci-buffet-info-section a {
  display: block;
  width: 200px;
  height: 32px;
  line-height: 32px;
  background: #1890ff;
  font-size: 16px;
  color: #fff;
  text-align: center;
  border-radius: 3px;
}

.sci-buffet-info-section a:hover {
  background: #1890ff;
  color: #fff;
}

.sci-buffet-info-section > img {
  display: block;
  width: 160px;
  height: 160px;
  margin: 17px auto 10px;
}

.sci-buffet-info-section .sci-buffet-avatar {
  display: block;
  width: 110px;
  height: 110px;
  margin: 17px auto 16px;
}

.sci-buffet-info-section .sci-buffet-phone {
  line-height: 22px;
  font-size: 16px;
  color: #1890ff !important;
  font-weight: bold;
  text-align: center;
}

.sci-buffet-info-section .sci-buffet-phone img {
  position: relative;
  top: -4px;
  width: 24px;
  height: 21px;
  margin-right: 10px;
}
.item {
  margin-top: 2rem;
  display: flex;
  position: relative;
}

.details {
  flex: 1;
  margin-left: 1rem;
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  width: 32px;
  height: 32px;
  color: var(--color-text);
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

@media (min-width: 1024px) {
  .item {
    margin-top: 0;
    padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  }

  i {
    top: calc(50% - 25px);
    left: -26px;
    position: absolute;
    border: 1px solid var(--color-border);
    background: var(--color-background);
    border-radius: 8px;
    width: 50px;
    height: 50px;
  }

  .item:before {
    content: " ";
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:after {
    content: " ";
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:first-of-type:before {
    display: none;
  }

  .item:last-of-type:after {
    display: none;
  }
}
</style>
