import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Perks from "./Perks";
import axios from "axios";
import PhotosUploader from "./PhotosUplaoder";
import AccountNav from "../AccountNav";

export default function PlacesFormPage() {
  const {id} = useParams();
  const [title,setTitle] = useState('');
  const [address,setAddress] = useState('');
  const [addedPhotos,setAddedPhotos] = useState([]);
  const [description,setDescription] = useState('');
  const [perks,setPerks] = useState([]);
  const [extraInfo,setExtraInfo] = useState('');
  const [checkIn,setCheckIn] = useState('');
  const [checkOut,setCheckOut] = useState('');
  const [maxGuests,setMaxGuests] = useState(1);
  const [price,setPrice] = useState(100);
  const [redirect,setRedirect] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/places/'+id).then(response => {
       const {data} = response;
       setTitle(data.title);
       setAddress(data.address);
       setAddedPhotos(data.photos);
       setDescription(data.description);
       setPerks(data.perks);
       setExtraInfo(data.extraInfo);
       setCheckIn(data.checkIn);
       setCheckOut(data.checkOut);
       setMaxGuests(data.maxGuests);
       setPrice(data.price);
    });
  }, [id]);
  function inputHeader(text) {
    return (
      <h2 className="text-2xl mt-4">{text}</h2>
    );
  }
  function inputDescription(text) {
    return (
      <p className="text-gray-500 text-sm">{text}</p>
    );
  }
  function preInput(header,description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title, address, addedPhotos,
      description, perks, extraInfo,
      checkIn, checkOut, maxGuests, price,
    };
    if (id) {
      // update
      await axios.put('/places', {
        id, ...placeData
      });
      setRedirect(true);
    } else {
      // new place
      await axios.post('/places', placeData);
      setRedirect(true);
    }

  }

  if (redirect) {
    return <Navigate to={'/account/places'} />
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput('Title', 'Title for your place. should be short and catchy as in advertisement')}
        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: My lovely apt"/>
        {preInput('Address', 'Address to this place')}
        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address"/>
        {preInput('Photos','more = better')}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput('Description','description of the place')}
        <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
        {preInput('Perks','select all the perks of your place')}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput('Extra info','house rules, etc')}
        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
        {preInput('Check in&out times','add check in and out times, remember to have some time window for cleaning the room between guests')}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input type="text"
                   value={checkIn}
                   onChange={ev => setCheckIn(ev.target.value)}
                   placeholder="14"/>
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input type="text"
                   value={checkOut}
                   onChange={ev => setCheckOut(ev.target.value)}
                   placeholder="11" />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input type="number" value={maxGuests}
                   onChange={ev => setMaxGuests(ev.target.value)}/>
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input type="number" value={price}
                   onChange={ev => setPrice(ev.target.value)}/>
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
}



/*import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Perks from "./Perks";
import axios from "axios";
import PhotosUploader from "./PhotosUplaoder";
import AccountNav from "../AccountNav";


export default function PlacesFormPage() {
const {id} = useParams();
const [title, setTitle] = useState('');
const [address, setAddress] = useState('');
const [addedPhotos,setAddedPhotos] = useState([]);
const [photoLink, setPhotoLink] = useState('');
const [description, setDescription] = useState('');
const [perks,setPerks] = useState('');
const [extraInfo,setExtraInfo] = useState('');
const [checkIn,setCheckIn] = useState('');
const [checkOut,setCheckOut] = useState('');
const [maxGuests, setMaxGuests] = useState(1);
const [redirect,setRedirect] = useState(false);
useEffect(() => {
  if(!id) {
    return;
  }
  axios.get('/places/'+id).then(reponse => {
    const {data} = reponse;
    setTitle(data.title);
    setAddress(data.address);
    setAddedPhotos(data.photos);
    setDescription(data.description);
    setPerks(data.perks);
    setExtraInfo(data.extraInfo);
    setCheckIn(data.checkIn);
    setCheckOut(data.checkOut);
    setMaxGuests(data.maxGuests);
  });
},[id]);

function inputHeader(text) {
    return (
        <h2 className="text-2xl mt-4">{Title}</h2>
    );
}

function inputDescription(text) {
    return (
        <p className="text-gray-500 text-sm">{text}</p>
    );
}

function preInput(header, description){
    return (
        <>
         {inputHeader(header)}
         {inputDescription(description)}
        </>
    );
}

async function savePlace(ev) {
   ev.preventDefault();//preventing default behaviour on the form submission
   const placeData = {
    title, address, addedPhotos,
    description, perks, extraInfo, 
    checkIn, checkOut, maxGuests
   }
   if (id) {
    // update
    await axios.put('/places', {
        id, ...placeData
    });
    setRedirect(true)

   } else {
    //new
    await axios.post('/places', placeData);
    setRedirect(true);
   }
}


if (redirect) {
    return <Navigate to={'/account/places'} />
  }


 return (
        <div>
            <AccountNav />
            <form onSubmit={savePlace}>
                <h2 className="text-2xl mt-4">Title</h2>
                <p className="text-gray-500 text-sm">Title for your place. Should be short</p>
                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title,for example, my lovely cat"/>
                <h2 className="text-2xl mt-4">Address</h2>
                <p className="text-gray-500 text-sm">Address to this place</p>
                <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address"/>
                <h2 className="text-2xl mt-4">Photos</h2>
                <p className="text-gray-500 text-sm">more=better</p>
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                <h2 className="text-2xl mt-4">Description</h2>
                <p className="text-gray-500 text-sm">description of the places</p>
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
                <h2 className="text-2xl mt-4">Perks</h2>
                <p className="text-gray-500 text-sm">Select all the perks of your places</p>
                <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                    <Perks selected={perks} onChange={setPerks} />
                </div>
                <h2 className="text-2xl mt-4">Extra info</h2>
                <p className="text-gray-500 text-sm">House rules, etc</p>
                <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
                <h2 className="text-2xl mt-4">Check in&out time, max guests</h2>
                <p className="text-gray-500 text-sm">Add check in and out time, remember to have some time window for cleaning the room between guests</p>
                <div className="grid gap-2 sm:grid-cols-3">
                    <div>
                      <h3 className="mt-2 -mb-1">Check in time</h3>  
                      <input type="text" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} placeholder="14"/>
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Check out time</h3>
                       <input type="text" value={checkOut} onChange={ev =>setCheckOut(ev.target.value)} placeholder="11"/>
                    </div>
                    <div>
                          <h3 className="mt-2 -mb-1">Max number of guests</h3>
                          <input type="number" value={maxGuests} onChange={(ev => ev.target.value)} />
                    </div> 
                </div> 
                <button className="primary my-4">Save</button>
            </form>
        </div>
    );
}*/