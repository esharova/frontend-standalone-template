import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Typography from "@material-ui/core/Typography/Typography";

class MainClass extends React.Component<{}, {}> {
    public static async getInitialProps({req}) {
    }

    public render() {
        return (
          <Typography variant="display1">
              Hello world
          </Typography>
        );
    }
}

function mapStateToProps({}) {
    return {};
}

function mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators({
    }, dispatch);
}

const Index = connect(mapStateToProps, mapDispatchToProps)(MainClass);
export default Index;
