import { Link } from 'react-router-dom';
import CurrentDateTime from './CurrentDateTime';

const Header = () => {
    return (
        <nav className='navbar  bg-dark'>
            <div className='container-fluid align-items-center'>
                <Link className='navbar-brand text-white' to='/'>
                    <button className='btn btn-info'>Calendar View</button>
                </Link>
                <span className='text-white'>
                    Time: <CurrentDateTime />
                </span>
                <span className='d-flex'>
                    <Link className='nav-link pe-0' to='/events/add'>
                        <button className='btn btn-primary'>
                            Create Event
                        </button>
                    </Link>
                    <a
                        className='nav-link pe-0'
                        target='_blank'
                        href='https://github.com/garbalau-github/anima-calendar'
                    >
                        <button className='btn btn-secondary'>
                            About Project
                        </button>
                    </a>
                </span>
            </div>
        </nav>
    );
};

export default Header;
