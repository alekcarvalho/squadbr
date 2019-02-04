import React, { Component } from "react";
import API from "api/api";
import { Table, Input, Button, Icon } from "antd";
import Highlighter from "react-highlight-words";
import "pages/home/style.scss";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      list: [],
      loading: true
    };
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          className={`search-input-${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          className={`search-button-${dataIndex} search-button-submit`}
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon
        className={`search-icon-${dataIndex}`}
        type="search"
        style={{ color: filtered ? "#1890ff" : undefined }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  componentDidMount() {
    API.get(`/ticker`)
      .then(res => {
        this.setState({ list: res.data });
        console.log(res.data);
        this.setState({ loading: false });
      })
      .catch(function(error) {
        console.log(error);
        console.log(error.response);
      });
  }

  render() {
    const columns = [
      {
        title: "Nome",
        dataIndex: "name",
        key: "name",
        width: "30%",
        ...this.getColumnSearchProps("name"),
        render: text => <span className="row-name">{text}</span>
      },
      {
        title: "Sigla",
        dataIndex: "symbol",
        key: "symbol",
        width: "30%",
        ...this.getColumnSearchProps("symbol")
      },
      {
        title: "Valor Dólar",
        dataIndex: "price_usd",
        key: "price_usd",
        width: "20%",
        ...this.getColumnSearchProps("price_usd"),
        render: text => <span> $ {Number(text).toLocaleString("pt-BR")}</span>
      },
      {
        title: "Valor Bitcoin",
        dataIndex: "price_btc",
        key: "price_btc",
        ...this.getColumnSearchProps("price_btc"),
        render: text => <span> {text.replace(/\./g, ",")}</span>
      }
    ];
    return (
      <div className="content container">
        <section>
          <h1>Criptomoedas</h1>
        </section>
        <section>
          <Table
            loading={this.state.loading}
            rowKey={record => record.id}
            columns={columns}
            dataSource={this.state.list}
          />
        </section>
      </div>
    );
  }
}

export default Home;
