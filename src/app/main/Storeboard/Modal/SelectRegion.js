import Dialog from '@material-ui/core/Dialog';
import './Modal.css'


function SelectRegion(props) {
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
      <div className="selectRegion-title">
        <h1>Select your Selling Region</h1>
      </div> 
      <div className="selectRegion-title">
        <h1>{props.selectedCountry}</h1>
      </div> 
      <div className = "selectRegion-content">                
        <div className="selectRegion-button" onClick = {(e)=>{props.regionSelect("United States")}}>
            <i className="flag-icon flag-icon-usa"></i>
            &nbsp;&nbsp;&nbsp;United States
        </div>
        <div className="selectRegion-button" onClick = {(e)=>{props.regionSelect("Germany")}}>
            <i className="flag-icon flag-icon-deu" ></i>
            &nbsp;&nbsp;&nbsp;Germany
        </div>
        <div className="selectRegion-button" onClick = {(e)=>{props.regionSelect("Canada")}}>
        <i className="flag-icon flag-icon-can"></i>
            &nbsp;&nbsp;&nbsp;Canada
        </div>
        <div className="selectRegion-button" onClick = {(e)=>{props.regionSelect("Netherland")}}>
            <i className="flag-icon flag-icon-nld"></i>
            &nbsp;&nbsp;&nbsp;Netherland
        </div>
        <div className="selectRegion-button" onClick = {(e)=>{props.regionSelect("Italy")}}>
            <i className="flag-icon flag-icon-ita"></i>
            &nbsp;&nbsp;&nbsp;Italy
        </div>
        <div className="selectRegion-button" onClick = {(e)=>{props.regionSelect("Spain")}}>
            <i className="flag-icon flag-icon-esp"></i>
            &nbsp;&nbsp;&nbsp;Spain
        </div>
        <div className="selectRegion-button" onClick = {(e)=>{props.regionSelect("United Kingdom")}}>
            <i className="flag-icon flag-icon-gbr"></i>
            &nbsp;&nbsp;&nbsp;United Kingdom
        </div>
        <div className="selectRegion-button" onClick = {(e)=>{props.regionSelect("France")}}>
            <i className="flag-icon flag-icon-fra"></i>
            &nbsp;&nbsp;&nbsp;France
        </div>
        <div className="selectRegion-button" onClick = {(e)=>{props.regionSelect("Australia")}}>
            <i className="flag-icon flag-icon-aus"></i>
            &nbsp;&nbsp;&nbsp;Australia
        </div>
        <div className="selectRegion-button" onClick = {(e)=>{props.regionSelect("Belgium - French")}}>
            <i className="flag-icon flag-icon-bel"></i>
            &nbsp;&nbsp;&nbsp;Belgium - French
        </div>
        <div className="selectRegion-button" onClick = {(e)=>{props.regionSelect("Belgium - Dutch")}}>
            <i className="flag-icon flag-icon-bel"></i>
            &nbsp;&nbsp;&nbsp;Belgium - Dutch
        </div>
        <div className="selectRegion-button" onClick = {(e)=>{props.regionSelect("India")}}>
            <i className="flag-icon flag-icon-ind"></i>
            &nbsp;&nbsp;&nbsp;India
        </div>
      </div>
    </Dialog>
  );
}

export default SelectRegion;