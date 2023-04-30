
import { Slide, Modal, Box, Backdrop, Typography, Button } from '@mui/material';
import { ExitToApp, Cached } from '@mui/icons-material';

const CustomModal = (props) => {
  const { isModalVisible, setIsModalVisible, type } = props
  if (type === "Error") {
    return (
      <Modal
        open={isModalVisible}
        closeAfterTransition
        onClose={() => setIsModalVisible(false)}
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500, } }}
      >
        <Slide direction="up" in={isModalVisible}>
          <Box sx={CustomStyle.modalStyle}>
            <Typography sx={{ fontWeight: 800, textAlign: "center" }}>
              Please load the code before run or leave no empty blocks.
            </Typography>
          </Box>
        </Slide>
      </Modal>
    );
  } else if (type === "Win") {
    return (
      <Modal
        open={isModalVisible}
        closeAfterTransition
        onClose={() => setIsModalVisible(false)}
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500, } }}
      >
        <Slide direction="up" in={isModalVisible}>
          <Box sx={CustomStyle.modalStyle}>
            <Typography sx={CustomStyle.text}>
              You Win!
            </Typography>
            <Box sx={CustomStyle.buttonRow}>
              <Button startIcon={<Cached />} variant="contained" sx={CustomStyle.button}>Next Level</Button>
              <Button startIcon={<ExitToApp />} variant="contained" sx={CustomStyle.button}>Back to Menu</Button>
            </Box>
          </Box>
        </Slide>
      </Modal>
    );
  } else if (type === "Lose") {
    return (
      <Modal
        open={isModalVisible}
        closeAfterTransition
        onClose={() => setIsModalVisible(false)}
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500, } }}
      >
        <Slide direction="up" in={isModalVisible}>
          <Box sx={CustomStyle.modalStyle}>
            <Typography sx={CustomStyle.text}>
              You Fail.
            </Typography>
            <Typography sx={CustomStyle.text}>
              Want to try again?
            </Typography>
            <Box sx={CustomStyle.buttonRow}>
              <Button startIcon={<Cached />} variant="contained" sx={CustomStyle.button} onClick={() => setIsModalVisible(false)}>Try Again</Button>
              <Button startIcon={<ExitToApp />} variant="contained" sx={CustomStyle.button}>Back to Menu</Button>
            </Box>
          </Box>
        </Slide>
      </Modal>
    );
  }
}

const CustomStyle = {
  modalStyle: {
    position: 'relative',
    top: '25%',
    left: '40%',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: "10px",
    boxShadow: 10,
    p: 4,
  },
  text: {
    fontWeight: 800,
    textAlign: "center",
    mb: "20px",
  },
  buttonRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: 180,
    textTransform: "none",
    fontWeight: 800,
  }
};

export default CustomModal;