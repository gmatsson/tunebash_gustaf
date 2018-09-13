import React from 'react';
import ReactModal from 'react-modal';
import "./PopUp.css";

class Popup extends React.Component {
  constructor () {
    super();

    this.handleClickCartPopup = this.handleClickCartPopup.bind(this);
    this.state = {showModal: false };
  
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }


  handleClickCartPopup(product) {
    this.props.handleRemoveFromCart(product);
  }
  
  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

  render () {
    return (
      <div id="popup">
        <button className="popupButton" onClick={this.handleOpenModal}>FAQ
        </button>

        <ReactModal id="popup"
           dialogClassName="test"
           isOpen={this.state.showModal}
           contentLabel="onRequestClose Example"
           onRequestClose={this.handleCloseModal}
           style={{
            overlay: {
              backgroundColor: 'linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%)'
              
            },
            content: {
              color: 'black',
              backgroundColor: 'papayawhip',        
            }
            
          }}> 
          <p className="headlinePopup">Vanliga frågor</p>
         <p> 
          <strong>Varför ska jag logga in på Spotify?</strong>
          <p className="answersPopup">Om du loggar in, och har Spotify Premium-konto, så kommer du att kunna spela hela längden på låtarna, annars så kommer du att få en förkortad version på låtarna som spelas i 30 sekunder.</p>
          <strong>Hur loggar jag ut från Spotify?</strong>
          <p className="answersPopup">Gå in på ditt konto på Spotifys hemsida och klicka på "Logga ut överallt".</p>
          <strong>Hur skapar jag ett nytt spel?</strong>
          <p className="answersPopup">Klicka på "Generera nytt spel" och välj därefter kriterier, sen är det bara att bjuda in kompisarna med hjälp av pinkoden.</p>
          <strong>Vilken webbläsare är bäst att använda?</strong>
          <p className="answersPopup">TuneBash fungerar bäst med webbläsaren Google Chrome.</p>
          <strong>Har du ovanliga frågor?</strong>
          <p className="answersPopup" id="bottomFAQ">Kontakta oss på blablabla.</p>
           </p>
         <div className="closeDiv">
         <button className="closeButton" onClick={this.handleCloseModal}>Stäng</button>
         </div>
        </ReactModal>
      </div>
    );
  }
}


export default Popup;