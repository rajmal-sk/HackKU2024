import React from "react";
import {Row, Container, Col} from "react-bootstrap"

const HomeScreen = () => {
    return (
    <div>
        <Container>
      <Row>
        <Col>1 of 2</Col>
        <Col>2 of 2</Col>
      </Row>
      <Row>
        <Col>1 of 3</Col>
        <Col>2 of 3</Col>
        <Col>3 of 3</Col>
      </Row>
    </Container>
    </div>
  )
}

export default HomeScreen