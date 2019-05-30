import React from 'react';

// This function takes a component...
function withOpenDrawer(WrappedComponent) {
  // ...and returns another component...
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.openDrawer = this.openDrawer.bind(this);
    }

    openDrawer = () => this.props.navigation.openDrawer();

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent openDrawer={this.openDrawer} {...this.props} />;
    }
  };
}

export default withOpenDrawer;
