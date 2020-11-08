import React from 'react';

const Link = ({ id, title, url, description, onDelete, setCurrentId }) => {
  return (
    <div className="col-sm-10 col-md-8 mx-auto mb-4">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-content-center">
            <h3>{title}</h3>
            <div>
              <i
                style={{ cursor: 'pointer' }}
                className="material-icons mr-2"
                onClick={() => setCurrentId(id)}
              >
                create
              </i>
              <i
                style={{ cursor: 'pointer' }}
                className="material-icons"
                onClick={() => onDelete(id)}
              >
                close
              </i>
            </div>
          </div>
          <p>{description}</p>
          <a href={url}>Go to the website</a>
        </div>
      </div>
    </div>
  );
};

export default Link;
