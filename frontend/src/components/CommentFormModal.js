import React from 'react';
import {connect} from 'react-redux'
import { Modal, ModalHeader } from 'reactstrap';

import { closeModalComment } from '../actions/comments';
import CommentForm from './CommentForm'


class CommentFormModal extends React.Component {

    toggle = () => {
        this.props.closeModalComment()
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.modalCommentOpen}>
                    <ModalHeader toggle={this.toggle}>Edit Comment</ModalHeader>
                    {this.props.comment &&
                        <CommentForm postId={this.props.comment.parentId} modal={true} />
                    }
                </Modal>
            </div>
        );
    }
}


const mapStateToProps = state => ({comment: state.comment.comment, modalCommentOpen: state.comment.modalCommentOpen})
const mapDispatchToProps = { closeModalComment }
export default connect(mapStateToProps, mapDispatchToProps)(CommentFormModal)