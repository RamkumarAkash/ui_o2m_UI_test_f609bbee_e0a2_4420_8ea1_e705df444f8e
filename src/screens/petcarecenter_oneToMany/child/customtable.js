import { Add as AddBoxIcon } from '@mui/icons-material';
import { Box, Grid, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { CustomDialog, DocViewer, Image, SearchInput } from "components";
import RenderFormContols from "components/formControls/RenderFormContols";
import React, { useEffect, useState } from "react";
import { ValidatorForm } from 'react-material-ui-form-validator';
import { Link } from "react-router-dom";
import Helper from "shared/helper";
import { GetDocument } from "shared/services";
import { DataTable } from '../../childs';

// <CustomTable location={x} title={UIComponentTitle} controls={props.controls[x]} rows={dataRows} options={props.options} />
const Component = (props) => {
    const { title, location, controls, options, rows, onTableRowUpdated, mode } = props;

    const theme = useTheme();

    const [initialize, setInitialize] = useState(false);
    const [state, setState] = useState(false);
    const [pageInfo, setPageInfo] = useState({ page: 0, pageSize: 5 });
    const [searchStr, setSearchStr] = useState("");
    const [sortBy, setSortBy] = useState(null);
    const [actions, setActions] = useState({ id: 0, action: null });

    const [configInfo, setConfigInfo] = useState(null);
    const [columns, setColumns] = useState([]);
    const [keyIdName, setKeyIdName] = useState(null);
    const [newItem, setNewItem] = useState(null);
    const [configBackInfo, setConfigBackInfo] = useState(null);

    const form = React.useRef(null);

    const numberOfColumns = 6;

    const InitializeConfig = async () => {
        let _columns = controls.filter(x => x.type !== 'keyid').slice(0, numberOfColumns).map(z => {
            return { headerName: z.label, field: z.key, flex: 1, flexGrow: 1, flexShrink: 1 };
        });

        let tmp = {};
        controls.forEach(x => {
            if (x.type !== 'keyid') tmp = { ...tmp, [x.key]: x.value };
        })
        setNewItem(tmp);
        const _keyItem = controls.find(x => x.type === 'keyid');
        setKeyIdName(_keyItem.key);
        setColumns(_columns);
        setConfigBackInfo(Helper.CloneObject(controls));
        setConfigInfo(controls);
    }

    const OnPageClicked = (e) => { setPageInfo({ page: 0, pageSize: 5 }); if (e) setPageInfo(e); }
    const OnSortClicked = (e) => { setSortBy(e); }
    const OnSearchChanged = (e) => { setSearchStr(e); }
    const OnInputChange = (e) => {

        if (e.value !== "CNONE") {

            let tmp = controls.find(x => x.key === e.name);

            if (tmp.type === 'dropdown') {
                e.value = options.find((z) => z.Name === tmp.source).Values.find((m) => parseInt(m[tmp.valueId]) === parseInt(e.value))[tmp.nameId];
            }

            setNewItem((prev) => ({ ...prev, [e.name]: e.value }));
        }
    }

    const OnActionClicked = (id, type) => {
 
        if (type === 'edit' || type === 'view' || type === 'delete') {
            ClearSettings();
            const selectedRow = rows.find((x) => x[keyIdName] === id);
            let tmpInfo = Helper.CloneObject(configInfo);
            tmpInfo.forEach(x => x.value = selectedRow[x.key]);
            tmpInfo.forEach(m => {
                let _nValue = m.value;
                if (m.type === 'dropdown') {
                    const { Values } = options.find((z) => z.Name === m.source);
                    const _value = Values.find((z) => z[m.valueId] === _nValue || z[m.contentId] === _nValue) || {};
                    _nValue = _value[m.valueId];
                }

                m.value = _nValue;
            })
            setConfigInfo(tmpInfo);
            setNewItem(selectedRow);
            setState(!state);
        }
        setActions({ id, action: type });
    }

    const ClearSettings = () => {
        setConfigInfo(Helper.CloneObject(configBackInfo));
        setActions({ id: 0, action: null });
        setNewItem(null);
    }

    const OnCloseClicked = (e) => {
        if (!e) {
            ClearSettings();
            return;
        }
        if (actions.action === 'add' || actions.action === 'edit') {
            if (form) form.current.submit();
        } else if (actions.action === 'delete') {
            handleSubmit();
        }
    }

    const handleSubmit = async () => {
        if (onTableRowUpdated) {
            onTableRowUpdated({ ...actions, rows, keyIdName, location, data: newItem });
            ClearSettings();
        }
    }

    if (initialize) { setInitialize(false); InitializeConfig(); }
    useEffect(() => { setInitialize(true); }, [sortBy, pageInfo, searchStr]);
    useEffect(() => { setInitialize(true); }, []);

    return (
        <>
            <Box sx={{ ...theme.customtableheader }}>
                <Stack direction="row" sx={{ padding: "5px", width: '100%' }}>
                    <Grid container sx={{ justifyContent: 'flex-start', alignItems: "center" }}>
                        <Typography noWrap variant="subheader" sx={{ borderBottom: "none" }}>
                            {title}s
                        </Typography>
                    </Grid>
                    <Grid container sx={{ justifyContent: 'flex-end' }}>
                                            {mode !== 'view' && (
                            <IconButton
                                size="medium"
                                edge="start"
                                color="inherit"
                                aria-label="Add"
                                sx={{
                                    marginLeft: "2px",
                                    borderRadius: "4px",
                                    border: theme.childAddIconBorder
                                }}
                                onClick={() => OnActionClicked(undefined, 'add')}
                            >
                                <AddBoxIcon />
                            </IconButton>
                        )}
                    </Grid>
                </Stack>
            </Box>
            <Box style={{ width: '100%' }}>
                <DataTable keyId={keyIdName} columns={columns} rowsCount={rows ? rows.length : 0} rows={rows || []} noActions={mode === 'view'}
                    sortBy={sortBy} pageInfo={pageInfo} onActionClicked={OnActionClicked} localPaginationMode={true} localSorting={true}
                    onSortClicked={OnSortClicked} onPageClicked={OnPageClicked} />
            </Box>

            <CustomDialog open={actions.action === 'delete'} title={"Confirmation"} action={actions.action} onCloseClicked={OnCloseClicked}>
                <Typography gutterBottom>
                    Are you sure? You want to delete?
                </Typography>
            </CustomDialog>

            {!Helper.IsNullValue(actions.action) && actions.action !== 'delete' && (
                <CustomDialog sxContent={{ padding: "16px 24px !important" }} width="auto" action={actions.action}
                    open={!Helper.IsNullValue(actions.action)} title={`${Helper.ToFirstCharCapital(actions.action)} ${title}`} onCloseClicked={OnCloseClicked}>
                    <ValidatorForm ref={form} onSubmit={handleSubmit}>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <RenderFormContols shadow={true} location="newItem" mode={actions.action} onInputChange={OnInputChange}
                                controls={configInfo} options={props.options} />
                        </Grid>
                    </ValidatorForm>
                </CustomDialog>
            )}
        </>
    )

}

export default Component;
