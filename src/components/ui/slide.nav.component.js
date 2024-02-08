function SlideNav () {
    return ( 
    <nav>
        <ul>
          {data.navItems.map((item) => (
            <li key={item.id}>
              {item.name}
              {/* Check if there are sub-navigation items and render them */}
              {item.subNav && item.subNav.length > 0 && (
                <ul>
                  {item.subNav.map((subItem) => (
                    <li key={subItem.name}>
                      <a href={subItem.destination}>{subItem.name}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav> );
}

export default SlideNav;