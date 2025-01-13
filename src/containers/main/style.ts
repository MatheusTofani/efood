import styled from "styled-components";

export const Grid = styled.div`
display: grid;
grid-template-columns: repeat(2, 472px);
gap: 80px;
justify-content: center;
padding: 80px 0;

@media  (max-width: 1024px) {
    grid-template-columns: repeat(1, 100%);
}
`