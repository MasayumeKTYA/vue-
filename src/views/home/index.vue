<template>
  <div class="homeCoontainer">
    <el-row class="home" :gutter="20">
      <el-col :span="8">
        <el-card shawdoow="hover">
          <div class="user">
            <img src="../../assets/logo.png" />
            <div class="UserInfo">
              <p class="admin">admin</p>
              <p class="power">超级管理员</p>
            </div>
          </div>
          <div class="loginInfo">
            <p>上次登入时间：<span>2022-5-19</span></p>
            <p>上次登入地点：<span>长沙</span></p>
          </div>
        </el-card>
        <el-card style="margin-top: 20px; height: 360px">
          <el-table :data="tableData">
            <el-table-column
              v-for="(val, index) in tableLabel"
              :key="index"
              :prop="index"
              :label="val"
            >
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16" class="main">
        <div class="contain">
          <el-card
            v-for="item in countData"
            :key="item.name"
            :body-style="{ display: 'flex', padding: 0 }"
            class="el"
          >
            <i
              class="icon"
              :class="`el-icon-${item.icon}`"
              :style="{ background: item.color }"
            >
            </i>
            <div class="detail">
              <p class="num">￥{{ item.value }}</p>
              <p class="txt">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <el-card class="midle-contain">
          <div class="echars" ref="echarts"></div>
        </el-card>
        <div class="footer-contain">
          <el-card class="left">
            <div class="left-right" ref="userEcharts"></div>
          </el-card>
          <el-card class="right">
            <div class="right-left" ref="videoEcharts"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getData } from "../../api/data";
import * as echarts from "echarts";
export default {
  name: "indexHome",
  data() {
    return {
      tableData: [],
      tableLabel: {
        name: "课程",
        todayBBuy: "今日够买",
        monthBuy: "本月够买",
        totalBBuy: "总共够买",
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
          icon: "success",
          color: "#5ab1ef",
        },
      ],
    };
  },
  mounted() {
    getData().then((res) => {
      const { code, data } = res.data;
      if (code === 20000) {
        this.tableData = data.tableData;
        const order = data.orderData;
        const xData = order.date;
        const keyArr = Object.keys(order.data[0]);
        const series = [];
        keyArr.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });
        const option = {
          xAxis: {
            data: xData,
          },
          yAxis: {},
          legend: {
            data: keyArr,
          },
          series,
        };
        const E = echarts.init(this.$refs.echarts);
        E.setOption(option);
        const userOptioon = {
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
            data: data.userData.map((item) => item.date),
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
              data: data.userData.map((item) => item.new),
              type: "bar",
            },
            {
              name: "活跃用户",
              data: data.userData.map((item) => item.active),
              type: "bar",
            },
          ],
        };
        const U = echarts.init(this.$refs.userEcharts);
        U.setOption(userOptioon);
        const PieOption = {
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
        V.setOption(PieOption);
      }
      console.log(res);
    });
  },
};
</script>

<style scoped lang="less">
.homeCoontainer {
  .home {
    margin-top: 20px;
    .user {
      img {
        height: 90px;
        width: 90px;
      }
      .UserInfo {
        display: inline-block;
        padding-bottom: 0px;
        margin-left: 20px;
        font-size: 14px;
      }
      border-bottom: 3px solid #f0f0f0;
    }
    .main {
      .contain {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        width: 800px;
        .el {
          width: 240px;
          height: 60px;
          margin-left: 20px;
          .icon {
            width: 70px;
            text-align: center;
            line-height: 60px;
            color: #fff;
            font-size: 32px;
          }
          .detail {
            .num {
              font-size: 22px;
              font-weight: bold;
              position: absolute;
              left: 20px;
              bottom: 2px;
            }
            .txt {
              font-size: 12px;
              position: absolute;
              top: 26px;
              left: 20px;
              width: 90px;
            }
            position: relative;
          }
        }
      }
      .midle-contain {
        margin-top: 20px;
        height: 280px;
        .echars {
          height: 280px;
        }
      }
      .footer-contain {
        .left {
          width: 420px;
          margin-right: 20px;
          .left-right {
            height: 260px;
          }
        }
        .right {
          width: 420px;
          .right-left {
            height: 260px;
          }
        }
        height: 260px;
        display: flex;
        margin-top: 20px;
      }
    }
  }
}
</style>