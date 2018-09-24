import React from 'react';

export default function contextWrapper(context, contextTypes, child) {
    let ContextWrapper = React.createClass({
        displayName: 'ContextWrapper',
        childContextTypes: contextTypes,
        getChildContext() { console.log(context); return context; },
        render() { return child; }
    });

    return <ContextWrapper/>;
}
