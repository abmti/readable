import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import { FormGroup } from 'reactstrap';

import { create, update } from '../actions/comments'

class CommentForm extends Component {

    static propTypes = {
        postId: PropTypes.string.isRequired
    }

    submitForm = (values) => {
        if(this.props.modal) {
            this.props.update(values)
        } else {
            this.props.create(values, this.props.postId)
        }
    }

    render() {
        const { handleSubmit, pristine, reset, submitting, invalid } = this.props
        return (

            <form onSubmit={handleSubmit(this.submitForm)}>

                <div className={this.props.modal ? 'modal-body' : 'card-body'}>
                    <FormGroup>
                        <Field
                            name="author"
                            component="input"
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Author"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Field
                            name="body"
                            component="input"
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Body"
                        />
                    </FormGroup>
                </div>

                <div className={this.props.modal ? 'modal-footer' : 'card-footer'}>
                    <button type="submit" disabled={pristine || submitting || invalid} className="btn btn-primary btn-sm">
                        Submit
                    </button>
                    {' '}
                    <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-secondary btn-sm">
                        Clear Values
                    </button>
                </div>
            </form>
        );
    }

}

const validate = values => {
    const errors = {}
    if (!values.author) {
        errors.author = 'Author required'
    }
    if (!values.body) {
        errors.body = 'Body required'
    }
    return errors
}

const getNameFormComment = (props) => {
    return 'commmentForm' + (props.modal ? 'Modal' : '')
}

const mapStateToPropsForm = (state, props) => ({form: getNameFormComment(props), validate})
CommentForm = connect(mapStateToPropsForm)(reduxForm()(CommentForm));

const mapDispatchToProps = { create, update }
export default connect(null, mapDispatchToProps)(CommentForm)
