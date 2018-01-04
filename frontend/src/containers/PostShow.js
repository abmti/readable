import React, {Component} from 'react'
import { connect } from 'react-redux'
import ReactLoading from 'react-loading';
import { Row, Col, Card, CardHeader } from 'reactstrap';
import PostCard from '../components/PostCard'
import CommentForm from '../components/CommentForm'
import CommentList from '../components/CommentList'
import { load } from '../actions/posts';


class PostShow extends Component {

    state = {
        loaded: false
    }

    componentDidMount() {
        this.props.load(this.props.match.params.id)
            .then(() => {
                this.setState({loaded: true})
            })
            .catch((err) => {
                this.props.history.push(`/404`);
            })

    }

    render() {
        const { post } = this.props
        const postId = this.props.match.params.id
        return (
            <Row>
                <Col md="9">
                    {
                        (this.state.loaded ? (
                            <div>
                                <PostCard post={post} showBtnReadMore={false} redirectAfterRemove={true} />

                                <Card className='mb-15'>
                                    <CardHeader>
                                        Add your Comment
                                    </CardHeader>
                                    <CommentForm postId={postId} />
                                </Card>
                                <CommentList postId={postId} />
                            </div>
                        ) : (
                            <ReactLoading type="spinningBubbles" color="#444" delay={0} />
                        ))
                    }
                </Col>
            </Row>
        )
    }

}

const mapStateToProps = state => ({post: state.post.post})
const mapDispatchToProps = {load}
export default connect(mapStateToProps, mapDispatchToProps)(PostShow)
