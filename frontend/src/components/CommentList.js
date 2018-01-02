import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Row, Col, Card, CardBody, CardLink, Button } from 'reactstrap';
import {FaClockO, FaThumbsODown, FaThumbsOUp, FaUser, FaPencil, FaTrash} from 'react-icons/lib/fa';
import sortBy from 'sort-by'
import moment from 'moment'
import swal from 'sweetalert'

import { searchByPost, vote, remove, openModalComment } from '../actions/comments';
import CommentFormModal from './CommentFormModal'

class CommentList extends Component {

    static propTypes = {
        postId: PropTypes.string.isRequired
    }

    state = {
        sortAttribute: '-timestamp'
    }

    componentDidMount() {
        this.props.searchByPost(this.props.postId)
    }

    clickVote = (comment, vote) => {
        this.props.vote(comment, vote)
    }

    clickEdit = (comment) => {
        this.props.openModalComment(comment)
    }

    clickRemove = (comment) => {
        swal({
            icon: "warning",
            text: "You really want to remove?",
            buttons: {
                cancel: true,
                confirm: true,
            },
        }).then((value) => {
            if(value)
                this.props.remove(comment.id)
        });
    }

    render() {
        const list = this.props.list.sort(sortBy(this.state.sortAttribute)) || []
        const renderList = () => {
            return list.map((comment, idx) => (
                <Row key={idx}>
                    <Col md="12">
                        <div>
                            <span>
                                <FaUser/> <CardLink href='#'>{comment.author}</CardLink>
                            </span>
                            <span className='ml-10'>
                                <FaClockO/> {moment(comment.timestamp).format('MM/D/YYYY H:mm:ss')}
                            </span>
                            <span className="font-14 ml-3">
                                <a href="javascript:void(0)" onClick={() => this.clickEdit(comment)}><FaPencil /></a>
                                {' '}
                                <a href="javascript:void(0)" onClick={() => this.clickRemove(comment)}><FaTrash /></a>
                            </span>
                        </div>
                        {comment.body}
                        <div className='float-right'>
                            <span className='mr-3 font-12'>
                                {comment.voteScore} Votes
                            </span>
                            <Button outline color="primary" onClick={() => this.clickVote(comment, 'upVote')}>
                                <FaThumbsOUp/>
                            </Button>
                            {' '}
                            <Button outline color="primary" onClick={() => this.clickVote(comment, 'downVote')}>
                                <FaThumbsODown/>
                            </Button>
                        </div>
                        <div className="clearfix"></div>
                        <hr />
                    </Col>
                </Row>
            ))
        }
        return (
            <div>
                <Card>
                    <CardBody>
                        <h3>{list.length} Comments</h3>
                        <hr />
                        {renderList()}
                    </CardBody>
                </Card>
                <CommentFormModal />
            </div>
        );
    }

}

const mapStateToProps = state => ({list: state.comment.list})
const mapDispatchToProps = { searchByPost, vote, remove, openModalComment }
export default connect(mapStateToProps, mapDispatchToProps)(CommentList)
