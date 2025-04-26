import React from 'react';
import { Button, Col, Row } from 'antd';
import { Link } from 'react-router-dom';

const ButtonResponsive = ({ path, text }) => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={0} sm={0} md={0} lg={24}>
        <Link to={path}>
          <Button type="primary" block>
            {text}
          </Button>
        </Link>
      </Col>
    </Row>
  );
};

export default ButtonResponsive;
