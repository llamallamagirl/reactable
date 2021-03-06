import React from 'react';
import DOM from 'react-dom-factories';
import Td from './td';
import toArray from './lib/to_array';
import filterPropsFrom from './lib/filter_props_from';

export default class Tr extends React.Component {
    render() {
        var children = toArray(React.Children.children(this.props.children));

        if (
            this.props.data &&
                this.props.columns &&
                    typeof this.props.columns.map === 'function'
        ) {
            children = children.concat(this.props.columns.map(function({ props = {}, ...column}, i) {
                if (this.props.data.hasOwnProperty(column.key)) {
                    var value = this.props.data[column.key];

                    if (
                        typeof(value) !== 'undefined' &&
                            value !== null &&
                                value.__reactableMeta === true
                    ) {
                        props = value.props;
                        value = value.value;
                    }

                    return <Td column={column} key={column.key} {...props}>{value}</Td>;
                }
            }.bind(this)));
        }

        // Manually transfer props
        var props = filterPropsFrom(this.props);

        return DOM.tr(props, children);
    }
};

Tr.childNode = Td;
Tr.dataType = 'object';

