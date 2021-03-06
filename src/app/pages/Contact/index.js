import React from "react";
import { ContactWrapper } from "./ContactStyle";
import { CaretRightOutlined } from '@ant-design/icons';

function Contact() {
  return (
    <ContactWrapper>
      <h2 style={{ fontWeight: '900', color: 'blue' }}>
        Thông tin liên hệ
    </h2>
      <p><CaretRightOutlined style={{ paddingRight: '10px' }} />Email: info@wiiquiz.com</p>
      <p><CaretRightOutlined style={{ paddingRight: '10px' }} />
      Facebook:
      <a href="https://www.facebook.com/wiiquiz" target="_blank"> www.facebook.com/wiiquiz</a>
      </p>
    </ContactWrapper>
  );
}

export default Contact;
