import {PlusIcon} from "../../assets/svgs";
import styled from "styled-components";

interface AddButtonProps {
  text: string;
  onClick?: () => void;
}

const ButtonContainer = styled.button`
    border: 1px solid transparent;
    border-radius: 4px;
    padding: 12px;
    background: rgba(51, 122, 183, 1);
    display: flex;
    justify-content: space-between;
    gap: 8px;
    color: white;
`

const AddButton = ({text, onClick}: AddButtonProps) => {
  return (
      <ButtonContainer
          onClick={onClick}
      >
        <PlusIcon fill="#FFFFFF" />
        {text}
      </ButtonContainer>
  )
}

export default AddButton;
