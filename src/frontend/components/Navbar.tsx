import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 right-0 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/">
            Home
          </Link>
        </li>
        <li>
          <Link href="/upload">
            Upload
          </Link>
        </li>
        <li>
          <Link href="/qa">
            Q&A
          </Link>
        </li>
        <li>
          <Link href="/hub">
            Docs Hub
          </Link>
        </li>
      </ul>
    </nav>
  );
};


export default Navbar;
