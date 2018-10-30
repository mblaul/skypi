import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import Modal from 'react-modal';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

class Logout extends React.Component {
    constructor() {
        super();

        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    
    onLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUser();
        alert('You have been logged out!');
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    render() {
        return(
            <div>
                <li className="nav-item">
                <a
                    onClick={this.openModal}
                    className="btn btn-primary mr-2"
                >
                    Logout
                </a>
                </li>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                
                    <h2 ref={subtitle => this.subtitle = subtitle}>Logging out</h2>
                    <div>You are about to log out. Do you want to proceed?</div>
                    <form>
                        <button>Logout</button>
                        <button onClick={this.closeModal}>Cancel</button>
                    </form>
                </Modal>
            </div>
        );
    }
}

Logout.PropTypes = {
    logoutUser: PropTypes.func.isRequired
};

export default connect(
  )(Logout);