import createTheme from '@mui/material/styles/createTheme';
import DMSansMedium from "assets/fonts/DMSans-Medium.ttf";
import DMSansLight from "assets/fonts/DMSans-Light.ttf";
import DMSansRegular from "assets/fonts/DMSans-Regular.ttf";
import DMSansSemiBold from "assets/fonts/DMSans-SemiBold.ttf";
import DMSansBold from "assets/fonts/DMSans-Bold.ttf";
import DMSansExtraBold from "assets/fonts/DMSans-ExtraBold.ttf"; 

const theme = createTheme({
    palette: {
        mode: "light"
    },
    customtableheader: {
        width: '100%', backgroundColor: "#F9F9F9",
        borderTop: "1px solid rgba(0,0,0,.15)",
        borderLeft: "1px solid rgba(0,0,0,.15)",
        borderRight: "1px solid rgba(0,0,0,.15)"
    },
    typography: {
        fontFamily: [
            'DM Sans',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        caption: {
            fontSize: "0.8rem",
        },
        colorcaption: {
            fontSize: "0.8rem",
            color: "grey"
        },
        avatar: {
            fontSize: "1rem",
            fontWeight: 'bold'
        },
        header: {
            fontSize: "1rem",
            fontWeight: 'bold'
        },
        subheader: {
            fontSize: "1rem",
            fontWeight: 'bold',
            margin: "5px 0px 5px 0px"
        },
        subheadercenter: {
            fontSize: "1rem",
            fontWeight: 'bold',
            padding: "5px",
            backgroundColor: "#F9F9F9",
            display: "block",
            borderBottom: "1px solid rgba(0,0,0,.05)",
            borderTopLeftRadius: "3px",
            borderTopRightRadius: "3px"
        },
        cardheader: {
            fontSize: "1rem",
            fontWeight: 'bold'
        },
        labelheader: {
            fontSize: "1rem",
            fontWeight: "bold",
            width: "100%",
            textAlign: "right"
        },
        h6: {
            fontSize: "1.15rem",
        },
        mandatory: {
            marginLeft: 1,
            color: "rgb(211, 47, 47)"
        },
        notstarted: {
            backgroundColor: "#5E696E",
            color: "#ffffff",
            borderRadius: 5,
            padding: 3
        },
        started: {
            backgroundColor: "#E78C07",
            color: "#ffffff",
            borderRadius: 5,
            padding: 3
        },
        pending: {
            backgroundColor: "#BB0000",
            color: "#ffffff",
            borderRadius: 5,
            padding: 3
        },
        completed: {
            backgroundColor: "#2B7D2B",
            color: "#ffffff",
            borderRadius: 5,
            padding: 3
        }
    },
    select: {
        fontSize: "0.8rem",
        height: 21
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                            borderWidth: "1px",
                            // borderColor: "rgba(0, 0, 0, 0.23)" // default color
                            borderColor: "rgba(0, 0, 0, 0.87)"
                        },
                        "&.Mui-error fieldset": {
                            borderWidth: "1px",
                            borderColor: "rgb(211, 47, 47)",
                        }
                    },
                    "& .MuiFormHelperText-root": {
                        marginLeft: "2px"
                    }
                }
            }
        },
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    backgroundColor: "#FFFFFF"
                }
            }
        },
        MuiCssBaseline: {
            styleOverrides: `
                @font-face { font-display: swap; font-style : normal; src: url(${DMSansLight}); font-family : "DM Sans"; font-weight : 300;  }
                @font-face { font-display: swap; font-style : normal; src: url(${DMSansRegular}); font-family : "DM Sans"; font-weight : 400;  }
                @font-face { font-display: swap; font-style : bold; src: url(${DMSansMedium}); font-family : "DM Sans"; font-weight : 500;  }
                @font-face { font-display: swap; font-style : bold; src: url(${DMSansSemiBold}); font-family : "DM Sans"; font-weight : 600;  }
                @font-face { font-display: swap; font-style : bold; src: url(${DMSansBold}); font-family : "DM Sans"; font-weight : 700;  }
                @font-face { font-display: swap; font-style : bold; src: url(${DMSansExtraBold}); font-family : "DM Sans"; font-weight : 800;  }
            `,
          },
    },
    searchIconBorder: "1px solid rgba(0, 0, 0, 0.23)",
    childAddIconBorder: "1px solid rgba(0, 0, 0, 0.23)",
    borderBottom: "1px solid rgba(0, 0, 0, 0.23)",
    borderBottomFocus: "1px solid rgba(0, 0, 0, 0.87)",
    borderBottomFocus2: "1px solid rgba(0, 0, 0, 0.87)"
});

export default theme;