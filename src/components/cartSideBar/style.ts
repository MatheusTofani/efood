import styled from "styled-components";

export const SidebarContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  right: 0;
  top: 0;
  height: 100%;
  width: 300px;
  background-color: #fff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  transform: translateX(${(props) => (props.isOpen ? "0" : "100%")});
  transition: transform 0.3s ease;
  z-index: 1001;
`;

export const SidebarOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

export const SidebarContent = styled.div`
  padding: 20px;
`;

export const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;

  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 5px;
  }

  div {
    flex: 1;
    margin-left: 10px;

    p {
      margin: 5px 0;
    }
  }

  button {
    background-color: #e66767;
    color: #fff;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 3px;
  }
`;

export const SidebarFooter = styled.div`
  margin-top: 20px;
  font-weight: bold;
  text-align: center;
`;
