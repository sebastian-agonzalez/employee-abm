
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmDialog({ open, setOpen, handleConfirm }) {
    return (
        <div>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"New Register"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        A new employee register will be created. Please confirm to proceed.
                    </DialogContentText>
                </DialogContent>
                <div className="p-2">
                    <DialogActions>
                        <Button variant="text" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button variant="outlined" color="success" onClick={handleConfirm}>
                            Confirm
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </div>

    );
}