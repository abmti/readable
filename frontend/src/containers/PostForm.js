import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, getFormSyncErrors } from 'redux-form';
import { FormGroup, Card, CardHeader, CardBody, CardFooter, Button, Alert } from 'reactstrap';
import swal from 'sweetalert'

import { edit, create, update } from '../actions/posts'
import { search as searchCategories } from '../actions/categories';

class PostForm extends Component {

    state = {
        editPage: false
    }

    componentWillMount = () => {
        this.props.searchCategories()
        const { match } = this.props;
        if (match.params.id) {
            this.setState({ editPage: true })
            this.props.edit(match.params.id);
        } else {
            this.setState({ editPage: false })
        }
    }

    handleClick = () => {
        console.debug("Handle click");
    }

    submitForm = (values) => {
        if(this.state.editPage) {
            this.props.update(values)
        } else {
            this.props.create(values).then(({post}) => {
                swal({icon: "success", text: "Post created successfully!"})
                    .then(() => {
                        this.props.history.push(`/${post.category}/${post.id}`);
                    });
            });
        }
    }

    render() {
        //const { match, location, handleSubmit, pristine, reset, submitting } = this.props
        const { handleSubmit, pristine, reset, submitting, errors, submitFailed } = this.props
        console.debug("PROPS")
        console.debug(this.props)

        const form = (
            <Card>
                <form onSubmit={handleSubmit(this.submitForm)}>
                    <CardHeader>
                        Post Form
                    </CardHeader>
                    <CardBody>

                        {
                            (errors != undefined && submitFailed) && (Object.keys(errors).map((key) => (
                                <Alert color="danger">{errors[key]}</Alert>
                            )))
                        }

                        <FormGroup>
                            <label>Title</label>
                            <Field
                                name="title"
                                component="input"
                                type="text"
                                placeholder="Title"
                                className="form-control form-control-sm"
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Body</label>
                            <Field
                                name="body"
                                component="textarea"
                                placeholder="Body"
                                className="form-control form-control-sm"
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Author</label>
                            <Field
                                name="author"
                                component="input"
                                type="text"
                                placeholder="Author"
                                className="form-control form-control-sm"
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Category</label>
                            <Field
                                name="category"
                                component="select"
                                className="form-control form-control-sm">
                                <option value="">Select a category...</option>
                                {this.props.categories.map((c, idx) => (
                                    <option value={c.path} key={idx}>
                                        {c.name}
                                    </option>
                                ))}
                            </Field>

                        </FormGroup>
                    </CardBody>
                    <CardFooter>
                        <div>
                            <Button type="submit" disabled={pristine || submitting} color="primary" size="sm">Submit</Button>
                            {' '}
                            <Button disabled={pristine || submitting} onClick={reset} size="sm">
                                Clear Values
                            </Button>
                        </div>
                    </CardFooter>
                </form>

            </Card>
        )

        return (
            form
        )
    }

}

const validate = values => {
    const errors = {}
    if (!values.title) {
        errors.title = 'Title required'
    }
    if (!values.body) {
        errors.body = 'Body required'
    }
    if (!values.author) {
        errors.author = 'Author required'
    }
    if (!values.category) {
        errors.category = 'Category required'
    }
    return errors
}

PostForm = reduxForm({ form: 'postForm', validate })(PostForm)
const mapStateToProps = state => ({post: state.post.post, categories: state.category.list, errors: getFormSyncErrors('postForm')(state)})
const mapDispatchToProps = { edit, create, update, searchCategories }
export default connect(mapStateToProps, mapDispatchToProps)(PostForm)