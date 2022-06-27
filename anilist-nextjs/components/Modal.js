import React, { useRef, useState, useContext } from "react";

import { CollectionContext } from "../contexts/collection";

import { Button } from "./Basic/Button";
import { css } from "@emotion/react";

import Modal from "rsuite/Modal";
import Form from "rsuite/Form";
import Schema from "rsuite/Schema";
import ButtonToolbar from "rsuite/ButtonToolbar";

const { StringType, NumberType } = Schema.Types;


export const ModalBasic = (props) => {
  const formRef = useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    collectionName: "",
  });
  const { showModal, handleClose } = props;
  const { checkCollection } = useContext(CollectionContext);
  
  const model = Schema.Model({
    collectionName: StringType()
      .addRule((value, data) => {
        return checkCollection(value);
      }, "Collection name already available")
      .addRule((value, data) => {
        const rule = /^[A-Za-z]+$/

        return value.match(rule) !== null
      }, "Collection name must contain only letters.")
      .isRequired("This field is required.")
  });
  if (formError) console.log(formError, "< FORM ERROR");

  return (
    <Modal
      backdrop={true}
      keyboard={true}
      open={showModal}
      onClose={handleClose}
      size="sm"
      aria-labelledby="create-collection"
    >
      <Modal.Header>
        <Modal.Title>Create new collection</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* <Paragraph /> */}
        <Form
          ref={formRef}
          onChange={setFormValue}
          onCheck={setFormError}
          formValue={formValue}
          model={model}
          fluid
        >
          <Form.Group
            controlId="collection-name-1"
            css={css`
              width: 100%;
            `}
          >
            <Form.ControlLabel
              css={css`
                color: #333;
              `}
            >
              Input collection name{" "}
            </Form.ControlLabel>
            <Form.Control
              css={css`
                width: 200px;
              `}
              checkAsync
              name="collectionName"
              placeholder="Please enter abc"
              // onKeydown={(event =>  /[a-zA-Z]/i.test(event.key))}
            />
          </Form.Group>
          <ButtonToolbar>
            <Button
              onClick={handleClose}
              variant="outline"
              size="md"
              color="accent"
            >
              Cancel
            </Button>
            <Button
              onClick={() =>
                props.onSubmit(formValue.collectionName, props.anime)
              }
              variant="solid"
              disabled={Object.keys(formError).length !== 0}
              size="md"
              color="accent"
            >
              Create
            </Button>
          </ButtonToolbar>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export const ModalAlert = (props) => {
  const { children, onSubmit, showModal, onClose, title } = props;

  return (
    <Modal
      backdrop={true}
      keyboard={true}
      open={showModal}
      onClose={onClose}
      size="sm"
      aria-labelledby={title?.toLowerCase()}
    >
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {children}
        <ButtonToolbar>
          <Button onClick={onClose} variant="outline" size="md" color="accent">
            Cancel
          </Button>
          <Button onClick={onSubmit} variant="solid" size="md" color="accent">
            Delete
          </Button>
        </ButtonToolbar>
      </Modal.Body>
    </Modal>
  );
};
