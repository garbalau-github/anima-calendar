import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <section className='m-5'>
            <h1>404 - Not found</h1>
            <br />
            <Link to='/'>
                <button className='btn btn-warning'>Go back</button>
            </Link>
        </section>
    );
};

export default NotFound;
