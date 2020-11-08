import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Link from './components/Link';
import LinksForm from './components/LinksForm';
import { db } from './firebase';

import 'bootswatch/dist/minty/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [links, setLinks] = useState([]);
  const [currentId, setcurrentId] = useState('');

  const addOrEditLink = async link => {
    if (currentId) {
      db.collection('links').doc(currentId).update(link);
      toast('New link updated', {
        type: toast.TYPE.INFO,
        autoClose: 2000,
      });
    } else {
      await db.collection('links').doc().set(link);
      toast('New link added', {
        type: toast.TYPE.SUCCESS,
        autoClose: 2000,
      });
    }
    setcurrentId('');
  };

  const getLinks = async () => {
    await db.collection('links').onSnapshot(querySnapshot => {
      const docs = [];
      querySnapshot.forEach(doc => {
        docs.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      // console.log(docs);

      setLinks(docs);
    });
  };

  const onDelete = async id => {
    await db.collection('links').doc(id).delete();

    toast('Link deleted', {
      type: toast.TYPE.ERROR,
      autoClose: 2000,
    });
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <div className="container p-4">
      <h1 className="display-4 text-center mb-4">Add Link</h1>
      <div className="row">
        <LinksForm addOrEditLink={addOrEditLink} currentId={currentId} />
      </div>
      <h1 className="display-4 text-center my-4">Links List</h1>
      <div className="row">
        {links.map(link => (
          <Link
            key={link.id}
            onDelete={onDelete}
            setCurrentId={setcurrentId}
            {...link}
          />
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
