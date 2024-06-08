

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer>
      <p>DeTask &copy; {currentYear}</p>
    </footer>
  )
}

export default Footer