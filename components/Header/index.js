import { Container as HeaderContainer } from './styles'
import { Nav } from 'components'
import Link from 'next/link'    

const Header = () => {
    return(
        <HeaderContainer>
            <Link href="/">
                <a>
                    <h1>Capriquarius Stargazing</h1>
                </a>
            </Link>
            <Nav />
        </HeaderContainer>
    )
}

export default Header;