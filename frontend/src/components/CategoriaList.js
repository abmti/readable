import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, CardBody, Col } from 'reactstrap';
import { FaTag } from 'react-icons/lib/fa';

import { search } from '../actions/categories';


class CategoriaList extends Component {

    //constructor(props) {
    //    super(props);
    //}

    componentDidMount() {
        this.props.search()
    }

    render() {

        const renderList = () => {
            const list = this.props.list || []
            return list.map((c, idx) => (
                <div key={idx}>
                    <Link to={`/categories/${c.path}`} replace={true}>
                        <FaTag className="mr-2" />
                        {c.name}
                    </Link>
                </div>
            ))
        }

        return (
            <Col md="3" sm="12" xs="12">
                <h3>Categories</h3>
                <Card>
                    <CardBody>
                        {renderList()}
                    </CardBody>
                </Card>
            </Col>
        );
    }

}

const mapStateToProps = state => ({list: state.category.list})
const mapDispatchToProps = { search }
export default connect(mapStateToProps, mapDispatchToProps)(CategoriaList)
