import React, { useState } from "react";
import { Grid, Icon, Card, Button, Select } from "semantic-ui-react";
import marked from "marked";

import "./Note.css";
import axios from "axios";

const countryOptions = [
  { key: "af", value: "af", text: "Afghanistan" },
  { key: "ax", value: "ax", text: "Aland Islands" },
  { key: "al", value: "al", text: "Albania" },
  { key: "dz", value: "dz", text: "Algeria" },
  { key: "as", value: "as", text: "American Samoa" },
  { key: "ad", value: "ad", text: "Andorra" },
  { key: "ao", value: "ao", text: "Angola" },
  { key: "ai", value: "ai", text: "Anguilla" },
  { key: "ag", value: "ag", text: "Antigua" },
  { key: "ar", value: "ar", text: "Argentina" },
  { key: "am", value: "am", text: "Armenia" },
  { key: "aw", value: "aw", text: "Aruba" },
  { key: "au", value: "au", text: "Australia" },
  { key: "at", value: "at", text: "Austria" },
  { key: "az", value: "az", text: "Azerbaijan" },
  { key: "bs", value: "bs", text: "Bahamas" },
  { key: "bh", value: "bh", text: "Bahrain" },
  { key: "bd", value: "bd", text: "Bangladesh" },
  { key: "bb", value: "bb", text: "Barbados" },
  { key: "by", value: "by", text: "Belarus" },
  { key: "be", value: "be", text: "Belgium" },
  { key: "bz", value: "bz", text: "Belize" },
  { key: "bj", value: "bj", text: "Benin" },
];

const Note = ({ notes, deleteNote, editNote, submitNote, isBookmark }) => {
  const [edit, setEdit] = useState(false);
  const [textarea, setTextarea] = useState("");

  let api = "http://localhost:5000/notes";
  const createMarkup = (note) => {
    return { __html: note };
  };

  return (
    <Grid columns={3} padded>
      <Grid.Row>
        {notes.map((note) => (
          <Grid.Column key={note.id}>
            <Card className={"content-css "}>
              <div className={"title"}>
                <Card.Content header={note.title} />
                <div className={"icon"}>
                  <Select placeholder="Select color" options={countryOptions} />
                  <Button
                    basic
                    color="red"
                    onClick={() => {
                      deleteNote(note.id);
                    }}
                  >
                    <Icon name="delete" />
                  </Button>
                  <Button
                    onClick={() => {
                      setTextarea(note.content);
                      editNote(note);
                    }}
                  >
                    <Icon name="edit outline" />
                  </Button>
                  <Button
                    color="blue"
                    onClick={() => {
                      isBookmark(note.id, note.bookmark);
                    }}
                  >
                    {note.bookmark === false ? (
                      <Icon name="bookmark outline" />
                    ) : (
                      <Icon name="bookmark" />
                    )}
                  </Button>
                </div>
              </div>
              <Card.Content description={note.content}>
                {!note.open ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: marked(note.content) }}
                  ></div>
                ) : (
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      // let res = await axios.put(`${api}/${note.id}`, {
                      //   ...note,
                      //   content: textarea,
                      // });
                      // if (res.status === 200) {
                      //   setEdit(false);
                      // }
                      let newData = { ...note, content: textarea };
                      submitNote(newData);
                    }}
                  >
                    <textarea
                      value={textarea}
                      onChange={(e) => {
                        setTextarea(e.target.value);
                      }}
                      className={"textarea"}
                    >
                      textarea
                    </textarea>
                    <button type="submit"> submit</button>
                  </form>
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        ))}
      </Grid.Row>
    </Grid>
  );
};

export default Note;
