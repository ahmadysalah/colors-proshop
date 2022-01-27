import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './style.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AgGridColumn } from 'ag-grid-react/lib/shared/agGridColumn';
import { columnDefs, defaultColDef, rowStyle, getRowStyle } from './data';
import { ContainAgGrid } from './style';
import { StyledDelete, StyledEdit } from './Icons';
import { IProducts } from '../../redux/Product/type';
import { AppState } from '../../redux/store';
import { delateProduct } from '../../redux/Admin/action';
import { TAllActionAdmin } from '../../redux/Admin/type';

interface IProps {
  data?: IProducts[];
}

const row = (PRODUCTID, PRODUCTNAME, PRODUCTPRICE, CATEGORY, ACTION) => ({
  PRODUCTID,
  PRODUCTNAME,
  PRODUCTPRICE,
  CATEGORY,
  ACTION,
});

const Table = ({ data }: IProps) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, any, TAllActionAdmin>>();
  console.log('dataaaaaaaaaaaaa', data);

  const deleteOnClick: any = (id: string) => {
    console.log('iddddddddddd', id);
    dispatch(delateProduct(`${id}`));
  };

  const getRowData = () => {
    return data?.map(e => {
      return row(
        // eslint-disable-next-line no-underscore-dangle
        e?._id,
        e?.brand,
        e?.price,
        e?.categories[0],
        <>
          <Link to="/addNewProduct">
            <StyledEdit />
          </Link>
          <StyledDelete onClick={deleteOnClick(e._id)} />
        </>,
      );
    });
  };

  const [rowData, setRowData] = useState(getRowData());

  return (
    <>
      <ContainAgGrid className="ag-theme-balham">
        <AgGridReact
          reactUi
          getRowStyle={getRowStyle}
          rowStyle={rowStyle}
          rowHeight={62}
          defaultColDef={defaultColDef}
          rowData={rowData}
          // columnDefs={columnDefs}
        >
          <AgGridColumn field="PRODUCTID" width={300} />
          <AgGridColumn field="PRODUCTNAME" width={220} />
          <AgGridColumn field="PRODUCTPRICE" width={220} />
          <AgGridColumn field="CATEGORY" width={220} />
          <AgGridColumn field="ACTION" width={200} />
        </AgGridReact>
      </ContainAgGrid>
    </>
  );
};

export default Table;

// <AgGridColumn field="PRODUCTID" width={150} />
// <AgGridColumn field="PRODUCTNAME" width={90} />
// <AgGridColumn field="PRODUCTPRICE" width={150} />
// <AgGridColumn field="CATEGORY" width={90} />
// <AgGridColumn field="ACTION" width={150} />
