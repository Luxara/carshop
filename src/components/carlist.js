import React, { useState, useEffect, useRef, useCallback } from 'react'
import {AgGridReact} from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import { Button } from '@mui/material'
import AddCarBtn from './addcar'
import { TextField } from '@mui/material';
import { Dialog } from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogTitle } from '@mui/material';



function Carlist(){

    const [cars, setCars] = useState([]);
    
    const gridRef=useRef();
    
    const defaultColDef = {
            width: 150,
            filter: 'agTextColumnFilter',
            floatingFilter: true,
            resizable: true,
          }
    
    const columns = [    
        {field:'brand', sortable:true, filter:true, resizable:true},
        {field:'model', sortable:true, filter:true, resizable:true},
        {field:'year', sortable:true, filter:true, resizable:true},
        {field:'color', sortable:true, filter:true, resizable:true},
        {field:'fuel', sortable:true, filter:true, resizable:true},
        {field:'price', sortable:true, filter:true, resizable:true},
        {field:'_links.self.href',headerName:' ', cellRenderer:params => EditCar(params), sortable:false, filter:false, resizable:true},
        {field:'_links.self.href',headerName:' ', cellRenderer:params => Deletebtn(params), sortable:false, filter:false, resizable:true},
                
    ]

    

    useEffect(() => fetchData(), []);

    const fetchData = () =>{
        fetch('https://carstockrest.herokuapp.com/cars')
        .then(response => response.json())
        .then(responseData => setCars(responseData._embedded.cars))
    }
    
    const onFirstDataRendered = useCallback((params) => {
        gridRef.current.api.sizeColumnsToFit();
      }, []);

    
      const Deletebtn = (params) =>{
 
        const deleteCar = (link) => {
            console.log(link)
            fetch(link, {method: 'DELETE'})
            .then(response => fetchData())
            .catch(err => console.error(err))
        }
     
        return (
            <span>
               <Button variant='outlined' size='small' color='error' onClick={() =>{ deleteCar(params.data._links.self.href)}}>DELETE</Button>
            </span>
        );
     }

     const AddCar = (newCar) =>{
         fetch('https://carstockrest.herokuapp.com/cars', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(newCar)
        })
         .then(response => fetchData())
         .catch(err => console.error(err))
     }


     const EditCar = (props) =>{
    
        const [editableCar, setEditableCar] = React.useState({
            brand: props.data.brand, model: props.data.model, color: props.data.color, fuel: props.data.fuel, year: props.data.year, price: props.data.price
        })
        
        const [open, setOpen] = React.useState(false);
      
        const handleClickOpen = () => {
          setOpen(true);
        };
      
        const handleClose = () => {
          setOpen(false);
        };
    
        const handleInputChange = (event) =>{
            setEditableCar({...editableCar, [event.target.name]: event.target.value})
        };
    
        const UpdateCar = (link, editableCar) =>{
            console.log(link, editableCar)
            fetch(link, {
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(editableCar.editableCar)
        })
         .then(response => fetchData())
         .catch(err => console.error(err)) 
        }
    
        const SaveEditedCar = () =>{
            UpdateCar(props.data._links.self.href, {editableCar})
            handleClose();
        }
      
        return (
          <div>
            <Button variant="outlined" color="success" onClick={handleClickOpen}>
              Edit
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Edit Car</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  name="brand"
                  value={editableCar.brand}
                  onChange={event => handleInputChange(event)}
                  label="Brand"
                  fullWidth
                />
                <TextField
                  margin="dense"
                  name="model"
                  value={editableCar.model}
                  onChange={event => handleInputChange(event)}
                  label="Model"
                  fullWidth
                />
                <TextField
                  margin="dense"
                  name="color"
                  value={editableCar.color}
                  onChange={event => handleInputChange(event)}
                  label="Color"
                  fullWidth
                />
                <TextField
                  margin="dense"
                  name="fuel"
                  value={editableCar.fuel}
                  onChange={event => handleInputChange(event)}
                  label="Fuel"
                  fullWidth
                />
                <TextField
                  margin="dense"
                  name="year"
                  value={editableCar.year}
                  onChange={event => handleInputChange(event)}
                  label="Year"
                  fullWidth
                />
                <TextField
                  margin="dense"
                  name="price"
                  value={editableCar.price}
                  onChange={event => handleInputChange(event)}
                  label="Price"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={SaveEditedCar} color="primary">
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
      }

     
    

    return(
        <div className='ag-theme-material'
            style = {{height:'100%', width: '100%', margin: 'auto'}}>
            <AgGridReact
                rowSelection='single'
                ref={gridRef}
                columnDefs={columns}
                defaultColDef={defaultColDef}
                rowData={cars}
                paginationAutoPageSize={true}
                pagination={true}>
            </AgGridReact>
            <AddCarBtn AddCar={AddCar}/>         
        </div>
    )
}



export default Carlist;