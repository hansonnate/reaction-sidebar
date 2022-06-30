// External
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";

// Internal
import { SplitHorizontal } from "components/layouts";
import { useFetchProjectGql } from "api/resources/projects/projects";
import { TextField, ImageUpload } from "components/inputs";
import { ColorPicker } from "components/inputs/input_fields/ColorPicker/ColorPicker";
import styles from "./Design.module.scss";
import { Row, Col } from "react-bootstrap";

export const Design = () => {
  const { id } = useParams();
  const fetchProjectQuery = useFetchProjectGql(id);

  if (fetchProjectQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (fetchProjectQuery.isError) {
    return <div>Error</div>;
  }

  return (
    <SplitHorizontal leftWidth={9} fullHeight>
      <div
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "#ededed",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "2em",
          fontFamily: "Montserrat",
        }}
      >
        Preview
      </div>
      <DesignDialog />
    </SplitHorizontal>
  );
};

const DesignDialog = () => {
  const { id } = useParams();
  const fetchProjectQuery = useFetchProjectGql(id);

  const [alignment, setAlignment] = useState("left");
  const [titleColor, setTitleColor] = useState();
  const [headerColor, setHeaderColor] = useState();

  const handleAlignmentChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  if (fetchProjectQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (fetchProjectQuery.isError) {
    return <div>Error</div>;
  }

  return (
    <div className="ml-5 d-flex flex-col gap-4">
      <div className="d-flex flex-col gap-2">
        <label className={styles.label}>Brand</label>
        <TextField placeholder="Enter title" label="Title" />
        <ImageUpload />
        <Row className="justify-content-between align-items-center">
          <Col>Alignment</Col>
          <Col>
            <ToggleButtonGroup
              value={alignment}
              exclusive
              onChange={handleAlignmentChange}
              aria-label="text alignment"
              size="small"
              fullWidth
            >
              <ToggleButton value="left" aria-label="left aligned">
                <i className="bi bi-align-start" />
              </ToggleButton>
              <ToggleButton value="center" aria-label="centered">
                <i className="bi bi-align-center" />
              </ToggleButton>
              <ToggleButton value="right" aria-label="right aligned">
                <i className="bi bi-align-end" />
              </ToggleButton>
            </ToggleButtonGroup>
          </Col>
        </Row>
        <Row className="align-items-center justify-content-between">
          <Col>Header Color</Col>
          <Col xs="auto">
            <ColorPicker defaultColor={headerColor} onChange={setHeaderColor} />
          </Col>
        </Row>
        <Row className="d-flex flex-row align-items-center justify-content-between">
          <Col>Title Color</Col>
          <Col xs="auto">
            <ColorPicker defaultColor={titleColor} onChange={setTitleColor} />
          </Col>
        </Row>
      </div>

      <div className="d-flex flex-col gap-2">
        <label className={styles.label}>Progress Bar</label>
      </div>

      <div className="d-flex flex-col gap-2">
        <label className={styles.label}>Progress Bar</label>
      </div>
    </div>
  );
};
