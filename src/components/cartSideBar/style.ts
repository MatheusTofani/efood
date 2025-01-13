import styled from "styled-components";

interface WidthProps {
  width?: string;
}

export const SidebarContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  right: 0;
  top: 0;
  height: 100%;
  padding: 32px 8px;
  width: 360px;
  background-color: #E66767;
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
  
`;

export const SidebarItem = styled.div`
  display: flex;
  margin-bottom: 15px;
  height: 100px;
  width: 100%;
  background-color: #FFEBD9;
  padding: 8px;
  position: relative;

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
  margin-right: 8px;
  }
  

  p {
    color: #E66767;
    cursor: pointer;
    position: absolute;
    top: 70%;
    right: 8px;
  }
`;

export const SidebarFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`;

export const Pagamento = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #FFEBD9;


  label {
    font-size: 14px;
    font-weight: 700;
    color: #FFEBD9;
    margin-bottom: 4px;
  }
`;

export const Input = styled.input<WidthProps>`
 border: none;
 height: 32px;
 background-color: #FFEBD9;
 width: ${(props) => props.width || "auto"};
 padding-left: 8px;
 border : 2px solid #E66767;

 &:focus {
   outline: none;
   border: 2px solid rgb(179, 0, 0);
 }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputFlex = styled.div`
  display: flex;
justify-content: space-between;
`;

export const InputContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SideBarForms = styled.div`

`;

export const ConfirmationMessage = styled.div`
  text-align: center;
  padding: 16px;
  color: #ffeabd;
  background-color: #e66767;
  border-radius: 8px;
  margin-top: 16px;

  p {
    margin-top: 8px;
    font-size: 14px;
  }

  pre {
    text-align: left;
    background: #ffeabd;
    padding: 8px;
    color: #333;
    border-radius: 4px;
  }
`;