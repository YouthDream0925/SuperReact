import Dialog from '@material-ui/core/Dialog';
import './Modal.css'


function SelectChannel(props) {
  if(!props.show) return "";
  return (
    <Dialog
      classes={{
        paper: 'w-full m-24',
      }}
      onClose={(ev) => {}}
      open={true}
    >
      
      <div className="modal-button-close" onClick = {props.onClose}><i className="fa-solid fa-xmark"></i></div>
      <div className="selectChannel-title">
        <h2>Select your Selling Channel</h2>
      </div>
      
      <div className = "selectChannel-content">                
        <div className="selectChannel-button" onClick = {props.selectRegion}><i className="fab fa-ebay iconFont"></i>EBay</div>
        <div className="selectChannel-button" disabled><i className="fa-brands fa-shopify  iconFont"></i>Shopify</div>
      </div>
    </Dialog>
  );
}

export default SelectChannel;