import styled from 'styled-components'

export const ButtonStyler = styled.button `
    color: var(--mainWhite);    
    text-transform: capitalize;
    font-size: 1.4em;
    background-color: transparent;
    border: 0.05rem solid var(--mainWhite);
    border-radius: 0.5rem;
    padding: 0.2rem 0.5rem;
    cursor: pointer;
    margin: 0.2rem, 0.5rem, 0.2rem, 0;
    transition: all 0.2s ease-in-out;
    &:hover{
        background: var(--mainWhite);
        color: var(--mainBrown);
    }
    &:focus{
        outline: none;
    }
    `

    export const ContentButton = styled.button `
     

    color: ${props => (props.cart ? "var(--mainYellow)" : "var(--mainBlue)")};

    text-transform: capitalize;
    font-size: 1.4em;
    background-color: transparent;
    border: 0.05rem solid var(--mainBlue);

    border-color: ${props => (props.cart ? "var(--mainYellow)":"var(--mainBlue)")};

    border-radius: 0.5rem;
    padding: 0.2rem 0.5rem;
    cursor: pointer;
    margin: 0.2rem, 0.5rem, 0.2rem, 0;
    transition: all 0.2s ease-in-out;

    &:hover{
        background: ${props => (props.cart ? "var(--darkYellow)" : "var(--mainBlue)")};
        color: var(--mainWhite);
        
    }

    &:focus{
        outline: none;
}
`