import React from 'react';
import DataTable from 'react-data-table-component';


export const Table = ({ columns, data}) => {
    return (
        <DataTable
            title="User Info"
            columns={columns}
            data={data}
        />
    );
};

export default Table;