import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaClockO, FaComment, FaThumbsODown, FaThumbsOUp, FaUser, FaTag, FaPencil, FaTrash } from 'react-icons/lib/fa'
import { Card, CardBody, CardLink, CardTitle, Button } from 'reactstrap'
import swal from 'sweetalert'
import moment from 'moment'

import { vote, remove} from '../actions/posts';

class PostCard extends Component {

    static propTypes = {
        post: PropTypes.object.isRequired,
        showBtnReadMore: PropTypes.bool,
        redirectAfterRemove: PropTypes.bool
    }

    clickVote = (vote) => {
        this.props.vote(this.props.post, vote)
    }

    clickRemove = () => {
        swal({
            icon: "warning",
            text: "You really want to remove?",
            buttons: {
                cancel: true,
                confirm: true,
            },
        }).then((value) => {
            if(value)
                this.props.remove(this.props.post.id, this.props.redirectAfterRemove)
        });
    }

    render() {
        const post = this.props.post
        return (
            <Card className='mb-15'>
                <CardBody>
                    <CardTitle>
                        <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>

                        <span className="font-14 ml-3">
                            <Link to={`/${post.category}/${post.id}/edit`}><FaPencil /></Link>
                            {' '}
                            <a href="javascript:void(0)" onClick={this.clickRemove}><FaTrash /></a>
                        </span>

                        <span className='float-right font-14'>
                            <FaTag /> {post.category}
                        </span>
                    </CardTitle>
                    <div className='font-12'>
                        <span>
                            <FaUser/> <CardLink href='#'>{post.author}</CardLink>
                        </span>

                        <span className='ml-10'>
                            <FaClockO/> {moment(post.timestamp).format('MM/D/YYYY H:mm:ss')}
                        </span>

                        <span className='ml-10'>
                            <FaComment/> {post.commentCount} Comments
                        </span>
                    </div>
                    <hr/>
                    {post.body}
                    <hr/>

                    {this.props.showBtnReadMore && (<Link to={`/posts/${post.id}`} className='btn btn-sm btn-primary'>Read More</Link>)}

                    <div className='float-right'>
                        <span className='mr-3 font-12'>
                            {post.voteScore} Votes
                        </span>
                        <Button outline color="primary" onClick={() => this.clickVote('upVote')}>
                            <FaThumbsOUp/>
                        </Button>
                        {' '}
                        <Button outline color="primary" onClick={() => this.clickVote('downVote')}>
                            <FaThumbsODown/>
                        </Button>
                    </div>
                </CardBody>
            </Card>
        );
    }

}

//const mapStateToProps = state => ({list: state.post.list})
const mapDispatchToProps = { vote, remove }
export default connect(null, mapDispatchToProps)(PostCard)
