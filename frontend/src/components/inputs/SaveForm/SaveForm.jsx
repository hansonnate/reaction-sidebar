import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./SaveForm.module.scss";

export const SaveForm = ({ fields }) => {
  return (
    <Container className={styles.container}>
      {fields.map((field, index) => {
        return (
          <Row key={index} className={styles.fieldRow}>
            <Col xs={3} className={styles.label}>
              {field.label}
            </Col>
            <Col xs={9}>
              <Col xs={12} md={10} xl={6}>{field.field}</Col>
            </Col>
          </Row>
        );
      })}
    </Container>
  );
};
