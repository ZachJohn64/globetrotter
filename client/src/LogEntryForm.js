import React from 'react';
import { useForm } from 'react-hook-form';
const LogEntryForm = () => {
    const { register, handleSubmit } = useForm();

    return (
        <form className="entry-form">
            <label for="title">Title</label>
            <input name="title" required/>
            <label for="comments">Comments</label>
            <textarea name="comments" rows={3}></textarea>
            <label for="description">Description</label>
            <textarea name="description" rows={3}></textarea>
            <label for="visitDate">Visit Date</label>
            <input name="visitDate" type="date" required/>
            <button type="submit">Mark Entry</button>
        </form>
    )
}

export default LogEntryForm;

