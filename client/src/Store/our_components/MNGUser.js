import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tooltip } from 'primereact/tooltip';
// import { ProductService } from './service/ProductService';
import { saveAs } from 'file-saver';
import AppAppBar from '../../design/modules/views/AppAppBar';
import { useGetUserQuery } from '../Slices/authApiSlice';
import { useDispatch } from 'react-redux';

const MNGUser = () => {
    const [products, setProducts] = useState([]);
    const dt = useRef(null);


    const cols = [
        { field: 'firstname', header: 'שם פרטי' },
        { field: 'lastname', header: 'שם משפחה' },
        { field: 'email', header: 'מייל' },
        { field: 'vacationPackage.length', header: 'מספר פעמים שרכש'},
        { field: 'isRegister', header: 'רשום או לא'}
    ];

    // useEffect(() => {
    //     ProductService.getProductsMini().then((data) => setProducts(data));
    // }, []);
    const { data: dataUsers, isErroru, erroru, isLoadingu, isSuccessu } = useGetUserQuery();
    const exportCSV = (selectionOnly) => {
        dt.current.exportCSV({ selectionOnly });
    };

    const exportPdf = () => {
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);

                doc.autoTable(cols.map(col => col.header), dataUsers);
                doc.save('users.pdf');
            });
        });
    };

    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(dataUsers);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });

            saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), 'Users.xlsx');
        });
    };

    const header = (
        <div className="flex align-items-center justify-content-end gap-2">
            <Button type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" />
            <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" />
            <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} data-pr-tooltip="PDF" />
        </div>
    );

    return (
        <>
        {/* <AppAppBar/> */}
            <div className="card">
                <Tooltip target=".export-buttons>button" position="bottom" />

                <DataTable ref={dt} value={dataUsers} header={header} tableStyle={{ minWidth: '50rem' }}>
                    {cols.map((col, index) => (
                        <Column key={index} field={col.field} header={col.header} />
                    ))}
                </DataTable>
            </div>
           
        </>
    );
};

export default MNGUser;
