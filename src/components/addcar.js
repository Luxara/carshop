import React from 'react';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Dialog } from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogTitle } from '@mui/material';




export default function AddCarBtn(props) {
    
    const [newCar, setNewCar] = React.useState({
        brand: '', model: '', color: '', fuel: '', year: '', price: ''
    })
    
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleInputChange = (event) =>{
        setNewCar({...newCar, [event.target.name]: event.target.value})
    };

    const AddCar = () =>{
        console.log(newCar)
        props.AddCar(newCar);
        handleClose();
    }
  
    return (
      <div>
        <Button style={{position:'absolute', top:'70px', right:'160px'}} variant="contained" color="success" onClick={handleClickOpen}>
          Add a new car
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">New Car</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="brand"
              value={newCar.brand}
              onChange={event => handleInputChange(event)}
              label="Brand"
              fullWidth
            />
            <TextField
              margin="dense"
              name="model"
              value={newCar.model}
              onChange={event => handleInputChange(event)}
              label="Model"
              fullWidth
            />
            <TextField
              margin="dense"
              name="color"
              value={newCar.color}
              onChange={event => handleInputChange(event)}
              label="Color"
              fullWidth
            />
            <TextField
              margin="dense"
              name="fuel"
              value={newCar.fuel}
              onChange={event => handleInputChange(event)}
              label="Fuel"
              fullWidth
            />
            <TextField
              margin="dense"
              name="year"
              value={newCar.year}
              onChange={event => handleInputChange(event)}
              label="Year"
              fullWidth
            />
            <TextField
              margin="dense"
              name="price"
              value={newCar.price}
              onChange={event => handleInputChange(event)}
              label="Price"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={AddCar} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }