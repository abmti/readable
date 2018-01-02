import React from 'react'
import { Row } from 'reactstrap';

import PostList from "../components/PostList";
import CategoriaList from "../components/CategoriaList";

const Home = () => (
    <Row>
        <PostList />
        <CategoriaList />
    </Row>
)

export default Home