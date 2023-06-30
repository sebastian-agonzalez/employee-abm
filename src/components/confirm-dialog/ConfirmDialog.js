
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const DIALOG_MODE = {
    create: 'create',
    edit: 'edit'
}

const DIALOG_TEXT = {
    create: {
        title: "New Register",
        body: "A new employee register will be created. Please confirm to proceed."
    },
    edit: {
        title: "Edit Register",
        body: "An employee register will be modified. Please confirm to proceed."
    }
}


export default function ConfirmDialog({ open, setOpen, handleConfirm, mode }) {
    return (
        <div>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {DIALOG_TEXT[mode].title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {DIALOG_TEXT[mode].body}
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