<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img src="../../src/assets/user.jpg" />
          <div class="user-info">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <hr />
        <div class="login-info">
          <p>
            上次登录时间:<span>{{ MSG }}</span>
          </p>
          <p>上次登录地方:<span>江西-遂川</span></p>
        </div>
      </el-card>
      <el-card class="tablebottom" style="height: 473px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(p, index) in tableLabel"
            :key="index"
            :prop="index"
            :label="p"
            p
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" class="deatailtop">
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{
            display: 'flex',
            padding: 0,
          }"
          class="detailCard"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="textTop">￥{{ item.value }}</p>
            <p class="textBottom">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px">
        <div style="height: 280px" ref="echarts"></div>
      </el-card>
      <div class="detailbottom">
        <el-card style="height: 260px" class="xd">
          <div style="height: 240px" ref="userEcharts"></div
        ></el-card>
        <el-card style="height: 260px" class="xd">
          <div style="height: 240px" ref="videoEcharts"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "../../api/data.js";
import * as echarts from "echarts";
import dayjs from "dayjs";
export default {
  name: "zhuye-home",
  data() {
    return {
      tableData: [
        {
          name: "oppo",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "vivo",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "苹果",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "小米",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "三星",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "魅族",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
      ],
      tableLabel: {
        name: "品牌",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      MSG: "",
    };
  },
  mounted() {
    const data = dayjs().format("YYYY - MM - DD");
    this.MSG = data;
    getData().then((res) => {
      const { code, data } = res.data;
      //判断配置表
      if (code === 20000) {
        this.tableData = data.tableData;
        const order = data.orderData;
        const xData = order.date;
        const keyArray = Object.keys(order.data[0]);
        const series = [];
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });
        //折现表
        const option = {
          xAxis: {
            data: xData,
          },
          yAxis: {},
          legend: {
            data: keyArray,
          },
          series,
        };
        const E = echarts.init(this.$refs.echarts);
        E.setOption(option);
        //用户表柱状表
        const userOption = {
          legend: {
            // 图例文字颜色
            textStyle: {
              color: "#333",
            },
          },
          grid: {
            left: "20%",
          },
          // 提示框
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category", // 类目轴
            data: data.userData.map((item) => {
              return item.date;
            }),
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
            axisLabel: {
              interval: 0,
              color: "#333",
            },
          },
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
            },
          ],
          color: ["#2ec7c9", "#b6a2de"],
          series: [
            {
              name: "新增用户",
              data: data.userData.map((item) => {
                return item.new;
              }),
              type: "bar",
            },
            {
              name: "活跃用户",
              data: data.userData.map((item) => {
                return item.active;
              }),
              type: "bar",
            },
          ],
        };
        const U = echarts.init(this.$refs.userEcharts);
        U.setOption(userOption);
        //圆形表
        const videoOption = {
          tooltip: {
            trigger: "item",
          },
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [
            {
              data: data.videoData,
              type: "pie",
            },
          ],
        };
        const V = echarts.init(this.$refs.videoEcharts);
        V.setOption(videoOption);
      }
      console.log(res);
    });
  },
};
</script>

<style scoped>
.user {
  display: flex;
}
.user-info {
  position: relative;
  top: -8px;
  left: 60px;
}
.user-info p {
  margin: 20px auto;
}
img {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  position: relative;
  top: 5px;
  left: 30px;
}
.login-info {
  position: relative;
  top: 10px;
  left: 20px;
}
.login-info span {
  margin: 0 10px;
}
.login-info p {
  margin: 20px auto;
}
.tablebottom {
  margin-top: 30px;
}
.deatailtop {
  margin: 20px auto;
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.detailCard {
  width: 250px;
  height: 80px;
  margin-bottom: 15px;
}
.icon {
  width: 80px;
  height: 80px;
  font-size: 50px;
  text-align: center;
  line-height: 80px;
  color: #fff;
  border-radius: 10px;
}
.detail {
  margin: -5px 25px;
}
p {
  padding: 0;
  margin: 0;
}
.detail p {
  margin: 15px auto;
}
.textTop {
  font-size: 20px;
}
.textBottom {
  color: #ccc;
  font-size: 15px;
}

.detailbottom {
  display: flex;
  justify-content: space-around;
  margin-top: 22px;
}
.detailbottom .el-card {
  width: 400px;
}
</style>