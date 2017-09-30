import React, { Component } from 'react';
import styled from 'styled-components';

import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import CodeIcon from 'material-ui-icons/Code';

const FooterWrapper = styled.footer`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 40px;
`;

const ViewCodeButton = styled(Button)`margin-bottom: 10px;`;

class Footer extends Component {
  render() {
    return (
      <FooterWrapper>
        <ViewCodeButton
          target="_blank"
          href="https://github.com/dkundel/twilio-sync-inspector"
          dense={true}
        >
          <CodeIcon style={{ marginRight: 10 }} />
          View Code on GitHub
        </ViewCodeButton>
        <Typography type="caption" paragraph>
          Created by{' '}
          <Typography
            type="caption"
            component="a"
            href="https://github.com/dkundel"
            style={{ display: 'inline-block' }}
          >
            Dominik Kundel
          </Typography>
        </Typography>
        <Typography type="caption" paragraph>
          Powered by{' '}
          <Typography
            type="caption"
            component="a"
            href="https://twilio.com/sync"
            style={{ display: 'inline-block' }}
          >
            Twilio Sync
          </Typography>
        </Typography>
      </FooterWrapper>
    );
  }
}

export default Footer;
