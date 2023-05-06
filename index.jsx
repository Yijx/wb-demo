import { SettingOutlined } from "@ant-design/icons";
import { Cascader, Input, Select, Space } from "antd";
import { useEffect } from "react";
import * as echarts from "echarts";
import MyEditor from "./editor";

const { Option } = Select;
const selectBefore = (
  <Select defaultValue="http://">
    <Option value="http://">http://</Option>
    <Option value="https://">https://</Option>
  </Select>
);
const selectAfter = (
  <Select defaultValue=".com">
    <Option value=".com">.com</Option>
    <Option value=".jp">.jp</Option>
    <Option value=".cn">.cn</Option>
    <Option value=".org">.org</Option>
  </Select>
);
const App = ({ defaultValue = "mysite" }) => {
  useEffect(() => {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: "ECharts 入门示例",
      },
      tooltip: {},
      legend: {
        data: ["销量"],
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }, []);
  return (
    <Space direction="vertical">
      <Input
        addonBefore="http://"
        addonAfter=".com"
        defaultValue={defaultValue}
      />
      <Input
        addonBefore={selectBefore}
        addonAfter={selectAfter}
        defaultValue={defaultValue}
      />
      <Input addonAfter={<SettingOutlined />} defaultValue={defaultValue} />
      <Input addonBefore="http://" suffix=".com" defaultValue={defaultValue} />
      <Input
        addonBefore={
          <Cascader
            placeholder="cascader"
            style={{
              width: 150,
            }}
          />
        }
        defaultValue={defaultValue}
      />
      <div id="main" style={{ width: "600px", height: "400px" }}></div>
      <MyEditor />
    </Space>
  );
};
export default App;
