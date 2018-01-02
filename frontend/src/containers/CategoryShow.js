import React from 'react'
import { Row, Breadcrumb, BreadcrumbItem } from 'reactstrap';

import PostList from "../components/PostList";
import CategoriaList from "../components/CategoriaList";

const CategoryShow = (props) => (
    <div>
        <Breadcrumb>
            <BreadcrumbItem><a href="/">Home</a></BreadcrumbItem>
            <BreadcrumbItem active>{props.match.params.category}</BreadcrumbItem>
        </Breadcrumb>
        <hr />
        <Row>
            <PostList category={props.match.params.category} />
            <CategoriaList />
        </Row>
    </div>
)

export default CategoryShow