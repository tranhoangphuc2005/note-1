import React from "react";
import { Button, Icon } from "semantic-ui-react";

const Add = ({ addNote }) => {
  return (
    <>
      <Button
        icon
        labelPosition="left"
        onClick={() => {
          addNote();
        }}
        id={"add-note"}
      >
        <Icon name="plus" />
        Add note
      </Button>
    </>
  );
};

export default Add;
