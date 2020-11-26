import styled from 'styled-components';

export const Container = styled.header`
    width: 100%;
    padding: 0 40px;
    height: 100px;
    border-bottom: 1px solid #eaeaea;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
        height: 1.2em;
    }

    img {
        margin-left: 0.5rem;
    }
    a {
        color: inherit;
        text-decoration: none;
    }

    a {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;