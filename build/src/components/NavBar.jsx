import styled from 'styled-components'
import { Link } from 'react-router-dom'

const NavBarContainer = styled.nav`
  background-color: ${props => props.theme.colors.primary};
  padding: 1rem 2rem;
  color: white;
`

const NavBarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
`

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

function NavBar() {
    return (
        <NavBarContainer>
            <NavBarContent>
                <Logo to="/">EZPass Analyzer</Logo>
                <NavLinks>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                </NavLinks>
            </NavBarContent>
        </NavBarContainer>
    )
}

export default NavBar