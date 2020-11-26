import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    padding: 50px;
    border-radius: 10px;
    margin-bottom: 50px;
    border-bottom: 8px solid #192331;
    background-color: white;
`;

const EditButton = styled.button`
    width: 100px;
    background-color: #192331;
    padding: 15px;
    border: none;
    margin-right:10px;
    border-radius:5px;
    color: white;
`

const DeleteButton = styled.button`
    width: 100px;
    background-color: red;
    padding: 15px;
    border: none;
    margin-right:10px;
    border-radius:5px;
    color: white;
`

const Title = styled.h1`
font-size: 32px;
margin-bottom: 3px;
`

export {Container, EditButton, DeleteButton, Title}
