import React, { useEffect, useState } from 'react';
import LinkForm from './LinkForm';
import { db } from '../firebase';
import { toast } from 'react-toastify';

const Links = () => {

    const [links, setLinks] = useState([]);
    const [currentId, setCurrentId] = useState("");

    const addOrEditLink = async (linkObject) => {
        try {
            if (currentId === '') {
                await db.collection('links').doc().set(linkObject);
                toast('New link added', {
                    type: 'success',
                    autoClose: 2000
                });
            }else{
                db.collection('links').doc(currentId).update(linkObject);   
                toast('Link updated', {
                    type: 'info',
                    autoClose: 2000
                });
                setCurrentId('');
            }
        } catch (error) {
            console.log(error);   
        }        
    }

    const onDeleteLink = async id => {
        if (window.confirm("Are you sure??")) {
            await db.collection('links').doc(id).delete();
            toast('Link removed', {
                type: 'error',
                autoClose: 2000
            });
        }
    }

    const getLinks = () => {
        db.collection('links').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            setLinks(docs);
        });
    }

    useEffect(() => {
        getLinks();
    }, []);

    return <div>
        <div className="col-md-4 p-2">
            <LinkForm {...{ addOrEditLink, currentId, links }} />
        </div>
        <div className="col-md-8 p-2">
            {links.map(link => (
                <div className="card mb-1" key={link.id}>
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <h4>{link.name}</h4>
                            <div>
                                <i className="material-icons text-danger" onClick={() => onDeleteLink(link.id)}>close</i>
                                <i className="material-icons" onClick={() => setCurrentId(link.id)}>create</i>
                            </div>
                        </div>
                        <p>{link.description}</p>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">Go to website</a>
                    </div>
                </div>
            ))}
        </div>
    </div>
};

export default Links;