import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactLoading from 'react-loading';
import { Col, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Alert } from 'reactstrap';
import sortBy from 'sort-by'

import PostCard from './PostCard'
import { search, searchPostsByCategory, updateSortAttribute } from '../actions/posts';

class PostList extends Component {

    state = {
        searched: false,
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
        this.props.updateSortAttribute(attribute)
    }

    toggleSort = () => {
        this.setState({
            dropdownSortOpen: !this.state.dropdownSortOpen
        });
    }


    render() {
        const renderList = () => {
            return this.props.list.map((post, idx) => (
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

const getPostsSorted = (list, sortAttribute) => {
    return list.sort(sortBy(sortAttribute)) || []
}

const mapStateToProps = state => ({list: getPostsSorted(state.post.list, state.post.sortAttribute)})
const mapDispatchToProps = { search, searchPostsByCategory, updateSortAttribute }
export default connect(mapStateToProps, mapDispatchToProps)(PostList)