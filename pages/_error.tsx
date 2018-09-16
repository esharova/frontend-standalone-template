import React from 'react';
import DefaultErrorPage from '../shared/components/error/defaultErrorPage';
import { WithStyles } from '@material-ui/core';
import { StyleRulesCallback } from '@material-ui/core/styles/withStyles';
import withStyles from '@material-ui/core/styles/withStyles';

interface IErrorProps extends WithStyles<typeof styles> {
    statusCode: number;
}

interface IResponse {
    statusCode: number;
}

interface IError {
    statusCode: number;
}

const styles: StyleRulesCallback = theme => ({
    errorContainerStyles: {
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        height: '100%',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left bottom',
        backgroundAttachment: 'fixed',
        [theme.breakpoints.down('sm')]: {
            backgroundPosition: '0 0',
            backgroundSize: 'cover',
        },
    },
});

interface IInitialProps {
    res: IResponse;
    err: IError;
}

class ErrorClass extends React.Component<IErrorProps, {}> {

    public static getInitialProps({res, err}: IInitialProps) {
        const statusCode = res ? res.statusCode : err ? err.statusCode : null;
        return {statusCode};
    }

    public render() {
        const { classes } = this.props;
        return (
            <div className={ classes.errorContainerStyles }>
                <DefaultErrorPage/>
            </div>
        );
    }
}

const Error = withStyles(styles)(ErrorClass);
export default Error;
