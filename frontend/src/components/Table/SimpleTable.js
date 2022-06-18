import { Table } from "antd";

const SimpleTable = (props) => (
  <Table columns={props.columns} dataSource={props.data} />
);

export default SimpleTable;
