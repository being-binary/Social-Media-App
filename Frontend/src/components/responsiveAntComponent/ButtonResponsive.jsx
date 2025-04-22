import React from 'react';
import { Button, Col, Row } from 'antd';
import { Link } from 'react-router-dom';

const ButtonResponsive = ({ path, text }) => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={8} lg={24} style={{marginTop:'15px'}}>
        <Link to={`${path}`}>
          <Button type="primary" block>
            {text}
          </Button>
        </Link>
      </Col>
    </Row>
  );
};
export default ButtonResponsive

