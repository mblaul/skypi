import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteUser } from '../../../actions/authActions';
import Modal from 'react-modal';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class DeleteModal extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  onDeleteClick(e) {
    e.preventDefault();
    this.props.deleteUser(this.props.auth.user.id);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div>
        <li className="nav-item">
          <button onClick={this.openModal} className="btn btn-danger float-right">
            Delete
          </button>
        </li>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <h2 ref={subtitle => (this.subtitle = subtitle)}>WARNING!</h2>
          <div>
            You are about to permanently delete your account.
            <br />This action can not be undone.
            <br /><br />Do you want to proceed?
          </div>
          <hr />
          <form className="nav-item form-row mx-auto">
            <button
                onClick={this.onDeleteClick.bind(this)}
                className="btn btn-danger mx-auto"
            >
              Delete
            </button>
            <button 
                onClick={this.closeModal}
                className="btn btn-primary mx-auto"
            >
              Cancel
            </button>
          </form>
        </Modal>
      </div>
    );
  }
}

DeleteModal.propTypes = {
  deleteUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

// Bring in auth state
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteUser }
)(DeleteModal);
