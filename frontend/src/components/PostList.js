import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactLoading from 'react-loading';
import { Col, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Alert } from 'reactstrap';
import sortBy from 'sort-by'

import PostCard from './PostCard'
import { search, searchPostsByCategory } from '../actions/posts';

class PostList extends Component {

    state = {
        searched: false,
        sortAttribute: '-voteScore',
        dropdownSortOpen: false
    }

    componentDidMount() {
        if(this.props.category) {
            this.props.searchPostsByCategory(this.props.category)
                .then(() => {
                    this.setState({searched: true})
                })
        } else {
            this.props.search()
                .then(() => {
                    this.setState({searched: true})
                })
        }
    }

    clickBtnSort = (attribute) => {
        this.setState({sortAttribute: attribute})
    }

    toggleSort = () => {
        this.setState({
            dropdownSortOpen: !this.state.dropdownSortOpen
        });
    }


    render() {
        const renderList = () => {
            const list = this.props.list.sort(sortBy(this.state.sortAttribute)) || []
            return list.map((post, idx) => (
                <PostCard key={idx} post={post} showBtnReadMore={true} />
            ))
        }
        return (
            <Col md='9' sm='12' xs='12'>
                {
                    (this.state.searched ? (
                        <div>
                            <h3>
                                Posts
                                {this.props.list.length > 0 &&
                                    <ButtonDropdown isOpen={this.state.dropdownSortOpen} toggle={this.toggleSort} size="sm"
                                                    className="float-right">
                                        <DropdownToggle caret>
                                            Sort by
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem onClick={() => this.clickBtnSort('-voteScore')}>most voted</DropdownItem>
                                            <DropdownItem onClick={() => this.clickBtnSort('voteScore')}>less voted</DropdownItem>
                                            <DropdownItem onClick={() => this.clickBtnSort('-timestamp')}>Recent</DropdownItem>
                                            <DropdownItem onClick={() => this.clickBtnSort('timestamp')}>Older</DropdownItem>
                                        </DropdownMenu>
                                    </ButtonDropdown>
                                }
                            </h3>
                            {
                                (this.props.list.length > 0 ? (
                                    renderList()
                                ) : (
                                    <Alert color="danger">
                                        No records found.
                                    </Alert>
                                ))
                            }
                        </div>
                    ) : (
                        <ReactLoading type="spinningBubbles" color="#444" delay={0} />
                    ))
                }
            </Col>
        );
    }

}

const mapStateToProps = state => ({list: state.post.list})
const mapDispatchToProps = { search, searchPostsByCategory }
export default connect(mapStateToProps, mapDispatchToProps)(PostList)


// TODO - implementar reselect (https://github.com/reactjs/reselect)