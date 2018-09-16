import { createMuiTheme } from '@material-ui/core/styles';

export const FONT = {
    fontSize: '1.3rem',
    lineHeight: '2.21rem',
};

export function createTheme() {
    return createMuiTheme({
        typography: {
            fontFamily: 'Lato,Arial,sans-serif',
            display1: {
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#212121',
                lineHeight: '30px',
            },
            display2: {
                fontSize: '30px',
                lineHeight: '34px',
                color: 'rgba(0, 0, 0, 0.87)',
            },
            display4: {
                fontSize: '110px',
            },
            body1: {
                ...FONT,
            },
            body2: {
                fontSize: '16px',
                lineHeight: 'normal',
            },
            title: {
                fontSize: '1.1rem',
                fontWeight: 'bold',
                lineHeight: '1.1rem',
            },
        },
        palette: {
            primary: {
                light: '#2b87db',
                main: '#2b87db',
                dark: '#256ba5',
                contrastText: '#fff',
            },
        },
        overrides: {
            MuiButton: { // Name of the component ⚛️ / style sheet
                root: { // Name of the rule
                    borderRadius: '42px',
                    transition: 'background-color .15s',
                    padding: '3px 25px 5px 40px',
                    '&:hover': {
                        backgroundColor: '#256ba5 !important',
                    },
                },
                label: {
                    textSizeAdjust: '100%',
                    fontWeight: 'bold',
                    fontSmoothing: 'antialiased',
                },
            },
            MuiMenuItem: {
                root: {
                    ...FONT,
                    '&:hover': {
                        backgroundColor: '#e9f3fb !important',
                    },
                },
                selected: {
                    backgroundColor: 'transparent !important',
                },
            },
            MuiSelect: {
                select: {
                    '&:focus': {
                        background: 'transparent',
                    },
                },
            },
            MuiFormLabel: {
                root: {
                    opacity: .7,
                    ...FONT,
                },
                error: {
                    color: '#ec576f !important',
                },
            },
            MuiFormHelperText: {
                error: {
                    color: '#ec576f !important',
                },
            },
            MuiInput: {
                root: {
                    ...FONT,
                },
                input: {
                    font: `${FONT.fontSize}/${FONT.lineHeight} Lato`,
                },
                error: {
                    '&::after': {
                        borderBottomColor: '#ec576f !important',
                    },
                },
                underline: {
                    '&:hover:before': {
                        borderBottomColor: '#2b87db !important',
                    },
                },
                inputType: {
                    height: '2.15rem',
                },
            },
            MuiExpansionPanel: {
                expanded: {
                    boxShadow: 'none',
                },
            },
            MuiChip: {
                root: {
                    ...FONT,
                },
            },
            MuiInputAdornment: {
                root: {
                    maxHeight: '3em',
                },
            },
            MuiExpansionPanelSummary: {
                expanded: {
                    boxShadow: `0px 1px 3px 0px rgba(0, 0, 0, 0.2),
                    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)`,
                },
                content: {
                    boxShadow: 'none',
                },
                expandIcon: {
                    boxShadow: 'none',
                },
            },
            MuiAppBar: {
                root: {
                    zIndex: 2,
                },
            },
        },
    });
}
