import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import sortBy from 'sort-by'

import PostCard from './PostCard'
import { search, searchPostsByCategory } from '../actions/posts';

class PostList extends Component {

    state = {
        sortAttribute: '-voteScore',
        dropdownSortOpen: false
    }

    componentDidMount() {
        if(this.props.category) {
            this.props.searchPostsByCategory(this.props.category)
        } else {
            this.props.search()
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
                <h3>
                    Posts
                    <ButtonDropdown isOpen={this.state.dropdownSortOpen} toggle={this.toggleSort} size="sm" className="float-right">
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
                </h3>
                {renderList()}
            </Col>
        );
    }

}

const mapStateToProps = state => ({list: state.post.list})
const mapDispatchToProps = { search, searchPostsByCategory }
export default connect(mapStateToProps, mapDispatchToProps)(PostList)
