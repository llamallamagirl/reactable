'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _filter_props_from = require('./lib/filter_props_from');

var _filter_props_from2 = _interopRequireDefault(_filter_props_from);

var _extract_data_from = require('./lib/extract_data_from');

var _extract_data_from2 = _interopRequireDefault(_extract_data_from);

var _unsafe = require('./unsafe');

var _thead = require('./thead');

var _thead2 = _interopRequireDefault(_thead);

var _th = require('./th');

var _th2 = _interopRequireDefault(_th);

var _tr = require('./tr');

var _tr2 = _interopRequireDefault(_tr);

var _tfoot = require('./tfoot');

var _tfoot2 = _interopRequireDefault(_tfoot);

var _paginator = require('./paginator');

var _paginator2 = _interopRequireDefault(_paginator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Table = function (_React$Component) {
    _inherits(Table, _React$Component);

    function Table(props) {
        _classCallCheck(this, Table);

        var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

        _this.state = {
            currentPage: _this.props.currentPage ? _this.props.currentPage : 0,
            currentSort: {
                column: null,
                direction: _this.props.defaultSortDescending ? -1 : 1
            },
            filter: ''
        };

        // Set the state of the current sort to the default sort
        if (props.sortBy !== false || props.defaultSort !== false) {
            var sortingColumn = props.sortBy || props.defaultSort;
            _this.state.currentSort = _this.getCurrentSort(sortingColumn);
        }
        return _this;
    }

    _createClass(Table, [{
        key: 'filterBy',
        value: function filterBy(filter) {
            this.setState({ filter: filter });
        }

        // Translate a user defined column array to hold column objects if strings are specified
        // (e.g. ['column1'] => [{key: 'column1', label: 'column1'}])

    }, {
        key: 'translateColumnsArray',
        value: function translateColumnsArray(columns) {
            return columns.map(function (column, i) {
                if (typeof column === 'string') {
                    return {
                        key: column,
                        label: column
                    };
                } else {
                    if (typeof column.sortable !== 'undefined') {
                        var sortFunction = column.sortable === true ? 'default' : column.sortable;
                        this._sortable[column.key] = sortFunction;
                    }

                    return column;
                }
            }.bind(this));
        }
    }, {
        key: 'parseChildData',
        value: function parseChildData(props) {
            var data = [],
                tfoot = void 0;

            var children = _react2.default.Children.map(props.children, function (child) {
                if (typeof child === 'undefined' || child === null) {
                    return;
                }
                if ([_tfoot2.default, _thead2.default, _tr2.default].indexOf(child.type) >= 0) {
                    return child;
                } else {
                    return new child.type(child.props, child._context).render();
                }
            });

            _react2.default.Children.forEach(children, function (child) {
                switch (child.type) {
                    case _tfoot2.default:
                        if (typeof tfoot !== 'undefined') {
                            console.warn('You can only have one <Tfoot>, but more than one was specified.' + 'Ignoring all but the last one');
                        }
                        tfoot = child;
                        break;
                    case _tr2.default:
                        var childData = child.props.data || {};

                        _react2.default.Children.forEach(child.props.children, function (descendant) {
                            if ((typeof descendant === 'undefined' ? 'undefined' : _typeof(descendant)) !== 'object' || descendant == null) {
                                return;
                            } else if (typeof descendant.props.column !== 'undefined') {
                                var value = void 0;

                                if (typeof descendant.props.data !== 'undefined') {
                                    value = descendant.props.data;
                                } else if (typeof descendant.props.children !== 'undefined') {
                                    value = descendant.props.children;
                                } else {
                                    console.warn('Td specified without ' + 'a `data` property or children, ' + 'ignoring');
                                    return;
                                }

                                childData[descendant.props.column] = {
                                    value: value,
                                    props: (0, _filter_props_from2.default)(descendant.props),
                                    __reactableMeta: true
                                };
                            } else {
                                console.warn('exports.Td specified without a `column` property, ignoring');
                            }
                        });

                        data.push({
                            data: childData,
                            props: (0, _filter_props_from2.default)(child.props),
                            __reactableMeta: true
                        });
                        break;

                    default:
                        break;
                }
            }.bind(this));

            return { data: data, tfoot: tfoot };
        }
    }, {
        key: 'initialize',
        value: function initialize(props) {
            this.data = props.data || [];

            var _parseChildData = this.parseChildData(props),
                data = _parseChildData.data,
                tfoot = _parseChildData.tfoot;

            this.data = this.data.concat(data);
            this.tfoot = tfoot;

            this.initializeSorts(props);
            this.initializeFilters(props);
        }
    }, {
        key: 'initializeFilters',
        value: function initializeFilters(props) {
            this._filterable = {};
            // Transform filterable properties into a more friendly list
            for (var i in props.filterable) {
                var column = props.filterable[i];
                var columnName = void 0,
                    filterFunction = void 0;

                if (column instanceof Object) {
                    if (typeof column.column !== 'undefined') {
                        columnName = column.column;
                    } else {
                        console.warn('Filterable column specified without column name');
                        continue;
                    }

                    if (typeof column.filterFunction === 'function') {
                        filterFunction = column.filterFunction;
                    } else {
                        filterFunction = 'default';
                    }
                } else {
                    columnName = column;
                    filterFunction = 'default';
                }

                this._filterable[columnName] = filterFunction;
            }
        }
    }, {
        key: 'initializeSorts',
        value: function initializeSorts(props) {
            this._sortable = {};
            // Transform sortable properties into a more friendly list
            for (var i in props.sortable) {
                var column = props.sortable[i];
                var columnName = void 0,
                    sortFunction = void 0;

                if (column instanceof Object) {
                    if (typeof column.column !== 'undefined') {
                        columnName = column.column;
                    } else {
                        console.warn('Sortable column specified without column name');
                        return;
                    }

                    if (typeof column.sortFunction === 'function') {
                        sortFunction = column.sortFunction;
                    } else {
                        sortFunction = 'default';
                    }
                } else {
                    columnName = column;
                    sortFunction = 'default';
                }

                this._sortable[columnName] = sortFunction;
            }
        }
    }, {
        key: 'getCurrentSort',
        value: function getCurrentSort(column) {
            var columnName = void 0,
                sortDirection = void 0;

            if (column instanceof Object) {
                if (typeof column.column !== 'undefined') {
                    columnName = column.column;
                } else {
                    console.warn('Default column specified without column name');
                    return;
                }

                if (typeof column.direction !== 'undefined') {
                    if (column.direction === 1 || column.direction === 'asc') {
                        sortDirection = 1;
                    } else if (column.direction === -1 || column.direction === 'desc') {
                        sortDirection = -1;
                    } else {
                        var defaultDirection = this.props.defaultSortDescending ? 'descending' : 'ascending';

                        console.warn('Invalid default sort specified. Defaulting to ' + defaultDirection);
                        sortDirection = this.props.defaultSortDescending ? -1 : 1;
                    }
                } else {
                    sortDirection = this.props.defaultSortDescending ? -1 : 1;
                }
            } else {
                columnName = column;
                sortDirection = this.props.defaultSortDescending ? -1 : 1;
            }

            return {
                column: columnName,
                direction: sortDirection
            };
        }
    }, {
        key: 'updateCurrentSort',
        value: function updateCurrentSort(sortBy) {
            if (sortBy !== false && sortBy.column !== this.state.currentSort.column && sortBy.direction !== this.state.currentSort.direction) {

                this.setState({ currentSort: this.getCurrentSort(sortBy) });
            }
        }
    }, {
        key: 'updateCurrentPage',
        value: function updateCurrentPage(nextPage) {
            if (typeof nextPage !== 'undefined' && nextPage !== this.state.currentPage) {
                this.setState({ currentPage: nextPage });
            }
        }
    }, {
        key: 'UNSAFE_componentWillMount',
        value: function UNSAFE_componentWillMount() {
            this.initialize(this.props);
            this.sortByCurrentSort();
            this.filterBy(this.props.filterBy);
        }
    }, {
        key: 'UNSAFE_componentWillReceiveProps',
        value: function UNSAFE_componentWillReceiveProps(nextProps) {
            this.initialize(nextProps);
            this.updateCurrentPage(nextProps.currentPage);
            this.updateCurrentSort(nextProps.sortBy);
            this.sortByCurrentSort();
            this.filterBy(nextProps.filterBy);
        }
    }, {
        key: 'applyFilter',
        value: function applyFilter(filter, children) {
            // Helper function to apply filter text to a list of table rows
            filter = filter.toLowerCase();
            var matchedChildren = [];

            for (var i = 0; i < children.length; i++) {
                var data = children[i].props.data;

                for (var filterColumn in this._filterable) {
                    if (typeof data[filterColumn] !== 'undefined') {
                        // Default filter
                        if (typeof this._filterable[filterColumn] === 'undefined' || this._filterable[filterColumn] === 'default') {
                            if ((0, _extract_data_from2.default)(data, filterColumn).toString().toLowerCase().indexOf(filter) > -1) {
                                matchedChildren.push(children[i]);
                                break;
                            }
                        } else {
                            // Apply custom filter
                            if (this._filterable[filterColumn]((0, _extract_data_from2.default)(data, filterColumn).toString(), filter)) {
                                matchedChildren.push(children[i]);
                                break;
                            }
                        }
                    }
                }
            }

            return matchedChildren;
        }
    }, {
        key: 'sortByCurrentSort',
        value: function sortByCurrentSort() {
            // Apply a sort function according to the current sort in the state.
            // This allows us to perform a default sort even on a non sortable column.
            var currentSort = this.state.currentSort;

            if (currentSort.column === null) {
                return;
            }

            this.data.sort(function (a, b) {
                var keyA = (0, _extract_data_from2.default)(a, currentSort.column);
                keyA = (0, _unsafe.isUnsafe)(keyA) ? keyA.toString() : keyA || '';
                var keyB = (0, _extract_data_from2.default)(b, currentSort.column);
                keyB = (0, _unsafe.isUnsafe)(keyB) ? keyB.toString() : keyB || '';

                // Default sort
                if (typeof this._sortable[currentSort.column] === 'undefined' || this._sortable[currentSort.column] === 'default') {

                    // Reverse direction if we're doing a reverse sort
                    if (keyA < keyB) {
                        return -1 * currentSort.direction;
                    }

                    if (keyA > keyB) {
                        return 1 * currentSort.direction;
                    }

                    return 0;
                } else {
                    // Reverse columns if we're doing a reverse sort
                    if (currentSort.direction === 1) {
                        return this._sortable[currentSort.column](keyA, keyB);
                    } else {
                        return this._sortable[currentSort.column](keyB, keyA);
                    }
                }
            }.bind(this));
        }
    }, {
        key: 'onSort',
        value: function onSort(column) {
            // Don't perform sort on unsortable columns
            if (typeof this._sortable[column] === 'undefined') {
                return;
            }

            var currentSort = this.state.currentSort;

            if (currentSort.column === column) {
                currentSort.direction *= -1;
            } else {
                currentSort.column = column;
                currentSort.direction = this.props.defaultSortDescending ? -1 : 1;
            }

            // Set the current sort and pass it to the sort function
            this.setState({ currentSort: currentSort });
            this.sortByCurrentSort();

            if (typeof this.props.onSort === 'function') {
                this.props.onSort(currentSort);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var children = [];
            var columns = void 0;
            var userColumnsSpecified = false;
            var showHeaders = typeof this.props.hideTableHeader === 'undefined';
            var firstChild = null;

            if (this.props.children) {
                if (this.props.children.length > 0 && this.props.children[0] && this.props.children[0].type === _thead2.default) {
                    firstChild = this.props.children[0];
                } else if (this.props.children.type === _thead2.default) {
                    firstChild = this.props.children;
                }
            }

            if (firstChild !== null) {
                columns = _thead2.default.getColumns(firstChild);
            } else {
                columns = this.props.columns || [];
            }

            if (columns.length > 0) {
                userColumnsSpecified = true;
                columns = this.translateColumnsArray(columns);
            }

            // Build up table rows
            if (this.data && typeof this.data.map === 'function') {
                // Build up the columns array
                children = children.concat(this.data.map(function (rawData, i) {
                    var data = rawData;
                    var props = {};
                    if (rawData.__reactableMeta === true) {
                        data = rawData.data;
                        props = rawData.props;
                    }

                    // Loop through the keys in each data row and build a td for it
                    for (var k in data) {
                        if (data.hasOwnProperty(k)) {
                            // Update the columns array with the data's keys if columns were not
                            // already specified
                            if (userColumnsSpecified === false) {
                                (function () {
                                    var column = {
                                        key: k,
                                        label: k
                                    };

                                    // Only add a new column if it doesn't already exist in the columns array
                                    if (columns.find(function (element) {
                                        return element.key === column.key;
                                    }) === undefined) {
                                        columns.push(column);
                                    }
                                })();
                            }
                        }
                    }

                    return _react2.default.createElement(_tr2.default, _extends({ columns: columns, key: i, data: data }, props));
                }.bind(this)));
            }

            if (this.props.sortable === true) {
                for (var i = 0; i < columns.length; i++) {
                    this._sortable[columns[i].key] = 'default';
                }
            }

            // Determine if we render the filter box
            var filtering = false;
            if (this.props.filterable && Array.isArray(this.props.filterable) && this.props.filterable.length > 0 && !this.props.hideFilterInput) {
                filtering = true;
            }

            // Apply filters
            var filteredChildren = children;
            if (this.state.filter !== '') {
                filteredChildren = this.applyFilter(this.state.filter, filteredChildren);
            }

            // Determine pagination properties and which columns to display
            var itemsPerPage = 0;
            var pagination = false;
            var numPages = void 0;
            var currentPage = this.state.currentPage;
            var pageButtonLimit = this.props.pageButtonLimit || 10;

            var currentChildren = filteredChildren;
            if (this.props.itemsPerPage > 0) {
                itemsPerPage = this.props.itemsPerPage;
                numPages = Math.ceil(filteredChildren.length / itemsPerPage);

                if (currentPage > numPages - 1) {
                    currentPage = numPages - 1;
                }

                pagination = true;
                currentChildren = filteredChildren.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
            }

            // Manually transfer props
            var props = (0, _filter_props_from2.default)(this.props);

            var noDataText = this.props.noDataText ? _react2.default.createElement(
                'tr',
                { className: 'reactable-no-data' },
                _react2.default.createElement(
                    'td',
                    { colSpan: columns.length },
                    this.props.noDataText
                )
            ) : null;

            var tableHeader = null;
            if (columns && columns.length > 0 && showHeaders) {
                tableHeader = _react2.default.createElement(_thead2.default, { columns: columns,
                    filtering: filtering,
                    onFilter: function onFilter(filter) {
                        _this2.setState({ filter: filter });
                        if (_this2.props.onFilter) {
                            _this2.props.onFilter(filter);
                        }
                    },
                    filterPlaceholder: this.props.filterPlaceholder,
                    filterClassName: this.props.filterClassName,
                    currentFilter: this.state.filter,
                    sort: this.state.currentSort,
                    sortableColumns: this._sortable,
                    onSort: this.onSort.bind(this),
                    key: 'thead' });
            }
            return _react2.default.createElement(
                'table',
                props,
                tableHeader,
                _react2.default.createElement(
                    'tbody',
                    { className: 'reactable-data', key: 'tbody' },
                    currentChildren.length > 0 ? currentChildren : noDataText
                ),
                pagination === true ? _react2.default.createElement(_paginator2.default, { colSpan: columns.length,
                    pageButtonLimit: pageButtonLimit,
                    numPages: numPages,
                    currentPage: currentPage,
                    onPageChange: function onPageChange(page) {
                        _this2.setState({ currentPage: page });
                        if (_this2.props.onPageChange) {
                            _this2.props.onPageChange(page);
                        }
                    },
                    previousPageLabel: this.props.previousPageLabel,
                    nextPageLabel: this.props.nextPageLabel,
                    key: 'paginator' }) : null,
                this.tfoot
            );
        }
    }]);

    return Table;
}(_react2.default.Component);

exports.default = Table;


Table.defaultProps = {
    sortBy: false,
    defaultSort: false,
    defaultSortDescending: false,
    itemsPerPage: 0,
    filterBy: '',
    hideFilterInput: false
};
//# sourceMappingURL=table.js.map
