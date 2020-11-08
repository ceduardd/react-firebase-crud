import React, { useEffect } from 'react';
import { db } from '../firebase';
import useInput from '../hooks/useInput';

const LinksForm = ({ addOrEditLink, currentId }) => {
  const [urlProps, resetUrl, setUrl] = useInput('');
  const [titleProps, resetTitle, setTitle] = useInput('');
  const [descriptionProps, resetDescription, setDescription] = useInput('');

  const getLink = async id => {
    const doc = await db.collection('links').doc(id).get();
    const { title, url, description } = doc.data();

    console.log(title, url, description);

    setUrl(url);
    setTitle(title);
    setDescription(description);
  };

  useEffect(() => {
    if (currentId) {
      getLink(currentId);
    }
  }, [currentId]);

  const handleSubmit = e => {
    e.preventDefault();

    const link = {
      url: urlProps.value,
      title: titleProps.value,
      description: descriptionProps.value,
    };

    addOrEditLink(link);

    resetUrl();
    resetTitle();
    resetDescription();
  };

  return (
    <div className="col-sm-10 col-md-8 mx-auto">
      <form className="card" onSubmit={handleSubmit}>
        <div className="card-body">
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <i className="material-icons input-group-text">insert_link</i>
              </div>
              <input
                className="form-control"
                type="text"
                placeholder="https://someurl.com"
                {...urlProps}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <i className="material-icons input-group-text">title</i>
              </div>
              <input
                className="form-control"
                type="text"
                placeholder="Title"
                {...titleProps}
              />
            </div>
          </div>
          <textarea
            className="form-control"
            name="description"
            id=""
            rows="2"
            placeholder="Description"
            {...descriptionProps}
          ></textarea>
          <button className="btn btn-success btn-block mt-3" type="submit">
            {currentId ? 'Update' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LinksForm;
