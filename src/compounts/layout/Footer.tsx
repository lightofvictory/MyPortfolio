export default function Footer() {
  return <footer className="container footer">
    <a className="logo" href="#">jp<span>.</span>
    </a>
    <span>© {new Date().getFullYear()} Jayaprakash M.</span>
    <span>Thoughtfully designed. Carefully built.</span>
    <a href="#">Back to top ↑</a>
  </footer>;
}
