import styled from 'styled-components'

const Container = styled.div`
   min-height: 70vh;
   width: 1200px;
   display: flex; 
   justify-content: space-around;
   flex-direction: row;
`

const Posts = styled.div`
   background-color: black;
   color: white;
   width: 40%;
`

const FormContainer = styled.div`
width: 40%;
`

const UserCont = styled.div`
width: 40%;
`

export { Container, Posts, FormContainer, UserCont };