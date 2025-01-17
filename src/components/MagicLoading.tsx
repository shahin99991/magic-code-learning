import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const reverseRotate = keyframes`
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
  100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
`;

const MagicCircle = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  border: 4px solid transparent;
  border-radius: 50%;
  background-image: linear-gradient(white, white), 
                    linear-gradient(45deg, #6200EA 0%, #B388FF 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;
  animation: ${rotate} 3s linear infinite;
`;

const InnerCircle = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  border: 4px solid transparent;
  border-radius: 50%;
  background-image: linear-gradient(white, white), 
                    linear-gradient(225deg, #B388FF 0%, #6200EA 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;
  animation: ${reverseRotate} 2s linear infinite;
`;

const MagicSymbol = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: radial-gradient(circle, #B388FF 0%, #6200EA 100%);
  animation: ${pulse} 2s ease-in-out infinite;
`;

export const MagicLoading: React.FC = () => {
  return (
    <Container>
      <MagicCircle>
        <InnerCircle>
          <MagicSymbol />
        </InnerCircle>
      </MagicCircle>
    </Container>
  );
}; 