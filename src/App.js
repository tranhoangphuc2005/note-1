import Add from "./Components/Add/Add";
import { useState, useEffect } from "react";
import axios from "axios";
import Note from "./Components/Note/Note";
import { v4 as uuidv4 } from "uuid";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";

let api = `http://localhost:5000/notes`;

function App() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    callApi();
  }, []);

  const callApi = async () => {
    setIsLoading(true);
    let res = await axios.get(api);
    const newData = res.data.map((v) => {
      return {
        ...v,
        open: false,
      };
    });
    setNotes(newData);
    setIsLoading(false);
  };

  const deleteNote = async (id) => {
    setIsLoading(true);
    let res = await axios.delete(`${api}/${id}`);
    if (res.status == 200) {
      const newNotes = notes.filter((note) => note.id !== id);
      setNotes(newNotes);
    }
    setIsLoading(false);
  };

  const editNote = (note) => {
    setIsLoading(true);
    const newNotes = notes.map((n) => {
      if (n.id === note.id) {
        n.open = !n.open;
        return n;
      }
      n.open = false;
      return n;
    });
    setNotes(newNotes);
    setIsLoading(false);
  };

  const submitNote = async (note) => {
    setIsLoading(true);
    delete note.open;
    let res = await axios.put(`${api}/${note.id}`, note);
    if (res.status === 200) {
      let newNotes = notes.map((n) => {
        if (n.id === note.id) {
          n.content = note.content;
          n.open = false;

          return n;
        }
        return n;
      });
      setNotes(newNotes);
    }
    setIsLoading(false);
  };

  const addNote = async () => {
    setIsLoading(true);
    const newNote = {
      id: uuidv4(),
      content: "",
      title: "",
      bookmark: false,
    };
    let res = await axios.post(`${api}`, newNote);
    if (res.status === 201) {
      let newNotes = [...notes, newNote];
      setNotes(newNotes);
    }
    setIsLoading(false);
  };

  let isBookmark = async (id, status) => {
    setIsLoading(true);
    let findNote = notes.find((n) => n.id === id);
    let updatedNote = {
      ...findNote,
      bookmark: !status,
    };
    let res = await axios.put(`${api}/${id}`, updatedNote);
    if (res.status === 200) {
      let newNotes = notes.map((note) => {
        if (note.id === id) {
          return res.data;
        }
        return note;
      });
      setNotes(newNotes);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Add addNote={addNote} />
      {isLoading && (
        <Segment>
          <Dimmer active>
            <Loader size="mini">Loading</Loader>
          </Dimmer>

          {/* <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" /> */}
        </Segment>
      )}
      <Note
        notes={notes}
        deleteNote={deleteNote}
        editNote={editNote}
        submitNote={submitNote}
        isBookmark={isBookmark}
      />
    </>
  );
}

export default App;
