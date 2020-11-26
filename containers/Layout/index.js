import { Header, Footer } from 'components'
import { Main } from 'containers'
import Container from './styles';

const Layout = ({children}) => {
    /*
                <Header />
            <Main>
                {children}
            </Main>
            <Footer />
    */
    return (
        <Container>
            <Header />
            {children}
            <Footer />
        </Container>
    )
}

export default Layout