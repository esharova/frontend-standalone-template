import { Button, WithStyles } from '@material-ui/core';
import withStyles, { StyleRulesCallback } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography/Typography';
import React from 'react';
import { ActionCreatorsMapObject } from 'redux';
import Router from 'next/router';

interface IErrorProps extends WithStyles<typeof styles> {
    errorDescription?: string;
    allowRetry?: boolean;
    retryLocation?: string;
    actions?: ActionCreatorsMapObject;
}

const DEFAULT_TEXT_COLOR = {
    color: '#ff5050',
    fontWeight: 'bold' as 'bold',
};

const styles: StyleRulesCallback = theme => ({
    '@global': {
        body: {
            width: '100%',
            height: '100%',
        },
    },
    errorContentSpacer: {
        width: '20%',
        [theme.breakpoints.between('xs', 'sm')]: {
            display: 'none',
        },
    },
    errorPageContainer: {
        display: 'flex',
        width: 'auto',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'flex-start',
        transform: 'translateY(-14%)',
        [theme.breakpoints.down('sm')]: {
            transform: 'translateY(-30%)',
        },
    },
    errorPageContainerWrapper: {
        [theme.breakpoints.between('md', 'xl')]: {
            alignItems: 'flex-start',
        },
        [theme.breakpoints.between('xs', 'sm')]: {
            alignItems: 'stretch',
        },
        display: 'flex',
        flexFlow: 'row',
        flexDirection: 'row',
        width: 'auto',
        justifyContent: 'center',
    },
    oval2: {
        [theme.breakpoints.up('md')]: {
            backgroundImage: 'url(static/error_page_fail_icon.svg)',
            width: '158px',
            height: '158px',
        },
    },
    Ooops: {
        ...DEFAULT_TEXT_COLOR,
        marginTop: '28px',
    },
    sthWentWrong: {
        ...DEFAULT_TEXT_COLOR,
        fontSize: '18px',
    },
    errorDescription: {
        [theme.breakpoints.between('md', 'xl')]: {
            width: '481px',
        },
        [theme.breakpoints.between('xs', 'sm')]: {
            width: '300px',
            fontSize: '1.2em',
            display: 'none',
        },
        marginTop: '18px',
        fontWeight: 'normal',
    },
    tryAgainButton: {
        padding: '15px 40px',
        marginTop: '50px',
    },
});

interface IErrorState {
    submitting: boolean;
}

class ErrorClass extends React.Component<IErrorProps, IErrorState> {

    private DEFAULT_DESCRIPTION = 'Мы не смогли завершить операцию из-за технической ошибки, но вы можете попробовать снова.';

    public constructor(props: IErrorProps) {
        super(props);
        this.state = {
            submitting: false,
        };
    }

    public render() {
        const {
            classes,
            errorDescription = this.DEFAULT_DESCRIPTION,
            allowRetry = true,
            retryLocation = '/',
        } = this.props;

        let button;

        button = <Button
            variant="contained"
            color="primary"
            className={classes.tryAgainButton}
            onClick={ () => { Router.push(retryLocation); }}
        >
            Попробовать ещё раз
        </Button>;

        return (
            <div className={classes.errorPageContainerWrapper}>
                <div className={classes.errorContentSpacer}/>
                <div className={classes.errorPageContainer}>
                    <div className={classes.oval2}/>
                    <Typography
                        variant={'display4'}
                        className={classes.Ooops}
                    >
                        Ой!
                    </Typography>
                    <Typography
                        className={classes.sthWentWrong}
                        variant={'display2'}
                    >
                        Что-то пошло не так...
                    </Typography>
                    <Typography
                        variant={'display1'}
                        className={classes.errorDescription}
                    >
                        {errorDescription || this.DEFAULT_DESCRIPTION}
                    </Typography>
                    {allowRetry && button}
                </div>
            </div>
        );
    }
}

const DefaultErrorPage = withStyles(styles)(ErrorClass);

export default DefaultErrorPage;
