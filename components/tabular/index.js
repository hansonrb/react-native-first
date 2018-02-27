import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';
import Triangle from 'react-native-triangle';

import _ from 'lodash';

const PER_PAGE = 10;

const styles = StyleSheet.create({
  table: {
    width: 360,
    flexGrow: 1,
  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { textAlign: 'center' },
  circularButton: {
    width: 35,
    height: 35,
    marginLeft: 5,
    borderRadius: 17.5,
    backgroundColor: '#c0eaff',
    alignItems: 'center',
    padding: 8,
    flexDirection: 'column',
  },
});

export default class Tabular extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      filter: '',
      sortby: '',
      sort: 'asc',
      isLoading: false,
    };
  }

  componentWillMount() {
    const { options, loadOptions } = this.props;
    if (options.length === 0) {
      this.setLoading(true);
      loadOptions(); // load initial options;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.options !== nextProps.options ||
      this.props.total !== nextProps.total
    ) {
      this.setLoading(false);
    }
  }

  getParams(extra) {
    return Object.assign(
      {
        currentPage: this.state.currentPage,
        filter: this.state.filter,
        sortby: this.state.sortby,
        sort: this.state.sort,
      },
      extra,
    );
  }

  setLoading(isLoading) {
    this.setState({ isLoading });
  }

  handleFilter(filter) {
    this.setState({ filter });

    if (this.interval) {
      clearTimeout(this.interval);
    }
    this.interval = setTimeout(() => {
      this.setLoading(true);
      this.props.loadOptions(this.getParams({ filter }), true);
    }, 500);
  }

  handlePageNav(page) {
    this.setLoading(true);
    this.setState({ currentPage: page });
    this.props.loadOptions(this.getParams({ currentPage: page }), true);
  }

  handleSorting(key) {
    this.setLoading(true);
    if (key === this.state.sortby) {
      this.setState({ sort: this.state.sort === 'desc' ? 'asc' : 'desc' });
      this.props.loadOptions(
        this.getParams({ sort: this.state.sort === 'desc' ? 'asc' : 'desc' }),
        true,
      );
    } else {
      this.setState({ sort: 'asc', sortby: key });
      this.props.loadOptions(
        this.getParams({ sort: 'asc', sortby: key }),
        true,
      );
    }
  }

  render() {
    const {
      className,
      optionsStructure,
      pagination,
      filtering,
      sorting,
      total,
      onClickRow,
      customRowStyle,
      options,
    } = this.props;

    const { currentPage, filter, sortby, sort, isLoading } = this.state;
    const totalPages = this.props.total / PER_PAGE;

    const tableHead = _.map(optionsStructure, (oh, key) => (
      <TouchableOpacity
        onPress={() => this.handleSorting(oh.key)}
        styleName={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flexStart',
        }}
      >
        <Text>{oh.caption}</Text>
        {sortby === oh.key && (
          <Triangle
            width={10}
            height={5}
            color={'#c0eaff'}
            direction={sort === 'desc' ? 'down' : 'up'}
          />
        )}
      </TouchableOpacity>
    ));
    const tableData = _.map(options, (o, idx) => {
      return _.map(optionsStructure, (os, id) => {
        if (id === 0)
          return (
            <TouchableOpacity onPress={() => onClickRow(o)}>
              <Text>{o.renderer ? o.renderer(o) : o[os.key]}</Text>
            </TouchableOpacity>
          );
        return o.renderer ? o.renderer(o) : o[os.key];
      });
    });

    const widths = _.map(optionsStructure, (oh, idx) => (idx === 0 ? 2 : 1));

    return (
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View
          style={{
            height: 50,
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}
        >
          {filtering && (
            <TextInput
              style={{
                height: 40,
                width: 150,
                borderColor: 'gray',
                borderWidth: 1,
              }}
              onChangeText={text => this.handleFilter(text)}
              value={filter}
              placeholder="Search..."
            />
          )}
          {pagination && (
            <View style={{ flexDirection: 'row' }}>
              {_.range(1, totalPages + 1).map(page => (
                <TouchableOpacity
                  key={_.uniqueId()}
                  style={styles.circularButton}
                  onPress={() => this.handlePageNav(page)}
                >
                  <Text>{page}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        <Table
          style={styles.table}
          borderStyle={{ borderWidth: 0.5, borderColor: '#c8e1ff' }}
        >
          <Row
            data={tableHead}
            style={styles.head}
            textStyle={styles.text}
            flexArr={widths}
          />
          <ScrollView>
            {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
            {!isLoading && options.length === 0 && <Text>Nothing to show</Text>}
            {!isLoading &&
              options.length > 0 && (
                <TableWrapper
                  borderStyle={{ borderWidth: 0.5, borderColor: '#c8e1ff' }}
                >
                  <Rows
                    data={tableData}
                    textStyle={styles.text}
                    flexArr={widths}
                  />
                </TableWrapper>
              )}
          </ScrollView>
        </Table>
      </View>
    );
  }
}

Tabular.propTypes = {
  loadOptions: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  optionsStructure: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string,
  pagination: PropTypes.bool,
  sorting: PropTypes.bool,
  filtering: PropTypes.bool,
  total: PropTypes.number.isRequired,
  onClickRow: PropTypes.func,
  customRowStyle: PropTypes.func,
};

Tabular.defaultProps = {
  pagination: true,
  sorting: true,
  filtering: true,
  className: null,
  onClickRow: () => {},
  customRowStyle: () => {},
};
