const Header = ({title, subtitle}) => {
    return (
        <header className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 -mb-2">{title}</h1>
          <small className="text-gray-400 font-light">{subtitle}</small>
        </header>
    )
}

export default Header;