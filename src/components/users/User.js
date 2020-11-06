import React, {Fragment, Component } from 'react'
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos' 
import RepoItem from '../repos/RepoItem'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';



export class User extends Component {
    

    componentDidMount() {
        this.props.getUser(this.props.match.params.login); 
        this.props.getUserRepos(this.props.match.params.login); 
    }
    static propTypes = {
        loading: PropTypes.bool,
        user: PropTypes.object.isRequired,
        getUser: PropTypes.func.isRequired,
        getUserRepos: PropTypes.func.isRequired,
    }
    render() {
        const {
            login,
            name,
            avatar_url, 
            location, 
            bio, 
            company,
            blog, 
            website, 
            html_url, 
            followers, 
            following, 
            public_repos, 
            public_gists, 
            hireable}=this.props.user;

        const {loading}=this.props;
            if(loading) return <Spinner />; 
        return (
            <Fragment>
                <Link to='/' className='btn btn-light'>
                    Back to search
                </Link>
                Hireable: {' '}
                {hireable ? <i className="fas fa-check text-success"/>:<i className="fas fa-times-circle text-danger"/>}
                <div className="card grid-2">
                    <div className="all-center">
                        <img src={avatar_url} className="round-img" style={{width:'150px'}} alt=""/>
                        <h1>{name}</h1>
                        <p>Location: {location}</p>
                    </div>
                    <div>
                        {bio && <Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                        </Fragment>}
                    </div>
                    <a href={html_url} target="_blank" rel="noopener noreferrer"  className="btn btn-dark my-1">Check GitHub profile</a>
                    <ul>
                        <li><strong>Username: </strong>{login}</li>
                        <li>{company && <Fragment>
                            <strong>Company: </strong>{company}
                        </Fragment>}</li>
                        <li>{blog && <Fragment>
                            <strong>Blog: </strong>{blog}
                        </Fragment>}</li>
                        <li>{website && <Fragment>
                            <strong>Website: </strong>{website}
                        </Fragment>}</li>
                        <li></li>
                    </ul>
                </div> 
                <div className="card text-center">
                    <div className="badge badge-primary">Followers: {followers}</div>
                    <div className="badge badge-success">Following: {following}</div>
                    <div className="badge badge-light">Public Repos: {public_repos}</div>
                    <div className="badge badge-dark">Public Gists: {public_gists}</div>
                </div>
                <Repos repos={this.props.repos}/>
            </Fragment>
        )
    }
}

export default User
