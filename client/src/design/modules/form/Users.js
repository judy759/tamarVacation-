import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
    randomCreatedDate,
    randomTraderName,
    randomId,
    randomArrayItem,
} from '@mui/x-data-grid-generator';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import useAxios from 'axios-hooks'
import { useEffect } from 'react';
import { updateUser } from '../../../Store/Slices/UserSlice'
import { deleteItem } from '../../../Store/app/useHttp';
import { create } from '../../../Store/app/useHttp';
import { useState } from 'react'
import { update } from '../../../Store/app/useHttp';

const roles = ['True', 'False'];

const randomRole = () => {
    return randomArrayItem(roles);
};


function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;
    const handleClick = () => {
        const id = randomId();
        setRows((oldRows) => [...oldRows, { id,name: '', username: '', email: '' ,phone:0}]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                הוסף משתמש
            </Button>
        </GridToolbarContainer>
    );
}

export default function Users() {
    const userDispatch = useDispatch()
    const UserArr = useSelector(myStore => myStore.UserSlice.UserArr)

    const [{ data, loading, error }, refetch] = useAxios({
        url:`http://localhost:4444/api/user`,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "authorization":'Bearer '+localStorage.getItem("token")
          }
        }
    )
    useEffect(
        () => {
            userDispatch(updateUser({ GetAllUser: data }

            ))
            if (data && data.length) {
                const a = data.map(x => { return { id: x._id, name: x.name, username: x.username, email: x.email, phone: x.phone } })
                setRows(a)
            }
        }, [data])


    const initialRows = data ? data : [];


    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const flag = false
    const NewRow = {};

    const handleEditClick = (id) => async () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });

    };

    const handleDeleteClick = (id) => () => {
        deleteItem("http://localhost:4444/api/user/", { data: { id: id } })
        //setRows(rows.filter((row) => row.id !== id));
        refetch();
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = async (newRow) => {
       //   console.log("data", data);
       //   console.log("newRow", newRow);

        const editedRow = data.find((row) => row._id == newRow.id);
        //  console.log("jjj", editedRow)
        if (editedRow) {
            deleteItem("http://localhost:4444/api/user/", { data: { id: editedRow._id } })
            refetch();

        }



        await create('http://localhost:4444/api/user/', {  name: newRow.name, username: newRow.username, email: newRow.email, phone: newRow.phone } )
        refetch()
   

        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };
    const columns = [
        { field: 'name', headerName: 'Name', width: 180, editable: true },
        { field: 'username', headerName: 'Username', width: 180, editable: true },

        {
            field: 'email',
            headerName: 'Email', width: 180,
            editable: true,

        },
        {
            field: 'phone',
            headerName: 'Phone',
            width: 220,
            editable: true,
            type: 'Number'
            //'singleSelect',
           // valueOptions: Number,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',

            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={() => handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        (<Box
            sx={{
                height: 500,
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                    toolbar: EditToolbar,
                }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
            />
        </Box>)
    );
}

